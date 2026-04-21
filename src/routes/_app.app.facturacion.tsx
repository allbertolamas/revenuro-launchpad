import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/app/ComingSoon";

export const Route = createFileRoute("/_app/app/facturacion")({
  component: () => (
    <ComingSoon
      title="Facturación"
      description="Plan actual, uso del mes, historial de cobros y valor estimado generado."
    />
  ),
});
