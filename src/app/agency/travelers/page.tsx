"use client";

import { useMemo, useState } from "react";
import { getSession } from "@/lib/auth";
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
  inputClassName,
  selectClassName,
} from "@/components/dashboard/ui";
import { AGENCY_TRAVELERS, filterByAgency } from "@/lib/mock-data/agency";
import { QRCodeCanvas } from "qrcode.react";

export default function AgencyTravelersPage() {
  const session = getSession();
  const agencyId = session?.id ?? "agency-1";
  const allTravelers = filterByAgency(AGENCY_TRAVELERS, agencyId);

  const availableDates = useMemo(() => {
    const dates = [...new Set(allTravelers.map((t) => t.travelDateIso))].sort();
    return dates;
  }, [allTravelers]);

  const [dateFilter, setDateFilter] = useState<string>("");
  const [viewQr, setViewQr] = useState<(typeof allTravelers)[number] | null>(null);
  const [scanOpen, setScanOpen] = useState(false);
  const [scanValue, setScanValue] = useState("");
  const [scanResult, setScanResult] = useState<"idle" | "ok" | "notfound">("idle");

  const travelers = useMemo(() => {
    if (!dateFilter) return allTravelers;
    return allTravelers.filter((t) => t.travelDateIso === dateFilter);
  }, [allTravelers, dateFilter]);

  const selectedDateLabel = useMemo(() => {
    if (!dateFilter) return null;
    return allTravelers.find((t) => t.travelDateIso === dateFilter)?.travelDate ?? dateFilter;
  }, [allTravelers, dateFilter]);

  const qrSet = useMemo(() => new Set(allTravelers.map((t) => t.qr)), [allTravelers]);

  const doScan = () => {
    const normalized = scanValue.trim();
    if (!normalized) return;
    setScanResult(qrSet.has(normalized) ? "ok" : "notfound");
  };

  return (
    <>
      <PageHeader
        title="Liste voyageurs"
        subtitle="Nom, téléphone, numéro ticket et date de voyage."
        actions={
          <SecondaryButton
            onClick={() => {
              setScanOpen(true);
              setScanResult("idle");
              setScanValue("");
            }}
          >
            Scanner QR
          </SecondaryButton>
        }
      />

      <Panel title="Voyageurs">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <label htmlFor="travel-date-filter" className="text-sm font-medium text-bc-text-secondary">
            Date de voyage
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <select
              id="travel-date-filter"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className={`${selectClassName} w-full min-w-0 sm:w-auto sm:min-w-[12rem]`}
            >
              <option value="">Toutes les dates</option>
              {availableDates.map((iso) => {
                const label = allTravelers.find((t) => t.travelDateIso === iso)?.travelDate ?? iso;
                return (
                  <option key={iso} value={iso}>
                    {label}
                  </option>
                );
              })}
            </select>
            {dateFilter && (
              <button
                type="button"
                onClick={() => setDateFilter("")}
                className="text-sm font-medium text-bc-text-muted hover:text-bc-text"
              >
                Réinitialiser
              </button>
            )}
          </div>
        </div>
        {dateFilter && (
          <p className="mb-4 text-sm text-bc-text-muted">
            {travelers.length} voyageur{travelers.length > 1 ? "s" : ""} pour le{" "}
            <span className="font-medium text-bc-text">{selectedDateLabel}</span>
          </p>
        )}
        {!dateFilter && (
          <p className="mb-4 text-sm text-bc-text-muted">
            {travelers.length} voyageur{travelers.length > 1 ? "s" : ""} au total — filtrez par date ci-dessus.
          </p>
        )}

        {travelers.length === 0 ? (
          <p className="rounded-xl border border-dashed border-bc-border bg-bc-surface-muted px-4 py-8 text-center text-sm text-bc-text-muted">
            Aucun voyageur pour cette date.
          </p>
        ) : (
          <DataTable
            rows={travelers}
            columns={[
              { key: "name", header: "Nom", render: (r) => <span className="font-medium">{r.name}</span> },
              { key: "phone", header: "Téléphone", render: (r) => r.phone },
              { key: "ticket", header: "N° ticket", render: (r) => r.ticket },
              { key: "route", header: "Trajet", render: (r) => r.route },
              { key: "date", header: "Date voyage", render: (r) => r.travelDate },
              {
                key: "actions",
                header: "Actions",
                render: (r) => (
                  <ActionGroup>
                    <ActionIcon icon="view" label="Voir QR" onClick={() => setViewQr(r)} />
                  </ActionGroup>
                ),
              },
            ]}
          />
        )}
      </Panel>

      <Modal
        open={!!viewQr}
        onClose={() => setViewQr(null)}
        title="QR ticket"
        footer={<PrimaryButton onClick={() => setViewQr(null)}>Fermer</PrimaryButton>}
      >
        {viewQr && (
          <div className="flex flex-col items-center gap-4">
            <div className="rounded-2xl border border-bc-border bg-white p-4">
              <QRCodeCanvas value={viewQr.qr} size={180} level="M" />
            </div>
            <div className="w-full rounded-xl bg-bc-surface-muted p-4 text-sm">
              <p className="font-medium text-bc-text">{viewQr.name}</p>
              <p className="text-bc-text-muted">{viewQr.route}</p>
              <p className="mt-1 text-bc-text-faint">{viewQr.travelDate}</p>
              <p className="mt-2 text-xs text-bc-text-faint break-all">{viewQr.qr}</p>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        open={scanOpen}
        onClose={() => setScanOpen(false)}
        title="Scanner QR (simulation)"
        footer={
          <>
            <SecondaryButton onClick={() => setScanOpen(false)}>Fermer</SecondaryButton>
            <PrimaryButton onClick={doScan}>Vérifier</PrimaryButton>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-sm text-bc-text-muted">
            Pour l&apos;instant, collez ici la valeur QR affichée dans &quot;Voir QR&quot;.
          </p>
          <FormField label="Valeur QR">
            <input
              value={scanValue}
              onChange={(e) => {
                setScanValue(e.target.value);
                setScanResult("idle");
              }}
              placeholder="BUSCONNECT:agency-1:r-1:Patrick_Kabila"
              className={inputClassName}
            />
          </FormField>
          {scanResult === "ok" && (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-700 dark:text-emerald-300">
              QR valide — ticket trouvé pour cette agence.
            </div>
          )}
          {scanResult === "notfound" && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-700 dark:text-red-300">
              QR invalide — aucun ticket correspondant.
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
