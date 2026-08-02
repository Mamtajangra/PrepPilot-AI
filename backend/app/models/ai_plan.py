from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base


class AIStudyPlan(Base):
    __tablename__ = "ai_study_plans"

    id = Column(Integer, primary_key=True, index=True)

    subject = Column(String, nullable=False)
    topic = Column(String, nullable=False)
    exam = Column(String, nullable=False)

    study_plan = Column(Text, nullable=False)

    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship(
    "User",
    back_populates="ai_study_plans"
)