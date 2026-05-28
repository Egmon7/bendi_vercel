"use client";

import { useEffect, useState } from "react";
import { getStoredTheme, setTheme, type Theme } from "@/lib/theme";

function SunIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a6 6 0 100-12 6 6 0 000 12z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25v2.5M12 19.25v2.5M4.22 4.22l1.77 1.77M18.01 18.01l1.77 1.77M2.25 12h2.5M19.25 12h2.5M4.22 19.78l1.77-1.77M18.01 5.99l1.77-1.77" />
    </svg>
  );
}

function MoonIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
    </svg>
  );
}

export function ThemeToggle({
  className = "",
  variant = "default",
  size = "md",
}: {
  className?: string;
  variant?: "default" | "sidebar";
  size?: "sm" | "md";
}) {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    setThemeState(getStoredTheme());

    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<Theme>).detail;
      if (detail === "light" || detail === "dark") setThemeState(detail);
    };

    window.addEventListener("busconnect-theme-change", onChange);
    return () => window.removeEventListener("busconnect-theme-change", onChange);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setThemeState(next);
    setTheme(next);
  };

  const variantClass =
    variant === "sidebar"
      ? "border-white/10 bg-white/5 text-neutral-200 hover:bg-white/10"
      : "border-bc-border bg-bc-surface text-bc-text-secondary hover:bg-bc-hover";

  const sizeClass = size === "sm" ? "h-7 w-7 rounded-md" : "h-9 w-9 rounded-lg";
  const iconClass = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"}
      title={theme === "dark" ? "Mode clair" : "Mode sombre"}
      className={`inline-flex shrink-0 items-center justify-center border transition-colors ${sizeClass} ${variantClass} ${className}`}
    >
      {theme === "dark" ? <SunIcon className={iconClass} /> : <MoonIcon className={iconClass} />}
    </button>
  );
}
