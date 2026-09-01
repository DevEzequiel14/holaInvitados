export const event = {
  slug: "giuliano",
  honoree: "Giuliano Donaire Escudero",
  firstName: "Giuliano",
  ageLabel: "1 año",
  headline: "Mi primer añito",
  inviteLine: "Te invito a festejar",
  packLine: "Hay un leoncito nuevo en la manada",
  hosts: ["Selena Escudero", "Martín Donaire"],
  hostsLine: "Mamá Selena y papá Martín los esperan con el corazón abierto",
  closing: "Con todo mi amor, Giuliano",
  dateLabel: "Martes 29 de septiembre",
  timeLabel: "17 a 21 h",
  startIso: "2026-09-29T17:00:00-03:00",
  endIso: "2026-09-29T21:00:00-03:00",
  venue: "Quincho El Tata",
  address: "C. Puerto Argentino 1789, Palpalá, Jujuy",
  mapsUrl: "https://maps.app.goo.gl/BM6QDJQHtUoAE84T7",
  wazeUrl: "https://waze.com/ul?ll=-24.2741707,-65.2179471&navigate=yes",
  rsvpDeadlineLabel: "28 de septiembre",
  rsvpClosesIso: "2026-09-28T23:59:59-03:00",
  whenTitle: "El gran día",
  whenLead: "Ojalá puedas estar. Va a haber abrazos, torta y mucha alegría.",
  countdownTitle: "Se viene mi añito",
  mapsTitle: "Te esperamos acá",
  mapsLead: "El quincho queda en Palpalá. Si te perdés, avisá: te vamos a ir a buscar con una sonrisa.",
  rsvpTitle: "Me haría muy feliz que vengas",
  rsvpIntro: "Contame si vas a estar, así te guardamos un lugar. Hasta el 28 de septiembre, con tiempo y con cariño.",
  thanksYes: "¡Qué alegría! Ya los anotamos. El 29 los recibimos con un abrazo enorme.",
  thanksNo: "Gracias por avisarnos. Los vamos a extrañar, pero igual los queremos un montón.",
  icsPath: "/giuliano.ics",
} as const;

export const pageTitle = `${event.firstName} — ${event.headline}`;

export const pageDescription =
  "Te invito a festejar mi primer añito. El 29 de septiembre, de 17 a 21 h, en Quincho El Tata, Palpalá. Me haría muy feliz que vengas.";

export const googleCalendarUrl =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  `&text=${encodeURIComponent(`${event.firstName} — ${event.headline}`)}` +
  "&dates=20260929T170000/20260929T210000" +
  "&ctz=America/Argentina/Buenos_Aires" +
  `&location=${encodeURIComponent(`${event.venue}, ${event.address}`)}` +
  `&details=${encodeURIComponent(`${event.inviteLine} ${event.headline}. ${event.hostsLine}.`)}`;
