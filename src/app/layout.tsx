import type { Metadata } from "next";
import { Lexend, Manrope } from "next/font/google";
import Script from "next/script";
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
      <head>
        <meta name="facebook-domain-verification" content="rkxgxmjrftaegqf8tmjv6znwhpdl81" />
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P58NPV67');`}
        </Script>
      </head>
      <body className={`${manrope.variable} ${lexend.variable}`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P58NPV67"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
