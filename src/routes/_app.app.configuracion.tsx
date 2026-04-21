import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/app/ComingSoon";

export const Route = createFileRoute("/_app/app/configuracion")({
  component: () => (
    <ComingSoon
      title="Configuración"
      description="Tu negocio, tu asistente, canales conectados, inventario, notificaciones y equipo."
    />
  ),
});
