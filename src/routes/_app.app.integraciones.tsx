import { createFileRoute } from "@tanstack/react-router";
import { IntegracionesPage } from "@/components/app/IntegracionesPage";

export const Route = createFileRoute("/_app/app/integraciones")({
  head: () => ({ meta: [{ title: "Brerev — Integraciones" }] }),
  component: IntegracionesPage,
});
