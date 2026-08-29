import type { Locale } from "@/i18n";
import type { ResearchLane, SurvivalCatalogEntry } from "@/data/survival-catalog";

export const researchFailureIds = ["store", "publisher-login", "game-server", "internet"] as const;
export const researchOutcomeIds = ["acquisition", "core", "save", "online"] as const;

export type ResearchFailureId = (typeof researchFailureIds)[number];
export type ResearchOutcomeId = (typeof researchOutcomeIds)[number];
export type ResearchModelState = "likely" | "at-risk" | "unknown";
type DependencyRole = "acquisition" | "critical" | "connected" | "potential-bypass" | "unknown";

interface LaneProfile {
  summary: { en: string; de: string };
  roles: Record<ResearchFailureId, DependencyRole>;
  baseline: Record<ResearchOutcomeId, ResearchModelState>;
  defaultFailures: ResearchFailureId[];
}

const commonStoreRole: Pick<Record<ResearchFailureId, DependencyRole>, "store"> = { store: "acquisition" };

const laneProfiles: Record<ResearchLane, LaneProfile> = {
  "offline-baseline": {
    summary: {
      en: "This lane tests whether a prepared local copy keeps its core loop without accounts or live services.",
      de: "Dieses Prüffeld untersucht, ob eine vorbereitete lokale Kopie ihren Kern ohne Accounts oder Live-Dienste behält.",
    },
    roles: { ...commonStoreRole, "publisher-login": "potential-bypass", "game-server": "connected", internet: "connected" },
    baseline: { acquisition: "likely", core: "likely", save: "likely", online: "likely" },
    defaultFailures: [],
  },
  "community-hosting": {
    summary: {
      en: "This lane tests whether official infrastructure can be replaced by dedicated or community-operated servers.",
      de: "Dieses Prüffeld untersucht, ob offizielle Infrastruktur durch dedizierte oder von der Community betriebene Server ersetzbar ist.",
    },
    roles: { ...commonStoreRole, "publisher-login": "unknown", "game-server": "potential-bypass", internet: "connected" },
    baseline: { acquisition: "likely", core: "likely", save: "unknown", online: "likely" },
    defaultFailures: [],
  },
  "publisher-login": {
    summary: {
      en: "This lane tests whether publisher authentication is an acquisition step or a recurring gate to the installed game.",
      de: "Dieses Prüffeld untersucht, ob die Publisher-Anmeldung nur beim Erwerb oder wiederholt als Zugangsschranke nötig ist.",
    },
    roles: { ...commonStoreRole, "publisher-login": "critical", "game-server": "connected", internet: "critical" },
    baseline: { acquisition: "likely", core: "unknown", save: "unknown", online: "likely" },
    defaultFailures: [],
  },
  "local-and-server": {
    summary: {
      en: "This lane separates a local single-player layer from modes and services that still depend on official servers.",
      de: "Dieses Prüffeld trennt eine lokale Einzelspieler-Ebene von Modi und Diensten, die weiterhin offizielle Server benötigen.",
    },
    roles: { ...commonStoreRole, "publisher-login": "unknown", "game-server": "connected", internet: "connected" },
    baseline: { acquisition: "likely", core: "likely", save: "likely", online: "likely" },
    defaultFailures: [],
  },
  shutdown: {
    summary: {
      en: "This lane starts from a documented service shutdown and asks what, if anything, remains outside that service.",
      de: "Dieses Prüffeld beginnt bei einer dokumentierten Dienstabschaltung und fragt, was außerhalb dieses Dienstes übrig bleibt.",
    },
    roles: { ...commonStoreRole, "publisher-login": "critical", "game-server": "critical", internet: "critical" },
    baseline: { acquisition: "unknown", core: "unknown", save: "unknown", online: "unknown" },
    defaultFailures: ["game-server"],
  },
  "offline-patch": {
    summary: {
      en: "This lane tests the scope and conditions of a later official offline mode or preservation patch.",
      de: "Dieses Prüffeld untersucht Umfang und Bedingungen eines später veröffentlichten Offline-Modus oder Erhaltungs-Patches.",
    },
    roles: { ...commonStoreRole, "publisher-login": "potential-bypass", "game-server": "connected", internet: "potential-bypass" },
    baseline: { acquisition: "likely", core: "likely", save: "likely", online: "likely" },
    defaultFailures: [],
  },
  delisted: {
    summary: {
      en: "This lane separates removal from sale from continued download, installation and play for existing owners.",
      de: "Dieses Prüffeld trennt die Entfernung aus dem Verkauf von Download, Installation und Spielbarkeit für bestehende Besitzer.",
    },
    roles: { ...commonStoreRole, "publisher-login": "unknown", "game-server": "connected", internet: "connected" },
    baseline: { acquisition: "unknown", core: "likely", save: "unknown", online: "likely" },
    defaultFailures: ["store"],
  },
  "server-only": {
    summary: {
      en: "This lane tests whether any playable path exists outside an operator-controlled service.",
      de: "Dieses Prüffeld untersucht, ob irgendein spielbarer Weg außerhalb eines betreiberkontrollierten Dienstes existiert.",
    },
    roles: { ...commonStoreRole, "publisher-login": "critical", "game-server": "critical", internet: "critical" },
    baseline: { acquisition: "unknown", core: "unknown", save: "unknown", online: "unknown" },
    defaultFailures: ["game-server"],
  },
};

