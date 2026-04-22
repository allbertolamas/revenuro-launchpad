import { createFileRoute } from "@tanstack/react-router";
import { StatusPage } from "@/components/public/StatusPage";

export const Route = createFileRoute("/status")({
  head: () => ({
    meta: [
      { title: "Status del sistema — Brerev" },
      {
        name: "description",
        content:
          "Estado operacional en tiempo real de todos los servicios de Brerev. Uptime, incidentes y suscripción a alertas.",
      },
      { property: "og:title", content: "Status del sistema — Brerev" },
      {
        property: "og:description",
        content:
          "Estado operacional en tiempo real de Brerev. Uptime de los últimos 90 días.",
      },
    ],
  }),
  component: StatusPage,
});
