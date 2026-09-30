import { business, testimonials } from "@/content/business";
import { ArrowUpRight, Stars } from "./icons";
import { ExternalLink } from "./ExternalLink";
import { ReviewsCarousel } from "./ReviewsCarousel";
import styles from "./Reviews.module.css";

export function Reviews() {
  const { rating, reviewCount, checkedAt } = business.google;

  return (
    <section id="avaliacoes" className={styles.section} aria-labelledby="avaliacoes-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.score}>
          <p className="eyebrow" data-reveal>
            Avaliações
          </p>
          <h2 id="avaliacoes-title" className="visually-hidden">
            O que dizem os clientes
          </h2>
          <p className={styles.rating} data-reveal>
            <span className={styles.number}>{rating}</span>
            <span className="visually-hidden"> de 5 estrelas</span>
          </p>
          <Stars size={22} className={styles.stars} />
          <p className={styles.count} data-reveal>
            {reviewCount} avaliações no Google
            <span className={styles.checked}>Consultado em {checkedAt}.</span>
          </p>
          <ExternalLink href={business.maps.profile} className={styles.link}>
            Ler todas no Google
            <ArrowUpRight size={16} />
          </ExternalLink>
        </div>

        <ReviewsCarousel items={testimonials} />
      </div>
    </section>
  );
}
