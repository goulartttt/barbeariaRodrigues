import { business, prices } from "@/content/business";
import { ActionLink } from "./ActionLink";
import { HeroMotion } from "./HeroMotion";
import { HeroScene } from "./HeroScene";
import { ArrowUpRight, WhatsApp } from "./icons";
import { Rating } from "./Rating";
import styles from "./Hero.module.css";

const plan = prices.find((item) => item.name === "2 cortes no mês");

export function Hero() {
  const { address } = business;

  return (
    <section id="topo" className={styles.hero} aria-labelledby="hero-title" data-hero>
      <div className={styles.scene} data-scene>
        <HeroScene className={styles.stage} />
      </div>

      <div className={`container ${styles.grid}`}>
        <div className={styles.copy} data-hero-copy>
          <p className="eyebrow" data-hero-reveal>
            {address.neighborhood} · {address.region}
          </p>

          <h1 id="hero-title" className={`display ${styles.title}`}>
            <span className={styles.line} data-hero-line>
              Precisão
            </span>{" "}
            <span className={`${styles.line} ${styles.strong}`} data-hero-line>
              de navalha.
            </span>
          </h1>

          <p className={styles.lead} data-hero-reveal>
            Corte, barba e acabamento na navalha com o Farlen e o Raphael, na{" "}
            {address.street}, {address.number}.
          </p>

          <div className={styles.actions} data-hero-actions data-hero-reveal>
            <ActionLink href={business.booking.url} external icon={<ArrowUpRight />}>
              Agendar horário
            </ActionLink>
            <ActionLink href={business.whatsapp.href} external variant="secondary" icon={<WhatsApp />}>
              WhatsApp
            </ActionLink>
          </div>

          <div className={styles.proof} data-hero-reveal>
            <Rating />
            {plan && (
              <a href="#servicos" className={styles.plan}>
                Plano mensal: 2 cortes por <strong>R$ {plan.price}</strong>
              </a>
            )}
          </div>
        </div>

        <p className={styles.since} data-hero-reveal>
          <span>Desde</span>
          <strong>{business.since}</strong>
        </p>
      </div>

      <HeroMotion />
    </section>
  );
}
