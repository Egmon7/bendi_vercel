"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { filterSearchResults } from "@/lib/mock-data/client";

function SearchResultsInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const from = searchParams.get("from") ?? "";
  const to = searchParams.get("to") ?? "";
  const date = searchParams.get("date") ?? "";
  const results = filterSearchResults(from, to);

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Résultats de recherche</h1>
        <p className="mt-1 text-sm text-bc-text-muted">
          {from && to ? `${from} → ${to}` : "Trajets disponibles"}
          {date && ` · ${date}`}
        </p>
      </div>

      <div className="space-y-4">
        {results.length === 0 ? (
          <p className="rounded-2xl border border-bc-border bg-bc-surface p-8 text-center text-bc-text-muted">
            Aucun trajet trouvé.
          </p>
        ) : (
          results.map((result) => (
            <article
              key={result.id}
              className="flex flex-col gap-4 rounded-2xl border border-bc-border bg-bc-surface p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold">{result.agency}</p>
                <p className="mt-1 text-sm text-bc-text-muted">
                  {result.from} → {result.to} · {result.time} · {result.price}
                </p>
                <p className="mt-1 text-xs text-bc-text-faint">
                  {result.remaining} places restantes · ★ {result.rating}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="rounded-full border border-bc-border px-4 py-2 text-sm font-medium text-bc-text-secondary hover:bg-bc-hover"
                >
                  Comparer
                </button>
                <button
                  type="button"
                  onClick={() =>
                    router.push(
                      `/client/booking?trip=${result.id}&from=${encodeURIComponent(result.from)}&to=${encodeURIComponent(result.to)}&agency=${encodeURIComponent(result.agency)}&time=${result.time}&price=${encodeURIComponent(result.price)}`,
                    )
                  }
                  className="rounded-full bg-neutral-950 px-5 py-2 text-sm font-medium text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
                >
                  Choisir ce trajet
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </>
  );
}

export function ClientSearchResults() {
  return (
    <Suspense fallback={<p className="text-bc-text-muted">Chargement…</p>}>
      <SearchResultsInner />
    </Suspense>
  );
}
