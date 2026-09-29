import type { ReactNode } from "react";
import styles from "./ActionLink.module.css";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  /** Abre em nova aba e sinaliza isso para leitores de tela. */
  external?: boolean;
  icon?: ReactNode;
  className?: string;
};

export function ActionLink({
  href,
  children,
  variant = "primary",
  external = false,
  icon,
  className,
}: Props) {
  return (
    <a
      href={href}
      className={[styles.action, styles[variant], className].filter(Boolean).join(" ")}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
    >
      <span>{children}</span>
      {icon && <span className={styles.icon}>{icon}</span>}
      {external && <span className="visually-hidden"> (abre em nova aba)</span>}
    </a>
  );
}
