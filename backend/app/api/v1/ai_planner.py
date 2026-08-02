from fastapi import APIRouter
from pydantic import BaseModel
from groq import Groq
import os

router = APIRouter(
    prefix="/ai",
    tags=["AI Planner"]
)
from groq import Groq

groq_key = os.getenv("GROQ_API_KEY")
client = Groq(
    api_key=os.getenv("GROQ_API_KEY") if groq_key else None
)

class PlannerRequest(BaseModel):
    exam: str
    subjects: str
    daily_hours: int
    exam_date: str


@router.post("/generate")
def generate_plan(data: PlannerRequest):

    if client is None:
        return {
            "plan": "AI integration is disabled. Add GROQ_API_KEY to enable it."
        }

    prompt = f"""
    Create a detailed study plan.

    Exam:
    {data.exam}

    Subjects:
    {data.subjects}

    Daily Study Hours:
    {data.daily_hours}

    Exam Date:
    {data.exam_date}

    Return the plan in Markdown.
    """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return {
        "plan":
        response.choices[0].message.content
    }