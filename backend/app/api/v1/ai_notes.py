from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.api.v1.auth import get_current_user

from app.models.user import User
from app.models.ai_notes import AINotes

from app.schemas.notes import NotesRequest

from app.services.notes_service import generate_notes


router = APIRouter(
    prefix="/notes",
    tags=["AI Notes"]
)


def build_notes_prompt(request: NotesRequest):

    return f"""
Create PREMIUM quality study notes.

====================================
STUDENT DETAILS
====================================

Exam:
{request.exam}

Subject:
{request.subject}

Topic:
{request.topic}

Difficulty:
{request.difficulty}

Length:
{request.length}

====================================
OBJECTIVE
====================================

Generate highly structured, exam-oriented study notes.

The notes should be suitable for:
- Competitive Exams
- University Exams
- Revision
- Self Study

Write in simple English.

Avoid unnecessary theory.

Focus on conceptual understanding.

====================================
FOLLOW THIS EXACT STRUCTURE
====================================

#  Topic Name

---

##  Exam Relevance

Explain why this topic is important in {request.exam}.

---

##  Introduction

Introduce the topic in beginner-friendly language.

---

##  Important Concepts

Explain every important concept using headings and bullet points.

---

## Definitions

Provide all important definitions.

Use a Markdown table whenever possible.

---

##  Key Points

Mention all important facts students must remember.

---

##  Formula Sheet

If formulas exist:

- Put formulas inside Markdown code blocks.
- Explain each formula briefly.

If no formulas exist, skip this section.

---

##  Solved Example

Provide ONE detailed solved example.

Explain every step.

---

##  Tricks / Memory Tips

Mention useful mnemonics and shortcuts.

---

##  Common Mistakes

Mention mistakes students commonly make.

---

##  PYQ Pattern

Explain what type of questions are usually asked.

Do NOT invent actual previous year questions.

Examples:

- Concept Based
- Numerical
- Direct Formula
- Statement Based

---

## Practice Questions

Generate 5 good practice questions.

Do NOT provide answers.

---

##  Quick Revision

Summarize the entire topic in concise bullet points.

---

##  Most Important Exam Points

Mention only the highest priority revision points.

====================================
FORMATTING RULES
====================================

Return ONLY Markdown.

Use:

# Main Heading

## Heading

### Subheading

Markdown Tables

Bullet Lists

Numbered Lists

Bold important keywords.

Use code blocks for formulas.

Keep paragraphs short.

Never return HTML.

Never return JSON.

Never skip headings.

Never write one huge paragraph.

Use proper spacing between sections.

Maintain a professional coaching institute style.
"""



@router.post("/generate")
def generate_ai_notes(
    request: NotesRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    prompt = build_notes_prompt(request)

    notes = generate_notes(prompt)

    new_notes = AINotes(
        exam=request.exam,
        subject=request.subject,
        topic=request.topic,
        difficulty=request.difficulty,
        length=request.length,
        notes=notes,
        user_id=current_user.id,
    )

    db.add(new_notes)
    db.commit()
    db.refresh(new_notes)

    return {
        "message": "Notes Generated Successfully",
        "notes_id": new_notes.id,
        "notes": new_notes.notes,
    }
@router.get("/my-notes")
def get_my_notes(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    notes = (
        db.query(AINotes)
        .filter(AINotes.user_id == current_user.id)
        .order_by(AINotes.id.desc())
        .all()
    )

    return notes
@router.delete("/{note_id}")
def delete_note(
    note_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    note = (
        db.query(AINotes)
        .filter(
            AINotes.id == note_id,
            AINotes.user_id == current_user.id,
        )
        .first()
    )

    if not note:
        return {
            "message": "Note not found"
        }

    db.delete(note)
    db.commit()

    return {
        "message": "Note deleted successfully"
    }
@router.get("/{note_id}")
def get_single_note(
    note_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    note = (
        db.query(AINotes)
        .filter(
            AINotes.id == note_id,
            AINotes.user_id == current_user.id,
        )
        .first()
    )

    if not note:
        return {
            "message": "Note not found"
        }

    return note