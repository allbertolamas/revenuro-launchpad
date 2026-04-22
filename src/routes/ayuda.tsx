import { createFileRoute } from "@tanstack/react-router";
import { HelpPage } from "@/components/public/HelpPage";

export const Route = createFileRoute("/ayuda")({
  head: () => ({
    meta: [
      { title: "Centro de ayuda — Brerev" },
      {
        name: "description",
        content:
          "Centro de ayuda de Brerev. Guías para conectar WhatsApp, personalizar mensajes, gestionar leads y más.",
      },
      { property: "og:title", content: "Centro de ayuda — Brerev" },
      {
        property: "og:description",
        content:
          "Encuentra respuestas a las preguntas más frecuentes sobre tu sistema de respuesta a leads.",
      },
    ],
  }),
  component: HelpPage,
});
