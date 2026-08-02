from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.api.v1.auth import get_current_user
from app.models.user import User
from app.models.ai_plan import AIStudyPlan
from app.schemas.ai import StudyPlanRequest
from app.services.ai_service import generate_study_plan

router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)


# =====================================
# Prompt Builder
# =====================================

def build_prompt(request: StudyPlanRequest) -> str:

    return f"""
You are an expert educational mentor, exam strategist and AI study planner.

Generate a highly personalized study plan based on the student's requirements.

====================================
STUDENT DETAILS
====================================

Exam:
{request.exam}

Subject:
{request.subject}

Topic:
{request.topic}

Study Hours Per Day:
{request.study_hours} hours

Duration:
{request.days} days

Difficulty:
{request.difficulty}

Language:
{request.language}

Learning Style:
{request.learning_style}

====================================
TASK
====================================

Generate a professional, detailed and exam-oriented study plan.

The study plan MUST remain strictly limited to the selected topic.

Do NOT introduce concepts from unrelated chapters.

If the selected topic is small, increase:

- Practice
- Revision
- PYQs
- Mock Practice
- Advanced Questions

instead of adding unrelated topics.

Follow the official syllabus of the selected exam whenever applicable.

====================================
OUTPUT FORMAT
====================================

Do NOT generate:

- Introduction
- Student Details
- AI explanations
- Notes about yourself

Start directly with:

# {request.days}-Day Study Plan for {request.exam}

## Subject
{request.subject}

## Topic
{request.topic}

## Duration
{request.days} Days

## Daily Study Time
{request.study_hours} Hours

## Difficulty
{request.difficulty}

====================================
FOR EVERY DAY INCLUDE
====================================

# Day X

## Daily Goal

## Topics to Study

## Important Concepts

## Estimated Study Time

## Study Schedule

Create a timetable according to the available study hours.

Use relative time blocks.

Example

| Study Block | Activity |
|-------------|----------|
| Hour 1 | Theory |
| Hour 2 | Examples |
| Break | 15 Minutes |
| Hour 3 | Practice |
| Hour 4 | PYQs |
| Hour 5 | Revision |

Do NOT repeat the same timetable every day.

====================================
PRACTICE
====================================

Create separate sections.

Conceptual Questions

Numerical Questions

Practice Exercises

Mention expected difficulty.

====================================
PYQs
====================================

Never invent previous year questions.

Instead write:

Practice Previous Year Questions related to this topic from the last 5–10 years.

====================================
REVISION
====================================

Mention exactly what should be revised.

Do not repeat identical revision tasks.

====================================
DAILY TIP
====================================

Give one practical study tip related to that day's topic.

====================================
EXPECTED OUTCOME
====================================

Mention what the learner should be able to do after completing that day.

====================================
REVISION DAY
====================================

Every 5th day create:

# Revision Session

Include

- Revision Checklist
- Formula Revision
- Weak Topic Analysis
- Error Analysis
- Short Self Test

====================================
MOCK TEST
====================================

Every 7th day create

# Mock Test

Include

- Mock Test
- Score Analysis
- Mistake Analysis
- Improvement Plan

====================================
AFTER THE STUDY PLAN
====================================

Generate the following sections.

# Weekly Milestones

Mention measurable learning outcomes.

# Recommended Resources

Create separate sections.

Books

Video Resources

Practice Websites

Mock Test Platforms

Recommend only resources relevant to the selected exam.

Do NOT recommend unrelated websites.

# Common Mistakes

# Productivity Tips

# Time Management Tips

# Best Learning Strategy

Personalize it according to the selected learning style.

# Progress Tracker

Generate a proper Markdown table.

Example

| Day | Status |
|-----|--------|
| 1 | ☐ |
| 2 | ☐ |
| 3 | ☐ |

Continue until Day {request.days}.

Never generate Markdown tables in a single line.

# Completion Summary

Create a table.

| Activity | Percentage |
|----------|------------|
| Theory | xx% |
| Practice | xx% |
| Revision | xx% |
| Mock Tests | xx% |

Total must equal 100%.

# Final Revision Plan

Provide a complete revision strategy before the exam.

# Exam Readiness

Estimate:

- Expected Readiness Level
- Confidence Level
- High Priority Topics
- Weak Areas
- Final Suggestions

# Motivation

Generate one short unique motivational quote.

Do not repeat common quotes.

====================================
FORMATTING RULES
====================================

Return Markdown only.

Use proper Markdown headings.

Use bullet points.

Use numbered lists where appropriate.

Use Markdown tables correctly.

Highlight important concepts using bold text.

Do NOT use emojis.

Do NOT return JSON.

Do NOT explain yourself.

Do NOT repeat similar sentences.

Do NOT generate generic educational advice.

Keep every study day unique.

Use professional educational language.

Generate exam-specific recommendations.

Return ONLY the final study plan.
"""


