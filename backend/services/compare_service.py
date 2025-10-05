import os
from typing import List, Dict
from services.pdf_extractor import extract_pdf_text
from services.summarizer import generate_summary
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def compare_papers(saved_list: List[Dict[str, str]]) -> Dict:
    """
    saved_list: [{"filename": "orig.pdf", "path": "/absolute/..pdf"}, ...]
    returns: structured dict with summaries + similarities + differences + overall_insight
    """

    paper_summaries = []
    for item in saved_list:
        text = extract_pdf_text(item["path"])
        truncated = text[:8000]  # adjust if needed
        summary = generate_summary(truncated)  # returns a concise summary string
        paper_summaries.append({
            "filename": item["filename"],
            "summary": summary,
            "excerpt": truncated[:800]
        })

    prompt_parts = []
    for idx, p in enumerate(paper_summaries, start=1):
        prompt_parts.append(f"Paper {idx} - {p['filename']}:\n{p['summary']}\n")

    compare_prompt = (
        "You are an expert research assistant. Given the short summaries of multiple research papers below,\n"
        "produce a structured comparison with the following sections:\n"
        "1) Key Similarities (bullet points, concise)\n"
        "2) Major Differences (bullet points, concise)\n"
        "3) Brief per-paper summary (one paragraph each) — you may refine the short summaries if needed\n"
        "4) Overall insight and suggested research gaps (3-5 bullet points)\n\n"
        "Respond in JSON format exactly like:\n"
        "{\n"
        "  \"similarities\": [\"...\"],\n"
        "  \"differences\": [\"...\"],\n"
        "  \"per_paper_summaries\": [{\"filename\":\"...\",\"summary\":\"...\"}],\n"
        "  \"overall_insight\": [\"...\"]\n"
        "}\n\n"
        "Here are the paper summaries:\n\n"
    ) + "\n\n".join(prompt_parts)

    model = genai.GenerativeModel("gemini-2.5-flash")
    try:
        response = model.generate_content(compare_prompt)
        raw_text = response.text.strip()

        import json
        try:
            parsed = json.loads(raw_text)
        except Exception:
            import re
            m = re.search(r"(\{[\s\S]*\})", raw_text)
            if m:
                parsed = json.loads(m.group(1))
            else:
                parsed = {
                    "similarities": [],
                    "differences": [],
                    "per_paper_summaries": [{"filename": p["filename"], "summary": p["summary"]} for p in paper_summaries],
                    "overall_insight": [raw_text]
                }

        if "per_paper_summaries" in parsed:
            new_list = []
            for i, entry in enumerate(parsed["per_paper_summaries"]):
                if isinstance(entry, dict) and "filename" in entry:
                    new_list.append(entry)
                else:
                    fname = paper_summaries[i]["filename"] if i < len(paper_summaries) else f"paper_{i+1}"
                    new_list.append({"filename": fname, "summary": entry if isinstance(entry, str) else str(entry)})
            parsed["per_paper_summaries"] = new_list
        else:
            parsed["per_paper_summaries"] = [{"filename": p["filename"], "summary": p["summary"]} for p in paper_summaries]

        return parsed

    except Exception as e:
        raise RuntimeError(f"Gemini comparison failed: {str(e)}")
