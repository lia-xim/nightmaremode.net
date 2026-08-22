import { request } from "playwright";

const baseUrl = process.env.QA_BASE_URL ?? "http://127.0.0.1:4321";
const api = await request.newContext();
const seen = new Set(["/"]);
const queue = ["/"];
const checked = [];
const bad = [];

while (queue.length > 0) {
  const path = queue.shift();
  const response = await api.get(new URL(path, baseUrl).toString());
  const result = { path, status: response.status() };

  checked.push(result);

  if (!response.ok()) {
    bad.push(result);
  }

  const contentType = response.headers()["content-type"] ?? "";

  if (!contentType.includes("text/html")) {
    continue;
  }

  const html = await response.text();
  const links = html.matchAll(/href="([^"]+)"/g);

  for (const match of links) {
    const rawHref = match[1];

    if (!rawHref.startsWith("/") || rawHref.startsWith("/_astro/")) {
      continue;
    }

    const href = rawHref.split("#")[0].split("?")[0];

    if (/\.[a-z0-9]+$/i.test(href) || seen.has(href)) {
      continue;
    }

    seen.add(href);
    queue.push(href);
  }
}

await api.dispose();

console.log(
  JSON.stringify(
    {
      baseUrl,
      pagesChecked: checked.length,
      bad,
      checked,
    },
    null,
    2,
  ),
);

if (bad.length > 0) {
  process.exitCode = 1;
}
