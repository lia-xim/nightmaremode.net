export type EvidenceStatus = "verified" | "supported" | "generated" | "unresolved";

export interface SourceEvidence {
  id: string;
  subject: string;
  source: string;
  status: EvidenceStatus;
  rights: "owned" | "licensed" | "public-fact" | "unresolved";
  note: string;
}

export const sourceEvidence: SourceEvidence[] = [
  {
    id: "portfolio-ownership",
    subject: "Current ownership of nightmaremode.net",
    source: "Central DomainPortfolio ownership record",
    status: "supported",
    rights: "owned",
    note: "Ownership is recorded from the owner's explicit confirmation; registrar receipt details remain incomplete.",
  },
  {
    id: "former-publication-history",
    subject: "Former games-criticism publication and contributor history",
    source: "Central domain dossier and cited external archive research",
    status: "supported",
    rights: "public-fact",
    note: "Bibliographic context does not grant rights to article bodies, media, logos, comments, or contributor identities.",
  },
  {
    id: "hero-art-2026",
    subject: "Monochrome architectural studies used by the independent 2026 publication",
    source: "OpenAI ImageGen outputs exec-b30cd2e9-803c-4e1d-8623-f3feff21afae.png and exec-9877be71-9ba4-4482-a664-525d839b4a31.png",
    status: "generated",
    rights: "owned",
    note: "Original non-infringing artwork generated for this project; neither image depicts a recognizable game or former site asset.",
  },
  {
    id: "field-and-archive-art-2026",
    subject: "Field-study and archive illustrations used on current pages",
    source: "Local 2026 project assets nightmare-field-study.png and legacy-archive.png; generator execution identifiers were not retained",
    status: "generated",
    rights: "owned",
    note: "Original abstract project artwork; it depicts no recognizable game, former logo, former article media, or contributor likeness.",
  },
  {
    id: "launch-essay-sources",
    subject: "2026 launch essay on video game preservation",
    source: "VGHF/SPN 2023 reissue survey, Library of Congress 2025–2026 formats statement, SPN emulation guidance, and VGHF Source Project",
    status: "verified",
    rights: "public-fact",
    note: "Claims are bounded to four linked public sources; the essay asserts no personal play session or archive test.",
  },
  {
    id: "launch-editorial-authorship",
    subject: "Current editorial production and responsibility",
    source: "Owner launch authorization dated 22 August 2026",
    status: "verified",
    rights: "owned",
    note: "Nightmare Mode Editorial Desk byline with Matthias Ramahi as operator and responsible editor; AI-assisted drafting is disclosed on the article.",
  },
  {
    id: "legacy-article-rights",
    subject: "Former article bodies and contributor media",
    source: "No license or article-level permission recorded",
    status: "unresolved",
    rights: "unresolved",
    note: "Do not reproduce, summarize as a substitute, or present as restored work.",
  },
];
