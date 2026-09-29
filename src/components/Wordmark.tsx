import styles from "./Wordmark.module.css";

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={[styles.wordmark, className].filter(Boolean).join(" ")}>
      <span className={styles.name}>Rodrigues</span>{" "}
      <span className={styles.kind}>Barbearia</span>
    </span>
  );
}
