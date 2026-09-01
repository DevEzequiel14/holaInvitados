import type { APIRoute } from "astro";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { appendToSheet } from "../../lib/sheets";
import type { Rsvp } from "../../lib/rsvp";

export const prerender = false;

const FILE = path.join(process.cwd(), "data", "rsvps.json");

async function appendLocal(row: Rsvp) {
  await mkdir(path.dirname(FILE), { recursive: true });
  let rows: Rsvp[] = [];
  try {
    rows = JSON.parse(await readFile(FILE, "utf8")) as Rsvp[];
  } catch {
    rows = [];
  }
  rows.push(row);
  await writeFile(FILE, JSON.stringify(rows, null, 2), "utf8");
}

export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();
  const honeypot = String(form.get("website") ?? "").trim();
  if (honeypot) {
    return json({ ok: true });
  }

  const nombre = String(form.get("nombre") ?? "").trim();
  const asisteRaw = String(form.get("asiste") ?? "");
  const comentario = String(form.get("comentario") ?? "").trim().slice(0, 280);
  const asiste = asisteRaw === "si" || asisteRaw === "no" ? asisteRaw : "";
  let cantidad = Number(form.get("cantidad"));

  if (!nombre || nombre.length > 80 || !asiste) {
    return json({ ok: false, error: "Completá nombre y si vas a venir." }, 400);
  }

  if (asiste === "no") cantidad = 0;
  if (asiste === "si" && (!Number.isFinite(cantidad) || cantidad < 1 || cantidad > 20)) {
    return json({ ok: false, error: "Indicá cuántas personas van." }, 400);
  }

  const row: Rsvp = {
    timestamp: new Date().toISOString(),
    nombre,
    asiste,
    cantidad,
    comentario,
  };

  try {
    const savedToSheet = await appendToSheet(row);
    const persistOnDisk = !process.env.VERCEL;

    if (!persistOnDisk) {
      if (!savedToSheet) {
        throw new Error("Falta RSVP_SHEET_WEBHOOK en Vercel");
      }
    } else {
      try {
        await appendLocal(row);
      } catch (error) {
        if (!savedToSheet) throw error;
        console.warn("RSVP en Sheet, pero no se pudo guardar el backup local", error);
      }
    }
  } catch (error) {
    console.error("No se pudo guardar el RSVP", error);
    return json({ ok: false, error: "No se pudo guardar." }, 500);
  }

  return json({ ok: true });
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
