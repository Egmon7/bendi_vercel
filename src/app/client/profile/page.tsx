"use client";

import { FormEvent } from "react";
import { getSession } from "@/lib/auth";
import { PageHeader, Panel, PrimaryButton, inputClassName } from "@/components/dashboard/ui";

export default function ClientProfilePage() {
  const session = getSession();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <PageHeader
        title="Profil utilisateur"
        subtitle="Modifiez votre profil, téléphone et mot de passe."
      />

      <Panel title="Informations personnelles">
        <form className="grid max-w-xl gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium text-bc-text-secondary">Nom complet</label>
            <input
              type="text"
              defaultValue={session?.name ?? ""}
              className={`mt-1 ${inputClassName}`}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-bc-text-secondary">Email</label>
            <input
              type="email"
              defaultValue={session?.email ?? ""}
              className={`mt-1 ${inputClassName}`}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-bc-text-secondary">Téléphone</label>
            <input
              type="tel"
              defaultValue="+243 81 234 5678"
              className={`mt-1 ${inputClassName}`}
            />
          </div>
          <div className="border-t border-bc-border-subtle pt-4">
            <p className="text-sm font-medium text-bc-text-secondary">Changer le mot de passe</p>
            <div className="mt-3 space-y-3">
              <input
                type="password"
                placeholder="Mot de passe actuel"
                className={inputClassName}
              />
              <input
                type="password"
                placeholder="Nouveau mot de passe"
                className={inputClassName}
              />
              <input
                type="password"
                placeholder="Confirmer le mot de passe"
                className={inputClassName}
              />
            </div>
          </div>
          <div>
            <PrimaryButton>Enregistrer</PrimaryButton>
          </div>
        </form>
      </Panel>
    </>
  );
}
