import fs from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "VacinaOne | Nova clínica de vacinação em Campinas";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

async function fileToDataUrl(filePath: string, mimeType: string) {
  const file = await fs.readFile(filePath);
  return `data:${mimeType};base64,${file.toString("base64")}`;
}

export default async function Image() {
  const logoSrc = await fileToDataUrl(
    path.join(process.cwd(), "public", "assets", "images", "brand", "logo-vacina-one.png"),
    "image/png",
  );
  const heroSrc = await fileToDataUrl(
    path.join(
      process.cwd(),
      "public",
      "assets",
      "images",
      "landing",
      "hero",
      "jovem-se-vacinando-vacina-one-mansoes-santo-antonio.png",
    ),
    "image/png",
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#f5fbfc",
          color: "#18314c",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            width: "56%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "54px 52px",
            backgroundColor: "#f5fbfc",
          }}
        >
          <img src={logoSrc} alt="VacinaOne" width={250} height={63} />

          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                alignSelf: "flex-start",
                padding: "10px 18px",
                borderRadius: 999,
                background: "#69b9c0",
                color: "#ffffff",
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              Em breve em Campinas
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 70,
                lineHeight: 0.98,
                letterSpacing: -3,
                fontWeight: 800,
              }}
            >
              <span>Nova clínica de</span>
              <span style={{ color: "#234a67" }}>vacinação</span>
            </div>

            <div
              style={{
                display: "flex",
                maxWidth: 520,
                fontSize: 28,
                lineHeight: 1.28,
                color: "#355a78",
              }}
            >
              A VacinaOne está chegando ao Taquaral, próximo ao Mansões Santo Antônio, em Campinas.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "#5eb9b8",
              fontWeight: 700,
            }}
          >
            www.vacinaone.com.br
          </div>
        </div>

        <div
          style={{
            width: "44%",
            height: "100%",
            position: "relative",
            display: "flex",
            backgroundColor: "#dff1f3",
          }}
        >
          <img
            src={heroSrc}
            alt="Aplicação de vacina"
            width={720}
            height={840}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(35, 74, 103, 0.05) 0%, rgba(35, 74, 103, 0.18) 100%)",
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
