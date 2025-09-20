import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def generate_summary(text: str) -> str:
    model = genai.GenerativeModel("gemini-pro")
    response = model.generate_content(
        f"Summarize this text in simple, concise points:\n\n{text}"
    )
    return response.text

