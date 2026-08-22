export const pageRegistry = Object.freeze([
  { route: "/", indexable: true, cluster: "publication", action: "strengthen", primaryJob: "Understand what Nightmare Mode publishes and reach the latest original work." },
  { route: "/about/", indexable: true, cluster: "governance", action: "keep", primaryJob: "Verify the publication purpose, operator, cadence and independence boundary." },
  { route: "/editorial-policy/", indexable: true, cluster: "governance", action: "keep", primaryJob: "Understand the editorial, evidence, AI-use and correction rules behind published work." },
  { route: "/essays/", indexable: true, cluster: "essays", action: "strengthen", primaryJob: "Browse substantive source-led arguments published by the current operation." },
  { route: "/essays/a-game-is-more-than-its-files/", indexable: true, cluster: "essays", action: "strengthen", primaryJob: "Read a source-led analysis of what game preservation can and cannot establish." },
  { route: "/field-notes/", indexable: true, cluster: "play-studies", action: "strengthen", primaryJob: "Find documented play-study methods and observation-led field notes." },
  { route: "/field-notes/a-dark-room-first-four-minutes/", indexable: true, cluster: "play-studies", action: "create", primaryJob: "Inspect a timed controlled study of how A Dark Room reveals its opening actions and uncertainty." },
  { route: "/field-notes/play-study-protocol/", indexable: true, cluster: "play-studies", action: "create", primaryJob: "Use a reproducible worksheet to separate gameplay observation, inference and evidence limits." },
  { route: "/404/", indexable: false, cluster: "utility", action: "keep-noindex", primaryJob: "Help a visitor recover from a genuinely missing URL." },
  { route: "/about/new-ownership/", indexable: false, cluster: "governance", action: "keep-noindex", primaryJob: "Verify exactly what the 2026 ownership change does and does not transfer." },
  { route: "/archive/", indexable: false, cluster: "legacy", action: "keep-noindex", primaryJob: "Explain how reviewed historical URLs are handled without republishing former work." },
  { route: "/contact/", indexable: false, cluster: "utility", action: "keep-noindex", primaryJob: "Reach the current operator for editorial or general enquiries." },
  { route: "/conversations/", indexable: false, cluster: "conversations", action: "hold", primaryJob: "State the publication gate for future consent-based conversations." },
  { route: "/datenschutz/", indexable: false, cluster: "legal", action: "keep-noindex", primaryJob: "Explain the site's actual privacy and data-processing behaviour." },
  { route: "/discovery/how-indie-games-get-discovered-in-2026/", indexable: false, cluster: "research-holds", action: "hold", primaryJob: "Record the evidence gate for an unpublished discovery study." },
  { route: "/history/", indexable: false, cluster: "legacy", action: "keep-noindex", primaryJob: "Describe the domain-history boundary without claiming newsroom continuity." },
  { route: "/impressum/", indexable: false, cluster: "legal", action: "keep-noindex", primaryJob: "Identify the legal operator and responsible editor." },
  { route: "/ownership/", indexable: false, cluster: "governance", action: "merge-after-data", primaryJob: "Direct readers to the detailed new-ownership boundary while historical demand is checked." },
  { route: "/rights-contact/", indexable: false, cluster: "legal", action: "keep-noindex", primaryJob: "Submit rights, attribution and correction concerns to the current operator." },
  { route: "/2012/01/metal-gear-solids-postmodern-legacy-part-1-15146/", indexable: false, cluster: "legacy", action: "bibliographic-noindex", primaryJob: "Preserve rights-safe bibliographic facts about one reviewed historical URL." },
  { route: "/2012/03/unmanned-a-talk-with-molleindustria-about-the-politics-of-war-games-16946/", indexable: false, cluster: "legacy", action: "bibliographic-noindex", primaryJob: "Preserve rights-safe bibliographic facts about one reviewed historical URL." },
  { route: "/2012/11/creation-under-capitalism-23422/", indexable: false, cluster: "legacy", action: "bibliographic-noindex", primaryJob: "Preserve rights-safe bibliographic facts about one reviewed historical URL." },
]);

export const indexableRoutes = Object.freeze(
  pageRegistry.filter((page) => page.indexable).map((page) => page.route),
);
