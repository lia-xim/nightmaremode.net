import type { APIRoute } from "astro";
import { isIndexingEnabled } from "@/config/indexing-gate.mjs";

export const GET: APIRoute = () => {
  const indexable = isIndexingEnabled(import.meta.env);
  const body = indexable
    ? "User-agent: *\nAllow: /\nSitemap: https://nightmaremode.net/sitemap-index.xml\n"
    : "User-agent: *\nDisallow: /\n";

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
