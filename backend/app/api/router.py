from fastapi import APIRouter

from app.api.v1.auth import router as auth_router
from app.api.v1.planner import router as planner_router
from app.api.v1.ai import router as ai_router
from app.api.v1.ai_quiz import router as ai_quiz_router
from app.api.v1.ai_notes import router as ai_notes_router

api_router = APIRouter()

api_router.include_router(auth_router)
api_router.include_router(planner_router)
api_router.include_router(ai_router)
api_router.include_router(ai_quiz_router)
api_router.include_router(ai_notes_router)