from fastapi import APIRouter, UploadFile, File, HTTPException
import os
import uuid
from services.pdf_extractor import extract_pdf_text
from services.compare_service import compare_papers
from typing import List

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/compare-multi")
async def compare_multi(files: List[UploadFile] = File(...)):
    """
    Accept multiple PDF files (2..5), extract text, summarize each,
    and produce AI-powered comparison between them.
    """
    if not files or len(files) < 2:
        raise HTTPException(status_code=400, detail="Please upload at least 2 PDF files for comparison.")
    if len(files) > 6:
        raise HTTPException(status_code=400, detail="Maximum 6 files allowed.")

    saved_paths = []
    try:
        for f in files:
            if not f.filename.lower().endswith(".pdf"):
                raise HTTPException(status_code=400, detail="Only PDF files are allowed.")
            unique_name = f"{uuid.uuid4().hex}_{f.filename}"
            file_path = os.path.join(UPLOAD_DIR, unique_name)
            with open(file_path, "wb") as buffer:
                buffer.write(await f.read())
            saved_paths.append({"filename": f.filename, "path": file_path})

        # Call compare service
        result = compare_papers(saved_paths)
        return {"status": "success", "result": result}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Comparison failed: {str(e)}")
    finally:
        pass
