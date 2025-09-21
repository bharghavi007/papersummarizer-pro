from fastapi import APIRouter, UploadFile, File, HTTPException
import os
from services.pdf_extractor import extract_pdf_text

router = APIRouter()
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed.")

    file_path = os.path.join(UPLOAD_DIR, file.filename)
    try:
        with open(file_path, "wb") as buffer:
            buffer.write(await file.read())

        text = extract_pdf_text(file_path)
        if not text.strip():
            raise HTTPException(status_code=400, detail="No extractable text found in PDF.")

        return {
            "status": "success",
            "filename": file.filename,
            "extracted_text_preview": text[:500]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process PDF: {str(e)}")


