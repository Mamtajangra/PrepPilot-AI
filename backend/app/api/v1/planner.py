from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.dashboard import DashboardResponse

from app.database import get_db
from app.models.planner import Planner
from app.models.user import User
from app.schemas.planner import (
    PlannerCreate,
    PlannerResponse,
    PlannerUpdate,
)
from app.api.v1.auth import get_current_user

router = APIRouter(
    prefix="/planner",
    tags=["Planner"]
)


# ==========================
# Create Planner
# ==========================
@router.post("/", response_model=PlannerResponse)
def create_planner(
    planner: PlannerCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    new_plan = Planner(
        subject=planner.subject,
        topic=planner.topic,
        study_date=planner.study_date,
        status="Pending",
        user_id=current_user.id,
    )

    db.add(new_plan)
    db.commit()
    db.refresh(new_plan)

    return new_plan


# ==========================
# Get All Planners
# ==========================
@router.get("/", response_model=list[PlannerResponse])
def get_all_planners(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    planners = db.query(Planner).filter(
        Planner.user_id == current_user.id
    ).all()

    return planners

# ==========================
# Dashboard Statistics
# ==========================
@router.get("/dashboard", response_model=DashboardResponse)
def dashboard_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    total = db.query(Planner).filter(
        Planner.user_id == current_user.id
    ).count()

    pending = db.query(Planner).filter(
        Planner.user_id == current_user.id,
        Planner.status == "Pending"
    ).count()

    completed = db.query(Planner).filter(
        Planner.user_id == current_user.id,
        Planner.status == "Completed"
    ).count()

    completion_rate = (
        round((completed / total) * 100, 2)
        if total > 0 else 0
    )

    return DashboardResponse(
        total=total,
        pending=pending,
        completed=completed,
        completion_rate=completion_rate,
    )

# ==========================
# Get Planner By ID
# ==========================
@router.get("/{planner_id}", response_model=PlannerResponse)
def get_planner(
    planner_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    planner = db.query(Planner).filter(
        Planner.id == planner_id,
        Planner.user_id == current_user.id,
    ).first()

    if planner is None:
        raise HTTPException(
            status_code=404,
            detail="Planner not found"
        )

    return planner


# ==========================
# Update Planner
# ==========================
@router.put("/{planner_id}", response_model=PlannerResponse)
def update_planner(
    planner_id: int,
    planner: PlannerUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    db_planner = db.query(Planner).filter(
        Planner.id == planner_id,
        Planner.user_id == current_user.id,
    ).first()

    if db_planner is None:
        raise HTTPException(
            status_code=404,
            detail="Planner not found"
        )

    db_planner.subject = planner.subject
    db_planner.topic = planner.topic
    db_planner.study_date = planner.study_date
    db_planner.status = planner.status

    db.commit()
    db.refresh(db_planner)

    return db_planner


# ==========================
# Delete Planner
# ==========================
@router.delete("/{planner_id}")
def delete_planner(
    planner_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    planner = db.query(Planner).filter(
        Planner.id == planner_id,
        Planner.user_id == current_user.id,
    ).first()

    if planner is None:
        raise HTTPException(
            status_code=404,
            detail="Planner not found"
        )

    db.delete(planner)
    db.commit()

    return {
        "message": "Planner deleted successfully"
    }

# ==========================
# Dashboard Statistics
# ==========================
@router.get("/dashboard", response_model=DashboardResponse)
def dashboard_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    total = db.query(Planner).filter(
        Planner.user_id == current_user.id
    ).count()

    pending = db.query(Planner).filter(
        Planner.user_id == current_user.id,
        Planner.status == "Pending"
    ).count()

    completed = db.query(Planner).filter(
        Planner.user_id == current_user.id,
        Planner.status == "Completed"
    ).count()

    completion_rate = (
        round((completed / total) * 100, 2)
        if total > 0 else 0
    )

    return DashboardResponse(
        total=total,
        pending=pending,
        completed=completed,
        completion_rate=completion_rate,
    )
@router.post("/save-ai", response_model=PlannerResponse)
def save_ai_plan(
    data: PlannerCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    planner = Planner(
        subject=data.subject,
        topic=data.topic,
        study_date=data.study_date,
        status="Pending",
        user_id=current_user.id,
    )

    db.add(planner)
    db.commit()
    db.refresh(planner)

    return planner