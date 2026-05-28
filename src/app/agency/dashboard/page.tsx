"use client";

import { getSession } from "@/lib/auth";
import { PageHeader, Panel, StatCard, StatGrid, StatusBadge } from "@/components/dashboard/ui";
import { AGENCY_RESERVATIONS, AGENCY_TRIPS, filterByAgency } from "@/lib/mock-data/agency";

export default function AgencyDashboardPage() {
  const session = getSession();
  const agencyId = session?.id ?? "agency-1";
  const reservations = filterByAgency(AGENCY_RESERVATIONS, agencyId);
  const trips = filterByAgency(AGENCY_TRIPS, agencyId);
  const remaining = trips.reduce((sum, t) => sum + t.remaining, 0);

  return (
    <>
      <PageHeader
        title={`Dashboard — ${session?.agencyName ?? session?.name ?? "Agence"}`}
        subtitle="Réservations du jour, trajets actifs et revenus estimés."
      />
      <StatGrid>
        <StatCard label="Réservations du jour" value={String(reservations.length)} hint="Confirmées et en attente" />
        <StatCard label="Trajets actifs" value={String(trips.length)} hint="En ligne aujourd'hui" />
        <StatCard label="Places restantes" value={String(remaining)} hint="Sur tous les trajets" />
        <StatCard label="Revenus estimés" value="960 $" hint="Aujourd'hui" />
      </StatGrid>
      <div className="mt-6">
        <Panel title="Réservations du jour">
          <div className="divide-y divide-neutral-100">
            {reservations.map((item) => (
              <article key={item.id} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium">{item.client}</p>
                  <p className="text-sm text-neutral-500">
                    {item.route} · {item.time} · Place {item.seat}
                  </p>
                </div>
                <StatusBadge status={item.status === "confirmed" ? "confirmed" : "pending"} />
              </article>
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}
