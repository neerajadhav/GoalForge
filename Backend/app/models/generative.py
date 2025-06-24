import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()

def configure_model():
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise ValueError("GEMINI_API_KEY environment variable is not set. Please set your Google AI API key.")
    
    # Get model name from environment variable, default to gemini-1.5-flash
    model_name = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")
    
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel(model_name)
    return model

# Configure model lazily
_model = None

def get_model():
    global _model
    if _model is None:
        _model = configure_model()
    return _model

def generate_text(query: str):
    model = get_model()
    response = model.generate_content(query)
    return {"text": response.text}

def generate_image(query: str, img_data: bytes):
    model = get_model()
    # Use the same model for both text and image processing
    response = model.generate_content([query, {"mime_type": "image/jpeg", "data": img_data}])
    return {"image": response.text}
