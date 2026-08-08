from pydantic import BaseModel


class WeeklyProgress(BaseModel):
    day: str
    planned: int
    completed: int


class DashboardResponse(BaseModel):
    total: int
    pending: int
    completed: int
    completion_rate: float
    study_hours: int
    day_streak: int
    goal_completed: int
    weekly_progress: list[WeeklyProgress]