import { createFileRoute } from "@tanstack/react-router";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { MagneticCursor } from "@/components/MagneticCursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { LogoStrip } from "@/components/sections/LogoStrip";
import { StatsSection } from "@/components/sections/StatsSection";
import { CalculatorSection } from "@/components/sections/CalculatorSection";
import { DemoSection } from "@/components/sections/DemoSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ReplacesTable } from "@/components/sections/ReplacesTable";
import { FeaturesGrid } from "@/components/sections/FeaturesGrid";
import { ChannelsSection } from "@/components/sections/ChannelsSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { TwoPaths } from "@/components/sections/TwoPaths";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      {
        title:
          "Brerev — Infraestructura comercial para inmobiliarias en México",
      },
      {
        name: "description",
        content:
          "Responde, califica y agenda cada lead inmobiliario en menos de 12 segundos, 24/7. Sin perder oportunidades fuera de horario.",
      },
      {
        property: "og:title",
        content: "Brerev — Sistema de ventas que no descansa",
      },
      {
        property: "og:description",
        content:
          "El 62% de tus leads llegan cuando ya cerraste. Brerev los atiende, califica y agenda — automáticamente.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});

function Index() {
  return (
    <SmoothScrollProvider>
      <ScrollProgress />
      <MagneticCursor />
      <Navbar />
      <main className="overflow-hidden">
        <Hero />
        <LogoStrip />
        <StatsSection />
        <CalculatorSection />
        <DemoSection />
        <HowItWorks />
        <ReplacesTable />
        <FeaturesGrid />
        <ChannelsSection />
        <PricingSection />
        <TwoPaths />
        <FAQ />
        <FinalCTA />
        <Footer />
      </main>
    </SmoothScrollProvider>
  );
}
