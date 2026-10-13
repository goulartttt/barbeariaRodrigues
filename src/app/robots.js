import { business } from "@/content/business";

/**
 * Libera os buscadores e aponta o sitemap. Fora da produção, quem impede a
 * indexação é o cabeçalho `X-Robots-Tag: noindex` (veja `next.config.mjs`).
 */
export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${business.url}/sitemap.xml`,
  };
}
