# 📚 PaperSummarizer Pro

**PaperSummarizer Pro** is an AI-powered research assistant that helps students, researchers, and professionals cut through lengthy academic papers.  
With just a PDF upload, you can generate **concise summaries**, compare multiple papers, and even build automated literature reviews.  
The goal is to save hours of reading time and let you focus only on the insights that matter. 🚀  

## 🚀 Tech Stack
- **Backend:** FastAPI (Python)
- **Frontend:** React + Tailwind
- **AI Core:** OpenAI API + LangChain
- **Export:** PDF / Word

## ⚡ Quick Start

### Backend
```
cd backend
python -m venv venv
source venv/bin/activate   # (Windows: venv\Scripts\activate)
pip install -r requirements.txt
uvicorn main:app --reload
```
Backend runs on: http://localhost:8000

### Frontend
```
cd frontend
npm install
npm run dev
```
Frontend runs on: http://localhost:5173

## 📂 Project Structure
- `backend/` → API + AI logic
- `frontend/` → UI for uploads & results

## 📌 Roadmap
- [X] PDF upload & text extraction
- [X] Single paper summarization
- [ ] Multi-paper comparison
- [ ] Literature review generator
- [ ] Export (PDF/Word)

## 📜 License
MIT License

