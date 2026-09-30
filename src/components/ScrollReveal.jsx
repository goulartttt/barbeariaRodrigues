"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Entrada suave por scroll para tudo que tem `data-reveal`. Sem JavaScript
 * ou com "reduzir movimento", o conteúdo simplesmente aparece.
 */
export function ScrollReveal() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const items = gsap.utils
        .toArray("[data-reveal]")
        .filter((el) => el.getBoundingClientRect().top > window.innerHeight);
      gsap.set(items, { autoAlpha: 0, y: 28 });
      ScrollTrigger.batch(items, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.9, ease: "expo.out", stagger: 0.07 }),
      });

      // Parallax sutil: `data-parallax` é o deslocamento em % enquanto o elemento cruza a tela.
      gsap.utils.toArray("[data-parallax]").forEach((el) => {
        const amount = Number(el.dataset.parallax) || 0;
        gsap.fromTo(
          el,
          { yPercent: -amount },
          {
            yPercent: amount,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    });
  });

  return null;
}
