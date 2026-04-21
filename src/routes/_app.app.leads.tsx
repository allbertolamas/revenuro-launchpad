import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/app/ComingSoon";

export const Route = createFileRoute("/_app/app/leads")({
  component: () => (
    <ComingSoon
      title="Leads"
      description="Vista completa del pipeline con tabla, filtros y panel lateral de detalle."
    />
  ),
});
