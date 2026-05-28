"use client";

import { FormEvent } from "react";
import { getSession } from "@/lib/auth";
import { CITIES } from "@/lib/constants";
import { PageHeader, Panel, PrimaryButton } from "@/components/dashboard/ui";

export default function AgencySettingsPage() {
  const session = getSession();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <PageHeader
        title="Paramètres agence"
        subtitle="Modifiez le profil, logo, téléphone, horaires et villes desservies."
      />

      <Panel title="Informations de l'agence">
        <form className="grid max-w-2xl gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium text-neutral-700">Nom de l'agence</label>
            <input
              type="text"
              defaultValue={session?.agencyName ?? session?.name ?? ""}
              className="mt-1 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-neutral-700">Email</label>
            <input
              type="email"
              defaultValue={session?.email ?? ""}
              className="mt-1 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-neutral-700">Téléphone</label>
            <input
              type="tel"
              defaultValue="+243 99 111 2233"
              className="mt-1 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-neutral-700">Logo</label>
            <input type="file" accept="image/*" className="mt-1 w-full text-sm text-neutral-500" />
          </div>
          <div>
            <label className="text-sm font-medium text-neutral-700">Horaires d'ouverture</label>
            <input
              type="text"
              defaultValue="Lun - Sam : 06h00 - 18h00"
              className="mt-1 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-neutral-700">Villes desservies</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {CITIES.slice(0, 5).map((city) => (
                <label key={city.value} className="flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2 text-sm">
                  <input type="checkbox" defaultChecked={city.value === "kinshasa" || city.value === "matadi"} />
                  {city.label}
                </label>
              ))}
            </div>
          </div>
          <div>
            <PrimaryButton>Enregistrer les modifications</PrimaryButton>
          </div>
        </form>
      </Panel>
    </>
  );
}
