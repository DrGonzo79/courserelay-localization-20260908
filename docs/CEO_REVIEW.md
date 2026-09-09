# CEO review

Generated 2026-09-09 · **Mode: scope reduction** · Status: DONE WITH CONCERNS

## Nuclear challenge

The original “international school” framing encourages a marketplace before either side has demonstrated demand. The real outcome is incremental course revenue with controlled IP, production and reputation risk. Doing nothing is cheaper than a speculative dub. The smallest honest wedge is a paid, rights-first opportunity brief; the software prototype is its internal decision desk.

**Current state → this build → 12-month ideal:** spreadsheet intuition → inspectable candidate/economics workflow → outcome-calibrated localization operating system with trusted creators and regional sellers.

### Alternatives

- **Minimal viable — concierge brief (S/Low):** manual interviews, rights checklist and deposit test. Fastest revenue; limited scale.
- **Selected — operator decision desk (M/Medium):** repeatable evidence and unit-economics workflow. Useful now, but scores risk false precision.
- **Ideal — rights/distribution network (XL/High):** signed rights, production, regional sellers, payments and cohort outcomes. Defensible only after repeatable pilots.

**Decision:** sell the concierge brief, use this desk to operate it, and refuse marketplace scope until 10 successful pilots.

## 1. Architecture review

The static-first boundary is correct for a public concept: bundled fixtures keep Pages functional; the optional FastAPI service owns strict domain rules. Production must move scoring inputs and customer evidence server-side. Happy path is select → validate → score → show economics. Nil/wrong input is rejected; empty search is explicit; service error is visible and retryable. Rollback is a Pages redeploy of the previous SHA.

## 2. Error and rescue map

- `422 validation_error`: bad type/range/language; API rejects before scoring.
- `404 course_not_found`: stale/unknown ID; caller must refresh catalog.
- `409 language_already_served`: candidate conflicts with existing edition; UI warns and blocks analysis.
- `analysis_<status>`/network failure: UI keeps inputs and shows retry alert.
- storage parse/quota/security failure: shortlist remains session-local and the user is told.
- zero sales: no divide-by-zero; payback is null and verdict is `Validate`.

## 3. Security and threat model

Current data is public fictional fixtures with no auth or secrets. Strict models forbid extra fields and bound computational inputs. Before real use: tenant auth, authorization on every evidence/contract object, encrypted document storage, audit logs, rate limits, dependency scanning, CSP and platform-terms review. Course content must never be scraped or translated without rights.

## 4. Data flow and interaction edge cases

Inputs are controlled bounded sliders; select values are enumerated; transforms use integer revenue math; no persistence occurs except shortlist IDs. Double-clicks are disabled while loading. Closing the drawer drops only the rendered result, not global shortlist. Stale scores are a future risk requiring evidence timestamps. Unicode belongs in metadata, never interpolated into executable templates. Existing-language conflicts are named, not silently scored.

## 5. Code quality review

One page is acceptable for a prototype but should split into candidate table, analysis drawer and domain library when integrations arrive. Shared JSON prevents frontend/backend fixture drift. The scoring formula is duplicated for offline resilience; production should generate a versioned TypeScript/Python contract or make the service authoritative.

## 6. Test review

Python covers success, revenue conservation, invalid types/ranges, unknown course, existing translation and zero-sales failure. Playwright covers market reranking, persistent interaction, shortlist filtering, analysis, empty search, rights conflict and mobile overflow in Chromium. Gaps: keyboard-only dialog focus trap, API-connected browser contract, screen-reader audit and production data migrations.

## 7. Observability and monitoring

The prototype has CI and visible errors, not production telemetry. Real launch requires counters for analysis success/failure by named reason, decision overrides, rights-gate failures, score age, landing conversion, refunds, critical localization defects and contribution margin. Alert on authorization failures, contract-access anomalies and payment/refund mismatch. Runbooks must exist for rights revocation and bad translation rollback.

## 8. Database and state management

No server database is warranted today. Local storage holds only fictional shortlist IDs. Production tables need organization/creator/course/market/evidence/rights/deal/decision/outcome boundaries, foreign keys, unique rights territory-language-term constraints and append-only decision revisions. Index by tenant, evidence freshness, rights expiry and pilot state.

## 9. API design and contract

The analysis endpoint is narrow, deterministic and explicit. Currency is whole dollars in v0 to keep the demo legible; production must use integer minor units plus ISO currency. Add API versioning, idempotency keys for mutations, authenticated organization context and machine-readable error codes before external clients.

## 10. Performance and scalability

Four fixtures are trivial. At 10x/100x, filtering/ranking moves server-side with pagination and cached evidence aggregates. Expensive ingestion/AI work must be queued, idempotent and budgeted. Score reads cannot wait on live third-party platforms; ingest evidence asynchronously and expose freshness.

## 11. Design and UX

Hierarchy is market → ranked proof → candidate → economics. Fictional data and simulated analysis are labeled repeatedly. Loading, error, empty, conflict and zero-sales states are explicit. Controls have labels/focus styles; layout collapses at tablet/mobile and is tested for overflow. Before production, add focus trapping/restoration, reduced-motion audit, data provenance drawers and a non-slider numeric-input alternative.

## Final decisions

- **Strongest challenges:** demand is unproven; rights can kill the business; composite scores create false confidence.
- **Accepted scope:** fictional opportunity ranking, shortlist, rights conflict and deterministic pilot economics; tested FastAPI source.
- **Deferred:** auth, contracts, live market data, deposits, translation, payments, seller marketplace and model-assisted QA.
- **Not in scope:** scraping gated course content, claiming source review counts prove target demand, or hosting a production backend.
- **Recommended path:** sell two evidence briefs and require written rights plus deposit demand before producing a full localized course.
