# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

See [AGENTS.md](AGENTS.md) for the canonical agent guidance (commands, conventions, pitfalls) — this file adds architecture context on top of it rather than repeating it.

## Commands

Frontend (run from `frontend/`):
- `npm install`
- `npm run dev` — Vite dev server at http://localhost:5173
- `npm run build` — runs `type-check` (vue-tsc) and `build-only` (vite build) in parallel
- `npm run test:unit` — Vitest; pass a path to run a single spec, e.g. `npm run test:unit -- src/__tests__/CVMap.spec.ts`
- `npm run lint` — runs both `lint:oxlint` (oxlint --fix) and `lint:eslint` (eslint --fix --cache)
- `npm run format` — Prettier over `src/`

Backend (run from `backend/`):
- `python -m uvicorn main:app --reload` — dev server at http://localhost:8000
- `python seed_cv_data.py` — loads `backend/cv_data.json` into MongoDB (collection `cv`)

## Architecture

Two independently deployed apps with no shared code: a static Vue frontend (Vercel) and a FastAPI backend (Render) backed by MongoDB. The frontend can run fully standalone against bundled local data even if the backend is down.

### Frontend data flow

`App.vue` is the composition root. On mount it calls two separate, unrelated network paths that must not be confused:
- `useProfileBootstrap()` (frontend/src/composables/useProfileBootstrap.ts) fetches `/api/profile` from a **hardcoded** URL (`https://icv-9zu5.onrender.com/`), not `VITE_BACKEND_URL`. This only drives the loading-screen name/title.
- `cvContentService.getCvContent(locale)` (frontend/src/services/cvContentService.ts) fetches `/api/cv?lang=<locale>` from `VITE_BACKEND_URL` (falls back to `http://localhost:8000`), and on any failure falls back to the bundled `frontend/src/data/cvData.ts`. This drives all section content and re-fetches whenever the locale changes.

`CvContentService` is an interface with two implementations (`backendCvContentService`, `staticCvContentService`); `backendCvContentService` is the default export and the only one wired into `App.vue`.

Section components (`components/sections/*`) are presentation-only and receive their content as props from `App.vue`'s `cvContent` ref — they don't fetch data themselves. Place/map data (`data/places.ts`, `PlaceMarker[]`) is separate from CV content and feeds `CVMapModal.vue`, which is lazy-loaded via `defineAsyncComponent`.

Scrolling/navigation behavior (active-section highlighting, snap-scroll, reduced-motion handling) lives in `composables/useActiveSection.ts` and `composables/useSnapScroll.ts`, both driven off a single `scrollRootRef` set by `AppShell` via a `root-mounted` emit.

### i18n

`frontend/src/i18n.ts` sets up `vue-i18n` with locales `de` (default) and `en`, backed by `locales/de.json` / `locales/en.json`. Initial locale resolution order: `localStorage['icv-locale']` → browser language → `de`. Changing locale via `App.vue`'s `handleLocaleChange` both updates `vue-i18n` and re-triggers the backend CV content fetch for the new language — UI string translations (locales/*.json) and CV content translations (backend `content.<locale>`) are two separate translation systems that both key off `AppLocale`.

### Backend

`backend/main.py` is the entire API surface: `GET /api/profile` (single hardcoded ObjectId lookup in `db.profile`) and `GET /api/cv?lang=` (reads `db.cv`, expects a document shaped `{ languages, defaultLanguage, content: { de: {...}, en: {...} } }`, falls back to `content.de`, then to the raw legacy document for backward compatibility with pre-i18n single-language data). `backend/seed_cv_data.py` seeds `db.cv` from `backend/cv_data.json`, auto-wrapping legacy (non-`content`-keyed) JSON into the bilingual shape.

Per AGENTS.md: seeding and the API currently agree on collection `cv` (not `cv_data` — an earlier mismatch has been noted historically; double-check both files if collection data seems missing).

### Testing

Vitest + jsdom, specs under `frontend/src/__tests__/`, setup file at `frontend/src/__tests__/setup.ts`. `vitest.config.ts` merges into `vite.config.ts`, so the `@` path alias applies in tests too.
