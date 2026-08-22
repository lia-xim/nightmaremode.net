import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { indexableRoutes } from "./src/data/indexable-routes.mjs";

const indexable = process.env.PUBLIC_SITE_INDEXABLE === "true";

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
