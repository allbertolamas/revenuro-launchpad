import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/app/ComingSoon";

export const Route = createFileRoute("/_app/app/citas")({
  component: () => (
    <ComingSoon
      title="Citas"
      description="Calendario semanal con citas agendadas, confirmaciones y recordatorios."
    />
  ),
});
