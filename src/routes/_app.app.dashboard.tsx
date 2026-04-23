import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Users,
  Zap,
  Calendar,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Info,
  ArrowRight,
} from "lucide-react";
import { usePeriod } from "@/components/app/AppShell";
import {
  formatMxn,
  getChannels,
  getFeed,
  getKpis,
  getPipeline,
  getSeries,
  getUpcoming,
  relativeTime,
  type FeedItem,
} from "@/lib/mock-dashboard";

export const Route = createFileRoute("/_app/app/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const { period } = usePeriod();
  const kpis = getKpis(period);
  const series = getSeries(period);
  const channels = getChannels();
  const pipeline = getPipeline();
  const upcoming = getUpcoming();

  const [feed, setFeed] = useState<FeedItem[]>(() => getFeed());
  const [lastUpdated, setLastUpdated] = useState<number>(Date.now());
  const [secAgo, setSecAgo] = useState(0);

  // Simulación de polling: cada 30s "actualiza" timestamp.
  // Cada 18s inserta un evento nuevo arriba.
  useEffect(() => {
    const tick = setInterval(() => setSecAgo((s) => s + 1), 1000);
    const refresh = setInterval(() => setLastUpdated(Date.now()), 30000);
    const newEvent = setInterval(() => {
      setFeed((prev) => {
        const candidates: Omit<FeedItem, "id" | "minutesAgo">[] = [
          { type: "qualified", title: "Lead calificado", detail: "Nuevo contacto · WhatsApp" },
          { type: "appointment", title: "Cita agendada", detail: "Confirmada para mañana" },
          { type: "in_progress", title: "Conversación activa", detail: "Lead respondió hace segundos" },
        ];
        const next = candidates[Math.floor(Math.random() * candidates.length)];
        return [
          { id: String(Date.now()), minutesAgo: 0, ...next },
          ...prev.slice(0, 9),
        ];
      });
    }, 18000);
    return () => {
      clearInterval(tick);
      clearInterval(refresh);
      clearInterval(newEvent);
    };
  }, []);

  useEffect(() => {
    setSecAgo(0);
  }, [lastUpdated, period]);

  return (
    <div className="mx-auto max-w-[1400px] space-y-6">
      {/* Última actualización */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[13px]" style={{ color: "var(--slate)" }}>
            Tu sistema está operando · Actualizado hace {secAgo}s
          </p>
        </div>
      </div>

      {/* FILA 1 — KPIs */}
      <section data-tour="kpis" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          label="Leads recibidos"
          value={kpis.leads.value}
          delta={kpis.leads.deltaPct}
          icon={Users}
          accent="var(--electric)"
          extra={
            <div className="mt-3">
              <div
                className="h-1.5 w-full overflow-hidden rounded-full"
                style={{ background: "var(--steel)" }}
              >
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${kpis.leads.attendedPct}%`,
                    background: "var(--success)",
                  }}
                />
              </div>
              <p className="mt-1.5 text-[11px]" style={{ color: "var(--slate)" }}>
                {kpis.leads.attendedPct}% atendidos por el sistema
              </p>
            </div>
          }
        />
        <KpiCard
          label="Tiempo de respuesta"
          value={kpis.responseSec.value}
          suffix="s"
          delta={kpis.responseSec.deltaPct}
          deltaInverted
          icon={Zap}
          accent="var(--success)"
          valueColor="var(--success)"
          extra={
            <p className="mt-2 text-[11px]" style={{ color: "var(--slate)" }}>
              vs 23 horas del sector
            </p>
          }
        />
        <KpiCard
          label="Citas agendadas"
          value={kpis.appointments.value}
          delta={kpis.appointments.deltaPct}
          icon={Calendar}
          accent="var(--electric)"
        />
        <KpiCard
          label="Pipeline generado"
          value={kpis.pipelineMxn.value}
          formatAsMxn
          delta={null}
          icon={TrendingUp}
          accent="var(--electric)"
          valueColor="var(--electric)"
          tooltip="Estimado basado en tu comisión promedio y tus leads calificados con intención alta/media"
          extra={
            <p className="mt-2 text-[11px]" style={{ color: "var(--slate)" }}>
              {kpis.pipelineMxn.qualifiedActive} leads calificados activos
            </p>
          }
        />
      </section>

      {/* FILA 2 — Gráfica + Feed */}
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Card>
            <header className="flex items-end justify-between px-5 pt-5">
              <div>
                <h2 className="text-[16px] font-semibold" style={{ color: "var(--platinum)" }}>
                  Leads atendidos
                </h2>
                <p className="text-[12px]" style={{ color: "var(--slate)" }}>
                  {periodLabel(period)}
                </p>
              </div>
              <div className="flex items-center gap-3 text-[12px]">
                <Legend dot="var(--electric)" label={`${series.reduce((s, d) => s + d.attended, 0)} atendidos`} />
                <Legend dot="var(--red-loss)" label="2 sin respuesta" />
              </div>
            </header>
            <div className="h-[280px] px-2 pb-2 pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={series} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(30,95,255,0.4)" />
                      <stop offset="100%" stopColor="rgba(30,95,255,0)" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="var(--steel)" strokeOpacity={0.3} vertical={false} />
                  <XAxis
                    dataKey="label"
                    stroke="var(--slate)"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="var(--slate)"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    width={32}
                  />
                  <Tooltip
                    cursor={{ stroke: "var(--electric)", strokeWidth: 1, strokeDasharray: "3 3" }}
                    contentStyle={{
                      background: "var(--card-bg)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: 10,
                      padding: "8px 12px",
                      backdropFilter: "blur(12px)",
                    }}
                    labelStyle={{ color: "var(--slate)", fontSize: 11 }}
                    itemStyle={{ color: "var(--platinum)", fontSize: 12 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="leads"
                    stroke="var(--electric)"
                    strokeWidth={2}
                    fill="url(#blueGradient)"
                    activeDot={{ r: 5, stroke: "white", strokeWidth: 2, fill: "var(--electric)" }}
                    name="Leads"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div data-tour="feed" className="lg:col-span-5">
          <Card className="flex flex-col">
            <header
              className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: "1px solid var(--steel)" }}
            >
              <h2 className="text-[16px] font-semibold" style={{ color: "var(--platinum)" }}>
                Actividad reciente
              </h2>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                    style={{ background: "var(--success)" }}
                  />
                  <span
                    className="relative inline-flex h-1.5 w-1.5 rounded-full"
                    style={{ background: "var(--success)" }}
                  />
                </span>
                <span className="text-[11px] font-semibold" style={{ color: "var(--success)" }}>
                  En vivo
                </span>
              </div>
            </header>

            <ul className="max-h-[320px] flex-1 overflow-y-auto">
              <AnimatePresence initial={false}>
                {feed.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: -12, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      to="/app/dashboard"
                      className="flex items-start gap-3 px-5 py-3 transition-colors hover:bg-white/[0.02]"
                      style={{ borderBottom: i < feed.length - 1 ? "1px solid var(--steel)" : undefined }}
                    >
                      <span
                        className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                        style={{ background: feedColor(item.type) }}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-2">
                          <p
                            className="truncate text-[13px] font-medium"
                            style={{ color: "var(--platinum)" }}
                          >
                            {item.title}
                          </p>
                          <span
                            className="flex-shrink-0 text-[10px]"
                            style={{ color: "var(--slate)" }}
                          >
                            {relativeTime(item.minutesAgo)}
                          </span>
                        </div>
                        <p
                          className="mt-0.5 truncate text-[12px]"
                          style={{ color: "var(--slate)" }}
                        >
                          {item.detail}
                        </p>
                      </div>
                    </Link>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>

            <Link
              to="/app/leads"
              className="flex items-center justify-center gap-1.5 px-5 py-3 text-[12px] font-semibold transition-colors hover:text-[color:var(--platinum)]"
              style={{ color: "var(--electric)", borderTop: "1px solid var(--steel)" }}
            >
              Ver toda la actividad <ArrowRight size={12} />
            </Link>
          </Card>
        </div>
      </section>

      {/* FILA 3 — Métricas secundarias */}
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Donut canales */}
        <Card>
          <div className="px-5 pt-5">
            <h3 className="text-[15px] font-semibold" style={{ color: "var(--platinum)" }}>
              Leads por canal
            </h3>
          </div>
          <div className="flex items-center gap-2 px-5 pb-5 pt-2">
            <div className="h-[160px] w-[160px] flex-shrink-0">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={channels}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={42}
                    outerRadius={70}
                    stroke="none"
                    paddingAngle={2}
                  >
                    {channels.map((c) => (
                      <Cell key={c.name} fill={c.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="flex-1 space-y-2">
              {channels.map((c) => (
                <li key={c.name} className="flex items-center gap-2 text-[12px]">
                  <span
                    className="h-2 w-2 flex-shrink-0 rounded-sm"
                    style={{ background: c.color }}
                  />
                  <span className="flex-1" style={{ color: "var(--slate-light)" }}>
                    {c.name}
                  </span>
                  <span className="font-semibold tabular" style={{ color: "var(--platinum)" }}>
                    {c.value}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        {/* Pipeline */}
        <Card>
          <div className="px-5 pt-5">
            <h3 className="text-[15px] font-semibold" style={{ color: "var(--platinum)" }}>
              Pipeline de seguimiento
            </h3>
          </div>
          <ul className="space-y-3 px-5 pb-5 pt-3">
            {pipeline.map((row) => (
              <li key={row.label}>
                <div className="mb-1.5 flex items-baseline justify-between text-[12px]">
                  <span style={{ color: "var(--slate-light)" }}>{row.label}</span>
                  <span className="font-semibold tabular" style={{ color: "var(--platinum)" }}>
                    {row.value} leads
                  </span>
                </div>
                <div
                  className="h-1.5 w-full overflow-hidden rounded-full"
                  style={{ background: "var(--steel)" }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(row.value / row.max) * 100}%` }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full"
                    style={{ background: row.color }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Card>

        {/* Próximas citas */}
        <Card>
          <div className="px-5 pt-5">
            <h3 className="text-[15px] font-semibold" style={{ color: "var(--platinum)" }}>
              Citas de hoy y mañana
            </h3>
          </div>
          <ul className="space-y-2 px-5 py-3">
            {upcoming.map((a, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-[10px] p-2.5 transition-colors hover:bg-white/[0.03]"
              >
                <div
                  className="flex w-12 flex-shrink-0 flex-col items-center rounded-[8px] py-1"
                  style={{
                    background: "rgba(30,95,255,0.1)",
                    border: "1px solid rgba(30,95,255,0.2)",
                  }}
                >
                  <span
                    className="text-[9px] font-bold uppercase"
                    style={{ color: "var(--electric)" }}
                  >
                    {a.when}
                  </span>
                  <span
                    className="text-[11px] font-semibold tabular"
                    style={{ color: "var(--platinum)" }}
                  >
                    {a.time}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className="truncate text-[13px] font-medium"
                    style={{ color: "var(--platinum)" }}
                  >
                    {a.name}
                  </p>
                  <p className="truncate text-[11px]" style={{ color: "var(--slate)" }}>
                    {a.property}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className="px-5 pb-4">
            <Link
              to="/app/citas"
              className="flex items-center gap-1 text-[12px] font-semibold transition-colors hover:text-[color:var(--platinum)]"
              style={{ color: "var(--electric)" }}
            >
              Ver calendario completo <ArrowRight size={12} />
            </Link>
          </div>
        </Card>
      </section>

      {/* Info pipeline disclaimer */}
      <div
        className="flex items-start gap-2 rounded-[12px] p-3"
        style={{
          background: "rgba(30,95,255,0.04)",
          border: "1px solid rgba(30,95,255,0.12)",
        }}
      >
        <Info size={14} className="mt-0.5 flex-shrink-0" style={{ color: "var(--electric)" }} />
        <p className="text-[11px]" style={{ color: "var(--slate-light)" }}>
          Los datos del dashboard se actualizan cada 30 segundos automáticamente. El pipeline
          estimado depende de tu comisión promedio configurada en{" "}
          <Link to="/app/configuracion" className="underline" style={{ color: "var(--electric)" }}>
            configuración
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

/* ──────────────────────────── helpers ──────────────────────────── */

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[14px] ${className ?? ""}`}
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--border-subtle)",
        backdropFilter: "blur(12px)",
      }}
    >
      {children}
    </div>
  );
}

function Legend({ dot, label }: { dot: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="h-2 w-2 rounded-full" style={{ background: dot }} />
      <span style={{ color: "var(--slate)" }}>{label}</span>
    </div>
  );
}

function KpiCard({
  label,
  value,
  suffix,
  delta,
  deltaInverted,
  icon: Icon,
  accent,
  valueColor,
  formatAsMxn,
  extra,
  tooltip,
}: {
  label: string;
  value: number;
  suffix?: string;
  delta: number | null;
  deltaInverted?: boolean;
  icon: typeof Users;
  accent: string;
  valueColor?: string;
  formatAsMxn?: boolean;
  extra?: React.ReactNode;
  tooltip?: string;
}) {
  const positive = delta !== null && (deltaInverted ? delta < 0 : delta > 0);
  const showDelta = delta !== null;

  return (
    <div
      className="group relative rounded-[14px] p-5 transition-all hover:-translate-y-0.5"
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--border-subtle)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="flex items-start justify-between">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-[10px]"
          style={{ background: "rgba(30,95,255,0.1)" }}
        >
          <Icon size={18} style={{ color: accent }} />
        </div>
        {tooltip && (
          <div className="group/tip relative">
            <Info size={14} style={{ color: "var(--slate)" }} />
            <div className="pointer-events-none absolute right-0 top-6 z-10 w-[220px] rounded-[8px] p-2.5 text-[11px] opacity-0 transition-opacity group-hover/tip:opacity-100"
              style={{
                background: "var(--midnight)",
                border: "1px solid var(--steel-light)",
                color: "var(--slate-light)",
              }}
            >
              {tooltip}
            </div>
          </div>
        )}
      </div>

      <p
        className="mt-4 text-[11px] font-semibold uppercase"
        style={{ color: "var(--slate)", letterSpacing: "0.06em" }}
      >
        {label}
      </p>

      <div className="mt-1 flex items-baseline gap-2">
        <span
          className="text-[34px] font-bold tabular leading-none"
          style={{ color: valueColor ?? "var(--platinum)" }}
        >
          {formatAsMxn ? (
            formatMxn(value) + " MXN"
          ) : (
            <>
              <CountUp end={value} duration={1.4} preserveValue separator="," />
              {suffix}
            </>
          )}
        </span>
      </div>

      {showDelta && (
        <div
          className="mt-2 flex items-center gap-1 text-[12px] font-semibold"
          style={{ color: positive ? "var(--success)" : "var(--red-loss)" }}
        >
          {positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {Math.abs(delta!)}% vs periodo anterior
        </div>
      )}

      {extra}
    </div>
  );
}

function feedColor(t: FeedItem["type"]): string {
  switch (t) {
    case "qualified":
    case "appointment":
      return "var(--success)";
    case "in_progress":
      return "var(--electric)";
    case "pending":
      return "var(--amber)";
    case "cold":
      return "var(--red-loss)";
  }
}

function periodLabel(p: ReturnType<typeof usePeriod>["period"]): string {
  switch (p) {
    case "today":
      return "Hoy";
    case "7d":
      return "Últimos 7 días";
    case "30d":
      return "Últimos 30 días";
    case "90d":
      return "Últimos 90 días";
  }
}
