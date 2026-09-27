import requests

GOOGLE_SHEETS_URL = (
    "https://script.google.com/macros/s/"
    "AKfycbwq52M6TQzq-WG9ekp5_LzGFtpuhexISVoSZ7pLQlZpRElM97K-1VcmsAS-lfnAJb3jzg"
    "/exec"
)


def save_loan_application(data):
    response = requests.post(
        GOOGLE_SHEETS_URL,
        json=data,
        timeout=15
    )

    print("Google Sheets status:", response.status_code)
    print("Google Sheets response:", response.text)

    try:
        return response.json()
    except ValueError:
        return {
            "success": False,
            "status_code": response.status_code,
            "raw_response": response.text
        }