# AGENTS

Guidance for AI coding agents working in this repository.

## Scope
- Monorepo with two apps:
- Frontend: Vue 3 + TypeScript + Vite in frontend/
- Backend: FastAPI + MongoDB in backend/

## First Reads
- Project overview and setup: [README.md](README.md)
- Frontend tooling notes: [frontend/README.md](frontend/README.md)

## Common Commands
- Frontend (run from frontend/):
- npm install
- npm run dev
- npm run test:unit
- npm run test:e2e (Playwright; spins up both frontend and backend dev servers)
- npm run lint
- npm run build
- Backend (run from backend/):
- python -m uvicorn main:app --reload
- python seed_cv_data.py
- uv run pytest

## Architecture Snapshot
- Frontend entry and composition root: frontend/src/App.vue
- UI building blocks: frontend/src/components/
- Reusable logic: frontend/src/composables/
- Data/service boundary: frontend/src/services/cvContentService.ts
- Backend API: backend/main.py

## Project Conventions
- Frontend uses strict TypeScript and path alias @/*.
- Keep logic in composables/services; keep section components presentation-focused.
- Unit tests are Vitest + jsdom under frontend/src/__tests__/.
- E2E tests are Playwright under frontend/e2e/; frontend/playwright.config.ts starts the backend (via `uv run uvicorn`) and frontend (`npm run dev`) dev servers itself and points the frontend at the local backend.
- Backend unit tests are pytest under backend/tests/, using FastAPI's TestClient with backend/tests/conftest.py's fake DB fixtures (no real MongoDB needed). Dev deps (pytest, httpx) live in backend/requirements-dev.txt; install with `uv pip install -r requirements-dev.txt`.
- Linting uses both oxlint and ESLint via npm run lint.

## Environment And Pitfalls
- Backend requires MONGO_URL in backend/.env.
- Frontend backend URL comes from VITE_BACKEND_URL and falls back to http://localhost:8000.
- Seeding currently writes to collection cv_data (backend/seed_cv_data.py), while API reads collection cv (backend/main.py). Confirm intended collection before changing backend data flow.

## Agent Working Rules
- Prefer minimal, targeted edits.
- Validate changed area with relevant commands before finishing:
- Frontend code changes: npm run test:unit (and npm run lint when practical); npm run test:e2e for changes touching App.vue, routing, or i18n.
- Backend code changes: uv run pytest, and start app locally with uvicorn to verify impacted endpoint(s).
- Do not duplicate documentation from README files; link to them.
