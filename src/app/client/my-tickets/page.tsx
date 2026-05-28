"use client";

import { getSession } from "@/lib/auth";
import { PageHeader, Panel, StatusBadge } from "@/components/dashboard/ui";
import { filterClientTickets } from "@/lib/mock-data/client";
import { QRCodeCanvas } from "qrcode.react";

function TicketQr({ value, ticketId }: { value: string; ticketId: string }) {
  return (
    <div className="flex shrink-0 flex-col items-center gap-2">
      <div className="rounded-xl border border-bc-border bg-white p-3 shadow-sm">
        <QRCodeCanvas value={value} size={120} level="M" />
      </div>
      <p className="max-w-[7.5rem] truncate text-center text-[10px] font-medium text-bc-text-faint">
        {ticketId}
      </p>
    </div>
  );
}

export default function ClientMyTicketsPage() {
  const session = getSession();
  const clientId = session?.id ?? "client-1";
  const tickets = filterClientTickets(clientId);

  return (
    <>
      <PageHeader
        title="Mes billets"
        subtitle="Billets réservés, historique de voyages, QR code et statut."
      />

      <div className="space-y-4">
        {tickets.length === 0 ? (
          <Panel title="Aucun billet">
            <p className="text-sm text-bc-text-muted">Vous n&apos;avez pas encore de réservation.</p>
          </Panel>
        ) : (
          tickets.map((ticket) => (
            <Panel key={ticket.id} title={`Ticket ${ticket.id}`}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-lg font-semibold text-bc-text">{ticket.route}</p>
                  <p className="mt-1 text-sm text-bc-text-muted">
                    {ticket.date} · {ticket.time} · {ticket.agency}
                  </p>
                  <p className="mt-1 text-sm text-bc-text-muted">{ticket.seats} place(s)</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {ticket.status === "confirmed" && <StatusBadge status="confirmed" />}
                    {ticket.status === "completed" && (
                      <span className="inline-flex rounded-full bg-neutral-500/15 px-2.5 py-1 text-xs font-medium text-neutral-600 dark:text-neutral-300">
                        Terminé
                      </span>
                    )}
                  </div>
                  {ticket.status === "confirmed" && (
                    <p className="mt-3 text-xs text-bc-text-faint sm:hidden">
                      Présentez ce QR code à l&apos;embarquement.
                    </p>
                  )}
                </div>
                {ticket.status === "confirmed" && (
                  <TicketQr value={ticket.qrCode} ticketId={ticket.id} />
                )}
              </div>
            </Panel>
          ))
        )}
      </div>
    </>
  );
}
