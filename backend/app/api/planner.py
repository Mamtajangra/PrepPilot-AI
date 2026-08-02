from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session


from app.database import get_db
from app.models.planner import Planner
from app.models.user import User
from app.schemas.planner import (
    PlannerCreate,
    PlannerResponse,
    PlannerUpdate,
    DashboardResponse,
)
from app.api.v1.auth import get_current_user

router = APIRouter(
    prefix="/planner",
    tags=["Planner"]
)

@router.post("/", response_model=PlannerResponse)
def create_planner(
    planner: PlannerCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    new_plan = Planner(
        subject=planner.subject,
        topic=planner.topic,
        study_date=planner.study_date,
        status="Pending",
        user_id=current_user.id
    )

    db.add(new_plan)
    db.commit()
    db.refresh(new_plan)

    return new_plan
