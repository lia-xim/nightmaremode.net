# Nightmare Mode 2026

## Purpose

Nightmare Mode is a new, independent publication for games and interactive culture. Its value comes from original essays, documented play studies, present-day conversations, and transparent methods—not from inherited rankings, former identities, or a portfolio link.

## Audience

- Readers of serious games criticism
- Indie-game and game-design communities
- Researchers of interactive narrative, audiovisual form, labor, platforms, and digital culture

## Visual thesis

The interface is a calm contemporary editorial journal: true white space, graphite typography, one restrained burgundy accent, an expressive but readable serif voice, quiet sans-serif navigation, fine rules, and commissioned monochrome architectural studies. Hierarchy comes from type, proportion, and space rather than grids, technical labels, badges, cards, or control-room ornament.

The website should feel credible beside a serious cultural or literary review. Safeguards remain structural and editorial; they are not treated as a decorative theme. Ownership and provenance are visible in plain language without dominating the reading experience.

## Product model

- Essays: sustained arguments
- Field notes: evidence captured during play
- Conversations: present-day interviews and exchanges with consent
- Provenance layer: visible `Who / How / Why` disclosure on every published piece
- Archive ledger: URL-level rights and intent status without copied article bodies

## Non-goals

- Generic gaming news, scores, listicles, affiliate pages, or trend-chasing output
- A resurrection of the former newsroom or its visual identity
- A Contextter case study, partner network, commercial funnel, or link source
- Bulk restoration, AI rewriting, or blanket redirection of historical URLs
- Publishing conclusions, metrics, authors, testimonials, or research claims before the work exists
- Industrial dashboards, pseudo-technical telemetry, oversized condensed typography, or decorative status UI

## Evidence boundaries

- `src/data/source-evidence.ts` records sources and rights status.
- `src/data/legacy-url-actions.ts` records legacy URL decisions.
- Former titles may appear only as sourced bibliographic facts on protected reference pages.
- Generated artwork must be original, non-infringing, and recorded in the evidence manifest.
- New articles need a named author/editor, method, source list, conflict disclosure, AI-use disclosure, and correction route.

## Launch gates

The site remains `noindex, nofollow` and omitted from the sitemap until all of these are true:

1. A named legal operator, editor, correction owner, and six-month operating plan are accepted.
2. Former-operator cooperation and contributor-rights boundaries are documented, or launch scope is explicitly narrowed to rights-safe new work.
3. Every priority legacy URL has a reviewed action and tested response.
4. Gambling, spam, parking, and unrelated historical cohorts are enumerated and retired safely.
5. Search Console manual actions, removals, security issues, index state, and crawl behavior are checked.
6. Canonicals, robots, sitemap, status codes, broken links, accessibility, structured data, and forbidden claims pass locally and on the deployed host.
7. No cross-portfolio link is required for the publication to be useful.
## Minimum viable launch decision — 22 August 2026

The owner explicitly authorized the independent publication and search indexing once the content, legal, Git, and live gates pass. The launch scope is narrowed to rights-safe new work: Matthias Ramahi is operator, responsible publisher, editor, and correction owner; the minimum cadence is one substantive original asset per month; and two missed consecutive releases pause publication.

The launch asset is the original, source-led essay `/essays/a-game-is-more-than-its-files/`. It states its sources, evidence boundary, responsible editor, and AI-production assistance and makes no first-hand play claim. The six priority legacy decisions are owner-reviewed in `src/data/legacy-url-actions.ts`; three remain limited `noindex_200` bibliographic records and three return a real `404`. Parking, unrelated, and spam cohorts also default to `404` without redirects or sitemap inclusion.

Google Search Console manual actions, Security Issues, temporary removals, and property-level crawl reports are **UNKNOWN** because no reproducible Search Console connection was available during launch preparation. This unknown is reported, not inferred as clean. The launch contract therefore relies on live HTTP, robots, sitemap, canonical, status, link, render, console, HTTPS, and host-redirect evidence and requires Search Console to be connected as a post-launch operational task.

`PUBLIC_SITE_INDEXABLE=true` is allowed only in production after the repository and local launch build pass. Preview and unconfigured environments remain protected by default. Every deployment must repeat the live gate.
