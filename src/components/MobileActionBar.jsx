"use client";

import { useEffect, useState } from "react";
import { business } from "@/content/business";
import { ArrowUpRight, WhatsApp } from "./icons";
import { ExternalLink } from "./ExternalLink";
import styles from "./MobileActionBar.module.css";

/**
 * Ações fixas: no celular, uma barra com "Agendar" e WhatsApp; no computador,
 * um botão redondo de WhatsApp no canto. Aparecem só quando os botões do topo
 * e da chamada final estão fora da tela, para não duplicá-los.
 */
export function MobileActionBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Marcadores definidos em Hero e ClosingCta.
    const targets = document.querySelectorAll("[data-hero-actions], [data-closing-actions]");
    if (targets.length === 0) return;

    const onScreen = new Set();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) onScreen.add(entry.target);
        else onScreen.delete(entry.target);
      }
      const pastHero = window.scrollY > 0;
      setVisible(pastHero && onScreen.size === 0);
    });

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className={styles.bar} data-visible={visible} aria-hidden={!visible} inert={!visible}>
        <ExternalLink href={business.booking.url} className={styles.primary}>
          Agendar
          <ArrowUpRight size={16} />
        </ExternalLink>
        <ExternalLink href={business.whatsapp.href} className={styles.secondary}>
          <WhatsApp size={18} />
          <span>WhatsApp</span>
        </ExternalLink>
      </div>

      <ExternalLink
        href={business.whatsapp.href}
        className={styles.float}
        data-visible={visible}
        aria-hidden={!visible}
        inert={!visible}
      >
        <WhatsApp size={26} />
        <span className={styles.floatLabel}>Fale no WhatsApp</span>
      </ExternalLink>
    </>
  );
}
