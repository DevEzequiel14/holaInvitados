/**
 * Lista en vivo de Giuliano — pegar en Extensiones > Apps Script
 *
 * 1. Creá una Google Sheet (ej: "Giuliano — Confirmaciones").
 * 2. Extensiones > Apps Script, borrá el código de ejemplo y pegá este archivo.
 * 3. Proyecto > Configuración del proyecto > Propiedades del script:
 *    SECRET = una palabra secreta (la misma que RSVP_SHEET_SECRET en .env)
 * 4. Implementar > Nueva implementación > Tipo: Aplicación web
 *    - Descripción: rsvp
 *    - Ejecutar como: Yo
 *    - Quién tiene acceso: Cualquiera
 * 5. Copiá la URL y ponela en .env como RSVP_SHEET_WEBHOOK
 * 6. Compartí la Sheet con Selena y Martín (pueden ver).
 */

function doPost(e) {
  const secret = PropertiesService.getScriptProperties().getProperty("SECRET") || "";
  const data = JSON.parse(e.postData.contents);

  if (secret && data.secret !== secret) {
    return json_({ ok: false });
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  ensureHeaders_(sheet);
  sheet.appendRow([
    data.fecha || "",
    data.nombre || "",
    data.asiste || "",
    data.cantidad ?? "",
    data.comentario || "",
  ]);

  return json_({ ok: true });
}

function ensureHeaders_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Fecha", "Nombre", "¿Asiste?", "Cantidad", "Comentario"]);
    sheet.getRange(1, 1, 1, 5).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
}

function json_(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON
  );
}
