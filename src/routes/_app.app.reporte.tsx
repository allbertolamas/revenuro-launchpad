import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/app/ComingSoon";

export const Route = createFileRoute("/_app/app/reporte")({
  head: () => ({ meta: [{ title: "Brerev — Reportes" }] }),
  component: () => (
    <ComingSoon
      title="Reportes"
      description="Reportes descargables en PDF, gráficas de tendencia, desglose por canal y ROI del sistema. Disponible en la próxima entrega."
    />
  ),
});
