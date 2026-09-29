import { business, reviewThemes } from "@/content/business";
import { ArrowUpRight, Star } from "./icons";
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
          <span className={styles.stars} aria-hidden="true">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} size={22} />
            ))}
          </span>
          <p className={styles.count}>
            {reviewCount} avaliações no Google
            <span className={styles.checked}>Consultado em {checkedAt}.</span>
          </p>
          <p className={styles.welcome}>Empresa que acolhe a comunidade LGBTQ+.</p>
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

          <a
            href={business.maps.profile}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Ler as avaliações no Google
            <ArrowUpRight size={16} />
            <span className="visually-hidden"> (abre em nova aba)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
