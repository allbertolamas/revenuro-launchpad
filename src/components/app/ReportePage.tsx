import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
  Calendar,
  DollarSign,
  Target,
  Sparkles,
  Loader2,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
  Bar,
  BarChart,
  Cell,
} from "recharts";
import {
  getReportSummary,
  getTrend,
  getChannelBreakdown,
  getTopProperties,
  getResponseDistribution,
  formatMxn,
  RANGE_LABELS,
  type ReportRange,
} from "@/lib/mock-reporte";

export function ReportePage() {
  const [range, setRange] = useState<ReportRange>("30d");
  const [exporting, setExporting] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const summary = useMemo(() => getReportSummary(range), [range]);
  const trend = useMemo(() => getTrend(range), [range]);
  const channels = useMemo(() => getChannelBreakdown(), []);
  const properties = useMemo(() => getTopProperties(), []);
  const distribution = useMemo(() => getResponseDistribution(), []);

  const handleExportPDF = async () => {
    if (!reportRef.current) return;
    setExporting(true);
    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      const canvas = await html2canvas(reportRef.current, {
        backgroundColor: "#080e1d",
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.92);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;
      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const today = new Date().toISOString().slice(0, 10);
      pdf.save(`brerev-reporte-${today}.pdf`);
    } finally {
      setExporting(false);
    }
  };

  const ranges: ReportRange[] = ["7d", "30d", "90d", "ytd"];

  return (
    <div className="mx-auto max-w-[1280px] space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-[22px] font-bold" style={{ color: "var(--platinum)" }}>
            Reporte de desempeño
          </h2>
          <p className="mt-1 text-[13px]" style={{ color: "var(--slate)" }}>
            Métricas reales del sistema · {RANGE_LABELS[range]}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div
            className="flex items-center gap-1 rounded-full p-1"
            style={{ background: "var(--steel)" }}
          >
            {ranges.map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className="rounded-full px-3 py-1 text-[12px] font-semibold transition-all"
                style={{
                  background: range === r ? "var(--electric)" : "transparent",
                  color: range === r ? "white" : "var(--slate)",
                }}
              >
                {r === "ytd" ? "YTD" : r.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            onClick={handleExportPDF}
            disabled={exporting}
            className="flex items-center gap-2 rounded-[10px] px-4 py-2 text-[13px] font-semibold text-white transition-all hover:brightness-110 disabled:opacity-60"
            style={{ background: "var(--electric)" }}
          >
            {exporting ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Generando PDF...
              </>
            ) : (
              <>
                <Download size={14} />
                Descargar PDF
              </>
            )}
          </button>
        </div>
      </div>

      {/* CONTENIDO EXPORTABLE */}
      <div ref={reportRef} className="space-y-6 p-1">
        {/* Header dentro del PDF */}
        <div
          className="flex items-center justify-between rounded-[14px] p-5"
          style={{
            background: "linear-gradient(135deg, rgba(30,95,255,0.12), rgba(30,95,255,0.02))",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--electric)" }}>
              Brerev — Reporte de desempeño
            </p>
            <h3 className="mt-1 text-[20px] font-bold" style={{ color: "var(--platinum)" }}>
              {RANGE_LABELS[range]}
            </h3>
          </div>
          <div className="text-right">
            <p className="text-[11px]" style={{ color: "var(--slate)" }}>
              Generado
            </p>
            <p className="text-[13px] font-semibold" style={{ color: "var(--platinum)" }}>
              {new Date().toLocaleDateString("es-MX", { day: "2-digit", month: "long", year: "numeric" })}
            </p>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <KpiCard
            icon={Users}
            label="Leads totales"
            value={summary.leadsTotal.toLocaleString("es-MX")}
            sub={`${summary.attendedPct}% atendidos`}
            delta={12}
          />
          <KpiCard
            icon={Clock}
            label="Respuesta promedio"
            value={`${summary.avgResponseSec}s`}
            sub="vs. 4h sin sistema"
            delta={-18}
          />
          <KpiCard
            icon={Calendar}
            label="Citas agendadas"
            value={summary.appointments.toLocaleString("es-MX")}
            sub={`${summary.appointmentsClosed} cerradas`}
            delta={8}
          />
          <KpiCard
            icon={DollarSign}
            label="Pipeline generado"
            value={formatMxn(summary.pipelineMxn)}
            sub={`${formatMxn(summary.closedMxn)} cerrado`}
            delta={22}
          />
        </div>

        {/* Tendencia */}
        <Card title="Tendencia de leads y citas">
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="rep-leads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1e5fff" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="#1e5fff" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="rep-att" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00d68f" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#00d68f" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(42,58,92,0.4)" vertical={false} />
                <XAxis dataKey="label" tick={{ fill: "#7a8db5", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#7a8db5", fontSize: 11 }} axisLine={false} tickLine={false} />
                <RTooltip
                  contentStyle={{
                    background: "rgba(8,14,29,0.95)",
                    border: "1px solid var(--steel)",
                    borderRadius: 8,
                    color: "var(--platinum)",
                  }}
                />
                <Area type="monotone" dataKey="leads" stroke="#1e5fff" strokeWidth={2} fill="url(#rep-leads)" />
                <Area type="monotone" dataKey="attended" stroke="#00d68f" strokeWidth={2} fill="url(#rep-att)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Doble columna */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card title="Desglose por canal">
            <div className="space-y-4">
              {channels.map((c) => (
                <div key={c.channel}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <p className="text-[13px] font-medium" style={{ color: "var(--platinum)" }}>
                      {c.channel}
                    </p>
                    <p className="text-[12px]" style={{ color: "var(--slate)" }}>
                      {c.leads.toLocaleString("es-MX")} leads · {c.pct}%
                    </p>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full" style={{ background: "var(--steel)" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${c.pct}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ background: "var(--electric)" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Velocidad de respuesta">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={distribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(42,58,92,0.4)" vertical={false} />
                  <XAxis dataKey="range" tick={{ fill: "#7a8db5", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#7a8db5", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <RTooltip
                    contentStyle={{
                      background: "rgba(8,14,29,0.95)",
                      border: "1px solid var(--steel)",
                      borderRadius: 8,
                      color: "var(--platinum)",
                    }}
                  />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                    {distribution.map((d, i) => (
                      <Cell key={i} fill={i === 0 ? "#00d68f" : i < 2 ? "#1e5fff" : "#ffb020"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-3 text-[12px]" style={{ color: "var(--slate)" }}>
              El 92% de tus leads recibió respuesta en menos de 30 segundos.
            </p>
          </Card>
        </div>

        {/* Top propiedades */}
        <Card title="Propiedades con más interés">
          <div className="space-y-2">
            {properties.map((p, i) => (
              <div
                key={p.property}
                className="flex items-center gap-3 rounded-[10px] px-3 py-2.5"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <div
                  className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
                  style={{
                    background: i === 0 ? "var(--electric)" : "var(--steel)",
                    color: i === 0 ? "white" : "var(--slate-light)",
                  }}
                >
                  {i + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium" style={{ color: "var(--platinum)" }}>
                    {p.property}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[13px] font-semibold" style={{ color: "var(--platinum)" }}>
                    {p.leads}
                  </p>
                  <p className="text-[10px]" style={{ color: "var(--slate)" }}>
                    leads
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[13px] font-semibold" style={{ color: "var(--success)" }}>
                    {p.appointments}
                  </p>
                  <p className="text-[10px]" style={{ color: "var(--slate)" }}>
                    citas
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* ROI */}
        <Card title="Resumen ejecutivo">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <RoiBlock
              icon={Target}
              label="Tasa de conversión"
              value={`${summary.conversionPct}%`}
              caption="Lead → Cita cerrada"
            />
            <RoiBlock
              icon={Clock}
              label="Horas ahorradas"
              value={`${summary.hoursSaved}h`}
              caption="vs. atención manual"
            />
            <RoiBlock
              icon={Sparkles}
              label="Pipeline generado"
              value={formatMxn(summary.pipelineMxn)}
              caption={`${formatMxn(summary.closedMxn)} ya cerrado`}
            />
          </div>
        </Card>

        {/* Footer del PDF */}
        <div
          className="flex items-center justify-between rounded-[10px] px-4 py-3 text-[11px]"
          style={{ background: "rgba(255,255,255,0.02)", color: "var(--slate)" }}
        >
          <span>Brerev · Sistema de respuesta a leads inmobiliarios</span>
          <span>brerev.com</span>
        </div>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[14px] p-5"
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      <h3 className="mb-4 text-[14px] font-semibold" style={{ color: "var(--platinum)" }}>
        {title}
      </h3>
      {children}
    </motion.div>
  );
}

function KpiCard({
  icon: Icon,
  label,
  value,
  sub,
  delta,
}: {
  icon: typeof Users;
  label: string;
  value: string;
  sub: string;
  delta: number;
}) {
  const positive = delta > 0;
  const Trend = positive ? TrendingUp : TrendingDown;
  const color = delta === 0 ? "var(--slate)" : positive ? "var(--success)" : "var(--red-loss)";
  const isInverse = label.includes("Respuesta");
  const goodColor = isInverse
    ? delta < 0
      ? "var(--success)"
      : "var(--red-loss)"
    : color;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[14px] p-4"
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      <div className="flex items-start justify-between">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-[10px]"
          style={{ background: "rgba(30,95,255,0.1)" }}
        >
          <Icon size={16} style={{ color: "var(--electric)" }} />
        </div>
        <span
          className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold"
          style={{
            background: "rgba(0,214,143,0.08)",
            color: goodColor,
          }}
        >
          <Trend size={10} />
          {Math.abs(delta)}%
        </span>
      </div>
      <p className="mt-3 text-[11px] uppercase tracking-wider" style={{ color: "var(--slate)" }}>
        {label}
      </p>
      <p className="mt-1 text-[24px] font-bold" style={{ color: "var(--platinum)" }}>
        {value}
      </p>
      <p className="mt-0.5 text-[11px]" style={{ color: "var(--slate)" }}>
        {sub}
      </p>
    </motion.div>
  );
}

function RoiBlock({
  icon: Icon,
  label,
  value,
  caption,
}: {
  icon: typeof Target;
  label: string;
  value: string;
  caption: string;
}) {
  return (
    <div
      className="rounded-[12px] p-4 text-center"
      style={{ background: "rgba(30,95,255,0.06)", border: "1px solid rgba(30,95,255,0.15)" }}
    >
      <Icon size={20} className="mx-auto" style={{ color: "var(--electric)" }} />
      <p className="mt-2 text-[11px] uppercase tracking-wider" style={{ color: "var(--slate)" }}>
        {label}
      </p>
      <p className="mt-1 text-[22px] font-bold" style={{ color: "var(--platinum)" }}>
        {value}
      </p>
      <p className="mt-1 text-[11px]" style={{ color: "var(--slate)" }}>
        {caption}
      </p>
    </div>
  );
}
