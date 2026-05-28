"use client";

import { ReactNode, useEffect } from "react";
import { ToastProvider } from "@/components/toast/ToastProvider";
import { applyTheme, getStoredTheme } from "@/lib/theme";

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    applyTheme(getStoredTheme());
  }, []);

  return <ToastProvider>{children}</ToastProvider>;
}
