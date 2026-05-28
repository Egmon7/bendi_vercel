import type { LoginResult, SessionUser, User, UserRole } from "./types";

const SESSION_KEY = "busconnect_session";

/** Lien « Se connecter » : affiche toujours le formulaire (déconnecte la session précédente). */
export const LOGIN_FRESH_URL = "/login?fresh=1";

export const MOCK_USERS: User[] = [
  {
    id: "admin-1",
    email: "admin@busconnect.cd",
    password: "admin123",
    name: "Administrateur BusConnect",
    role: "admin",
  },
  {
    id: "agency-1",
    email: "pascal@transport.cd",
    password: "agence123",
    name: "Pascal Transport",
    role: "agency",
    agencyName: "Pascal Transport",
  },
  {
    id: "agency-2",
    email: "rompaga@transport.cd",
    password: "agence123",
    name: "Rompaga Express",
    role: "agency",
    agencyName: "Rompaga Express",
  },
  {
    id: "client-1",
    email: "patrick.kabila@email.com",
    password: "client123",
    name: "Patrick Kabila",
    role: "client",
  },
  {
    id: "client-2",
    email: "grace.mujinga@email.com",
    password: "client123",
    name: "Grace Mujinga",
    role: "client",
  },
];

export const TEST_ACCOUNTS = [
  { label: "Admin", email: "admin@busconnect.cd", password: "admin123" },
  { label: "Agence Pascal", email: "pascal@transport.cd", password: "agence123" },
  { label: "Agence Rompaga", email: "rompaga@transport.cd", password: "agence123" },
  { label: "Client Patrick", email: "patrick.kabila@email.com", password: "client123" },
  { label: "Cliente Grace", email: "grace.mujinga@email.com", password: "client123" },
] as const;

export function getDashboardPath(role: UserRole): string {
  switch (role) {
    case "admin":
      return "/admin/dashboard";
    case "agency":
      return "/agency/dashboard";
    case "client":
      return "/client/dashboard";
  }
}

function toSessionUser(user: User): SessionUser {
  const { password: _, ...sessionUser } = user;
  return sessionUser;
}

export function login(email: string, password: string): LoginResult {
  const user = MOCK_USERS.find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password,
  );

  if (!user) {
    return { ok: false, message: "Email ou mot de passe incorrect." };
  }

  const sessionUser = toSessionUser(user);
  if (typeof window !== "undefined") {
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
  }

  return { ok: true, user: sessionUser };
}

export function logout(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(SESSION_KEY);
  }
}

export function getSession(): SessionUser | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as SessionUser;
  } catch {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function isLoggedIn(): boolean {
  return getSession() !== null;
}
