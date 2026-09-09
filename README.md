# CourseRelay

A runnable concept for a rights-first course localization opportunity desk. Operators can rank fictional course candidates by language-market gap, save a shortlist, detect an already-served market and model a one-course pilot. The prototype is intentionally a decision workflow—not a landing page and not a course-copying tool.

## What works

- Responsive Next.js App Router workspace with market re-ranking, search, shortlist and empty state.
- Interactive opportunity drawer with input controls, loading state, rights conflict, unit economics and `Pilot`/`Validate` verdict.
- Optional strict FastAPI analysis endpoint using the same explicit fixtures.
- Python integration tests and desktop/mobile Playwright interaction tests.
- Static export under a GitHub repository `basePath`.

All courses, scores, prices and economics are fictional. The browser model is simulated and deterministic. No course content is copied, no AI service is called, no rights are granted and no sale occurs.

## Run

```bash
npm ci
npm run dev
```

In another shell:

```bash
cd api
uv sync --frozen
uv run uvicorn main:app --reload
```

Set `NEXT_PUBLIC_API_URL=http://localhost:8000` before starting Next.js to use FastAPI. Without it, the static frontend uses its labeled in-browser demo calculation.

## Verify

```bash
npm run typecheck
npm run test:e2e
npm run build
cd api && uv sync --frozen && uv run pytest -q
```

## Docs

- [Office Hours diagnostic](docs/OFFICE_HOURS.md)
- [Product plan](docs/PRODUCT.md)
- [CEO review](docs/CEO_REVIEW.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Phased build prompts](docs/BUILD_PROMPTS.md)
- [Source notes](research/notes.md)

GitHub Pages hosts only the frontend. FastAPI is runnable and tested source; it is **not publicly deployed**.
