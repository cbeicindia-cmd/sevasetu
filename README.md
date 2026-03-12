# SevaSetu South Portal

Telangana and Andhra Pradesh focused Gram Panchayat-level portal prototype with:

- End-user, agent, and super-admin registration/login flow.
- Aadhaar format/checksum verification in registration.
- OTP-based login process.
- MSG91 OTP API integration via backend endpoint.
- Telangana + Andhra Pradesh state scheme directory (plus key national schemes).
- State + category filtering for faster service discovery.
- Super admin panel for adding new TS/AP/national schemes.
- Multi-scheme application tracking.
- Theme switching (default, government blue, high contrast).
- Agent commission rule configuration.

## Preview locally

```bash
npm run preview
```

Open: http://localhost:4173

## MSG91 configuration

```bash
export MSG91_AUTH_KEY="your-auth-key"
export MSG91_TEMPLATE_ID="your-template-id"
export MSG91_SENDER="SEVAST"
npm run preview
```

If MSG91 keys are not set, app runs in mock mode and returns demo OTP for testing.

## Validation

```bash
npm run check
```
