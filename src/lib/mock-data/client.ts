import { AGENCIES } from "@/lib/constants";

export type SearchResult = {
  id: string;
  agency: string;
  agencyId: string;
  from: string;
  to: string;
  time: string;
  price: string;
  remaining: number;
  rating: number;
};

export const SEARCH_RESULTS: SearchResult[] = [
  {
    id: "sr-1",
    agency: "Pascal Transport",
    agencyId: "agency-1",
    from: "Kinshasa",
    to: "Matadi",
    time: "06h00",
    price: "45 $",
    remaining: 12,
    rating: 4.5,
  },
  {
    id: "sr-2",
    agency: "Pascal Transport",
    agencyId: "agency-1",
    from: "Kinshasa",
    to: "Matadi",
    time: "14h00",
    price: "45 $",
    remaining: 8,
    rating: 4.5,
  },
  {
    id: "sr-3",
    agency: "Rompaga Express",
    agencyId: "agency-2",
    from: "Kinshasa",
    to: "Matadi",
    time: "08h00",
    price: "40 $",
    remaining: 20,
    rating: 4.3,
  },
  {
    id: "sr-4",
    agency: "Rompaga Express",
    agencyId: "agency-2",
    from: "Kinshasa",
    to: "Matadi",
    time: "16h00",
    price: "40 $",
    remaining: 18,
    rating: 4.3,
  },
  {
    id: "sr-5",
    agency: "Limete Travel",
    agencyId: "agency-3",
    from: "Kinshasa",
    to: "Matadi",
    time: "07h00",
    price: "42 $",
    remaining: 15,
    rating: 4.6,
  },
];

export const CLIENT_TICKETS = [
  {
    id: "BC-2041",
    clientId: "client-1",
    route: "Kinshasa → Matadi",
    date: "28 mai 2026",
    time: "06h00",
    agency: "Pascal Transport",
    seats: 2,
    status: "confirmed" as const,
    qrCode: "BC-2041-PATRICK",
  },
  {
    id: "BC-1988",
    clientId: "client-1",
    route: "Kinshasa → Boma",
    date: "12 avr. 2026",
    time: "07h30",
    agency: "Rompaga Express",
    seats: 1,
    status: "completed" as const,
    qrCode: "BC-1988-PATRICK",
  },
  {
    id: "BC-2050",
    clientId: "client-2",
    route: "Kinshasa → Matadi",
    date: "30 mai 2026",
    time: "14h00",
    agency: "Pascal Transport",
    seats: 1,
    status: "confirmed" as const,
    qrCode: "BC-2050-GRACE",
  },
];

export const CLIENT_REVIEWS = [
  {
    id: "cr-1",
    clientId: "client-1",
    agency: "Pascal Transport",
    rating: 5,
    comment: "Excellent service, bus propre et ponctuel.",
    date: "18 mai 2026",
  },
];

export const POPULAR_CITIES = ["Kinshasa", "Matadi", "Boma", "Kikwit", "Bandundu"];

export const AVAILABLE_AGENCIES = AGENCIES.map((a) => ({
  ...a,
  routes: a.name === "Pascal Transport" ? 12 : a.name === "Rompaga Express" ? 9 : 15,
}));

export function filterSearchResults(from?: string, to?: string) {
  if (!from && !to) return SEARCH_RESULTS;
  return SEARCH_RESULTS.filter((r) => {
    const matchFrom = !from || r.from.toLowerCase() === from.toLowerCase();
    const matchTo = !to || r.to.toLowerCase() === to.toLowerCase();
    return matchFrom && matchTo;
  });
}

export function filterClientTickets(clientId: string) {
  return CLIENT_TICKETS.filter((t) => t.clientId === clientId);
}
