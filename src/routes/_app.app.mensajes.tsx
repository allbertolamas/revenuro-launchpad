import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/app/ComingSoon";

export const Route = createFileRoute("/_app/app/mensajes")({
  component: () => (
    <ComingSoon
      title="Mensajes del sistema"
      description="Editor de los 7 mensajes con estadísticas e historial de versiones."
    />
  ),
});
