<div align="center">

# 🎟️ Triage AI – Ticket Classification System

[![Python Badge](https://img.shields.io/badge/Python-3.12-3776AB?style=for-the-badge&logo=python&logoColor=white)](#)
[![FastAPI Badge](https://img.shields.io/badge/FastAPI-0.103.1-009688?style=for-the-badge&logo=fastapi&logoColor=white)](#)
[![Vanilla JS Badge](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](#)
[![HTML/CSS Badge](https://img.shields.io/badge/HTML5_%2F_CSS3-E34F26?style=for-the-badge&logo=html5&logoColor=white)](#)

*An intelligent, full-stack IT service management (ITSM) tool that uses Natural Language Processing to instantly classify, score, and route support tickets.*

</div>

---

## 📖 Overview
Triage is an AI-powered workspace designed for support teams. It eliminates manual triage by analyzing incoming ticket text, detecting the underlying intent, and automatically assigning the proper routing queue, SLA targets, priority level, and sentiment score. 

The architecture features a blazing-fast **FastAPI (Python)** backend handling the core NLP algorithms and a modular, responsive **Vanilla Javascript/CSS** frontend decoupled into modern ES6 views and components.

## ✨ Features

- **🧠 Smart Intent Detection**: Analyzes text using TF-IDF and keyword matching to categorize tickets (Auth, IT, Billing, HR, etc.).
- **⚡ Auto-Routing & SLAs**: Instantly assigns target resolution SLAs and routing teams based on category confidence.
- **💬 Sentiment & Priority Analysis**: Detects underlying negative/urgent sentiment and auto-escalates ticket priority implicitly.
- **📊 Interactive Analytics**: Real-time KPI charts and session distribution tracked automatically in the workspace.
- **🛠️ Configurable Pipeline**: Toggle auto-replies, text sentiment scaling, and confidence thresholds on the fly.
- **📥 One-Click Export**: Download entire classification queues as CSV for your records.

---

## 🏗️ Architecture & Project Structure

The project has been refactored into a scalable, production-ready full-stack application:

```text
📦 triage-ai
 ┣ 📂 backend/              # Python FastAPI REST Server
 ┃ ┣ 📂 app/
 ┃ ┃ ┣ 📂 models/           # Data & Category definitions
 ┃ ┃ ┣ 📂 services/         # Core NLP processing & logic
 ┃ ┃ ┗ 📜 main.py           # API Endpoints (e.g., /api/classify)
 ┃ ┗ 📜 requirements.txt    # Python dependencies
 ┣ 📂 src/                  # Frontend ES6 Javascript
 ┃ ┣ 📂 components/         # Reusable UI elements
 ┃ ┣ 📂 core/               # State management & Routing
 ┃ ┣ 📂 utils/              # DOM helpers & Exporters
 ┃ ┗ 📂 views/              # View controllers (Classify, Analytics)
 ┣ 📂 styles/               # Modular CSS (Tokens, Base, Views, etc.)
 ┣ 📜 server.py             # Custom caching-disabled local web server 
 ┗ 📜 index.html            # Main UI Entrypoint
```

---

## 🚀 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/Aryan717317/Ticket-Classification-system.git
cd Ticket-Classification-system
```

### 2. Start the Backend API (FastAPI)
The backend requires Python 3.8+ (preferably 3.12).
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
*The API will be live at `http://localhost:8000/api/classify`*

### 3. Start the Frontend Application
Open a **new terminal** in the root of the project to serve the application using our custom configured Python server (which prevents Windows MIME-type and cache locking issues).
```bash
python server.py
```
*Your application is now live at `http://localhost:8080/`*

---

## 💻 Usage

1. **Load the app** at `http://localhost:8080/` (Perform a Hard Refresh `Ctrl + F5` on first load).
2. **Submit a ticket**: You can type your own text or click on the **Examples** chips located under the input box.
3. **Classify**: Click **Classify** to invoke the FastAPI logic.
4. **Queue & Analytics**: Navigate through the sidebar to view classified tickets in a detailed queue, or review your session metrics in the Analytics view.
5. **Settings**: Adjust categorization sensitivity thresholds and algorithms natively under Settings.

---

## 📞 Contact & Author

Created and maintained by **Aryan**  
- **GitHub**: [@Aryan717317](https://github.com/Aryan717317)
- **Email**: [22BAI71264@cuchd.in](mailto:22BAI71264@cuchd.in)

Contributions, issues, and feature requests are welcome! 
Feel free to check [issues page](https://github.com/Aryan717317/Ticket-Classification-system/issues) if you want to contribute.

<p align="center">
  <i>If you found this project helpful, please drop a ⭐ on the repository!</i>
</p>
