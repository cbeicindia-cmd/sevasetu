const defaultSchemes = [
  { name: "Telangana MeeSeva Services", state: "telangana", category: "g2c", benefit: "Certificates, registrations, and citizen services.", link: "https://tg.meeseva.telangana.gov.in/" },
  { name: "Rythu Bandhu", state: "telangana", category: "g2c", benefit: "Farmer investment support assistance.", link: "https://rythubandhu.telangana.gov.in/" },
  { name: "Rythu Bima", state: "telangana", category: "g2c", benefit: "Farmers group life insurance support.", link: "https://rythubima.telangana.gov.in/" },
  { name: "Aasara Pensions", state: "telangana", category: "g2c", benefit: "Social security pensions for eligible groups.", link: "https://www.telangana.gov.in/schemes" },
  { name: "Kalyana Lakshmi / Shaadi Mubarak", state: "telangana", category: "g2c", benefit: "Marriage financial assistance.", link: "https://telanganaepass.cgg.gov.in/" },
  { name: "2BHK Housing Scheme", state: "telangana", category: "g2c", benefit: "Dignity housing for poor households.", link: "https://2bhk.telangana.gov.in/" },
  { name: "TS-bPASS", state: "telangana", category: "g2b", benefit: "Building permissions and approvals.", link: "https://www.tsbpass.telangana.gov.in/" },
  { name: "TS-iPASS", state: "telangana", category: "g2b", benefit: "Single window industrial clearances.", link: "https://ipass.telangana.gov.in/" },
  { name: "Dharani Land Services", state: "telangana", category: "g2c", benefit: "Integrated land records and registration services.", link: "https://dharani.telangana.gov.in/" },

  { name: "AP MeeSeva Services", state: "andhra-pradesh", category: "g2c", benefit: "Citizen service delivery and certificates.", link: "https://ap.meeseva.gov.in/" },
  { name: "YSR Rythu Bharosa", state: "andhra-pradesh", category: "g2c", benefit: "Farmer financial support assistance.", link: "https://ysrrythubharosa.ap.gov.in/" },
  { name: "YSR Aarogyasri", state: "andhra-pradesh", category: "g2c", benefit: "Healthcare financial protection.", link: "https://www.ysraarogyasri.ap.gov.in/" },
  { name: "NTR Bharosa Pension", state: "andhra-pradesh", category: "g2c", benefit: "Pension support for eligible beneficiaries.", link: "https://sspensions.ap.gov.in/" },
  { name: "Jagananna Amma Vodi", state: "andhra-pradesh", category: "g2c", benefit: "Education assistance to mothers.", link: "https://gsws-nbm.ap.gov.in/NBM/Home/Main" },
  { name: "AP Sand Booking", state: "andhra-pradesh", category: "g2b", benefit: "Online construction sand booking.", link: "https://www.apmdc.ap.gov.in/" },
  { name: "Spandana Grievance", state: "andhra-pradesh", category: "g2c", benefit: "Public grievance redressal services.", link: "https://spandana.ap.gov.in/" },
  { name: "AP Single Desk Portal", state: "andhra-pradesh", category: "g2b", benefit: "Business approvals and industrial services.", link: "https://www.apindustries.gov.in/apidb/" },

  { name: "PM Ujjwala Yojana (LPG Cylinder)", state: "national", category: "g2c", benefit: "Free/subsidized LPG connection for eligible households.", link: "https://www.pmuy.gov.in/" },
  { name: "PM Surya Ghar (Rooftop Solar)", state: "national", category: "g2c", benefit: "Subsidy for rooftop solar installation.", link: "https://pmsuryaghar.gov.in/" },
  { name: "Udyam Registration (MSME)", state: "national", category: "g2b", benefit: "Official MSME registration for businesses.", link: "https://udyamregistration.gov.in/" },
  { name: "GeM (Government e-Marketplace)", state: "national", category: "g2b", benefit: "Marketplace for government procurement.", link: "https://gem.gov.in/" }
];

