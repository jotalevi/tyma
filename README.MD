# 🪴 Tyma — Home Garden & Pottery Store

**TymaShop.cl** is a full-stack eCommerce platform for plant lovers, gardeners, and anyone looking to bring more life into their spaces. From artisan pottery to organic fertilizers, native seeds, and indoor garden kits — Tyma makes cultivating your home garden easy, beautiful, and sustainable.

This is the full Tyma stack, including **Backend**, **Frontend**, and a **Docker Compose** environment with PostgreSQL.

Tyma is built with modern tech, and supports **Transbank integration** for payments in Chile.

---

## 🚀 Run Locally

Here is the guide to run this project locally:

```sh
git clone git@github.com:jotalevi/tyma.git
cd tyma
docker-compose up --build
````

This will spin up:

* ⚙️ `backend` → NestJS API (port `3010`)
* 🛍️ `frontend` → React + Tailwind UI (port `5173`)
* 🐘 `db` → PostgreSQL database (port `5432`)

---

## 🧠 Backend

The backend is built with **NestJS**, using TypeORM and PostgreSQL for data persistence. It provides all the APIs needed for managing products, categories, users, carts, and orders.

### Stack

* **NestJS** + TypeScript
* **TypeORM** with PostgreSQL
* **JWT Auth** for secure access
* **Modular API design** (`/products`, `/categories`, `/sales`, `/users`, etc.)
* **.env config** support
* **Transbank (CL)** integration planned for secure local payments

### Core Modules

* `AuthModule & UserModule`: User registration & login
* `ProductModule`: Garden supplies, seeds, pottery, etc.
* `SaleModule`: Orders and payment tracking

---

## 💻 Frontend

The frontend is a **React SPA** built with **Vite**, **Tailwind CSS**, and the highly customizable **shadcn/ui** component library.

### Stack

* **React + Vite + TypeScript**
* **Tailwind CSS** for utility-first styling
* **shadcn/ui** + Radix for accessible, customizable components
* **Axios** for REST communication with the backend
* **Fully responsive**, flat design with a 4px radius system

### UI Features

* Home page with featured categories and kits
* Product grid with filters by tag and category
* Product detail view with add-to-cart
* Persistent shopping cart and checkout page
* Future: admin dashboard, customer profiles

---

## 🐳 Docker Services

```yaml
services:
  postgres:
    image: postgres:15
    ...
  backend:
    build: ./backend
    ports:
      - "3010:3000"
  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
```

### Ports

| Service    | Port | Description               |
| ---------- | ---- | ------------------------- |
| Frontend   | 5173 | React UI with Vite        |
| Backend    | 3010 | NestJS REST API           |
| PostgreSQL | 5432 | Database with seeded data |

---

## 📁 Project Structure

```
tyma/
├── backend/            # NestJS API server
├── frontend/           # React storefront
├── docker-compose.yml  # Docker Compose supporting the whole stack
├── tyma.postman.json   # Postman collection describing the Backend
└── README.md           # This file :)
```

---

## 🔧 Environment Variables

Backend `.env` example:

```env
NODE_ENV=development
NODE_PORT=3010
DATABASE_USER=postgres
DATABASE_PASS=12341234
DATABASE_BASE=tymashop
DATABASE_HOST=postgres
DATABASE_PORT=5432
JWT_SECRET=supersecretkey
```

---

## 📌 Roadmap

* [x] Docker-based development setup
* [x] NestJS backend with JWT and TypeORM
* [x] Product management
* [x] React frontend with shadcn/ui
* [x] Transbank payment integration (Chile)
* [ ] Admin dashboard for product and order control
* [ ] Product image hosting with S3 or Cloudinary
* [ ] Blog or planting guides section
* [ ] Dark mode and accessibility enhancements

---

## 👨‍🌾 Author

Built with 💚 by [@jotalevi](https://github.com/jotalevi)
For plant lovers, by plant lovers.

---

## 📜 License

This project is open source under the [MIT License](LICENSE).