const localized = <T extends { en: string; de: string }>(value: T, locale: Locale) => value[locale];

const dependencyNames: Record<ResearchFailureId, { en: string; de: string }> = {
  store: { en: "Store / redownload", de: "Store / erneuter Download" },
  "publisher-login": { en: "Publisher login", de: "Publisher-Anmeldung" },
  "game-server": { en: "Official game server", de: "Offizieller Spielserver" },
  internet: { en: "Internet connection", de: "Internetverbindung" },
};

const roleLabels: Record<DependencyRole, { en: string; de: string }> = {
  acquisition: { en: "Acquisition gate", de: "Erwerbsschranke" },
  critical: { en: "Potential core gate", de: "Mögliche Kernschranke" },
  connected: { en: "Connected-feature gate", de: "Schranke für Online-Funktionen" },
  "potential-bypass": { en: "Possible bypass", de: "Mögliche Umgehung" },
  unknown: { en: "Relationship unresolved", de: "Zusammenhang ungeklärt" },
};

const evidenceNeeded: Record<ResearchFailureId, { en: string; de: string }> = {
  store: {
    en: "Store listing, entitlement and redownload evidence for a previous owner.",
    de: "Beleg zu Store-Eintrag, Lizenz und erneutem Download für frühere Besitzer.",
  },
  "publisher-login": {
    en: "A disconnected launch test plus current publisher account documentation.",
    de: "Ein getrennter Starttest plus aktuelle Dokumentation des Publisher-Accounts.",
  },
  "game-server": {
    en: "Server-status evidence and a test of official, dedicated or community-hosted alternatives.",
    de: "Serverstatus-Beleg und Test offizieller, dedizierter oder Community-betriebener Alternativen.",
  },
  internet: {
    en: "A cold launch and continued-play test with the network physically unavailable.",
    de: "Ein Kaltstart- und Weiterspieltest bei physisch getrennter Netzwerkverbindung.",
  },
};

function effectFor(role: DependencyRole, failure: ResearchFailureId): Partial<Record<ResearchOutcomeId, ResearchModelState>> {
  if (failure === "store") return { acquisition: "at-risk" };
  if (role === "critical") return { core: "at-risk", save: "unknown", online: "at-risk" };
  if (role === "connected") return { online: "at-risk" };
  if (role === "potential-bypass") return { core: "unknown", online: "at-risk" };
  return { core: "unknown", online: "unknown" };
}

function failureEffect(role: DependencyRole, locale: Locale): string {
  const copy: Record<DependencyRole, { en: string; de: string }> = {
    acquisition: { en: "New acquisition or redownload becomes the first risk.", de: "Neuerwerb oder erneuter Download wird zum ersten Risiko." },
    critical: { en: "The working model treats core access and online play as at risk.", de: "Das Arbeitsmodell behandelt Kernzugang und Online-Spiel als gefährdet." },
    connected: { en: "The working model removes connected features, not automatically the local core.", de: "Das Arbeitsmodell verliert Online-Funktionen, nicht automatisch den lokalen Kern." },
    "potential-bypass": { en: "A local, offline or community bypass may exist, but must be demonstrated.", de: "Eine lokale, Offline- oder Community-Umgehung könnte existieren, muss aber belegt werden." },
    unknown: { en: "The affected outcomes remain unresolved until a source or test defines the relationship.", de: "Die betroffenen Ergebnisse bleiben offen, bis Quelle oder Test den Zusammenhang klären." },
  };
  return localized(copy[role], locale);
}

export function catalogResearchModel(entry: SurvivalCatalogEntry, locale: Locale) {
  const profile = laneProfiles[entry.researchLane];
  return {
    summary: localized(profile.summary, locale),
    baseline: profile.baseline,
    defaultFailures: profile.defaultFailures,
    dependencies: researchFailureIds.map((id) => {
      const role = profile.roles[id];
      return {
        id,
        name: localized(dependencyNames[id], locale),
        role,
        roleLabel: localized(roleLabels[role], locale),
        failureEffect: failureEffect(role, locale),
        evidenceNeeded: localized(evidenceNeeded[id], locale),
        impacts: effectFor(role, id),
      };
    }),
  };
}
