from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import Base, engine, get_db
from app.models import Case
from app.schemas import CaseCreate, CaseOut

router = APIRouter(prefix="/cases", tags=["cases"])

# Initialize tables on first run
Base.metadata.create_all(bind=engine)


@router.post("", response_model=CaseOut)
def create_case(body: CaseCreate, db: Session = Depends(get_db)):
    case = Case(name=body.name, case_type=body.case_type)
    db.add(case)
    db.commit()
    db.refresh(case)
    return case


@router.get("", response_model=list[CaseOut])
def list_cases(db: Session = Depends(get_db)):
    return db.query(Case).order_by(Case.created_at.desc()).all()
