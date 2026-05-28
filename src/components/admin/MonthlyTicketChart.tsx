"use client";

import { useMemo, useState } from "react";
import { ADMIN_ANALYTICS } from "@/lib/mock-data/admin";
import { Panel, SecondaryButton, selectClassName } from "@/components/dashboard/ui";

export function MonthlyTicketChart() {
  const [agencyFilter, setAgencyFilter] = useState("all");
  const [showValues, setShowValues] = useState(false);

  const data = useMemo(() => {
    if (agencyFilter === "all") {
      return ADMIN_ANALYTICS.monthlyTicketSales.all;
    }
    return ADMIN_ANALYTICS.monthlyTicketSales.byAgency[
      agencyFilter as keyof typeof ADMIN_ANALYTICS.monthlyTicketSales.byAgency
    ];
  }, [agencyFilter]);

  const maxTickets = Math.max(...data.map((d) => d.tickets));
  const total = data.reduce((sum, d) => sum + d.tickets, 0);

  return (
    <Panel
      title="Croissance mensuelle"
      action={
        <SecondaryButton onClick={() => setShowValues((v) => !v)}>
          {showValues ? "Masquer les chiffres" : "Afficher les chiffres"}
        </SecondaryButton>
      }
    >
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-neutral-500">
          Billets vendus par mois sur la plateforme.
        </p>
        <select
          value={agencyFilter}
          onChange={(e) => setAgencyFilter(e.target.value)}
          className={`${selectClassName} sm:max-w-xs`}
        >
          <option value="all">Toutes les agences</option>
          {Object.keys(ADMIN_ANALYTICS.monthlyTicketSales.byAgency).map((agency) => (
            <option key={agency} value={agency}>{agency}</option>
          ))}
        </select>
      </div>

      <div className="flex h-44 items-end gap-2">
        {data.map((item) => (
          <div key={item.month} className="flex flex-1 flex-col items-center gap-2">
            {showValues && (
              <span className="text-xs font-semibold text-violet-600">{item.tickets}</span>
            )}
            <div
              className="w-full rounded-t-lg bg-violet-500/80 transition-all"
              style={{ height: `${(item.tickets / maxTickets) * 100}%`, minHeight: "12px" }}
              title={`${item.tickets} billets`}
            />
            <span className="text-xs text-neutral-500">{item.month}</span>
          </div>
        ))}
      </div>

      <p className="mt-4 text-sm text-neutral-500">
        Total période : <span className="font-medium text-neutral-900">{total} billets</span>
        {agencyFilter !== "all" && <span> — {agencyFilter}</span>}
        {" · "}
        Statistiques générales : <span className="font-medium text-neutral-900">+12%</span> de croissance ce mois.
      </p>
    </Panel>
  );
}
