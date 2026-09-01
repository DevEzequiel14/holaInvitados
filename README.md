# Hola Invitados

Invitación digital de Astro. La página se genera estática; el RSVP corre en el endpoint `/api/rsvp` y guarda las respuestas en Google Sheets.

## Desarrollo

```sh
npm install
cp .env.example .env
npm run dev
```

En local, si no hay webhook, las confirmaciones se guardan en `data/rsvps.json`.

## Deploy en Vercel

1. Subí el repo a GitHub y en [vercel.com](https://vercel.com) → **Add New Project** → importá el repositorio.
2. Dejá el framework en **Astro**. Vercel detecta `npm run build`.
3. En **Project Settings → Environment Variables** cargá:

   | Variable | Dónde | Qué es |
   | --- | --- | --- |
   | `RSVP_SHEET_WEBHOOK` | Production, Preview, Development | URL del webhook de Google Apps Script |
   | `RSVP_SHEET_SECRET` | Production, Preview, Development | El mismo secreto que usa el script |

   No uses el prefijo `PUBLIC_`: son secretos de servidor.

4. En **Settings → General → Node.js Version** elegí **22.x**.
5. Deploy. La invitación queda en la raíz (`https://holainvitados.vercel.app/`). `/giuliano` redirige ahí.
6. Probá el RSVP en el deploy de Preview: tiene que aparecer una fila nueva en la hoja.

En Vercel el archivo `data/rsvps.json` no persiste. Si falta el webhook, el formulario responde error en lugar de fingir que se guardó.
