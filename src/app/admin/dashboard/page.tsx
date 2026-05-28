"use client";

import {
  PageHeader,
  Panel,
  SecondaryButton,
  StatCard,
  StatGrid,
} from "@/components/dashboard/ui";
import { MonthlyTicketChart } from "@/components/admin/MonthlyTicketChart";
import { ADMIN_ANALYTICS, ADMIN_RECENT_ACTIVITY } from "@/lib/mock-data/admin";

export default function AdminDashboardPage() {
  return (
    <>
      <PageHeader
        title="Dashboard Admin"
        subtitle="Surveillez la plateforme, les activités récentes et les performances."
        actions={<SecondaryButton onClick={() => undefined}>Exporter rapport</SecondaryButton>}
      />

      <StatGrid>
        <StatCard label="Réservations totales" value="1 248" hint="+12% ce mois" />
        <StatCard label="Revenus générés" value="18 420 $" hint="Commissions incluses" />
        <StatCard label="Agences actives" value="8" hint="2 en attente de validation" />
        <StatCard label="Trajet populaire" value="Kinshasa → Matadi" hint="342 billets vendus" />
      </StatGrid>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <Panel title="Activités récentes" action={<SecondaryButton onClick={() => undefined}>Voir tout</SecondaryButton>}>
          <ul className="divide-y divide-neutral-100">
            {ADMIN_RECENT_ACTIVITY.map((item) => (
              <li key={item.label} className="flex items-start justify-between gap-4 py-3 text-sm">
                <span className="text-neutral-800">{item.label}</span>
                <span className="shrink-0 text-neutral-400">{item.time}</span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Performances agences">
          <ul className="space-y-3">
            {ADMIN_ANALYTICS.topAgencies.map((agency) => (
              <li key={agency.name} className="flex items-center justify-between rounded-xl bg-bc-surface-muted px-4 py-3 text-sm">
                <div>
                  <p className="font-medium">{agency.name}</p>
                  <p className="text-neutral-500">{agency.tickets} billets vendus</p>
                </div>
                <span className="font-medium text-emerald-600">{agency.growth}</span>
              </li>
            ))}
          </ul>
        </Panel>

        <MonthlyTicketChart />
      </div>
    </>
  );
}
