import { business } from "@/content/business";
import { Stars } from "./icons";
import { ExternalLink } from "./ExternalLink";
import styles from "./Rating.module.css";

/** Nota do Google em formato compacto. */
export function Rating() {
  const { rating, reviewCount } = business.google;

  return (
    <ExternalLink
      href={business.maps.profile}
      className={styles.rating}
      hint="abre o perfil no Google Maps em nova aba"
    >
      <Stars size={15} className={styles.stars} />
      <span className={styles.text}>
        <strong>{rating}</strong>
        <span className="visually-hidden"> de 5 estrelas</span> no Google{" "}
        <span aria-hidden="true">·</span>{" "}
        <span className={styles.count}>{reviewCount} avaliações</span>
      </span>
    </ExternalLink>
  );
}
