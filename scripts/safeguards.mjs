import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { indexableRoutes, pageRegistry } from "../src/data/indexable-routes.mjs";
import { GSC_INDEX_GATE_CONFIRMATION, isIndexingEnabled } from "../src/config/indexing-gate.mjs";

const root = process.cwd();
const dist = join(root, "dist");
const launch = isIndexingEnabled(process.env);
const failures = [];
const checks = [];
const assert = (condition, label) => {
  checks.push({ label, pass: Boolean(condition) });
  if (!condition) failures.push(label);
};
const walk = (directory) => readdirSync(directory).flatMap((name) => {
  const path = join(directory, name);
  return statSync(path).isDirectory() ? walk(path) : [path];
});
const fileForRoute = (route) => route === "/" ? join(dist, "index.html") : route === "/404/" ? join(dist, "404.html") : join(dist, ...route.split("/").filter(Boolean), "index.html");
const canonicalForRoute = (route) => `https://nightmaremode.net${route}`;

assert(existsSync(dist), "production build exists");
assert(new Set(pageRegistry.map((page) => page.route)).size === pageRegistry.length, "page registry routes are unique");
assert(pageRegistry.every((page) => page.primaryJob.trim().length >= 24), "every canonical page has one substantive primary user job");
assert(JSON.stringify(pageRegistry.filter((page) => page.indexable).map((page) => page.route)) === JSON.stringify(indexableRoutes), "indexable routes derive from the page registry");
assert(!isIndexingEnabled({ PUBLIC_SITE_INDEXABLE: "true" }), "PUBLIC_SITE_INDEXABLE alone cannot open indexing");
assert(isIndexingEnabled({ PUBLIC_SITE_INDEXABLE: "true", PUBLIC_GSC_INDEX_GATE_CONFIRMED: GSC_INDEX_GATE_CONFIRMATION }), "the two-key index gate recognizes the reviewed confirmation token");

