"use client";

import { FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { getSession } from "@/lib/auth";
import { PageHeader, Panel, PrimaryButton } from "@/components/dashboard/ui";

function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session = getSession();

  const from = searchParams.get("from") ?? "";
  const to = searchParams.get("to") ?? "";
  const agency = searchParams.get("agency") ?? "";
  const time = searchParams.get("time") ?? "";
  const price = searchParams.get("price") ?? "";

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const params = new URLSearchParams({
      from,
      to,
      agency,
      time,
      price,
      name: String(form.get("name") ?? ""),
      phone: String(form.get("phone") ?? ""),
      seats: String(form.get("seats") ?? "1"),
    });
    router.push(`/client/payment?${params.toString()}`);
  };

  return (
    <>
      <PageHeader
        title="Réservation"
        subtitle="Entrez vos informations pour réserver votre billet."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Panel title="Informations voyageur">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-sm font-medium text-neutral-700">Nom complet</label>
                <input
                  name="name"
                  type="text"
                  required
                  defaultValue={session?.name ?? ""}
                  className="mt-1 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-neutral-700">Téléphone</label>
                <input
                  name="phone"
                  type="tel"
                  required
                  placeholder="+243 81 000 0000"
                  className="mt-1 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-neutral-700">Nombre de places</label>
                <select name="seats" className="mt-1 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>{n} place{n > 1 ? "s" : ""}</option>
                  ))}
                </select>
              </div>
              <PrimaryButton>Réserver le billet</PrimaryButton>
            </form>
          </Panel>
        </div>

        <Panel title="Récapitulatif">
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-neutral-500">Trajet</dt>
              <dd className="font-medium">{from && to ? `${from} → ${to}` : "—"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-neutral-500">Agence</dt>
              <dd className="font-medium">{agency || "—"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-neutral-500">Horaire</dt>
              <dd className="font-medium">{time || "—"}</dd>
            </div>
            <div className="flex justify-between border-t border-neutral-100 pt-3">
              <dt className="text-neutral-500">Prix</dt>
              <dd className="text-lg font-semibold">{price || "—"}</dd>
            </div>
          </dl>
        </Panel>
      </div>
    </>
  );
}

export default function ClientBookingPage() {
  return (
    <Suspense fallback={<p className="text-neutral-500">Chargement…</p>}>
      <BookingForm />
    </Suspense>
  );
}
