from fastapi import APIRouter, Query, HTTPException, Depends
from sqlalchemy.orm import Session
from app.models.generative import generate_text, generate_image
from app.models.file_utils import get_uploaded_image
from app.database import get_db
from app.auth.dependencies import get_current_active_user

generate_router = APIRouter()

@generate_router.get("/gemini")
async def generate(
    query: str,
    model_type: str = Query(default='text'),
    current_user = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Generate content using user's Gemini API key"""
    if model_type not in ['text', 'image']:
        raise HTTPException(status_code=400, detail="Invalid model type")

    try:
        if model_type == 'text':
            response = generate_text(query, db, current_user.id)
        else:
            # Get the uploaded image for image-based generation
            img_data = get_uploaded_image()
            response = generate_image(query, img_data, db, current_user.id)
        
        return response
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Generation failed: {str(e)}")
