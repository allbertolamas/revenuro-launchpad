import { createFileRoute } from "@tanstack/react-router";
import { ReportePage } from "@/components/app/ReportePage";

export const Route = createFileRoute("/_app/app/reporte")({
  head: () => ({ meta: [{ title: "Brerev — Reportes" }] }),
  component: ReportePage,
});
