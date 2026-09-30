import { business } from "@/content/business";
import { ActionLink } from "./ActionLink";
import { ArrowUpRight, WhatsApp } from "./icons";
import styles from "./ClosingCta.module.css";

const marquee = ["Corte", "Barba", "Navalha", "Degradê", `Desde ${business.since}`, "Vila Aurora"];

export function ClosingCta() {
  return (
    <section className={styles.section} aria-labelledby="agendar-title">
      {/* Faixa decorativa em movimento; some com "reduzir movimento". */}
      <div className={styles.marquee} aria-hidden="true">
        <div className={styles.track}>
          {[0, 1].map((copy) => (
            <span key={copy} className={styles.group}>
              {marquee.map((word) => (
                <span key={word} className={styles.word}>
                  {word}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className={`container ${styles.inner}`}>
        <h2 id="agendar-title" className={`display ${styles.title}`} data-reveal>
          Sua vez
          <span> na cadeira.</span>
        </h2>
        <div className={styles.side} data-reveal>
          <p className={styles.note}>
            Escolha o barbeiro e o horário na agenda online da {business.booking.provider}. Ficou com
            dúvida? Chame no WhatsApp.
          </p>
          <div className={styles.actions} data-closing-actions>
            <ActionLink href={business.booking.url} external icon={<ArrowUpRight />}>
              Agendar horário
            </ActionLink>
            <ActionLink href={business.whatsapp.href} external variant="secondary" icon={<WhatsApp />}>
              WhatsApp
            </ActionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
