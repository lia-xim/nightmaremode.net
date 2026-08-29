import AxeBuilder from "@axe-core/playwright";
import { chromium, devices } from "playwright";

const base = process.env.QA_BASE_URL ?? "http://127.0.0.1:4321";
const routes = [
  "/",
  "/case-study/rebuilding-nightmare-mode/",
  "/essays/a-game-is-more-than-its-files/",
  "/field-notes/",
  "/field-notes/worksheet/",
  "/field-notes/a-dark-room-first-four-minutes/",
  "/field-notes/play-study-protocol/",
  "/about/new-ownership/",
  "/impressum/",
  "/rights-contact/",
  "/de/",
  "/de/fallstudie/nightmare-mode-neuaufbau/",
  "/de/essays/ein-spiel-ist-mehr-als-seine-dateien/",
  "/de/play-studies/a-dark-room-die-ersten-vier-minuten/",
  "/de/play-studies/arbeitsblatt/",
  "/de/play-studies/protokoll/",
  "/de/impressum/",
  "/404/",
];
const viewports = [
  { name: "desktop", options: { viewport: { width: 1440, height: 900 } } },
  { name: "mobile", options: { ...devices["iPhone 13"] } },
];

const browser = await chromium.launch({ headless: true });
const results = [];
const failures = [];

for (const viewport of viewports) {
  for (const route of routes) {
    const context = await browser.newContext(viewport.options);
    const page = await context.newPage();
    const consoleErrors = [];
    const failedRequests = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("requestfailed", (request) => failedRequests.push(`${request.url()} :: ${request.failure()?.errorText}`));
    const response = await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
    const scan = await new AxeBuilder({ page }).analyze();
    const serious = scan.violations.filter((violation) => ["serious", "critical"].includes(violation.impact ?? ""));
    const actionableConsoleErrors = route === "/404/" ? consoleErrors.filter((message) => !message.includes("status of 404")) : consoleErrors;
    const record = {
      viewport: viewport.name,
      route,
      status: response?.status(),
      violations: scan.violations.map((violation) => ({ id: violation.id, impact: violation.impact, nodes: violation.nodes.length })),
      serious,
      consoleErrors,
      actionableConsoleErrors,
      failedRequests,
    };
    results.push(record);
    if (serious.length || actionableConsoleErrors.length || failedRequests.length) failures.push(record);
    await context.close();
  }
}

const keyboardContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
const keyboard = await keyboardContext.newPage();
await keyboard.goto(base, { waitUntil: "networkidle" });
await keyboard.keyboard.press("Tab");
const firstFocus = await keyboard.evaluate(() => document.activeElement?.classList.contains("skip-link"));
await keyboard.keyboard.press("Tab");
await keyboard.keyboard.press("Tab");
const toggleFocused = await keyboard.evaluate(() => document.activeElement?.classList.contains("menu-toggle"));
await keyboard.keyboard.press("Enter");
const opened = await keyboard.getAttribute(".menu-toggle", "aria-expanded");
await keyboard.keyboard.press("Escape");
const closed = await keyboard.getAttribute(".menu-toggle", "aria-expanded");
const returned = await keyboard.evaluate(() => document.activeElement?.classList.contains("menu-toggle"));
const keyboardResult = { firstFocus, toggleFocused, opened, closed, returned };
if (!firstFocus || !toggleFocused || opened !== "true" || closed !== "false" || !returned) failures.push({ keyboard: keyboardResult });

await keyboardContext.close();
await browser.close();
console.log(JSON.stringify({ results, keyboard: keyboardResult, failures }, null, 2));
if (failures.length) process.exitCode = 1;
