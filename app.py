from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)

# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json["message"]

    model = genai.GenerativeModel("gemini-1.5-flash")

    response = model.generate_content(
        f"நீங்கள் ஒரு தமிழ் உதவியாளர். எப்போதும் தமிழில் மட்டும் பதில் அளிக்கவும். கேள்வி: {user_input}"
    )

    return jsonify({"reply": response.text})

if __name__ == "__main__":
    app.run(debug=True)
