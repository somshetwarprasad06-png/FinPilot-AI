# 🚀 FinPilot AI — AI Loan Eligibility Checker

## 📌 Project Overview

**FinPilot AI** is a web-based BFSI (Banking, Financial Services and Insurance) project designed to provide users with simple and interactive financial analysis tools.

The platform allows users to check estimated loan eligibility, analyze credit scores, calculate EMIs, and receive general financial education tips through a modern and responsive interface.

> **Disclaimer:** FinPilot AI provides educational estimates only. It does not represent an actual bank loan approval or financial decision.

---

## ✨ Key Features

### 🏦 1. Loan Eligibility Checker

* Accepts age, monthly income, credit score, existing EMI, loan amount, and employment type.
* Calculates an estimated Debt-to-Income (DTI) ratio.
* Provides an estimated loan eligibility result.
* Sends validated loan application data to the Flask backend.
* Stores application data in Google Sheets.

### 📊 2. Credit Score Analyzer

* Allows users to enter their credit score.
* Provides an easy-to-understand credit assessment.
* Displays general financial risk insights.
* Provides suggestions for improving financial health.

### 🧮 3. EMI Calculator

* Calculates monthly EMI.
* Uses loan amount, interest rate, and loan tenure.
* Provides quick financial calculations for users.

### 🤖 4. AI Financial Tips

* Provides general financial education.
* Answers common financial questions.
* Uses a local/demo response system in the current frontend implementation.
* Includes optional server-side Claude API integration in the backend.

### 📋 5. Google Sheets Integration

* Loan application data is sent from the frontend to the Flask backend.
* Backend validates the submitted information.
* Google Apps Script receives the data.
* Data is automatically stored in Google Sheets.

### 📱 6. Responsive Design

* Mobile-friendly interface.
* Desktop-friendly interface.
* Modern dark fintech design.
* Glassmorphism-inspired UI.
* JavaScript-based form validation.

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

### Development & Deployment

* Git
* GitHub
* Vercel

---

## 🔄 Project Workflow

```text
                    ┌─────────────────┐
                    │      USER       │
                    └────────┬────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │   FinPilot AI Web   │
                  │    HTML/CSS/JS      │
                  └──────────┬──────────┘
                             │
                             ▼
              ┌─────────────────────────────┐
              │     Financial Modules       │
              │                             │
              │ • Loan Eligibility          │
              │ • Credit Score Analyzer     │
              │ • EMI Calculator            │
              │ • AI Financial Tips         │
              └──────────────┬──────────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │    Flask Backend    │
                  │       Python        │
                  └──────────┬──────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │   Google Apps       │
                  │      Script         │
                  └──────────┬──────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │    Google Sheets    │
                  │   Data Storage      │
                  └─────────────────────┘
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

## ⚙️ How to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/somshetwarprasad06-png/FinPilot-AI.git
```

### 2. Open the Project

```bash
cd FinPilot-AI/ai-loan-eligibility-checker
```

### 3. Start the Flask Backend

Open a terminal inside:

```text
ai-loan-eligibility-checker/css/backend
```

Run:

```bash
python server.py
```

The Flask backend will run at:

```text
http://127.0.0.1:5000
```

### 4. Open the Frontend

Open:

```text
index.html
```

in a web browser.

---

## 🔐 Security & Privacy

* API credentials are stored using environment variables.
* `.env` files are excluded from Git tracking.
* User input is validated before being sent to Google Sheets.
* The application does not request passwords, OTPs, bank PINs, or CVVs.
* Financial calculations are provided for educational purposes.
* The application does not guarantee loan approval.

---

## 📊 Google Sheets Data Flow

The Loan Eligibility module sends the following information to Google Sheets:

| Field          | Description                     |
| -------------- | ------------------------------- |
| Timestamp      | Application submission time     |
| Age            | User's entered age              |
| Monthly Income | Monthly income                  |
| Credit Score   | Entered credit score            |
| Existing EMI   | Existing monthly EMI            |
| Loan Amount    | Requested loan amount           |
| Employment     | Employment category             |
| DTI            | Calculated Debt-to-Income ratio |
| Result         | Estimated eligibility result    |

---

## 🧪 Testing

The following core features have been tested:

* ✅ Loan Eligibility Checker
* ✅ Credit Score Analyzer
* ✅ EMI Calculator
* ✅ AI Financial Tips
* ✅ Flask Backend
* ✅ Google Sheets Integration
* ✅ Responsive User Interface

---

## 🎯 Project Objective

The objective of **FinPilot AI** is to demonstrate how modern web technologies, Python backend services, financial calculations, AI concepts, and cloud-based data integration can be combined to create a practical BFSI application.

The project is designed as a student project for learning and demonstrating concepts related to financial technology and web application development.

---

## 🔮 Future Enhancements

Future versions of FinPilot AI may include:

* User authentication
* Machine-learning-based loan prediction
* PDF financial reports
* Advanced credit-risk analysis
* Personalized financial dashboards
* Production cloud backend deployment
* Improved AI financial assistant
* Database integration
* Admin dashboard
* Application analytics

---

## 👨‍💻 Project Status

**Project:** FinPilot AI — AI Loan Eligibility Checker

**Development Status:** Core features completed ✅

**Frontend:** Completed ✅

**Backend:** Completed and tested ✅

**Google Sheets Integration:** Tested ✅

**GitHub Repository:** Available ✅

**Documentation:** Completed ✅

---

## ⚠️ Disclaimer

FinPilot AI is an educational student project.

The loan eligibility results, credit analysis, EMI calculations, and financial tips provided by the application are intended for demonstration and educational purposes only.

They should not be considered actual loan approval, professional financial advice, or a substitute for decisions made by banks or financial institutions.
