from datetime import date
from pydantic import BaseModel



class PlannerCreate(BaseModel):
    subject: str
    topic: str
    study_date: date


class PlannerResponse(BaseModel):
    id: int
    subject: str
    topic: str
    study_date: date
    status: str
    user_id: int

    model_config = {
        "from_attributes": True
    }

class PlannerUpdate(BaseModel):
    subject: str
    topic: str
    study_date: date
    status: str