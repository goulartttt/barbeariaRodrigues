import { business, services } from "@/content/business";
import { ArrowUpRight } from "./icons";
import { ExternalLink } from "./ExternalLink";
import styles from "./Services.module.css";

export function Services() {
  return (
    <section id="servicos" className={`on-ink ${styles.section}`} aria-labelledby="servicos-title">
      <div className="container">
        <div className={styles.header}>
          <h2 id="servicos-title" className={styles.title}>
            Serviços
          </h2>
          <div className={styles.aside}>
            <p className={styles.note}>
              Valores e horários disponíveis ficam na agenda online, onde você escolhe o serviço e
              reserva.
            </p>
            <ExternalLink href={business.booking.url} className={styles.link}>
              Ver na agenda online
              <ArrowUpRight size={16} />
            </ExternalLink>
          </div>
        </div>

        <ul className={styles.list}>
          {services.map((service) => (
            <li key={service}>{service}</li>
          ))}
        </ul>
        <p className={styles.more}>E outros serviços para o cabelo.</p>
      </div>
    </section>
  );
}
