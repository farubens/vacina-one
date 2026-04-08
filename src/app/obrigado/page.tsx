import Image from "next/image";
import Link from "next/link";

type ObrigadoPageProps = {
  searchParams?: Promise<{
    status?: string;
  }>;
};

const statusContent = {
  ok: {
    title: "Obrigado pelo seu cadastro!",
    description: "Recebemos seus dados e você já faz parte da lista prioritária da VacinaOne.",
    details:
      "Assim que a clínica for inaugurada, você receberá um e-mail com um benefício exclusivo de inauguração, válido para você, sua família ou sua empresa, além das orientações para o agendamento.",
    closing: "Será um prazer cuidar da saúde e proteção de quem você ama.",
  },
  error: {
    title: "Tivemos uma instabilidade no envio",
    description:
      "Seu cadastro não pôde ser concluído agora. Tente novamente em instantes para garantir que o time da VacinaOne receba seus dados.",
    details: "",
    closing: "",
  },
  invalid: {
    title: "Faltam alguns dados no formulário",
    description: "Revise as informações preenchidas e envie novamente para concluir seu pré-cadastro.",
    details: "",
    closing: "",
  },
  "rate-limited": {
    title: "Recebemos tentativas demais em sequência",
    description: "Aguarde um minuto e envie novamente para concluir seu cadastro com segurança.",
    details: "",
    closing: "",
  },
} as const;

export default async function ObrigadoPage({ searchParams }: ObrigadoPageProps) {
  const resolvedSearchParams = await searchParams;
  const status =
    resolvedSearchParams?.status === "error" ||
    resolvedSearchParams?.status === "invalid" ||
    resolvedSearchParams?.status === "rate-limited"
      ? resolvedSearchParams.status
      : "ok";
  const content = statusContent[status];

  return (
    <main className="thanks-page">
      <section className="thanks-shell">
        <Image
          src="/assets/images/brand/logo-vacina-one.svg"
          alt="VacinaOne"
          width={220}
          height={55}
          className="thanks-logo"
          priority
        />

        <article className="thanks-card">
          <div className="thanks-header">
            <Image
              src="/assets/images/landing/robo-transparente.png"
              alt="Mascote VacinaOne"
              width={170}
              height={170}
              className="thanks-mascot"
            />
            <div className="thanks-copy">
              <h1>{content.title}</h1>
              <p>{content.description}</p>
              {content.details ? <p>{content.details}</p> : null}
              {content.closing ? <p>{content.closing}</p> : null}
            </div>
          </div>

          <div className="thanks-actions">
            <Link href={status === "ok" ? "/" : "/#cadastro"} className="thanks-cta interactive-btn">
              {status === "ok" ? "Voltar para a página inicial" : "Voltar para o formulário"}
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}
