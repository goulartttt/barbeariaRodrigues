import { business } from "@/content/business";
import { ActionLink } from "./ActionLink";
import { ArrowUpRight, Phone } from "./icons";
import styles from "./ClosingCta.module.css";

export function ClosingCta() {
  return (
    <section className={`on-ink ${styles.section}`} aria-labelledby="agendar-title">
      <div className={`container ${styles.inner}`}>
        <h2 id="agendar-title" className={styles.title}>
          Reserve seu horário.
        </h2>
        <div className={styles.side}>
          <p className={styles.note}>
            O agendamento é feito pela {business.booking.provider}, plataforma externa de agenda.
            Se preferir, é só ligar.
          </p>
          <div className={styles.actions} data-closing-actions>
            <ActionLink href={business.booking.url} external icon={<ArrowUpRight />}>
              Agendar horário
            </ActionLink>
            <ActionLink href={business.phone.href} variant="secondary" icon={<Phone />}>
              {business.phone.display}
            </ActionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
