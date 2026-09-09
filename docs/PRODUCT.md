# CourseRelay product plan

## Thesis

Course translation is becoming a commodity. The valuable product is a rights-first decision and operating system that tells course businesses **what to localize, for whom, with which partner, and under what downside-adjusted economics**.

## ICP and JTBD

**ICP:** growth/operator lead at a $500k–$5M creator-led course company, 1,000+ reviews, meaningful international traffic, evergreen curriculum, no Portuguese edition. Secondary user: a Brazilian affiliate operator with an owned audience and proven paid-course volume.

**JTBD:** “When international demand appears, help me prove one market and negotiate a safe pilot so I can create incremental revenue without funding a translation flop or losing control of my IP.”

## MVP vertical slice

1. Rank a small candidate list by source proof and target-market gap.
2. Shortlist one course and surface existing-language conflicts.
3. Model price, sales, production cost and revenue split.
4. Return `Pilot` or `Validate`, payback and explicit caveats.
5. Capture rights approval, demand-test evidence and partner terms in a paid human-delivered brief (next operational step).

The shipped prototype implements 1–4 with fictional fixtures. It does not translate, copy, host, license, sell or take payment for a course.

## Data model

- `CourseCandidate`: source URL, owner, title, category, rating, review count, runtime, existing languages, update cadence.
- `MarketSignal`: language/region, competing offers, keyword/search proxy, partner audience, landing-page visits, deposits, confidence and evidence date.
- `RightsGrant`: territory, language, media, derivative rights, term, exclusivity, update obligations, revocation and signature.
- `DealScenario`: localized price, expected volume, refunds, tax/fees, operator/creator/seller shares, production/support cost.
- `Decision`: score components, verdict, reviewer, evidence links, assumptions and expiry.
- `PilotOutcome`: conversion, completion, refund, support load, NPS, net revenue and content-quality defects.

## Technical architecture

Next.js App Router renders the static opportunity desk and uses shared JSON fixtures. It can optionally call FastAPI using `NEXT_PUBLIC_API_URL`; without a backend it performs the same clearly labeled demo calculation in-browser. FastAPI validates strict inputs, detects already-served markets, calculates the composite score and conserves revenue allocations. Production would add Postgres, an evidence ingestion worker, signed object storage for contracts and an auditable decision ledger.

## AI/model strategy

- Near term: no model needed for scoring. Deterministic formulas make assumptions inspectable.
- Assistive AI: draft transcript/slide translation, flag culturally specific examples, map terminology and summarize interviews.
- Human gate: native instructional editor approves meaning, examples and voice; creator approves derivative work.
- Evaluation: bilingual rubric, terminology consistency, factual equivalence, subtitle timing, learner quiz parity and sampled human review.
- Never use model confidence as rights evidence or demand evidence.

## Economics

Offer ladder: $1,500 opportunity brief → $8k–$20k one-course pilot plus negotiated revenue share → managed portfolio subscription/take rate. The demo's 60% operator share is illustrative and likely too high once creator, seller, refunds, taxes, payment fees, dubbing and support are all included. Go/no-go requires downside-case payback within four months and positive contribution margin after a 15% refund reserve. Long-term gross margin comes from reusable glossaries, QA workflows and distribution data, not raw dubbing.

## Validation plan

1. Observe five operators making localization decisions.
2. Interview 10 Brazilian affiliates about audience, launch requirements and deal structure.
3. Sell two briefs before building integrations.
4. Obtain written creator rights before any content leaves the source system.
5. Run localized waitlist/deposit pages with three offers; refund deposits automatically if the threshold misses.
6. Pilot one module first and compare comprehension/quiz results with the source cohort.
7. Advance only if deposits, quality and downside payback gates pass.

## Moat

No moat exists today. Potential compounding assets are creator trust, signed territory rights, target-market outcome history, seller reliability scores, terminology/evaluation corpora and operational speed. A UI, translation model or scraped course catalog is not defensible.

## Risks

- IP/contract breach or unauthorized derivative work.
- False demand inferred from English reviews.
- Cultural or regulatory inaccuracies; instructor reputation damage.
- Platform terms prohibit extraction/resale.
- Refund/support burden destroys modeled margin.
- Affiliate concentration and attribution disputes.
- Currency, tax, consumer-law and accessibility obligations.
- Stale courses require costly synchronized updates.
- Scores create unjustified certainty; every decision needs evidence age and assumptions.

## 30/60/90 days

- **Days 0–30:** 20 creator outreaches, five workflow observations, 10 seller interviews, two paid briefs, manual evidence schema.
- **Days 31–60:** secure one rights grant, launch deposit test, localize one module, measure comprehension and quality defects, revise economics.
- **Days 61–90:** deliver first paid full pilot if gates pass; instrument conversion/completion/refunds; decide whether to repeat Portuguese or test a second language. Build ingestion only after repeated manual pain is visible.

## Success and kill metrics

North-star: risk-adjusted net contribution from localized cohorts. Leading gates: paid-brief conversion ≥10%, signed-rights conversion ≥30%, qualified deposit conversion ≥3%, pilot payback ≤4 months, translation critical-defect rate <1%, refund rate <12%. Kill or reposition after 30 qualified conversations if nobody pays for evidence before production.
