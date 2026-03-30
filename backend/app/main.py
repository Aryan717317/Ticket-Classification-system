from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="Triage AI Backend")

class TicketRequest(BaseModel):
    text: str

class ClassificationResponse(BaseModel):
    category: str
    confidence: int
    sentiment: str
    priority: str

@app.post("/api/classify", response_model=ClassificationResponse)
def classify_ticket(request: TicketRequest):
    # TODO: Connect NLP service
    return {
        "category": "it",
        "confidence": 85,
        "sentiment": "neutral",
        "priority": "medium"
    }

@app.get("/api/health")
def health_check():
    return {"status": "ok"}
