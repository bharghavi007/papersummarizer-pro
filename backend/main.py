
from fastapi import FastAPI
from routers import health, pdf, summarize

app = FastAPI(title="PaperSummarizer Pro API")

app.include_router(health.router)
app.include_router(pdf.router)
app.include_router(summarize.router)


