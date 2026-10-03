# Baskify | Production E-Commerce Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database%20%26%20Auth-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?logo=stripe&logoColor=white)](https://stripe.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-v5-FF4154?logo=reactquery&logoColor=white)](https://tanstack.com/)
[![Zustand](https://img.shields.io/badge/State-Zustand-764ABC)](https://zustand-demo.pmnd.rs/)

Baskify is a full-stack, enterprise-grade e-commerce platform built with **Next.js 16 (App Router & Turbopack)**, **React 19**, **Supabase (PostgreSQL & SSR Auth)**, **Stripe Payments**, and **Tailwind CSS v4**. Engineered with an emphasis on high conversion rates, real-time inventory management, thread-safe database transactions, fluid responsive design, and robust security.

---

## Key Features

- **End-to-End Shopping Experience**: Full-featured catalog with category browsing, real-time debounced product search, interactive cart management, and fluid responsive layouts.
- **Frictionless Authentication & 6-Digit Email OTP**: Custom authentication flow with Supabase SSR cookies, Google OAuth, and an in-tab 6-digit email verification code that preserves cart state and returns buyers directly to checkout.
- **Secure Stripe Checkout & Automated Fulfillment**: Production Stripe Checkout integration backed by asynchronous webhook event fulfillment (`checkout.session.completed`) for automated order recording and stock updates.
- **Thread-Safe Inventory & Race Condition Defense**: Atomic PostgreSQL RPC functions (`decrement_product_stock`) combined with unique database constraints to prevent overselling, double webhook processing, and lost update anomalies.
- **Dedicated Admin Control Center**: Comprehensive back-office dashboard featuring real-time revenue analytics, category/product management with multi-image uploads, order status controls, and role-based access control (RBAC).
- **Zero-Stale Client Cache (Optimized TanStack Query)**: Fine-grained cache invalidation using custom mutation hooks paired with Next.js ISR/SSG `revalidatePath` for instantaneous catalog updates without full-page reloads.
- **Advanced SEO & Microdata**: Dynamic 1200×630 OpenGraph card generation via `@vercel/og`, Schema.org JSON-LD structured data, automated dynamic `sitemap.xml`, and search engine crawler instructions.

---

## Tech Stack & Architecture

| Layer | Technologies Used |
| :--- | :--- |
| **Core Framework** | Next.js 16.3 (Turbopack, App Router, Server Actions), React 19, TypeScript |
| **Database & Auth** | Supabase (PostgreSQL, Row Level Security, SSR Cookies, Database Functions) |
| **Payment Gateway** | Stripe API, Stripe Checkout Hosted Sessions, Stripe Webhooks |
| **Styling & Design System** | Tailwind CSS v4, Base UI Primitives, Lucide Icons, Tabler Icons |
| **Client State Management** | Zustand (Persistent local cart storage with hydration safety) |
| **Server State & Data Fetching** | TanStack React Query v5, Server-side Parallel Data Fetching |
| **Form Handling & Validation** | React Hook Form, Zod Schema Validation |
| **Deployment & Hosting** | Vercel (Edge Middleware, Serverless Functions, CI/CD) |

---

## Project Structure

```
next-ecommerce/
├── src/
│   ├── actions/               # Server Actions (Auth, Checkout, Admin CRUD, Uploads)
│   ├── app/
│   │   ├── (auth)/            # Auth routes (Login, Register, Forgot Password, Error)
│   │   ├── (customer)/        # Customer Storefront (Home, Products, Categories, Cart, Checkout, Profile, Orders)
│   │   ├── admin/             # Admin Dashboard (Analytics, Products, Categories, Orders)
│   │   ├── api/webhooks/      # Stripe webhook handler endpoint
│   │   ├── opengraph-image    # Dynamic OG image generators
│   │   ├── robots.ts          # Search engine crawler policies
│   │   └── sitemap.ts         # Dynamic XML sitemap generator
│   ├── components/
│   │   ├── shared/            # Reusable business components (Navbars, Search, Cards, Modals)
│   │   └── ui/                # Base design system primitives (Button, Dialog, Sheet, Toast, etc.)
│   ├── hooks/                 # Custom React hooks (useAdminMutation, useMobile)
│   ├── lib/
│   │   ├── constants/         # E-commerce constants (Tax rates, shipping fees)
│   │   ├── store/             # Zustand stores (productsStore)
│   │   ├── stripe.ts          # Stripe SDK client instance
│   │   ├── supabase/          # Supabase client factories (Client, Server, Admin, Middleware)
│   │   └── validation/        # Zod validation schemas and TypeScript contracts
│   └── proxy.ts               # Next.js Edge proxy middleware for route protection & RBAC
├── public/                    # Static assets, SVG logos, Google branding
├── .env.local                 # Local environment variables
└── next.config.ts             # Next.js configuration & image domains
```

---

## Getting Started

### Prerequisites

- **Node.js**: `v20.0.0` or higher
- **npm** / **pnpm**
- **Supabase Account** & **Stripe Account**

### Installation & Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/theeyad/next-ecommerce.git
   cd next-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file in the project root:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
   SUPABASE_SECRET_KEY=your_service_role_key

   # Base URL
   NEXT_PUBLIC_SITE_URL=http://localhost:3000

   # Stripe
   STRIPE_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

4. **Launch the development server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` to view the application.

5. **Forward Stripe Webhooks (Local Development)**
   ```bash
   stripe listen --api-key <STRIPE_SECRET_KEY> --forward-to localhost:3000/api/webhooks/stripe
   ```

---

## Available Scripts

In the project directory, you can run:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Next.js Turbopack development server with Hot Module Replacement (HMR). |
| `npm run build` | Builds the optimized production bundle across all static and dynamic routes. |
| `npm run start` | Starts the Next.js production server. |
| `npm run lint` | Runs Next.js ESLint checks across the codebase. |

---

## Technical Challenges & Solutions

### 1. Supabase Auth Rate Limiting & Verification Bottlenecks
- **The Problem:** Supabase default email provider limits outgoing authentication emails to **2 emails per hour** per project. This restricted efficient development testing and posed a critical bottleneck for production scalability. Furthermore, standard clickable verification links forced mobile users into external email app webviews with empty sandboxed storage, breaking cart continuity.
- **The Solution:** Integrated **Resend** as a custom SMTP provider (and Gmail SMTP for extended testing capacity) to safely scale email throughput. Replaced fragile confirmation links with an **In-Tab 6-Digit Email OTP (`verifyOtp`)**. This validates user emails 100% while keeping customers on the exact same page, preserving their cart state and delivering instant post-verification checkout redirects.

### 2. Multi-Layered Race Condition & Inventory Defense
- **The Problem:** In concurrent high-traffic scenarios (e.g., flash sales or rapid Stripe webhooks), e-commerce systems face three critical race conditions:
  1. *Lost Update Stock Decrement:* JavaScript read-then-write updates (`stock - quantity`) on concurrent requests overwrite each other.
  2. *Duplicate Webhook Processing:* Stripe retry deliveries for the same payment intent can create duplicate order records.
  3. *Overselling at Checkout:* Multiple users completing checkout for the last item simultaneously.
- **The Solution:**
  - **Database Level:** Added a PostgreSQL `UNIQUE (stripe_payment_intent_id)` constraint on the `orders` table to enforce idempotency at the database engine level, and created an atomic PostgreSQL RPC function (`decrement_product_stock`) to perform thread-safe inventory decrements directly in SQL.
  - **Pre-Checkout Audit:** Added real-time inventory checks in `createCheckoutSession` prior to redirecting to Stripe.
  - **Auto-Refund Safety Net:** Built an automated Stripe refund handler (`stripe.refunds.create`) inside the webhook that cancels and fully refunds any order if an unforeseen microsecond oversell condition is detected.

### 3. TanStack Query Cache Synchronization & Invalidation
- **The Problem:** When administrators create, edit, or delete catalog items, client search widgets and category caches display stale data unless refreshed, while setting `staleTime: 0` would cause redundant database queries.
- **The Solution:** Combined server-side `revalidatePath` for static routes with a custom `useAdminMutation` client hook (`src/hooks/useAdminMutation.ts`). The hook executes the server action, triggers targeted cache key invalidations exclusively for affected entities, and renders instant feedback toasts without touching unrelated queries.

### 4. Reusable Accessible Image Upload Architecture
- **The Problem:** Recreating an image upload handler each time needed across products and categories violated DRY principles, and required complex state handling for previews, loading states, error boundaries, and keyboard accessibility.
- **The Solution:** Engineered a decoupled, reusable `ImageUploader` component (`src/components/shared/ImageUploader.tsx`) paired with a unified `uploadImage` server action (`src/actions/upload.ts`). It seamlessly integrates with React Hook Form, handles Supabase storage bucket uploads, provides visual previews, loading indicators, and keyboard accessibility.
- **Open-Sourced for the Community:** The full implementation was packaged and open-sourced for the community at: [`https://github.com/theeyad/image-upload-handler-for-supabase-and-nextjs`](https://github.com/theeyad/image-upload-handler-for-supabase-and-nextjs).
