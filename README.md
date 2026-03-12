# Gramin Udyog

Production-ready monorepo for **Gramin Udyog** — a Rural Commerce and Government Scheme Ecosystem for India.

## Monorepo Apps
- `frontend/` → Next.js + Tailwind + TypeScript public website, marketplace, seller dashboard, admin panel
- `backend/` → Node.js + Express + REST APIs, JWT/OAuth-ready auth, RBAC, AI tool endpoints
- `mobile/` → React Native app for buyer, seller, and admin workflows
- `docs/` → architecture, deployment, API and schema references

## Quick Start
```bash
# 1) Backend
cd backend
npm install
npm run dev

# 2) Frontend
cd ../frontend
npm install
npm run dev

# 3) Mobile
cd ../mobile
npm install
npm run start
```

## Production Highlights
- JWT authentication + role-based authorization
- Marketplace + schemes portal APIs
- AI seller tools with OpenAI integration
- Incentive engine (points, cashback, coupons)
- Dockerized services + GitHub Actions CI/CD
- Database schema with strong relational modeling (PostgreSQL)
