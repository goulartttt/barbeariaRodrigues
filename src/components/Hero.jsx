import { business } from "@/content/business";
import { ActionLink } from "./ActionLink";
import { ArrowUpRight } from "./icons";
import { Rating } from "./Rating";
import { StreetSign } from "./StreetSign";
import styles from "./Hero.module.css";

export function Hero() {
  const { address } = business;

  return (
    <section id="topo" className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.grid}`}>
        <p className={`eyebrow ${styles.eyebrow}`}>
          <span>{address.neighborhood}</span> <span aria-hidden="true">·</span>{" "}
          <span>{address.region}</span>
        </p>

        <h1 id="hero-title" className={styles.title}>
          <span className={styles.titleName}>Rodrigues</span>{" "}
          <span className={styles.titleKind}>Barbearia</span>
        </h1>

        <div className={styles.intro}>
          <p className={styles.lead}>
            Corte de cabelo, barba e tratamentos capilares na {address.neighborhood},{" "}
            {address.region} de {address.city}. Agende online ou ligue.
          </p>

          <div className={styles.actions} data-hero-actions>
            <ActionLink href={business.booking.url} external icon={<ArrowUpRight />}>
              Agendar horário
            </ActionLink>
            <ActionLink href={business.phone.href} variant="secondary">
              {business.phone.display}
            </ActionLink>
          </div>

          <Rating />
        </div>

        <div className={styles.aside}>
          <StreetSign />
        </div>
      </div>
    </section>
  );
}
