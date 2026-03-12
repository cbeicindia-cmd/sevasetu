const http = require('http');
const fs = require('fs');
const path = require('path');

const port = Number(process.env.PORT || 4173);
const root = __dirname;

const MSG91_AUTH_KEY = process.env.MSG91_AUTH_KEY || '';
const MSG91_TEMPLATE_ID = process.env.MSG91_TEMPLATE_ID || '';
const MSG91_SENDER = process.env.MSG91_SENDER || 'SEVAST';

const otpStore = new Map();

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
};

function send(res, code, body, type = 'text/plain; charset=utf-8') {
  res.writeHead(code, {
    'Content-Type': type,
    'Cache-Control': 'no-store',
  });
  res.end(body);
}

function sendJSON(res, code, data) {
  send(res, code, JSON.stringify(data), 'application/json; charset=utf-8');
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1e6) {
        req.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

async function sendOtpViaMsg91(mobile, otp) {
  if (!MSG91_AUTH_KEY || !MSG91_TEMPLATE_ID) {
    return { ok: true, mock: true };
  }

  const response = await fetch('https://control.msg91.com/api/v5/flow/', {
    method: 'POST',
    headers: {
      authkey: MSG91_AUTH_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      template_id: MSG91_TEMPLATE_ID,
      sender: MSG91_SENDER,
      short_url: '0',
      recipients: [
        {
          mobiles: `91${mobile}`,
          otp,
        },
      ],
    }),
  });

  if (!response.ok) {
    const msg = await response.text();
    throw new Error(`MSG91 error: ${msg}`);
  }

  return { ok: true, mock: false };
}

const server = http.createServer(async (req, res) => {
  const safePath = decodeURIComponent((req.url || '/').split('?')[0]);

  if (req.method === 'POST' && safePath === '/api/send-otp') {
    try {
      const { mobile } = await readBody(req);
      if (!/^\d{10}$/.test(String(mobile || ''))) {
        return sendJSON(res, 400, { error: 'Invalid mobile number' });
      }

      const otp = generateOtp();
      otpStore.set(mobile, { otp, expiresAt: Date.now() + 5 * 60 * 1000 });
      const smsResult = await sendOtpViaMsg91(mobile, otp);

      return sendJSON(res, 200, {
        message: 'OTP sent',
        provider: smsResult.mock ? 'mock' : 'msg91',
        demoOtp: smsResult.mock ? otp : undefined,
      });
    } catch (error) {
      return sendJSON(res, 500, { error: error.message || 'Unable to send OTP' });
    }
  }

  if (req.method === 'POST' && safePath === '/api/verify-otp') {
    try {
      const { mobile, otp } = await readBody(req);
      const saved = otpStore.get(mobile);
      if (!saved) return sendJSON(res, 400, { error: 'OTP not requested' });
      if (Date.now() > saved.expiresAt) {
        otpStore.delete(mobile);
        return sendJSON(res, 400, { error: 'OTP expired' });
      }
      if (String(otp) !== saved.otp) {
        return sendJSON(res, 400, { error: 'Invalid OTP' });
      }

      otpStore.delete(mobile);
      return sendJSON(res, 200, { message: 'OTP verified' });
    } catch (error) {
      return sendJSON(res, 500, { error: error.message || 'Unable to verify OTP' });
    }
  }

  const requested = safePath === '/' ? '/index.html' : safePath;
  const filePath = path.join(root, requested);

  if (!filePath.startsWith(root)) {
    return send(res, 403, 'Forbidden');
  }

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      return send(res, 404, 'Not Found');
    }

    const ext = path.extname(filePath).toLowerCase();
    const type = mime[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-store' });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(port, '0.0.0.0', () => {
  console.log(`SevaSetu preview running at http://localhost:${port}`);
});
