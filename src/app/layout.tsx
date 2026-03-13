import type { Metadata } from "next";
import { Lexend, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lexend",
  weight: ["700", "800", "900"],
});

export const metadata: Metadata = {
  title: "VacinaOne | Nova clínica de vacinação em Campinas",
  description:
    "Landing page da VacinaOne para pré-cadastro de famílias interessadas na nova unidade em Campinas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${manrope.variable} ${lexend.variable}`}>{children}</body>
    </html>
  );
}
