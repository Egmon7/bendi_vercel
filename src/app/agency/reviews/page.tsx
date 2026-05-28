"use client";

import { getSession } from "@/lib/auth";
import { PageHeader, Panel, StatCard, StatGrid } from "@/components/dashboard/ui";
import { AGENCY_REVIEWS, filterByAgency } from "@/lib/mock-data/agency";

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-amber-500">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`h-4 w-4 ${i < rating ? "fill-current" : "fill-neutral-200"}`} viewBox="0 0 20 20">
          <path d="M10 15.585l-5.317 2.795 1.016-5.922L1.4 8.414l5.946-.864L10 2.2l2.654 5.35 5.946.864-4.299 4.044 1.016 5.922L10 15.585z" />
        </svg>
      ))}
    </span>
  );
}

export default function AgencyReviewsPage() {
  const session = getSession();
  const agencyId = session?.id ?? "agency-1";
  const reviews = filterByAgency(AGENCY_REVIEWS, agencyId);
  const average = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "—";

  return (
    <>
      <PageHeader title="Avis & notes" subtitle="Commentaires clients et note moyenne de votre agence." />

      <StatGrid>
        <StatCard label="Note moyenne" value={average} hint="Sur 5 étoiles" />
        <StatCard label="Total avis" value={String(reviews.length)} hint="Tous les commentaires" />
        <StatCard label="Avis 5 étoiles" value={String(reviews.filter((r) => r.rating === 5).length)} hint="Excellent" />
        <StatCard label="Ce mois" value={String(reviews.length)} hint="Mai 2026" />
      </StatGrid>

      <div className="mt-6">
        <Panel title="Commentaires clients">
          <div className="space-y-4">
            {reviews.length === 0 ? (
              <p className="text-sm text-neutral-500">Aucun avis pour le moment.</p>
            ) : (
              reviews.map((review) => (
                <article key={review.id} className="rounded-xl border border-neutral-100 bg-neutral-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium">{review.client}</p>
                    <StarRating rating={review.rating} />
                  </div>
                  <p className="mt-2 text-sm text-neutral-700">{review.comment}</p>
                  <p className="mt-2 text-xs text-neutral-400">{review.date}</p>
                </article>
              ))
            )}
          </div>
        </Panel>
      </div>
    </>
  );
}
