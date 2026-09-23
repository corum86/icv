# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

See [AGENTS.md](AGENTS.md) for the canonical agent guidance (commands, conventions, pitfalls) — this file adds architecture context on top of it rather than repeating it.

## Commands

Frontend (run from `frontend/`):
- `npm install`
- `npm run dev` — Vite dev server at http://localhost:5173
- `npm run build` — runs `type-check` (vue-tsc) and `build-only` (vite build) in parallel
- `npm run test:unit` — Vitest; pass a path to run a single spec, e.g. `npm run test:unit -- src/__tests__/CVMap.spec.ts`
- `npm run test:e2e` — Playwright; `playwright.config.ts` boots both dev servers itself (backend via `uv run uvicorn`, frontend via `npm run dev`), so nothing needs to be running beforehand. Reuses already-running servers on 5173/8000 outside CI.
- `npm run lint` — runs both `lint:oxlint` (oxlint --fix) and `lint:eslint` (eslint --fix --cache)
- `npm run format` — Prettier over `src/`

Backend (run from `backend/`):
- `python -m uvicorn main:app --reload` — dev server at http://localhost:8000 (or `uv run uvicorn main:app --reload` if using uv, see [.claude/skills/run-project/SKILL.md](.claude/skills/run-project/SKILL.md))
- `python seed_cv_data.py` — loads `backend/cv_data.json` into MongoDB (collection `cv`)
- `uv run pytest` — unit tests against a fake DB (no MongoDB needed); install dev deps first with `uv pip install -r requirements-dev.txt`

## Architecture

Two independently deployed apps with no shared code: a static Vue frontend (Vercel) and a FastAPI backend (Render) backed by MongoDB. The frontend can run fully standalone against bundled local data even if the backend is down.

### Frontend data flow

`App.vue` is the composition root. On mount it calls two separate, unrelated network paths that must not be confused:
- `useProfileBootstrap()` (frontend/src/composables/useProfileBootstrap.ts) fetches `/api/profile` from a **hardcoded** URL (`https://icv-9zu5.onrender.com/`), not `VITE_BACKEND_URL`. This only drives the loading-screen name/title.
- `cvContentService.getCvContent(locale)` (frontend/src/services/cvContentService.ts) fetches `/api/cv?lang=<locale>` from `VITE_BACKEND_URL` (falls back to `http://localhost:8000`), and on any failure falls back to the bundled per-locale data in `frontend/src/data/cvData.ts` (`cvDataByLocale`). This drives all section content and re-fetches whenever the locale changes.

`CvContentService` is an interface with two implementations (`backendCvContentService`, `staticCvContentService`); `backendCvContentService` is the default export and the only one wired into `App.vue`.

Section components (`components/sections/*`) are presentation-only and receive their content as props from `App.vue`'s `cvContent` ref — they don't fetch data themselves. Place/map data (`data/places.ts`, `PlaceMarker[]`) is separate from CV content and feeds `CVMapModal.vue`, which is lazy-loaded via `defineAsyncComponent`.

Scrolling is free/native (no snap-to-section). Active-section highlighting for nav is handled by `composables/useActiveSection.ts` via an `IntersectionObserver` on a single `scrollRootRef` set by `AppShell` via a `root-mounted` emit; clicking a nav link scrolls to that section with a plain `scrollIntoView` call in `App.vue`'s `handleNavigate`.

### i18n

`frontend/src/i18n.ts` sets up `vue-i18n` with locales `de` (default) and `en`, backed by `locales/de.json` / `locales/en.json`. Initial locale resolution order: `localStorage['icv-locale']` → browser language → `de`. Changing locale via `App.vue`'s `handleLocaleChange` both updates `vue-i18n` and re-triggers the backend CV content fetch for the new language — UI string translations (locales/*.json) and CV content translations (backend `content.<locale>`) are two separate translation systems that both key off `AppLocale`.

### Backend

`backend/main.py` is the entire API surface: `GET /api/profile` (single hardcoded ObjectId lookup in `db.profile`) and `GET /api/cv?lang=` (reads `db.cv`, expects a document shaped `{ languages, defaultLanguage, content: { de: {...}, en: {...} } }`, falls back to `content.de`, then to the raw legacy document for backward compatibility with pre-i18n single-language data). `backend/seed_cv_data.py` seeds `db.cv` from `backend/cv_data.json`, auto-wrapping legacy (non-`content`-keyed) JSON into the bilingual shape.

Per AGENTS.md: seeding and the API currently agree on collection `cv` (not `cv_data` — an earlier mismatch has been noted historically; double-check both files if collection data seems missing).

### Testing

Frontend unit: Vitest + jsdom, specs under `frontend/src/__tests__/`, setup file at `frontend/src/__tests__/setup.ts`. `vitest.config.ts` merges into `vite.config.ts`, so the `@` path alias applies in tests too. `vitest.config.ts` sets `test.execArgv: ['--no-experimental-webstorage']` — Node's own built-in `localStorage` global (stable since Node 24) otherwise shadows jsdom's `window.localStorage` in the test worker (since vitest's jsdom environment runs with `window === globalThis`), leaving it `undefined` and breaking any test that calls `i18n.ts`'s `setLocale`.

Frontend e2e: Playwright, specs under `frontend/e2e/`, config at `frontend/playwright.config.ts`. The config's `webServer` array starts the backend (`uv run uvicorn`, cwd `../backend`) and the frontend (`npm run dev`, with `VITE_BACKEND_URL` overridden to the local backend) so e2e runs are self-contained and don't depend on the production Render backend or a committed `.env`.

Backend: pytest, specs under `backend/tests/`. `backend/tests/conftest.py` monkeypatches `main.db` with an in-memory fake (`FakeDB`/`FakeCollection`) so tests don't touch the real MongoDB Atlas cluster in `backend/.env`. Dev-only deps (`pytest`, `httpx`) are in `backend/requirements-dev.txt`, layered on top of `requirements.txt`.
