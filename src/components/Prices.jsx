import { business, otherServices, prices, pricesCheckedAt } from "@/content/business";
import { ActionLink } from "./ActionLink";
import { ArrowUpRight } from "./icons";
import { PoleScene } from "./PoleScene";
import styles from "./Prices.module.css";

const formatPrice = (value) => `R$ ${value}`;

export function Prices() {
  const regular = prices.filter((item) => !item.plan);
  const plans = prices.filter((item) => item.plan);

  return (
    <section id="precos" className={styles.section} aria-labelledby="precos-title">
      <div className={`container ${styles.grid}`}>
        <header className={styles.intro}>
          <p className="eyebrow" data-reveal>
            Serviços e preços
          </p>
          <h2 id="precos-title" className={`display ${styles.title}`} data-reveal>
            Corte na régua. <span>Barba no capricho.</span>
          </h2>
          <PoleScene className={styles.pole} />
        </header>

        <div className={styles.body}>
          <ul className={styles.menu}>
            {regular.map((item) => (
              <li key={item.name} className={styles.row} data-reveal>
                <span className={styles.name}>{item.name}</span>
                <span className={styles.leader} aria-hidden="true" />
                <span className={styles.price}>{formatPrice(item.price)}</span>
              </li>
            ))}
          </ul>

          {plans.map((item) => (
            <div key={item.name} className={styles.plan} data-reveal>
              <div>
                <p className={styles.planLabel}>Plano mensal</p>
                <p className={styles.planName}>{item.name}</p>
              </div>
              <p className={styles.planPrice}>
                <small>R$</small>
                {item.price}
              </p>
            </div>
          ))}

          <div className={styles.more} data-reveal>
            <p className={styles.moreTitle}>Também fazemos</p>
            <ul className={styles.chips}>
              {otherServices.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
            <p className={styles.note}>
              Valores desses serviços e horários livres na agenda online. Preços de{" "}
              {pricesCheckedAt}.
            </p>
          </div>

          <div data-reveal>
            <ActionLink href={business.booking.url} external icon={<ArrowUpRight />}>
              Agendar horário
            </ActionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
