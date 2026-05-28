import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Connexion — BusConnect",
  description: "Connectez-vous à votre espace BusConnect.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-bc-canvas">
      <LoginForm />
    </div>
  );
}
