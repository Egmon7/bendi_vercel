import { PageHeader, Panel, StatCard, StatGrid } from "@/components/dashboard/ui";
import { ADMIN_ANALYTICS } from "@/lib/mock-data/admin";

export default function AdminAnalyticsPage() {
  const maxTrips = Math.max(...ADMIN_ANALYTICS.popularCities.map((c) => c.trips));

  return (
    <>
      <PageHeader
        title="Analytics & statistiques"
        subtitle="Villes populaires, agences performantes, billets vendus et croissance mensuelle."
      />

      <StatGrid>
        <StatCard label="Billets vendus" value={ADMIN_ANALYTICS.ticketsSold} hint="Total plateforme" />
        <StatCard label="Ville la plus populaire" value="Kinshasa" hint="842 trajets" />
        <StatCard label="Meilleure agence" value="Pascal Transport" hint="412 billets" />
        <StatCard label="Croissance mensuelle" value="+12%" hint="Mai 2026" />
      </StatGrid>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel title="Villes populaires">
          <div className="space-y-4">
            {ADMIN_ANALYTICS.popularCities.map((city) => (
              <div key={city.city}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-medium">{city.city}</span>
                  <span className="text-neutral-500">{city.trips} trajets</span>
                </div>
                <div className="h-2 rounded-full bg-bc-border-subtle">
                  <div
                    className="h-2 rounded-full bg-violet-500"
                    style={{ width: `${(city.trips / maxTrips) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Agences performantes">
          <ul className="space-y-3">
            {ADMIN_ANALYTICS.topAgencies.map((agency, index) => (
              <li
                key={agency.name}
                className="flex items-center justify-between rounded-xl bg-bc-surface-muted px-4 py-3 text-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium">{agency.name}</p>
                    <p className="text-neutral-500">{agency.tickets} billets vendus</p>
                  </div>
                </div>
                <span className="font-medium text-emerald-600">{agency.growth}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}