const getJSON = (k, fallback) => JSON.parse(localStorage.getItem(k) || JSON.stringify(fallback));
const setJSON = (k, v) => localStorage.setItem(k, JSON.stringify(v));

const schemeList = document.getElementById("schemeList");
const applications = document.getElementById("applications");
const activeUser = document.getElementById("activeUser");
const stateFilter = document.getElementById("stateFilter");
const categoryFilter = document.getElementById("categoryFilter");

const registerBtn = document.getElementById("registerBtn");
const aadhaarStatus = document.getElementById("aadhaarStatus");
const otpStatus = document.getElementById("otpStatus");
const aadhaarInput = document.getElementById("aadhaar");
const mobileInput = document.getElementById("mobile");

let schemes = getJSON("schemes", defaultSchemes);
let userApplications = getJSON("applications", []);
let currentUser = getJSON("currentUser", null);

let aadhaarVerified = false;
let otpVerified = false;

function updateRegisterState() {
  registerBtn.disabled = !(aadhaarVerified && otpVerified);
}

function setStatus(el, text, ok = false) {
  el.textContent = text;
  el.classList.toggle("ok", ok);
  el.classList.toggle("err", !ok);
}

function prettyState(state) {
  if (state === "telangana") return "Telangana";
  if (state === "andhra-pradesh") return "Andhra Pradesh";
  return "National";
}

function renderSchemes() {
  const state = stateFilter.value;
  const category = categoryFilter.value;
  schemeList.innerHTML = "";

  schemes
    .filter((s) => state === "all" || s.state === state)
    .filter((s) => category === "all" || s.category === category)
    .forEach((scheme, index) => {
      const li = document.createElement("article");
      li.className = "scheme-item";
      li.innerHTML = `
        <h4>${scheme.name}</h4>
        <p>${scheme.benefit}</p>
        <small>${prettyState(scheme.state)} | ${scheme.category.toUpperCase()}</small>
        <div class="scheme-actions">
          <button data-apply="${index}">Apply</button>
          <a href="${scheme.link}" target="_blank" rel="noopener">Open Official Portal</a>
        </div>
      `;
      schemeList.appendChild(li);
    });
}

function renderApplications() {
  applications.innerHTML = "";
  if (!userApplications.length) {
    applications.innerHTML = "<li>No scheme applications submitted yet.</li>";
    return;
  }

  userApplications.forEach((a) => {
    const li = document.createElement("li");
    li.className = "scheme-item";
    li.textContent = `${a.user} applied for ${a.scheme} (${a.status})`;
    applications.appendChild(li);
  });
}

function renderUser() {
  if (!currentUser) {
    activeUser.textContent = "No active user session.";
    return;
  }
  activeUser.textContent = `Logged in as ${currentUser.name} (${currentUser.role}) | ${currentUser.village}, ${prettyState(currentUser.state)}`;
}

document.getElementById("verifyAadhaarBtn").addEventListener("click", () => {
  const aadhaar = aadhaarInput.value.trim();
  if (!/^\d{12}$/.test(aadhaar)) {
    aadhaarVerified = false;
    setStatus(aadhaarStatus, "Aadhaar invalid. Enter a 12-digit number.");
    updateRegisterState();
    return;
  }

  const digits = aadhaar.split("").map(Number);
  const checksum = digits.slice(0, 11).reduce((acc, d, idx) => acc + d * (idx + 1), 0) % 10;
  aadhaarVerified = checksum === digits[11];

  if (aadhaarVerified) {
    setStatus(aadhaarStatus, "Aadhaar verified successfully.", true);
  } else {
    setStatus(aadhaarStatus, "Aadhaar verification failed. Check number and retry.");
  }
  updateRegisterState();
});

