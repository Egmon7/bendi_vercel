"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { PageHeader, Panel, PrimaryButton, SecondaryButton } from "@/components/dashboard/ui";

function PaymentContent() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "";
  const to = searchParams.get("to") ?? "";
  const agency = searchParams.get("agency") ?? "";
  const price = searchParams.get("price") ?? "";
  const name = searchParams.get("name") ?? "";

  return (
    <>
      <PageHeader
        title="Paiement"
        subtitle="Fonctionnalité à venir — Mobile Money et carte bancaire."
      />

      <Panel title="Récapitulatif de réservation">
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between"><dt className="text-neutral-500">Voyageur</dt><dd>{name}</dd></div>
          <div className="flex justify-between"><dt className="text-neutral-500">Trajet</dt><dd>{from} → {to}</dd></div>
          <div className="flex justify-between"><dt className="text-neutral-500">Agence</dt><dd>{agency}</dd></div>
          <div className="flex justify-between border-t border-neutral-100 pt-2"><dt className="text-neutral-500">Total</dt><dd className="font-semibold">{price}</dd></div>
        </dl>
      </Panel>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-6 opacity-60">
          <p className="font-semibold">Mobile Money</p>
          <p className="mt-1 text-sm text-neutral-500">Orange Money, M-Pesa, Airtel Money</p>
          <PrimaryButton>Payer (bientôt)</PrimaryButton>
        </div>
        <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-6 opacity-60">
          <p className="font-semibold">Carte bancaire</p>
          <p className="mt-1 text-sm text-neutral-500">Visa, Mastercard</p>
          <SecondaryButton>Payer (bientôt)</SecondaryButton>
        </div>
      </div>

      <p className="mt-6 text-sm text-neutral-500">
        En attendant, vous pouvez payer directement en agence.{" "}
        <Link href="/client/my-tickets" className="font-medium text-violet-600 hover:underline">
          Voir mes billets
        </Link>
      </p>
    </>
  );
}

export default function ClientPaymentPage() {
  return (
    <Suspense fallback={<p className="text-neutral-500">Chargement…</p>}>
      <PaymentContent />
    </Suspense>
  );
}
