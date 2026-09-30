import { business } from "@/content/business";
import { navItems } from "@/content/navigation";
import { ActionLink } from "./ActionLink";
import { ArrowUpRight } from "./icons";
import { NavSpy } from "./NavSpy";
import { Wordmark } from "./Wordmark";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href="#topo" className={styles.brand} aria-label={`${business.name}, início`}>
          <Wordmark />
        </a>

        <nav aria-label="Principal" className={styles.nav}>
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <NavSpy />

        <ActionLink
          href={business.booking.url}
          external
          icon={<ArrowUpRight size={16} />}
          className={styles.cta}
        >
          Agendar
        </ActionLink>
      </div>
    </header>
  );
}
