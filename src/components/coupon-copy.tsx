"use client";

import { useEffect, useState } from "react";
import { RiCoupon3Fill } from "react-icons/ri";

type CouponCopyProps = {
  code: string;
};

export function CouponCopy({ code }: CouponCopyProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(t);
  }, [copied]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button type="button" className="coupon-box interactive-btn" onClick={handleCopy} aria-label={`Copiar cupom ${code}`}>
      <span className="coupon-tooltip" role="status" aria-live="polite">
        {copied ? "Copiado!" : "Clique para copiar"}
      </span>
      <span className="coupon-icon" aria-hidden="true">
        <RiCoupon3Fill />
      </span>
      <span>Use o cupom: {code}</span>
    </button>
  );
}