# =====================================
# AI Generator Helper
# =====================================

def generate_ai_plan(request: StudyPlanRequest):

    prompt = build_prompt(request)

    try:

        study_plan = generate_study_plan(prompt)

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"AI Generation Failed: {str(e)}"
        )

    if not study_plan:

        raise HTTPException(
            status_code=500,
            detail="AI returned an empty response."
        )

    return study_plan


# =====================================
# Generate Plan
# =====================================

@router.post("/generate-plan")
def generate_plan(
    request: StudyPlanRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    study_plan = generate_ai_plan(request)

    new_plan = AIStudyPlan(
        subject=request.subject,
        topic=request.topic,
        exam=request.exam,
        study_plan=study_plan,
        user_id=current_user.id,
    )

    db.add(new_plan)
    db.commit()
    db.refresh(new_plan)

    return {
        "message": "Study Plan Generated Successfully",
        "plan_id": new_plan.id,
        "study_plan": new_plan.study_plan,
    }


# =====================================
# Get All Plans
# =====================================

@router.get("/my-plans")
def get_my_plans(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return (
        db.query(AIStudyPlan)
        .filter(AIStudyPlan.user_id == current_user.id)
        .all()
    )


# =====================================
# Get Single Plan
# =====================================

@router.get("/plan/{plan_id}")
def get_plan(
    plan_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    plan = (
        db.query(AIStudyPlan)
        .filter(
            AIStudyPlan.id == plan_id,
            AIStudyPlan.user_id == current_user.id,
        )
        .first()
    )

    if not plan:

        raise HTTPException(
            status_code=404,
            detail="Study plan not found",
        )

    return plan


# =====================================
# Update Plan
# =====================================

@router.put("/plan/{plan_id}")
def update_plan(
    plan_id: int,
    request: StudyPlanRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    plan = (
        db.query(AIStudyPlan)
        .filter(
            AIStudyPlan.id == plan_id,
            AIStudyPlan.user_id == current_user.id,
        )
        .first()
    )

    if not plan:

        raise HTTPException(
            status_code=404,
            detail="Study plan not found",
        )

    plan.subject = request.subject
    plan.topic = request.topic
    plan.exam = request.exam
    plan.study_plan = generate_ai_plan(request)

    db.commit()
    db.refresh(plan)

    return {
        "message": "Study plan updated successfully",
        "plan": plan,
    }


# =====================================
# Delete Plan
# =====================================

@router.delete("/plan/{plan_id}")
def delete_plan(
    plan_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    plan = (
        db.query(AIStudyPlan)
        .filter(
            AIStudyPlan.id == plan_id,
            AIStudyPlan.user_id == current_user.id,
        )
        .first()
    )

    if not plan:

        raise HTTPException(
            status_code=404,
            detail="Study plan not found",
        )

    db.delete(plan)
    db.commit()

    return {
        "message": "Study plan deleted successfully"
    }