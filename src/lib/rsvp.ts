export type Rsvp = {
  timestamp: string;
  nombre: string;
  asiste: "si" | "no";
  cantidad: number;
  comentario: string;
};

export function formatSheetRow(row: Rsvp) {
  const fecha = new Intl.DateTimeFormat("es-AR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Argentina/Buenos_Aires",
  }).format(new Date(row.timestamp));

  return {
    fecha,
    nombre: row.nombre,
    asiste: row.asiste === "si" ? "Sí" : "No",
    cantidad: row.cantidad,
    comentario: row.comentario,
  };
}
