import Link from "next/link";

export default function UsoDeCookiesPage() {
  return (
    <main className="legal-page">
      <section className="legal-shell">
        <h1>Uso de Cookies</h1>
        <p>
          Utilizamos cookies para funcionamento do site, medição de desempenho e melhoria da experiência do usuário.
        </p>

        <h2>Tipos de cookies utilizados</h2>
        <p>
          Cookies essenciais (funcionamento), cookies de preferência (memória de escolhas) e cookies analíticos
          (estatísticas agregadas).
        </p>

        <h2>Controle de consentimento</h2>
        <p>
          Você pode aceitar ou recusar cookies no banner exibido ao acessar o site. A qualquer momento, é possível
          limpar os cookies pelo navegador.
        </p>

        <h2>Dúvidas e solicitações</h2>
        <p>
          Para mais informações sobre privacidade e cookies, fale com nosso DPO:{" "}
          <a href="mailto:dpo@vacinaone.com.br">dpo@vacinaone.com.br</a>.
        </p>

        <p className="legal-back">
          <Link href="/">Voltar para a página inicial</Link>
        </p>
      </section>
    </main>
  );
}
