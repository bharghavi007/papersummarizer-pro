from fastapi import APIRouter
from pydantic import BaseModel
from services.summarizer import generate_summary

router = APIRouter()

class SummarizeRequest(BaseModel):
    text: str

@router.post("/summarize")
async def summarize(request: SummarizeRequest):
    summary = generate_summary(request.text)
    return {"summary": summary}

