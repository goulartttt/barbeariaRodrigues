import { ExternalLink } from "./ExternalLink";
import styles from "./ActionLink.module.css";

/** Botão de ação (link com aparência de botão). `external` abre em nova aba. */
export function ActionLink({
  href,
  children,
  variant = "primary",
  external = false,
  icon,
  className,
}) {
  const Link = external ? ExternalLink : "a";

  return (
    <Link
      href={href}
      className={[styles.action, styles[variant], className].filter(Boolean).join(" ")}
    >
      <span>{children}</span>
      {icon && <span className={styles.icon}>{icon}</span>}
    </Link>
  );
}
