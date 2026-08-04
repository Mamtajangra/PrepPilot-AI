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
====================================
EXAM-SPECIFIC INTELLIGENCE
====================================

Before generating the study plan, identify the syllabus level of the selected examination.

Always teach according to the selected exam level.

Never mix syllabus levels.

Never generate content outside the official scope of the selected examination.

Determine whether the selected examination belongs to one of the following categories:

• School Level
• Undergraduate Level
• Postgraduate Level
• Engineering
• Medical
• Government Recruitment
• Competitive Entrance
• Professional Certification
• Technical Interview
• Placement Preparation
• Language Proficiency
• Research / Higher Education
• Skill Development
• Any other relevant category

Adapt the depth, difficulty, terminology, examples, practice questions and resources according to the identified category and the selected examination.

If the examination does not have a fixed syllabus (such as interviews or skill-based assessments), generate an industry-standard study roadmap based on commonly expected topics and best practices.
====================================
TOPIC VALIDATION
====================================

Verify whether the selected topic is appropriate for the selected examination or preparation goal.

If the topic is partially relevant:
• Focus only on the relevant portion.

If the topic is not relevant:
• Clearly mention that it is not closely aligned with the selected examination or goal.
• Suggest the nearest relevant topic.
• Generate the study plan for the suggested topic instead.

Never introduce unrelated advanced concepts just to increase the study duration.

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
Formula Sheet

Real-life Example (whenever applicable)

Common Mistakes

Quick Revision Points

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

Conceptual Questions

MCQs

Subjective Questions

Numerical Questions (if applicable)

Application-based Questions

Difficulty Level

====================================
PYQs
====================================

Never invent previous year questions.

Instead write:

Mention:

Practice Previous Year Questions related to this topic from the selected examination.

Mention the exam name.

Mention the approximate year range.

If exact PYQs cannot be recalled, clearly state that the learner should solve PYQs from the last 5–10 years without inventing questions.

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

Official Syllabus

Books

NCERT (if applicable)



YouTube Channels

Recommend actual resources.

Mention real books.

Mention official websites.

Mention well-known YouTube channels.

Mention trusted practice platforms.

Avoid generic recommendations like:

"Vocabulary books"

"Practice websites"

Instead recommend actual names.

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
QUALITY RULES
====================================

Every study day must be unique.

Never copy content from previous days.

Avoid repeating the same timetable.

Avoid repeating the same revision tasks.

Avoid repeating identical study tips.

Avoid generic educational advice.

Generate practical and actionable guidance.

Every recommendation must be relevant to the selected examination.
====================================
PERSONALIZATION RULES
====================================

Generate a study plan that feels unique.

Do NOT repeat the same daily structure.

Vary the learning activities across different days.

Examples:

• Reading Practice
• Timed Tests
• Flashcards
• Mind Maps
• Concept Revision
• Error Log Review
• Mock Analysis
• Self Assessment
• Peer Discussion
• Writing Practice
• Speaking Practice
• Listening Practice

Mix these naturally.

Every day should feel different.
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

Never create a generic study plan.

Imagine you are creating a premium personalized study roadmap worth $50.

Every recommendation should feel practical and immediately useful.

The study plan must look like it was prepared by an experienced educator, not a generic AI.
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