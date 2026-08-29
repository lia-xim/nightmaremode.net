import { mkdirSync, readFileSync } from "node:fs";
import { chromium } from "playwright";

const base = process.env.QA_BASE_URL ?? "http://127.0.0.1:4321";
const output = process.env.QA_OUTPUT_DIR ?? "design/qa";
mkdirSync(output, { recursive: true });

const browser = await chromium.launch({ headless: true });
const results = { desktop: {}, mobile: {}, atlas: {}, caseStudy: {}, article: {}, fieldStudy: {}, worksheet: {}, errors: [], failedRequests: [] };

const attachDiagnostics = (page, prefix = "") => {
  page.on("console", (message) => {
    if (message.type() === "error") results.errors.push(`${prefix}${message.text()}`);
  });
  page.on("requestfailed", (request) => results.failedRequests.push(`${prefix}${request.url()} :: ${request.failure()?.errorText}`));
};

const desktop = await browser.newPage({ viewport: { width: 1536, height: 1024 }, deviceScaleFactor: 1 });
attachDiagnostics(desktop);
await desktop.goto(base, { waitUntil: "networkidle" });
await desktop.screenshot({ path: `${output}/home-desktop-1536.png`, fullPage: true });
await desktop.screenshot({ path: `${output}/home-desktop-viewport.png`, fullPage: false });
await desktop.keyboard.press("Home");
await desktop.keyboard.press("Tab");
const focused = await desktop.evaluate(() => document.activeElement?.className ?? document.activeElement?.tagName);

results.desktop = await desktop.evaluate(() => ({
  title: document.title,
  h1: document.querySelector("h1")?.textContent?.trim(),
  navLinks: document.querySelectorAll("header nav a").length,
  sections: document.querySelectorAll("main > section").length,
  brokenImages: [...document.images].filter((image) => image.currentSrc && image.complete && image.naturalWidth === 0).length,
  scrollWidth: document.documentElement.scrollWidth,
  clientWidth: document.documentElement.clientWidth,
  robots: document.querySelector("meta[name='robots']")?.getAttribute("content"),
}));
results.desktop.firstTabFocus = focused;

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
attachDiagnostics(mobile, "mobile: ");
await mobile.goto(base, { waitUntil: "networkidle" });
await mobile.locator(".menu-toggle").click();
results.mobile = await mobile.evaluate(() => ({
  menuExpanded: document.querySelector(".menu-toggle")?.getAttribute("aria-expanded"),
  menuLabel: document.querySelector(".menu-toggle")?.textContent?.trim(),
  navVisible: document.querySelector("#site-nav")?.classList.contains("open"),
  h1: document.querySelector("h1")?.textContent?.trim(),
  brokenImages: [...document.images].filter((image) => image.currentSrc && image.complete && image.naturalWidth === 0).length,
  scrollWidth: document.documentElement.scrollWidth,
  clientWidth: document.documentElement.clientWidth,
}));
await mobile.screenshot({ path: `${output}/home-mobile-menu.png`, fullPage: false });
await mobile.locator(".menu-toggle").click();
await mobile.screenshot({ path: `${output}/home-mobile-full.png`, fullPage: true });

const atlas = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
attachDiagnostics(atlas, "atlas: ");
await atlas.goto(`${base}/survival-atlas/games/the-crew-2/`, { waitUntil: "networkidle" });
await atlas.locator('[data-failure="game-server"]').check();
const atlasRecordResponse = await atlas.context().request.get(`${base}/survival-atlas/games/the-crew-2/record.json`);
const atlasRecord = await atlasRecordResponse.json();
results.atlas = await atlas.evaluate(() => ({
  title: document.title,
  h1: document.querySelector("h1")?.textContent?.trim(),
  cases: document.querySelectorAll(".case-switcher__options a").length,
  dependencies: document.querySelectorAll("[data-dependency]").length,
  sources: document.querySelectorAll(".sources li").length,
  coreState: document.querySelector('[data-result="core"]')?.getAttribute("data-state"),
  onlineState: document.querySelector('[data-result="online"]')?.getAttribute("data-state"),
  robots: document.querySelector("meta[name='robots']")?.getAttribute("content"),
  scrollWidth: document.documentElement.scrollWidth,
  clientWidth: document.documentElement.clientWidth,
}));
results.atlas.record = { status: atlasRecordResponse.status(), kind: atlasRecord.kind, id: atlasRecord.id, dependencies: atlasRecord.dependencies?.length };
await atlas.screenshot({ path: `${output}/survival-atlas-the-crew-2-desktop-full.png`, fullPage: true });

const database = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
attachDiagnostics(database, "database: ");
await database.goto(`${base}/survival-atlas/`, { waitUntil: "networkidle" });
await database.locator("[data-filter-state]").selectOption("reviewed");
results.database = await database.evaluate(() => ({
  h1: document.querySelector("h1")?.textContent?.trim(),
  totalRows: document.querySelectorAll("[data-catalog-row]").length,
  visibleRows: [...document.querySelectorAll("[data-catalog-row]")].filter((row) => !row.hidden).length,
  detailLinks: document.querySelectorAll('[data-catalog-row] a[href*="/survival-atlas/games/"]').length,
  count: document.querySelector("[data-result-count]")?.textContent,
  scrollWidth: document.documentElement.scrollWidth,
  clientWidth: document.documentElement.clientWidth,
}));
await database.screenshot({ path: `${output}/survival-database-desktop-full.png`, fullPage: true });

