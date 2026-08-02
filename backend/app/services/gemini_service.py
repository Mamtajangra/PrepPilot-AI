import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()


def generate_from_gemini(prompt: str):

    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key:
        return """
# Gemini Error

GEMINI_API_KEY not found in .env
"""

    genai.configure(api_key=api_key)

    model = genai.GenerativeModel("gemini-2.0-flash")

    try:

        response = model.generate_content(prompt)

        return response.text

    except Exception as e:

        return f"""
# AI Generation Failed

Reason:

{str(e)}
"""