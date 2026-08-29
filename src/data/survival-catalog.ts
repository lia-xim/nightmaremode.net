import type { Locale } from "@/i18n";
import type { SurvivalCaseId } from "@/data/survival-atlas";

export type ResearchLane =
  | "offline-baseline"
  | "community-hosting"
  | "publisher-login"
  | "local-and-server"
  | "shutdown"
  | "offline-patch"
  | "delisted"
  | "server-only";

export type CatalogRecordState = "reviewed" | "research-pending";
export type SurvivalOutlook = "positive" | "mixed" | "negative";

export interface SurvivalCatalogEntry {
  id: string;
  title: string;
  originalRelease: number;
  researchLane: ResearchLane;
  recordState: CatalogRecordState;
  reviewedCaseId?: SurvivalCaseId;
}

/**
 * A bounded research corpus, not a list of survival verdicts.
 *
 * Pending entries expose neutral identity metadata, an explicitly provisional
 * outlook and the questions the editorial review should investigate. Their
 * research dossiers remain noindex and make no final playability claim until
 * the full evidence gate is complete.
 */
export const survivalCatalog = [
  { id: "doom-1993", title: "Doom", originalRelease: 1993, researchLane: "offline-baseline", recordState: "research-pending" },
  { id: "quake", title: "Quake", originalRelease: 1996, researchLane: "community-hosting", recordState: "research-pending" },
  { id: "diablo", title: "Diablo", originalRelease: 1997, researchLane: "local-and-server", recordState: "research-pending" },
  { id: "ultima-online", title: "Ultima Online", originalRelease: 1997, researchLane: "server-only", recordState: "research-pending" },
  { id: "half-life", title: "Half-Life", originalRelease: 1998, researchLane: "offline-baseline", recordState: "research-pending" },
  { id: "starsiege-tribes", title: "Starsiege: Tribes", originalRelease: 1998, researchLane: "community-hosting", recordState: "research-pending" },
  { id: "everquest", title: "EverQuest", originalRelease: 1999, researchLane: "server-only", recordState: "research-pending" },
  { id: "quake-iii-arena", title: "Quake III Arena", originalRelease: 1999, researchLane: "community-hosting", recordState: "research-pending" },
  { id: "counter-strike", title: "Counter-Strike", originalRelease: 2000, researchLane: "community-hosting", recordState: "research-pending" },
  { id: "diablo-ii", title: "Diablo II", originalRelease: 2000, researchLane: "local-and-server", recordState: "research-pending" },
  { id: "phantasy-star-online", title: "Phantasy Star Online", originalRelease: 2000, researchLane: "shutdown", recordState: "research-pending" },
  { id: "anarchy-online", title: "Anarchy Online", originalRelease: 2001, researchLane: "server-only", recordState: "research-pending" },
  { id: "neverwinter-nights", title: "Neverwinter Nights", originalRelease: 2002, researchLane: "community-hosting", recordState: "research-pending" },
  { id: "battlefield-1942", title: "Battlefield 1942", originalRelease: 2002, researchLane: "community-hosting", recordState: "research-pending" },
  { id: "unreal-tournament-2004", title: "Unreal Tournament 2004", originalRelease: 2004, researchLane: "community-hosting", recordState: "research-pending" },
  { id: "world-of-warcraft", title: "World of Warcraft", originalRelease: 2004, researchLane: "server-only", recordState: "research-pending" },
  { id: "guild-wars", title: "Guild Wars", originalRelease: 2005, researchLane: "server-only", recordState: "research-pending" },
  { id: "battlefield-2", title: "Battlefield 2", originalRelease: 2005, researchLane: "community-hosting", recordState: "research-pending" },
  { id: "trackmania-nations", title: "TrackMania Nations", originalRelease: 2006, researchLane: "local-and-server", recordState: "research-pending" },
  { id: "test-drive-unlimited", title: "Test Drive Unlimited", originalRelease: 2006, researchLane: "local-and-server", recordState: "research-pending" },
  { id: "hellgate-london", title: "Hellgate: London", originalRelease: 2007, researchLane: "shutdown", recordState: "research-pending" },
  { id: "team-fortress-2", title: "Team Fortress 2", originalRelease: 2007, researchLane: "community-hosting", recordState: "research-pending" },
  { id: "burnout-paradise", title: "Burnout Paradise", originalRelease: 2008, researchLane: "local-and-server", recordState: "research-pending" },
  { id: "left-4-dead", title: "Left 4 Dead", originalRelease: 2008, researchLane: "community-hosting", recordState: "research-pending" },
  { id: "demons-souls", title: "Demon's Souls", originalRelease: 2009, researchLane: "local-and-server", recordState: "research-pending" },
  { id: "league-of-legends", title: "League of Legends", originalRelease: 2009, researchLane: "server-only", recordState: "research-pending" },
  { id: "minecraft-java", title: "Minecraft: Java Edition", originalRelease: 2011, researchLane: "community-hosting", recordState: "research-pending" },
  { id: "darkspore", title: "Darkspore", originalRelease: 2011, researchLane: "shutdown", recordState: "research-pending" },
  { id: "star-wars-the-old-republic", title: "Star Wars: The Old Republic", originalRelease: 2011, researchLane: "server-only", recordState: "research-pending" },
  { id: "diablo-iii", title: "Diablo III", originalRelease: 2012, researchLane: "publisher-login", recordState: "research-pending" },
  { id: "simcity-2013", title: "SimCity", originalRelease: 2013, researchLane: "offline-patch", recordState: "research-pending" },
  { id: "final-fantasy-xiv-arr", title: "Final Fantasy XIV: A Realm Reborn", originalRelease: 2013, researchLane: "server-only", recordState: "research-pending" },
  { id: "grand-theft-auto-online", title: "Grand Theft Auto Online", originalRelease: 2013, researchLane: "server-only", recordState: "research-pending" },
  { id: "hearthstone", title: "Hearthstone", originalRelease: 2014, researchLane: "server-only", recordState: "research-pending" },
  { id: "destiny", title: "Destiny", originalRelease: 2014, researchLane: "server-only", recordState: "research-pending" },
  { id: "driveclub", title: "Driveclub", originalRelease: 2014, researchLane: "local-and-server", recordState: "research-pending" },
  { id: "the-crew", title: "The Crew", originalRelease: 2014, researchLane: "shutdown", recordState: "reviewed", reviewedCaseId: "the-crew" },
  { id: "wildstar", title: "WildStar", originalRelease: 2014, researchLane: "shutdown", recordState: "research-pending" },
  { id: "evolve", title: "Evolve", originalRelease: 2015, researchLane: "offline-patch", recordState: "research-pending" },
  { id: "cities-skylines", title: "Cities: Skylines", originalRelease: 2015, researchLane: "offline-baseline", recordState: "research-pending" },
  { id: "metal-gear-solid-v", title: "Metal Gear Solid V: The Phantom Pain", originalRelease: 2015, researchLane: "local-and-server", recordState: "research-pending" },
  { id: "rainbow-six-siege", title: "Tom Clancy's Rainbow Six Siege", originalRelease: 2015, researchLane: "publisher-login", recordState: "research-pending" },
  { id: "rocket-league", title: "Rocket League", originalRelease: 2015, researchLane: "delisted", recordState: "research-pending" },
  { id: "battleborn", title: "Battleborn", originalRelease: 2016, researchLane: "shutdown", recordState: "research-pending" },
  { id: "overwatch", title: "Overwatch", originalRelease: 2016, researchLane: "shutdown", recordState: "research-pending" },
  { id: "lawbreakers", title: "LawBreakers", originalRelease: 2017, researchLane: "shutdown", recordState: "research-pending" },
  { id: "fortnite", title: "Fortnite", originalRelease: 2017, researchLane: "server-only", recordState: "research-pending" },
  { id: "gran-turismo-sport", title: "Gran Turismo Sport", originalRelease: 2017, researchLane: "offline-patch", recordState: "research-pending" },
  { id: "the-crew-2", title: "The Crew 2", originalRelease: 2018, researchLane: "offline-patch", recordState: "reviewed", reviewedCaseId: "the-crew-2" },
  { id: "fallout-76", title: "Fallout 76", originalRelease: 2018, researchLane: "server-only", recordState: "research-pending" },
] as const satisfies readonly SurvivalCatalogEntry[];

