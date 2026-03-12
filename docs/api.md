# API Layer (REST)

Base URL: `/api/v1`

## Authentication
- `POST /auth/signup`
- `POST /auth/login`

## Marketplace
- `GET /marketplace/products`
- `POST /marketplace/products` (SELLER)

## Orders
- `POST /orders` (authenticated)
- `GET /orders/:id` (authenticated)

## Government Schemes
- `GET /schemes?state=&ministry=&category=&eligibility=`
- `POST /schemes/apply` (authenticated)

## AI Seller Tools
- `POST /ai/description` (SELLER)
- `POST /ai/pricing` (SELLER)
- `POST /ai/demand` (SELLER)
- `POST /ai/caption` (SELLER)

## Incentives
- `POST /incentives/award` (authenticated)

## Admin
- `PATCH /admin/sellers/:sellerId/approve`
- `PATCH /admin/products/:productId/approve`
- `GET /admin/analytics`
