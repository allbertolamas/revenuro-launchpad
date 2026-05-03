import { createFileRoute } from "@tanstack/react-router";
import { ConfiguracionPage } from "@/components/app/ConfiguracionPage";

export const Route = createFileRoute("/_app/app/configuracion")({
  component: ConfiguracionPage,
});
