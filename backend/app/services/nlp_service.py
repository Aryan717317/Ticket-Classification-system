import re
import string
from app.models.categories import CATEGORIES, SENTIMENT_DICT

class NLPService:
    @staticmethod
    def tokenize(text: str) -> str:
        text = text.lower()
        # Remove punctuation except apostrophes
        text = re.sub(r"[^a-z0-9\s']", " ", text)
        text = re.sub(r"\s+", " ", text).strip()
        return text

    @staticmethod
    def analyze_sentiment(tokens: str) -> str:
        token_list = tokens.split()
        neg = sum(1 for w in SENTIMENT_DICT["negative"] if w in token_list)
        pos = sum(1 for w in SENTIMENT_DICT["positive"] if w in token_list)
        urg = sum(1 for w in SENTIMENT_DICT["urgent"] if w in token_list)
        
        if urg > 0:
            return "urgent"
        if neg > 0:
            return "negative"
        if pos > 0:
            return "positive"
        return "neutral"

    @staticmethod
    def score_category(tokens: str, kw_map: dict) -> tuple[int, list]:
        score = 0
        matched = []
        t_pad = f" {tokens} "
        
        for kw, weight in kw_map.items():
            kw_lower = kw.lower()
            if (f" {kw_lower} " in t_pad or 
                t_pad.startswith(f"{kw_lower} ") or 
                t_pad.endswith(f" {kw_lower}")):
                
                score += weight
                if kw not in matched:
                    matched.append(kw)
                    
        return score, matched

    @classmethod
    def classify_text(cls, text: str) -> dict:
        tokens = cls.tokenize(text)
        scores = {}
        matches = {}
        total_raw = 0

        for key, cat in CATEGORIES.items():
            score, matched = cls.score_category(tokens, cat["keywords"])
            scores[key] = score
            matches[key] = matched
            total_raw += score

        # Normalization
        total = total_raw if total_raw > 0 else 1
        normalized = {key: round((val / total) * 100) for key, val in scores.items()}

        winner = "general"
        max_score = 0
        for key, s in scores.items():
            if s > max_score:
                max_score = s
                winner = key

        confidence = normalized.get(winner, 0)
        
        # Unknown fallback
        if max_score < 8:
            return {
                "winner": None,
                "scores": normalized,
                "matches": matches,
                "confidence": 0,
                "is_unknown": True
            }

        return {
            "winner": winner,
            "scores": normalized,
            "matches": matches,
            "confidence": confidence,
            "is_unknown": False
        }

    @staticmethod
    def get_priority(cat_key: str, sentiment: str, confidence: int) -> str:
        if sentiment == "urgent":
            return "high"
        if sentiment == "negative" and confidence > 75:
            return "high"
        if cat_key in ["auth", "it"] and confidence > 70:
            return "medium"
        if confidence < 50:
            return "low"
        return "medium"
