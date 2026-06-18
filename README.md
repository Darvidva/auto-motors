# AutoMotors

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16.2.9-000000?logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.1.17-38B2AC?logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Database-FF4758?logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploys_by-Vercel-000000?logo=vercel)

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Database Schema](#-database-schema)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Demo](#-demo)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📖 About

**AutoMotors** is a comprehensive vehicle marketplace built with Next.js 16 and Supabase. It provides a seamless platform for buying and selling vehicles, complete with authentication, vehicle management, and search functionality.

---

## ✨ Features

### Public Features

- 🚗 **Browse Inventory**: View all available vehicles with detailed information
- 🔍 **Search & Filter**: Search vehicles by name, category, or status
- 📊 **Vehicle Details**: View complete vehicle specifications and images
- 🤝 **Contact**: Easy contact options with integrated forms
- 🌐 **Multi-Language Support**: Available in English, Arabic, French, and German

### Authenticated Features

- 🔐 **Secure Authentication**: Email/password login with Supabase Auth
- 📝 **User Dashboard**: Manage your vehicle listings
- 🔧 **Vehicle Management**: Add, edit, or delete vehicle listings
- 📷 **Image Upload**: Drag-and-drop image upload with preview
- 📊 **Sales Stats**: View total listings and sales statistics

### Admin Features

- 👑 **Admin Panel**: Full administrative dashboard
- 📋 **Enquiry Management**: View and manage all customer enquiries
- 📊 **Business Analytics**: Track total listings, sales, and active users
- 🔧 **Settings Management**: Configure application settings

---

## 🛠️ Technologies Used

### Frontend

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, SSG, SSR)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**:
  - [shadcn/ui](https://ui.shadcn.com/) (Radix UI components)
  - [Radix UI](https://www.radix-ui.com/) (Headless UI components)
  - [Sonner](https://ui.shadcn.com/sonner) (Notifications)
  - [Vaul](https://vaul.emilwidjaja.com/) (Bottom sheets)
- **State Management**: React Context API
- **Routing**: Next.js App Router
- **Forms**: React Hook Form + Zod validation

### Backend

- **Database**: [Supabase](https://supabase.com/)
  - PostgreSQL database
  - Realtime subscriptions (optional)

### Authentication

- [Supabase Auth](https://supabase.com/docs/guides/auth) - Email/password authentication
- [NextAuth.js](https://next-auth.js.org/) - JWT-based authentication
- [Lucide React](https://lucide.dev/) - Icon library

### Deployment

- **Platform**: [Vercel](https://vercel.com/)
- **CI/CD**: GitHub Actions integration

---

## 📁 Project Structure

```
automotors/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Authentication pages
│   │   ├── login/index.tsx
│   │   └── signup/index.tsx
│   ├── (app)/              # Main application pages
│   │   ├── admin/           # Admin panel
│   │   ├── inventory/       # Vehicle listings
│   │   └── api/             # API routes
│   └── api/                 # Edge API routes
├── components/               # Reusable React components
│   ├── admin/               # Admin-specific components
│   ├── auth/                # Authentication components
│   ├── common/              # Global components (Navbar, Footer, etc.)
│   └── ui/                  # shadcn/ui components
├── lib/                      # Utility functions and helpers
│   ├── supabase.ts          # Supabase client configuration
│   ├── auth.ts              # Auth utilities
│   ├── utils.ts             # General utilities
│   ├── hooks.ts             # Custom React hooks
│   └── constants.ts         # Constants and configuration
├── database/                 # Database schema and migrations
│   ├── schema.sql           # Complete SQL schema
│   └── migrations/          # Migration scripts
├── middleware.ts           # Next.js middleware for auth
├── package.json            # Project dependencies and scripts
└── ...                       # Other configuration files
```

### Key Directories

- **`app/`**: Next.js 16 App Router with route groups for organization
- **`components/ui/`**: All shadcn/ui components for consistent styling
- **`components/common/`**: Reusable components like Navbar, Footer, and Cards
- **`database/`**: Complete Supabase database schema in one file
- **`lib/`**: Utility functions, hooks, and client configurations

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (18.x or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/)
- [Supabase Account](https://supabase.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/automotors.git
   cd automotors
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Configuration**
   Create a `.env.local` file in the root directory:
   ```bash
   cp .env.example .env.local
   ```

   Add your Supabase credentials to `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   NEXT_PUBLIC_SUPABASE_STORAGE_URL=https://your-bucket-name.supabase.co/storage/v1/object/public/
   ```

   > **Note**: Ensure `NEXT_PUBLIC_SUPABASE_STORAGE_URL` points to your storage bucket URL

4. **Database Setup**
   Run the database migration script to create tables:
   ```bash
   npm run db:migrate
   ```
   
   > **Note**: This script will create all necessary tables and indexes.
   
5. **Run Development Server**
   ```bash
   npm run dev
   ```
   
   The application will be