const article = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });
attachDiagnostics(article, "article: ");
await article.goto(`${base}/essays/a-game-is-more-than-its-files/`, { waitUntil: "networkidle" });
results.article = await article.evaluate(() => ({
  title: document.title,
  h1: document.querySelector("h1")?.textContent?.trim(),
  paragraphs: document.querySelectorAll(".body section p").length,
  sources: document.querySelectorAll(".sources li").length,
  schemaType: [...document.querySelectorAll('script[type="application/ld+json"]')].map((node) => node.textContent).find((value) => value?.includes('"Article"')) ? "Article" : null,
  brokenImages: [...document.images].filter((image) => image.currentSrc && image.complete && image.naturalWidth === 0).length,
  scrollWidth: document.documentElement.scrollWidth,
  clientWidth: document.documentElement.clientWidth,
  robots: document.querySelector("meta[name='robots']")?.getAttribute("content"),
}));
await article.screenshot({ path: `${output}/essay-desktop-full.png`, fullPage: true });
const caseStudy = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });
attachDiagnostics(caseStudy, "case-study: ");
await caseStudy.goto(`${base}/case-study/rebuilding-nightmare-mode/`, { waitUntil: "networkidle" });
results.caseStudy = await caseStudy.evaluate(() => ({
  h1: document.querySelector("h1")?.textContent?.trim(),
  sections: document.querySelectorAll("main section").length,
  contextterLinks: document.querySelectorAll('a[href^="https://contextter.com/"][rel~="nofollow"]').length,
  schemaType: [...document.querySelectorAll('script[type="application/ld+json"]')].some((node) => node.textContent?.includes('"Article"')) ? "Article" : null,
  brokenImages: [...document.images].filter((image) => image.currentSrc && image.complete && image.naturalWidth === 0).length,
  scrollWidth: document.documentElement.scrollWidth,
  clientWidth: document.documentElement.clientWidth,
  robots: document.querySelector("meta[name='robots']")?.getAttribute("content"),
}));
await caseStudy.screenshot({ path: `${output}/case-study-desktop-full.png`, fullPage: true });
const fieldStudy = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });
attachDiagnostics(fieldStudy, "field-study: ");
await fieldStudy.goto(`${base}/field-notes/`, { waitUntil: "networkidle" });
await fieldStudy.locator('a[href="/field-notes/a-dark-room-first-four-minutes/"]').first().click();
await fieldStudy.waitForURL(`${base}/field-notes/a-dark-room-first-four-minutes/`);
const sessionResponse = await fieldStudy.context().request.get(`${base}/field-notes/a-dark-room-first-four-minutes/session.json`);
const sessionRecord = await sessionResponse.json();
results.fieldStudy = await fieldStudy.evaluate(() => ({
  title: document.title,
  h1: document.querySelector("h1")?.textContent?.trim(),
  timelineEvents: document.querySelectorAll(".timeline li").length,
  schemaType: [...document.querySelectorAll('script[type="application/ld+json"]')].map((node) => node.textContent).find((value) => value?.includes('"Article"')) ? "Article" : null,
  sessionHref: document.querySelector('a[href$="/session.json"]')?.getAttribute("href"),
  brokenImages: [...document.images].filter((image) => image.currentSrc && image.complete && image.naturalWidth === 0).length,
  scrollWidth: document.documentElement.scrollWidth,
  clientWidth: document.documentElement.clientWidth,
  robots: document.querySelector("meta[name='robots']")?.getAttribute("content"),
}));
results.fieldStudy.sessionStatus = sessionResponse.status();
results.fieldStudy.sessionId = sessionRecord.studyId;
await fieldStudy.screenshot({ path: `${output}/field-study-desktop-full.png`, fullPage: true });

