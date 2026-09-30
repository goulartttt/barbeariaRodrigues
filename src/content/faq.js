import { business, openingHours, prices, team } from "./business";

/**
 * Perguntas frequentes. As respostas saem dos fatos de `business.js`:
 * não escreva aqui nada que o dono não tenha confirmado (pagamento,
 * estacionamento, encaixe sem horário etc. ficam de fora até ele dizer).
 */
const price = (name) => prices.find((item) => item.name === name).price;
const barbers = team.map((member) => member.name).join(" e ");

const hoursText = (() => {
  const open = openingHours.filter((day) => !day.closed);
  const weekdays = open.filter((day) => day.closes === "20:00");
  const saturday = open.find((day) => day.dayCode === "Sa");
  const closed = openingHours.filter((day) => day.closed).map((day) => day.day.toLowerCase());
  return `De ${weekdays[0].day.toLowerCase()} a ${weekdays.at(-1).day.toLowerCase()}, das ${weekdays[0].opens} às ${weekdays[0].closes}. Sábado, das ${saturday.opens} às ${saturday.closes}. Fechado ${closed.reverse().join(" e ")}.`;
})();

export const faq = [
  {
    question: "Como faço para agendar?",
    answer: `Pela agenda online na ${business.booking.provider}: você escolhe o serviço, o barbeiro e um horário livre. Se tiver alguma dúvida antes, chame no WhatsApp ${business.whatsapp.display}.`,
    link: { label: "Abrir a agenda", href: business.booking.url },
  },
  {
    question: "Quanto custa o corte?",
    answer: `O corte sai por R$ ${price("Corte")}, a barba por R$ ${price("Barba")} e cabelo e barba juntos por R$ ${price("Cabelo e barba")}. O corte navalhado custa R$ ${price("Corte navalhado")}.`,
    link: { label: "Ver todos os preços", href: "#precos", internal: true },
  },
  {
    question: "Como funciona o plano de 2 cortes?",
    answer: `São 2 cortes no mesmo mês por R$ ${price("2 cortes no mês")}, em vez de R$ ${price("Corte") * 2} pagando separado. Para tirar dúvidas sobre o plano, chame no WhatsApp.`,
    link: { label: "Falar no WhatsApp", href: business.whatsapp.href },
  },
  {
    question: "Qual o horário de funcionamento?",
    answer: hoursText,
  },
  {
    question: "Vocês cortam cabelo de criança?",
    answer: "Sim, cortes infantis estão entre os serviços da barbearia. O valor e os horários livres aparecem na agenda online.",
  },
  {
    question: "Fazem luzes, platinado e alisamento?",
    answer: `Sim. Platinado ou luzes com corte custa R$ ${price("Platinado ou luzes + corte")} e corte com alisamento, R$ ${price("Corte mais alisamento")}. Também tem escova progressiva, coloração, hidratação e prótese capilar, com valores na agenda.`,
  },
  {
    question: "Posso escolher o barbeiro?",
    answer: `Pode. Quem atende são o ${barbers}, e a escolha é feita na própria agenda online.`,
  },
];
