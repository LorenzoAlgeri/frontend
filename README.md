# Replit Configuration

## Overview

This is a modern full-stack web application built with React, TypeScript, and Express. It's a personal portfolio website for "Lorenzo Algeri", showcasing AI development services and business automation solutions. The application features a single-page design with multiple sections including hero, about, services, testimonials, and contact form functionality.

## Recent Changes

### Database Integration (January 2025)
- **PostgreSQL Database**: Replaced in-memory storage with PostgreSQL database for persistent data storage
- **Database Schema**: Created tables for contacts and users using Drizzle ORM
- **Database Storage**: Implemented DatabaseStorage class to replace MemStorage for contact form submissions
- **Database Configuration**: Set up database connection using Neon serverless PostgreSQL

### Visual Redesign (January 2025)
- **Complete Theme Overhaul**: Implemented modern color palette based on user's provided color scheme:
  - Primary: Rich Black (#071013)
  - Secondary: Pacific Cyan (#23B5D3) 
  - Accent: Moonstone (#75ABBC)
  - Tertiary: Cadet Gray (#A2AEBB)
  - Platinum: Light Gray (#DFE0E2)
- **Hero Section**: Added user's professional photo, modern gradient background, enhanced typography with better spacing
- **Interactive Elements**: Added hover effects, micro-animations, and smooth transitions throughout
- **Component Styling**: Updated all cards with modern shadows, rounded corners, and gradient effects
- **Typography**: Improved font hierarchy with Inter font family and better text contrast
- **Form Design**: Enhanced contact form with modern input styling, better validation feedback
- **Navigation**: Added animated underlines, backdrop blur effects, and improved mobile menu
- **Responsive Design**: Optimized spacing and layout for all screen sizes

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack React Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL support
- **Validation**: Zod for schema validation
- **Development**: tsx for TypeScript execution in development

### Key Components

#### Database Schema
- **Contacts Table**: Stores contact form submissions with fields for name, email, phone, company, and message
- **Users Table**: Basic user structure with username and password (currently unused)
- **Migrations**: Drizzle handles database migrations in `/migrations` directory

#### API Endpoints
- `POST /api/contacts` - Create new contact form submission
- `GET /api/contacts` - Retrieve all contacts (admin functionality)
- `GET /api/contacts/:id` - Retrieve specific contact by ID

#### Storage Layer
- **Database Storage**: Uses `DatabaseStorage` class with PostgreSQL for persistent data storage
- **Database Connection**: Uses `@neondatabase/serverless` with Drizzle ORM for database operations
- **Schema Management**: Database schema managed through Drizzle with automated migrations

#### UI Components
- **Component Library**: shadcn/ui built on Radix UI primitives
- **Design System**: Consistent theming with CSS variables
- **Responsive Design**: Mobile-first approach with Tailwind responsive utilities

## Data Flow

1. **Contact Form Submission**: User fills out contact form → React Hook Form validation → API request to `/api/contacts` → Drizzle ORM saves to database → Success toast notification
2. **Page Navigation**: Single-page application with smooth scrolling between sections
3. **Component Rendering**: Server-side rendering in production, client-side hydration for interactivity

## External Dependencies

### Core Dependencies
- **UI Framework**: React ecosystem (React, React DOM, React Hook Form)
- **Database**: PostgreSQL with Drizzle ORM and Neon Database connector
- **Styling**: Tailwind CSS with PostCSS processing
- **Component Library**: Radix UI primitives wrapped in shadcn/ui components
- **Validation**: Zod for schema validation and type safety

### Development Tools
- **Build Tools**: Vite for development server and production builds
- **TypeScript**: Full TypeScript support with strict configuration
- **ESBuild**: Backend bundling for production deployment
- **Replit Integration**: Special plugins for Replit development environment

## Deployment Strategy

### Development
- **Dev Server**: Vite development server with hot module replacement
- **Backend**: tsx for running TypeScript directly in development
- **Database**: Can use in-memory storage or connect to development database

### Production
- **Frontend Build**: Vite builds optimized static assets to `/dist/public`
- **Backend Build**: ESBuild bundles server code to `/dist/index.js`
- **Database**: Configured for PostgreSQL with Drizzle migrations
- **Static Serving**: Express serves built frontend assets in production

### Key Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:push` - Push database schema changes

The application is designed to be deployed on platforms supporting Node.js with PostgreSQL databases, with special considerations for Replit's development environment.