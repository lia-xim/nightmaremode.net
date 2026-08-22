export const siteConfig = {
  name: "Nightmare Mode",
  canonicalHost: "https://nightmaremode.net",
  language: "en",
  description:
    "Independent criticism, play studies and conversations about games and interactive culture.",
  relaunchYear: 2026,
  ownershipDisclosure:
    "Rebuilt under new ownership in 2026. Former contributors do not automatically participate in or endorse this publication.",
  indexableEnvironmentVariable: "PUBLIC_SITE_INDEXABLE",
  analyticsEnabled: false,
  contactDeliveryEnabled: false,
} as const;

export type SiteConfig = typeof siteConfig;
