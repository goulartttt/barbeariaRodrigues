import { business } from "@/content/business";
import { ActionLink } from "./ActionLink";
import { ArrowUpRight, Phone } from "./icons";
import styles from "./Visit.module.css";

export function Visit() {
  const { address, phone, booking } = business;

  return (
    <section id="local" className={styles.section} aria-labelledby="local-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.header}>
          <p className={`eyebrow ${styles.eyebrow}`}>Como chegar</p>
          <h2 id="local-title" className={styles.title}>
            Na {address.neighborhood}, {address.region} de São Paulo.
          </h2>
        </div>

        <div className={styles.body}>
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
            <div>
              <dt>Acolhimento</dt>
              <dd>Empresa que acolhe a comunidade LGBTQ+.</dd>
            </div>
          </dl>

          <div className={styles.actions}>
            <ActionLink href={business.maps.directions} external icon={<ArrowUpRight />}>
              Abrir rota no mapa
            </ActionLink>
            <ActionLink href={phone.href} variant="secondary" icon={<Phone />}>
              Ligar
            </ActionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
