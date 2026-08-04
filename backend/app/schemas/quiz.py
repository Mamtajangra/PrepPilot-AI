from pydantic import BaseModel


class QuizRequest(BaseModel):

    exam: str

    subject: str

    topic: str

    difficulty: str

    question_type: str

    number_of_questions: int

    language: str = "English"