export const researchLaneLabels: Record<ResearchLane, { en: string; de: string }> = {
  "offline-baseline": { en: "Offline baseline", de: "Offline-Basisfall" },
  "community-hosting": { en: "Community hosting", de: "Community-Hosting" },
  "publisher-login": { en: "Publisher account", de: "Publisher-Konto" },
  "local-and-server": { en: "Local game + services", de: "Lokales Spiel + Dienste" },
  shutdown: { en: "Shutdown case", de: "Abschaltungsfall" },
  "offline-patch": { en: "Offline patch", de: "Offline-Patch" },
  delisted: { en: "Delisting", de: "Delisting" },
  "server-only": { en: "Server-only risk", de: "Reines Serverrisiko" },
};

const laneOutlook: Record<ResearchLane, SurvivalOutlook> = {
  "offline-baseline": "positive",
  "community-hosting": "positive",
  "publisher-login": "mixed",
  "local-and-server": "mixed",
  shutdown: "negative",
  "offline-patch": "positive",
  delisted: "mixed",
  "server-only": "negative",
};

export const outlookLabels: Record<SurvivalOutlook, { en: string; de: string; icon: string }> = {
  positive: { en: "Looks resilient", de: "Eher robust", icon: "👍" },
  mixed: { en: "Mixed outlook", de: "Gemischtes Bild", icon: "↔" },
  negative: { en: "At risk", de: "Eher gefährdet", icon: "👎" },
};

