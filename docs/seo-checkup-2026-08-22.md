# SEO check-up evidence register

Date: 22 August 2026
Scope: nightmaremode.net repository and public production
Owner: Matthias Ramahi
Portfolio assignment: Contextter (accepted; unchanged)
Indexing state: protected; `PUBLIC_SITE_INDEXABLE=false`

## Decision summary

Nightmare Mode has a technically coherent protected prototype, an original launch essay and clear ownership boundaries. The strongest immediate gain is not more keyword pages. It is a usable, source-backed play-study method that gives the existing Field Notes hub a real purpose and creates an evidence standard for future criticism.

Public indexing remains blocked. Search Console manual actions, security issues and removal state are not reproducibly available in the project, and the repository contract makes that check a launch gate. No DNS change and no paid data request were made.

## Evidence register

| State | Finding | Evidence | Decision |
|---|---|---|---|
| Verified | Production apex returns 200 over HTTPS. HTTP permanently redirects to HTTPS. | Live header matrix, 22 August 2026. | Preserve. |
| Verified | `www` permanently redirects to apex while preserving path and query. | `https://www.nightmaremode.net/test/path?x=1` returned 308 to the equivalent apex URL. | Preserve. |
| Verified | Production is globally protected from indexing. | Homepage emits `noindex, nofollow`; robots.txt contains `Disallow: /`; sitemap returns 404. | Keep until every launch gate passes. |
| Verified | Missing URLs return a real 404; three reviewed legacy references return rights-safe noindex 200 pages. | Live status checks and `src/data/legacy-url-actions.ts`. | Preserve manifest decisions. |
| Verified | Security headers cover all routes. | CSP, HSTS, nosniff, frame denial, referrer, permissions, COOP and CORP observed live. | Preserve and test in safeguards. |
| Verified | The current operation does not link to Contextter or a portfolio network. | Source and built-HTML checks. | Preserve; the accepted portfolio assignment does not create reader value by itself. |
| Verified | The original essay names evidence limits, sources, editorial responsibility and AI assistance. | `/essays/a-game-is-more-than-its-files/`. | Strengthen with a natural link to the play-study method. |
| Verified | The previous local link checker could silently crawl an unrelated service on port 4321. | Baseline run checked four unrelated pages including `/security`. | Replace with a deterministic `dist` graph and orphan check. |
| Verified | Field Notes was an empty, noindex dead end linked from primary navigation. | Repository route and rendered component before this change. | Replace with a substantive hub and method asset. |
| Supported | A useful play-study method should preserve build/environment metadata and separate observed events from interpretation. | Consalvo and Dutton; DiGAP; Library of Congress software/game format guidance. | Publish an original adapted worksheet with citations and limits. |
| Supported | A small publication benefits more from one reusable proof asset than several thin topical pages. | Current content inventory, monthly cadence and maintenance contract. | Implement one method asset in this phase. |
| Hypothesis | Readers who enter through the preservation essay will use a concrete documentation worksheet as a next step. | The essay already argues for version and environment disclosure; no behavioural data exists yet. | Measure internal clicks after indexing and analytics consent review. |
| Hypothesis | Field Notes can become the strongest differentiating cluster if future studies publish retained observations and counterexamples. | Editorial positioning and new protocol; no game-specific field note exists yet. | Validate through two completed studies before expanding the taxonomy. |
| Experiment | Use the protocol for two original play studies, then revise fields that produced ambiguous or unused evidence. | Version 1.0 is explicitly an operating method, not a universal standard. | Review after the second completed study. |
| Experiment | Test whether the methods link from the homepage and preservation essay earns meaningful navigation. | No production click data is available. | Define events only after privacy and analytics decisions are documented. |
| Rejected | Scaled keyword, PAA, city, franchise or templated fan-out pages. | No evidence, maintenance capacity or first-hand material supports them. | Do not build. |
| Rejected | Restoring, paraphrasing or impersonating former articles or contributor identities. | Ownership and recovery contract; no rights transfer. | Prohibited. |
| Rejected | Redirecting historical URLs to the homepage or unrelated new work. | Legacy manifest and recovery handoff. | Prohibited. |
| Rejected | A Contextter promotional link, portfolio footer or reciprocal network. | No natural reader need and explicit portfolio contract. | Do not add. |
| Rejected | Removing noindex without reproducible Search Console and live launch evidence. | Search Console state is not proven in this environment. | Keep the production gate closed. |

