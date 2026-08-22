import { chromium, devices } from "playwright";

const base = process.env.QA_BASE_URL ?? "http://127.0.0.1:4321";
const profiles = [
  { name: "desktop", options: { viewport: { width: 1440, height: 900 } } },
  { name: "mobile", options: { ...devices["iPhone 13"] } },
];
const browser = await chromium.launch({ headless: true });
const results = [];
const failures = [];

for (const profile of profiles) {
  const context = await browser.newContext(profile.options);
  await context.addInitScript(() => {
    window.__nmPerformance = { lcp: 0, cls: 0 };
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      window.__nmPerformance.lcp = entries.at(-1)?.startTime ?? 0;
    }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) window.__nmPerformance.cls += entry.value;
      }
    }).observe({ type: "layout-shift", buffered: true });
  });
  const page = await context.newPage();
  const consoleErrors = [];
  const failedRequests = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  page.on("requestfailed", (request) => failedRequests.push(`${request.url()} :: ${request.failure()?.errorText}`));
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  const metrics = await page.evaluate(() => {
    const navigation = performance.getEntriesByType("navigation")[0];
    const resources = performance.getEntriesByType("resource");
    const fcp = performance.getEntriesByName("first-contentful-paint")[0]?.startTime ?? 0;
    return {
      fcpMs: Math.round(fcp),
      lcpMs: Math.round(window.__nmPerformance.lcp),
      cls: Number(window.__nmPerformance.cls.toFixed(4)),
      responseMs: Math.round(navigation.responseStart),
      domContentLoadedMs: Math.round(navigation.domContentLoadedEventEnd),
      loadMs: Math.round(navigation.loadEventEnd),
      transferKb: Math.round(resources.reduce((sum, entry) => sum + (entry.transferSize || 0), 0) / 1024),
      resourceCount: resources.length,
    };
  });
  const record = { profile: profile.name, ...metrics, consoleErrors, failedRequests };
  results.push(record);
  if (metrics.lcpMs > 2500 || metrics.cls > 0.1 || consoleErrors.length || failedRequests.length) failures.push(record);
  await context.close();
}

await browser.close();
console.log(JSON.stringify({ basis: "unthrottled Playwright lab timing; not field CWV", thresholds: { lcpMs: 2500, cls: 0.1 }, results, failures }, null, 2));
if (failures.length) process.exitCode = 1;