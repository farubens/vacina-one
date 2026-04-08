"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const vaccineOptions = [
  "Tríplice Viral",
  "Varicela",
  "Rotavírus",
  "Hexavalente",
  "HPV 9",
  "Herpes-zóster",
  "Meningocócica B",
  "Meningocócica ACWY",
  "Pneumocócica 13/ 15/ 20",
  "Pneumo 23",
  "Dtpa tríplice bacteriana",
  "Dengue (Qdenga)",
  "VSR bebê – nirsevimabe (Beyfortus)",
  "VSR gestante – Abrysvo",
  "Hepatite A (adulto e infantil)",
  "Hepatite A + B",
  "Febre Tifoide",
  "Febre amarela",
  "Outras",
] as const;

const OTHER_OPTION = "Outras";

export function LeadForm() {
  const [selectedVaccines, setSelectedVaccines] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement | null>(null);
  const hasOtherSelected = useMemo(() => selectedVaccines.includes(OTHER_OPTION), [selectedVaccines]);
  const selectedVaccinesLabel = useMemo(() => {
    if (selectedVaccines.length === 0) {
      return "Selecione as vacinas";
    }

    if (selectedVaccines.length <= 2) {
      return selectedVaccines.join(", ");
    }

    return `${selectedVaccines.slice(0, 2).join(", ")} +${selectedVaccines.length - 2}`;
  }, [selectedVaccines]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!selectRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  function handleVaccineToggle(vaccine: string) {
    setSelectedVaccines((current) =>
      current.includes(vaccine) ? current.filter((item) => item !== vaccine) : [...current, vaccine],
    );
  }

  return (
    <form className="lead-form" action="/api/lead" method="post">
      <input type="text" name="name" placeholder="Nome Completo" aria-label="Nome completo" required />
      <input type="tel" name="phone" placeholder="WhatsApp" aria-label="WhatsApp" required />
      <input type="email" name="email" placeholder="Email" aria-label="Email" required />
      <input type="text" name="coupon" placeholder="Cupom" defaultValue="VACINAONE10" aria-label="Cupom" />

      <div className="vaccine-select" ref={selectRef}>
        <button
          className={`vaccine-select-trigger${isMenuOpen ? " is-open" : ""}`}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isMenuOpen}
          aria-label="Selecionar vacinas"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span className={`vaccine-select-value${selectedVaccines.length === 0 ? " is-placeholder" : ""}`}>
            {selectedVaccinesLabel}
          </span>
          <span className="vaccine-select-icon" aria-hidden="true" />
        </button>

        {selectedVaccines.map((vaccine) => (
          <input key={vaccine} type="hidden" name="vaccine" value={vaccine} />
        ))}

        {isMenuOpen ? (
          <div className="vaccine-select-menu" role="listbox" aria-label="Lista de vacinas" aria-multiselectable="true">
            {vaccineOptions.map((vaccine) => {
              const checked = selectedVaccines.includes(vaccine);

              return (
                <label key={vaccine} className={`vaccine-option${checked ? " is-selected" : ""}`}>
                  <input type="checkbox" value={vaccine} checked={checked} onChange={() => handleVaccineToggle(vaccine)} />
                  <span>{vaccine}</span>
                </label>
              );
            })}
          </div>
        ) : null}
      </div>

      {hasOtherSelected ? (
        <input
          type="text"
          name="vaccineOther"
          placeholder="Qual outra vacina?"
          aria-label="Especifique outra vacina"
          required
        />
      ) : null}

      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="lead-honeypot" />
      <button className="interactive-btn" type="submit">
        QUERO MEU BENEFÍCIO DE INAUGURAÇÃO
      </button>
    </form>
  );
}
