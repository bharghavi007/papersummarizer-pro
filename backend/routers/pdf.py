from fastapi import APIRouter, UploadFile, File
import os
from services.pdf_extractor import extract_pdf_text

router = APIRouter()
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    text = extract_pdf_text(file_path)
    return {
        "status": "success",
        "filename": file.filename,
        "extracted_text_preview": text[:500]
    }

