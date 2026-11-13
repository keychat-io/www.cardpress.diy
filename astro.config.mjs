import { parseArgs } from "node:util";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

// Astro loads this file before Vite's env files. Match the CLI's mode selection;
// NODE_ENV describes runtime behavior and does not select a custom env mode.
const { values, positionals } = parseArgs({
  options: { mode: { type: "string" } },
  strict: false,
  allowPositionals: true,
});
const mode =
  values.mode ?? (positionals.includes("dev") ? "development" : "production");
const env = loadEnv(mode, process.cwd(), "PUBLIC_");
const site = env.PUBLIC_SITE_URL || "https://cardpress.invalid";

export default defineConfig({
  site,
  trailingSlash: "always",
  output: "static",
  devToolbar: { enabled: false },
});
