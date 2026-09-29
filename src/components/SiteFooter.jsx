import { business } from "@/content/business";
import { navItems } from "@/content/navigation";
import { Wordmark } from "./Wordmark";
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
              <a href={booking.url} target="_blank" rel="noopener noreferrer">
                Agendar pela {booking.provider}
                <span className="visually-hidden"> (abre em nova aba)</span>
              </a>
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
