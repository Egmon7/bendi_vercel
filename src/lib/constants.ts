export const CITIES = [
  { value: "kinshasa", label: "Kinshasa" },
  { value: "matadi", label: "Matadi" },
  { value: "boma", label: "Boma" },
  { value: "kikwit", label: "Kikwit" },
  { value: "bandundu", label: "Bandundu" },
  { value: "tshikapa", label: "Tshikapa" },
  { value: "mbuji-mayi", label: "Mbuji-Mayi" },
  { value: "kananga", label: "Kananga" },
  { value: "goma", label: "Goma" },
] as const;

export const POPULAR_ROUTES = [
  {
    from: "Kinshasa",
    to: "Matadi",
    price: "30$ – 60$",
    schedule: "06h00 / 14h00",
    agencies: 3,
  },
  {
    from: "Kinshasa",
    to: "Boma",
    price: "25$ – 55$",
    schedule: "07h30 / 15h00",
    agencies: 2,
  },
  {
    from: "Kinshasa",
    to: "Kikwit",
    price: "20$ – 45$",
    schedule: "05h30 / 13h00",
    agencies: 4,
  },
] as const;

export const AGENCIES = [
  { name: "Pascal Transport", rating: 4.5, tripsPerDay: 12 },
  { name: "Rompaga Express", rating: 4.3, tripsPerDay: 9 },
  { name: "Limete Travel", rating: 4.6, tripsPerDay: 15 },
] as const;

export const HOW_IT_WORKS_STEPS = [
  { step: "01", title: "Recherchez votre trajet" },
  { step: "02", title: "Réservez votre place" },
  { step: "03", title: "Payez à l'agence ou en ligne", wide: true },
  { step: "04", title: "Recevez votre ticket" },
  { step: "05", title: "Voyagez en toute tranquillité", wide: true },
] as const;

export const WHY_CHOOSE_US = [
  "Réservation simple et rapide",
  "Moins de déplacements en agence",
  "Agences vérifiées",
  "Support client local",
  "Solution adaptée à la RDC",
] as const;
