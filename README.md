# Nightmare Mode

Independent games and culture publication at [nightmaremode.net](https://nightmaremode.net), established under new ownership in 2026.

The current operation does not claim the former newsroom, contributors, article bodies, artwork, comments, logos, endorsements, reputation, or uninterrupted legal identity. Original current work is visibly dated and credited.

## Editorial model

Nightmare Mode publishes three inspectable forms of work:

- **Essays** — sustained, source-led arguments
- **Field Notes** — documented evidence from play, when that evidence exists
- **Conversations** — present-day exchanges published with consent

The minimum operating rhythm is one substantive essay, play study, or sourced analysis per month. Matthias Ramahi is the operator, responsible publisher, editor, and correction owner. Full rules live at `/editorial-policy/`.

## Indexing contract

`PUBLIC_SITE_INDEXABLE` is the single environment gate.

- Without `PUBLIC_SITE_INDEXABLE=true`, every page is `noindex, nofollow`, robots blocks crawling, and no sitemap is generated.
- With `PUBLIC_SITE_INDEXABLE=true`, the five routes in `src/data/indexable-routes.mjs` are indexable and emitted through `@astrojs/sitemap`.
- Legal, rights, utility, empty-section, 404, and legacy routes remain `noindex` and are excluded from the sitemap.
- `src/data/legacy-url-actions.ts` is the authoritative reviewed action manifest for priority historical URLs.

## Rights and provenance safeguards

- Former article bodies, summaries-as-substitutes, media, identities, and endorsements are not reused without documented rights.
- No legacy path redirects to the homepage or unrelated content.
- No Contextter, partner-network, reciprocal, or portfolio-link quota exists.
- New editorial work exposes sources, limitations, authorship responsibility, conflicts, substantial AI use, and a correction route.
- The launch essay makes no fabricated play or archive-testing claim.

Read `AGENTS.md`, `PROJECT_BRIEF.md`, `src/data/source-evidence.ts`, and `src/data/legacy-url-actions.ts` before material changes.

## Local development

```sh
corepack pnpm install
corepack pnpm dev
```

## Reproducible verification

Protected build:

```powershell
Remove-Item Env:PUBLIC_SITE_INDEXABLE -ErrorAction SilentlyContinue
corepack pnpm build
corepack pnpm qa:safeguards
```

Launch build:

```powershell
$env:PUBLIC_SITE_INDEXABLE = "true"
corepack pnpm build
corepack pnpm qa:safeguards
```

Rendered checks, with a preview server running:

```powershell
corepack pnpm qa:links
corepack pnpm qa
```

The visual runner accepts `QA_BASE_URL` and `QA_OUTPUT_DIR`.

## Design

The live design is a restrained contemporary editorial system using local fonts and original monochrome artwork. Design explorations and QA screenshots are retained locally under `design/`, but intentionally excluded from the public source repository because they contain obsolete concepts and large generated artifacts.
