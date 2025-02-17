from twilio.rest import Client

# Twilio Credentials (Get these from your Twilio dashboard)
TWILIO_SID = "your_twilio_account_sid"
TWILIO_AUTH_TOKEN = "your_twilio_auth_token"
TWILIO_PHONE_NUMBER = "your_twilio_phone_number"

def send_sms(to_number, message):
    client = Client(TWILIO_SID, TWILIO_AUTH_TOKEN)
    sms = client.messages.create(
        body=message,
        from_=TWILIO_PHONE_NUMBER,
        to=to_number
    )
    print(f"✅ SMS sent to {to_number}: {sms.sid}")

# Example Usage
if __name__ == "__main__":
    send_sms("+911234567890", "Urgent: A patient needs blood. Please donate if you can!")
