// Centro de notificaciones — mock con persistencia de "leídas" en localStorage.

export type NotificationType =
  | "lead_hot"
  | "appointment"
  | "lead_new"
  | "no_confirm"
  | "reactivation"
  | "plan_usage"
  | "system_offline"
  | "weekly_report";

export type NotificationCategory = "leads" | "citas" | "sistema";

export type NotificationItem = {
  id: string;
  type: NotificationType;
  category: NotificationCategory;
  title: string;
  body: string;
  createdAt: number; // ms epoch
  actions?: { label: string; primary?: boolean; href?: string }[];
};

const READ_KEY = "brerev_notifications_read_v1";

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

function now() {
  return Date.now();
}

export function getMockNotifications(): NotificationItem[] {
  const t = now();
  return [
    {
      id: "n1",
      type: "lead_hot",
      category: "leads",
      title: "🔥 Lead con intención alta detectado",
      body: "María Torres preguntó por departamentos en Polanco con presupuesto de $4.5M MXN. El sistema calificó alta intención de compra.",
      createdAt: t - 12 * 60 * 1000,
      actions: [
        { label: "Ver conversación", primary: true },
        { label: "Llamar ahora" },
      ],
    },
    {
      id: "n2",
      type: "appointment",
      category: "citas",
      title: "Cita agendada para mañana",
      body: "Carlos M. confirmó su cita para el martes 22 de abril a las 10:00 AM. Interés: Casa en Lomas Verdes.",
      createdAt: t - 2 * HOUR,
      actions: [{ label: "Ver en calendario", primary: true }],
    },
    {
      id: "n3",
      type: "lead_new",
      category: "leads",
      title: "Nuevo lead atendido",
      body: "Andrés Vega contactó por WhatsApp preguntando por casas en Coyoacán. Conversación en curso.",
      createdAt: t - 4 * HOUR,
      actions: [{ label: "Ver conversación", primary: true }],
    },
    {
      id: "n4",
      type: "no_confirm",
      category: "citas",
      title: "⚠ Lead sin confirmar hace 6 horas",
      body: "Roberto Silva no ha confirmado su cita de mañana. El sistema enviará un recordatorio automáticamente a las 9 PM.",
      createdAt: t - 6 * HOUR,
      actions: [
        { label: "Contactar ahora", primary: true },
        { label: "Dejar que el sistema actúe" },
      ],
    },
    {
      id: "n5",
      type: "reactivation",
      category: "leads",
      title: "Reactivación ejecutada",
      body: "El sistema reactivó 8 leads inactivos con un mensaje personalizado. 3 ya respondieron.",
      createdAt: t - 1 * DAY - 3 * HOUR,
      actions: [{ label: "Ver resultados", primary: true }],
    },
    {
      id: "n6",
      type: "plan_usage",
      category: "sistema",
      title: "Estás al 82% de tus minutos de voz",
      body: "Llevas 410 de 500 minutos este mes. A este ritmo, alcanzarás el límite en 3 días.",
      createdAt: t - 1 * DAY - 8 * HOUR,
      actions: [
        { label: "Agregar minutos — $15 USD", primary: true },
        { label: "Ver mi plan" },
      ],
    },
    {
      id: "n7",
      type: "weekly_report",
      category: "sistema",
      title: "Tu reporte semanal está listo",
      body: "Esta semana atendiste 47 leads y generaste 12 citas. Pipeline estimado: $18.4M MXN.",
      createdAt: t - 3 * DAY,
      actions: [{ label: "Ver reporte completo", primary: true }],
    },
    {
      id: "n8",
      type: "system_offline",
      category: "sistema",
      title: "Tu WhatsApp se desconectó brevemente",
      body: "La sesión se restableció en menos de 1 minuto. Ningún lead quedó sin atención.",
      createdAt: t - 5 * DAY,
    },
    {
      id: "n9",
      type: "appointment",
      category: "citas",
      title: "Cita reagendada",
      body: "Patricia Ortiz movió su cita del jueves al viernes a las 5:00 PM. El calendario ya está actualizado.",
      createdAt: t - 8 * DAY,
    },
  ];
}

export function loadReadIds(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(READ_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
}

export function saveReadIds(ids: Set<string>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(READ_KEY, JSON.stringify(Array.from(ids)));
}

export function dateBucket(ts: number): "Hoy" | "Ayer" | "Esta semana" | "Más antiguas" {
  const diff = now() - ts;
  if (diff < DAY) return "Hoy";
  if (diff < 2 * DAY) return "Ayer";
  if (diff < 7 * DAY) return "Esta semana";
  return "Más antiguas";
}

export function timeAgo(ts: number): string {
  const diff = now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1) return "ahora";
  if (m < 60) return `hace ${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `hace ${h} h`;
  const d = Math.floor(h / 24);
  return `hace ${d} d`;
}
