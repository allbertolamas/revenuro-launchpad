import { createFileRoute } from "@tanstack/react-router";
import { NotificationsPage } from "@/components/app/NotificationsPage";

export const Route = createFileRoute("/_app/app/notificaciones")({
  head: () => ({ meta: [{ title: "Brerev — Notificaciones" }] }),
  component: NotificationsPage,
});
