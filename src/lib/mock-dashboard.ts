// Mock data para el dashboard /app/dashboard
// Cuando se conecte Supabase + ElevenLabs, este archivo se reemplaza por queries reales.

export type Period = "today" | "7d" | "30d" | "90d";

export type Kpis = {
  leads: { value: number; deltaPct: number; attendedPct: number };
  responseSec: { value: number; deltaPct: number };
  appointments: { value: number; deltaPct: number };
  pipelineMxn: { value: number; qualifiedActive: number };
};

export type ChartPoint = { label: string; leads: number; attended: number };

export type FeedItem = {
  id: string;
  type: "qualified" | "appointment" | "in_progress" | "pending" | "cold";
  title: string;
  detail: string;
  minutesAgo: number;
};

export type ChannelSlice = { name: "WhatsApp" | "Llamadas" | "Formularios" | "Otros"; value: number; color: string };

export type PipelineRow = { label: string; value: number; max: number; color: string };

export type UpcomingAppt = { time: string; name: string; property: string; when: "Hoy" | "Mañana" };

const periodMultiplier: Record<Period, number> = {
  today: 1,
  "7d": 6.4,
  "30d": 24,
  "90d": 68,
};

export function getKpis(period: Period): Kpis {
  const m = periodMultiplier[period];
  return {
    leads: { value: Math.round(23 * m), deltaPct: 12, attendedPct: 98 },
    responseSec: { value: 9, deltaPct: -18 },
    appointments: { value: Math.round(7 * m), deltaPct: 8 },
    pipelineMxn: { value: Math.round(4.2 * m * 1_000_000), qualifiedActive: Math.round(14 * m) },
  };
}

export function getSeries(period: Period): ChartPoint[] {
  const days = period === "today" ? 12 : period === "7d" ? 7 : period === "30d" ? 30 : 90;
  const base = period === "today" ? 3 : 18;
  const labels =
    period === "today"
      ? ["8a", "9a", "10a", "11a", "12p", "1p", "2p", "3p", "4p", "5p", "6p", "7p"]
      : Array.from({ length: days }, (_, i) =>
          period === "7d"
            ? ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"][i]
            : `${i + 1}`,
        );

  return labels.map((label, i) => {
    const noise = Math.sin(i * 0.7) * base * 0.4 + Math.cos(i * 0.3) * base * 0.25;
    const leads = Math.max(1, Math.round(base + noise + (i % 4)));
    const attended = Math.max(1, Math.round(leads * (0.9 + Math.sin(i) * 0.05)));
    return { label, leads, attended };
  });
}

export function getFeed(): FeedItem[] {
  return [
    { id: "1", type: "qualified", title: "Lead calificado", detail: "Mariana López · Depto Polanco · $4M", minutesAgo: 2 },
    { id: "2", type: "appointment", title: "Cita agendada", detail: "Carlos Ruiz · Mañana 10:30 AM · Roma Norte", minutesAgo: 8 },
    { id: "3", type: "in_progress", title: "Conversación activa", detail: "Sofía Mendoza · WhatsApp", minutesAgo: 14 },
    { id: "4", type: "qualified", title: "Lead calificado", detail: "Andrés Vega · Casa Coyoacán · $8.5M", minutesAgo: 27 },
    { id: "5", type: "appointment", title: "Cita confirmada", detail: "Patricia Ortiz · Hoy 5:00 PM", minutesAgo: 41 },
    { id: "6", type: "pending", title: "Sin confirmar 24h", detail: "Diego Hernández · Esperando respuesta", minutesAgo: 73 },
    { id: "7", type: "cold", title: "Lead frío", detail: "Lucía García · Sin respuesta tras 5 días", minutesAgo: 220 },
    { id: "8", type: "qualified", title: "Lead calificado", detail: "Roberto Salinas · Local comercial · Condesa", minutesAgo: 312 },
  ];
}

export function getChannels(): ChannelSlice[] {
  return [
    { name: "WhatsApp", value: 67, color: "var(--success)" },
    { name: "Llamadas", value: 21, color: "var(--electric)" },
    { name: "Formularios", value: 9, color: "var(--amber)" },
    { name: "Otros", value: 3, color: "var(--slate)" },
  ];
}

export function getPipeline(): PipelineRow[] {
  return [
    { label: "Seguimiento activo", value: 47, max: 80, color: "var(--electric)" },
    { label: "Esperando confirmación", value: 18, max: 80, color: "var(--amber)" },
    { label: "Reactivación pendiente", value: 12, max: 80, color: "#a78bfa" },
    { label: "Convertidos este mes", value: 9, max: 80, color: "var(--success)" },
  ];
}

export function getUpcoming(): UpcomingAppt[] {
  return [
    { time: "5:00 PM", name: "Patricia Ortiz", property: "Depto Polanco · $5M", when: "Hoy" },
    { time: "7:30 PM", name: "Manuel Cárdenas", property: "Casa Lomas · $14M", when: "Hoy" },
    { time: "10:30 AM", name: "Carlos Ruiz", property: "Loft Roma Norte · $3.2M", when: "Mañana" },
    { time: "1:00 PM", name: "Elena Ríos", property: "PH Condesa · $7M", when: "Mañana" },
  ];
}

export function relativeTime(min: number): string {
  if (min < 1) return "ahora";
  if (min < 60) return `hace ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `hace ${h} h`;
  const d = Math.floor(h / 24);
  return `hace ${d} d`;
}

export function formatMxn(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}
