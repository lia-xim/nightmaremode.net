import type { Locale } from "@/i18n";

export type SurvivalCaseId = "the-crew" | "the-crew-2";
export type DependencyState = "required" | "bypassable" | "unavailable" | "not-established";
export type ResultState = "available" | "lost" | "not-established";

export interface LocalizedText {
  en: string;
  de: string;
}

export interface SurvivalSource {
  title: LocalizedText;
  publisher: string;
  url: string;
  publishedAt: string;
  relevance: LocalizedText;
}

export interface SurvivalDependency {
  id: "installation" | "store" | "publisher-login" | "game-server" | "local-save" | "single-player" | "online-features";
  label: LocalizedText;
  detail: LocalizedText;
  state: DependencyState;
}

export interface SurvivalTimelineEntry {
  date: string;
  title: LocalizedText;
  detail: LocalizedText;
}

export interface SurvivalCase {
  id: SurvivalCaseId;
  title: string;
  released: string;
  slug: string;
  answerState: "unavailable" | "offline-path";
  answer: LocalizedText;
  shortAnswer: LocalizedText;
  evidenceBoundary: LocalizedText;
  checkedAt: string;
  nextReview: string;
  platformScope: LocalizedText;
  defaultFailures: Array<"store" | "publisher-login" | "game-server" | "internet">;
  dependencies: SurvivalDependency[];
  timeline: SurvivalTimelineEntry[];
  sources: SurvivalSource[];
}

const ubisoftCrewShutdown = "https://www.ubisoft.com/en-us/game/the-crew/the-crew-2/news-updates/3u0la29yUBGBzYlwKp5QMZ";
const ubisoftCrew2Hybrid = "https://www.ubisoft.com/en-sg/news/ignt.55461/the-crew-2-hybrid-mode-is-now-available";
const ubisoftCrew2Update = "https://www.ubisoft.com/en-us/game/the-crew/the-crew-2/news-updates/7uxZ1NPu40uRsJeL4v4tj4/the-crew-2-hybrid-mode-update";

