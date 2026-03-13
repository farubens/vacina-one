import Image from "next/image";
import Link from "next/link";

export default function ObrigadoPage() {
  return (
    <main className="thanks-page">
      <section className="thanks-shell">
        <Image
          src="/assets/images/brand/logo-vacina-one.svg"
          alt="VacinaOne"
          width={240}
          height={60}
          className="thanks-logo"
          priority
        />

        <div className="thanks-grid">
          <article className="thanks-card">
            <h1>Obrigado pelo seu cadastro!</h1>
            <p>
              Recebemos seus dados e em breve nosso time entrará em contato para te ajudar no agendamento.
            </p>
            <Link href="/" className="thanks-cta interactive-btn">
              Voltar para a página inicial
            </Link>
          </article>

          <figure className="thanks-mascot" aria-hidden="true">
            <Image
              src="/assets/images/landing/robo-transparente.png"
              alt=""
              width={520}
              height={520}
              className="thanks-mascot-image"
            />
          </figure>
        </div>
      </section>
    </main>
  );
}