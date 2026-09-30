import Image from "next/image";
import { business, gallery } from "@/content/business";
import { ExternalLink } from "./ExternalLink";
import { ArrowUpRight } from "./icons";
import styles from "./Gallery.module.css";

export function Gallery() {
  const { instagram } = business;

  return (
    <section id="galeria" className={styles.section} aria-labelledby="galeria-title">
      <div className="container">
        <header className={styles.header}>
          <p className="eyebrow" data-reveal>
            Galeria
          </p>
          <h2 id="galeria-title" className={`display ${styles.title}`} data-reveal>
            Feito na <span>cadeira da Rodrigues.</span>
          </h2>
        </header>

        <ul className={styles.grid}>
          {gallery.map((photo, index) => (
            <li key={photo.src} className={styles.item} data-reveal data-index={index}>
              <figure>
                <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 64rem) 30vw, (min-width: 40rem) 45vw, 90vw" />
                <figcaption>{photo.caption}</figcaption>
              </figure>
            </li>
          ))}
          <li className={`${styles.item} ${styles.more}`} data-reveal>
            <ExternalLink href={instagram.url} className={styles.moreLink} hint="abre o Instagram em nova aba">
              <span className={styles.moreLabel}>Mais trabalhos no Instagram</span>
              <span className={styles.handle}>{instagram.handle}</span>
              <ArrowUpRight size={28} className={styles.moreIcon} />
            </ExternalLink>
          </li>
        </ul>
      </div>
    </section>
  );
}
