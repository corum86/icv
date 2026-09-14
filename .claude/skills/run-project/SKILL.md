---
name: run-project
description: Start the icv backend (FastAPI/uvicorn via uv) and frontend (Vite) dev servers. Use when asked to run, start, or launch the project locally.
---

# Run the project

Two separate dev servers, started in two terminals.

1. Backend (FastAPI):
   ```
   cd backend
   uv run uvicorn main:app --reload
   ```
   Serves at http://localhost:8000.

2. Frontend (Vite), in a new terminal:
   ```
   cd frontend
   npm run dev
   ```
   Serves at http://localhost:5173.

Start the backend first, then open a second terminal for the frontend — the frontend's `cvContentService` calls the backend at `VITE_BACKEND_URL` (default `http://localhost:8000`) and falls back to bundled static data if it's unreachable, so the app still loads even if the backend isn't up yet.
