import Link from "next/link";
import { HOW_IT_WORKS_STEPS, WHY_CHOOSE_US } from "@/lib/constants";

function CheckIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2.5"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

export function BottomSections() {
  return (
    <section className="bg-bc-bg px-4 pb-12 pt-10 sm:px-6 sm:pb-14 sm:pt-12 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-10 sm:space-y-14">
        <div id="aide" className="text-center">
          <h2 className="text-xl font-semibold tracking-tight text-bc-text sm:text-2xl">
            Comment réserver votre billet ?
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-bc-text-secondary">
            Cinq étapes simples, pensées pour la RDC.
          </p>

          <ol className="mt-6 grid grid-cols-1 gap-2 min-[400px]:grid-cols-2 sm:mt-8 lg:grid-cols-5 lg:gap-3">
            {HOW_IT_WORKS_STEPS.map((item) => (
              <li
                key={item.step}
                className={`rounded-xl bg-bc-surface-muted px-4 py-3 text-left ${
                  "wide" in item && item.wide ? "min-[400px]:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <span className="text-sm font-bold text-bc-text">{item.step}</span>
                <p className="mt-0.5 text-sm font-medium text-bc-text-secondary">{item.title}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-semibold tracking-tight text-bc-text sm:text-2xl">
            Pourquoi nous choisir ?
          </h2>
          <ul className="mx-auto mt-6 grid max-w-3xl gap-3 text-left text-sm font-medium text-bc-text-secondary sm:grid-cols-2 sm:gap-x-6 sm:gap-y-3 lg:max-w-4xl lg:grid-cols-3">
            {WHY_CHOOSE_US.map((item, index) => (
              <li
                key={item}
                className={`flex items-center gap-2 sm:justify-center lg:justify-start ${
                  index === WHY_CHOOSE_US.length - 1
                    ? "sm:col-span-2 sm:justify-center lg:col-span-1 lg:justify-start"
                    : ""
                }`}
              >
                <CheckIcon />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center">
          <h2 className="text-[1.35rem] font-extrabold leading-snug tracking-tight text-bc-text sm:text-3xl sm:font-bold">
            Prêt à <span className="font-black sm:font-extrabold">voyager facilement</span> ?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm font-semibold text-bc-text-secondary sm:text-base sm:font-medium">
            Réservez votre billet en ligne et évitez les longues files en agence.
          </p>
          <div className="mx-auto mt-5 flex flex-row flex-wrap items-center justify-center gap-2 sm:mt-6 sm:gap-3">
            <Link
              href="#trajets"
              className="inline-flex items-center justify-center rounded-full bg-neutral-950 px-4 py-2 text-xs font-bold text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 sm:px-6 sm:py-2.5 sm:text-sm sm:font-semibold"
            >
              Réserver un billet
            </Link>
            <Link
              href="#trajets"
              className="inline-flex items-center justify-center rounded-full border border-bc-border bg-bc-surface px-4 py-2 text-xs font-bold text-bc-text hover:bg-bc-hover sm:px-6 sm:py-2.5 sm:text-sm sm:font-semibold"
            >
              Voir les trajets
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
