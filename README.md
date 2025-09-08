# Bao Technologies & Travels - Backend (Express + Postgres)

## Quickstart (Docker)
1. Copy `.env.example` -> `.env` and set JWT_SECRET etc.
2. Build & run:
   docker-compose up --build
3. App on http://localhost:8000

## Local dev (no Docker)
1. Install dependencies: npm ci
2. Start a local Postgres and set DATABASE_URL env var
3. Start app: npm run dev

## API Endpoints
- POST /api/auth/register {email,password,fullName}
- POST /api/auth/login {email,password}
- GET  /api/products/public?q=&page=&per_page=
- GET  /api/products/:id
- POST /api/products (auth) {title,description,price,images}
- GET  /api/products/me (auth)
- PUT  /api/products/:id (auth owner)
- DELETE /api/products/:id (auth owner)

## Tests
npm test
