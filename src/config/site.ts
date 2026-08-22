export const siteConfig = {
  name: "Nightmare Mode",
  canonicalHost: "https://nightmaremode.net",
  language: "en",
  description:
    "Independent criticism, play studies and conversations about games and interactive culture.",
  establishedYear: 2026,
  ownershipDisclosure:
    "A separate publication established in 2026 after the domain changed hands. Former contributors do not automatically participate in or endorse it.",
  indexableEnvironmentVariable: "PUBLIC_SITE_INDEXABLE",
  analyticsEnabled: false,
  contactDeliveryEnabled: false,
} as const;

export type SiteConfig = typeof siteConfig;
