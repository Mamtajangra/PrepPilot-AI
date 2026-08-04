from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base


class AINotes(Base):

    __tablename__ = "ai_notes"

    id = Column(Integer, primary_key=True, index=True)

    exam = Column(String, nullable=False)

    subject = Column(String, nullable=False)

    topic = Column(String, nullable=False)

    difficulty = Column(String, nullable=False)

    length = Column(String, nullable=False)

    notes = Column(Text, nullable=False)

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    user = relationship("User")