from pathlib import Path

from app.config import settings

ROOT = Path(settings.STORAGE_ROOT)


def ensure_case_folder(case_id: int) -> Path:
    p = ROOT / "cases" / str(case_id) / "uploads"
    p.mkdir(parents=True, exist_ok=True)
    return p


def save_upload(case_id: int, filename: str, file_bytes: bytes) -> str:
    folder = ensure_case_folder(case_id)
    dest = folder / filename
    # avoid collisions
    i, stem, suffix = 1, dest.stem, dest.suffix
    while dest.exists():
        dest = folder / f"{stem}({i}){suffix}"
        i += 1
    dest.write_bytes(file_bytes)
    return str(dest)