## Prioritized findings

### P0 — Launch blocker

- Search Console manual actions, security issues and removals are **NOT PROVEN**. Under the repository contract, indexability cannot be enabled.
- No current evidence justifies changing DNS or web-host records.

### P1 — Material quality gaps addressed in this phase

- Field Notes had no published value despite a prominent navigation position.
- The old broken-link test was environment-dependent and could pass against the wrong server.
- Every subpage emitted `WebSite` schema; subpages should identify themselves as `WebPage` while article assets add their own `Article` schema.
- The canonical URL inventory existed only as a sitemap allowlist, without a durable user job and action for each page.

### P2 — Remaining editorial work

- No game-specific play study exists yet. The protocol is a method asset, not evidence of completed gameplay research.
- Conversations remains a noindex hold page and has been removed from primary navigation until a consented interview exists.
- `/ownership/` overlaps `/about/new-ownership/`. Keep it noindex until demand/backlink evidence supports a safe merge or exact redirect.
- The discovery preparation note remains noindex; it has no findings and must not be presented as research.

### P3 — Measurement and refinement

- Click-through from essay to protocol and completion/use of the worksheet are hypotheses, not proven demand.
- Title and snippet performance cannot be assessed until indexing is lawfully enabled and sufficient GSC data exists.

## Canonical page-action matrix

The machine-readable source is `src/data/indexable-routes.mjs`. Each emitted canonical page has exactly one primary user job.

| URL | Launch indexable | Cluster | Action | Primary user job |
|---|---:|---|---|---|
| `/` | Yes | Publication | Strengthen | Understand the publication and reach current original work. |
| `/about/` | Yes | Governance | Keep | Verify purpose, operator, cadence and independence. |
| `/editorial-policy/` | Yes | Governance | Keep | Verify evidence, AI-use and correction rules. |
| `/essays/` | Yes | Essays | Strengthen | Browse substantive current essays. |
| `/essays/a-game-is-more-than-its-files/` | Yes | Essays | Strengthen | Read the preservation evidence argument. |
| `/field-notes/` | Yes | Play studies | Strengthen | Find documented methods and future observation-led studies. |
| `/field-notes/play-study-protocol/` | Yes | Play studies | Create | Use a reproducible play documentation worksheet. |
| `/404/` | No | Utility | Keep noindex | Recover from a genuinely missing URL. |
| `/about/new-ownership/` | No | Governance | Keep noindex | Verify the 2026 ownership and rights boundary. |
| `/archive/` | No | Legacy | Keep noindex | Understand historical URL handling. |
| `/contact/` | No | Utility | Keep noindex | Contact the current operation. |
| `/conversations/` | No | Conversations | Hold | State the consent gate for future interviews. |
| `/datenschutz/` | No | Legal | Keep noindex | Understand actual data processing. |
| `/discovery/how-indie-games-get-discovered-in-2026/` | No | Research hold | Hold | Record the unpublished study gate. |
| `/history/` | No | Legacy | Keep noindex | Understand domain history without continuity claims. |
| `/impressum/` | No | Legal | Keep noindex | Identify the legal operator. |
| `/ownership/` | No | Governance | Merge after data | Reach the detailed ownership boundary while demand is checked. |
| `/rights-contact/` | No | Legal | Keep noindex | Report rights and correction concerns. |
| `/2012/01/metal-gear-solids-postmodern-legacy-part-1-15146/` | No | Legacy | Bibliographic noindex | Preserve limited bibliographic facts for this reviewed URL. |
| `/2012/03/unmanned-a-talk-with-molleindustria-about-the-politics-of-war-games-16946/` | No | Legacy | Bibliographic noindex | Preserve limited bibliographic facts for this reviewed URL. |
| `/2012/11/creation-under-capitalism-23422/` | No | Legacy | Bibliographic noindex | Preserve limited bibliographic facts for this reviewed URL. |

The three legacy URLs whose manifest action is a true 404 are not canonical pages and therefore do not appear in this matrix.

