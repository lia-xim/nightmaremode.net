import { mkdirSync } from "node:fs";
import { chromium } from "playwright";

const base = process.env.QA_BASE_URL ?? "http://127.0.0.1:4321";
const output = process.env.QA_OUTPUT_DIR ?? "design/qa";
mkdirSync(output, { recursive: true });

const browser = await chromium.launch({ headless: true });
const results = { desktop: {}, mobile: {}, article: {}, fieldStudy: {}, errors: [], failedRequests: [] };

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
const fieldStudy = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });
attachDiagnostics(fieldStudy, "field-study: ");
await fieldStudy.goto(base, { waitUntil: "networkidle" });
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
await browser.close();
console.log(JSON.stringify(results, null, 2));

if (results.errors.length || results.failedRequests.length || results.desktop.brokenImages || results.mobile.brokenImages || results.desktop.scrollWidth !== results.desktop.clientWidth || results.mobile.scrollWidth !== results.mobile.clientWidth || results.desktop.h1 !== "Read games closely." || !results.mobile.navVisible || results.article.h1 !== "A game is more than its files" || results.article.sources !== 3 || results.article.schemaType !== "Article" || results.article.brokenImages || results.article.scrollWidth !== results.article.clientWidth || results.fieldStudy.h1 !== "Four minutes in A Dark Room" || results.fieldStudy.timelineEvents !== 12 || results.fieldStudy.schemaType !== "Article" || results.fieldStudy.sessionStatus !== 200 || results.fieldStudy.sessionId !== "adr-web-2026-08-23-01" || results.fieldStudy.brokenImages || results.fieldStudy.scrollWidth !== results.fieldStudy.clientWidth) process.exitCode = 1;
