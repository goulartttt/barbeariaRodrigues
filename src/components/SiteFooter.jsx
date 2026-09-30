import { business, openingHours } from "@/content/business";
import { navItems } from "@/content/navigation";
import { ExternalLink } from "./ExternalLink";
import { Instagram, Phone, WhatsApp } from "./icons";
import { Wordmark } from "./Wordmark";
import styles from "./SiteFooter.module.css";

/** Agrupa dias seguidos com o mesmo horário: "Ter a sex", "Sáb". */
function hoursSummary() {
  const groups = [];
  for (const day of openingHours.filter((d) => !d.closed)) {
    const last = groups.at(-1);
    if (last && last.opens === day.opens && last.closes === day.closes) last.to = day.day;
    else groups.push({ from: day.day, to: null, opens: day.opens, closes: day.closes });
  }
  return groups.map((g) => ({
    days: g.to ? `${g.from.slice(0, 3)} a ${g.to.slice(0, 3).toLowerCase()}` : g.from.slice(0, 3),
    hours: `${g.opens.replace(":00", "h")} às ${g.closes.replace(":00", "h")}`,
  }));
}

/** Dias fechados, de domingo em diante: "Dom e seg". */
function closedDays() {
  const order = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const names = openingHours
    .filter((d) => d.closed)
    .sort((a, b) => order.indexOf(a.dayCode) - order.indexOf(b.dayCode))
    .map((d) => d.day.slice(0, 3).toLowerCase());
  const text = names.join(" e ");
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function SiteFooter() {
  const { address, phone, whatsapp, instagram, booking, maps } = business;

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <Wordmark />
          <p className={styles.tagline}>
            Barbearia na {address.neighborhood}, {address.region} de {address.city}, desde{" "}
            {business.since}.
          </p>
          <ExternalLink href={instagram.url} className={styles.social}>
            <Instagram size={20} />
            {instagram.handle}
          </ExternalLink>
        </div>

        <div className={styles.col}>
          <h2 className={styles.heading}>Contato</h2>
          <ul>
            <li>
              <ExternalLink href={whatsapp.href} className={styles.iconLink}>
                <WhatsApp size={16} />
                WhatsApp {whatsapp.display}
              </ExternalLink>
            </li>
            <li>
              <a href={phone.href} className={styles.iconLink}>
                <Phone size={16} />
                Ligar {phone.display}
              </a>
            </li>
            <li>
              <ExternalLink href={booking.url}>Agenda na {booking.provider}</ExternalLink>
            </li>
          </ul>
        </div>

        <div className={styles.col}>
          <h2 className={styles.heading}>Endereço</h2>
          <address>
            {address.streetDisplay}, {address.number}
            <br />
            {address.neighborhood}, {address.city} - {address.state}
            <br />
            CEP {address.postalCode}
          </address>
          <ExternalLink href={maps.directions}>Como chegar</ExternalLink>
        </div>

        <div className={styles.col}>
          <h2 className={styles.heading}>Horários</h2>
          <dl className={styles.hours}>
            {hoursSummary().map((row) => (
              <div key={row.days}>
                <dt>{row.days}</dt>
                <dd>{row.hours}</dd>
              </div>
            ))}
            <div>
              <dt>{closedDays()}</dt>
              <dd>Fechado</dd>
            </div>
          </dl>
        </div>

        <nav aria-label="Rodapé" className={styles.nav}>
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <p className={styles.legal}>
          © {new Date().getFullYear()} {business.name}
        </p>
      </div>
    </footer>
  );
}
