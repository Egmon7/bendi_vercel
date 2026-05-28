"use client";

import { ReactNode, useEffect } from "react";

const buttonBase =
  "cursor-pointer touch-manipulation select-none transition-[transform,background-color,border-color,color] active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50";

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/50"
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        className="relative z-10 flex max-h-[92dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border border-bc-border bg-bc-surface shadow-xl sm:max-h-[90vh] sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-bc-border-subtle px-4 py-3.5 sm:px-6 sm:py-4">
          <h3 className="pr-2 text-base font-semibold text-bc-text sm:text-lg">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-bc-text-muted hover:bg-bc-hover hover:text-bc-text"
            aria-label="Fermer la fenêtre"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6">{children}</div>
        {footer && (
          <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-bc-border-subtle px-4 py-3.5 sm:flex-row sm:justify-end sm:px-6 sm:py-4 [&_button]:w-full sm:[&_button]:w-auto">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export function FormField({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-bc-text-secondary">{label}</label>
      <div className="mt-1">{children}</div>
    </div>
  );
}

export const inputClassName =
  "w-full rounded-lg border border-bc-border bg-bc-input px-3 py-2 text-sm text-bc-text outline-none placeholder:text-bc-text-faint focus:border-bc-text";

export const selectClassName =
  "w-full rounded-lg border border-bc-border bg-bc-input px-3 py-2 text-sm text-bc-text outline-none focus:border-bc-text";

export function PageHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-bc-text">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-bc-text-muted">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function StatCard({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-2xl border border-bc-border bg-bc-surface p-5 shadow-sm">
      <p className="text-sm text-bc-text-muted">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-bc-text">{value}</p>
      {hint && <p className="mt-1 text-xs text-bc-text-faint">{hint}</p>}
    </div>
  );
}

export function StatGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{children}</div>;
}

export function Panel({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <section className="rounded-2xl border border-bc-border bg-bc-surface p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-bc-text">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function PrimaryButton({
  children,
  onClick,
  type = "button",
  form,
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  form?: string;
}) {
  return (
    <button
      type={type}
      form={form}
      onClick={onClick}
      className={`rounded-full bg-neutral-950 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 ${buttonBase}`}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border border-bc-border bg-bc-surface px-4 py-2 text-sm font-medium text-bc-text-secondary hover:bg-bc-hover ${buttonBase}`}
    >
      {children}
    </button>
  );
}

export function StatusBadge({
  status,
}: {
  status: "active" | "pending" | "suspended" | "blocked" | "paid" | "confirmed" | "cancelled" | "dispute";
}) {
  const styles = {
    active: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
    pending: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
    suspended: "bg-red-500/15 text-red-700 dark:text-red-300",
    blocked: "bg-red-500/15 text-red-700 dark:text-red-300",
    paid: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
    confirmed: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
    cancelled: "bg-neutral-500/15 text-neutral-600 dark:text-neutral-300",
    dispute: "bg-violet-500/15 text-violet-700 dark:text-violet-300",
  };

  const labels = {
    active: "Actif",
    pending: "En attente",
    suspended: "Suspendu",
    blocked: "Bloqué",
    paid: "Payé",
    confirmed: "Confirmée",
    cancelled: "Annulée",
    dispute: "Litige",
  };

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

type Column<T> = {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
};

export function DataTable<T extends { id: string }>({
  columns,
  rows,
}: {
  columns: Column<T>[];
  rows: T[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr className="border-b border-bc-border-subtle text-bc-text-muted">
            {columns.map((col) => (
              <th key={col.key} className={`px-3 py-3 font-medium ${col.className ?? ""}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-bc-border-subtle">
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-bc-hover">
              {columns.map((col) => (
                <td key={col.key} className={`px-3 py-3 align-middle text-bc-text ${col.className ?? ""}`}>
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ActionGroup({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap gap-1.5">{children}</div>;
}

export function ActionIcon({
  icon,
  label,
  onClick,
  variant = "default",
}: {
  icon: "view" | "delete" | "cancel" | "block" | "unblock" | "edit" | "validate" | "commission" | "dispute";
  label: string;
  onClick?: () => void;
  variant?: "default" | "danger";
}) {
  const baseClass =
    variant === "danger"
      ? "text-red-600 hover:bg-red-500/10 dark:text-red-400"
      : "text-bc-text-muted hover:bg-bc-hover hover:text-bc-text";

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick?.();
      }}
      aria-label={label}
      title={label}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${baseClass} ${buttonBase}`}
    >
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
        {icon === "view" && (
          <>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </>
        )}
        {icon === "delete" && (
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        )}
        {icon === "cancel" && (
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        )}
        {icon === "block" && (
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        )}
        {icon === "unblock" && (
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        )}
        {icon === "edit" && (
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        )}
        {icon === "validate" && (
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        )}
        {icon === "commission" && (
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        )}
        {icon === "dispute" && (
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        )}
      </svg>
    </button>
  );
}

export function ActionLink({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg px-2 py-1 text-xs font-medium text-violet-600 hover:bg-violet-500/10 dark:text-violet-400"
    >
      {children}
    </button>
  );
}

export function PlaceholderPage({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-bc-border bg-bc-surface p-10 text-center shadow-sm">
      <p className="text-lg font-semibold text-bc-text">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm text-bc-text-muted">{description}</p>
    </div>
  );
}
