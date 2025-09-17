from fastapi import FastAPI, UploadFile, File
import os

app = FastAPI(title="PaperSummarizer Pro API")

# Uploads directory
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.get("/ping")
def health_check():
    return {"status": "ok", "message": "pong"}

@app.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())
    return {"status": "success", "filename": file.filename}


