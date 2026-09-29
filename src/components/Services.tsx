import { business, services } from "@/content/business";
import { ArrowUpRight } from "./icons";
import styles from "./Services.module.css";

export function Services() {
  return (
    <section id="servicos" className={`on-ink ${styles.section}`} aria-labelledby="servicos-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.header}>
          <p className={`eyebrow ${styles.eyebrow}`}>Serviços</p>
          <h2 id="servicos-title" className={styles.title}>
            Do corte à prótese capilar.
          </h2>
          <p className={styles.note}>
            Valores e horários disponíveis ficam na agenda online, onde você escolhe o serviço e
            reserva.
          </p>
          <a
            href={business.booking.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Ver na agenda online
            <ArrowUpRight size={16} />
            <span className="visually-hidden"> (abre em nova aba)</span>
          </a>
        </div>

        <div className={styles.listWrap}>
          <ol className={styles.list}>
            {services.map((service, index) => (
              <li key={service} className={styles.item}>
                <span className={styles.index} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={styles.name}>{service}</span>
              </li>
            ))}
          </ol>
          <p className={styles.more}>E outros serviços para o cabelo.</p>
        </div>
      </div>
    </section>
  );
}
