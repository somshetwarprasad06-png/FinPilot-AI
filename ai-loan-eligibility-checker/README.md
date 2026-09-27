# FinPilot AI — AI Loan Eligibility Checker

## 📌 Project Overview

**FinPilot AI** is a web-based BFSI (Banking, Financial Services and Insurance) project designed to provide users with simple financial analysis tools.

The platform helps users explore estimated loan eligibility, analyze credit scores, calculate EMIs, and receive general financial education tips through a user-friendly interface.

> **Note:** FinPilot AI provides educational estimates and is not a substitute for an actual bank or financial institution's loan approval process.

---

## ✨ Key Features

### 🏦 Loan Eligibility Checker

* Takes age, monthly income, credit score, existing EMI, loan amount, and employment type as inputs.
* Calculates an estimated Debt-to-Income (DTI) ratio.
* Provides an estimated eligibility result.
* Saves submitted loan application data to Google Sheets through the Flask backend.

### 📊 Credit Score Analyzer

* Accepts a credit score.
* Provides an easy-to-understand assessment.
* Displays general financial risk insights and improvement suggestions.

### 🧮 EMI Calculator

* Calculates monthly EMI using loan amount, interest rate, and tenure.
* Provides quick real-time financial calculations.

### 🤖 AI Financial Tips

* Provides general financial education and tips.
* Uses a local/demo response system for the current frontend implementation.
* The project backend also contains server-side Claude API integration for future/optional AI usage.

### 📋 Google Sheets Integration

* Loan application data is sent securely from the frontend to the Flask backend.
* The backend forwards validated data to a Google Apps Script Web App.
* The data is automatically stored in Google Sheets.

### 📱 Responsive UI

* Designed for desktop and mobile screens.
* Uses a modern dark fintech/glassmorphism interface.

---

## 🛠️ Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Python
* Flask
* Flask-CORS

### APIs & Integration

* Google Apps Script
* Google Sheets
* Anthropic Claude API integration

### Development Tools

* Git
* GitHub
* Vercel

---

## 🔄 Project Workflow

```text
User
  ↓
FinPilot AI Web Interface
  ↓
Loan / Credit / EMI Analysis
  ↓
JavaScript Validation & Calculation
  ↓
Flask Backend
  ↓
Google Apps Script
  ↓
Google Sheets
```

For AI financial education:

```text
User Question
     ↓
AI Financial Tips Interface
     ↓
Financial Education Response
```

---

## 📁 Project Structure

```text
FinPilot-AI-Step1/
│
└── ai-loan-eligibility-checker/
    │
    ├── index.html
    ├── README.md
    ├── .gitignore
    ├── .env.example
    │
    ├── css/
    │   ├── style.css
    │   │
    │   └── backend/
    │       ├── server.py
    │       ├── google_sheets.py
    │       └── .env
    │
    └── js/
        └── app.js
```

---

## ⚙️ How to Run the Project Locally

### 1. Clone the Repository

```bash
git clone https://github.com/somshetwarprasad06-png/FinPilot-AI.git
```

### 2. Open the Project

```bash
cd FinPilot-AI/ai-loan-eligibility-checker
```

### 3. Start the Flask Backend

Open a terminal in:

```text
ai-loan-eligibility-checker/css/backend
```

Then run:

```bash
python server.py
```

The backend runs on:

```text
http://127.0.0.1:5000
```

### 4. Open the Frontend

Open:

```text
index.html
```

in a browser.

---

## 🔐 Security & Privacy

* API credentials are stored in environment variables instead of source code.
* `.env` files are excluded from Git tracking.
* User input is validated on the backend before Google Sheets submission.
* Sensitive credentials such as passwords, OTPs, PINs, and CVVs are not requested.
* The application provides estimates and educational information rather than guaranteed financial decisions.

---

## 📈 Future Enhancements

Possible future improvements include:

* User authentication
* Machine-learning-based loan prediction
* PDF financial reports
* Advanced credit-risk analysis
* Personalized financial dashboards
* Production cloud backend deployment
* Improved AI financial assistant
* Database integration
* Admin dashboard for application analytics

---

## 🎯 Project Objective

The objective of FinPilot AI is to demonstrate how web technologies, Python backend services, financial calculations, AI concepts, and cloud-based data integration can be combined to create a practical BFSI application.

---

## 👨‍💻 Project Status

**Core development:** Complete ✅

**Frontend testing:** Complete ✅

**Backend testing:** Complete ✅

**Google Sheets integration:** Tested ✅

**GitHub repository:** Available ✅

**Deployment:** In progress / optional final deployment configuration

---

## ⚠️ Disclaimer

FinPilot AI is an educational student project. Its eligibility calculations and financial suggestions are illustrative only and should not be treated as an actual loan approval, credit decision, or professional financial advice.
