"use client";

import { getSession } from "@/lib/auth";
import { ClientSearchForm } from "@/components/client/ClientSearchForm";
import { PageHeader, Panel } from "@/components/dashboard/ui";
import { AVAILABLE_AGENCIES, POPULAR_CITIES } from "@/lib/mock-data/client";

export default function ClientDashboardPage() {
  const session = getSession();
  const firstName = session?.name.split(" ")[0] ?? "Voyageur";

  return (
    <>
      <PageHeader
        title={`Bonjour, ${firstName}`}
        subtitle="Recherchez un trajet, explorez les villes populaires et les agences disponibles."
      />

      <Panel title="Rechercher un voyage">
        <ClientSearchForm />
      </Panel>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel title="Villes populaires">
          <div className="flex flex-wrap gap-2">
            {POPULAR_CITIES.map((city) => (
              <span
                key={city}
                className="rounded-full border border-bc-border bg-bc-surface-muted px-3 py-1.5 text-sm font-medium text-bc-text-secondary"
              >
                {city}
              </span>
            ))}
          </div>
        </Panel>

        <Panel title="Agences disponibles">
          <div className="space-y-3">
            {AVAILABLE_AGENCIES.map((agency) => (
              <article key={agency.name} className="flex items-center justify-between rounded-xl bg-bc-surface-muted px-4 py-3">
                <div>
                  <p className="font-medium">{agency.name}</p>
                  <p className="text-sm text-bc-text-muted">★ {agency.rating} · {agency.tripsPerDay} voyages/jour</p>
                </div>
                <span className="text-xs text-bc-text-faint">{agency.routes} trajets</span>
              </article>
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}
