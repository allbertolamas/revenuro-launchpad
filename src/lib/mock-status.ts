// Status público — generado determinísticamente para mostrar uptime de 90 días.

export type ComponentStatus = "operational" | "degraded" | "outage";

export type StatusComponent = {
  id: string;
  name: string;
  description: string;
  status: ComponentStatus;
};

export type DayStatus = "ok" | "minor" | "major" | "no_data";

export type Incident = {
  id: string;
  component: string;
  severity: "minor" | "major";
  title: string;
  description: string;
  startedAt: number;
  resolvedAt: number;
};

export const STATUS_COMPONENTS: StatusComponent[] = [
  {
    id: "lead_response",
    name: "Sistema de respuesta a leads",
    description: "Respuestas automáticas en WhatsApp y llamadas",
    status: "operational",
  },
  {
    id: "conversations",
    name: "Procesamiento de conversaciones",
    description: "Transcripción y análisis en tiempo real",
    status: "operational",
  },
  {
    id: "scheduling",
    name: "Agendado automático",
    description: "Creación de citas en calendarios",
    status: "operational",
  },
  {
    id: "dashboard",
    name: "Dashboard y métricas",
    description: "Panel de control y analytics",
    status: "operational",
  },
  {
    id: "whatsapp",
    name: "Conexiones de WhatsApp",
    description: "Integración con WhatsApp Business",
    status: "operational",
  },
  {
    id: "crm",
    name: "Integraciones de CRM",
    description: "Sincronización con Tokko, WebProp y otros",
    status: "operational",
  },
  {
    id: "billing",
    name: "Facturación",
    description: "Cobros y gestión de planes via Stripe",
    status: "operational",
  },
];

// Incidentes deterministas en componentes específicos para días específicos
const INCIDENT_DAYS: Record<string, { day: number; severity: DayStatus }[]> = {
  whatsapp: [
    { day: 12, severity: "minor" },
    { day: 47, severity: "minor" },
  ],
  crm: [{ day: 31, severity: "minor" }],
  billing: [{ day: 58, severity: "minor" }],
};

export function getDays(componentId: string): DayStatus[] {
  const days: DayStatus[] = [];
  const incidents = INCIDENT_DAYS[componentId] ?? [];
  for (let i = 89; i >= 0; i--) {
    const found = incidents.find((x) => x.day === i);
    days.push(found ? found.severity : "ok");
  }
  return days;
}

export function getUptimePct(componentId: string): number {
  const days = getDays(componentId);
  const okDays = days.filter((d) => d === "ok").length;
  return (okDays / days.length) * 100;
}

export function getRecentIncidents(): Incident[] {
  const now = Date.now();
  const DAY = 24 * 60 * 60 * 1000;
  return [
    {
      id: "i1",
      component: "Conexiones de WhatsApp",
      severity: "minor",
      title: "Latencia elevada en WhatsApp Business",
      description:
        "Detectamos respuestas con 5-10s de retraso entre las 14:00 y 14:35 UTC. Restablecido por completo.",
      startedAt: now - 12 * DAY,
      resolvedAt: now - 12 * DAY + 35 * 60 * 1000,
    },
    {
      id: "i2",
      component: "Integraciones de CRM",
      severity: "minor",
      title: "Sincronización lenta con Tokko",
      description:
        "La cola de sincronización tuvo demoras de hasta 3 minutos. Sin pérdida de datos.",
      startedAt: now - 31 * DAY,
      resolvedAt: now - 31 * DAY + 50 * 60 * 1000,
    },
  ];
}

export function getOverallStatus(): ComponentStatus {
  const worst = STATUS_COMPONENTS.reduce<ComponentStatus>((acc, c) => {
    if (c.status === "outage") return "outage";
    if (c.status === "degraded" && acc !== "outage") return "degraded";
    return acc;
  }, "operational");
  return worst;
}
