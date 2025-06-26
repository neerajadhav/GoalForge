# GoalForge Frontend

## Overview

This is the frontend application for GoalForge, a goal-setting and roadmap management platform. The frontend is built with React and TypeScript, using Vite for fast development and build tooling. It communicates with the backend via RESTful APIs to provide authentication, goal management, and roadmap features.

---

## Project Structure

```
Frontend/
├── public/                # Static assets (e.g., images, icons)
├── src/                   # Main source code
│   ├── assets/            # Static assets (CSS, SVGs)
│   ├── components/        # Reusable React components
│   ├── config/            # Environment configuration
│   ├── contexts/          # React context providers (e.g., Auth, Toast)
│   ├── data/              # Mock data for development/testing
│   ├── hooks/             # Custom React hooks
│   ├── layouts/           # Layout components for different pages
│   ├── lib/               # Utility functions
│   ├── pages/             # Page components (routed views)
│   ├── services/          # API service modules (auth, goals, HTTP client)
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Additional utility functions
├── components.json        # Component registry/configuration
├── index.html             # Main HTML file
├── package.json           # Project dependencies and scripts
├── tsconfig*.json         # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── README.md              # This file
```

---

## Key Folders and Files

- **src/components/**: Contains all reusable UI components, such as forms, dialogs, cards, and navigation elements.
- **src/pages/**: Contains top-level page components, organized by route (e.g., `auth/`, `landing/`, `app/`).
- **src/services/**: Contains modules for interacting with backend APIs. For example:
  - `authService.ts`: Handles authentication (login, register, token management).
  - `goalsService.ts`: Handles CRUD operations for goals and roadmaps.
  - `httpClient.ts`: Configures the HTTP client (e.g., Axios or Fetch) with base URL, interceptors, and error handling.
- **src/contexts/**: Provides React Contexts for global state management (e.g., authentication, toast notifications).
- **src/hooks/**: Custom hooks for logic reuse (e.g., `useForm`, `useGoals`, `useDebounce`).
- **src/layouts/**: Layout components for different sections of the app (e.g., dashboard, landing page).
- **src/config/env.ts**: Manages environment variables (e.g., API base URL).

---

## Backend API Integration

The frontend communicates with the backend (located in the `Backend/` directory) via RESTful APIs. The integration is handled as follows:

- **API Base URL**: Defined in `src/config/env.ts` and used throughout the services.
- **HTTP Client**: `src/services/httpClient.ts` sets up the HTTP client, including base URL, headers, and error handling.
- **Service Modules**: Each service module (e.g., `authService.ts`, `goalsService.ts`) exports functions that correspond to backend API endpoints. These functions are used in components and hooks to fetch or mutate data.
- **Authentication**: Auth tokens are stored (typically in localStorage or context) and attached to API requests via interceptors or headers.
- **Error Handling**: Centralized in the HTTP client and surfaced to the UI via the Toast context.

---

## Running the Frontend

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm run dev
   ```
3. **Build for production:**
   ```bash
   npm run build
   ```