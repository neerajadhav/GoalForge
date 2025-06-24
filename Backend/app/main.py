import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.upload import upload_router
from app.api.generate import generate_router
from app.api.health import health_router
from app.api.auth import auth_router
from app.api.goals import router as goals_router
from app.database import Base, engine

# Load environment variables from .env file
load_dotenv()

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="GoalForge API", version="1.0.0")

# CORS Configuration
origins = [
    "http://127.0.0.1:8000",
    "http://localhost:3000",  # For frontend development (Next.js)
    "http://127.0.0.1:3000",
    "http://localhost:5173",  # For Vite development server
    "http://127.0.0.1:5173",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers for endpoints
app.include_router(auth_router)
app.include_router(goals_router)
app.include_router(upload_router)
app.include_router(generate_router)
app.include_router(health_router)  # Optional, for a health check endpoint
