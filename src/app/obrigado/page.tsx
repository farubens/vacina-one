import Image from "next/image";
import Link from "next/link";

export default function ObrigadoPage() {
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
            <div>
              <h1>Obrigado pelo seu cadastro!</h1>
              <p>
                Recebemos seus dados e, em breve, nosso time entrará em contato para te ajudar no agendamento.
              </p>
            </div>
          </div>

          <div className="thanks-actions">
            <Link href="/" className="thanks-cta interactive-btn">
              Voltar para a página inicial
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}