export const survivalCases: SurvivalCase[] = [
  {
    id: "the-crew",
    title: "The Crew",
    released: "2014",
    slug: "the-crew",
    answerState: "unavailable",
    answer: {
      en: "No. The publisher states that the game became inaccessible on every platform after its servers were shut down on 31 March 2024.",
      de: "Nein. Laut Publisher wurde das Spiel auf allen Plattformen unzugänglich, nachdem die Server am 31. März 2024 abgeschaltet wurden.",
    },
    shortAnswer: {
      en: "Server shutdown removed the playable game, including solo access.",
      de: "Die Serverabschaltung nahm auch den Einzelspieler-Zugang mit.",
    },
    evidenceBoundary: {
      en: "This record relies on Ubisoft's shutdown notice. We did not independently test every former platform or assess unofficial preservation projects.",
      de: "Dieser Eintrag stützt sich auf Ubisofts Abschalthinweis. Wir haben nicht jede frühere Plattform selbst getestet und keine inoffiziellen Erhaltungsprojekte bewertet.",
    },
    checkedAt: "2026-08-29",
    nextReview: "2026-11-29",
    platformScope: {
      en: "PC, Xbox 360, Xbox One, PlayStation 4, Amazon Luna and Ubisoft+ as named by Ubisoft",
      de: "PC, Xbox 360, Xbox One, PlayStation 4, Amazon Luna und Ubisoft+ laut Ubisoft",
    },
    defaultFailures: ["store", "game-server"],
    dependencies: [
      { id: "installation", label: { en: "Installed files", de: "Installierte Dateien" }, detail: { en: "Files alone do not provide access after shutdown.", de: "Die Dateien allein ermöglichen nach der Abschaltung keinen Zugang." }, state: "required" },
      { id: "store", label: { en: "Store availability", de: "Store-Verfügbarkeit" }, detail: { en: "Delisted on 14 December 2023.", de: "Am 14. Dezember 2023 aus den Stores genommen." }, state: "unavailable" },
      { id: "publisher-login", label: { en: "Publisher services", de: "Publisher-Dienste" }, detail: { en: "No publisher-supported independent access path is documented.", de: "Kein vom Publisher unterstützter unabhängiger Zugangsweg ist dokumentiert." }, state: "required" },
      { id: "game-server", label: { en: "Game server", de: "Spielserver" }, detail: { en: "Shut down on 31 March 2024.", de: "Am 31. März 2024 abgeschaltet." }, state: "unavailable" },
      { id: "single-player", label: { en: "Solo game", de: "Einzelspiel" }, detail: { en: "Publisher states the game is no longer accessible.", de: "Laut Publisher ist das Spiel nicht mehr zugänglich." }, state: "unavailable" },
      { id: "local-save", label: { en: "Independent local save", de: "Unabhängiger lokaler Spielstand" }, detail: { en: "No supported offline continuation is established by the reviewed source.", de: "Die geprüfte Quelle belegt keine unterstützte Offline-Fortsetzung." }, state: "not-established" },
      { id: "online-features", label: { en: "Online features", de: "Online-Funktionen" }, detail: { en: "Unavailable with the game servers.", de: "Mit den Spielservern nicht mehr verfügbar." }, state: "unavailable" },
    ],
    timeline: [
      { date: "2014-12", title: { en: "The Crew launches", de: "The Crew erscheint" }, detail: { en: "Ubisoft's online driving game enters service.", de: "Ubisofts Online-Rennspiel geht in Betrieb." } },
      { date: "2023-12-14", title: { en: "Delisting announced", de: "Delisting angekündigt" }, detail: { en: "All editions and virtual-currency packs are removed from online stores.", de: "Alle Editionen und Pakete virtueller Währung werden aus den Online-Stores genommen." } },
      { date: "2024-03-31", title: { en: "Servers shut down", de: "Server abgeschaltet" }, detail: { en: "Ubisoft says the game is no longer accessible on any platform.", de: "Ubisoft erklärt das Spiel auf allen Plattformen für nicht mehr zugänglich." } },
    ],
    sources: [
      {
        title: { en: "An Update on The Crew", de: "Ein Update zu The Crew" },
        publisher: "Ubisoft",
        url: ubisoftCrewShutdown,
        publishedAt: "2023-12-14",
        relevance: {
          en: "Direct publisher statement covering delisting, shutdown date, platforms and loss of access.",
          de: "Direkte Publisher-Aussage zu Delisting, Abschaltdatum, Plattformen und Zugangsverlust.",
        },
      },
    ],
  },
  {
    id: "the-crew-2",
    title: "The Crew 2",
    released: "2018",
    slug: "the-crew-2",
    answerState: "offline-path",
    answer: {
      en: "Partly. An installed, updated copy has an official offline path with a local save, while multiplayer, leaderboards and several community systems still depend on online services.",
      de: "Teilweise. Eine installierte, aktualisierte Kopie hat einen offiziellen Offline-Weg mit lokalem Spielstand; Multiplayer, Bestenlisten und mehrere Community-Systeme bleiben von Online-Diensten abhängig.",
    },
    shortAnswer: {
      en: "The core game can continue offline; its connected layer cannot.",
      de: "Das Kernspiel kann offline weiterbestehen, die vernetzte Ebene nicht.",
    },
    evidenceBoundary: {
      en: "The survival path is supported by Ubisoft's documentation, not by our own long-term platform test. It assumes the required update and game files are already available locally.",
      de: "Der Erhaltungsweg ist durch Ubisofts Dokumentation gestützt, nicht durch einen eigenen Langzeittest. Er setzt voraus, dass das nötige Update und die Spieldateien lokal vorhanden sind.",
    },
    checkedAt: "2026-08-29",
    nextReview: "2026-11-29",
    platformScope: {
      en: "Publisher-documented Hybrid Mode; platform-specific entitlement behaviour has not been independently tested",
      de: "Vom Publisher dokumentierter Hybrid-Modus; plattformspezifisches Lizenzverhalten wurde nicht unabhängig getestet",
    },
    defaultFailures: [],
    dependencies: [
      { id: "installation", label: { en: "Installed, updated files", de: "Installierte, aktualisierte Dateien" }, detail: { en: "The offline path assumes the Hybrid Mode update is present.", de: "Der Offline-Weg setzt das Hybrid-Mode-Update voraus." }, state: "required" },
      { id: "store", label: { en: "Store availability", de: "Store-Verfügbarkeit" }, detail: { en: "Relevant to acquisition and redownload, not to an already prepared offline copy.", de: "Relevant für Kauf und erneuten Download, nicht für eine bereits vorbereitete Offline-Kopie." }, state: "bypassable" },
      { id: "publisher-login", label: { en: "Online login", de: "Online-Anmeldung" }, detail: { en: "Bypassed when the game launches in Offline Mode without a connection.", de: "Wird umgangen, wenn das Spiel ohne Verbindung im Offline-Modus startet." }, state: "bypassable" },
      { id: "game-server", label: { en: "Game server", de: "Spielserver" }, detail: { en: "Required for the connected layer, not for documented offline play.", de: "Für die vernetzte Ebene nötig, nicht für den dokumentierten Offline-Betrieb." }, state: "bypassable" },
      { id: "single-player", label: { en: "Core solo game", de: "Kernspiel solo" }, detail: { en: "Exploration, events, vehicles and customisation remain in Offline Mode.", de: "Erkundung, Events, Fahrzeuge und Anpassungen bleiben im Offline-Modus erhalten." }, state: "bypassable" },
      { id: "local-save", label: { en: "Local offline save", de: "Lokaler Offline-Spielstand" }, detail: { en: "Online progress can be exported to a separate local save.", de: "Online-Fortschritt kann in einen getrennten lokalen Spielstand exportiert werden." }, state: "bypassable" },
      { id: "online-features", label: { en: "Online features", de: "Online-Funktionen" }, detail: { en: "Multiplayer, leaderboards, sharing and parts of UGC remain service-dependent.", de: "Multiplayer, Bestenlisten, Teilen und Teile der nutzergenerierten Inhalte bleiben dienstabhängig." }, state: "required" },
    ],
    timeline: [
      { date: "2018-06-29", title: { en: "The Crew 2 launches", de: "The Crew 2 erscheint" }, detail: { en: "The sequel begins as a connected multiplayer-first game.", de: "Der Nachfolger startet als vernetztes, auf Multiplayer ausgerichtetes Spiel." } },
      { date: "2025-10-16", title: { en: "Hybrid Mode released", de: "Hybrid-Modus veröffentlicht" }, detail: { en: "Players can select online or offline play and create a separate local save.", de: "Spielende können Online- oder Offline-Betrieb wählen und einen getrennten lokalen Spielstand anlegen." } },
      { date: "2026-04-22", title: { en: "Offline mode refined", de: "Offline-Modus erweitert" }, detail: { en: "Ubisoft adds offline livery creation and a return-to-login control.", de: "Ubisoft ergänzt Offline-Lackierungen und eine Rückkehr zur Anmeldung." } },
    ],
    sources: [
      {
        title: { en: "The Crew 2 Hybrid Mode is now available", de: "Der Hybrid-Modus von The Crew 2 ist verfügbar" },
        publisher: "Ubisoft",
        url: ubisoftCrew2Hybrid,
        publishedAt: "2025-10-16",
        relevance: {
          en: "Defines offline launch behaviour, local saves and the online features that do not survive.",
          de: "Definiert Offline-Start, lokale Spielstände und die Online-Funktionen, die nicht erhalten bleiben.",
        },
      },
      {
        title: { en: "The Crew 2 Hybrid Mode Update", de: "Update für den Hybrid-Modus von The Crew 2" },
        publisher: "Ubisoft",
        url: ubisoftCrew2Update,
        publishedAt: "2026-04-22",
        relevance: {
          en: "Shows that the publisher continues to refine the documented offline path.",
          de: "Belegt, dass der Publisher den dokumentierten Offline-Weg weiterentwickelt.",
        },
      },
    ],
  },
];

export function getSurvivalCase(id: SurvivalCaseId): SurvivalCase {
  const entry = survivalCases.find((candidate) => candidate.id === id);
  if (!entry) throw new Error(`Unknown survival case: ${id}`);
  return entry;
}

export function localize(text: LocalizedText, locale: Locale): string {
  return text[locale];
}

export function survivalCasePath(id: SurvivalCaseId, locale: Locale): string {
  const prefix = locale === "de" ? "/de/survival-atlas/spiele" : "/survival-atlas/games";
  return `${prefix}/${id}/`;
}

export function publicSurvivalRecord(entry: SurvivalCase) {
  return {
    schemaVersion: 1,
    kind: "nightmare-mode-survival-record",
    id: entry.id,
    title: entry.title,
    released: entry.released,
    answerState: entry.answerState,
    answer: entry.answer,
    evidenceBoundary: entry.evidenceBoundary,
    checkedAt: entry.checkedAt,
    nextReview: entry.nextReview,
    platformScope: entry.platformScope,
    dependencies: entry.dependencies,
    timeline: entry.timeline,
    sources: entry.sources,
    editorialNote: "Publisher documentation is not represented as an independent hands-on test. Reuse facts with their sources and preserve the evidence boundary.",
  };
}
