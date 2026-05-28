"use client";

import { getSession } from "@/lib/auth";
import { PageHeader, Panel, StatCard, StatGrid } from "@/components/dashboard/ui";
import { AGENCY_PAYMENTS, filterByAgency } from "@/lib/mock-data/agency";

export default function AgencyPaymentsPage() {
  const session = getSession();
  const agencyId = session?.id ?? "agency-1";
  const payments = filterByAgency(AGENCY_PAYMENTS, agencyId);
  const online = payments.filter((p) => p.type === "online").length;
  const physical = payments.filter((p) => p.type === "physical").length;
  const totalCommission = payments.reduce((sum, p) => sum + parseFloat(p.commission.replace(",", ".").replace(" $", "")), 0);

  return (
    <>
      <PageHeader
        title="Paiements"
        subtitle="Réservations payées, paiements physiques, en ligne et commissions."
      />

      <StatGrid>
        <StatCard label="Réservations payées" value={String(payments.length)} hint="Ce mois" />
        <StatCard label="Paiements en ligne" value={String(online)} hint="Mobile Money, carte" />
        <StatCard label="Paiements physiques" value={String(physical)} hint="En agence" />
        <StatCard label="Commissions" value={`${totalCommission.toFixed(2)} $`} hint="Plateforme BusConnect" />
      </StatGrid>

      <div className="mt-6">
        <Panel title="Historique des paiements">
          <ul className="divide-y divide-neutral-100">
            {payments.map((payment) => (
              <li key={payment.id} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium">{payment.label}</p>
                  <p className="text-sm text-neutral-500">
                    {payment.type === "online" ? "Paiement en ligne" : "Paiement physique"} · {payment.date}
                  </p>
                </div>
                <div className="text-right text-sm">
                  <p className="font-semibold">{payment.amount}</p>
                  <p className="text-neutral-400">Commission : {payment.commission}</p>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}
