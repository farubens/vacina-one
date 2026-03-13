import type { Metadata } from "next";
import localFont from "next/font/local";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

const franie = localFont({
  src: [
    {
      path: "../assets/fonts/franie/FranieVariableTest-Regular-BF64c31f3d73b64.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/franie/FranieVariableTest-SemiBold-BF64c31f3d7b0b9.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/franie/FranieVariableTest-Bold-BF64c31f3d8798d.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/franie/FranieVariableTest-ExtraBold-BF64c31f3d93e1b.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../assets/fonts/franie/FranieVariableTest-Black-BF64c31f3ca614b.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../assets/fonts/franie/FranieVariableTest-BlackItalic-BF64c31f3d4f65c.otf",
      weight: "900",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-franie",
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
      <body className={`${manrope.variable} ${franie.variable}`}>{children}</body>
    </html>
  );
}
