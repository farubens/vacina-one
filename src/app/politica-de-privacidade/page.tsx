import Link from "next/link";

export default function PoliticaDePrivacidadePage() {
  return (
    <main className="legal-page">
      <section className="legal-shell">
        <h1>Política de Privacidade</h1>
        <p>
          A VacinaOne respeita a sua privacidade e protege os dados pessoais coletados em nosso site e formulários.
          Utilizamos suas informações para contato, agendamento, atendimento e melhoria da experiência digital.
        </p>

        <h2>Dados coletados</h2>
        <p>Podemos coletar nome, e-mail, telefone/WhatsApp e preferências informadas em formulários.</p>

        <h2>Finalidade do uso</h2>
        <p>Usamos os dados para retorno de contato, suporte, campanhas relacionadas aos nossos serviços e análises.</p>

        <h2>Compartilhamento</h2>
        <p>Não comercializamos dados pessoais. O compartilhamento ocorre apenas quando necessário para operação do site.</p>

        <h2>Seus direitos</h2>
        <p>
          Você pode solicitar acesso, correção, atualização ou exclusão de dados, conforme a LGPD, pelo e-mail{" "}
          <a href="mailto:dpo@vacinaone.com.br">dpo@vacinaone.com.br</a>.
        </p>

        <h2>Contato do Encarregado (DPO)</h2>
        <p>
          Em caso de dúvidas sobre privacidade e proteção de dados, entre em contato com nosso DPO:{" "}
          <a href="mailto:dpo@vacinaone.com.br">dpo@vacinaone.com.br</a>.
        </p>

        <p className="legal-back">
          <Link href="/">Voltar para a página inicial</Link>
        </p>
      </section>
    </main>
  );
}
