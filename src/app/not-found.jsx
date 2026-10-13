import { business } from "@/content/business";
import { ActionLink } from "@/components/ActionLink";
import { ArrowUpRight } from "@/components/icons";
import { Wordmark } from "@/components/Wordmark";
import styles from "./not-found.module.css";

export const metadata = {
  title: `Página não encontrada · ${business.name}`,
};

export default function NotFound() {
  return (
    <main id="conteudo" className={`container ${styles.page}`}>
      <a href="/" aria-label={`${business.name}: voltar ao início`}>
        <Wordmark />
      </a>
      <div className={styles.body}>
        <p className="eyebrow">Erro 404</p>
        <h1 className={`display ${styles.title}`}>
          Página não
          <span> encontrada.</span>
        </h1>
        <p className={styles.note}>
          O endereço pode ter mudado ou foi digitado errado. Volte ao início ou, se veio para marcar
          um horário, agende direto.
        </p>
        <div className={styles.actions}>
          <ActionLink href="/">Voltar ao início</ActionLink>
          <ActionLink href={business.booking.url} external variant="secondary" icon={<ArrowUpRight />}>
            Agendar horário
          </ActionLink>
        </div>
      </div>
    </main>
  );
}
