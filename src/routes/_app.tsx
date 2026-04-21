import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";

export const Route = createFileRoute("/_app")({
  head: () => ({
    meta: [
      { title: "Brerev — Dashboard" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AppShell,
});
