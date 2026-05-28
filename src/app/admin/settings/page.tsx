"use client";

import { useState } from "react";
import {
  PageHeader,
  Panel,
  PrimaryButton,
  SecondaryButton,
  Modal,
  FormField,
  inputClassName,
  selectClassName,
} from "@/components/dashboard/ui";

type SettingsModal = "fees" | "notifications" | "system" | "security" | null;

const SETTINGS_SECTIONS = [
  {
    id: "fees" as const,
    title: "Frais & commissions",
    description: "Définir les frais de service et taux de commission par agence.",
    action: "Gérer les frais",
  },
  {
    id: "notifications" as const,
    title: "Notifications",
    description: "Emails, SMS et alertes pour admins, agences et clients.",
    action: "Configurer",
  },
  {
    id: "system" as const,
    title: "Paramètres système",
    description: "Langue, fuseau horaire, maintenance et disponibilité.",
    action: "Modifier",
  },
  {
    id: "security" as const,
    title: "Sécurité",
    description: "Authentification, sessions, mots de passe et accès API.",
    action: "Sécuriser",
  },
];

export default function AdminSettingsPage() {
  const [activeModal, setActiveModal] = useState<SettingsModal>(null);

  const closeModal = () => setActiveModal(null);

  return (
    <>
      <PageHeader
        title="Paramètres plateforme"
        subtitle="Gérez les frais, notifications, paramètres système et sécurité."
        actions={<PrimaryButton>Enregistrer les modifications</PrimaryButton>}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        {SETTINGS_SECTIONS.map((section) => (
          <Panel key={section.title} title={section.title}>
            <p className="text-sm text-neutral-500">{section.description}</p>
            <div className="mt-4">
              <SecondaryButton onClick={() => setActiveModal(section.id)}>{section.action}</SecondaryButton>
            </div>
          </Panel>
        ))}
      </div>

      <Modal
        open={activeModal === "fees"}
        onClose={closeModal}
        title="Frais & commissions"
        footer={
          <>
            <SecondaryButton onClick={closeModal}>Annuler</SecondaryButton>
            <PrimaryButton onClick={closeModal}>Enregistrer</PrimaryButton>
          </>
        }
      >
        <div className="space-y-4">
          <FormField label="Frais de service (%)">
            <input type="number" defaultValue={5} className={inputClassName} />
          </FormField>
          <FormField label="Commission par défaut (%)">
            <input type="number" defaultValue={10} className={inputClassName} />
          </FormField>
          <FormField label="Commission agences premium (%)">
            <input type="number" defaultValue={8} className={inputClassName} />
          </FormField>
        </div>
      </Modal>

      <Modal
        open={activeModal === "notifications"}
        onClose={closeModal}
        title="Notifications"
        footer={
          <>
            <SecondaryButton onClick={closeModal}>Annuler</SecondaryButton>
            <PrimaryButton onClick={closeModal}>Enregistrer</PrimaryButton>
          </>
        }
      >
        <div className="space-y-3">
          {[
            "Nouvelle réservation",
            "Paiement confirmé",
            "Agence en attente de validation",
            "Litige signalé",
          ].map((item) => (
            <label key={item} className="flex items-center justify-between rounded-lg border border-neutral-100 px-3 py-2 text-sm">
              <span>{item}</span>
              <input type="checkbox" defaultChecked />
            </label>
          ))}
          <FormField label="Canal SMS">
            <select className={selectClassName} defaultValue="enabled">
              <option value="enabled">Activé</option>
              <option value="disabled">Désactivé</option>
            </select>
          </FormField>
        </div>
      </Modal>

      <Modal
        open={activeModal === "system"}
        onClose={closeModal}
        title="Paramètres système"
        footer={
          <>
            <SecondaryButton onClick={closeModal}>Annuler</SecondaryButton>
            <PrimaryButton onClick={closeModal}>Enregistrer</PrimaryButton>
          </>
        }
      >
        <div className="space-y-4">
          <FormField label="Langue">
            <select className={selectClassName} defaultValue="fr">
              <option value="fr">Français</option>
              <option value="en">English</option>
            </select>
          </FormField>
          <FormField label="Fuseau horaire">
            <select className={selectClassName} defaultValue="africa/kinshasa">
              <option value="africa/kinshasa">Africa/Kinshasa (WAT)</option>
            </select>
          </FormField>
          <FormField label="Mode maintenance">
            <select className={selectClassName} defaultValue="off">
              <option value="off">Désactivé</option>
              <option value="on">Activé</option>
            </select>
          </FormField>
        </div>
      </Modal>

      <Modal
        open={activeModal === "security"}
        onClose={closeModal}
        title="Sécurité"
        footer={
          <>
            <SecondaryButton onClick={closeModal}>Annuler</SecondaryButton>
            <PrimaryButton onClick={closeModal}>Enregistrer</PrimaryButton>
          </>
        }
      >
        <div className="space-y-4">
          <FormField label="Durée de session (minutes)">
            <input type="number" defaultValue={60} className={inputClassName} />
          </FormField>
          <FormField label="Authentification à deux facteurs">
            <select className={selectClassName} defaultValue="optional">
              <option value="optional">Optionnelle</option>
              <option value="required">Obligatoire pour admins</option>
            </select>
          </FormField>
          <FormField label="Clé API plateforme">
            <input type="text" readOnly value="bc_live_••••••••••••••••" className={inputClassName} />
          </FormField>
          <SecondaryButton>Régénérer la clé API</SecondaryButton>
        </div>
      </Modal>
    </>
  );
}
