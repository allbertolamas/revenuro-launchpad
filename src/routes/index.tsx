import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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
import { TopUrgencyBar } from "@/components/landing/TopUrgencyBar";
import { FloatingSocialProof } from "@/components/landing/FloatingSocialProof";
import { ExitIntentPopup } from "@/components/landing/ExitIntentPopup";
import { VideoTestimonial } from "@/components/landing/VideoTestimonial";
import { PoweredByBar } from "@/components/landing/PoweredByBar";

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
  const [topBarVisible, setTopBarVisible] = useState(false);
  return (
    <SmoothScrollProvider>
      <ScrollProgress />
      <MagneticCursor />
      <TopUrgencyBar onVisibleChange={setTopBarVisible} />
      <Navbar topOffset={topBarVisible ? 38 : 0} />
      <main
        className="overflow-hidden"
        style={{ paddingTop: topBarVisible ? 38 : 0, transition: "padding-top 0.4s ease" }}
      >
        <Hero />
        <LogoStrip />
        <StatsSection />
        <CalculatorSection />
        <DemoSection />
        <HowItWorks />
        <ReplacesTable />
        <FeaturesGrid />
        <VideoTestimonial />
        <ChannelsSection />
        <PricingSection />
        <TwoPaths />
        <FAQ />
        <FinalCTA />
        <PoweredByBar />
        <Footer />
      </main>
      <FloatingSocialProof />
      <ExitIntentPopup />
    </SmoothScrollProvider>
  );
}
