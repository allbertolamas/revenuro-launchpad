import { createFileRoute } from "@tanstack/react-router";
import { WelcomePage } from "@/components/app/WelcomePage";

export const Route = createFileRoute("/_app/app/bienvenida")({
  head: () => ({ meta: [{ title: "Brerev — Primeros pasos" }] }),
  component: WelcomePage,
});
