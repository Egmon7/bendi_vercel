"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LOGIN_FRESH_URL } from "@/lib/auth";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-bc-border bg-bc-bg">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <Link href="/" className="flex min-w-0 shrink items-center gap-2">
          <Logo />
          <span className="truncate text-sm font-semibold tracking-tight sm:text-[15px]">
            BusConnect
          </span>
        </Link>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Link href={LOGIN_FRESH_URL} className="text-[13px] text-bc-text-secondary hover:text-bc-text">
            Se connecter
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-neutral-950 px-4 py-2 text-[13px] font-medium text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
          >
            S&apos;inscrire
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-bc-border text-bc-text-secondary hover:bg-bc-hover md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      <nav
        id="mobile-menu"
        className={`border-t border-bc-border bg-bc-surface px-3 py-2 md:hidden ${menuOpen ? "block" : "hidden"}`}
        aria-label="Navigation mobile"
      >
        <div className="flex items-center gap-2">
          <ThemeToggle size="sm" />
          <Link
            href={LOGIN_FRESH_URL}
            className="flex-1 rounded-lg px-2 py-1.5 text-center text-[13px] text-bc-text-secondary hover:bg-bc-hover"
            onClick={closeMenu}
          >
            Se connecter
          </Link>
          <Link
            href="/register"
            className="shrink-0 rounded-full bg-neutral-950 px-3 py-1.5 text-[13px] font-medium text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
            onClick={closeMenu}
          >
            S&apos;inscrire
          </Link>
        </div>
      </nav>
    </header>
  );
}
