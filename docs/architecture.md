# Gramin Udyog Architecture

## 1) Project Folder Structure

```text
sevasetu/
├── backend/
│   ├── prisma/schema.prisma
│   ├── src/
│   │   ├── app.ts
│   │   ├── server.ts
│   │   ├── config/{db.ts,env.ts}
│   │   ├── middleware/{auth.ts,rateLimit.ts}
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── marketplace/
│   │   │   ├── orders/
│   │   │   ├── schemes/
│   │   │   ├── ai/
│   │   │   ├── incentives/
│   │   │   └── admin/
│   │   ├── routes/index.ts
│   │   └── utils/roles.ts
├── frontend/
│   └── src/app/{page.tsx, marketplace/, government-schemes/, become-seller/, about/, contact/, login/, signup/, seller-dashboard/, admin/}
├── mobile/
│   └── src/{App.tsx,screens/{buyer,seller,admin}}
├── docs/{architecture.md,api.md,deployment.md}
├── docker-compose.yml
└── .github/workflows/ci-cd.yml
```

## 2) High-Level Components
- **Public Website**: landing pages, scheme discovery, seller onboarding journey.
- **Marketplace**: products, categories, cart/checkout integration points, order tracking.
- **Seller Dashboard**: inventory + order management + AI productivity tools.
- **Gov Scheme Portal**: searchable schemes DB + application lifecycle and document upload metadata.
- **Admin Panel**: role-based operations for approvals, moderation, and reporting.
- **Mobile App**: buyer/seller/admin surfaces in React Native.
- **API Layer**: Express REST v1 with JWT auth, RBAC guards, rate limiting.
- **Data Layer**: PostgreSQL with relational schema for users, sellers, products, orders, schemes, incentives.

## 3) Security
- JWT authentication
- OAuth extensibility in auth module
- Role-based access controls (middleware-level)
- Rate limiting on all APIs
- Helmet-based hardening
- Password hashing with bcrypt
- Encryption at rest should be enabled via DB host configuration
