"use client";

import { type FormEvent, useMemo, useState } from "react";
import { getSession } from "@/lib/auth";
import { CITIES } from "@/lib/constants";
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
import { AGENCY_TRIPS, filterByAgency } from "@/lib/mock-data/agency";

type Trip = Omit<(typeof AGENCY_TRIPS)[number], "status"> & { status: "active" | "inactive" };

function TripFormFields({ trip }: { trip?: Trip }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <FormField label="Départ">
        <select
          name="from"
          className={selectClassName}
          defaultValue={trip?.from ?? "Kinshasa"}
        >
          {CITIES.map((c) => (
            <option key={c.value} value={c.label}>
              {c.label}
            </option>
          ))}
        </select>
      </FormField>
      <FormField label="Destination">
        <select
          name="to"
          className={selectClassName}
          defaultValue={trip?.to ?? "Matadi"}
        >
          {CITIES.map((c) => (
            <option key={c.value} value={c.label}>
              {c.label}
            </option>
          ))}
        </select>
      </FormField>
      <FormField label="Horaire">
        <input name="time" type="time" className={inputClassName} />
        {trip && <p className="mt-1 text-xs text-bc-text-faint">Actuel : {trip.time}</p>}
      </FormField>
      <FormField label="Prix ($)">
        <input
          name="price"
          type="number"
          placeholder="45"
          defaultValue={trip ? Number(trip.price.replace(" $", "")) : undefined}
          className={inputClassName}
        />
      </FormField>
      <div className="sm:col-span-2">
        <FormField label="Nombre de places">
          <input
            name="seats"
            type="number"
            placeholder="40"
            defaultValue={trip?.seats}
            className={inputClassName}
          />
        </FormField>
      </div>
    </div>
  );
}

