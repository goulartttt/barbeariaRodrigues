import { Archivo } from "next/font/google";
import { business, services } from "@/content/business";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});

const title = `${business.name} · Vila Aurora, Zona Norte de São Paulo`;
const description =
  "Barbearia na Vila Aurora, Zona Norte de São Paulo. Corte de cabelo, barba, corte infantil e tratamentos capilares. Agende online ou ligue (11) 97190-4140.";

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
  themeColor: "#f3efe8",
  width: "device-width",
  initialScale: 1,
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
