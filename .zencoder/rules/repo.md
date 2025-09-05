---
description: Repository Information Overview
alwaysApply: true
---

# Job Tracker Information

## Summary
A job tracking application built with Next.js and Supabase. The project provides authentication, dashboard functionality, and job tracking capabilities. It's based on the Next.js with Supabase Starter Kit, offering a complete solution with App Router, authentication, and styling with Tailwind CSS and shadcn/ui components.

## Structure
- **app/**: Next.js App Router pages and layouts
- **components/**: React components organized by feature (auth, dashboard, shared, ui)
- **lib/**: Utility functions and Supabase client configuration
- **hooks/**: Custom React hooks
- **public/**: Static assets and data files
- **supabase/**: Supabase configuration, functions, and database tables

## Language & Runtime
**Language**: TypeScript
**Version**: TypeScript 5.x
**Framework**: Next.js (latest)
**Build System**: Next.js build system
**Package Manager**: npm

## Dependencies
**Main Dependencies**:
- React 19.0.0
- Next.js (latest)
- @supabase/supabase-js (latest)
- @supabase/ssr (latest)
- Tailwind CSS 3.4.1
- shadcn/ui components (@radix-ui components)
- next-themes 0.4.6
- lucide-react 0.511.0

**Development Dependencies**:
- TypeScript 5.x
- ESLint 9.x
- Tailwind CSS plugins
- PostCSS 8.x
- Autoprefixer 10.4.20

## Build & Installation
```bash
# Install dependencies
npm install

# Development server with turbopack
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Supabase Integration
**Client Configuration**: Uses @supabase/ssr for cookie-based authentication
**Authentication**: Password-based authentication with login, signup, and password reset flows
**Database**: Custom tables with Row Level Security (RLS) policies
**Environment Variables**:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY

## Features
- **Authentication**: Complete auth flow with login, signup, password reset
- **Dashboard**: User dashboard with navigation and profile management
- **Theming**: Dark/light mode support via next-themes
- **Responsive Design**: Mobile-friendly UI with responsive components
- **Middleware**: Authentication middleware for protected routes