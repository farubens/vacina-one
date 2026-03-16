import type { CSSProperties } from "react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const style = { "--reveal-delay": `${delay}s` } as CSSProperties;

  return (
    <div className={`reveal ${className ?? ""}`.trim()} style={style}>
      {children}
    </div>
  );
}
