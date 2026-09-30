import { Archivo } from "next/font/google";
import { business, openingHours, prices, services } from "@/content/business";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});

const { address, phone } = business;
const place = `${address.neighborhood}, ${address.region} de ${address.city}`;
const title = `${business.name} · ${place}`;
const description = `Barbearia na ${place}. Corte de cabelo, barba, corte infantil e tratamentos capilares. Agende online ou chame no WhatsApp ${phone.display}.`;

export const metadata = {
  title,
  description,
  applicationName: business.name,
  formatDetection: { telephone: false },
  openGraph: {
    title,
    description,
    type: "website",
    locale: "pt_BR",
    siteName: business.name,
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport = {
  themeColor: "#0b0a09",
  width: "device-width",
  initialScale: 1,
};

const dayNames = {
  Mo: "Monday",
  Tu: "Tuesday",
  We: "Wednesday",
  Th: "Thursday",
  Fr: "Friday",
  Sa: "Saturday",
  Su: "Sunday",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: business.name,
  telephone: business.phone.e164,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${business.address.street}, ${business.address.number}`,
    addressLocality: business.address.city,
    addressRegion: business.address.state,
    postalCode: business.address.postalCode,
    addressCountry: "BR",
  },
  hasMap: business.maps.profile,
  foundingDate: String(business.since),
  sameAs: [business.instagram.url],
  priceRange: `R$ ${Math.min(...prices.map((p) => p.price))} a R$ ${Math.max(...prices.map((p) => p.price))}`,
  openingHoursSpecification: openingHours
    .filter((day) => !day.closed)
    .map((day) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${dayNames[day.dayCode]}`,
      opens: day.opens,
      closes: day.closes,
    })),
  potentialAction: {
    "@type": "ReserveAction",
    target: business.booking.url,
  },
  makesOffer: services.map((name) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name },
  })),
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={archivo.variable}>
      <body>
        <a className="skip-link" href="#conteudo">
          Pular para o conteúdo
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
