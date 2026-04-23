// Datos mock para /app/reporte. Reemplazar por queries reales cuando se conecte Supabase.

export type ReportRange = "7d" | "30d" | "90d" | "ytd";

export type ReportSummary = {
  leadsTotal: number;
  leadsAttended: number;
  attendedPct: number;
  avgResponseSec: number;
  appointments: number;
  appointmentsClosed: number;
  pipelineMxn: number;
  closedMxn: number;
  conversionPct: number;
  hoursSaved: number;
};

export type TrendPoint = { label: string; leads: number; attended: number; appointments: number };

export type ChannelBreakdown = { channel: string; leads: number; attended: number; pct: number };

export type TopProperty = { property: string; leads: number; appointments: number };

export type SummaryByDay = { day: string; leads: number; attended: number };

const rangeMultiplier: Record<ReportRange, number> = {
  "7d": 1,
  "30d": 3.8,
  "90d": 10.4,
  ytd: 38,
};

export function getReportSummary(range: ReportRange): ReportSummary {
  const m = rangeMultiplier[range];
  const leadsTotal = Math.round(147 * m);
  const leadsAttended = Math.round(leadsTotal * 0.98);
  const appointments = Math.round(42 * m);
  const appointmentsClosed = Math.round(appointments * 0.31);
  const pipelineMxn = Math.round(28.4 * m * 1_000_000);
  const closedMxn = Math.round(pipelineMxn * 0.22);
  return {
    leadsTotal,
    leadsAttended,
    attendedPct: Math.round((leadsAttended / leadsTotal) * 100),
    avgResponseSec: 9,
    appointments,
    appointmentsClosed,
    pipelineMxn,
    closedMxn,
    conversionPct: Math.round((appointmentsClosed / leadsTotal) * 1000) / 10,
    hoursSaved: Math.round(leadsTotal * 0.15),
  };
}

export function getTrend(range: ReportRange): TrendPoint[] {
  const points = range === "7d" ? 7 : range === "30d" ? 30 : range === "90d" ? 12 : 12;
  const base = range === "7d" ? 21 : range === "30d" ? 18 : 64;
  const labels =
    range === "7d"
      ? ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]
      : range === "30d"
        ? Array.from({ length: 30 }, (_, i) => `${i + 1}`)
        : ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

  return labels.slice(0, points).map((label, i) => {
    const noise = Math.sin(i * 0.6) * base * 0.35 + Math.cos(i * 0.4) * base * 0.2;
    const leads = Math.max(1, Math.round(base + noise));
    const attended = Math.max(1, Math.round(leads * 0.97));
    const appointments = Math.max(0, Math.round(leads * 0.28));
    return { label, leads, attended, appointments };
  });
}

export function getChannelBreakdown(): ChannelBreakdown[] {
  return [
    { channel: "WhatsApp", leads: 412, attended: 408, pct: 67 },
    { channel: "Llamadas", leads: 129, attended: 124, pct: 21 },
    { channel: "Formularios", leads: 55, attended: 52, pct: 9 },
    { channel: "Otros", leads: 18, attended: 17, pct: 3 },
  ];
}

export function getTopProperties(): TopProperty[] {
  return [
    { property: "Depto Polanco · $5M", leads: 42, appointments: 14 },
    { property: "Casa Lomas · $14M", leads: 31, appointments: 9 },
    { property: "PH Condesa · $7M", leads: 28, appointments: 8 },
    { property: "Loft Roma Norte · $3.2M", leads: 24, appointments: 7 },
    { property: "Local Coyoacán · $8.5M", leads: 19, appointments: 5 },
  ];
}

export function getResponseDistribution() {
  return [
    { range: "0-10s", count: 78 },
    { range: "10-30s", count: 14 },
    { range: "30-60s", count: 5 },
    { range: "1-5min", count: 2 },
    { range: "+5min", count: 1 },
  ];
}

export function formatMxn(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}

export const RANGE_LABELS: Record<ReportRange, string> = {
  "7d": "Últimos 7 días",
  "30d": "Últimos 30 días",
  "90d": "Últimos 90 días",
  ytd: "Año en curso",
};
