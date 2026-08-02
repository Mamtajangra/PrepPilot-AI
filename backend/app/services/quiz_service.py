import os

from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def generate_quiz(prompt: str):

    try:

        chat = client.chat.completions.create(

            model="llama-3.3-70b-versatile",

            messages=[

                {
                    "role": "system",
                    "content": """
You are a professional exam paper setter.

Your responsibilities:

- Generate accurate and verified questions.
- Verify every answer before writing it.
- Never produce incorrect mathematical calculations.
- Never contradict the explanation.
- Avoid duplicate questions.
- Questions must strictly follow the requested exam, subject and topic.
- Follow the formatting exactly as requested.
- Return Markdown only.
You are an expert Mathematics professor.

For every mathematical question:

- Solve it step-by-step internally.
- Verify calculations twice.
- Return only the final verified answer.
- Never contradict the explanation.
- Never invent formulas.

"""
                },

                {
                    "role": "user",
                    "content": prompt,
                }

            ],

            temperature=0.3,

            top_p=0.9,

            max_tokens=4000,

        )

        return chat.choices[0].message.content

    except Exception as e:

        return f"""
# AI Quiz Generation Failed

Reason

{str(e)}
"""