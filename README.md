# Aura Luxury Interiors & Renovations Dubai

Interior Management & Renovation System - Complete web application for interior design services in Dubai, UAE.

## Project Structure

- **backend/** - Node.js/Express API with MongoDB
- **frontend/** - React + Vite frontend application
- **docs/** - Documentation and SRS

## Prerequisites

- Node.js (v18+)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Installation

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables (already configured in `.env`):
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/interior_db
JWT_SECRET=super_secret_jwt_access_key_dubai_interior_2026
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=super_secret_jwt_refresh_key_dubai_interior_2026
JWT_REFRESH_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

4. Start MongoDB server (if using local MongoDB):
```bash
# On Windows
net start MongoDB

# Or use mongod directly
mongod
```

5. Run database seed (optional - populates initial data):
```bash
npm run seed
```

6. Start backend server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## Features

### Public Pages
- Home page with hero section and services overview
- About page with company information
- Services listing and detail pages
- Projects portfolio with detail views
- Design styles gallery
- Customer reviews
- Contact form
- Consultation booking
- Careers page

### Admin Panel
- Admin login with authentication
- Dashboard with statistics
- Lead management
- Service management
- Project management
- Quote management

## API Endpoints

Base URL: `http://localhost:5000/api/v1`

- `/auth` - Authentication (login, logout, me)
- `/leads` - Lead management
- `/services` - Service CRUD operations
- `/projects` - Project CRUD operations
- `/quotes` - Quote management
- `/reviews` - Customer reviews
- `/partners` - Partner management
- `/design-styles` - Design styles
- `/settings` - Site settings
- `/users` - User management

## Technology Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Multer (file uploads)
- CORS
- Rate limiting

### Frontend
- React 18
- React Router DOM
- Tailwind CSS
- Vite
- Axios
- Lucide React (icons)

## Database Models

- User
- Lead
- Service
- Project
- Quote
- Review
- Partner
- DesignStyle
- Media
- SiteSetting

## Development

The project follows the SRS (Software Requirements Specification) document for Interior Management & Renovation System in Dubai, UAE.

## License

Proprietary - Aura Luxury Interiors & Renovations Dubai