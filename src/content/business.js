/**
 * Única fonte dos fatos do negócio exibidos no site.
 * Tudo aqui foi fornecido pelo dono ou consta no perfil do Google.
 * Não adicione preços, horários, equipe, redes sociais ou depoimentos
 * sem confirmação do dono.
 */

const street = "R. Mariquinha Viana, 875";
const fullAddress = `${street} - Vila Aurora, São Paulo - SP, 02408-131`;

export const business = {
  name: "Rodrigues Barbearia",
  address: {
    street: "R. Mariquinha Viana",
    number: "875",
    neighborhood: "Vila Aurora",
    region: "Zona Norte",
    city: "São Paulo",
    state: "SP",
    postalCode: "02408-131",
    full: fullAddress,
  },
  phone: {
    display: "(11) 97190-4140",
    href: "tel:+5511971904140",
    e164: "+5511971904140",
  },
  booking: {
    url: "https://topsalao.com/?id=98939",
    provider: "TopSalão",
  },
  maps: {
    profile: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `Rodrigues Barbearia, ${fullAddress}`,
    )}`,
    directions: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      `Rodrigues Barbearia, ${fullAddress}`,
    )}`,
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
