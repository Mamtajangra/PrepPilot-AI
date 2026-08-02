from datetime import date

from sqlalchemy import String, Date, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Planner(Base):
    __tablename__ = "planners"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)

    subject: Mapped[str] = mapped_column(String(100))

    topic: Mapped[str] = mapped_column(String(255))

    study_date: Mapped[date] = mapped_column(Date)

    status: Mapped[str] = mapped_column(
        String(20),
        default="Pending"
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id")
    )