from fastapi import APIRouter, Query, HTTPException
from app.models.generative import generate_text, generate_image
from app.models.file_utils import get_uploaded_image

generate_router = APIRouter()

@generate_router.get("/gemini")
async def generate(query: str, model_type: str = Query(default='text')):
    if model_type not in ['text', 'image']:
        raise HTTPException(status_code=400, detail="Invalid model type")

    if model_type == 'text':
        response = generate_text(query)
    else:
        # Get the uploaded image for image-based generation
        img_data = get_uploaded_image()
        response = generate_image(query, img_data)
    
    return response
