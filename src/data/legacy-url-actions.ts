export type LegacyAction = "restore_200" | "redirect_301" | "redirect_308" | "404" | "410" | "noindex_200" | "hold";

export interface LegacyUrlAction {
  sourceUrl: string;
  normalizedPath: string;
  formerTitle: string;
  formerTopic: string;
  firstSeen: string | null;
  lastSeen: string | null;
  archiveEvidence: string;
  referringDomains: number | null;
  backlinkQuality: "unknown" | "mixed" | "supported";
  anchors: string[];
  cleanSpamClass: "editorial" | "parking" | "unrelated" | "spam" | "unknown";
  currentDemand: "unknown" | "none-recorded" | "supported";
  evidenceSources: string[];
  rightsStatus: "unresolved" | "licensed" | "owned";
  action: LegacyAction;
  targetUrl: string | null;
  equivalenceReason: string;
  reviewer: string;
  approvedAt: string;
  lastTestedAt: string;
}

export const legacyManifestVersion = "2026-08-22.2";

const dossier = "Central nightmaremode.net domain dossier and owned-domain recovery handoff, reviewed 22 August 2026";
const recoveryEvidence = "Owned-domain recovery evidence dated 22 August 2026";

export const legacyUrlActions: LegacyUrlAction[] = [
  {
    sourceUrl: "https://nightmaremode.net/2012/11/creation-under-capitalism-23422/",
    normalizedPath: "/2012/11/creation-under-capitalism-23422/",
    formerTitle: "Creation Under Capitalism and the Twine Revolution",
    formerTopic: "Former games/culture editorial; body and contributor rights unresolved",
    firstSeen: "2012-11",
    lastSeen: null,
    archiveEvidence: "Former title and URL are recorded in the central dossier; no article body is used.",
    referringDomains: null,
    backlinkQuality: "unknown",
    anchors: [],
    cleanSpamClass: "editorial",
    currentDemand: "unknown",
    evidenceSources: [dossier, recoveryEvidence],
    rightsStatus: "unresolved",
    action: "noindex_200",
    targetUrl: null,
    equivalenceReason: "Limited bibliographic and rights-contact record only; no former body, summary, author identity or media is reproduced.",
    reviewer: "Matthias Ramahi",
    approvedAt: "2026-08-22",
    lastTestedAt: "2026-08-22",
  },
  {
    sourceUrl: "https://nightmaremode.net/2012/01/metal-gear-solids-postmodern-legacy-part-1-15146/",
    normalizedPath: "/2012/01/metal-gear-solids-postmodern-legacy-part-1-15146/",
    formerTitle: "Metal Gear Solid's Postmodern Legacy",
    formerTopic: "Former games/culture editorial; body and contributor rights unresolved",
    firstSeen: "2012-01",
    lastSeen: null,
    archiveEvidence: "Former title and URL are recorded in the central dossier; no article body is used.",
    referringDomains: null,
    backlinkQuality: "unknown",
    anchors: [],
    cleanSpamClass: "editorial",
    currentDemand: "unknown",
    evidenceSources: [dossier, recoveryEvidence],
    rightsStatus: "unresolved",
    action: "noindex_200",
    targetUrl: null,
    equivalenceReason: "Limited bibliographic and rights-contact record only; no former body, summary, author identity or media is reproduced.",
    reviewer: "Matthias Ramahi",
    approvedAt: "2026-08-22",
    lastTestedAt: "2026-08-22",
  },
  {
    sourceUrl: "https://nightmaremode.net/2012/03/unmanned-a-talk-with-molleindustria-about-the-politics-of-war-games-16946/",
    normalizedPath: "/2012/03/unmanned-a-talk-with-molleindustria-about-the-politics-of-war-games-16946/",
    formerTitle: "Unmanned: A Talk With Molleindustria About the Politics of War Games",
    formerTopic: "Former games/culture interview; body, participant and contributor rights unresolved",
    firstSeen: "2012-03",
    lastSeen: null,
    archiveEvidence: "Former title and URL are recorded in the central dossier; no interview body is used.",
    referringDomains: null,
    backlinkQuality: "unknown",
    anchors: [],
    cleanSpamClass: "editorial",
    currentDemand: "unknown",
    evidenceSources: [dossier, recoveryEvidence],
    rightsStatus: "unresolved",
    action: "noindex_200",
    targetUrl: null,
    equivalenceReason: "Limited bibliographic and rights-contact record only; no interview, summary, participant identity or media is reproduced.",
    reviewer: "Matthias Ramahi",
    approvedAt: "2026-08-22",
    lastTestedAt: "2026-08-22",
  },
  {
    sourceUrl: "https://nightmaremode.net/2011/12/the-text-says-no-why-you-cant-interpret-limbo-anyway-you-want-14521/",
    normalizedPath: "/2011/12/the-text-says-no-why-you-cant-interpret-limbo-anyway-you-want-14521/",
    formerTitle: "The Text Says No: Why You Can't Interpret Limbo Any Way You Want",
    formerTopic: "Former games/culture editorial; rights unresolved and no current intent-equivalent replacement",
    firstSeen: "2011-12",
    lastSeen: null,
    archiveEvidence: "Former title and URL are recorded in the central dossier; no article body is used.",
    referringDomains: null,
    backlinkQuality: "unknown",
    anchors: [],
    cleanSpamClass: "editorial",
    currentDemand: "unknown",
    evidenceSources: [dossier, recoveryEvidence],
    rightsStatus: "unresolved",
    action: "404",
    targetUrl: null,
    equivalenceReason: "No licensed body or independently produced intent-equivalent replacement exists; the real not-found response avoids a misleading redirect.",
    reviewer: "Matthias Ramahi",
    approvedAt: "2026-08-22",
    lastTestedAt: "2026-08-22",
  },
  {
    sourceUrl: "https://nightmaremode.net/2011/10/heavenly-swords-thematic-resonacne-12048/",
    normalizedPath: "/2011/10/heavenly-swords-thematic-resonacne-12048/",
    formerTitle: "Heavenly Sword's Thematic Resonance",
    formerTopic: "Former games/culture editorial; rights unresolved and no current intent-equivalent replacement",
    firstSeen: "2011-10",
    lastSeen: null,
    archiveEvidence: "Former title and URL are recorded in the central dossier; no article body is used.",
    referringDomains: null,
    backlinkQuality: "unknown",
    anchors: [],
    cleanSpamClass: "editorial",
    currentDemand: "unknown",
    evidenceSources: [dossier, recoveryEvidence],
    rightsStatus: "unresolved",
    action: "404",
    targetUrl: null,
    equivalenceReason: "No licensed body or independently produced intent-equivalent replacement exists; the real not-found response avoids a misleading redirect.",
    reviewer: "Matthias Ramahi",
    approvedAt: "2026-08-22",
    lastTestedAt: "2026-08-22",
  },
  {
    sourceUrl: "https://nightmaremode.net/2011/11/i-aint-afraid-of-no-phantasmaburbia-13459/",
    normalizedPath: "/2011/11/i-aint-afraid-of-no-phantasmaburbia-13459/",
    formerTitle: "I Ain't Afraid of No Phantasmaburbia",
    formerTopic: "Former games/culture editorial; rights unresolved and no current intent-equivalent replacement",
    firstSeen: "2011-11",
    lastSeen: null,
    archiveEvidence: "Former title and URL are recorded in the central dossier; no article body is used.",
    referringDomains: null,
    backlinkQuality: "unknown",
    anchors: [],
    cleanSpamClass: "editorial",
    currentDemand: "unknown",
    evidenceSources: [dossier, recoveryEvidence],
    rightsStatus: "unresolved",
    action: "404",
    targetUrl: null,
    equivalenceReason: "No licensed body or independently produced intent-equivalent replacement exists; the real not-found response avoids a misleading redirect.",
    reviewer: "Matthias Ramahi",
    approvedAt: "2026-08-22",
    lastTestedAt: "2026-08-22",
  },
];

export const legacyCohortActions = [
  { phase: "Parking/sale", observed: "2016", action: "404", reason: "Not part of the current publication and no intent-equivalent page exists." },
  { phase: "Unrelated publishing", observed: "2017 and 2019", action: "404", reason: "Not part of the current publication and no intent-equivalent page exists." },
  { phase: "Gambling/spam", observed: "2021–2025", action: "404", reason: "Spam paths are excluded from content, redirects and the sitemap." },
] as const;
