from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.api.v1.auth import get_current_user

from app.models.user import User
from app.models.ai_quiz import AIQuiz

from app.schemas.quiz import QuizRequest

from app.services.quiz_service import generate_quiz


router = APIRouter(
    prefix="/quiz",
    tags=["AI Quiz"]
)

def build_quiz_prompt(request: QuizRequest):

    return f"""
You are an expert exam setter and subject matter expert.

Create EXACTLY {request.number_of_questions} {request.question_type} questions.

Exam:
{request.exam}

Subject:
{request.subject}

Topic:
{request.topic}

Difficulty:
{request.difficulty}

Instructions:

- Generate ONLY questions related to the given topic.
- Questions must match the selected difficulty level.
- Every question must be factually and mathematically correct.
- Verify every answer before writing it.
- Never contradict the explanation.
- Avoid duplicate questions.
- Do not repeat concepts.
- Use clear English.

Formatting:

## Question 1

Question Text

A. Option 1

B. Option 2

C. Option 3

D. Option 4

Correct Answer:
A

Explanation:
Explain why the answer is correct in 2–4 lines.

Concept Tested:
Mention the concept.

Difficulty:
{request.difficulty}

Repeat the same structure for every question.

Rules:
VERY IMPORTANT

Before returning each question:

1. Solve the question yourself.
2. Verify that the Correct Answer exactly matches the Explanation.
3. Verify every mathematical calculation.
4. If the explanation contradicts the answer, regenerate that question.
5. Never guess mathematical values.
6. Never produce logically incorrect questions.
7. Ensure every option is unique.
8. Do not repeat concepts.
9. Make sure only ONE option is correct.

- Return Markdown only.
- Do NOT return JSON.
- Do NOT add introductions.
- Do NOT add conclusions.
- Do NOT use emojis.
- Ensure every explanation matches the correct answer.
- Mathematical calculations must be accurate.
"""
@router.post("/generate")
def generate_ai_quiz(
    request: QuizRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    prompt = build_quiz_prompt(request)

    quiz = generate_quiz(prompt)

    new_quiz = AIQuiz(
        exam=request.exam,
        subject=request.subject,
        topic=request.topic,
        difficulty=request.difficulty,
        question_type=request.question_type,
        number_of_questions=request.number_of_questions,
        quiz=quiz,
        user_id=current_user.id,
    )

    db.add(new_quiz)
    db.commit()
    db.refresh(new_quiz)

    return {
        "message": "Quiz Generated Successfully",
        "quiz_id": new_quiz.id,
        "quiz": new_quiz.quiz,
    }
@router.get("/my-quizzes")
def get_my_quizzes(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    quizzes = (

        db.query(AIQuiz)

        .filter(AIQuiz.user_id == current_user.id)

        .order_by(AIQuiz.id.desc())

        .all()

    )

    return quizzes
@router.get("/{quiz_id}")
def get_quiz(

    quiz_id: int,

    db: Session = Depends(get_db),

    current_user: User = Depends(get_current_user),

):

    quiz = (

        db.query(AIQuiz)

        .filter(

            AIQuiz.id == quiz_id,

            AIQuiz.user_id == current_user.id,

        )

        .first()

    )

    if not quiz:

        return {

            "message": "Quiz Not Found"

        }

    return quiz
@router.delete("/{quiz_id}")
def delete_quiz(

    quiz_id: int,

    db: Session = Depends(get_db),

    current_user: User = Depends(get_current_user),

):

    quiz = (

        db.query(AIQuiz)

        .filter(

            AIQuiz.id == quiz_id,

            AIQuiz.user_id == current_user.id,

        )

        .first()

    )

    if not quiz:

        return {

            "message": "Quiz Not Found"

        }

    db.delete(quiz)

    db.commit()

    return {

        "message": "Quiz Deleted Successfully"

    }
@router.put("/{quiz_id}")
def update_quiz(

    quiz_id: int,

    request: QuizRequest,

    db: Session = Depends(get_db),

    current_user: User = Depends(get_current_user),

):

    quiz = (

        db.query(AIQuiz)

        .filter(

            AIQuiz.id == quiz_id,

            AIQuiz.user_id == current_user.id,

        )

        .first()

    )

    if not quiz:

        return {

            "message": "Quiz Not Found"

        }

    quiz.exam = request.exam
    quiz.subject = request.subject
    quiz.topic = request.topic
    quiz.difficulty = request.difficulty
    quiz.question_type = request.question_type
    quiz.number_of_questions = request.number_of_questions

    db.commit()

    db.refresh(quiz)

    return {

        "message": "Quiz Updated Successfully",

        "quiz": quiz,

    }
