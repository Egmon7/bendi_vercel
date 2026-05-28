"use client";

import { getSession } from "@/lib/auth";
import {
  ActionGroup,
  ActionLink,
  DataTable,
  PageHeader,
  Panel,
  StatusBadge,
} from "@/components/dashboard/ui";
import { AGENCY_RESERVATIONS, filterByAgency } from "@/lib/mock-data/agency";

export default function AgencyReservationsPage() {
  const session = getSession();
  const agencyId = session?.id ?? "agency-1";
  const reservations = filterByAgency(AGENCY_RESERVATIONS, agencyId);

  return (
    <>
      <PageHeader
        title="Gestion des réservations"
        subtitle="Clients réservés, statut paiement et places assignées."
      />

      <Panel title="Réservations">
        <DataTable
          rows={reservations}
          columns={[
            { key: "client", header: "Client", render: (r) => <span className="font-medium">{r.client}</span> },
            { key: "route", header: "Trajet", render: (r) => r.route },
            { key: "date", header: "Date", render: (r) => `${r.date} · ${r.time}` },
            { key: "seat", header: "Place", render: (r) => r.seat },
            { key: "payment", header: "Paiement", render: (r) => <StatusBadge status={r.payment} /> },
            { key: "status", header: "Statut", render: (r) => <StatusBadge status={r.status === "confirmed" ? "confirmed" : "pending"} /> },
            {
              key: "actions",
              header: "Actions",
              render: (r) => (
                <ActionGroup>
                  {r.status === "pending" && <ActionLink>Confirmer</ActionLink>}
                  <ActionLink>Annuler</ActionLink>
                  {!r.present && <ActionLink>Marquer présent</ActionLink>}
                  {r.present && <span className="px-2 text-xs text-emerald-600">Présent</span>}
                </ActionGroup>
              ),
            },
          ]}
        />
      </Panel>
    </>
  );
}
