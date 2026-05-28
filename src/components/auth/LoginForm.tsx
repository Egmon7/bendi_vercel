"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useEffect, useRef, useState } from "react";
import { Logo } from "@/components/Logo";
import { inputClassName } from "@/components/dashboard/ui";
import {
  getDashboardPath,
  getSession,
  login,
  logout,
  TEST_ACCOUNTS,
} from "@/lib/auth";

function LoginFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next");
  const fresh = searchParams.get("fresh") === "1";
  const handledRef = useRef(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (handledRef.current) return;
    handledRef.current = true;

    if (fresh) {
      logout();
      return;
    }

    const session = getSession();
    if (session) {
      router.replace(next && session.role === "client" ? next : getDashboardPath(session.role));
    }
  }, [fresh, next, router]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const result = login(email, password);
    if (result.ok) {
      if (next && result.user.role === "client") {
        router.push(next);
      } else {
        router.push(getDashboardPath(result.user.role));
      }
    } else {
      setError(result.message);
    }
  };

  const fillCredentials = (accountEmail: string, accountPassword: string) => {
    setEmail(accountEmail);
    setPassword(accountPassword);
    setError("");
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-10">
      <Link href="/" className="mb-8 flex items-center justify-center gap-2">
        <Logo />
        <span className="text-lg font-semibold">BusConnect</span>
      </Link>

      <div className="rounded-2xl border border-bc-border bg-bc-surface p-6 shadow-sm sm:p-8">
        <h1 className="text-xl font-semibold">Connexion</h1>
        <p className="mt-1 text-sm text-bc-text-muted">
          Accédez à votre espace selon votre rôle.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-bc-text-secondary">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 ${inputClassName}`}
              placeholder="vous@email.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-bc-text-secondary">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 ${inputClassName}`}
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-full bg-neutral-950 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
          >
            Se connecter
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-bc-text-muted">
          Pas de compte ?{" "}
          <Link href="/register" className="font-medium text-bc-text hover:underline">
            S&apos;inscrire
          </Link>
        </p>
      </div>

      <div className="mt-6 rounded-xl border border-dashed border-bc-border bg-bc-surface p-4 text-xs text-bc-text-secondary">
        <p className="font-semibold text-bc-text">Comptes fictifs (test)</p>
        <ul className="mt-2 space-y-2">
          {TEST_ACCOUNTS.map((account) => (
            <li key={account.email}>
              <strong>{account.label}</strong> — {account.email} / {account.password}{" "}
              <button
                type="button"
                onClick={() => fillCredentials(account.email, account.password)}
                className="ml-1 text-violet-600 hover:underline dark:text-violet-400"
              >
                Remplir
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function LoginForm() {
  return (
    <Suspense fallback={null}>
      <LoginFormInner />
    </Suspense>
  );
}
