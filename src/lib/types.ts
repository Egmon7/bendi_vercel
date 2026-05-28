export type UserRole = "admin" | "agency" | "client";

export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  agencyName?: string;
};

export type SessionUser = Omit<User, "password">;

export type LoginResult =
  | { ok: true; user: SessionUser }
  | { ok: false; message: string };
