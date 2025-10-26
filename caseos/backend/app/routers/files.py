from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from sqlalchemy.orm import Session

from app.database import get_db
from app.events import publish
from app.models import Case, EvidenceFile
from app.schemas import EvidenceFileOut
from app.storage import save_upload

router = APIRouter(prefix="/cases", tags=["files"])


@router.post("/{case_id}/files", response_model=EvidenceFileOut)
async def upload_file(
    case_id: int,
    upload: UploadFile = File(...),
    uploader: str = Form("unknown"),
    source_note: str = Form(""),
    db: Session = Depends(get_db),
):
    case = db.get(Case, case_id)
    if not case:
        raise HTTPException(404, "Case not found")

    content = await upload.read()
    path = save_upload(case_id, upload.filename, content)

    rec = EvidenceFile(
        case_id=case_id,
        filename=upload.filename,
        mime_type=upload.content_type or "application/octet-stream",
        uploader=uploader,
        source_note=source_note,
        stored_path=path,
        status="PENDING_ANALYSIS",
    )
    db.add(rec)
    db.commit()
    db.refresh(rec)

    publish(
        "on_file_upload",
        {
            "case_id": case_id,
            "evidence_file_id": rec.id,
            "path": path,
            "mime_type": rec.mime_type,
            "filename": rec.filename,
        },
    )
    return rec


@router.get("/{case_id}/files", response_model=list[EvidenceFileOut])
def list_files(case_id: int, db: Session = Depends(get_db)):
    return (
        db.query(EvidenceFile)
        .filter(EvidenceFile.case_id == case_id)
        .order_by(EvidenceFile.uploaded_at.desc())
        .all()
    )
