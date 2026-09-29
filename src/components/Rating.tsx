import { business } from "@/content/business";
import { Star } from "./icons";
import styles from "./Rating.module.css";

/** Nota do Google em formato compacto. */
export function Rating() {
  const { rating, reviewCount } = business.google;

  return (
    <a
      href={business.maps.profile}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.rating}
    >
      <span className={styles.stars} aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} size={15} />
        ))}
      </span>
      <span className={styles.text}>
        <strong>{rating}</strong> no Google{" "}
        <span className={styles.count}>{reviewCount} avaliações</span>
      </span>
      <span className="visually-hidden"> (abre o perfil no Google Maps em nova aba)</span>
    </a>
  );
}
