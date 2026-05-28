"use client";

import { FormEvent, useState } from "react";
import { getSession } from "@/lib/auth";
import { PageHeader, Panel, PrimaryButton } from "@/components/dashboard/ui";
import { CLIENT_REVIEWS, filterClientTickets } from "@/lib/mock-data/client";
import { AGENCIES } from "@/lib/constants";

function StarInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className={`text-2xl ${star <= value ? "text-amber-400" : "text-neutral-200"}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default function ClientReviewsPage() {
  const session = getSession();
  const clientId = session?.id ?? "client-1";
  const myReviews = CLIENT_REVIEWS.filter((r) => r.clientId === clientId);
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  const traveledAgencies = [...new Set(filterClientTickets(clientId).map((t) => t.agency))];

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <PageHeader
        title="Avis & commentaires"
        subtitle="Notez une agence et laissez votre commentaire."
      />

      <Panel title="Laisser un avis">
        {submitted ? (
          <p className="text-sm text-emerald-600">Merci ! Votre avis a été enregistré (démo).</p>
        ) : (
          <form className="max-w-xl space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-medium text-neutral-700">Agence</label>
              <select name="agency" required className="mt-1 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm">
                <option value="">Choisir une agence</option>
                {(traveledAgencies.length ? traveledAgencies : AGENCIES.map((a) => a.name)).map((name) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-700">Note</label>
              <div className="mt-2">
                <StarInput value={rating} onChange={setRating} />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-700">Commentaire</label>
              <textarea
                name="comment"
                required
                rows={4}
                placeholder="Partagez votre expérience de voyage…"
                className="mt-1 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
              />
            </div>
            <PrimaryButton>Publier l&apos;avis</PrimaryButton>
          </form>
        )}
      </Panel>

      {myReviews.length > 0 && (
        <div className="mt-6">
          <Panel title="Mes avis publiés">
            <div className="space-y-3">
              {myReviews.map((review) => (
                <article key={review.id} className="rounded-xl bg-neutral-50 p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{review.agency}</p>
                    <span className="text-amber-500">{"★".repeat(review.rating)}</span>
                  </div>
                  <p className="mt-2 text-sm text-neutral-700">{review.comment}</p>
                  <p className="mt-1 text-xs text-neutral-400">{review.date}</p>
                </article>
              ))}
            </div>
          </Panel>
        </div>
      )}
    </>
  );
}
