"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { CITIES } from "@/lib/constants";
import { inputClassName, selectClassName } from "@/components/dashboard/ui";

type ClientSearchFormProps = {
  actionPath?: string;
};

export function ClientSearchForm({ actionPath = "/client/search-results" }: ClientSearchFormProps) {
  const router = useRouter();
  const [depart, setDepart] = useState("kinshasa");
  const [destination, setDestination] = useState("matadi");
  const [date, setDate] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const from = CITIES.find((c) => c.value === depart)?.label ?? depart;
    const to = CITIES.find((c) => c.value === destination)?.label ?? destination;
    const params = new URLSearchParams({ from, to, date });
    router.push(`${actionPath}?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-bc-border bg-bc-surface p-4 shadow-sm"
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-bc-text-muted">Départ</label>
          <select
            value={depart}
            onChange={(e) => setDepart(e.target.value)}
            className={selectClassName}
          >
            {CITIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-bc-text-muted">Destination</label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className={selectClassName}
          >
            {CITIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-bc-text-muted">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={inputClassName}
          />
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full rounded-full bg-neutral-950 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
          >
            Rechercher
          </button>
        </div>
      </div>
    </form>
  );
}
