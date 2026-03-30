CATEGORIES = {
    "auth": {
        "label": "Account / Authentication",
        "team": "IT Helpdesk",
        "sla": "4 hours",
        "keywords": {
            "password": 10, "reset password": 15, "forgot password": 15, "reset": 8,
            "forgot": 8, "can't log in": 15, "cannot login": 15, "can't login": 15,
            "login": 10, "log in": 10, "sign in": 8, "locked out": 12, "account locked": 12,
            "incorrect password": 14, "wrong password": 14, "invalid credentials": 12,
            "credentials": 8, "authentication": 10, "otp": 8, "2fa": 8, "mfa": 8,
            "unauthorized": 8, "access denied": 10, "session expired": 8, "unlock account": 10,
            "username": 6, "email not working": 6, "verify": 5, "token expired": 8
        }
    },
    "hr": {
        "label": "HR / Self-Service",
        "team": "HR Portal",
        "sla": "24 hours",
        "keywords": {
            "leave": 12, "leave balance": 18, "annual leave": 15, "sick leave": 15,
            "vacation": 12, "time off": 12, "pto": 12, "days off": 10, "holiday": 10,
            "payslip": 12, "salary": 10, "payroll": 10, "pay slip": 12, "compensation": 8,
            "attendance": 8, "wfh": 8, "work from home": 10, "remote": 6, "onboarding": 8,
            "appraisal": 8, "performance review": 10, "training": 6, "benefits": 8,
            "medical": 6, "insurance": 8, "reimbursement": 10, "expense": 8, "remaining leaves": 15
        }
    },
    "it": {
        "label": "IT Support",
        "team": "IT Support",
        "sla": "8 hours",
        "keywords": {
            "laptop": 12, "computer": 12, "pc": 8, "slow": 8, "freezing": 10, "crash": 12,
            "not working": 10, "broken": 10, "blue screen": 15, "bsod": 15, "virus": 12,
            "malware": 12, "internet": 8, "wifi": 10, "network": 8, "vpn": 10, "printer": 10,
            "software": 8, "install": 8, "update": 6, "driver": 10, "hardware": 10,
            "keyboard": 8, "mouse": 8, "monitor": 8, "screen": 6, "headset": 8,
            "teams": 8, "zoom": 8, "outlook": 8, "excel": 6, "word": 6, "office": 8
        }
    },
    "billing": {
        "label": "Billing / Finance",
        "team": "Finance Desk",
        "sla": "48 hours",
        "keywords": {
            "charged": 12, "charge": 10, "billing": 12, "invoice": 12, "payment": 12,
            "refund": 15, "double charged": 18, "overcharged": 15, "subscription": 10,
            "cancel": 8, "renewal": 8, "receipt": 10, "transaction": 10, "credit": 8,
            "debit": 8, "bank": 6, "amount": 6, "fee": 8, "price": 6, "cost": 6,
            "discount": 8, "coupon": 8, "promo": 6, "trial": 6, "plan": 5, "upgrade": 6
        }
    },
    "general": {
        "label": "General Inquiry",
        "team": "General Support",
        "sla": "48 hours",
        "keywords": {
            "question": 5, "how to": 5, "where": 5, "when": 5, "help": 5, "info": 5,
            "information": 5, "guide": 5, "procedure": 6, "policy": 8, "form": 6,
            "cafeteria": 8, "parking": 8, "canteen": 8, "office": 5, "meeting room": 8,
            "badge": 8, "access card": 10, "visitor": 6, "address": 5, "location": 5
        }
    }
}

SENTIMENT_DICT = {
    "negative": ["angry", "frustrated", "terrible", "horrible", "unacceptable", "disgusting", "worst", "awful", "hate", "useless", "broken", "ridiculous", "stupid", "waste", "pathetic", "urgent", "immediately", "asap", "critical"],
    "positive": ["thank", "thanks", "appreciate", "great", "good", "happy", "pleased", "excellent", "love", "perfect", "wonderful"],
    "urgent": ["urgent", "asap", "immediately", "critical", "emergency", "right now", "hurry", "deadline", "escalate"]
}