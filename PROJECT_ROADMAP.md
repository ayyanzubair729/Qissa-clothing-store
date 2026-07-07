# Qissa Wear MERN Roadmap (Build + Learn)

This project will be built in small, practical phases. Each phase has:

- **Build goal**: what we ship
- **Learning goal**: what concept you master
- **Definition of done**: how we verify completion

## Phase 0 - Foundation (Current)

### Build goal

- Working frontend and backend startup workflow
- Clean backend architecture scaffold
- Environment configuration standard

### Learning goal

- Why structure matters in full-stack projects
- How app bootstrapping and environment validation work

### Definition of done

- Frontend starts with `npm run dev` inside `frontend`
- Backend has health endpoint and route versioning
- Root command can run both apps in parallel

## Phase 1 - Authentication + Core UI

### Build goal

- User signup/login with JWT
- Protected routes (user and admin)
- Frontend auth pages + modern homepage direction

### Learning goal

- JWT flow: issue, verify, protect
- Password hashing and auth security basics
- React auth state management patterns

### Definition of done

- `POST /api/v1/auth/signup` stores hashed passwords
- `POST /api/v1/auth/login` returns JWT securely
- Protected API route denies unauthenticated users
- Frontend can sign up, log in, and persist session

## Phase 2 - Products + Admin CRUD

### Build goal

- Product and category models
- Admin panel CRUD for products/categories
- Image upload support (local first, cloud optional)

### Learning goal

- Mongo schema design for e-commerce
- Role-based route protection
- Form state and dashboard architecture

### Definition of done

- Admin can create/edit/delete products and categories
- Public product listing and detail pages are dynamic

## Phase 3 - Cart + Orders

### Build goal

- Cart add/remove/update quantity
- Checkout creation flow
- Order lifecycle states

### Learning goal

- Relational thinking in MongoDB references
- Transaction-like consistency for stock and orders

### Definition of done

- User can place order from cart
- Admin can update order statuses

## Phase 4 - Search + UX Polish

### Build goal

- Search endpoint with filters/sorting/pagination
- Responsive polish and performance improvements

### Learning goal

- Query optimization patterns
- UX decisions that improve conversion

### Definition of done

- Fast search and robust filter behavior
- Mobile-first product browsing feels smooth

## Phase 5 - Analytics + Advanced Features

### Build goal

- Wishlist, reviews, stock dashboard, analytics
- Optional email notifications and payment integration

### Learning goal

- Feature prioritization and iterative product scaling

### Definition of done

- Analytics dashboard is usable for admin decisions
- Wishlist/reviews are integrated in customer journey

## Working Style

- Build one feature slice at a time
- After each slice: explain architecture + code walk-through
- Keep commit-level increments to avoid confusion
