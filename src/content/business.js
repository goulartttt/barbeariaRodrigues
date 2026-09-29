/**
 * Única fonte dos fatos do negócio exibidos no site.
 * Tudo aqui foi fornecido pelo dono ou consta no perfil do Google.
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
const mapsQuery = encodeURIComponent(`${name}, ${address.full}`);

export const business = {
  name,
  address,
  phone: {
    display: "(11) 97190-4140",
    e164: phoneE164,
    href: `tel:${phoneE164}`,
  },
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

/** Serviços listados no perfil do Google. */
export const services = [
  "Corte de cabelo",
  "Barba",
  "Corte infantil",
  "Tratamentos capilares",
  "Progressiva e alisamento",
  "Coloração",
  "Penteados",
  "Prótese capilar",
];

/** Temas recorrentes nas avaliações do Google (resumo, não citações). */
export const reviewThemes = [
  "Bom atendimento",
  "Equipe profissional",
  "Preço justo",
  "Ambiente limpo e agradável",
  "O corte sai como foi pedido",
];
