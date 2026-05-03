import { createFileRoute } from "@tanstack/react-router";
import { FacturacionPage } from "@/components/app/FacturacionPage";

export const Route = createFileRoute("/_app/app/facturacion")({
  component: FacturacionPage,
});
