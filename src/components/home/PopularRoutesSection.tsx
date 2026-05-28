import Link from "next/link";
import { POPULAR_ROUTES } from "@/lib/constants";

export function PopularRoutesSection() {
  return (
    <section id="trajets" className="bg-bc-bg px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
          <div className="min-w-0">
            <h2 className="text-lg font-semibold tracking-tight sm:text-2xl">
              Trajets les plus demandés
            </h2>
            <p className="mt-1 text-sm text-bc-text-muted">
              Kinshasa, Matadi, Boma, Kikwit, Bandundu, Tshikapa…
            </p>
          </div>
          <Link
            href="#"
            className="shrink-0 text-sm font-medium text-bc-text-secondary hover:text-bc-text"
          >
            Voir tous les trajets →
          </Link>
        </div>

        <div className="mt-6 divide-y divide-bc-border-subtle rounded-2xl border border-bc-border bg-bc-surface sm:mt-8">
          {POPULAR_ROUTES.map((route) => (
            <article
              key={`${route.from}-${route.to}`}
              className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-6"
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold">
                  {route.from} → {route.to}
                </p>
                <p className="mt-1 text-xs text-bc-text-muted sm:text-sm">
                  {route.price} · {route.schedule} · {route.agencies} agences
                </p>
              </div>
              <button
                type="button"
                className="w-full shrink-0 rounded-full bg-neutral-950 px-4 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 sm:w-auto sm:py-2"
              >
                Réserver
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
