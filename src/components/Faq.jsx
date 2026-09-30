import { business } from "@/content/business";
import { faq } from "@/content/faq";
import { ActionLink } from "./ActionLink";
import { ExternalLink } from "./ExternalLink";
import { ArrowUpRight, WhatsApp } from "./icons";
import styles from "./Faq.module.css";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export function Faq() {
  return (
    <section id="duvidas" className={styles.section} aria-labelledby="duvidas-title">
      <div className={`container ${styles.grid}`}>
        <header className={styles.intro}>
          <p className="eyebrow" data-reveal>
            Dúvidas
          </p>
          <h2 id="duvidas-title" className={`display ${styles.title}`} data-reveal>
            Perguntas
            <span> frequentes.</span>
          </h2>
          <p className={styles.lead} data-reveal>
            Não achou o que queria saber? Chame a barbearia no WhatsApp.
          </p>
          <div data-reveal>
            <ActionLink href={business.whatsapp.href} external variant="secondary" icon={<WhatsApp />}>
              {business.whatsapp.display}
            </ActionLink>
          </div>
        </header>

        <div className={styles.list}>
          {faq.map((item, i) => (
            <details key={item.question} className={styles.item} name="faq" open={i === 0} data-reveal>
              <summary>
                <span className={styles.question}>{item.question}</span>
                <span className={styles.toggle} aria-hidden="true" />
              </summary>
              <div className={styles.answer}>
                <p>{item.answer}</p>
                {item.link &&
                  (item.link.internal ? (
                    <a href={item.link.href} className={styles.link}>
                      {item.link.label}
                    </a>
                  ) : (
                    <ExternalLink href={item.link.href} className={styles.link}>
                      {item.link.label}
                      <ArrowUpRight size={14} />
                    </ExternalLink>
                  ))}
              </div>
            </details>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </section>
  );
}
