# STELANI – Full-Stack E-Commerce Platform

Full-stack system for **STELANI**, an artisanal e-commerce platform for handcrafted beaded bags.  
Composed of a **Go (Gin)** backend and a **React + TypeScript + Tailwind CSS** frontend, following **Clean Architecture** and **REST API** design principles.

---

## 🧩 Overview

STELANI provides a modular e-commerce environment supporting:
- **Public product catalog** with advanced filtering (no customer login required)
- **Shopping cart** with localStorage persistence
- **WhatsApp-based checkout** (no online payment gateway)
- **Custom handmade order requests** via WhatsApp
- **Full administrative CMS** for managing products, images, and prices
- **Admin-only authentication** (customers browse anonymously)

Designed for **scalability**, **maintainability**, and **clear separation of concerns** between API and UI layers.

---

## ⚙️ Tech Stack

### Backend
- **Language:** Go 1.24+
- **Framework:** Gin Web Framework
- **Database:** PostgreSQL
- **ORM:** GORM
- **Auth:** JWT (admin-only access)
- **Security:** bcrypt password hashing (cost 12), CORS protection
- **Architecture:** Clean Architecture (domain, application, infrastructure layers)

### Frontend
- **Build Tool:** Vite  
- **Library:** React 18  
- **Language:** TypeScript  
- **Styling:** Tailwind CSS + shadcn/ui  
- **State Management:** TanStack Query (server state) + Zustand (client state - cart, auth)  
- **Forms:** React Hook Form + Zod  
- **Routing:** React Router v6  
- **HTTP Client:** Axios (with JWT interceptors)  
- **Icons:** Lucide React  

---

## 🏗️ Architecture

```
[Customer Browser]
      ↓
[Frontend SPA] React + TypeScript + Tailwind
      ↓ (Public API calls + WhatsApp redirect)
[Backend API] Go (Gin) – RESTful architecture
      ↓
[PostgreSQL Database]

[Admin Browser]
      ↓
[Admin Panel] Protected routes (JWT)
      ↓
[Backend API] Admin endpoints (CRUD products)
      ↓
[PostgreSQL Database]
```

### Repository Structure

```
stelani/
├── backend/
│   ├── cmd/api/                    # Main entry point
│   ├── internal/
│   │   ├── domain/
│   │   │   ├── entities/          # Product, User, Order, CustomOrder
│   │   │   ├── repositories/      # Repository interfaces
│   │   │   └── services/          # Business logic (AuthService, ProductService)
│   │   ├── application/
│   │   │   └── dto/               # Data Transfer Objects
│   │   └── infrastructure/
│   │       ├── database/          # Repository implementations, PostgreSQL connection
│   │       └── http/
│   │           ├── handlers/      # HTTP request handlers
│   │           ├── middlewares/   # JWT auth, CORS
│   │           └── routes/        # API route definitions
│   ├── config/                    # Configuration (DB, JWT, WhatsApp)
│   └── migrations/                # Database migrations
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── common/           # Button, reusable UI
    │   │   ├── layout/           # Header, Footer
    │   │   └── product/          # ProductCard
    │   ├── pages/
    │   │   ├── home/             # HomePage
    │   │   ├── catalog/          # ProductsPage
    │   │   ├── product/          # ProductDetailPage
    │   │   ├── cart/             # CartPage
    │   │   ├── checkout/         # CheckoutPage (WhatsApp redirect)
    │   │   ├── custom/           # CustomOrderPage (WhatsApp redirect)
    │   │   ├── success/          # SuccessPage
    │   │   └── admin/            # Admin dashboard, products CRUD
    │   ├── services/api/         # Axios config, API endpoints
    │   ├── store/                # Zustand stores (cart, auth)
    │   ├── hooks/                # Custom React hooks (useAuth, useProducts)
    │   ├── types/                # TypeScript interfaces
    │   ├── utils/                # Utility functions
    │   └── config/               # WhatsApp number, message formatter
    └── public/
```