export function catalogLaneLabel(lane: ResearchLane, locale: Locale): string {
  return researchLaneLabels[lane][locale];
}

export function catalogOutlook(entry: SurvivalCatalogEntry): SurvivalOutlook {
  if (entry.reviewedCaseId === "the-crew") return "negative";
  if (entry.reviewedCaseId === "the-crew-2") return "positive";
  return laneOutlook[entry.researchLane];
}

export function catalogOutlookLabel(outlook: SurvivalOutlook, locale: Locale): string {
  return outlookLabels[outlook][locale];
}

export function catalogCasePath(entry: SurvivalCatalogEntry, locale: Locale): string {
  const prefix = locale === "de" ? "/de/survival-atlas/spiele" : "/survival-atlas/games";
  return `${prefix}/${entry.id}/`;
}

export function catalogOutlookRationale(entry: SurvivalCatalogEntry, locale: Locale): string {
  const outlook = catalogOutlook(entry);
  const copy = {
    en: {
      positive: `${entry.title} enters the queue with a promising preservation hypothesis because its research lane may leave a local or community-controlled path. That is not yet a verified game-specific finding.`,
      mixed: `${entry.title} enters the queue with a mixed hypothesis: local files may survive while accounts, services or particular modes remain dependent. The boundary has not yet been verified.`,
      negative: `${entry.title} enters the queue as an at-risk case because its research lane centres on an operator-controlled service or shutdown. Its exact current playability has not yet been verified.`,
    },
    de: {
      positive: `${entry.title} startet mit einer eher positiven Erhaltungsannahme: Das Prüffeld könnte einen lokalen oder von der Community kontrollierbaren Weg offenlassen. Das ist noch kein verifizierter Befund zu diesem Spiel.`,
      mixed: `${entry.title} startet mit einer gemischten Annahme: Lokale Dateien könnten erhalten bleiben, während Accounts, Dienste oder einzelne Modi abhängig bleiben. Diese Grenze ist noch nicht geprüft.`,
      negative: `${entry.title} startet als gefährdeter Fall, weil das Prüffeld einen betreiberkontrollierten Dienst oder eine Abschaltung betrifft. Die heutige Spielbarkeit ist noch nicht verifiziert.`,
    },
  } as const;
  return copy[locale][outlook];
}

export function catalogResearchQuestions(entry: SurvivalCatalogEntry, locale: Locale): string[] {
  const laneQuestion: Record<ResearchLane, { en: string; de: string }> = {
    "offline-baseline": { en: "Does a clean installation start and reach its core mode without an account or network connection?", de: "Startet eine saubere Installation ohne Account oder Netzwerk bis in den Kernmodus?" },
    "community-hosting": { en: "Can players replace the original network path with dedicated or community-operated infrastructure?", de: "Können Spieler die ursprüngliche Netzwerkinfrastruktur durch eigene oder Community-Server ersetzen?" },
    "publisher-login": { en: "Is publisher authentication required only for acquisition, or also every time the game starts?", de: "Wird die Publisher-Authentifizierung nur beim Erwerb oder bei jedem Spielstart benötigt?" },
    "local-and-server": { en: "Which modes and saves remain local, and which functions stop with the official services?", de: "Welche Modi und Spielstände bleiben lokal, und welche Funktionen enden mit den offiziellen Diensten?" },
    shutdown: { en: "What exactly remained accessible after the official shutdown, if anything?", de: "Was blieb nach der offiziellen Abschaltung tatsächlich zugänglich?" },
    "offline-patch": { en: "Which version introduced the offline path, and what still depends on a live service?", de: "Welche Version führte den Offline-Weg ein, und was bleibt weiterhin dienstabhängig?" },
    delisted: { en: "Can previous owners still download, install and launch the delisted game?", de: "Können frühere Besitzer das delistete Spiel weiterhin herunterladen, installieren und starten?" },
    "server-only": { en: "Does any documented preservation path exist outside the operator-controlled service?", de: "Existiert ein belegter Erhaltungsweg außerhalb des betreiberkontrollierten Dienstes?" },
  };
  const common = locale === "de"
    ? [
        "Welche Installation, Edition, Plattform und Version wird geprüft?",
        "Welche Store-, Account-, Login- und Serverabhängigkeiten sind zwingend?",
        "Was passiert mit Kernspiel, Spielstand und Online-Funktionen bei jedem einzelnen Ausfall?",
        "Welche Aussage stützt eine Primärquelle, welche ein eigener Test und was bleibt unbekannt?",
      ]
    : [
        "Which installation, edition, platform and version is being reviewed?",
        "Which store, account, login and server dependencies are mandatory?",
        "What happens to the core game, saves and online features under each individual failure?",
        "Which claim is supported by a primary source, which by direct testing, and what remains unknown?",
      ];
  return [laneQuestion[entry.researchLane][locale], ...common];
}
