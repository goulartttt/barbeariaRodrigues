import { business, reviewThemes } from "@/content/business";
import { ArrowUpRight, Stars } from "./icons";
import { ExternalLink } from "./ExternalLink";
import styles from "./Reviews.module.css";

export function Reviews() {
  const { rating, reviewCount, checkedAt } = business.google;

  return (
    <section id="avaliacoes" className={styles.section} aria-labelledby="avaliacoes-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.score}>
          <p className={styles.rating}>
            <span className={styles.number}>{rating}</span>
            <span className="visually-hidden"> de 5 estrelas</span>
          </p>
          <Stars size={22} className={styles.stars} />
          <p className={styles.count}>
            {reviewCount} avaliações no Google
            <span className={styles.checked}>Consultado em {checkedAt}.</span>
          </p>
        </div>

        <div className={styles.body}>
          <h2 id="avaliacoes-title" className={styles.title}>
            O que os clientes mais destacam
          </h2>

          <ul className={styles.themes}>
            {reviewThemes.map((theme) => (
              <li key={theme}>{theme}</li>
            ))}
          </ul>

          <p className={styles.mention}>
            Em uma das avaliações, o <strong>Farlen</strong> é elogiado por ser cuidadoso,
            profissional e atencioso.
          </p>

          <ExternalLink href={business.maps.profile} className={styles.link}>
            Ler as avaliações no Google
            <ArrowUpRight size={16} />
          </ExternalLink>
        </div>
      </div>
    </section>
  );
}
