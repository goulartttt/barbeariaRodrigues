import Image from "next/image";
import { business, reviewThemes, team } from "@/content/business";
import { ActionLink } from "./ActionLink";
import { ArrowUpRight } from "./icons";
import styles from "./About.module.css";

const listFormat = new Intl.ListFormat("pt-BR", { style: "long", type: "conjunction" });

export function About() {
  const { address } = business;
  const themes = listFormat.format(reviewThemes.slice(0, 4).map((theme) => theme.toLowerCase()));

  return (
    <section id="sobre" className={styles.section} aria-labelledby="sobre-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.photos}>
          <figure className={styles.main} data-parallax="-6">
            <Image
              src="/images/fotos/fachada-toldo.jpg"
              alt="Fachada da Rodrigues Barbearia: toldo preto, poste de barbeiro e o logo na porta de vidro"
              fill
              sizes="(min-width: 64rem) 28vw, 70vw"
            />
          </figure>
          <figure className={styles.second} data-parallax="8">
            <Image
              src="/images/fotos/farlen-barba.jpg"
              alt="Farlen fazendo a barba de um cliente"
              fill
              sizes="(min-width: 64rem) 18vw, 45vw"
            />
          </figure>
        </div>

        <div className={styles.text}>
          <p className="eyebrow" data-reveal>
            A barbearia
          </p>
          <h2 id="sobre-title" className={`display ${styles.title}`} data-reveal>
            Desde {business.since} <span>na {address.neighborhood}.</span>
          </h2>
          <p className={styles.lead} data-reveal>
            A Rodrigues fica na {address.street}, {address.number}, na {address.region} de{" "}
            {address.city}. Nas avaliações do Google, os clientes destacam {themes}.
          </p>
        </div>

        <div className={styles.team}>
          <h3 className={styles.teamTitle} data-reveal>
            Quem atende
          </h3>
          <ul className={styles.cards}>
            {team.map((person) => (
              <li key={person.name} className={styles.card} data-reveal>
                <div className={styles.portrait}>
                  {person.photo ? (
                    <Image src={person.photo} alt={person.photoAlt} fill sizes="(min-width: 48rem) 22vw, 90vw" />
                  ) : (
                    <span className={styles.monogram} aria-hidden="true">
                      {person.name[0]}
                    </span>
                  )}
                </div>
                <div className={styles.cardBody}>
                  <p className={styles.name}>{person.name}</p>
                  <p className={styles.role}>{person.role}</p>
                  {person.note && <p className={styles.note}>{person.note}</p>}
                </div>
              </li>
            ))}
          </ul>
          <div data-reveal>
            <ActionLink href={business.booking.url} external icon={<ArrowUpRight />} variant="secondary">
              Escolher barbeiro na agenda
            </ActionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
