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
  metadataBase: new URL("https://www.vacinaone.com.br"),
  title: "VacinaOne | Nova clínica de vacinação em Campinas",
  description:
    "A VacinaOne está chegando ao Taquaral, próximo ao Mansões Santo Antônio, em Campinas.",
  icons: {
    icon: "/assets/images/brand/fav.jpg",
    shortcut: "/assets/images/brand/fav.jpg",
    apple: "/assets/images/brand/fav.jpg",
  },
  openGraph: {
    title: "VacinaOne | Nova clínica de vacinação em Campinas",
    description: "A VacinaOne está chegando ao Taquaral, próximo ao Mansões Santo Antônio, em Campinas.",
    url: "https://www.vacinaone.com.br/",
    siteName: "VacinaOne",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VacinaOne | Nova clínica de vacinação em Campinas",
    description: "A VacinaOne está chegando ao Taquaral, próximo ao Mansões Santo Antônio, em Campinas.",
  },
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
