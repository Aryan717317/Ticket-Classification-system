from fastapi import FastAPI
from pydantic import BaseModel
from typing import Dict, Optional, List
from fastapi.middleware.cors import CORSMiddleware
from app.services.nlp_service import NLPService

app = FastAPI(title="Triage AI Backend")

# Allow the frontend to call the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TicketRequest(BaseModel):
    text: str
    settings: Optional[dict] = {"sentiment": True, "priority": True}

class ClassificationResponse(BaseModel):
    winner: Optional[str]
    scores: Dict[str, int]
    matches: Dict[str, List[str]]
    confidence: int
    is_unknown: bool
    sentiment: str
    priority: str

@app.post("/api/classify", response_model=ClassificationResponse)
def classify_ticket(request: TicketRequest):
    text = request.text
    
    # Run core NLP
    result = NLPService.classify_text(text)
    
    # Sentinel analysis
    tokens = NLPService.tokenize(text)
    sentiment = "neutral"
    if request.settings.get("sentiment", True):
        sentiment = NLPService.analyze_sentiment(tokens)
        
    # Priority scaling
    priority = "medium"
    if request.settings.get("priority", True) and result["winner"]:
        priority = NLPService.get_priority(result["winner"], sentiment, result["confidence"])
        
    return ClassificationResponse(
        winner=result["winner"],
        scores=result["scores"],
        matches=result["matches"],
        confidence=result["confidence"],
        is_unknown=result["is_unknown"],
        sentiment=sentiment,
        priority=priority
    )

@app.get("/api/health")
def health_check():
    return {"status": "ok"}