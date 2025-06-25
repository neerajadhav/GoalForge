# GoalForge: AI-Powered Goal Management Platform

GoalForge is a full-stack web application designed to help users define ambitious goals and transform them into clear, actionable, and time-managed step-by-step plans, automatically generated with the power of AI. Developed collaboratively by a team of frontend and backend interns under expert mentorship, GoalForge combines productivity and artificial intelligence for personal and professional success.

---

## Overview

GoalForge enables users to:

- Define a goal and set a deadline.
- Automatically generate a tailored roadmap using Google Gemini AI.
- Track progress step-by-step.
- Receive AI-generated suggestions for improved goal achievement.

The platform consists of:

- **Frontend**: A responsive, modular UI built with React, TypeScript, and Vite.
- **Backend**: A RESTful FastAPI server that handles authentication, data persistence, AI integrations, and file uploads.

---

## Architecture Overview

### Technology Stack

| Layer     | Technology                            |
| --------- | ------------------------------------- |
| Frontend  | React, TypeScript, Vite, Tailwind CSS |
| Backend   | FastAPI, SQLAlchemy, Pydantic, JWT    |
| Database  | SQLite (default) / PostgreSQL         |
| AI Engine | Google Gemini (Text & Image APIs)     |
| Auth      | JWT, bcrypt password hashing          |
| DevOps    | Docker-ready, .env-based configs      |

---

## Frontend (React + TypeScript)

### Structure

```
Frontend/
├── src/
│   ├── components/     # UI components
│   ├── pages/          # Routed views (Auth, Dashboard, etc.)
│   ├── services/       # API service modules
│   ├── contexts/       # Global state (Auth, Toasts)
│   ├── hooks/          # Custom React hooks
│   ├── config/         # Environment config
│   └── layouts/        # App shell layouts
```

### Features

- Modular, reusable component design
- Authenticated dashboard and roadmap views
- Toast-based feedback and error handling
- Light and dark mode UI
- Dynamic integration with backend APIs for:
  - Authentication (JWT)
  - Goal CRUD
  - AI-based roadmap generation
  - File uploads

### Development Commands

```bash
npm install       # Install dependencies
npm run dev       # Start development server
npm run build     # Build for production
```

---

## Backend (FastAPI + SQLAlchemy)

### Core Capabilities

- User management: Register/login with secure password hashing and JWT tokens
- Goal management: Full CRUD support with filtering and pagination
- Roadmap generator: Auto-generates steps using Google Gemini AI
- Generative AI: Text and image generation (requires user-provided Gemini API key)
- Encrypted key storage: API keys stored securely using Fernet encryption
- File uploads: Users can upload relevant documents (10MB limit)

### Structure

```
Backend/
├── app/
│   ├── api/        # Route handlers
│   ├── auth/       # Security, login, JWT logic
│   ├── crud/       # Database operations
│   ├── models/     # SQLAlchemy schemas
│   ├── schemas/    # Pydantic request/response validation
│   ├── services/   # AI generation, file handling
├── init_db.py      # Bootstrap database
├── .env            # Configurable variables
```

### Key Endpoints

- `POST /auth/register` – User registration
- `POST /auth/login` – Login and receive JWT
- `POST /api/goals/` – Create a new goal
- `GET /roadmaps/goal/{goal_id}` – Fetch or generate a roadmap
- `GET /gemini?query=...&model_type=text|image` – Generate with AI
- `POST /upload` – Upload a file

### Running Locally

```bash
# Setup
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Configure environment
cp .env.example .env

# Initialize database
python init_db.py

# Run server
uvicorn app.main:app --reload
```

---

## Frontend–Backend Integration

| Frontend Action             | Backend Endpoint                   | Description                         |
| --------------------------- | ---------------------------------- | ----------------------------------- |
| Register/Login              | `/auth/register`, `/auth/login`    | JWT token-based authentication      |
| Create/Retrieve Goals       | `/api/goals/`                      | Authenticated goal CRUD             |
| Generate Roadmap            | `/roadmaps/goal/{goal_id}`         | AI-generated roadmap with Gemini    |
| View/Edit/Delete Roadmap    | `/roadmaps/{roadmap_id}`           | Full roadmap management             |
| Upload Supporting Documents | `/upload`                          | User file uploads (PDF, docs, etc.) |
| Gemini Text/Image Prompting | `/gemini?query=...&model_type=...` | User-supplied prompts for AI        |

---

## Authentication and Security

- JWT authentication (Bearer tokens)
- Password hashing via bcrypt
- CORS setup for frontend-backend development communication
- Fernet encryption for securing Gemini API keys

---

## Application Workflow

1. User signs in and defines a goal with deadline, category, and priority.
2. Frontend sends goal data to the backend.
3. Backend optionally generates a step-by-step roadmap using Gemini AI.
4. User views, edits, and marks roadmap steps as complete via the dashboard.
5. User can also generate motivational content or illustrations via Gemini integration.

---

## Environment Configuration

**Frontend** (.env or `src/config/env.ts`):

```env
VITE_API_BASE_URL=http://localhost:8000
```

**Backend** (.env):

```env
DATABASE_URL=sqlite:///./goalforge.db
SECRET_KEY=your-jwt-secret
ENCRYPTION_KEY=fernet-key
GEMINI_API_KEY=your-default-api-key
```

---

## Development Notes

- Use the Toast context to display API errors and success messages in the UI.
- All data exchanges are typed end-to-end with TypeScript (frontend) and Pydantic (backend).
- AI features require users to add their own Gemini API key (securely stored).

---

## Team and Contribution

This project is built as a mentored internship project with the goal of mastering full-stack development. All interns contribute in alignment with Git best practices and regular code reviews.

To contribute:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request with clear changes

---

## License

GoalForge is released under the MIT License. See the LICENSE file for details.

---

If you would like a logo, architecture diagram, or deployment instructions added to this README, please open an issue or submit a pull request.

---

Let me know if you want this saved to your README file.