<div align="center">

# <img src="frontend/src/assets/images/clothes/logo favicon.png" alt="Qissa Wear" width="80">

### Premium Pakistani Fashion — E-Commerce Platform

[![Live Demo](https://img.shields.io/badge/Live_Demo-qissa--wear.vercel.app-000?style=flat-square&logo=vercel&logoColor=white)](https://qissa-wear.vercel.app/)
[![MERN Stack](https://img.shields.io/badge/MERN-Stack-000000?style=flat-square&logo=mongodb&logoWidth=20)](#tech-stack)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](#license)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square)](#contributing)

<img src="frontend/src/assets/images/about 1.webp" alt="Qissa" width="100%">

</div>

---

## Overview

Qissa Wear is a full-stack e-commerce platform for premium Pakistani fashion. It features an AI-powered stylist recommendation engine, a complete admin dashboard, blog system, Stripe payments, and a modern editorial UI built with React and Framer Motion.

## Key Features

### Customer

- **AI Stylist** — Get outfit recommendations based on occasion, budget, color, style, and season. Powered by Groq LLM with deterministic backend scoring.
- **Product Catalog** — Browse by category, filter by fabric/price/season, search with real-time results.
- **Cart & Wishlist** — Persistent cart and wishlist across sessions.
- **Stripe Payments** — Secure checkout with Stripe integration.
- **Order Tracking** — Real-time order status with history.
- **Blog** — Fashion articles and style guides.

### Admin

- **Dashboard** — Revenue, orders, customers, and inventory analytics.
- **Product Management** — Full CRUD with image handling, variant/stock tracking.
- **Order Management** — Status updates, filtering, and bulk operations.
- **Blog Management** — Create, edit, publish blog posts.
- **Customer Insights** — Customer list with order history.

### Technical

- **AI Recommendation Pipeline** — MongoDB → Backend Scoring → Groq Ranking → MongoDB Re-fetch. Groq only ranks real products; no hallucinated data.
- **Role-Based Access** — JWT auth with admin/user separation.
- **Rate Limiting & Security** — Helmet, CORS, rate limiting, input validation with Zod.
- **Responsive Design** — Mobile-first with smooth Framer Motion animations.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Redux Toolkit, React Router, Framer Motion, Recharts, Vite |
| Backend | Node.js, Express 5, Mongoose, JWT, Zod |
| Database | MongoDB Atlas |
| AI Engine | Groq SDK (Llama 3.3 70B Versatile) |
| Payments | Stripe |
| Security | Helmet, CORS, Rate Limiting |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (React 19)                        │
│  Vite · Redux Toolkit · React Router · Framer Motion            │
├─────────────────────────────────────────────────────────────────┤
│                          API (Express 5)                        │
│  JWT Auth · Zod Validation · Rate Limiting · Helmet             │
├──────────┬──────────┬───────────┬──────────┬───────────────────┤
│ Products │  Orders  │ Payments  │   Blog   │  AI Stylist       │
│    Cart  │ Wishlist │ Addresses │ Dashboard│ (Groq + MongoDB)  │
├──────────┴──────────┴───────────┴──────────┴───────────────────┤
│                       MongoDB Atlas                             │
│  Users · Products · Orders · Cart · Wishlist · Blogs            │
└─────────────────────────────────────────────────────────────────┘
```

### AI Recommendation Flow

```
User Input (occasion, budget, color, style, season)
        │
        ▼
┌──────────────────┐
│  MongoDB Query   │  Fetch all active products with stock > 0
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Backend Scoring  │  Color match, budget proximity, occasion,
│                  │  season, style, fabric — deterministic
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  Groq Ranking    │  Top candidates → LLM ranks them
│  (Llama 3.3)    │  Returns IDs + reasons only
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ MongoDB Re-fetch │  Complete product documents returned
│                  │  Frontend receives real products only
└──────────────────┘
```

---

## Project Structure

```
Qissa-clothing-store/
├── backend/
│   ├── src/
│   │   ├── config/          # DB, Stripe, Groq, env validation
│   │   ├── controllers/     # Route handlers (10 controllers)
│   │   ├── middlewares/     # Auth, error handling, validation
│   │   ├── models/          # Mongoose schemas (8 models)
│   │   ├── routes/          # API routes (13 route files)
│   │   ├── scripts/         # Admin creation, seeding
│   │   ├── seed/            # Product seed data
│   │   ├── services/        # Business logic
│   │   │   ├── recommendation/   # AI pipeline
│   │   │   │   ├── candidateSelector.js
│   │   │   │   ├── filters.js
│   │   │   │   ├── promptBuilder.js
│   │   │   │   └── scoring.js
│   │   │   ├── aiStylistService.js
│   │   │   ├── orderService.js
│   │   │   └── paymentService.js
│   │   ├── utils/           # Helpers
│   │   └── validations/     # Zod schemas
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI
│   │   │   ├── AI/          # Recommendation UI (7 components)
│   │   │   ├── admin/       # Admin layout & route guard
│   │   │   ├── cart/        # Cart drawer
│   │   │   ├── checkout/    # Checkout forms
│   │   │   ├── layout/      # Navbar, Footer, MainLayout
│   │   │   ├── orders/      # Order cards
│   │   │   ├── sections/    # Homepage sections
│   │   │   └── ui/          # ProductCard, etc.
│   │   ├── features/        # Redux slices (cart, wishlist)
│   │   ├── pages/           # 20+ page components
│   │   │   ├── admin/       # Admin dashboard (7 pages)
│   │   │   ├── Home.jsx
│   │   │   ├── AIRecommendation.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   └── ...
│   │   ├── services/        # API service layer (11 files)
│   │   └── utils/           # Image helpers
│   ├── package.json
│   └── vite.config.js
├── COMPETITOR_ANALYSIS.md
├── PROJECT_ROADMAP.md
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Stripe account (for payments)
- Groq API key (for AI recommendations)

### Installation

```bash
# Clone the repository
git clone https://github.com/ayyanzubair729/Qissa-clothing-store.git
cd Qissa-clothing-store
```

**Backend:**

```bash
cd backend
npm install
cp .env.example .env   # Edit with your credentials
```

**Frontend:**

```bash
cd frontend
npm install
```

### Environment Variables

Create `backend/.env`:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/qissa_wear?retryWrites=true&w=majority
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
GROQ_API_KEY=gsk_...
```

### Running the App

```bash
# Backend (terminal 1)
cd backend
npm run dev

# Frontend (terminal 2)
cd frontend
npm run dev
```

The app runs at:
- Frontend → `http://localhost:5173`
- Backend API → `http://localhost:5000/api`

### Seed Data

```bash
cd backend
npm run seed          # Seed products
npm run seed:style    # Seed style products
npm run seed:pret     # Seed pret products
```

---

## API Endpoints

### Public

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/products` | List products (search, filter, paginate) |
| GET | `/api/products/:id` | Product detail |
| GET | `/api/products/trending` | Trending deals |
| GET | `/api/categories` | List categories |
| GET | `/api/blogs` | List blog posts |

### Authenticated

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/cart` | Add to cart |
| GET | `/api/cart` | Get cart |
| PUT | `/api/cart/:productId` | Update cart item |
| DELETE | `/api/cart/:productId` | Remove from cart |
| POST | `/api/wishlist` | Add to wishlist |
| GET | `/api/wishlist` | Get wishlist |
| POST | `/api/addresses` | Create address |
| GET | `/api/addresses` | List addresses |
| POST | `/api/orders` | Create order |
| GET | `/api/orders` | List user orders |
| POST | `/api/payments/create-intent` | Create Stripe payment intent |

### AI Stylist

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/ai/test` | Test Groq connection |
| POST | `/api/ai/stylist` | Get AI outfit recommendations |

### Admin

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard` | Dashboard analytics |
| POST | `/api/products` | Create product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |
| PATCH | `/api/orders/:id/status` | Update order status |
| POST | `/api/blogs` | Create blog post |

---

## Database Models

```
User ─┬── Cart ──── CartItem ──── Product
      ├── Wishlist ──── Product
      ├── Address
      └── Order ──── OrderItem ──── Product
                         │
                    Payment

Product ──── Variant (color + size + stock)
         ──── Image (url + alt)

Blog ──── title, slug, content, image, author
```

---

## AI Recommendation System

The recommendation engine uses a **deterministic scoring + LLM ranking** approach:

1. **Candidate Selection** — Fetch active products, filter by budget and season
2. **Backend Scoring** — Weighted scoring per criteria:
   - Exact Color Match: **+40** · Near Match: **+25** · Neutral: **+10**
   - Within Budget: **+20** · Budget Proximity: **+10**
   - Correct Occasion: **+15** · Season: **+10** · Style: **+10**
   - Premium Fabric: **+5** · Low Stock: **−5**
3. **Groq Ranking** — Top 30 candidates sent to Llama 3.3 70B for re-ranking
4. **MongoDB Re-fetch** — Complete product documents returned to frontend

**Groq never invents products.** It only receives real MongoDB metadata and returns ranking + reasons.

---

## Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| Charcoal | `#1c1816` | Primary text |
| Warm Beige | `#f5f1ec` | Backgrounds |
| Rose Gold | `#b76e79` | Accents |
| Ivory | `#fefbf6` | Cards |

---

## Scripts

```bash
# Backend
npm run dev          # Start with nodemon
npm start            # Production start
npm run seed         # Seed product catalog
npm run seed:style   # Seed style products
npm run seed:pret    # Seed pret products

# Frontend
npm run dev          # Vite dev server
npm run build        # Production build
npm run lint         # ESLint check
npm run preview      # Preview production build
```

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## Author

**Ayyan Zubair** — [GitHub](https://github.com/ayyanzubair729)

---

## License

This project is licensed under the MIT License.
