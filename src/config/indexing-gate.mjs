export const GSC_INDEX_GATE_CONFIRMATION = "manual-actions-security-removals-crawl-index-verified";

export const isIndexingEnabled = (environment = {}) =>
  environment.PUBLIC_SITE_INDEXABLE === "true"
  && environment.PUBLIC_GSC_INDEX_GATE_CONFIRMED === GSC_INDEX_GATE_CONFIRMATION;