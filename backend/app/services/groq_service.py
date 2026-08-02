import os

from dotenv import load_dotenv
from groq import Groq

load_dotenv()

API_KEY = os.getenv("GROQ_API_KEY")

if not API_KEY:
    raise ValueError("GROQ_API_KEY not found in .env")

client = Groq(api_key=API_KEY)


def generate_from_groq(prompt: str):

    try:

        chat = client.chat.completions.create(

            model="llama-3.3-70b-versatile",

            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],

            temperature=0.7,

            max_tokens=4096,
        )

        return chat.choices[0].message.content

    except Exception as e:

        return f"""
# AI Generation Failed

Reason:

{str(e)}
"""