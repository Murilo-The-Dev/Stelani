```markdown
# STELANI – Full-Stack E-Commerce Platform

Full-stack system for **STELANI**, an artisanal e-commerce platform for handcrafted beaded bags.  
Composed of a **Go (Gin)** backend and a **React + TypeScript + Tailwind CSS** frontend, following **Clean Architecture** and **REST API** design principles.

---

## 🧩 Overview

STELANI provides a modular e-commerce environment supporting:
- Product catalog and advanced filtering
- Shopping cart and order tracking
- Custom handmade order requests
- Full administrative management (inventory, materials, orders, reports)

Designed for **scalability**, **maintainability**, and **clear separation of concerns** between API and UI layers.

---

## ⚙️ Tech Stack

### Backend
- **Language:** Go 1.23+
- **Framework:** Gin Web Framework
- **Database:** PostgreSQL
- **ORM:** GORM
- **Auth:** JWT (Access + Refresh Tokens)
- **Docs:** Swagger / OpenAPI
- **Migrations:** golang-migrate

### Frontend
- **Build Tool:** Vite  
- **Library:** React 18  
- **Language:** TypeScript  
- **Styling:** Tailwind CSS + shadcn/ui  
- **State:** TanStack Query + Zustand  
- **Forms:** React Hook Form + Zod  
- **Routing:** React Router v6  
- **HTTP Client:** Axios  
- **Icons:** Lucide React  

---

## 🏗️ Architecture

```

[Frontend SPA] React + TypeScript + Tailwind
↓
[Backend API] Go (Gin) – RESTful architecture
↓
[Database] PostgreSQL

```

### Repository Structure

```

stelani/
├── backend/
│   ├── cmd/api/
│   ├── internal/
│   │   ├── domain/
│   │   ├── application/
│   │   └── infrastructure/
│   ├── pkg/
│   └── migrations/
└── frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── store/
│   ├── hooks/
│   └── types/
├── public/
└── tests/

````

Follows **Clean Architecture** for backend and **feature-based organization** for frontend.

---

## 🧠 Core Features

### Customer
- Browse and filter product catalog  
- Add products to cart and complete orders  
- Submit custom handmade requests  
- Track production and delivery status  

### Admin
- Manage products, materials, and stock  
- Approve or reject custom orders  
- Control production stages and order lifecycle  
- Generate sales and performance reports  

---

## 🔒 Security

- Bcrypt password hashing (cost ≥12)
- JWT-based authentication with 24h expiry
- HTTPS-only communication
- Rate limiting (100 req/min/IP)
- Input validation + sanitization
- Protection against SQL injection and XSS

---

## 🧪 Testing

- **Backend:** Unit + integration tests via Go `testing`
- **Frontend:** Component and E2E tests with React Testing Library
- **Coverage Goal:** ≥70%

---

## 🛠️ Setup

### Backend
```bash
git clone https://github.com/<user>/stelani.git
cd stelani/backend
cp .env.example .env

docker-compose up -d postgres
make migrate
go run cmd/api/main.go
````

### Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Default API base URL: `http://localhost:8080/api/v1`

---

## 🗺️ Roadmap

### Phase 1 – MVP

* Authentication & Authorization
* Product CRUD
* Catalog + Shopping Cart
* Basic Admin Panel

### Phase 2 – Expansion

* Custom Orders Module
* Material & Stock Management
* Email Notifications

### Phase 3 – Enhancement

* Reporting Dashboard
* Payment Gateway Integration
* Performance Optimization

---

## 📖 References

* Clean Architecture (Robert C. Martin)
* Go Style Guide – Effective Go
* OWASP Security Guidelines
* ISO/IEC/IEEE 29148 – Requirements Engineering
* React & TypeScript Best Practices
* Tailwind & shadcn/ui Documentation

---

**Author:** Murilo
**Version:** 1.0 – October 2025
**License:** MIT

```
```
