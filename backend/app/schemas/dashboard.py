from pydantic import BaseModel

class DashboardResponse(BaseModel):
    total: int
    pending: int
    completed: int
    completion_rate: float