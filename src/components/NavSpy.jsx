"use client";

import { useEffect } from "react";

/**
 * Marca no menu principal a seção que está no meio da tela
 * (aria-current), para o sublinhado bronze acompanhar a rolagem.
 */
export function NavSpy() {
  useEffect(() => {
    const links = [...document.querySelectorAll('nav[aria-label="Principal"] a[href^="#"]')];
    // Observa todas as seções: nas que não estão no menu (topo, chamada final) nada fica marcado.
    const sections = document.querySelectorAll("main section");
    if (links.length === 0 || sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          links.forEach((link) => {
            if (entry.target.id && link.getAttribute("href") === `#${entry.target.id}`) link.setAttribute("aria-current", "true");
            else link.removeAttribute("aria-current");
          });
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return null;
}
