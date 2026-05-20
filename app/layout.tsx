import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ryvo — Copilote Financier IA pour PME",
  description:
    "Le premier copilote financier IA pour patrons de PME. Posez une question, obtenez une réponse en 30 secondes. Trésorerie, embauche, investissement.",
  keywords: ["copilote financier", "IA PME", "trésorerie", "gestion financière", "intelligence artificielle"],
  openGraph: {
    title: "Ryvo — Copilote Financier IA pour PME",
    description: "Prenez les bonnes décisions financières en 30 secondes, sans directeur financier.",
    url: "https://ryvo.fr",
    siteName: "Ryvo",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ryvo — Copilote Financier IA pour PME",
    description: "Prenez les bonnes décisions financières en 30 secondes.",
  },
  icons: {
    icon: "/ryvo-logo.png",
    shortcut: "/ryvo-logo.png",
    apple: "/ryvo-logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
