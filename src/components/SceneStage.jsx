"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./SceneStage.module.css";

/** O 3D só roda com movimento liberado, WebGL e um aparelho com fôlego. */
function canRender3D() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (navigator.connection?.saveData) return false;
  if ((navigator.hardwareConcurrency ?? 8) < 4) return false;
  if (navigator.deviceMemory && navigator.deviceMemory < 4) return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

const interactionEvents = ["pointermove", "pointerdown", "touchstart", "wheel", "scroll", "keydown"];
let interaction;

/**
 * Resolve depois do `load` e do primeiro sinal de uso (mexer o mouse, tocar,
 * rolar ou teclar). Assim o 3D, que é pesado, não disputa o carregamento
 * inicial; a imagem estática é igual à cena, então a troca não aparece.
 */
function afterFirstInteraction() {
  interaction ??= new Promise((resolve) => {
    const loaded = new Promise((done) => {
      if (document.readyState === "complete") done();
      else window.addEventListener("load", done, { once: true });
    });
    const used = new Promise((done) => {
      const handler = () => {
        interactionEvents.forEach((type) => window.removeEventListener(type, handler));
        done();
      };
      interactionEvents.forEach((type) => window.addEventListener(type, handler, { passive: true }));
    });
    Promise.all([loaded, used]).then(resolve);
  });
  return interaction;
}

/**
 * Palco de uma cena 3D: mostra a imagem estática na hora e só carrega o 3D
 * depois que a página carregou, a pessoa começou a usar a página e a cena
 * chegou perto da tela. Em aparelhos fracos ou com
 * "reduzir movimento", a imagem estática fica. Fora da tela, a cena pausa.
 */
export function SceneStage({ Scene, poster, className, priority = false, sizes = "100vw" }) {
  const stage = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [active, setActive] = useState(false);
  const [seen, setSeen] = useState(false);
  const [ready, setReady] = useState(false);
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    if (!canRender3D()) return;
    let cancelled = false;
    afterFirstInteraction().then(() => {
      const idle = window.requestIdleCallback ?? ((callback) => setTimeout(callback, 300));
      idle(() => !cancelled && setLoaded(true), { timeout: 3000 });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting);
        if (entry.isIntersecting) setSeen(true);
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(stage.current);
    return () => observer.disconnect();
  }, []);

  // Só baixa o 3D quando a cena chega perto da tela.
  const enabled = loaded && seen;

  return (
    <div ref={stage} className={[styles.stage, className].filter(Boolean).join(" ")} data-ready={ready}>
      <Image
        className={styles.poster}
        src={poster}
        alt=""
        fill
        sizes={sizes}
        priority={priority}
      />
      {enabled && !slow && (
        <div className={styles.canvas}>
          <Scene
            active={active}
            onReady={() => setReady(true)}
            onSlow={() => {
              setReady(false);
              setSlow(true);
            }}
          />
        </div>
      )}
    </div>
  );
}
