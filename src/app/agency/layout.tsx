"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export default function AgencyLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout allowedRole="agency">{children}</DashboardLayout>;
}
