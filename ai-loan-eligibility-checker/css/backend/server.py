import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from anthropic import Anthropic
from google_sheets import save_loan_application

load_dotenv()

app = Flask(__name__)
CORS(app)

api_key = os.getenv("ANTHROPIC_API_KEY")

if not api_key:
    raise RuntimeError("ANTHROPIC_API_KEY is missing in .env")

client = Anthropic(api_key=api_key)


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({
        "status": "ok",
        "message": "FinPilot AI backend is running"
    })


@app.route("/api/financial-tips", methods=["POST"])
def financial_tips():
    data = request.get_json(silent=True) or {}
    question = str(data.get("question", "")).strip()

    if not question:
        return jsonify({"error": "Question is required"}), 400

    try:
        response = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=500,
            system=(
                "You are a financial education assistant for a student BFSI project. "
                "Give clear, general educational information. "
                "Do not claim to approve loans or make guaranteed financial predictions. "
                "Do not ask for passwords, OTPs, bank PINs, card CVVs, or other sensitive credentials."
            ),
            messages=[
                {
                    "role": "user",
                    "content": question
                }
            ]
        )

        answer = "".join(
            block.text for block in response.content
            if getattr(block, "type", None) == "text"
        )

        return jsonify({"answer": answer})

    except Exception as error:
        print("Claude API error:", error)
        return jsonify({
            "error": "Unable to get an AI response right now."
        }), 500
@app.route("/api/save-loan", methods=["POST"])
def save_loan():
    data = request.get_json(silent=True) or {}

    required_fields = [
        "age",
        "income",
        "credit",
        "existingEmi",
        "loanAmount",
        "employment",
        "dti",
        "result"
    ]

    # Check required fields
    for field in required_fields:
        if field not in data:
            return jsonify({
                "success": False,
                "error": f"Missing field: {field}"
            }), 400

    try:
        # Convert numeric values
        age = float(data["age"])
        income = float(data["income"])
        credit = float(data["credit"])
        existing_emi = float(data["existingEmi"])
        loan_amount = float(data["loanAmount"])
        dti = float(data["dti"])

        # Basic range validation
        if not 18 <= age <= 70:
            return jsonify({
                "success": False,
                "error": "Invalid age."
            }), 400

        if income <= 0:
            return jsonify({
                "success": False,
                "error": "Income must be greater than 0."
            }), 400

        if not 300 <= credit <= 900:
            return jsonify({
                "success": False,
                "error": "Credit score must be between 300 and 900."
            }), 400

        if existing_emi < 0:
            return jsonify({
                "success": False,
                "error": "Existing EMI cannot be negative."
            }), 400

        if loan_amount <= 0:
            return jsonify({
                "success": False,
                "error": "Loan amount must be greater than 0."
            }), 400

        if dti < 0:
            return jsonify({
                "success": False,
                "error": "DTI cannot be negative."
            }), 400

        # Validate employment
        allowed_employment = [
            "Salaried",
            "Self-employed",
            "Student",
            "Other"
        ]

        if data["employment"] not in allowed_employment:
            return jsonify({
                "success": False,
                "error": "Invalid employment type."
            }), 400

        # Validate result
        allowed_results = [
            "Estimated Eligible",
            "Needs Improvement"
        ]

        if data["result"] not in allowed_results:
            return jsonify({
                "success": False,
                "error": "Invalid result value."
            }), 400

        # Clean data before sending to Google Sheets
        clean_data = {
            "age": age,
            "income": income,
            "credit": credit,
            "existingEmi": existing_emi,
            "loanAmount": loan_amount,
            "employment": data["employment"],
            "dti": dti,
            "result": data["result"]
        }

        result = save_loan_application(clean_data)

        return jsonify({
            "success": True,
            "google_sheets": result
        })

    except (ValueError, TypeError):
        return jsonify({
            "success": False,
            "error": "Invalid numeric input."
        }), 400

    except Exception as error:
        print("Google Sheets error:", error)

        return jsonify({
            "success": False,
            "error": "Unable to save loan application."
        }), 500

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)