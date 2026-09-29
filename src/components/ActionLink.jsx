import styles from "./ActionLink.module.css";

export function ActionLink({
  href,
  children,
  variant = "primary",
  external = false,
  icon,
  className,
}) {
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
