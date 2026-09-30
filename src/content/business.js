/**
 * Única fonte dos fatos do negócio exibidos no site.
 * Tudo aqui foi fornecido pelo dono, consta no perfil do Google ou aparece
 * na fachada da barbearia (fotos enviadas pelo dono).
 * Não adicione preços, horários, equipe, redes sociais ou depoimentos
 * sem confirmação do dono.
 */

const name = "Rodrigues Barbearia";

const address = {
  street: "R. Mariquinha Viana",
  number: "875",
  neighborhood: "Vila Aurora",
  region: "Zona Norte",
  city: "São Paulo",
  state: "SP",
  postalCode: "02408-131",
};
address.full = `${address.street}, ${address.number} - ${address.neighborhood}, ${address.city} - ${address.state}, ${address.postalCode}`;

const phoneE164 = "+5511971904140";
const whatsappNumber = "5511971904140";
const mapsQuery = encodeURIComponent(`${name}, ${address.full}`);

export const business = {
  name,
  address,
  phone: {
    display: "(11) 97190-4140",
    e164: phoneE164,
    href: `tel:${phoneE164}`,
  },
  /** O mesmo número aparece com o ícone do WhatsApp no toldo e na placa da fachada. */
  whatsapp: {
    display: "(11) 97190-4140",
    href: `https://wa.me/${whatsappNumber}`,
  },
  /** Aparece na placa e no toldo da fachada. */
  instagram: {
    handle: "@rodrigues_barbeariazn",
    url: "https://www.instagram.com/rodrigues_barbeariazn/",
  },
  /** Ano de abertura, que aparece no logo. Confirmado pelo dono em 30/09/2026. */
  since: 2016,
  booking: {
    url: "https://topsalao.com/?id=98939",
    provider: "TopSalão",
  },
  maps: {
    profile: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
    directions: `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`,
  },
  google: {
    rating: "5,0",
    reviewCount: 69,
    /** Quando a nota e o total foram consultados. Atualize junto com os números. */
    checkedAt: "setembro de 2026",
  },
};

/** Serviços listados na aba "Serviços" do perfil do Google (enviados pelo dono em 30/09/2026). */
export const services = [
  "Corte de cabelo",
  "Aparar a barba",
  "Cortes infantis",
  "Luzes no cabelo",
  "Alisamentos de cabelo",
  "Escova progressiva",
  "Coloração de cabelo",
  "Cabelo ombré",
  "Brilho capilar",
  "Tratamentos de hidratação capilar",
  "Cabelos cacheados",
  "Aparar a franja",
  "Penteados",
  "Prótese capilar masculina",
  "Manutenção de prótese capilar",
];

/** Temas recorrentes nas avaliações do Google (resumo, não citações). */
export const reviewThemes = [
  "Bom atendimento",
  "Equipe profissional",
  "Preço justo",
  "Ambiente limpo e agradável",
  "O corte sai como foi pedido",
];

/** Tabela de preços enviada pelo dono. Ao mudar valores, atualize `pricesCheckedAt`. */
export const pricesCheckedAt = "setembro de 2026";

/** `plan: true` marca o plano mensal, destacado na tabela. */
export const prices = [
  { name: "Corte", price: 40 },
  { name: "Barba", price: 35 },
  { name: "Cabelo e barba", price: 65 },
  { name: "Corte navalhado", price: 45 },
  { name: "Corte mais alisamento", price: 65 },
  { name: "Platinado ou luzes + corte", price: 140 },
  { name: "2 cortes no mês", price: 70, plan: true },
];

/** Serviços do Google que não estão na tabela de preços (valor na agenda online). */
export const otherServices = [
  "Cortes infantis",
  "Escova progressiva",
  "Coloração",
  "Cabelo ombré",
  "Brilho capilar",
  "Hidratação capilar",
  "Cabelos cacheados",
  "Aparar a franja",
  "Penteados",
  "Prótese capilar masculina",
  "Manutenção de prótese",
];

/** Horário de funcionamento do perfil do Google, enviado pelo dono em 30/09/2026. */
export const openingHours = [
  { day: "Segunda", dayCode: "Mo", closed: true },
  { day: "Terça", dayCode: "Tu", opens: "09:00", closes: "20:00" },
  { day: "Quarta", dayCode: "We", opens: "09:00", closes: "20:00" },
  { day: "Quinta", dayCode: "Th", opens: "09:00", closes: "20:00" },
  { day: "Sexta", dayCode: "Fr", opens: "09:00", closes: "20:00" },
  { day: "Sábado", dayCode: "Sa", opens: "09:00", closes: "18:00" },
  { day: "Domingo", dayCode: "Su", closed: true },
];

/**
 * Profissionais listados na TopSalão. `note` só com o que consta nas avaliações do Google.
 * TODO: foto do Raphael (o dono ainda não tem).
 */
export const team = [
  {
    name: "Farlen",
    role: "Barbeiro",
    photo: "/images/fotos/farlen-atendendo.jpg",
    photoAlt: "Farlen, de chapéu, cortando o cabelo de um cliente no salão",
    note: "Elogiado nas avaliações por ser cuidadoso, profissional e atencioso.",
  },
  { name: "Raphael", role: "Barbeiro", photo: null },
];
