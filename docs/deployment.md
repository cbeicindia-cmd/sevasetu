# Deployment Guide

## Dockerized Local Stack
```bash
docker compose up --build
```

Services:
- `backend`: Express API on port `4000`
- `frontend`: Next.js app on port `3000`
- `db`: PostgreSQL on port `5432`

## CI/CD Pipeline
GitHub Actions workflow (`.github/workflows/ci-cd.yml`):
1. Install dependencies for backend/frontend/mobile.
2. Run TypeScript checks.
3. Build backend and frontend.
4. Build and push Docker images (on `main`).

## Production Hosting
- **Frontend**: Vercel deployment from `frontend/`.
- **Backend + DB**: Hostinger VPS (Docker Compose) or managed containers.
- Set environment variables:
  - `DATABASE_URL`
  - `JWT_SECRET`
  - `OPENAI_API_KEY`
  - `NEXT_PUBLIC_API_URL`

## Recommended Enhancements
- Add Redis for caching/session blacklisting.
- Add S3-compatible document storage for scheme uploads.
- Add observability stack (Prometheus + Grafana + Loki).
