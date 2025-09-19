
from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
import os
from pdfminer.high_level import extract_text
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

app = FastAPI(title="PaperSummarizer Pro API")

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

    text = extract_text(file_path)

    return {
        "status": "success",
        "filename": file.filename,
        "extracted_text_preview": text[:500]   
    }

class SummarizeRequest(BaseModel):
    text: str

@app.post("/summarize")
async def summarize(request: SummarizeRequest):
    model = genai.GenerativeModel("gemini-2.0-flash")
    response = model.generate_content(
        f"Summarize this text in simple, concise points:\n\n{request.text}"
    )
    return {"summary": response.text}


