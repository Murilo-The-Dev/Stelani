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
- **SEO optimized** with meta tags and Open Graph support
- **Cloudinary integration** for optimized image delivery

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
- **Library:** React 19  
- **Language:** TypeScript  
- **Styling:** Tailwind CSS + shadcn/ui  
- **State Management:** TanStack Query (server state) + Zustand (client state - cart, auth)  
- **Routing:** React Router v6  
- **HTTP Client:** Axios (with JWT interceptors)  
- **Icons:** Lucide React
- **SEO:** react-helmet-async
- **Image Optimization:** Cloudinary with automatic transformations

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

[Cloudinary CDN] ← Image uploads & optimization
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
│   │   │   ├── dto/               # Data Transfer Objects
│   │   │   └── handlers/          # HTTP request handlers
│   │   └── infrastructure/
│   │       ├── database/          # Repository implementations, PostgreSQL connection
│   │       └── http/
│   │           ├── middlewares/   # JWT auth, CORS
│   │           └── routes/        # API route definitions
│   ├── config/                    # Configuration (DB, JWT, WhatsApp)
│   ├── railway.json               # Railway deployment config
│   └── Procfile                   # Process definition for deployment
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── common/           # Button, SEO, ImageUpload, reusable UI
    │   │   ├── layout/           # Header, Footer
    │   │   └── product/          # ProductCard
    │   ├── pages/
    │   │   ├── home/             # HomePage
    │   │   ├── products/         # ProductsPage, ProductDetailPage
    │   │   ├── cart/             # CartPage
    │   │   ├── checkout/         # CheckoutPage (WhatsApp redirect)
    │   │   ├── custom/           # CustomOrderPage (WhatsApp redirect)
    │   │   ├── success/          # SuccessPage
    │   │   └── admin/            # Admin dashboard, products CRUD
    │   ├── services/api/         # Axios config, API endpoints
    │   ├── store/                # Zustand stores (cart, auth)
    │   ├── hooks/                # Custom React hooks (useAuth, useProducts)
    │   ├── utils/                # Utility functions (Cloudinary optimization)
    │   └── config/               # WhatsApp number, message formatter
    ├── public/
    │   └── images/               # Static assets (logo, backgrounds)
    └── index.html                # SEO meta tags, favicon
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
- **Responsive design**: Optimized for mobile, tablet, and desktop
- **Fast image loading**: Cloudinary CDN with automatic format optimization (WebP)

### Admin (Protected - JWT Authentication)
- **Login-only access** to `/admin` routes
- **Product management**: Full CRUD (Create, Read, Update, Delete)
- **Image management**: Upload via Cloudinary widget (drag-and-drop, camera, URL)
- **Price updates**: Edit product prices in real-time
- **Multi-image support**: Up to 6 images per product
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
2. Fills form: colors, size (pequeno/medio/grande), quantity, description
3. System calculates estimated price (with 10% discount for multiple units)
4. Clicks "Send via WhatsApp"
5. Opens WhatsApp with custom order details
6. Admin responds with quote and timeline

### Image Upload Flow
1. Admin creates/edits product
2. Clicks "Adicionar Imagem"
3. Cloudinary widget opens (supports local files, camera, URL)
4. Images uploaded directly to Cloudinary CDN
5. URLs saved in database
6. Frontend automatically optimizes images:
   - Format: Auto (WebP when supported)
   - Quality: Auto
   - Max width: 800px
   - Lazy loading enabled

---

## 🔒 Security

- **bcrypt password hashing** (cost 12) for admin accounts
- **JWT authentication** with 24h expiry (admin-only)
- **HTTPS-only** communication (production)
- **CORS protection** (configurable allowed origins)
- **Input validation** (Gin binding + Zod schemas)
- **SQL injection prevention** (GORM prepared statements)
- **No customer PII stored** (orders sent via WhatsApp)
- **Secure image uploads** (Cloudinary with preset validation)

---

## 🛠️ Setup & Installation

### Prerequisites
- **Go 1.24+**
- **Node.js 20.19+**
- **PostgreSQL 14+**
- **Git**
- **Cloudinary Account** (free tier available)

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
go run main.go
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
WHATSAPP_NUMBER=5519997857685
FRONTEND_URL=http://localhost:5173
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

**Update Cloudinary Credentials:**
Edit `frontend/src/components/common/ImageUpload.tsx`:
```typescript
const CLOUD_NAME = 'your_cloudinary_cloud_name';
const UPLOAD_PRESET = 'your_upload_preset';
```

### Cloudinary Setup

