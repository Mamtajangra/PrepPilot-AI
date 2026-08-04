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


Instructions:

Generate a high-quality, exam-oriented quiz strictly based on:

Exam:
{request.exam}

Subject:
{request.subject}

Topic:
{request.topic}

Question Type:
{request.question_type}

Number of Questions:
{request.number_of_questions}

Difficulty:
{request.difficulty}

Language:
{request.language}

====================================
QUESTION QUALITY
====================================

- Generate ONLY questions related to the given topic.
- Follow the official syllabus and difficulty level of the selected examination.
- Never generate questions outside the selected exam syllabus.
- Questions must test understanding, not just memorization.
- Mix conceptual, application-based and analytical questions whenever appropriate.
- Avoid vague or generic questions.
- Avoid duplicate questions.
- Do not repeat the same concept.
- Every question must be factually, logically and mathematically correct.
- Verify every answer before writing it.
- Never contradict the explanation.
- Ensure every distractor (wrong option) is realistic.
- Make sure only ONE option is correct.
- Use clear and professional language.

====================================
QUESTION TYPE RULES
====================================

If Question Type = MCQ
→ Generate only MCQs.

If Question Type = True / False
→ Generate only True / False questions.

If Question Type = Short Answer
→ Generate only Short Answer questions.

If Question Type = Mixed
→ Mix:
- MCQs
- True / False
- Fill in the Blanks
- Short Answer
- Match the Following (when appropriate)

====================================
DIFFICULTY RULES
====================================

Easy
• Basic concepts
• Definitions
• Direct questions

Medium
• Conceptual understanding
• Moderate application
• Simple reasoning

Hard
• Advanced reasoning
• Multi-step solving
• Case-based/application questions

====================================
FORMAT
====================================

## Question 1

Question

A. Option 1

B. Option 2

C. Option 3

D. Option 4

Correct Answer:
A

Explanation:

- Why the correct answer is correct.
- Why the remaining options are incorrect (briefly).

Concept Tested:

Difficulty:

Estimated Time:

Repeat this structure for every question.

====================================
QUALITY CHECK
====================================

Before returning each question:

1. Solve the question yourself.
2. Verify the correct answer.
3. Verify the explanation.
4. Ensure explanation matches the answer.
5. Verify all calculations.
6. Ensure only ONE correct option.
7. Ensure options are unique.
8. Avoid repeated concepts.
9. Remove ambiguous wording.
10. Regenerate any incorrect question.
====================================
LANGUAGE
====================================

Generate the complete quiz in:

{request.language}

All questions, explanations and concepts must be written in the selected language.

Do not mix languages unless the selected language is Hinglish.
====================================
FORMATTING RULES
====================================

- Return Markdown only.
- Do NOT return JSON.
- Do NOT add introductions.
- Do NOT add conclusions.
- Do NOT use emojis.
- Keep formatting consistent.
- Number all questions correctly.
- Leave one blank line between questions.

====================================
FINAL QUALITY
====================================

The quiz should look like it was created by an experienced exam paper setter, not by a generic AI.

Generate ONLY the quiz.
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
