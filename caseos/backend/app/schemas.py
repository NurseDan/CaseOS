from datetime import datetime

from pydantic import BaseModel, Field


class CaseCreate(BaseModel):
    name: str = Field(..., min_length=1)
    case_type: str = "general"


class CaseOut(BaseModel):
    id: int
    name: str
    case_type: str
    created_at: datetime

    class Config:
        from_attributes = True


class EvidenceFileOut(BaseModel):
    id: int
    case_id: int
    filename: str
    mime_type: str
    uploader: str
    source_note: str
    stored_path: str
    status: str
    uploaded_at: datetime

    class Config:
        from_attributes = True