1. Create free account at cloudinary.com
2. Go to Settings → Upload → Upload presets
3. Create new unsigned preset:
   - Name: `stelani_products`
   - Signing Mode: Unsigned
   - Folder: `stelani/products`
   - Allowed formats: jpg, png, webp
   - Max file size: 5MB
4. Copy Cloud Name and Preset Name to frontend config

### Create Admin User

**Using the register endpoint:**
```bash
curl -X POST http://localhost:8080/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "stelani.loja@gmail.com",
    "password": "Leticia2025",
    "name": "Stelani Loja",
    "phone": "19997857685"
  }'
```

**Or via SQL:**
```sql
-- Password: Leticia2025 (needs bcrypt hash)
INSERT INTO users (id, email, password_hash, role, name, phone, created_at, updated_at)
VALUES (
    gen_random_uuid(),
    'stelani.loja@gmail.com',
    '$2a$12$[generated_hash]',
    'admin',
    'Stelani Loja',
    '19997857685',
    NOW(),
    NOW()
);
```

### Access Points

- **Public Site:** http://localhost:5173
- **Admin Login:** http://localhost:5173/admin/login
- **Backend API:** http://localhost:8080/api/v1

---

## 📂 API Endpoints

### Public Endpoints
```
GET    /api/v1/products           # List all products (with optional ?category filter)
GET    /api/v1/products/:id       # Get product details
```

### Auth Endpoints
```
POST   /api/v1/auth/register      # Register new admin (dev only)
POST   /api/v1/auth/login         # Admin login
```

### Admin Endpoints (Protected)
```
POST   /api/v1/admin/products     # Create product
PUT    /api/v1/admin/products/:id # Update product
DELETE /api/v1/admin/products/:id # Delete product (soft delete)
```

**Product Request Body:**
```json
{
  "name": "Bolsa Rosa Pálido",
  "description": "Bolsa artesanal em miçangas rosa",
  "category": "adulto",
  "format": "Retangular",
  "height": 20,
  "width": 15,
  "depth": 5,
  "production_time_days": 7,
  "price": 89.90,
  "image_urls": [
    "https://res.cloudinary.com/...jpg",
    "https://res.cloudinary.com/...jpg"
  ]
}
```

---

## 🚀 Deployment

### Backend (Railway)

1. **Prepare repository:**
   - Ensure `railway.json` and `Procfile` are in backend folder
   - Update CORS in `main.go` to accept production URL

2. **Deploy to Railway:**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login
   railway login
   
   # Initialize project
   cd backend
   railway init
   
   # Set root directory
   railway up --rootDirectory backend
   ```

3. **Configure environment variables:**
   - `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` (auto-generated if using Railway PostgreSQL)
   - `JWT_SECRET` = random 32+ char string
   - `SERVER_PORT` = `8080`
   - `WHATSAPP_NUMBER` = `5519997857685`
   - `FRONTEND_URL` = your Vercel domain (e.g., `https://stelani.vercel.app`)

4. **Add PostgreSQL:**
   - Click "New" → "Database" → "Add PostgreSQL"
   - Railway auto-connects DATABASE_URL

### Frontend (Vercel)

1. **Push code to GitHub**

2. **Import to Vercel:**
   - Go to vercel.com
   - New Project → Import from GitHub
   - Select Stelani repository
   - Root Directory: `frontend`
   - Framework Preset: Vite

3. **Environment Variables:**
   ```
   VITE_API_BASE_URL=https://your-railway-backend.up.railway.app/api/v1
   ```

4. **Deploy:**
   - Click Deploy
   - Copy production URL

5. **Update backend CORS:**
   - Add Vercel URL to Railway `FRONTEND_URL` variable
   - Redeploy backend

### Post-Deployment

1. **Test public site:** Browse products, add to cart
2. **Test admin login:** Go to `/admin/login`
3. **Create first product:** Upload images via Cloudinary
4. **Test WhatsApp integration:** Complete checkout flow
5. **Monitor logs:** Check Railway/Vercel dashboards

---

## 🎨 Design System

- **Color Palette:**
  - Primary: Lilás suave (#A855F7, #D8B4FE)
  - Secondary: Rosa bebê (#F9A8D4)
  - Background: Tons pastel (#FAFAFA)
  - Accent: Gradientes roxo/rosa

- **Typography:**
  - Font: Nunito (Google Fonts)
  - Headings: font-light (300)
  - Body: font-normal (400)

- **Components:**
  - Rounded corners: rounded-lg, rounded-xl, rounded-full
  - Shadows: shadow-sm, shadow-lg, shadow-2xl
  - Animations: animate-float, animate-pulse-soft

---

## 📖 Documentation

- API Reference: See endpoints section above
- Component Documentation: See `frontend/src/components/`
- Database Schema: See `backend/internal/domain/entities/`

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
