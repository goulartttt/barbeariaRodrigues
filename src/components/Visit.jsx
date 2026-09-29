import { business } from "@/content/business";
import { ActionLink } from "./ActionLink";
import { ArrowUpRight } from "./icons";
import styles from "./Visit.module.css";

export function Visit() {
  const { address, phone, booking } = business;

  return (
    <section id="local" className={styles.section} aria-labelledby="local-title">
      <div className={`container ${styles.grid}`}>
        <h2 id="local-title" className={styles.title}>
          Na {address.neighborhood}, {address.region} de São Paulo.
        </h2>

        <dl className={styles.facts}>
          <div>
            <dt>Endereço</dt>
            <dd>
              <address>
                {address.street}, {address.number}
                <br />
                {address.neighborhood}, {address.city} - {address.state}
                <br />
                CEP {address.postalCode}
              </address>
            </dd>
          </div>
          <div>
            <dt>Telefone</dt>
            <dd>
              <a href={phone.href}>{phone.display}</a>
            </dd>
          </div>
          <div>
            <dt>Horários</dt>
            <dd>
              Consulte os horários disponíveis na{" "}
              <a href={booking.url} target="_blank" rel="noopener noreferrer">
                agenda online
                <span className="visually-hidden"> (abre em nova aba)</span>
              </a>
              .
            </dd>
          </div>
        </dl>

        <div className={styles.actions}>
          <ActionLink href={business.maps.directions} external icon={<ArrowUpRight />}>
            Abrir rota no mapa
          </ActionLink>
          <ActionLink href={phone.href} variant="secondary">
            Ligar
          </ActionLink>
        </div>
      </div>
    </section>
  );
}
