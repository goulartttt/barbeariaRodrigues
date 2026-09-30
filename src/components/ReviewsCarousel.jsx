"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Stars } from "./icons";
import styles from "./Reviews.module.css";

/**
 * Carrossel de depoimentos: rolagem nativa com "snap" (toque, trackpad e
 * teclado funcionam sem JavaScript), setas, contador e arraste com o mouse.
 */
export function ReviewsCarousel({ items }) {
  const trackRef = useRef(null);
  const [state, setState] = useState({ index: 0, atStart: true, atEnd: false });

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = [...track.children];
    const left = track.scrollLeft;
    let index = 0;
    cards.forEach((card, i) => {
      if (Math.abs(card.offsetLeft - track.offsetLeft - left) < Math.abs(cards[index].offsetLeft - track.offsetLeft - left)) index = i;
    });
    const max = track.scrollWidth - track.clientWidth;
    const atEnd = left >= max - 4;
    // No fim da trilha vários cartões ficam visíveis; o contador vai para o último.
    setState({ index: atEnd ? cards.length - 1 : index, atStart: left <= 4, atEnd });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    measure();
    track.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      track.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const go = (direction) => {
    const track = trackRef.current;
    const card = track.children[0];
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: "smooth" });
  };

  // Arraste com o mouse (no toque a rolagem nativa já resolve).
  const drag = useRef(null);
  const onPointerDown = (event) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    drag.current = { x: event.clientX, left: trackRef.current.scrollLeft, moved: false };
  };
  const onPointerMove = (event) => {
    const d = drag.current;
    if (!d) return;
    const dx = event.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 4) {
      d.moved = true;
      trackRef.current.setPointerCapture(event.pointerId);
      trackRef.current.dataset.dragging = "true";
    }
    if (d.moved) trackRef.current.scrollLeft = d.left - dx;
  };
  const onPointerUp = () => {
    if (!drag.current) return;
    drag.current = null;
    delete trackRef.current.dataset.dragging;
  };

  const total = String(items.length).padStart(2, "0");
  const current = String(state.index + 1).padStart(2, "0");

  return (
    <div className={styles.carousel} role="region" aria-roledescription="carrossel" aria-label="Depoimentos de clientes" data-reveal>
      <ul
        ref={trackRef}
        className={styles.track}
        tabIndex={0}
        aria-label="Depoimentos (use as setas do teclado para rolar)"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {items.map((item, i) => (
          <li key={item.author} className={styles.quote} aria-roledescription="depoimento" aria-label={`${i + 1} de ${items.length}`}>
            <figure>
              <blockquote>
                <p>{item.text}</p>
              </blockquote>
              <figcaption>
                <span className={styles.author}>{item.author}</span>
                <span className={styles.source}>
                  <Stars size={12} className={styles.miniStars} />
                  no Google
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className={styles.controls}>
        <p className={styles.counter} aria-hidden="true">
          <span>{current}</span> / {total}
        </p>
        <div className={styles.progress} aria-hidden="true">
          <span style={{ width: `${((state.index + 1) / items.length) * 100}%` }} />
        </div>
        <div className={styles.arrows}>
          <button type="button" className={styles.arrow} onClick={() => go(-1)} disabled={state.atStart} aria-label="Depoimento anterior">
            <ArrowLeft size={20} />
          </button>
          <button type="button" className={styles.arrow} onClick={() => go(1)} disabled={state.atEnd} aria-label="Próximo depoimento">
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
