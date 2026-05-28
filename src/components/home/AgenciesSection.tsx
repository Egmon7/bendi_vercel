import Link from "next/link";
import { AGENCIES } from "@/lib/constants";

function StarIcon() {
  return (
    <svg className="h-4 w-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M10 15.585l-5.317 2.795 1.016-5.922L1.4 8.414l5.946-.864L10 2.2l2.654 5.35 5.946.864-4.299 4.044 1.016 5.922L10 15.585z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function AgenciesSection() {
  return (
    <section id="agences" className="bg-bc-bg px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
          <div className="min-w-0">
            <h2 className="text-lg font-semibold tracking-tight sm:text-2xl">
              Agences de transport fiables
            </h2>
            <p className="mt-1 text-sm text-bc-text-muted">
              Pascal Transport, Rompaga Express, Limete Travel…
            </p>
          </div>
          <Link
            href="#"
            className="shrink-0 text-sm font-medium text-bc-text-secondary hover:text-bc-text"
          >
            Voir toutes les agences →
          </Link>
        </div>

        <div className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {AGENCIES.map((agency) => (
            <article
              key={agency.name}
              className="rounded-2xl border border-bc-border bg-bc-surface p-5"
            >
              <p className="font-semibold">{agency.name}</p>
              <p className="mt-1 flex items-center gap-1 text-sm text-bc-text-muted">
                <StarIcon />
                {agency.rating} · {agency.tripsPerDay} voyages/jour
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
