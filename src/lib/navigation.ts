import type { UserRole } from "./types";

export type NavItem = {
  href: string;
  label: string;
  icon: string;
};

export const ADMIN_NAV: NavItem[] = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "home" },
  { href: "/admin/agencies", label: "Gestion des agences", icon: "building" },
  { href: "/admin/reservations", label: "Gestion des réservations", icon: "ticket" },
  { href: "/admin/users", label: "Gestion des utilisateurs", icon: "users" },
  { href: "/admin/finance", label: "Gestion financière", icon: "finance" },
  { href: "/admin/analytics", label: "Analytics & statistiques", icon: "chart" },
  { href: "/admin/settings", label: "Paramètres plateforme", icon: "settings" },
];

export const AGENCY_NAV: NavItem[] = [
  { href: "/agency/dashboard", label: "Dashboard", icon: "home" },
  { href: "/agency/trips", label: "Gestion des trajets", icon: "bus" },
  { href: "/agency/reservations", label: "Réservations", icon: "ticket" },
  { href: "/agency/travelers", label: "Liste voyageurs", icon: "users" },
  { href: "/agency/payments", label: "Paiements", icon: "finance" },
  { href: "/agency/reviews", label: "Avis & notes", icon: "star" },
  { href: "/agency/settings", label: "Paramètres agence", icon: "settings" },
];

export const CLIENT_NAV: NavItem[] = [
  { href: "/client/dashboard", label: "Accueil", icon: "home" },
  { href: "/client/my-tickets", label: "Mes billets", icon: "ticket" },
  { href: "/client/profile", label: "Profil", icon: "users" },
  { href: "/client/reviews", label: "Avis & commentaires", icon: "star" },
];

export function getNavForRole(role: UserRole): NavItem[] {
  switch (role) {
    case "admin":
      return ADMIN_NAV;
    case "agency":
      return AGENCY_NAV;
    case "client":
      return CLIENT_NAV;
  }
}

export function getRoleLabel(role: UserRole): string {
  switch (role) {
    case "admin":
      return "Administrateur";
    case "agency":
      return "Agence partenaire";
    case "client":
      return "Voyageur";
  }
}
