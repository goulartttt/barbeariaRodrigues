"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Entrada do hero e parallax leve ao rolar. O título nunca começa invisível
 * (é o maior elemento da tela); o resto aparece em sequência.
 */
export function HeroMotion() {
  useGSAP(() => {
    const hero = document.querySelector("[data-hero]");
    if (!hero) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(hero);
      gsap
        .timeline({ defaults: { ease: "expo.out", duration: 1.2 } })
        .from(q("[data-hero-line]"), { yPercent: 35, stagger: 0.12 })
        .from(q("[data-hero-reveal]"), { y: 18, autoAlpha: 0, stagger: 0.08, duration: 1 }, 0.15)
        .from(q("[data-scene]"), { scale: 0.94, duration: 1.8 }, 0);

      gsap.to(q("[data-scene]"), {
        yPercent: 18,
        ease: "none",
        scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(q("[data-hero-copy]"), {
        yPercent: -8,
        ease: "none",
        scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
      });
    });
  });

  return null;
}
