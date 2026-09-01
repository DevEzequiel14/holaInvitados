/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly RSVP_SHEET_WEBHOOK?: string;
  readonly RSVP_SHEET_SECRET?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
