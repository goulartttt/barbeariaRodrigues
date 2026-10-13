import { business } from "@/content/business";

/** O site tem uma página só; a data é a da última publicação. */
export default function sitemap() {
  return [{ url: business.url, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