document.getElementById("sendOtpBtn").addEventListener("click", async () => {
  const mobile = mobileInput.value.trim();
  if (!/^\d{10}$/.test(mobile)) {
    setStatus(otpStatus, "Enter a valid 10-digit mobile number first.");
    return;
  }

  otpVerified = false;
  updateRegisterState();
  setStatus(otpStatus, "Sending OTP via MSG91...");

  try {
    const res = await fetch("/api/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "OTP send failed");

    const demoOtpMsg = data.demoOtp ? ` Demo OTP: ${data.demoOtp}` : "";
    setStatus(otpStatus, `OTP sent successfully.${demoOtpMsg}`, true);
  } catch (error) {
    setStatus(otpStatus, `OTP send failed: ${error.message}`);
  }
});

document.getElementById("verifyOtpBtn").addEventListener("click", async () => {
  const mobile = mobileInput.value.trim();
  const otp = document.getElementById("otp").value.trim();

  if (!/^\d{10}$/.test(mobile) || !/^\d{4,6}$/.test(otp)) {
    setStatus(otpStatus, "Enter valid mobile and OTP.");
    return;
  }

  try {
    const res = await fetch("/api/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile, otp }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "OTP verification failed");

    otpVerified = true;
    setStatus(otpStatus, "OTP verified. You can now register/login.", true);
    updateRegisterState();
  } catch (error) {
    otpVerified = false;
    setStatus(otpStatus, `OTP verification failed: ${error.message}`);
    updateRegisterState();
  }
});

document.getElementById("registerForm").addEventListener("submit", (event) => {
  event.preventDefault();

  if (!(aadhaarVerified && otpVerified)) {
    alert("Complete Aadhaar and OTP verification first.");
    return;
  }

  currentUser = {
    name: document.getElementById("name").value,
    mobile: mobileInput.value,
    aadhaar: aadhaarInput.value,
    state: document.getElementById("state").value,
    village: document.getElementById("village").value,
    role: document.getElementById("role").value,
    verified: true,
  };
  setJSON("currentUser", currentUser);
  renderUser();
});

document.getElementById("addSchemeForm").addEventListener("submit", (event) => {
  event.preventDefault();
  if (currentUser?.role !== "super-admin") {
    alert("Only super admin can add schemes.");
    return;
  }

  const scheme = {
    name: document.getElementById("schemeName").value,
    state: document.getElementById("schemeState").value,
    category: document.getElementById("schemeCategory").value,
    link: document.getElementById("schemeLink").value,
    benefit: document.getElementById("schemeBenefit").value,
  };

  schemes.push(scheme);
  setJSON("schemes", schemes);
  renderSchemes();
  event.target.reset();
});

schemeList.addEventListener("click", (event) => {
  if (!event.target.dataset.apply) return;
  if (!currentUser) {
    alert("Please register/login first.");
    return;
  }

  const index = Number(event.target.dataset.apply);
  userApplications.push({
    user: currentUser.name,
    scheme: schemes[index].name,
    status: "Submitted",
  });
  setJSON("applications", userApplications);
  renderApplications();
});

stateFilter.addEventListener("change", renderSchemes);
categoryFilter.addEventListener("change", renderSchemes);

const themeSelect = document.getElementById("themeSelect");
const savedTheme = localStorage.getItem("theme") || "seva";
themeSelect.value = savedTheme;
applyTheme(savedTheme);

themeSelect.addEventListener("change", () => {
  const theme = themeSelect.value;
  localStorage.setItem("theme", theme);
  applyTheme(theme);
});

function applyTheme(theme) {
  document.body.classList.remove("theme-gov", "theme-contrast");
  if (theme === "gov") document.body.classList.add("theme-gov");
  if (theme === "contrast") document.body.classList.add("theme-contrast");
}

const commissionRate = document.getElementById("commissionRate");
const commissionNote = document.getElementById("commissionNote");
const savedCommission = localStorage.getItem("commissionRate") || "8";
commissionRate.value = savedCommission;
commissionNote.textContent = `Current commission rule: ${savedCommission}%`;

document.getElementById("saveCommission").addEventListener("click", () => {
  localStorage.setItem("commissionRate", commissionRate.value);
  commissionNote.textContent = `Current commission rule: ${commissionRate.value}%`;
});

renderSchemes();
renderApplications();
renderUser();
updateRegisterState();
