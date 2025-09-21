import os
import google.generativeai as genai
from fastapi import HTTPException

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def generate_summary(text: str) -> str:
    if not text.strip():
        raise HTTPException(status_code=400, detail="Input text is empty, cannot summarize.")

    try:
        model = genai.GenerativeModel("gemini-pro")
        response = model.generate_content(
            f"Summarize this text in simple, concise points:\n\n{text}"
        )
        return response.text
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Summarization failed: {str(e)}")


