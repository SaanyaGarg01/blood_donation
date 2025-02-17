from flask import Flask, request, jsonify
from send_sms import send_sms

app = Flask(__name__)

@app.route("/send_sms", methods=["POST"])
def sms_alert():
    data = request.get_json()
    phone_number = data.get("phone")

    if phone_number:
        send_sms(phone_number, "Urgent: A patient needs blood. Please donate if you can!")
        return jsonify({"message": "SMS sent!"}), 200
    else:
        return jsonify({"error": "Invalid phone number"}), 400

if __name__ == "__main__":
    app.run(debug=True)
