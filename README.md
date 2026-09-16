# 🚀 Super Admin Portal

<p align="center">
  <strong>A Modern, Professional & Responsive Super Admin Dashboard</strong>
</p>

<p align="center">
  React • TypeScript • TanStack Query • Axios • Vite
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/TanStack_Query-5-FF4154?style=for-the-badge&logo=reactquery&logoColor=white" />
  <img src="https://img.shields.io/badge/Axios-API-5A29E4?style=for-the-badge&logo=axios&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-Fast-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
</p>

---

## ✨ Overview

**Super Admin Portal** is a modern web-based administration dashboard built with React and TypeScript.

It provides a centralized interface for managing users, tenants, analytics, and administrative activities through a clean, responsive, and scalable frontend architecture.

The project focuses on reusable components, efficient server-state management, API integration, responsive design, and maintainable code structure.

---

## 🎯 Features

### 📊 Dashboard

- Total Users
- Active Users
- Inactive Users
- Total Tenants
- Active Tenants
- Revenue Overview
- Recent Activity
- Dashboard Refresh

### 👥 User Management

- User listing
- Search users
- Pagination
- View user details
- Edit user
- Delete user
- Delete confirmation
- Loading state
- Error state
- Empty state
- Success notifications
- Error notifications

### 🏢 Tenant Management

- Tenant overview
- Tenant information
- Tenant status
- Tenant-based organization

### 📋 Activity & Audit

- User activity
- Administrative activity
- Recent activity tracking

### ⚡ TanStack Query

- Server-state management
- Query caching
- Background refetching
- Loading states
- Error handling
- Mutations
- Query invalidation

### 🎨 UI / UX

- Professional admin interface
- Responsive layout
- Reusable components
- Clean data tables
- Status indicators
- Action buttons
- Toast notifications
- Responsive design
- Consistent spacing and typography

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| ⚛️ React | Frontend UI |
| 🔷 TypeScript | Type-safe development |
| ⚡ TanStack Query | Server-state management |
| 🧭 React Router | Application routing |
| 🌐 Axios | API communication |
| 🎨 CSS | Styling and responsive design |
| ⚡ Vite | Development and build tool |
| 🔧 Git | Version control |
| 🐙 GitHub | Repository hosting |

---

## 🏗️ Project Structure

    super-admin-portal/
    │
    ├── src/
    │   ├── api/
    │   │   ├── api.ts
    │   │   ├── analytics.api.ts
    │   │   └── users.api.ts
    │   │
    │   ├── components/
    │   │   └── common/
    │   │       ├── Header.tsx
    │   │       ├── Sidebar.tsx
    │   │       ├── Loader.tsx
    │   │       ├── ErrorState.tsx
    │   │       └── EmptyState.tsx
    │   │
    │   ├── hooks/
    │   │   └── useDebounce.ts
    │   │
    │   ├── lib/
    │   │   └── queryClient.ts
    │   │
    │   ├── pages/
    │   │   ├── Dashboard/
    │   │   │   └── DashboardPage.tsx
    │   │   │
    │   │   └── Users/
    │   │       └── UsersPage.tsx
    │   │
    │   ├── queries/
    │   │   ├── queryKeys.ts
    │   │   ├── userQueries.ts
    │   │   └── analyticsQueries.ts
    │   │
    │   ├── types/
    │   │   ├── user.types.ts
    │   │   └── analytics.types.ts
    │   │
    │   ├── App.tsx
    │   ├── App.css
    │   ├── main.tsx
    │   └── index.css
    │
    ├── public/
    │
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    └── README.md

---

## 🔄 Application Flow

    ┌─────────────────────────┐
    │    Super Admin Portal   │
    └────────────┬────────────┘
                 │
        ┌────────┼────────┐
        │        │        │
        ▼        ▼        ▼
    Dashboard   Users   Tenants
        │        │
        ▼        ▼
    Analytics  User Details
                    │
             ┌──────┼──────┐
             │      │      │
             ▼      ▼      ▼
            View   Edit   Delete

---

## ⚡ TanStack Query

TanStack Query is used for efficient server-state management.

The application uses query keys, query functions, caching, mutations, loading states, error handling, and query invalidation.

Example:

    const { data, isLoading, isError } = useQuery(
      userQueries.list(filters)
    );

This approach keeps server data management separate from the UI and makes the application easier to maintain and scale.

---

## 🌐 API Layer

API communication is centralized through Axios.

The API layer provides reusable functions for:

- GET
- POST
- PUT
- DELETE

API logic is separated from UI components so that network-related code remains organized and reusable.

---

## 🧭 Application Routes

| Route | Description |
|-------|-------------|
| `/dashboard` | Super Admin Dashboard |
| `/users` | User Management |
| `/users/:id` | User Details |
| `/users/:id/edit` | Edit User |
| `/tenants` | Tenant Management |
| `/audit-logs` | Audit Logs |

---

## 🚀 Getting Started

### Prerequisites

Make sure the following are installed:

- Node.js
- npm
- Git

### Clone the Repository

    git clone https://github.com/gauresh-badgujar/super-admin-portal.git

### Navigate to the Project

    cd super-admin-portal

### Install Dependencies

    npm install

### Start Development Server

    npm run dev

Open the application in your browser:

    http://localhost:5173

---

## 🔁 Development Workflow

    Developer
        │
        ▼
    React + TypeScript
        │
        ▼
    Components
        │
        ▼
    TanStack Query
        │
        ▼
    API Layer
        │
        ▼
    Backend / API
        │
        ▼
    Application Data
        │
        ▼
    User Interface

---

## 🛡️ Loading & Error Handling

The application provides dedicated states for different situations.

### Loading State

    Loading users...

### Error State

    Unable to load users.

### Empty State

    No users found.

    There are no users to display.

### Success State

    User deleted successfully.

---

## 📱 Responsive Design

The application is designed to provide a consistent experience across:

- 🖥️ Desktop
- 💻 Laptop
- 📱 Tablet
- 📲 Mobile

---

## 🔐 Data Management

The application is structured to display data received through the configured API.

Server-side data is handled using TanStack Query while API requests are centralized through Axios.

This architecture makes the project easier to extend with a production backend in the future.

---

## 📈 Future Enhancements

- 🔐 Authentication & Authorization
- 👤 Role-Based Access Control
- 🔎 Advanced User Filtering
- 📊 Advanced Analytics
- 📥 Data Export
- 🌙 Dark Mode
- 🔔 Notification System
- 📝 Advanced Audit Logs
- 🏢 Complete Tenant Management
- 📱 Enhanced Mobile Navigation
- 🔒 Permission Management
- 📊 Advanced Reporting

---

## 👨‍💻 Author

### Gauresh Badgujar

Frontend Developer

GitHub:

https://github.com/gauresh-badgujar

---

## ⭐ Support

If you find this project useful, please consider giving the repository a ⭐ star.

---

## 📄 License

This project is created for learning, development, and portfolio purposes.

---

<p align="center">
  🚀 <strong>Built with React, TypeScript & TanStack Query</strong>
</p>
