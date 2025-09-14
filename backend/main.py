from fastapi import FastAPI

app = FastAPI(title="PaperSummarizer Pro API")

@app.get("/ping")
def health_check():
    return {"status": "ok", "message": "pong"}

