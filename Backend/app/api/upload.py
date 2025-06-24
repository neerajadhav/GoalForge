from fastapi import APIRouter, File, UploadFile, HTTPException
from pathlib import Path
from app.models.file_utils import save_file

upload_router = APIRouter()

MAX_UPLOAD_SIZE = 10 * 1024 * 1024  # 10 MB size limit

@upload_router.post("/upload")
async def upload(file: UploadFile = File(...)):
    if file.size > MAX_UPLOAD_SIZE:
        raise HTTPException(status_code=413, detail="File size exceeds the allowed limit")
    
    file_path = Path(__file__).resolve().parent.parent / "uploads" / file.filename
    await save_file(file, file_path)
    
    return {"filename": file.filename, "message": "File uploaded successfully"}
