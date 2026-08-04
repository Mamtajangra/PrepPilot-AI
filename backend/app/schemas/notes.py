from pydantic import BaseModel


class NotesRequest(BaseModel):

    exam: str

    subject: str

    topic: str

    difficulty: str

    length: str


class NotesResponse(BaseModel):

    message: str

    notes: str