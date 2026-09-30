import { ClosingCta } from "@/components/ClosingCta";
import { Hero } from "@/components/Hero";
import { MobileActionBar } from "@/components/MobileActionBar";
import { Reviews } from "@/components/Reviews";
import { Services } from "@/components/Services";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { StatsStrip } from "@/components/StatsStrip";
import { Visit } from "@/components/Visit";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="conteudo">
        <Hero />
        <StatsStrip />
        <Services />
        <Reviews />
        <Visit />
        <ClosingCta />
      </main>
      <SiteFooter />
      <MobileActionBar />
    </>
  );
}
