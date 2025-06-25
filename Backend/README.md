# GoalForge Backend

GoalForge Backend is a robust, secure, and extensible RESTful API built with FastAPI and SQLAlchemy. It powers the GoalForge platform, enabling user authentication, goal management, roadmap planning, generative AI features, and file uploads. This backend is designed for scalability and easy integration with modern frontend frameworks.

---

## Table of Contents
- [Features](#features)
- [Architecture Overview](#architecture-overview)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Authentication & Security](#authentication--security)
- [Generative AI Integration](#generative-ai-integration)
- [File Uploads](#file-uploads)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Development & Scripts](#development--scripts)
- [Dependencies](#dependencies)
- [License](#license)

---

## Features
- **User Authentication**: Register, login, JWT-based authentication, password hashing, and encrypted API key storage.
- **Goal Management**: CRUD operations for user goals with filtering, pagination, and statistics.
- **Roadmap Planning**: Create, update, and manage step-based roadmaps linked to goals. **Roadmaps can be generated automatically using Google Gemini AI for personalized planning.**
- **Generative AI**: Integrate with Google Gemini for text and image generation using user-provided API keys.
- **File Uploads**: Secure file upload endpoint with size limits.
- **Health Check**: Simple endpoint for service monitoring.
- **Extensible**: Modular codebase for easy feature addition.

---

## Architecture Overview
- **Framework**: FastAPI (ASGI)
- **Database**: SQLAlchemy ORM (default: SQLite, easily switchable to PostgreSQL)
- **Directory Structure**:
  - `app/` - Main application code
    - `api/` - API route definitions
    - `auth/` - Authentication logic, security, and dependencies
    - `crud/` - Database CRUD operations
    - `models/` - SQLAlchemy models
    - `schemas/` - Pydantic schemas for request/response validation
    - `static/` & `templates/` - Static files and HTML templates (if needed)
  - `init_db.py` - Script to initialize the database
  - `requirements.txt` - Python dependencies

---

## API Endpoints

### Authentication
- `POST /auth/register` — Register a new user
- `POST /auth/login` — Login and receive JWT token
- `POST /auth/token` — OAuth2 compatible token endpoint

### Goals
- `POST /api/goals/` — Create a new goal
- `GET /api/goals/` — List goals (with filtering, pagination)
- `GET /api/goals/{goal_id}` — Retrieve a specific goal
- `PUT /api/goals/{goal_id}` — Update a goal
- `DELETE /api/goals/{goal_id}` — Delete a goal

### Roadmaps
- `POST /roadmaps/goal/{goal_id}` — Create roadmap for a goal
- `GET /roadmaps/goal/{goal_id}` — Get roadmap by goal
- `GET /roadmaps/{roadmap_id}` — Get roadmap by ID
- `PUT /roadmaps/{roadmap_id}` — Update roadmap
- `DELETE /roadmaps/{roadmap_id}` — Delete roadmap
- `POST /roadmaps/{roadmap_id}/steps` — Add steps to roadmap

### Generative AI
- `GET /gemini?query=...&model_type=text|image` — Generate text or image using Gemini API

### File Upload
- `POST /upload` — Upload a file (max 10MB)

### Health
- `GET /health` — Service health check

---

## Database Models
- **User**: Stores user credentials, encrypted Gemini API key, and profile info
- **Goal**: User goals with status, category, priority, and deadline
- **Roadmap**: Linked to a goal, contains ordered steps
- **RoadmapStep**: Steps within a roadmap, track completion

---

## Authentication & Security
- **JWT Authentication**: Secure endpoints with JWT tokens
- **Password Hashing**: Uses bcrypt via Passlib
- **API Key Encryption**: User Gemini API keys are encrypted with Fernet before storage
- **CORS**: Configured for local frontend development

---

## Generative AI Integration
- **Google Gemini**: Users can provide their own Gemini API key (encrypted in DB)
- **Text & Image Generation**: Endpoints for generating content using Gemini models
- **Roadmap Generation**: Roadmaps for goals can be generated automatically using Gemini, providing users with AI-powered, step-by-step plans tailored to their objectives.

---

## File Uploads
- **Endpoint**: `/upload` accepts files up to 10MB
- **Storage**: Files are saved in the backend's `uploads/` directory

---

## Setup & Installation

### 1. Clone the Repository
```bash
git clone <repo-url>
cd GoalForge/Backend
```

### 2. Create a Virtual Environment
```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables
Create a `.env` file in the `Backend/` directory. Example:
```
DATABASE_URL=sqlite:///./goalforge.db
SECRET_KEY=your-secret-key
ENCRYPTION_KEY=your-encryption-key
GEMINI_API_KEY=your-default-gemini-key (optional)
GEMINI_MODEL=gemini-1.5-flash (optional)
```

### 5. Initialize the Database
```bash
python init_db.py
```

### 6. Run the Development Server
```bash
uvicorn app.main:app --reload
```

---

## Environment Variables
- `DATABASE_URL`: Database connection string (default: SQLite)
- `SECRET_KEY`: Secret for JWT signing
- `ENCRYPTION_KEY`: Key for encrypting API keys (generate with `generate_encryption_key.py`)
- `GEMINI_API_KEY`: (Optional) Default Gemini API key
- `GEMINI_MODEL`: (Optional) Gemini model name

---

## Development & Scripts
- `init_db.py`: Initialize database tables
- `generate_encryption_key.py`: Generate a secure Fernet key for API key encryption
- `migrate_roadmaps.py`, `populate_goals.py`: Data migration and seeding scripts
- `run.sh`: (Optional) Script to start the backend

---

## Dependencies
Key dependencies (see `requirements.txt` for full list):
- fastapi
- uvicorn
- sqlalchemy
- alembic
- passlib[bcrypt]
- python-jose[cryptography]
- python-dotenv
- pydantic[email]
- google-generativeai
- jinja2
- requests

---

## License
See [LICENSE](LICENSE) for details.
