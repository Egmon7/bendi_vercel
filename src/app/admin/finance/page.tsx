"use client";

import { useState } from "react";
import {
  PageHeader,
  Panel,
  PrimaryButton,
  SecondaryButton,
  StatCard,
  StatGrid,
  Modal,
  FormField,
  ActionLink,
  inputClassName,
  selectClassName,
} from "@/components/dashboard/ui";
import { ADMIN_FINANCE } from "@/lib/mock-data/admin";

export default function AdminFinancePage() {
  const [selectedFinance, setSelectedFinance] = useState<(typeof ADMIN_FINANCE.history)[number] | null>(null);

  return (
    <>
      <PageHeader
        title="Gestion financière"
        subtitle="Commissions, abonnements, paiements et historique financier."
        actions={
          <>
            <SecondaryButton>Ajuster commissions</SecondaryButton>
            <PrimaryButton>Exporter rapports</PrimaryButton>
          </>
        }
      />

      <StatGrid>
        <StatCard label="Commissions" value={ADMIN_FINANCE.commissions} hint="Ce mois" />
        <StatCard label="Abonnements" value={ADMIN_FINANCE.subscriptions} hint="Agences actives" />
        <StatCard label="Paiements" value={ADMIN_FINANCE.payments} hint="Volume total" />
        <StatCard label="Croissance" value={ADMIN_FINANCE.monthlyGrowth} hint="Revenus plateforme" />
      </StatGrid>

      <Panel title="Historique financier" action={<SecondaryButton>Suivre revenus</SecondaryButton>}>
        <ul className="divide-y divide-neutral-100">
          {ADMIN_FINANCE.history.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-4 py-3 text-sm">
              <div>
                <p className="font-medium text-neutral-900">{item.label}</p>
                <p className="text-neutral-500">{item.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-emerald-600">{item.amount}</span>
                <ActionLink onClick={() => setSelectedFinance(item)}>Détails</ActionLink>
              </div>
            </li>
          ))}
        </ul>
      </Panel>

      <Modal
        open={!!selectedFinance}
        onClose={() => setSelectedFinance(null)}
        title="Détails de facturation"
      >
        {selectedFinance && (
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-neutral-500">Libellé</dt><dd className="font-medium">{selectedFinance.label}</dd></div>
            <div className="flex justify-between"><dt className="text-neutral-500">Référence</dt><dd>{selectedFinance.reference}</dd></div>
            <div className="flex justify-between"><dt className="text-neutral-500">Type</dt><dd>{selectedFinance.type}</dd></div>
            <div className="flex justify-between"><dt className="text-neutral-500">Agence</dt><dd>{selectedFinance.agency}</dd></div>
            <div className="flex justify-between"><dt className="text-neutral-500">Date</dt><dd>{selectedFinance.date}</dd></div>
            <div className="flex justify-between border-t border-neutral-100 pt-3"><dt className="text-neutral-500">Montant</dt><dd className="text-lg font-semibold text-emerald-600">{selectedFinance.amount}</dd></div>
          </dl>
        )}
      </Modal>
    </>
  );
}
