from pathlib import Path

async def save_file(file, file_path: Path):
    file_path.parent.mkdir(parents=True, exist_ok=True)
    with file_path.open("wb") as buffer:
        buffer.write(await file.read())

def get_uploaded_image():
    img_path = Path(__file__).resolve().parent.parent / "uploads" / "image.jpg"  # Example file path
    return img_path.read_bytes()
