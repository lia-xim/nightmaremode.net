export const siteConfig = {
  name: "Nightmare Mode",
  canonicalHost: "https://nightmaremode.net",
  language: "en",
  description:
    "An independent, evidence-led atlas of which games remain playable when stores, logins and servers disappear.",
  establishedYear: 2026,
  ownershipDisclosure:
    "A separate publication established in 2026 after the domain changed hands. Former contributors do not automatically participate in or endorse it.",
  indexableEnvironmentVariable: "PUBLIC_SITE_INDEXABLE",
  analytics: {
    enabled: true,
    scriptUrl: "https://analytics.contextter.com/script.js",
    websiteId: "56f584d7-b9de-4871-af37-c2c829ef9620",
    domains: "nightmaremode.net",
  },
  contactDeliveryEnabled: false,
} as const;

export type SiteConfig = typeof siteConfig;
