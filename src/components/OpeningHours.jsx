"use client";

import { useEffect, useState } from "react";
import { openingHours } from "@/content/business";
import styles from "./Visit.module.css";

const dayCodes = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

/** Dia da semana e hora atuais no fuso da barbearia. */
function nowInSaoPaulo() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (type) => parts.find((part) => part.type === type)?.value;
  return { dayCode: get("weekday").slice(0, 2), time: `${get("hour")}:${get("minute")}` };
}

/**
 * Tabela de horários. Depois de carregar, destaca o dia de hoje e diz se está
 * aberto agora (no HTML estático a tabela aparece sem destaque).
 */
export function OpeningHours() {
  const [now, setNow] = useState(null);

  useEffect(() => {
    const update = () => setNow(nowInSaoPaulo());
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, []);

  const today = now && openingHours.find((day) => day.dayCode === now.dayCode);
  const isOpen = today && !today.closed && now.time >= today.opens && now.time < today.closes;

  return (
    <div className={styles.hours}>
      <p className={styles.status} data-open={now ? String(Boolean(isOpen)) : undefined} aria-live="polite">
        {now && (
          <>
            <span className={styles.statusDot} aria-hidden="true" />
            {isOpen ? `Aberto agora, até ${today.closes}` : nextOpening(now.dayCode)}
          </>
        )}
      </p>
      <table className={styles.table}>
        <caption className="visually-hidden">Horário de funcionamento</caption>
        <tbody>
          {openingHours.map((day) => (
            <tr key={day.dayCode} aria-current={now?.dayCode === day.dayCode ? "date" : undefined}>
              <th scope="row">{day.day}</th>
              <td>{day.closed ? "Fechado" : `${day.opens} às ${day.closes}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function nextOpening(todayCode) {
  const start = dayCodes.indexOf(todayCode);
  for (let i = 0; i < 7; i += 1) {
    const code = dayCodes[(start + i) % 7];
    const day = openingHours.find((d) => d.dayCode === code);
    if (!day || day.closed) continue;
    const { time } = nowInSaoPaulo();
    if (i === 0 && time >= day.opens) continue;
    const when = i === 0 ? "hoje" : i === 1 ? "amanhã" : day.day.toLowerCase();
    return `Fechado agora. Abre ${when} às ${day.opens}`;
  }
  return "Fechado agora";
}
