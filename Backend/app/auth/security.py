from datetime import datetime, timedelta, timezone
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from cryptography.fernet import Fernet
from fastapi import HTTPException, status
import os
import base64

# Security configuration
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-this-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Encryption for API keys
def get_encryption_key():
    """Get or generate encryption key for API keys"""
    key = os.getenv("ENCRYPTION_KEY")
    if not key:
        # Generate a key if not provided (for development)
        key = base64.urlsafe_b64encode(os.urandom(32)).decode()
        print(f"Generated encryption key: {key}")
        print("Please set ENCRYPTION_KEY environment variable with this key")
    return key.encode() if isinstance(key, str) else key

_fernet = None

def get_fernet():
    """Get Fernet instance for encryption/decryption"""
    global _fernet
    if _fernet is None:
        key = get_encryption_key()
        _fernet = Fernet(key)
    return _fernet

def encrypt_api_key(api_key: str) -> str:
    """Encrypt API key for storage"""
    if not api_key:
        return ""
    fernet = get_fernet()
    encrypted = fernet.encrypt(api_key.encode())
    return base64.urlsafe_b64encode(encrypted).decode()

def decrypt_api_key(encrypted_key: str) -> str:
    """Decrypt API key for use"""
    if not encrypted_key:
        return ""
    try:
        fernet = get_fernet()
        decoded = base64.urlsafe_b64decode(encrypted_key.encode())
        decrypted = fernet.decrypt(decoded)
        return decrypted.decode()
    except Exception:
        return ""

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash"""
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """Hash a password"""
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """Create a JWT access token"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str, credentials_exception):
    """Verify and decode a JWT token"""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        return username
    except JWTError:
        raise credentials_exception