const worksheetContext = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, acceptDownloads: true });
const worksheet = await worksheetContext.newPage();
attachDiagnostics(worksheet, "worksheet: ");
await worksheet.goto(`${base}/field-notes/worksheet/`, { waitUntil: "networkidle" });
await worksheet.getByRole("textbox", { name: "Game", exact: true }).fill("QA Study");
await worksheet.getByRole("textbox", { name: "Edition / version / build" }).fill("Build 1.0");
await worksheet.getByRole("textbox", { name: "Responsible observer" }).fill("Matthias Ramahi");
await worksheet.getByRole("button", { name: "Add event" }).click();
await worksheet.locator('[data-event-field="time"]').nth(1).fill("03:59");
await worksheet.locator('[data-event-field="action"]').nth(1).fill("Pressed start");
await worksheet.getByRole("textbox", { name: "Observation", exact: true }).fill("One action became available.");
await worksheet.getByRole("textbox", { name: "What this session supports" }).fill("Only the recorded opening state.");
await worksheet.waitForTimeout(350);
const jsonDownloadPromise = worksheet.waitForEvent("download");
await worksheet.getByRole("button", { name: "Download JSON" }).click();
const jsonDownload = await jsonDownloadPromise;
const jsonDraft = JSON.parse(readFileSync(await jsonDownload.path(), "utf8"));
const markdownDownloadPromise = worksheet.waitForEvent("download");
await worksheet.getByRole("button", { name: "Download Markdown" }).click();
const markdownDownload = await markdownDownloadPromise;
const markdownDraft = readFileSync(await markdownDownload.path(), "utf8");
await worksheet.reload({ waitUntil: "networkidle" });
results.worksheet = await worksheet.evaluate(() => ({
  h1: document.querySelector("h1")?.textContent?.trim(),
  game: document.querySelector('[data-field="game"]')?.value,
  eventRows: document.querySelectorAll(".event-row").length,
  persistedAction: document.querySelectorAll('[data-event-field="action"]')[1]?.value,
  storedOnlyCopy: document.body.textContent?.includes("Stored only in this browser"),
  scrollWidth: document.documentElement.scrollWidth,
  clientWidth: document.documentElement.clientWidth,
  robots: document.querySelector("meta[name='robots']")?.getAttribute("content"),
}));
results.worksheet.json = { schemaVersion: jsonDraft.schemaVersion, kind: jsonDraft.kind, boundarySeconds: jsonDraft.boundarySeconds, game: jsonDraft.identity?.game, action: jsonDraft.events?.[1]?.action };
results.worksheet.markdown = { heading: markdownDraft.startsWith("# QA Study: The First Four Minutes"), localOnly: markdownDraft.includes("No data was uploaded by the worksheet.") };
await worksheet.screenshot({ path: `${output}/worksheet-mobile-full.png`, fullPage: true });
await worksheet.setViewportSize({ width: 1440, height: 1000 });
await worksheet.screenshot({ path: `${output}/worksheet-desktop-full.png`, fullPage: true });
await worksheetContext.close();
await browser.close();
console.log(JSON.stringify(results, null, 2));

if (results.errors.length || results.failedRequests.length || results.desktop.brokenImages || results.mobile.brokenImages || results.desktop.scrollWidth !== results.desktop.clientWidth || results.mobile.scrollWidth !== results.mobile.clientWidth || results.desktop.h1 !== "Which games remain when their services disappear?" || !results.mobile.navVisible || results.atlas.h1 !== "Can The Crew 2 be played offline?" || results.atlas.cases !== 2 || results.atlas.dependencies !== 7 || results.atlas.sources !== 2 || results.atlas.coreState !== "available" || results.atlas.onlineState !== "lost" || results.atlas.robots !== "noindex, nofollow" || results.atlas.scrollWidth !== results.atlas.clientWidth || results.atlas.record.status !== 200 || results.atlas.record.kind !== "nightmare-mode-survival-record" || results.atlas.record.id !== "the-crew-2" || results.atlas.record.dependencies !== 7 || results.database.h1 !== "Which older games are still playable?" || results.database.totalRows !== 50 || results.database.visibleRows !== 2 || results.database.detailLinks !== 4 || results.database.count !== "2" || results.database.scrollWidth !== results.database.clientWidth || results.caseStudy.h1 !== "How we are rebuilding an old editorial domain without inheriting its past." || results.caseStudy.sections < 9 || results.caseStudy.contextterLinks !== 1 || results.caseStudy.schemaType !== "Article" || results.caseStudy.brokenImages || results.caseStudy.scrollWidth !== results.caseStudy.clientWidth || results.article.h1 !== "A game is more than its files" || results.article.sources !== 3 || results.article.schemaType !== "Article" || results.article.brokenImages || results.article.scrollWidth !== results.article.clientWidth || results.fieldStudy.h1 !== "Four minutes in A Dark Room" || results.fieldStudy.timelineEvents !== 12 || results.fieldStudy.schemaType !== "Article" || results.fieldStudy.sessionStatus !== 200 || results.fieldStudy.sessionId !== "adr-web-2026-08-23-01" || results.fieldStudy.brokenImages || results.fieldStudy.scrollWidth !== results.fieldStudy.clientWidth || results.worksheet.h1 !== "The First Four Minutes" || results.worksheet.game !== "QA Study" || results.worksheet.eventRows !== 2 || results.worksheet.persistedAction !== "Pressed start" || !results.worksheet.storedOnlyCopy || results.worksheet.scrollWidth !== results.worksheet.clientWidth || results.worksheet.robots !== "noindex, nofollow" || results.worksheet.json.schemaVersion !== 1 || results.worksheet.json.kind !== "nightmare-mode-play-study" || results.worksheet.json.boundarySeconds !== 240 || results.worksheet.json.game !== "QA Study" || results.worksheet.json.action !== "Pressed start" || !results.worksheet.markdown.heading || !results.worksheet.markdown.localOnly) process.exitCode = 1;
