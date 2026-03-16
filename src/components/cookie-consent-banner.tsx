"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const COOKIE_CONSENT_KEY = "vacinaone_cookie_consent_v1";

type ConsentChoice = "accepted" | "rejected";

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    setVisible(!saved);
  }, []);

  function setConsent(choice: ConsentChoice) {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, choice);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <aside className="cookie-banner" role="dialog" aria-live="polite" aria-label="Consentimento de cookies">
      <p>
        Utilizamos cookies para melhorar sua experiência. Leia nossa{" "}
        <Link href="/politica-de-privacidade">Política de Privacidade</Link> e os{" "}
        <Link href="/uso-de-cookies">Termos de Uso de Cookies</Link>.
      </p>
      <div className="cookie-actions">
        <button type="button" className="cookie-btn cookie-btn-secondary" onClick={() => setConsent("rejected")}>
          Recusar
        </button>
        <button type="button" className="cookie-btn cookie-btn-primary" onClick={() => setConsent("accepted")}>
          Aceitar cookies
        </button>
      </div>
    </aside>
  );
}
