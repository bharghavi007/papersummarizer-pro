from fastapi import FastAPI, Request
from routers import health, pdf, summarize
from dotenv import load_dotenv
import logging
from logging.handlers import RotatingFileHandler
import time

load_dotenv()

LOG_FILE = "logs/app.log"
handler = RotatingFileHandler(LOG_FILE, maxBytes=5000000, backupCount=5)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[handler, logging.StreamHandler()]
)
logger = logging.getLogger(__name__)

app = FastAPI(title="PaperSummarizer Pro API")

@app.middleware("http")
async def log_requests(request: Request, call_next):
    idem = time.time()
    logger.info(f"Start request {request.method} {request.url}")
    response = await call_next(request)
    duration = time.time() - idem
    logger.info(f"Completed in {duration:.2f}s → {response.status_code}")
    return response

app.include_router(health.router)
app.include_router(pdf.router)
app.include_router(summarize.router)


