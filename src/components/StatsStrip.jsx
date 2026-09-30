import { business, team } from "@/content/business";
import styles from "./StatsStrip.module.css";

/** Números reais da barbearia, logo abaixo do hero. */
export function StatsStrip() {
  const { rating, reviewCount } = business.google;
  const stats = [
    { value: rating, label: "Nota no Google" },
    { value: reviewCount, label: "Avaliações" },
    { value: team.length, label: "Barbeiros" },
    { value: business.since, label: "Aberta em" },
  ];

  return (
    <section className={styles.strip} aria-label="A barbearia em números">
      <dl className={`container ${styles.grid}`}>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.item} data-reveal>
            <dt>{stat.label}</dt>
            <dd>{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
