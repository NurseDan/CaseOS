# CaseOS – Module 1: Evidence Intake & Management

This repository contains a working scaffold for CaseOS Module 1, providing a FastAPI backend
with SQLite storage and a Next.js 14 frontend. Evidence files can be uploaded to cases, listed in
the UI, and each upload triggers an `on_file_upload` event for downstream processing.

## Project Structure

```
caseos/
  backend/           # FastAPI application
  frontend/          # Next.js 14 application
  docker-compose.yml # Optional local orchestration
```

### Backend Highlights
- FastAPI app serving REST endpoints for cases and evidence files
- SQLite database with SQLAlchemy models for cases and files
- Local file storage under `./data/cases/<id>/uploads`
- Pub/sub stub that emits `on_file_upload` events for integration with Module 2 later

### Frontend Highlights
- Next.js 14 (App Router) single-page workflow for listing cases and uploading evidence
- Reusable components for case creation, file upload, and evidence listing
- Uses `NEXT_PUBLIC_API_BASE` to target the backend API

## Local Development

### Prerequisites
- Python 3.11+
- Node.js 18+

### Backend Setup
```bash
cd caseos/backend
cp .env.example .env
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### Frontend Setup
```bash
cd caseos/frontend
npm install
export NEXT_PUBLIC_API_BASE=http://localhost:8000  # Windows (PowerShell): $Env:NEXT_PUBLIC_API_BASE="http://localhost:8000"
npm run dev
```

Visit <http://localhost:3000> to open the UI. Create a case, upload evidence, and the files will
appear in the evidence table for the selected case.

### Docker Compose (Optional)
```bash
cd caseos
docker-compose up --build
```

This command starts both services with hot-reload mounts for local development.
