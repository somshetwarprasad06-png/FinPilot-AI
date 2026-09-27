# FinPilot AI — AI Loan Eligibility Checker

A student BFSI web project combining four modules:
- Loan Eligibility Checker
- Credit Score Analyzer
- EMI Calculator
- AI Financial Tips

## Step 1 — Frontend MVP

This version is intentionally API-free. It runs by opening `index.html` in a browser or using a simple local server.

### Run locally

Option A: open `index.html`.

Option B (recommended):
```bash
python -m http.server 5500
```
Then open:
`http://localhost:5500`

## Current implementation

- Responsive dark glassmorphism UI
- Loan eligibility rule-based estimate
- Credit score interpretation
- EMI calculation using the standard reducing-balance formula
- JavaScript input validation
- AI Tips demo/fallback interface
- Mobile-friendly layout
- No secret/API key in frontend

## Important project note

The eligibility output is an educational estimate, not a real lender decision. The credit analyzer is also an educational interpretation, not a credit-bureau report.

## Next stages

1. Secure Claude API integration through a server-side endpoint.
2. Google Sheets persistence through a protected backend/service account or approved integration.
3. Deployment on Vercel/Netlify.
4. Testing and screenshots.
5. Workflow diagram, documentation and NASSCOM submission report.
6. Optional future ML prediction model, authentication and PDF report generation.
