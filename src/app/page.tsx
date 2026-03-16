import Image from "next/image";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { CouponCopy } from "../components/coupon-copy";
import { Reveal } from "../components/reveal";

const heroImages = {
  child: "/assets/images/landing/hero/menino-jovem-moreno-vacina-one-campinas-taquaral.png",
  vaccine: "/assets/images/landing/hero/jovem-se-vacinando-vacina-one-mansoes-santo-antonio-campinas.png",
  baby: "/assets/images/landing/hero/bebe-vacina-one.png",
  robot: "/assets/images/landing/robo-transparente.png",
};

export default function Home() {
  return (
    <main className="landing-page">
      <header className="site-header">
        <div className="container nav-shell">
          <Reveal>
            <a className="brand" href="#top" aria-label="VacinaOne, voltar ao topo">
              <Image
                src="/assets/images/brand/logo-vacina-one.svg"
                alt="VacinaOne"
                priority
                width={212}
                height={53}
                className="brand-logo"
              />
            </a>
          </Reveal>

          <Reveal delay={0.08}>
            <a className="franchise-cta interactive-btn" href="#rodape">
              QUERO SER UM DOS PRIMEIROS
            </a>
          </Reveal>
        </div>
      </header>

      <section id="top" className="hero-section">
        <div className="container hero-grid">
          <Reveal className="hero-media">
            <div className="hero-media-stack">
              <div className="hero-photo hero-photo-top">
                <img src={heroImages.child} alt="Criança sorrindo" />
              </div>
              <div className="hero-photo hero-photo-bottom">
                <img src={heroImages.baby} alt="Bebê sorrindo" />
              </div>
            </div>

            <div className="hero-photo hero-photo-main">
              <img src={heroImages.vaccine} alt="Aplicação de vacina" />
            </div>

            <div className="hero-badge">Proteção em primeiro lugar</div>
          </Reveal>

          <Reveal className="hero-copy" delay={0.08}>
            <h1>
              Nova Clínica de Vacinação em <span className="title-accent">Campinas</span>
              <em>Em breve</em>
            </h1>

            <p className="hero-description">
              A <span className="hero-highlight">VacinaOne</span> está chegando ao{" "}
              <span className="hero-highlight">Taquaral, próximo ao Mansões Santo Antônio,</span> em Campinas.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="highlight-section">
        <div className="container highlight-grid">
          <Reveal className="highlight-copy">
            <h2>
              Uma clínica de vacinação <span>moderna, segura, futurista e humanizada,</span> criada para cuidar de{" "}
              <strong>crianças, adultos e idosos.</strong>
            </h2>

            <p>
              Cadastre-se agora para acompanhar a inauguração e garantir seu benefício exclusivo de lançamento.
            </p>

            <CouponCopy code="VACINAONE10" />
          </Reveal>

          <Reveal className="robot-wrap" delay={0.1}>
            <img className="robot-image" src={heroImages.robot} alt="Mascote VacinaOne" />
          </Reveal>
        </div>
      </section>

      <section id="cadastro" className="form-section">
        <div className="container form-grid">
          <Reveal>
            <form className="lead-form" action="/obrigado" method="get">
              <input type="text" name="name" placeholder="Nome Completo" aria-label="Nome completo" required />
              <input type="tel" name="phone" placeholder="WhatsApp" aria-label="WhatsApp" required />
              <input type="email" name="email" placeholder="Email" aria-label="Email" required />
              <input type="text" name="coupon" placeholder="Cupom" defaultValue="VACINAONE10" aria-label="Cupom" />
              <input type="text" name="vaccine" placeholder="Qual vacina?" aria-label="Qual vacina" />
              <button className="interactive-btn" type="submit">
                QUERO MEU BENEFÍCIO DE INAUGURAÇÃO
              </button>
            </form>
          </Reveal>

          <Reveal className="form-copy" delay={0.1}>
            <p className="form-copy-text">
              <span className="form-highlight">Preencha o formulário</span> e seja um dos primeiros a conhecer a
              VacinaOne. <strong>O cuidado que sua família merece começa aqui.</strong>
            </p>
          </Reveal>
        </div>
      </section>

      <footer id="rodape" className="footer-section">
        <div className="container footer-grid">
          <Reveal className="footer-left">
            <Image
              src="/assets/images/brand/logo-vacina-one-white.svg"
              alt="VacinaOne"
              width={300}
              height={86}
              className="footer-logo"
            />

            <ul className="footer-contact-list">
              <li>
                <FaWhatsapp aria-hidden="true" />
                <span>(19) 9917-2822</span>
              </li>
              <li>
                <Image
                  src="/assets/images/landing/sections/email.svg"
                  alt=""
                  aria-hidden="true"
                  width={18}
                  height={18}
                  className="footer-contact-icon"
                />
                <span>atendimento@vacinaone.com.br</span>
              </li>
              <li>
                <Image
                  src="/assets/images/landing/sections/endereco.svg"
                  alt=""
                  aria-hidden="true"
                  width={18}
                  height={18}
                  className="footer-contact-icon"
                />
                <span>R. Percílio Neto, 407 - Parque Taquaral - Campinas - SP</span>
              </li>
            </ul>

            <div className="footer-social">
              <p>Nossas redes</p>
              <div className="social-links">
                <a href="#" aria-label="Facebook">
                  <FaFacebookF aria-hidden="true" />
                </a>
                <a href="#" aria-label="Instagram">
                  <FaInstagram aria-hidden="true" />
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal className="footer-right" delay={0.1}>
            <h2>Ficou com alguma dúvida? Fale com a gente.</h2>
            <p>
              Quer agendar, tirar uma dúvida ou entender como a VacinaOne pode ajudar sua família, equipe ou
              instituição? Envie uma mensagem e retornamos em breve.
            </p>
            <a href="#cadastro" className="footer-cta interactive-btn">
              QUERO SER UM DOS PRIMEIROS
            </a>
          </Reveal>
        </div>
      </footer>
    </main>
  );
}
