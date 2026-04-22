import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/app/ComingSoon";

export const Route = createFileRoute("/_app/app/integraciones")({
  head: () => ({ meta: [{ title: "Brerev — Integraciones" }] }),
  component: () => (
    <ComingSoon
      title="Integraciones"
      description="Galería de calendarios, CRM, portales y herramientas de comunicación. Disponible en la próxima entrega."
    />
  ),
});
