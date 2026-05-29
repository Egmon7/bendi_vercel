"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { CITIES } from "@/lib/constants";

export function HeroSection() {
  const router = useRouter();
  const [depart, setDepart] = useState("kinshasa");
  const [destination, setDestination] = useState("matadi");
  const [date, setDate] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const from = CITIES.find((c) => c.value === depart)?.label ?? depart;
    const to = CITIES.find((c) => c.value === destination)?.label ?? destination;
    const params = new URLSearchParams({ from, to, date });
    router.push(`/search-results?${params.toString()}`);
  };

  return (
    <section
      id="accueil"
      className="px-4 pb-16 pt-20 text-center sm:px-6 sm:pb-20 sm:pt-24 lg:px-8 lg:pt-28"
    >
      <div className="mx-auto max-w-3xl">
        <div className="mx-auto inline-flex max-w-full items-center gap-2 rounded-full border border-bc-border bg-bc-surface px-3 py-1 text-[11px] text-bc-text-secondary sm:text-[12px]">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
          <span className="truncate sm:whitespace-normal">
            Réservation bus en RDC — agences vérifiées
          </span>
        </div>

        <h1 className="mt-6 text-[1.65rem] font-semibold leading-tight tracking-tight sm:mt-8 sm:text-4xl lg:text-5xl lg:leading-[1.1]">
          Réservez vos billets de bus en quelques clics en RDC
        </h1>

        <p className="mx-auto mt-4 max-w-xl px-1 text-sm leading-relaxed text-bc-text-muted sm:mt-5 sm:text-base">
          Voyagez facilement entre Kinshasa, Matadi et toutes les grandes villes sans vous
          déplacer en agence.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-6 w-full max-w-2xl rounded-xl border border-bc-border bg-bc-surface p-3 sm:mt-8 sm:p-4 lg:mt-10 lg:rounded-full lg:p-1.5"
        >
          <div className="grid grid-cols-2 gap-2 lg:flex lg:items-center lg:gap-0">
            <div className="search-field relative col-span-1 lg:flex-1 lg:border-r lg:border-bc-border-subtle lg:px-3">
              <label
                htmlFor="depart"
                className="mb-0.5 block text-[10px] font-medium text-bc-text-muted sm:text-[11px] lg:sr-only"
              >
                Départ
              </label>
              <select
                id="depart"
                name="depart"
                value={depart}
                onChange={(e) => setDepart(e.target.value)}
                className="field-select w-full cursor-pointer appearance-none rounded-lg border border-bc-border-subtle bg-bc-surface-muted py-2 pl-2 pr-7 text-xs font-medium text-bc-text outline-none sm:text-sm lg:border-0 lg:bg-transparent lg:py-2.5 lg:pl-0"
              >
                {CITIES.map((city) => (
                  <option key={city.value} value={city.value}>
                    {city.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="search-field relative col-span-1 lg:flex-1 lg:border-r lg:border-bc-border-subtle lg:px-3">
              <label
                htmlFor="destination"
                className="mb-0.5 block text-[10px] font-medium text-bc-text-muted sm:text-[11px] lg:sr-only"
              >
                Destination
              </label>
              <select
                id="destination"
                name="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="field-select w-full cursor-pointer appearance-none rounded-lg border border-bc-border-subtle bg-bc-surface-muted py-2 pl-2 pr-7 text-xs font-medium text-bc-text outline-none sm:text-sm lg:border-0 lg:bg-transparent lg:py-2.5 lg:pl-0"
              >
                {CITIES.map((city) => (
                  <option key={city.value} value={city.value}>
                    {city.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="search-field relative col-span-2 lg:col-span-1 lg:flex-1 lg:border-r lg:border-bc-border-subtle lg:px-3">
              <label
                htmlFor="date-voyage"
                className="mb-0.5 block text-[10px] font-medium text-bc-text-muted sm:text-[11px] lg:sr-only"
              >
                Date
              </label>
              <input
                type="date"
                id="date-voyage"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full cursor-pointer rounded-lg border border-bc-border-subtle bg-bc-surface-muted py-2 pl-2 text-xs font-medium text-bc-text outline-none sm:text-sm lg:border-0 lg:bg-transparent lg:py-2.5 lg:pl-0"
              />
            </div>

            <button
              type="submit"
              className="col-span-2 inline-flex items-center justify-center gap-1.5 rounded-lg bg-neutral-950 py-2 text-xs font-semibold text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 sm:text-sm lg:col-span-1 lg:mx-1 lg:rounded-full lg:px-5 lg:py-2.5"
            >
              <svg
                className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              Rechercher
            </button>
          </div>
        </form>

        <div className="mt-6 flex flex-row flex-wrap items-center justify-center gap-2 px-1 sm:mt-8 sm:gap-3">
          <Link
            href="#agences"
            className="inline-flex items-center justify-center rounded-full bg-neutral-950 px-4 py-2 text-xs font-bold text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 sm:px-6 sm:py-2.5 sm:text-sm sm:font-semibold"
          >
            Voir les agences
          </Link>
          <Link
            href="#trajets"
            className="inline-flex items-center justify-center rounded-full border border-bc-border bg-bc-surface px-4 py-2 text-xs font-bold text-bc-text hover:bg-bc-hover sm:px-6 sm:py-2.5 sm:text-sm sm:font-semibold"
          >
            Voir les trajets
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-1.5 sm:mt-12 sm:gap-2">
          {CITIES.map((city) => (
            <span
              key={city.value}
              className="rounded-full border border-bc-border bg-bc-surface px-2.5 py-1 text-[11px] font-medium text-bc-text-secondary sm:px-3 sm:py-1.5 sm:text-[12px]"
            >
              {city.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
