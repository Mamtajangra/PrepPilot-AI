from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.sql import func

from app.database import Base


class AIQuiz(Base):
    __tablename__ = "ai_quizzes"

    id = Column(Integer, primary_key=True, index=True)

    exam = Column(String, nullable=False)

    subject = Column(String, nullable=False)

    topic = Column(String, nullable=False)

    difficulty = Column(String, nullable=False)

    question_type = Column(String, nullable=False)

    number_of_questions = Column(Integer, nullable=False)

    quiz = Column(Text, nullable=False)

    user_id = Column(Integer, ForeignKey("users.id"))

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )