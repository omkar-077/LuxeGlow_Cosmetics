

# 💄 LuxeGlow Cosmetics — Premium E-Commerce Web App

A luxury dark-themed cosmetics e-commerce platform built with **React, JavaScript, Tailwind CSS, and Framer Motion**.
Fully responsive, animated, and deployment-ready — featuring cart, wishlist, authentication, and modern UI/UX.

🔗 Live Demo: [https://luxe-glow-cosmetics.vercel.app/](https://luxe-glow-cosmetics.vercel.app/)

---

## ✨ Features

### 🛍 Shopping Experience

* Product catalog with categories
* Real-time search, filtering & sorting
* Add to cart with quantity controls
* Wishlist system
* Related products
* Persistent cart & wishlist (localStorage)

### 🔐 Authentication (Frontend Simulation)

* Signup / Login / Logout
* Forgot password flow
* Protected routes
* Profile editing
* Session persistence

### 🎨 UI & UX

* Luxury dark mode design with gold accents
* Glassmorphism effects
* Framer Motion animations
* Loading skeletons
* Toast notifications
* Mobile-first responsive layout

---

## 🧰 Tech Stack

| Tech                  | Usage               |
| --------------------- | ------------------- |
| React 18              | UI framework        |
| Vite                  | Build tool          |             |
| Tailwind CSS          | Styling             |
| Framer Motion         | Animations          |
| React Router v6       | Routing             |
| Shadcn UI             | UI components       |
| React Hook Form + Zod | Forms & validation  |
| Context API           | State management    |
| Sonner                | Toast notifications |

---

## 🚀 Getting Started

### Prerequisites

* Node.js 18+

### Installation

```bash
git clone https://github.com/omkar-077/LuxeGlow_Cosmetics.git
cd luxeglow-cosmetics
npm install
npm run dev
```

Runs on:

```
http://localhost:5173
```

### Scripts

```bash
npm run dev       # development
npm run build     # production build
npm run preview   # preview build
npm run lint
npm run test
```

---

## 📁 Project Structure

```
src/
 ├ assets/
 ├ components/
 ├ context/
 ├ data/
 ├ hooks/
 ├ pages/
 ├ routes/
 ├ utils/
 ├ lib/
 ├ App.jsx
 ├ main.jsx
```

Organized for scalability and clean architecture.

---

## 🎨 Design System

### Brand Style

* Dark luxury aesthetic
* Gold & rose accents
* Serif headings + modern body text

### Fonts

* Playfair Display (Headings)
* DM Sans (Body)

### Core Colors

* Noir Black
* Warm Cream text
* Premium Gold
* Rose highlights

All managed via Tailwind tokens.

---

## 🧠 State Management

Three Context Providers:

* AuthContext
* CartContext
* WishlistContext

All persisted with `localStorage`.

---

## 📦 Product Model

```ts
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  tags: string[];
}
```

---

## ⚡ Performance Optimizations

* Lazy loaded routes
* Code splitting
* Skeleton loaders
* Optimized Tailwind build
* Memoized state updates

---


## 📊 Highlights

✔ Clean scalable folder structure
✔ Premium UI/UX
✔ Responsive design
✔ Real-world e-commerce features
✔ Modern React architecture

---

## ❤️ Built With

React • JavaScript • Tailwind • Framer Motion • Shadcn UI

**LuxeGlow Cosmetics © 2026**

---

 

## 📸 Screenshots

> A glimpse into LuxeGlow’s luxury dark-mode UI and smooth shopping experience

| Page | Screenshot |
|------|-----------|
| Home | <img src="ss/Home.png" width="400"/> |
| Shop | <img src="ss/shop.png" width="400"/> |
| Product | <img src="screenshots/product-details.png" width="400"/> |
| Cart | <img src="screenshots/cart.png" width="400"/> |
| Wishlist | <img src="screenshots/wishlist.png" width="400"/> |
| Auth | <img src="screenshots/login.png" width="190"/> <img src="screenshots/signup.png" width="190"/> |

 
