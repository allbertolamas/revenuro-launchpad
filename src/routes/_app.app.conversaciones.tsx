import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/app/ComingSoon";

export const Route = createFileRoute("/_app/app/conversaciones")({
  component: () => (
    <ComingSoon
      title="Conversaciones"
      description="Historial completo de conversaciones de voz y texto con transcripción y reproducción."
    />
  ),
});