Follows **Clean Architecture** for backend and **feature-based organization** for frontend.

---

## 🧠 Core Features

### Customer (Public - No Login Required)
- **Browse catalog** with filters (category: infantil/adulto)
- **View product details** (images, dimensions, production time)
- **Add to cart** (persists in localStorage)
- **Checkout via WhatsApp**: Fill form → Send order details via WhatsApp
- **Custom orders via WhatsApp**: Request personalized bags with specifications
- **No payment gateway**: All transactions handled via WhatsApp conversation

### Admin (Protected - JWT Authentication)
- **Login-only access** to `/admin` routes
- **Product management**: Full CRUD (Create, Read, Update, Delete)
- **Image management**: Upload via URL (Imgur, Cloudinary, etc.)
- **Price updates**: Edit product prices in real-time
- **View orders**: See incoming orders (manual tracking)
- **CMS-style interface**: Intuitive admin dashboard

---

## 🔐 Business Logic

### Authentication Flow
1. **Admin login** at `/admin/login` with email/password
2. Backend validates credentials, returns JWT token
3. Frontend stores token in localStorage
4. Protected routes (`/admin/*`) require valid JWT
5. **Customers do NOT need accounts** - browse freely

### Checkout Flow
1. Customer adds products to cart (localStorage)
2. Navigates to `/checkout`
3. Fills form: name, phone, address, notes
4. Clicks "Send Order via WhatsApp"
5. Opens WhatsApp Web with pre-formatted message:
   ```
   Olá! Sou *[Nome]*
   📱 [Telefone]
   📍 Endereço: [Endereço]
   
   🛍️ Meu pedido:
   - [Produto 1] (2x) - R$ XX.XX
   - [Produto 2] (1x) - R$ XX.XX
   
   💰 Total: R$ XXX.XX
   
   📝 Observações: [Notas]
   ```
6. Cart clears, redirects to `/success`
7. **Admin handles payment/shipping via WhatsApp**

### Custom Order Flow
1. Customer navigates to `/custom`
2. Fills form: colors, size, quantity, description
3. Clicks "Send via WhatsApp"
4. Opens WhatsApp with custom order details
5. Admin responds with quote and timeline

---

## 🔒 Security

- **bcrypt password hashing** (cost 12) for admin accounts
- **JWT authentication** with 24h expiry (admin-only)
- **HTTPS-only** communication (production)
- **CORS protection** (only allows frontend origin)
- **Rate limiting** (100 req/min/IP)
- **Input validation** (Gin binding + Zod schemas)
- **SQL injection prevention** (GORM prepared statements)
- **No customer PII stored** (orders sent via WhatsApp)

---

## 🧪 Testing

### Backend
- Unit tests for services and repositories
- Integration tests for API endpoints
- Coverage goal: ≥70%

### Frontend
- Component tests with React Testing Library
- E2E tests for critical flows (cart, checkout)
- Manual testing checklist (see documentation)

---

## 🛠️ Setup & Installation

### Prerequisites
- **Go 1.24+**
- **Node.js 20.19+**
- **PostgreSQL 14+**
- **Git**

### Backend Setup

```bash
# Clone repository
git clone https://github.com/Murilo-The-Dev/Stelani.git
cd Stelani/backend

# Install Go dependencies
go mod tidy

# Configure environment
cp .env.example .env
# Edit .env with your PostgreSQL credentials and JWT secret

# Start PostgreSQL (or use existing instance)
# Create database: CREATE DATABASE stelani;

# Run migrations (auto-migrate on startup)
go run cmd/api/main.go
```

**Environment Variables (.env):**
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=stelani
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
SERVER_PORT=8080
WHATSAPP_NUMBER=5511999999999
```

### Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env.development
# Edit .env.development with API URL

# Start development server
npm run dev
```

