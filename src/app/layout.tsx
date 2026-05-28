import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "BusConnect — Réservation bus en RDC",
  description:
    "Réservez vos billets de bus interurbains en RDC. Kinshasa, Matadi et toutes les grandes villes.",
};

const themeScript = `(function(){try{var t=localStorage.getItem("busconnect_theme");if(t==="dark")document.documentElement.classList.add("dark");}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen bg-bc-bg font-sans text-bc-text antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
