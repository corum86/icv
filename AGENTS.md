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
- npm run lint
- npm run build
- Backend (run from backend/):
- python -m uvicorn main:app --reload
- python seed_cv_data.py

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
- Linting uses both oxlint and ESLint via npm run lint.

## Environment And Pitfalls
- Backend requires MONGO_URL in backend/.env.
- Frontend backend URL comes from VITE_BACKEND_URL and falls back to http://localhost:8000.
- Seeding currently writes to collection cv_data (backend/seed_cv_data.py), while API reads collection cv (backend/main.py). Confirm intended collection before changing backend data flow.

## Agent Working Rules
- Prefer minimal, targeted edits.
- Validate changed area with relevant commands before finishing:
- Frontend code changes: npm run test:unit (and npm run lint when practical).
- Backend code changes: start app locally with uvicorn, and verify impacted endpoint(s).
- Do not duplicate documentation from README files; link to them.
