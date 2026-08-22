import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { indexableRoutes } from "./src/data/indexable-routes.mjs";
import { isIndexingEnabled } from "./src/config/indexing-gate.mjs";

const indexable = isIndexingEnabled(process.env);

export default defineConfig({
  site: "https://nightmaremode.net",
  output: "static",
  trailingSlash: "always",
  integrations: indexable
    ? [sitemap({ filter: (page) => indexableRoutes.includes(new URL(page).pathname) })]
    : [],
  devToolbar: {
    enabled: false,
  },
  build: {
    format: "directory",
  },
});
