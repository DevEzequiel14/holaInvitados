// @ts-check
import vercel from "@astrojs/vercel";
import { defineConfig, envField } from "astro/config";

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),
  env: {
    schema: {
      RSVP_SHEET_WEBHOOK: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
      RSVP_SHEET_SECRET: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
    },
  },
});