import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { pageRegistry } from "../src/data/indexable-routes.mjs";

const root = process.cwd();
const dist = join(root, "dist");
const canonicalOrigin = "https://nightmaremode.net";
const failures = [];
const checked = [];

if (!existsSync(dist)) {
  console.error("dist is missing; run pnpm build before pnpm qa:links");
  process.exit(1);
}

const walk = (directory) => readdirSync(directory).flatMap((name) => {
  const path = join(directory, name);
  return statSync(path).isDirectory() ? walk(path) : [path];
});

const routeForFile = (file) => {
  const output = relative(dist, file).split(sep).join("/");
  if (output === "index.html") return "/";
  if (output === "404.html") return "/404/";
  return `/${output.replace(/\/index\.html$/, "")}/`;
};

const htmlFiles = walk(dist).filter((file) => file.endsWith(".html"));
const documents = new Map(htmlFiles.map((file) => [routeForFile(file), readFileSync(file, "utf8")]));
const registeredRoutes = new Set(pageRegistry.map((page) => page.route));
const linkGraph = new Map();

for (const page of pageRegistry) {
  if (!documents.has(page.route)) failures.push(`registered route has no built document: ${page.route}`);
}

for (const [route, html] of documents) {
  const links = [];
  for (const match of html.matchAll(/<a\b[^>]*\bhref=(["'])(.*?)\1/gi)) {
    const rawHref = match[2].trim();
    if (!rawHref || rawHref.startsWith("#") || /^(mailto:|tel:|javascript:)/i.test(rawHref)) continue;

    let url;
    try {
      url = new URL(rawHref, `${canonicalOrigin}${route}`);
    } catch {
      failures.push(`invalid link on ${route}: ${rawHref}`);
      continue;
    }

    if (url.origin !== canonicalOrigin) continue;
    const target = url.pathname.endsWith("/") || /\.[a-z0-9]+$/i.test(url.pathname)
      ? url.pathname
      : `${url.pathname}/`;
    if (/\.[a-z0-9]+$/i.test(target)) continue;

    links.push(target);
    checked.push({ from: route, to: target });
    if (!documents.has(target)) failures.push(`broken internal link: ${route} -> ${target}`);
  }
  linkGraph.set(route, [...new Set(links)]);
}

const reachable = new Set(["/"]);
const queue = ["/"];
while (queue.length) {
  const route = queue.shift();
  for (const target of linkGraph.get(route) ?? []) {
    if (reachable.has(target)) continue;
    reachable.add(target);
    queue.push(target);
  }
}

for (const page of pageRegistry.filter((entry) => entry.indexable)) {
  if (!reachable.has(page.route)) failures.push(`indexable route is orphaned from the homepage graph: ${page.route}`);
}

for (const route of documents.keys()) {
  if (!registeredRoutes.has(route)) failures.push(`built canonical page is missing from page registry: ${route}`);
}

const homepage = documents.get("/") ?? "";
if (!/<title>[^<]*Nightmare Mode[^<]*<\/title>/i.test(homepage)) {
  failures.push("built homepage identity check failed");
}

console.log(JSON.stringify({
  mode: "static-dist",
  pagesChecked: documents.size,
  internalLinksChecked: checked.length,
  indexableRoutes: pageRegistry.filter((page) => page.indexable).length,
  failures,
}, null, 2));

if (failures.length) process.exitCode = 1;