export default function AgencyTripsPage() {
  const session = getSession();
  const agencyId = session?.id ?? "agency-1";
  const [trips, setTrips] = useState<Trip[]>(
    filterByAgency(AGENCY_TRIPS, agencyId).map((t) => ({
      ...t,
      status: "active",
    })),
  );

  const [showCreate, setShowCreate] = useState(false);
  const [editTrip, setEditTrip] = useState<Trip | null>(null);
  const [deactivateTrip, setDeactivateTrip] = useState<Trip | null>(null);

  const rows = useMemo(() => trips, [trips]);

  const getText = (form: FormData, key: string) => {
    const v = form.get(key);
    return typeof v === "string" ? v : "";
  };

  const getNumber = (form: FormData, key: string) => {
    const v = form.get(key);
    if (typeof v !== "string") return Number.NaN;
    const n = Number(v);
    return Number.isFinite(n) ? n : Number.NaN;
  };

  const handleCreate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const from = getText(form, "from");
    const to = getText(form, "to");
    const time = getText(form, "time");
    const priceValue = getText(form, "price");
    const seatsValue = getNumber(form, "seats");

    const seats = Number.isFinite(seatsValue) && seatsValue > 0 ? seatsValue : 40;
    const newTrip: Trip = {
      id: `t-${Date.now()}`,
      agencyId,
      from,
      to,
      time: time ? time.replace(":", "h") : "06h00",
      price: `${priceValue || "45"} $`,
      seats,
      remaining: seats,
      status: "active",
    };

    setTrips((prev) => [newTrip, ...prev]);
    setShowCreate(false);
    e.currentTarget.reset();
  };

  const handleEdit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editTrip) return;
    const form = new FormData(e.currentTarget);
    const from = getText(form, "from") || editTrip.from;
    const to = getText(form, "to") || editTrip.to;
    const time = getText(form, "time");
    const priceValue = getText(form, "price") || editTrip.price.replace(" $", "");
    const seatsValue = Number.isFinite(getNumber(form, "seats")) ? getNumber(form, "seats") : editTrip.seats;
    const seats = Number.isFinite(seatsValue) && seatsValue > 0 ? seatsValue : editTrip.seats;

    setTrips((prev) =>
      prev.map((t) =>
        t.id === editTrip.id
          ? {
              ...t,
              from,
              to,
              time: time ? time.replace(":", "h") : t.time,
              price: priceValue.includes("$") ? priceValue : `${priceValue} $`,
              seats,
              remaining: Math.min(t.remaining, seats),
            }
          : t,
      ),
    );
    setEditTrip(null);
  };

  const confirmDeactivate = () => {
    if (!deactivateTrip) return;
    setTrips((prev) =>
      prev.map((t) => (t.id === deactivateTrip.id ? { ...t, status: "inactive" } : t)),
    );
    setDeactivateTrip(null);
  };

  const reactivate = (trip: Trip) => {
    setTrips((prev) => prev.map((t) => (t.id === trip.id ? { ...t, status: "active" } : t)));
  };

  return (
    <>
      <PageHeader
        title="Gestion des trajets"
        subtitle="Créez un trajet et gérez la liste des trajets actifs."
        actions={<PrimaryButton onClick={() => setShowCreate(true)}>Créer un trajet</PrimaryButton>}
      />

      <Panel title="Trajets actifs">
        <DataTable
          rows={rows}
          columns={[
            { key: "route", header: "Trajet", render: (r) => `${r.from} → ${r.to}` },
            { key: "time", header: "Horaire", render: (r) => r.time },
            { key: "price", header: "Prix", render: (r) => r.price },
            { key: "seats", header: "Places", render: (r) => `${r.remaining}/${r.seats}` },
            {
              key: "status",
              header: "Statut",
              render: (r) => (
                <StatusBadge status={r.status === "active" ? "active" : "suspended"} />
              ),
            },
            {
              key: "actions",
              header: "Actions",
              render: (r) => (
                <ActionGroup>
                  <ActionIcon icon="edit" label="Modifier" onClick={() => setEditTrip(r)} />
                  {r.status === "active" ? (
                    <ActionIcon
                      icon="block"
                      label="Désactiver"
                      variant="danger"
                      onClick={() => setDeactivateTrip(r)}
                    />
                  ) : (
                    <ActionIcon icon="unblock" label="Réactiver" onClick={() => reactivate(r)} />
                  )}
                </ActionGroup>
              ),
            },
          ]}
        />
      </Panel>

      <Modal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        title="Nouveau trajet"
        footer={
          <>
            <SecondaryButton onClick={() => setShowCreate(false)}>Annuler</SecondaryButton>
            <PrimaryButton type="submit" form="create-trip-form">
              Enregistrer
            </PrimaryButton>
          </>
        }
      >
        <form id="create-trip-form" onSubmit={handleCreate}>
          <TripFormFields />
        </form>
      </Modal>

      <Modal
        open={!!editTrip}
        onClose={() => setEditTrip(null)}
        title="Modifier le trajet"
        footer={
          <>
            <SecondaryButton onClick={() => setEditTrip(null)}>Annuler</SecondaryButton>
            <PrimaryButton type="submit" form="edit-trip-form">
              Enregistrer
            </PrimaryButton>
          </>
        }
      >
        {editTrip && (
          <form id="edit-trip-form" onSubmit={handleEdit}>
            <TripFormFields trip={editTrip} />
          </form>
        )}
      </Modal>

      <Modal
        open={!!deactivateTrip}
        onClose={() => setDeactivateTrip(null)}
        title="Désactiver le trajet"
        footer={
          <>
            <SecondaryButton onClick={() => setDeactivateTrip(null)}>Retour</SecondaryButton>
            <PrimaryButton onClick={confirmDeactivate}>Confirmer</PrimaryButton>
          </>
        }
      >
        {deactivateTrip && (
          <p className="text-sm text-bc-text-secondary">
            Voulez-vous désactiver le trajet{" "}
            <strong className="text-bc-text">
              {deactivateTrip.from} → {deactivateTrip.to}
            </strong>{" "}
            ({deactivateTrip.time}) ?
          </p>
        )}
      </Modal>
    </>
  );
}
