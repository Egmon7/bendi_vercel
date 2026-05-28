"use client";

import { FormEvent, useCallback, useMemo, useState } from "react";
import { CITIES } from "@/lib/constants";
import { ADMIN_AGENCIES, type AdminAgency } from "@/lib/mock-data/admin";
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

type AgencyModal = "add" | "edit" | "commission" | null;

export default function AdminAgenciesPage() {
  const [agencies, setAgencies] = useState<AdminAgency[]>(ADMIN_AGENCIES);
  const [activeModal, setActiveModal] = useState<AgencyModal>(null);
  const [selectedAgency, setSelectedAgency] = useState<AdminAgency | null>(null);

  const stats = useMemo(
    () => ({
      active: agencies.filter((a) => a.status === "active").length,
      pending: agencies.filter((a) => a.status === "pending").length,
      suspended: agencies.filter((a) => a.status === "suspended").length,
    }),
    [agencies],
  );

  const closeModal = useCallback(() => {
    setActiveModal(null);
    setSelectedAgency(null);
  }, []);

  const updateAgencyStatus = useCallback((id: string, status: AdminAgency["status"]) => {
    setAgencies((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  }, []);

  const handleAddAgency = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const citiesRaw = String(form.get("cities") ?? "");
    const newAgency: AdminAgency = {
      id: `ag-${Date.now()}`,
      name: String(form.get("name") ?? ""),
      status: "pending",
      cities: citiesRaw.split(",").map((c) => c.trim()).filter(Boolean),
      reservations: 0,
      revenue: "0 $",
      commission: String(form.get("commission") ?? "10%"),
    };
    setAgencies((prev) => [newAgency, ...prev]);
    closeModal();
    e.currentTarget.reset();
  };

  return (
    <>
      <PageHeader
        title="Gestion des agences"
        subtitle="Liste des agences partenaires, statuts, villes desservies et performances."
        actions={<PrimaryButton onClick={() => setActiveModal("add")}>Ajouter une agence</PrimaryButton>}
      />

      <Panel title="Agences enregistrées">
        <DataTable
          rows={agencies}
          columns={[
            { key: "name", header: "Agence", render: (row) => <span className="font-medium">{row.name}</span> },
            { key: "status", header: "Statut", render: (row) => <StatusBadge status={row.status} /> },
            {
              key: "cities",
              header: "Villes desservies",
              render: (row) => <span className="text-neutral-600">{row.cities.join(", ")}</span>,
            },
            { key: "reservations", header: "Réservations", render: (row) => row.reservations },
            { key: "revenue", header: "Revenus", render: (row) => row.revenue },
            {
              key: "actions",
              header: "Actions",
              render: (row) => (
                <ActionGroup>
                  {row.status === "pending" && (
                    <ActionIcon
                      icon="validate"
                      label="Valider"
                      onClick={() => updateAgencyStatus(row.id, "active")}
                    />
                  )}
                  {row.status === "active" && (
                    <ActionIcon
                      icon="block"
                      label="Suspendre"
                      variant="danger"
                      onClick={() => updateAgencyStatus(row.id, "suspended")}
                    />
                  )}
                  {row.status === "suspended" && (
                    <ActionIcon
                      icon="unblock"
                      label="Réactiver"
                      onClick={() => updateAgencyStatus(row.id, "active")}
                    />
                  )}
                  <ActionIcon
                    icon="edit"
                    label="Modifier"
                    onClick={() => {
                      setSelectedAgency(row);
                      setActiveModal("edit");
                    }}
                  />
                  <ActionIcon
                    icon="commission"
                    label="Commissions"
                    onClick={() => {
                      setSelectedAgency(row);
                      setActiveModal("commission");
                    }}
                  />
                </ActionGroup>
              ),
            },
          ]}
        />
      </Panel>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-bc-border bg-bc-surface p-5 shadow-sm">
          <p className="text-sm text-neutral-500">Agences actives</p>
          <p className="mt-2 text-2xl font-semibold">{stats.active}</p>
        </div>
        <div className="rounded-2xl border border-bc-border bg-bc-surface p-5 shadow-sm">
          <p className="text-sm text-neutral-500">En attente</p>
          <p className="mt-2 text-2xl font-semibold">{stats.pending}</p>
        </div>
        <div className="rounded-2xl border border-bc-border bg-bc-surface p-5 shadow-sm">
          <p className="text-sm text-neutral-500">Suspendues</p>
          <p className="mt-2 text-2xl font-semibold">{stats.suspended}</p>
        </div>
      </div>

      <Modal
        open={activeModal === "add"}
        onClose={closeModal}
        title="Ajouter une agence"
        footer={
          <>
            <SecondaryButton onClick={closeModal}>Annuler</SecondaryButton>
            <PrimaryButton type="submit" form="add-agency-form">Enregistrer</PrimaryButton>
          </>
        }
      >
        <form id="add-agency-form" className="space-y-4" onSubmit={handleAddAgency}>
          <FormField label="Nom de l'agence">
            <input name="name" type="text" required placeholder="Ex : Trans Congo" className={inputClassName} />
          </FormField>
          <FormField label="Email">
            <input name="email" type="email" required placeholder="contact@transport.cd" className={inputClassName} />
          </FormField>
          <FormField label="Téléphone">
            <input name="phone" type="tel" required placeholder="+243 99 000 0000" className={inputClassName} />
          </FormField>
          <FormField label="Villes desservies (séparées par des virgules)">
            <input name="cities" type="text" required placeholder="Kinshasa, Matadi, Boma" className={inputClassName} />
          </FormField>
          <FormField label="Taux de commission">
            <select name="commission" className={selectClassName} defaultValue="10%">
              <option value="8%">8%</option>
              <option value="10%">10%</option>
              <option value="12%">12%</option>
            </select>
          </FormField>
          <FormField label="Ville principale">
            <select name="mainCity" className={selectClassName}>
              {CITIES.map((c) => (
                <option key={c.value} value={c.label}>{c.label}</option>
              ))}
            </select>
          </FormField>
        </form>
      </Modal>

      <Modal
        open={activeModal === "edit" && !!selectedAgency}
        onClose={closeModal}
        title="Modifier l'agence"
        footer={
          <>
            <SecondaryButton onClick={closeModal}>Annuler</SecondaryButton>
            <PrimaryButton onClick={closeModal}>Enregistrer</PrimaryButton>
          </>
        }
      >
        {selectedAgency && (
          <div className="space-y-4">
            <FormField label="Nom">
              <input type="text" defaultValue={selectedAgency.name} className={inputClassName} />
            </FormField>
            <FormField label="Villes desservies">
              <input type="text" defaultValue={selectedAgency.cities.join(", ")} className={inputClassName} />
            </FormField>
          </div>
        )}
      </Modal>

      <Modal
        open={activeModal === "commission" && !!selectedAgency}
        onClose={closeModal}
        title="Commissions"
        footer={<PrimaryButton onClick={closeModal}>Enregistrer</PrimaryButton>}
      >
        {selectedAgency && (
          <FormField label={`Taux pour ${selectedAgency.name}`}>
            <select className={selectClassName} defaultValue={selectedAgency.commission}>
              <option value="8%">8%</option>
              <option value="10%">10%</option>
              <option value="12%">12%</option>
            </select>
          </FormField>
        )}
      </Modal>
    </>
  );
}
