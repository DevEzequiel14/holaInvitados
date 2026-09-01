import { getSecret } from "astro:env/server";
import { formatSheetRow, type Rsvp } from "./rsvp";

export async function appendToSheet(row: Rsvp) {
  const webhook = (getSecret("RSVP_SHEET_WEBHOOK") ?? "").trim();
  if (!webhook) return false;

  const payload = {
    secret: getSecret("RSVP_SHEET_SECRET") ?? "",
    ...formatSheetRow(row),
  };

  const response = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Google Sheets respondió ${response.status}`);
  }

  const data = (await response.json().catch(() => ({}))) as { ok?: boolean };
  if (data.ok === false) {
    throw new Error("Google Sheets rechazó el RSVP");
  }

  return true;
}
