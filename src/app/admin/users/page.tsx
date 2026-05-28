"use client";

import { useState } from "react";
import {
  ActionGroup,
  ActionIcon,
  DataTable,
  PageHeader,
  Panel,
  PrimaryButton,
  StatusBadge,
} from "@/components/dashboard/ui";
import { ADMIN_USERS } from "@/lib/mock-data/admin";

export default function AdminUsersPage() {
  const [users, setUsers] = useState(ADMIN_USERS);

  const handleDelete = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <>
      <PageHeader
        title="Gestion des utilisateurs"
        subtitle="Clients et comptes agences de la plateforme."
        actions={<PrimaryButton>Ajouter un utilisateur</PrimaryButton>}
      />

      <Panel title="Utilisateurs">
        <DataTable
          rows={users}
          columns={[
            { key: "name", header: "Nom", render: (row) => <span className="font-medium">{row.name}</span> },
            { key: "email", header: "Email", render: (row) => row.email },
            {
              key: "type",
              header: "Type",
              render: (row) => (row.type === "client" ? "Client" : "Agence"),
            },
            { key: "phone", header: "Téléphone", render: (row) => row.phone },
            { key: "status", header: "Statut", render: (row) => <StatusBadge status={row.status} /> },
            { key: "reservations", header: "Réservations", render: (row) => row.reservations },
            {
              key: "actions",
              header: "Actions",
              render: (row) => (
                <ActionGroup>
                  <ActionIcon
                    icon="delete"
                    label="Supprimer l'utilisateur"
                    variant="danger"
                    onClick={() => handleDelete(row.id)}
                  />
                </ActionGroup>
              ),
            },
          ]}
        />
      </Panel>
    </>
  );
}
