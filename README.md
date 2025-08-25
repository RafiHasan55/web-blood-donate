# Web Blood Donate — MERN App Connecting Donors and Recipients

[![Releases](https://img.shields.io/badge/Releases-Latest-red)](https://github.com/RafiHasan55/web-blood-donate/releases)

A MERN stack web app that links blood donors with recipients. It includes donation requests, blog articles, user management, and funding support. The project uses modern tools: React, Node, Express, MongoDB, JWT, Firebase Auth, Stripe, and TanStack Query.

![Blood donation hero](https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1500&q=80)

Table of contents
- Features
- Demo & Releases
- Tech stack
- Architecture
- Quick start
- Environment variables
- Run locally
- API overview
- Auth flow
- Payments
- Database seeding
- Testing
- Deployment
- Contribute
- License
- Contact

Features
- Donation requests: create, list, filter by blood group, location, urgency.
- Donor profiles: manage availability, past donations, contact options.
- Recipient dashboard: claim requests, update status.
- Blog module: create and read articles, markdown support.
- Funding support: Stripe payments and donation tracking.
- User roles: admin, donor, recipient.
- Real-time updates on request status using socket-like patterns.
- Modern UI: React + Framer Motion for smooth transitions.
- Data fetching with TanStack Query and Axios.
- Auth: Firebase Auth for client identity and JWT for API access.
- Secure API endpoints with role checks and JWT verification.

Demo & Releases
- Visit the releases page to get packaged builds or installers: https://github.com/RafiHasan55/web-blood-donate/releases
- The releases page contains compiled assets and release notes. Download the release asset that matches your platform and execute the included installer or script.
- Typical steps after download:
  - Linux/macOS: tar -xzf web-blood-donate-linux.tar.gz && cd web-blood-donate && ./install.sh
  - Windows: unzip web-blood-donate-win.zip and run install.bat
- Use the badge at the top to open the releases page.

Tech stack
- Frontend: React, React Router, TanStack Query, Framer Motion, Firebase Auth
- Backend: Node.js, Express.js, MongoDB
- Auth: Firebase Authentication (client), JWT tokens (server)
- HTTP: Axios for client-server requests
- Payments: Stripe for one-time donations and recurring support
- Tools: ESLint, Prettier, Husky, GitHub Actions (CI)
- Testing: Jest for backend, React Testing Library for frontend
- Hosting: Vercel/Netlify for frontend, DigitalOcean or Heroku for backend, MongoDB Atlas

Architecture
- Client (React)
  - Routes: /, /donate, /requests, /blog, /dashboard
  - API client: axios wrapper with JWT injection
  - State: TanStack Query for server state, local state for UI
- Server (Express)
  - REST API: /api/auth, /api/requests, /api/users, /api/payments, /api/blog
  - Auth middleware: verify JWT and role
  - Payment webhook endpoint for Stripe
- Database (MongoDB)
  - Collections: users, requests, donations, payments, posts
  - Indexes on location, blood group, and createdAt
- Security
  - JWT signed with server secret
  - Rate limiting per IP for sensitive endpoints
  - Input validation with Joi or express-validator

Quick start
1. Clone the repo
   git clone https://github.com/RafiHasan55/web-blood-donate.git
2. Install dependencies
   - Server: cd server && npm install
   - Client: cd client && npm install
3. Set environment variables (see below)
4. Start services (see Run locally)

Environment variables
- Server (.env)
  - PORT=5000
  - MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/web-blood-donate
  - JWT_SECRET=replace_with_secure_key
  - FIREBASE_SERVICE_ACCOUNT=path/to/serviceAccountKey.json
  - STRIPE_SECRET_KEY=sk_live_xxx
  - STRIPE_WEBHOOK_SECRET=whsec_xxx
- Client (.env)
  - REACT_APP_API_URL=http://localhost:5000/api
  - REACT_APP_FIREBASE_API_KEY=xxx
  - REACT_APP_FIREBASE_AUTH_DOMAIN=xxx.firebaseapp.com
  - REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_live_xxx

Run locally
- Development mode (client and server)
  - Start server
    cd server
    npm run dev
  - Start client
    cd client
    npm start
- Run both with a root script (if provided)
  - In the repo root:
    npm run dev:all
- Production build
  - Build client: cd client && npm run build
  - Serve static build from Express:
    - Move build to server/public or configure static folder
    - Start server in production mode: NODE_ENV=production node dist/server.js

API overview
- Auth
  - POST /api/auth/firebase-login
    - Accepts Firebase ID token, returns server JWT.
  - POST /api/auth/login
    - Email and password login for local accounts.
- Requests
  - GET /api/requests
    - Query params: bloodGroup, city, radius, page, limit
  - POST /api/requests
    - Auth required. Create new donation request.
  - PATCH /api/requests/:id/claim
    - Auth required. Claim a request as donor.
- Users
  - GET /api/users/:id
  - PATCH /api/users/:id/role
    - Admin only. Promote or demote users.
- Payments
  - POST /api/payments/checkout
    - Create Stripe checkout session.
  - POST /api/payments/webhook
    - Stripe webhook handler.
- Blog
  - GET /api/blog
  - POST /api/blog
    - Admin or editor role required.

Auth flow
- Client authenticates with Firebase.
- Client sends Firebase ID token to /api/auth/firebase-login.
- Server verifies token with Firebase Admin SDK.
- Server issues JWT valid for API requests.
- Client stores JWT in memory or secure storage.
- Client sends JWT in Authorization header for protected endpoints.

Payments
- Stripe Checkout handles payments and receipts.
- Server creates Checkout sessions and records payments.
- Webhook endpoint verifies signature with STRIPE_WEBHOOK_SECRET.
- Completed payments create donation records in MongoDB.

Database seeding
- Seed script: server/scripts/seed.js
- Example commands:
  node server/scripts/seed.js --env=dev
  node server/scripts/seed.js --clear
- Seed creates:
  - Sample users (admin, donor, recipient)
  - Sample requests across common blood groups
  - Sample blog posts
- Seed script uses MONGO_URI from .env

Testing
- Server tests
  - cd server
  - npm test
- Client tests
  - cd client
  - npm test
- Use coverage flags:
  - npm run test:coverage
- CI: GitHub Actions runs tests on PRs and pushes to main.

Deployment
- Frontend
  - Build and deploy to Vercel, Netlify, or static host.
  - Set environment variables in hosting console.
- Backend
  - Deploy to DigitalOcean App Platform, Heroku, or container host.
  - Use PM2, Docker, or native process manager.
- Database
  - Use MongoDB Atlas with proper IP access and user roles.
- Webhooks
  - Ensure public endpoint for Stripe webhooks.
  - Use a tunnel (ngrok) for local webhook testing.

Contribute
- Fork the repo.
- Create a feature branch.
- Run tests and lint before PR.
- Open PR with a clear title and description.
- Add tests for new features.
- Follow commit message style: feat|fix|docs|chore(scope): short description
- Maintainers will review and merge approved PRs.

Developer notes
- Axios instance injects JWT into Authorization header.
- Use TanStack Query for server cache and background refetch.
- Use Framer Motion for animated modals and list reordering.
- Store minimal profile data client-side; read fresh data from API when needed.
- Use stripe webhooks to reconcile payment status server-side.

Screenshots
- Landing page
  ![Landing](https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80)
- Request list
  ![Requests](https://images.unsplash.com/photo-1521790366326-2a2d79d0d0a2?auto=format&fit=crop&w=1200&q=80)

Releases (download and execute)
- The releases page contains packaged builds and installers. Download the asset for your platform and run the included installer or script.
- Example:
  - Download via curl:
    curl -L -o web-blood-donate-release.tar.gz https://github.com/RafiHasan55/web-blood-donate/releases/download/v1.0.0/web-blood-donate-v1.0.0-linux.tar.gz
  - Extract and run:
    tar -xzf web-blood-donate-release.tar.gz
    cd web-blood-donate-v1.0.0
    ./install.sh
- Use this link to get the release assets: https://github.com/RafiHasan55/web-blood-donate/releases

Common issues and fixes
- Mongo connection error
  - Confirm MONGO_URI and network access to Atlas.
- Firebase service account error
  - Ensure FIREBASE_SERVICE_ACCOUNT path is valid on the server.
- Stripe webhook signature mismatch
  - Confirm STRIPE_WEBHOOK_SECRET matches the secret shown in the Stripe dashboard.

License
- MIT License. See LICENSE file for details.

Contact
- Repo: https://github.com/RafiHasan55/web-blood-donate
- Open an issue for bugs or feature requests.
- For urgent support, create an issue and tag @maintainer.