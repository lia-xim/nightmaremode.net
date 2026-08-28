export type Locale = "en" | "de";

const englishToGerman = new Map<string, string>([
  ["/", "/de/"],
  ["/about/", "/de/ueber-uns/"],
  ["/about/new-ownership/", "/de/ueber-uns/neue-inhaberschaft/"],
  ["/about/site-operations/", "/de/ueber-uns/website-betrieb/"],
  ["/archive/", "/de/archiv/"],
  ["/contact/", "/de/kontakt/"],
  ["/datenschutz/", "/de/datenschutz/"],
  ["/editorial-policy/", "/de/redaktionsregeln/"],
  ["/essays/", "/de/essays/"],
  ["/essays/a-game-is-more-than-its-files/", "/de/essays/ein-spiel-ist-mehr-als-seine-dateien/"],
  ["/field-notes/", "/de/play-studies/"],
  ["/field-notes/a-dark-room-first-four-minutes/", "/de/play-studies/a-dark-room-die-ersten-vier-minuten/"],
  ["/field-notes/play-study-protocol/", "/de/play-studies/protokoll/"],
  ["/history/", "/de/geschichte/"],
  ["/impressum/", "/de/impressum/"],
  ["/rights-contact/", "/de/rechte-und-korrekturen/"],
]);

const germanToEnglish = new Map(
  [...englishToGerman.entries()].map(([english, german]) => [german, english]),
);

export function localeFromPath(pathname: string): Locale {
  return pathname === "/de" || pathname.startsWith("/de/") ? "de" : "en";
}

export function alternatePath(pathname: string): string | undefined {
  return localeFromPath(pathname) === "de"
    ? germanToEnglish.get(pathname)
    : englishToGerman.get(pathname);
}

export function pathFor(locale: Locale, englishPath: string): string {
  if (locale === "en") return englishPath;
  return englishToGerman.get(englishPath) ?? `/de${englishPath}`;
}

export const navigation = {
  en: [
    { label: "Essays", href: "/essays/" },
    { label: "Play studies", href: "/field-notes/" },
    { label: "About", href: "/about/" },
  ],
  de: [
    { label: "Essays", href: "/de/essays/" },
    { label: "Play Studies", href: "/de/play-studies/" },
    { label: "Über uns", href: "/de/ueber-uns/" },
  ],
} as const;

export const footerNavigation = {
  en: [
    ["Editorial policy", "/editorial-policy/"],
    ["Rights & corrections", "/rights-contact/"],
    ["Imprint", "/impressum/"],
    ["Privacy", "/datenschutz/"],
  ],
  de: [
    ["Redaktionsregeln", "/de/redaktionsregeln/"],
    ["Rechte & Korrekturen", "/de/rechte-und-korrekturen/"],
    ["Impressum", "/de/impressum/"],
    ["Datenschutz", "/de/datenschutz/"],
  ],
} as const;
