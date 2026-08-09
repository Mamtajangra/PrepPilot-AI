from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import api_router
from app.database import create_tables


app = FastAPI(
    title="PrepPilot AI API",
    description="Backend API for PrepPilot AI",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://prep-pilot-ai-m2ec.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup():
    create_tables()


@app.get("/")
def root():
    return {
        "message": "Welcome to PrepPilot AI Backend "
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


app.include_router(
    api_router,
    prefix="/api/v1",
)