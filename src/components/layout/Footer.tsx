import Link from "next/link";
import { Logo } from "@/components/Logo";

const FOOTER_LINKS = [
  { href: "#", label: "À propos" },
  { href: "#", label: "Contact" },
  { href: "#", label: "Conditions" },
  { href: "#", label: "Confidentialité" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-bc-border bg-[#0c0b18] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 dark:border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center text-sm text-neutral-400 md:flex-row md:items-center md:justify-between md:text-left">
        <div className="flex items-center justify-center gap-2">
          <Logo variant="dark" className="[&_span]:h-2 [&_span]:w-2" />
          <span className="font-medium text-white">BusConnect</span>
        </div>
        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 md:justify-start">
          {FOOTER_LINKS.map((link) => (
            <Link key={link.label} href={link.href} className="hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-xs text-neutral-500">&copy; {year} BusConnect</p>
      </div>
    </footer>
  );
}
