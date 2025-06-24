from sqlalchemy.orm import Session
from app.models.auth import User
from app.schemas.auth import UserCreate
from app.auth.security import get_password_hash, verify_password, encrypt_api_key, decrypt_api_key
from typing import Optional

def get_user_by_email(db: Session, email: str) -> Optional[User]:
    """Get user by email"""
    return db.query(User).filter(User.email == email).first()

def get_user_by_username(db: Session, username: str) -> Optional[User]:
    """Get user by username"""
    return db.query(User).filter(User.username == username).first()

def get_user_by_id(db: Session, user_id: int) -> Optional[User]:
    """Get user by ID"""
    return db.query(User).filter(User.id == user_id).first()

def create_user(db: Session, user: UserCreate) -> User:
    """Create a new user"""
    hashed_password = get_password_hash(user.password)
    db_user = User(
        email=user.email,
        username=user.username,
        hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user_gemini_key(db: Session, user_id: int, api_key: str) -> Optional[User]:
    """Update user's Gemini API key"""
    user = get_user_by_id(db, user_id)
    if not user:
        return None
    
    # Encrypt the API key before storing
    encrypted_key = encrypt_api_key(api_key) if api_key else None
    user.gemini_api_key = encrypted_key
    db.commit()
    db.refresh(user)
    return user

def get_user_gemini_key(db: Session, user_id: int) -> Optional[str]:
    """Get user's decrypted Gemini API key"""
    user = get_user_by_id(db, user_id)
    if not user or not user.gemini_api_key:
        return None
    
    return decrypt_api_key(user.gemini_api_key)

def authenticate_user(db: Session, email: str, password: str) -> Optional[User]:
    """Authenticate user with email and password"""
    user = get_user_by_email(db, email)
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user
