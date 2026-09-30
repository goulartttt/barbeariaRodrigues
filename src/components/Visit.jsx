import { business } from "@/content/business";
import { ActionLink } from "./ActionLink";
import { ArrowUpRight, WhatsApp } from "./icons";
import { ExternalLink } from "./ExternalLink";
import { OpeningHours } from "./OpeningHours";
import { StreetSign } from "./StreetSign";
import styles from "./Visit.module.css";

export function Visit() {
  const { address, booking, whatsapp, maps } = business;

  const steps = [
    {
      title: "Abra a agenda online",
      text: `A agenda fica na ${booking.provider} e funciona pelo celular.`,
    },
    {
      title: "Escolha serviço e barbeiro",
      text: "Corte, barba ou os dois, com o Farlen ou o Raphael.",
    },
    {
      title: "Marque o horário livre",
      text: `É só chegar na ${address.streetDisplay}, ${address.number}.`,
    },
  ];

  return (
    <section id="local" className={styles.section} aria-labelledby="local-title">
      <div className="container">
        <header className={styles.head}>
          <p className="eyebrow" data-reveal>
            Como agendar
          </p>
          <h2 id="local-title" className={`display ${styles.title}`} data-reveal>
            Três passos
            <span> até a cadeira.</span>
          </h2>
        </header>

        <ol className={styles.steps}>
          {steps.map((step, i) => (
            <li key={step.title} className={styles.step} data-reveal>
              <span className={styles.stepNumber} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>

        <div className={styles.actions} data-reveal>
          <ActionLink href={booking.url} external icon={<ArrowUpRight />}>
            Agendar horário
          </ActionLink>
          <ActionLink href={whatsapp.href} external variant="secondary" icon={<WhatsApp />}>
            Dúvidas no WhatsApp
          </ActionLink>
        </div>

        <div className={styles.visit}>
          <div className={styles.info} data-reveal>
            <h3 className={styles.infoTitle}>Onde fica</h3>
            <StreetSign />
            <p className={styles.region}>
              {address.neighborhood}, {address.region} de {address.city}
            </p>
            <ExternalLink href={maps.directions} className={styles.link}>
              Traçar rota no Google Maps
              <ArrowUpRight size={16} />
            </ExternalLink>

            <h3 className={styles.infoTitle}>Horários</h3>
            <OpeningHours />
          </div>

          <div className={styles.map} data-reveal>
            <iframe
              src={maps.embed}
              title={`Mapa: ${business.name}, ${address.full}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
