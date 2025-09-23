from fastapi import FastAPI, Request
from routers import health, pdf, summarize
from dotenv import load_dotenv
from logger import logger
import time

load_dotenv()

app = FastAPI(title="PaperSummarizer Pro API")

@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    duration = round(time.time() - start_time, 3)
    logger.info(
        f"{request.method} {request.url.path} completed_in={duration}s status={response.status_code}"
    )
    return response

app.include_router(health.router)
app.include_router(pdf.router)
app.include_router(summarize.router)


