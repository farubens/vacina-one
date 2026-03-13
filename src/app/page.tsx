import Image from "next/image";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { CouponCopy } from "../components/coupon-copy";
import { Reveal } from "../components/reveal";

const heroImages = {
  child: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=80",
  vaccine: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80",
  baby: "https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=900&q=80",
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
              Fale com um atendente
            </a>
          </Reveal>
        </div>
      </header>

      <section id="top" className="hero-section">
        <div className="container hero-grid">
          <Reveal className="hero-media">
            <div className="hero-media-stack">
              <div className="hero-photo hero-photo-top">
                <img src={heroImages.child} alt="CrianÃ§a sorrindo" />
              </div>
              <div className="hero-photo hero-photo-bottom">
                <img src={heroImages.baby} alt="BebÃª sorrindo" />
              </div>
            </div>

            <div className="hero-photo hero-photo-main">
              <img src={heroImages.vaccine} alt="AplicaÃ§Ã£o de vacina" />
            </div>

            <div className="hero-badge">ProteÃ§Ã£o em primeiro lugar</div>
          </Reveal>

          <Reveal className="hero-copy" delay={0.08}>
            <h1>
              Nova ClÃ­nica de VacinaÃ§Ã£o em <span className="title-accent">Campinas</span>
              <em>Em breve</em>
            </h1>

            <p className="hero-description">
              A <span className="hero-highlight">VacinaOne</span> estÃ¡ chegando ao {" "}
              <span className="hero-highlight">Taquaral, prÃ³ximo ao MansÃµes Santo AntÃ´nio,</span> em Campinas.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="highlight-section">
        <div className="container highlight-grid">
          <Reveal className="highlight-copy">
            <h2>
              Uma clÃ­nica de vacinaÃ§Ã£o <span>moderna, segura, futurista e humanizada,</span> criada para cuidar de {" "}
              <strong>crianÃ§as, adultos e idosos.</strong>
            </h2>

            <p>
              Cadastre-se agora para acompanhar a inauguraÃ§Ã£o e garantir seu benefÃ­cio exclusivo de lanÃ§amento.
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
                QUERO MEU BENEFÃCIO DE INAUGURAÃ‡ÃƒO
              </button>
            </form>
          </Reveal>

          <Reveal className="form-copy" delay={0.1}>
            <p className="form-copy-text">
              <span className="form-highlight">Preencha o formulÃ¡rio</span> e seja um dos primeiros a conhecer a
              VacinaOne. <strong>O cuidado que sua famÃ­lia merece comeÃ§a aqui.</strong>
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
                <span>R. Percilio Neto, 407 - Parque Taquaral - Campinas - SP</span>
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
            <h2>Ficou com alguma dÃºvida? Fale com a gente.</h2>
            <p>
              Quer agendar, tirar uma dÃºvida ou entender como a VacinaOne pode ajudar sua famÃ­lia, equipe ou
              instituiÃ§Ã£o? Envie uma mensagem e retornamos em breve.
            </p>
            <a href="#cadastro" className="footer-cta interactive-btn">
              Agendar VacinaÃ§Ã£o
            </a>
          </Reveal>
        </div>
      </footer>
    </main>
  );
}
