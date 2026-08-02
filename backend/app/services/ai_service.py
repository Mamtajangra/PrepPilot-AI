import os

from dotenv import load_dotenv

load_dotenv()

USE_AI = (
    os.getenv("USE_AI", "False")
    .lower()
    == "true"
)

MODEL_PROVIDER = (
    os.getenv("MODEL_PROVIDER", "groq")
    .lower()
)


def generate_study_plan(prompt: str):

    if not USE_AI:

        return """
# Demo Study Plan

AI is currently disabled.

Enable AI by setting:

USE_AI=True

inside your .env file.
"""

    try:

        if MODEL_PROVIDER == "groq":

            from app.services.groq_service import (
                generate_from_groq,
            )

            return generate_from_groq(prompt)

        elif MODEL_PROVIDER == "gemini":

            from app.services.gemini_service import (
                generate_from_gemini,
            )

            return generate_from_gemini(prompt)

        else:

            return f"""
# Configuration Error

Unknown MODEL_PROVIDER:

{MODEL_PROVIDER}

Supported providers:

- groq
- gemini
"""

    except Exception as e:

        return f"""
# AI Generation Failed

Reason:

{str(e)}
"""