**Environment Variables (.env.development):**
```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

**Update WhatsApp Number:**
Edit `frontend/src/config/constants.ts`:
```typescript
export const WHATSAPP_NUMBER = '5511999999999'; // Change to actual number
```

### Create Admin User

**Option 1: SQL (Recommended)**
```sql
-- Password: admin123 (bcrypt hash)
INSERT INTO users (id, email, password_hash, role, name, phone, created_at, updated_at)
VALUES (
    gen_random_uuid(),
    'admin@stelani.com',
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5oe2rN8Y6Lz4.',
    'admin',
    'Admin Stelani',
    '11999999999',
    NOW(),
    NOW()
);
```

**Option 2: API Endpoint (Development Only)**
```bash
curl -X POST http://localhost:8080/api/v1/admin/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@stelani.com",
    "password": "your_password",
    "name": "Admin Name",
    "phone": "11999999999"
  }'
```

### Access Points

- **Public Site:** http://localhost:5173
- **Admin Login:** http://localhost:5173/admin/login
- **Backend API:** http://localhost:8080/api/v1
- **API Docs:** http://localhost:8080/swagger (if configured)

---

## 📂 API Endpoints

### Public Endpoints
```
GET    /api/v1/products           # List all products (with optional ?category filter)
GET    /api/v1/products/:id       # Get product details
```

### Admin Endpoints (Protected)
```
POST   /api/v1/admin/auth/login   # Admin login
POST   /api/v1/admin/products     # Create product
PUT    /api/v1/admin/products/:id # Update product
DELETE /api/v1/admin/products/:id # Delete product (soft delete)
```

---

## 🗺️ Roadmap

### ✅ Phase 1 – MVP (Current)
- [x] Admin authentication (JWT)
- [x] Product CRUD
- [x] Public catalog with filters
- [x] Shopping cart (localStorage)
- [x] WhatsApp checkout integration
- [x] Custom orders via WhatsApp
- [x] Admin CMS panel

### 🚧 Phase 2 – Enhancement
- [ ] Image upload to cloud storage (Cloudinary/S3)
- [ ] Order history tracking in database
- [ ] Email notifications (order confirmations)
- [ ] Material inventory management
- [ ] Production status tracking

### 🔮 Phase 3 – Advanced
- [ ] Payment gateway integration (optional)
- [ ] Analytics dashboard
- [ ] Customer reviews/ratings
- [ ] SEO optimization
- [ ] Progressive Web App (PWA)

---

## 🚀 Deployment

### Backend (Railway/Render)
1. Push code to GitHub
2. Connect to Railway/Render
3. Set environment variables
4. Deploy with auto-build

### Frontend (Vercel/Netlify)
1. Push code to GitHub
2. Connect to Vercel/Netlify
3. Set `VITE_API_BASE_URL` to production API
4. Deploy with auto-build

### Database (Railway/Neon/Supabase)
1. Create PostgreSQL instance
2. Update backend .env with credentials
3. Run migrations on first deploy

---

## 📖 Documentation

- [Complete Project Documentation](./docs/DOCUMENTATION.md) (ISO/IEC/IEEE 29148 compliant)
- [API Reference](./docs/API.md)
- [Architecture Diagram](./docs/ARCHITECTURE.md)
- [Testing Guide](./docs/TESTING.md)

---

## 📖 References

- Clean Architecture (Robert C. Martin)
- Go Style Guide – Effective Go
- OWASP Security Guidelines
- ISO/IEC/IEEE 29148 – Requirements Engineering
- React & TypeScript Best Practices
- Tailwind CSS & shadcn/ui Documentation
- TanStack Query Documentation
- GORM Documentation

---

## 👥 Team

**Developer:** Murilo-The-Dev
**Project:** Stelani E-Commerce Platform  
**Version:** 1.0 – December 2025  
**License:** MIT

---

## 📝 License

MIT License - See [LICENSE](./LICENSE) for details.

---

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📧 Contact

- **GitHub:** [@Murilo-The-Dev](https://github.com/Murilo-The-Dev)
- **Email:** christofolettimurilo@gmail.com
- **Project Link:** https://github.com/Murilo-The-Dev/Stelani

---

**Built with ❤️ using Go, React, and TypeScript**