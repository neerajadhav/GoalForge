from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

# User registration/creation schema
class UserCreate(BaseModel):
    email: EmailStr
    username: str
    password: str

# User login schema
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# User response schema (what we return to client)
class UserResponse(BaseModel):
    id: int
    email: str
    username: str
    is_active: bool
    is_verified: bool
    has_gemini_key: bool  # Don't expose the actual key
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# Gemini API key update schema
class GeminiKeyUpdate(BaseModel):
    gemini_api_key: str

# Token schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