if (existsSync(dist)) {
  const htmlFiles = walk(dist).filter((path) => path.endsWith(".html"));
  const index = readFileSync(join(dist, "index.html"), "utf8");
  const robotsPath = join(dist, "robots.txt");
  const robots = existsSync(robotsPath) ? readFileSync(robotsPath, "utf8") : "";
  const combined = htmlFiles.map((path) => readFileSync(path, "utf8").toLowerCase()).join("\n");

  if (launch) {
    assert(/User-agent: \*\s+Allow: \//.test(robots), "launch robots.txt allows crawling");
    assert(!/Disallow:\s*\//.test(robots), "launch robots.txt contains no global disallow");
    assert(/Sitemap: https:\/\/nightmaremode\.net\/sitemap-index\.xml/.test(robots), "launch robots.txt references canonical sitemap");
    assert(/<meta name="robots" content="index, follow"/.test(index), "launch homepage is index,follow");

    const sitemapFiles = walk(dist).filter((path) => /sitemap(?:-index|-\d+)?\.xml$/.test(path));
    assert(sitemapFiles.length >= 2, "automatic sitemap index and child sitemap exist");
    const sitemapUrls = [...new Set(sitemapFiles.flatMap((path) => [...readFileSync(path, "utf8").matchAll(/<loc>(https:\/\/nightmaremode\.net[^<]+)<\/loc>/g)].map((match) => match[1])))]
      .filter((url) => !url.endsWith(".xml"))
      .sort();
    const expectedUrls = indexableRoutes.map(canonicalForRoute).sort();
    assert(JSON.stringify(sitemapUrls) === JSON.stringify(expectedUrls), "sitemap exactly matches the canonical indexable-route registry");

    for (const route of indexableRoutes) {
      const path = fileForRoute(route);
      const html = existsSync(path) ? readFileSync(path, "utf8") : "";
      assert(existsSync(path), `indexable route emits a 200 document: ${route}`);
      assert(/<meta name="robots" content="index, follow"/.test(html), `indexable route is index,follow: ${route}`);
      assert(html.includes(`<link rel="canonical" href="${canonicalForRoute(route)}"`), `indexable route has exact canonical: ${route}`);
    }

    const excluded = [
      "/404/", "/archive/", "/contact/", "/conversations/", "/datenschutz/",
      "/discovery/how-indie-games-get-discovered-in-2026/", "/history/",
      "/impressum/", "/ownership/", "/rights-contact/", "/about/new-ownership/", "/about/site-operations/",
      "/de/archiv/", "/de/kontakt/", "/de/datenschutz/", "/de/geschichte/", "/de/impressum/",
      "/de/rechte-und-korrekturen/", "/de/ueber-uns/neue-inhaberschaft/", "/de/ueber-uns/website-betrieb/",
      "/2012/01/metal-gear-solids-postmodern-legacy-part-1-15146/",
      "/2012/03/unmanned-a-talk-with-molleindustria-about-the-politics-of-war-games-16946/",
      "/2012/11/creation-under-capitalism-23422/",
    ];
    for (const route of excluded) {
      const path = fileForRoute(route);
      const html = existsSync(path) ? readFileSync(path, "utf8") : "";
      assert(existsSync(path), `excluded route emits its intended document: ${route}`);
      assert(/<meta name="robots" content="noindex, nofollow"/.test(html), `excluded route remains noindex: ${route}`);
      assert(!sitemapUrls.includes(canonicalForRoute(route)), `excluded route is absent from sitemap: ${route}`);
    }
  } else {
    assert(/<meta name="robots" content="noindex, nofollow"/.test(index), "protected homepage is noindex,nofollow");
    assert(/Disallow: \/(?:\r?\n|$)/.test(robots), "protected robots.txt blocks crawling");
    assert(!existsSync(join(dist, "sitemap-index.xml")) && !existsSync(join(dist, "sitemap-0.xml")), "protected build emits no sitemap");
  }

  const forbidden = ["our partner network", "meet the partners", "former newsroom continues"];
  for (const phrase of forbidden) assert(!combined.includes(phrase), `built HTML excludes forbidden claim: ${phrase}`);

  for (const path of htmlFiles) {
    const html = readFileSync(path, "utf8");
    const contextterLinks = [...html.matchAll(/<a\b[^>]*href="https:\/\/contextter\.com\/"[^>]*>/g)].map((match) => match[0]);
    assert(contextterLinks.length <= 1, `Contextter disclosure is not repeated on one page: ${relative(dist, path).split(sep).join("/")}`);
    assert(contextterLinks.every((link) => /rel="[^"]*nofollow[^"]*"/.test(link)), `Contextter disclosure links are nofollow: ${relative(dist, path).split(sep).join("/")}`);
    if (contextterLinks.length) assert(!/<footer[\s\S]*href="https:\/\/contextter\.com\//.test(html), `Contextter is not linked from the footer: ${relative(dist, path).split(sep).join("/")}`);
  }

  const legacyOutputs = [
    "2012/11/creation-under-capitalism-23422/index.html",
    "2012/01/metal-gear-solids-postmodern-legacy-part-1-15146/index.html",
    "2012/03/unmanned-a-talk-with-molleindustria-about-the-politics-of-war-games-16946/index.html",
  ];
  for (const output of legacyOutputs) {
    const path = join(dist, ...output.split("/"));
    const html = existsSync(path) ? readFileSync(path, "utf8") : "";
    assert(existsSync(path), `protected legacy route exists: ${output}`);
    assert(/noindex, nofollow/.test(html), `protected legacy route is noindex: ${output}`);
    assert(/Bibliographic facts only/i.test(html), `protected legacy route states its evidence boundary: ${output}`);
  }

  for (const path of htmlFiles) {
    const html = readFileSync(path, "utf8");
    assert(/<link rel="canonical" href="https:\/\/nightmaremode\.net\//.test(html), `canonical present: ${relative(dist, path).split(sep).join("/")}`);
    const expectedPageType = [join(dist, "index.html"), join(dist, "de", "index.html")].includes(path) ? "WebSite" : "WebPage";
    assert(html.includes(`"@type":"${expectedPageType}"`), `base schema type is correct: ${relative(dist, path).split(sep).join("/")}`);
  }
}

const vercelConfig = JSON.parse(readFileSync(join(root, "vercel.json"), "utf8"));
const securityHeaders = Object.fromEntries(vercelConfig.headers?.[0]?.headers?.map(({ key, value }) => [key.toLowerCase(), value]) ?? []);
assert(vercelConfig.headers?.[0]?.source === "/(.*)", "security headers apply to every route");
for (const header of ["content-security-policy", "x-content-type-options", "referrer-policy", "permissions-policy", "x-frame-options", "cross-origin-opener-policy", "cross-origin-resource-policy"]) {
  assert(Boolean(securityHeaders[header]), `security header configured: ${header}`);
}
assert(securityHeaders["x-content-type-options"] === "nosniff", "nosniff policy is exact");
assert(securityHeaders["x-frame-options"] === "DENY", "frame policy is exact");
assert(securityHeaders["content-security-policy"]?.includes("frame-ancestors 'none'"), "CSP blocks framing");
assert(securityHeaders["content-security-policy"]?.includes("object-src 'none'"), "CSP blocks plugins");
assert(!securityHeaders["content-security-policy"]?.includes("http:"), "CSP does not allow insecure origins");
assert(securityHeaders["content-security-policy"]?.includes("script-src 'self' 'unsafe-inline' https://analytics.contextter.com"), "CSP permits only the configured analytics script origin");
assert(securityHeaders["content-security-policy"]?.includes("connect-src 'self' https://analytics.contextter.com"), "CSP permits analytics collection only at the configured origin");

const baseLayoutSource = readFileSync(join(root, "src", "components", "BaseLayout.astro"), "utf8");
const siteConfigSource = readFileSync(join(root, "src", "config", "site.ts"), "utf8");
const privacyEnglishSource = readFileSync(join(root, "src", "pages", "datenschutz.astro"), "utf8");
const privacyGermanSource = readFileSync(join(root, "src", "pages", "de", "datenschutz.astro"), "utf8");
assert(siteConfigSource.includes('scriptUrl: "https://analytics.contextter.com/script.js"'), "analytics endpoint is centrally configured");
assert(siteConfigSource.includes('websiteId: "56f584d7-b9de-4871-af37-c2c829ef9620"'), "analytics website ID is centrally configured");
for (const attribute of ['data-domains={siteConfig.analytics.domains}', 'data-exclude-search="true"', 'data-exclude-hash="true"', 'data-do-not-track="true"', 'data-performance="true"']) {
  assert(baseLayoutSource.includes(attribute), `privacy-oriented analytics setting is present: ${attribute}`);
}
for (const [label, source] of [["English", privacyEnglishSource], ["German", privacyGermanSource]]) {
  assert(source.includes("analytics.contextter.com"), `${label} privacy notice names the analytics endpoint`);
  assert(!source.includes(label === "English" ? "No tracking" : "Kein Tracking"), `${label} privacy notice no longer makes a false no-tracking claim`);
}

const protocolSource = readFileSync(join(root, "src", "components", "ProtocolPage.astro"), "utf8");
assert(protocolSource.includes("does not replace participant research"), "play-study protocol states its experience boundary");
assert(protocolSource.includes("gamestudies.org/0601") && protocolSource.includes("gamestudies.org/2202"), "play-study protocol cites public methodology sources");
assert(protocolSource.includes("Copyable worksheet"), "play-study protocol exposes a reusable proof asset");

const worksheetSource = readFileSync(join(root, "src", "components", "PlayStudyWorksheet.astro"), "utf8");
const worksheetScript = readFileSync(join(root, "src", "scripts", "play-study-worksheet.ts"), "utf8");
const playStudyHubSource = readFileSync(join(root, "src", "components", "PlayStudyHub.astro"), "utf8");
assert(worksheetSource.includes("Stored only in this browser") && worksheetSource.includes("Nur in diesem Browser gespeichert"), "worksheet states its local-only storage boundary in both languages");
assert(worksheetScript.includes('boundarySeconds: 240') && worksheetScript.includes('Math.min(240'), "worksheet enforces the four-minute observation boundary");
assert(worksheetScript.includes("localStorage.setItem") && worksheetScript.includes("new Blob"), "worksheet persists locally and generates local exports");
assert(!/\b(?:fetch|XMLHttpRequest|WebSocket)\b/.test(worksheetScript), "worksheet contains no upload or network transport");
assert(worksheetSource.includes('data-action="download-markdown"') && worksheetSource.includes('data-action="download-json"'), "worksheet offers Markdown and JSON export");
assert(worksheetSource.includes('"@type": "WebApplication"') && worksheetSource.includes('applicationCategory: "EducationalApplication"'), "worksheet schema matches the visible browser application");
assert(playStudyHubSource.includes("Matthias Ramahi must conduct the next session himself"), "series hub names the human-led second-study gate");
assert(playStudyHubSource.includes("not a claim about human experience"), "series hub preserves the automated-study experience boundary");

const caseStudySource = readFileSync(join(root, "src", "components", "CaseStudyPage.astro"), "utf8");
assert(caseStudySource.includes("This is not a customer testimonial"), "case study rejects a customer-testimonial framing");
assert(caseStudySource.includes("does not prove that every step ran through the current customer-facing Contextter application"), "case study separates operating method from product proof");
assert(caseStudySource.includes("No SEO success has been demonstrated"), "case study states that SEO results are unproven");
assert(caseStudySource.includes("A measurement baseline, not a success story"), "case study publishes a measurement baseline before claiming results");
assert(caseStudySource.includes("A second study personally conducted by Matthias does not yet exist"), "case study does not fabricate the second human-led study");
assert(caseStudySource.includes('rel="external nofollow"'), "case study marks the same-owner Contextter link nofollow");

const survivalDataSource = readFileSync(join(root, "src", "data", "survival-atlas.ts"), "utf8");
const survivalCatalogSource = readFileSync(join(root, "src", "data", "survival-catalog.ts"), "utf8");
const survivalDatabaseSource = readFileSync(join(root, "src", "components", "SurvivalDatabase.astro"), "utf8");
const survivalExplorerSource = readFileSync(join(root, "src", "components", "SurvivalExplorer.astro"), "utf8");
assert((survivalDataSource.match(/id: "the-crew(?:-2)?"/g) ?? []).length === 2, "survival atlas starts with exactly two reviewed contrast cases");
assert((survivalCatalogSource.match(/originalRelease:/g) ?? []).length === 51, "survival database contains exactly 50 bounded candidate records plus its typed field declaration");
assert((survivalCatalogSource.match(/recordState: "reviewed"/g) ?? []).length === 2, "only two source-complete survival cases are marked reviewed");
assert(survivalCatalogSource.includes("They do not receive a detail route"), "pending catalog entries explicitly reject thin detail routes");
assert(survivalDatabaseSource.includes("No published finding yet") && survivalDatabaseSource.includes("No detail page yet"), "database labels open research without inventing verdicts or pages");
assert(survivalDataSource.includes("This record relies on Ubisoft's shutdown notice"), "The Crew record discloses its publisher-source boundary");
assert(survivalDataSource.includes("not by our own long-term platform test"), "The Crew 2 record does not fabricate an independent platform test");
assert(!survivalDataSource.includes("The game will not be accessible"), "survival atlas paraphrases sources instead of inventing direct quotations");
assert(survivalExplorerSource.includes("Evidence, not a permanence score"), "survival atlas rejects a false universal permanence score");
assert(survivalExplorerSource.includes('data-failure="game-server"'), "survival atlas exposes a game-server failure simulation");
assert(survivalExplorerSource.includes('data-result="${key}"'), "survival atlas binds simulated failures to visible outcomes");

const studyRecord = JSON.parse(readFileSync(join(root, "src", "data", "studies", "a-dark-room-session.json"), "utf8"));
assert(studyRecord.studyId === "adr-web-2026-08-23-01", "play-study record has a stable public identifier");
assert(studyRecord.durationSeconds === 257, "play-study duration matches the recorded stop boundary");
assert(studyRecord.game.sourceCommit === "1fada4620b6c66bd07bf15a3f1eb8223df8bc1d7", "play-study pins the observed official source state");
assert(studyRecord.events.some((event) => event.second === 182 && event.result.includes("investigate and ignore them")), "play-study preserves the first unresolved branch observation");
assert(studyRecord.production.aiAssistance.includes("No human play experience is claimed"), "play-study discloses automation and rejects a human-experience claim");

const studySource = readFileSync(join(root, "src", "components", "PlayStudyPage.astro"), "utf8");
assert(studySource.includes("controlled browser observation"), "play-study states its controlled-observation scope");
assert(studySource.includes("No human play experience is claimed"), "play-study states its experience boundary");
assert(!/\b(?:I|we) played\b/i.test(studySource), "play-study does not invent a human play session");
const manifestSource = readFileSync(join(root, "src", "data", "legacy-url-actions.ts"), "utf8");
assert((manifestSource.match(/normalizedPath:\s*"\//g) ?? []).length === 6, "six priority legacy URLs have explicit records");
assert(!/action:\s*"hold"/.test(manifestSource), "priority legacy manifest contains no unresolved hold action");
assert(!/action:\s*"redirect_(301|308)"[\s\S]{0,180}targetUrl:\s*"\/"/.test(manifestSource), "no legacy redirect targets the homepage");
assert(!/rightsStatus:\s*"unresolved"[\s\S]{0,160}action:\s*"restore_200"/.test(manifestSource), "unresolved rights never restore a former body");
assert((manifestSource.match(/reviewer:\s*"Matthias Ramahi"/g) ?? []).length === 6, "all priority legacy decisions have a named owner review");
assert((manifestSource.match(/lastTestedAt:\s*"2026-08-22"/g) ?? []).length === 6, "all priority legacy decisions record a test date");

console.log(JSON.stringify({ mode: launch ? "launch" : "protected", checks: checks.length, failures, results: checks }, null, 2));
if (failures.length > 0) process.exitCode = 1;