## Hub and cluster map

```text
Home — publication orientation
├── Essays — source-led arguments
│   └── A game is more than its files — preservation and evidence limits
│       └── Play-study protocol — practical next step
├── Field Notes — documented observation hub
│   └── Play-study protocol — reusable method and worksheet
├── Editorial policy — evidence, AI, corrections and cadence
└── About — operator, purpose and independence
    └── New ownership / history / rights — noindex governance support

Archive — noindex historical URL policy
└── Reviewed bibliographic references — noindex, facts only

Conversations — noindex hold until a consented original exchange exists
Discovery study — noindex hold until evidence and findings exist
```

There is no keyword cannibalization among launch-indexable pages: the hub pages serve navigation and governance jobs, while the essay and protocol answer distinct informational needs. The closest overlap is between the two noindex ownership routes and is explicitly held for later consolidation.

## Source basis for the new method asset

- Mia Consalvo and Nathan Dutton, “Game analysis: Developing a methodological toolkit for the qualitative study of games,” *Game Studies* 6(1), 2006.
- Rowan Daneels and co-authors, “The Digital Game Analysis Protocol (DiGAP),” *Game Studies* 22(2), 2022.
- Library of Congress, “Recommended Formats Statement: Software and Video Games,” accessed 22 August 2026.

The method page adapts ideas into a new editorial worksheet. It does not reproduce the source protocols and does not claim a completed play session.

## 30 / 60 / 90 days

### 0–30 days

- Establish authenticated Search Console access and record manual actions, security issues, removals, ownership and URL-inspection evidence.
- Use protocol version 1.0 for one original game-specific study; retain session log, conditions, captures and counterexamples.
- Resolve whether privacy-safe first-party measurement is needed before adding any analytics.
- Re-run protected and launch-mode gates after any content change; keep production protected until every launch gate passes.

### 31–60 days

- Publish the first completed play study only if its evidence bundle, rights review, named author and correction owner pass.
- Review protocol fields against the real study: remove unused ceremony and add any missing condition that changed a claim.
- Decide `/ownership/` using GSC/backlink/referrer evidence; merge only to the exact equivalent page.
- Review external source links and update dates.

### 61–90 days

- Complete a second play study in a meaningfully different system or platform condition.
- Evaluate whether Field Notes warrants subtopics; create none until at least two assets demonstrate a stable reader need.
- Compare GSC page-query pairs for cannibalization, snippet mismatch and unexpected legacy demand after sufficient data exists.
- Reassess monthly editorial capacity. If the documented cadence is missed twice, stop expansion and preserve the site as a smaller archive of current original work.

## Verification record

- Protected build: 21 pages, Astro check with 0 errors, 0 warnings and 0 hints.
- Protected safeguards: 84 checks passed; global noindex, robots disallow and absent sitemap preserved.
- Simulated launch safeguards: 150 checks passed; exactly seven canonical indexable 200 pages in the automatic sitemap and every excluded route still noindex.
- Static link graph: 21 canonical documents and 258 internal links checked; no broken internal link or indexable orphan.
- External sources: all six retained source URLs returned HTTP 200 on 22 August 2026. One former Software Preservation Network citation was removed with its dependent paragraph after its TLS certificate failed validation.
- Browser QA: desktop and 390 px mobile passed with no console errors, failed requests, broken images or horizontal overflow. The protocol emits WebPage, Article and visible BreadcrumbList schema.
- Accessibility: 16 desktop/mobile route scans returned no Axe violations; skip link, mobile menu open/close/Escape and focus return passed by keyboard.
- Performance: unthrottled local Playwright lab check only, not field CWV. Homepage LCP measured 128 ms desktop and 72 ms mobile; CLS 0.0041 desktop and 0 mobile.
- Visual review: protocol hero, hierarchy, breadcrumb, byline and mobile reflow were inspected from rendered screenshots. The first scan found one low-contrast label; it was corrected and Axe passed on rerun.
- In-app Browser initialization failed because its trusted Node process exited. The established Playwright/Axe fallback was used and documented rather than treating the browser failure as a page failure.
- Search Console: NOT PROVEN. No authenticated Search Console connector or project-local reproducible connection was available.