"use client";

import { useCallback, useMemo, useState } from "react";
import {
  ActionGroup,
  ActionIcon,
  DataTable,
  FormField,
  Modal,
  PageHeader,
  Panel,
  PrimaryButton,
  SecondaryButton,
  StatusBadge,
  inputClassName,
  selectClassName,
} from "@/components/dashboard/ui";
import { ADMIN_RESERVATIONS, type AdminReservation } from "@/lib/mock-data/admin";

type ModalType = "details" | "cancel" | "dispute" | null;

const AGENCY_OPTIONS = [...new Set(ADMIN_RESERVATIONS.map((r) => r.agency))];
const MONTH_OPTIONS = [
  { value: "", label: "Tous les mois" },
  { value: "2026-05", label: "Mai 2026" },
  { value: "2026-04", label: "Avril 2026" },
];

export default function AdminReservationsPage() {
  const [search, setSearch] = useState("");
  const [agencyFilter, setAgencyFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [dayFilter, setDayFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selected, setSelected] = useState<AdminReservation | null>(null);
  const [modalType, setModalType] = useState<ModalType>(null);

  const filtered = useMemo(() => {
    return ADMIN_RESERVATIONS.filter((r) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        r.id.toLowerCase().includes(q) ||
        r.client.toLowerCase().includes(q) ||
        r.route.toLowerCase().includes(q) ||
        r.agency.toLowerCase().includes(q);
      const matchAgency = !agencyFilter || r.agency === agencyFilter;
      const matchMonth = !monthFilter || r.month === monthFilter;
      const matchDay = !dayFilter || r.day === Number(dayFilter);
      const matchStatus = !statusFilter || r.status === statusFilter;
      return matchSearch && matchAgency && matchMonth && matchDay && matchStatus;
    });
  }, [search, agencyFilter, monthFilter, dayFilter, statusFilter]);

  const openModal = useCallback((reservation: AdminReservation, type: ModalType) => {
    setSelected(reservation);
    setModalType(type);
  }, []);

  const closeModal = useCallback(() => {
    setModalType(null);
    setSelected(null);
  }, []);

  return (
    <>
      <PageHeader
        title="Gestion des réservations"
        subtitle="Consultez toutes les réservations, statuts de paiement et litiges."
      />

      <Panel title="Filtres et recherche">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <FormField label="Recherche">
            <input
              type="search"
              placeholder="Réf., client, trajet…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={inputClassName}
            />
          </FormField>
          <FormField label="Agence">
            <select value={agencyFilter} onChange={(e) => setAgencyFilter(e.target.value)} className={selectClassName}>
              <option value="">Toutes les agences</option>
              {AGENCY_OPTIONS.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </FormField>
          <FormField label="Mois">
            <select value={monthFilter} onChange={(e) => setMonthFilter(e.target.value)} className={selectClassName}>
              {MONTH_OPTIONS.map((m) => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
          </FormField>
          <FormField label="Jour">
            <select value={dayFilter} onChange={(e) => setDayFilter(e.target.value)} className={selectClassName}>
              <option value="">Tous les jours</option>
              {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </FormField>
          <FormField label="Statut">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={selectClassName}>
              <option value="">Tous les statuts</option>
              <option value="confirmed">Confirmée</option>
              <option value="pending">En attente</option>
              <option value="dispute">Litige</option>
              <option value="cancelled">Annulée</option>
            </select>
          </FormField>
        </div>
        <p className="mt-3 text-xs text-neutral-400">{filtered.length} réservation(s) trouvée(s)</p>
      </Panel>

      <div className="mt-6">
        <Panel title="Toutes les réservations">
          <DataTable
            rows={filtered}
            columns={[
              { key: "id", header: "Réf.", render: (row) => <span className="font-medium">{row.id}</span> },
              { key: "client", header: "Client", render: (row) => row.client },
              { key: "agency", header: "Agence", render: (row) => row.agency },
              { key: "route", header: "Trajet", render: (row) => row.route },
              { key: "date", header: "Date", render: (row) => row.date },
              { key: "amount", header: "Montant", render: (row) => row.amount },
              { key: "payment", header: "Paiement", render: (row) => <StatusBadge status={row.payment} /> },
              { key: "status", header: "Statut", render: (row) => <StatusBadge status={row.status} /> },
              {
                key: "actions",
                header: "Actions",
                render: (row) => (
                  <ActionGroup>
                    <ActionIcon icon="view" label="Détails" onClick={() => openModal(row, "details")} />
                    {row.status !== "cancelled" && (
                      <ActionIcon icon="cancel" label="Annuler" variant="danger" onClick={() => openModal(row, "cancel")} />
                    )}
                    {row.status === "dispute" && (
                      <ActionIcon icon="dispute" label="Résoudre litige" onClick={() => openModal(row, "dispute")} />
                    )}
                  </ActionGroup>
                ),
              },
            ]}
          />
        </Panel>
      </div>

      <Modal open={modalType === "details" && !!selected} onClose={closeModal} title="Détails de la réservation">
        {selected && (
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-neutral-500">Référence</dt><dd className="font-medium">{selected.id}</dd></div>
            <div className="flex justify-between"><dt className="text-neutral-500">Client</dt><dd>{selected.client}</dd></div>
            <div className="flex justify-between"><dt className="text-neutral-500">Téléphone</dt><dd>{selected.phone}</dd></div>
            <div className="flex justify-between"><dt className="text-neutral-500">Agence</dt><dd>{selected.agency}</dd></div>
            <div className="flex justify-between"><dt className="text-neutral-500">Trajet</dt><dd>{selected.route}</dd></div>
            <div className="flex justify-between"><dt className="text-neutral-500">Date</dt><dd>{selected.date}</dd></div>
            <div className="flex justify-between border-t border-neutral-100 pt-3"><dt className="text-neutral-500">Montant billet</dt><dd className="font-semibold">{selected.amount}</dd></div>
            <div className="flex justify-between"><dt className="text-neutral-500">Commission plateforme</dt><dd>{selected.commission}</dd></div>
            <div className="flex justify-between"><dt className="text-neutral-500">Mode de paiement</dt><dd>{selected.paymentMethod}</dd></div>
            <div className="flex justify-between"><dt className="text-neutral-500">Statut paiement</dt><dd><StatusBadge status={selected.payment} /></dd></div>
            <div className="flex justify-between"><dt className="text-neutral-500">Statut réservation</dt><dd><StatusBadge status={selected.status} /></dd></div>
          </dl>
        )}
      </Modal>

      <Modal
        open={modalType === "cancel" && !!selected}
        onClose={closeModal}
        title="Annuler la réservation"
        footer={
          <>
            <SecondaryButton onClick={closeModal}>Retour</SecondaryButton>
            <PrimaryButton onClick={closeModal}>Confirmer l'annulation</PrimaryButton>
          </>
        }
      >
        {selected && (
          <p className="text-sm text-neutral-600">
            Voulez-vous annuler la réservation <strong>{selected.id}</strong> de {selected.client} ({selected.route}) ?
            Cette action est irréversible.
          </p>
        )}
      </Modal>

      <Modal
        open={modalType === "dispute" && !!selected}
        onClose={closeModal}
        title="Résoudre le litige"
        footer={
          <>
            <SecondaryButton onClick={closeModal}>Annuler</SecondaryButton>
            <PrimaryButton onClick={closeModal}>Marquer comme résolu</PrimaryButton>
          </>
        }
      >
        {selected && (
          <div className="space-y-4">
            <p className="text-sm text-neutral-600">
              Litige concernant la réservation <strong>{selected.id}</strong> — {selected.client}.
            </p>
            <FormField label="Décision">
              <select className={selectClassName} defaultValue="refund">
                <option value="refund">Rembourser le client</option>
                <option value="confirm">Confirmer la réservation</option>
                <option value="credit">Crédit pour un prochain voyage</option>
              </select>
            </FormField>
            <FormField label="Commentaire interne">
              <textarea rows={3} className={inputClassName} placeholder="Notes sur la résolution…" />
            </FormField>
          </div>
        )}
      </Modal>
    </>
  );
}
