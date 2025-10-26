from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Case(Base):
    __tablename__ = "cases"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(160), index=True)
    case_type: Mapped[str] = mapped_column(String(80), default="general")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    files: Mapped[list["EvidenceFile"]] = relationship(back_populates="case", cascade="all,delete")


class EvidenceFile(Base):
    __tablename__ = "evidence_files"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    case_id: Mapped[int] = mapped_column(ForeignKey("cases.id", ondelete="CASCADE"), index=True)
    filename: Mapped[str] = mapped_column(String(255))
    mime_type: Mapped[str] = mapped_column(String(120))
    uploader: Mapped[str] = mapped_column(String(120), default="system")
    source_note: Mapped[str] = mapped_column(Text, default="")
    stored_path: Mapped[str] = mapped_column(String(512))
    status: Mapped[str] = mapped_column(String(40), default="PENDING_ANALYSIS")
    uploaded_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    case: Mapped[Case] = relationship(back_populates="files")
