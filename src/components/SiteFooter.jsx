import { business } from "@/content/business";
import { navItems } from "@/content/navigation";
import { Wordmark } from "./Wordmark";
import { ExternalLink } from "./ExternalLink";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  const { address, phone, booking } = business;

  return (
    <footer className={`on-ink ${styles.footer}`}>
      <div className={`container ${styles.inner}`}>
        <Wordmark />

        <p className={styles.info}>
          {address.full}
          <br />
          <a href={phone.href}>{phone.display}</a>
        </p>

        <nav aria-label="Rodapé" className={styles.nav}>
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
            <li>
              <ExternalLink href={booking.url}>Agendar pela {booking.provider}</ExternalLink>
            </li>
          </ul>
        </nav>

        <p className={styles.legal}>
          © {new Date().getFullYear()} {business.name}
        </p>
      </div>
    </footer>
  );
}
