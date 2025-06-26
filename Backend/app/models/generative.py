import os
from dotenv import load_dotenv
import google.generativeai as genai
from sqlalchemy.orm import Session
from app.auth.crud import get_user_gemini_key

# Load environment variables
load_dotenv()

def configure_model(api_key: str):
    """Configure Gemini model with provided API key (must be user-provided)"""
    if not api_key:
        raise ValueError("No Gemini API key provided. Please upload your API key in your profile or contact administrator.")
    # Get model name from environment variable, default to gemini-1.5-flash
    model_name = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel(model_name)
    return model

def get_model_for_user(db: Session, user_id: int):
    """Get model instance using user's uploaded API key"""
    user_api_key = get_user_gemini_key(db, user_id)
    return configure_model(user_api_key)

def generate_text(query: str, db: Session, user_id: int):
    """Generate text using user's Gemini API key"""
    model = get_model_for_user(db, user_id)
    response = model.generate_content(query)
    return {"text": response.text}

def generate_image(query: str, img_data: bytes, db: Session, user_id: int):
    """Generate image analysis using user's Gemini API key"""
    model = get_model_for_user(db, user_id)
    # Use the same model for both text and image processing
    response = model.generate_content([query, {"mime_type": "image/jpeg", "data": img_data}])
    return {"image": response.text}
