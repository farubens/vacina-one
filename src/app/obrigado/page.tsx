import Link from "next/link";

export default function ObrigadoPage() {
  return (
    <main style={{ minHeight: "100svh", display: "grid", placeItems: "center", padding: "32px" }}>
      <section
        style={{
          width: "min(760px, 100%)",
          background: "linear-gradient(135deg, #eef8fa 0%, #d9eef2 100%)",
          borderRadius: "20px",
          padding: "48px 34px",
          textAlign: "center",
        }}
      >
        <h1 style={{ margin: 0, color: "#234a67", fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1 }}>
          Obrigado pelo seu cadastro!
        </h1>
        <p style={{ margin: "18px 0 0", color: "#1c3551", fontSize: "clamp(1rem, 2vw, 1.25rem)", lineHeight: 1.6 }}>
          Recebemos seus dados e em breve nosso time entrará em contato para te ajudar no agendamento.
        </p>
        <Link
          href="/"
          style={{
            marginTop: "28px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "48px",
            padding: "0 24px",
            borderRadius: "999px",
            background: "#234a67",
            color: "#fff",
            textDecoration: "none",
            fontWeight: 700,
          }}
        >
          Voltar para a página inicial
        </Link>
      </section>
    </main>
  );
}