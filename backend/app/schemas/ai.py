from pydantic import BaseModel


class StudyPlanRequest(BaseModel):
    subject: str
    topic: str
    exam: str
    study_hours: int
    days: int

    difficulty: str
    language: str
    learning_style: str