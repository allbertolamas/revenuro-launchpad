import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  Bell,
  XCircle,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  STATUS_COMPONENTS,
  getDays,
  getUptimePct,
  getRecentIncidents,
  getOverallStatus,
  type ComponentStatus,
  type DayStatus,
} from "@/lib/mock-status";

export function StatusPage() {
  const overall = getOverallStatus();
  const incidents = getRecentIncidents();
  const [lastChecked, setLastChecked] = useState<number>(2);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Polling simulado cada 60s
  useEffect(() => {
    const t = setInterval(() => setLastChecked(1), 60000);
    return () => clearInterval(t);
  }, []);

  const conf = useMemo(() => statusConf(overall), [overall]);

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--midnight)" }}
    >
      {/* Header */}
      <header
        className="flex items-center justify-between px-6 py-5"
        style={{ borderBottom: "1px solid var(--steel)" }}
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[14px] transition-colors hover:text-white"
          style={{ color: "var(--slate)" }}
        >
          <ArrowLeft size={16} />
          Volver a brerev.com
        </Link>
        <p
          className="text-[18px] font-bold tracking-tight"
          style={{ color: "var(--platinum)" }}
        >
          BREREV
        </p>
        <div className="w-32" />
      </header>

      <main className="mx-auto max-w-[760px] px-5 py-12 sm:px-6">
        {/* Hero status */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[20px] p-8 text-center sm:p-10"
          style={{
            background: conf.heroBg,
            border: `2px solid ${conf.heroBorder}`,
          }}
        >
          <div
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full"
            style={{ background: `${conf.color}26` }}
          >
            <conf.Icon size={32} style={{ color: conf.color }} />
          </div>
          <h1
            className="mt-4 text-[24px] font-bold sm:text-[28px]"
            style={{ color: conf.color, letterSpacing: "-0.01em" }}
          >
            {conf.headline}
          </h1>
          <p
            className="mt-2 text-[14px]"
            style={{ color: "var(--slate)" }}
          >
            Última verificación: hace {lastChecked} min
          </p>
        </motion.div>

        {/* Componentes */}
        <section className="mt-10">
          <h2
            className="mb-4 text-[18px] font-semibold"
            style={{ color: "var(--platinum)" }}
          >
            Estado por componente
          </h2>
          <div className="space-y-2">
            {STATUS_COMPONENTS.map((c) => (
              <ComponentRow key={c.id} c={c} />
            ))}
          </div>
        </section>

        {/* Uptime 90 días */}
        <section className="mt-10">
          <h2
            className="mb-4 text-[18px] font-semibold"
            style={{ color: "var(--platinum)" }}
          >
            Uptime últimos 90 días
          </h2>
          <div
            className="space-y-3 rounded-[16px] p-5"
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            {STATUS_COMPONENTS.map((c) => (
              <UptimeRow key={c.id} component={c.name} componentId={c.id} />
            ))}
          </div>
        </section>

        {/* Incidentes */}
        <section className="mt-10">
          <h2
            className="mb-4 text-[18px] font-semibold"
            style={{ color: "var(--platinum)" }}
          >
            Historial de incidentes
          </h2>
          {incidents.length === 0 ? (
            <div
              className="rounded-[16px] p-6 text-center"
              style={{
                background: "rgba(0,214,143,0.06)",
                border: "1px solid rgba(0,214,143,0.2)",
              }}
            >
              <p
                className="text-[15px] font-medium"
                style={{ color: "var(--success)" }}
              >
                Sin incidentes en los últimos 90 días ✓
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {incidents.map((inc) => (
                <div
                  key={inc.id}
                  className="rounded-[12px] p-4"
                  style={{
                    background: "var(--card-bg)",
                    border: "1px solid var(--border-subtle)",
                    borderLeft: `3px solid ${
                      inc.severity === "minor"
                        ? "var(--amber)"
                        : "var(--red-loss)"
                    }`,
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <p
                      className="text-[14px] font-semibold"
                      style={{ color: "var(--platinum)" }}
                    >
                      {inc.title}
                    </p>
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase"
                      style={{
                        background:
                          inc.severity === "minor"
                            ? "rgba(255,176,32,0.15)"
                            : "rgba(255,71,87,0.15)",
                        color:
                          inc.severity === "minor"
                            ? "var(--amber)"
                            : "var(--red-loss)",
                      }}
                    >
                      {inc.severity}
                    </span>
                  </div>
                  <p
                    className="mt-1 text-[13px]"
                    style={{ color: "var(--slate-light)", lineHeight: 1.5 }}
                  >
                    {inc.description}
                  </p>
                  <p
                    className="mt-2 text-[12px]"
                    style={{ color: "var(--slate)" }}
                  >
                    {inc.component} ·{" "}
                    {new Date(inc.startedAt).toLocaleDateString("es-MX", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    · Resuelto en{" "}
                    {Math.round((inc.resolvedAt - inc.startedAt) / 60000)} min
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Suscripción */}
        <section className="mt-10">
          <div
            className="rounded-[16px] p-6"
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <div className="mb-3 flex items-center gap-2">
              <Bell size={18} style={{ color: "var(--electric)" }} />
              <h3
                className="text-[16px] font-semibold"
                style={{ color: "var(--platinum)" }}
              >
                Recibe alertas de incidentes
              </h3>
            </div>
            <p
              className="mb-4 text-[13px]"
              style={{ color: "var(--slate)" }}
            >
              Te notificamos por email cuando algo cambie.
            </p>
            {subscribed ? (
              <div
                className="flex items-center gap-2 rounded-[10px] px-4 py-3 text-[14px]"
                style={{
                  background: "rgba(0,214,143,0.08)",
                  color: "var(--success)",
                  border: "1px solid rgba(0,214,143,0.2)",
                }}
              >
                <CheckCircle2 size={16} /> Suscrito a alertas. Te avisaremos a {email}.
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email) setSubscribed(true);
                }}
                className="flex flex-col gap-2 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  className="flex-1 rounded-[10px] px-4 py-3 text-[14px] outline-none transition-colors"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--steel-light)",
                    color: "var(--platinum)",
                  }}
                />
                <button
                  type="submit"
                  className="rounded-[10px] px-5 py-3 text-[14px] font-semibold text-white transition-all hover:brightness-110"
                  style={{
                    background: "var(--electric)",
                    boxShadow: "0 4px 14px rgba(30,95,255,0.25)",
                  }}
                >
                  Suscribirme
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <footer className="px-6 py-8 text-center">
        <p className="text-[12px]" style={{ color: "var(--slate)" }}>
          © {new Date().getFullYear()} Brerev · Status actualizado cada 60 segundos
        </p>
      </footer>
    </div>
  );
}

function ComponentRow({
  c,
}: {
  c: { id: string; name: string; description: string; status: ComponentStatus };
}) {
  const conf = statusConf(c.status);
  return (
    <div
      className="flex items-center justify-between gap-4 rounded-[12px] px-5 py-4"
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      <div className="min-w-0 flex-1">
        <p
          className="text-[15px] font-semibold"
          style={{ color: "var(--platinum)" }}
        >
          {c.name}
        </p>
        <p className="mt-0.5 text-[13px]" style={{ color: "var(--slate)" }}>
          {c.description}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: conf.color }}
        />
        <span
          className="text-[13px] font-medium"
          style={{ color: conf.color }}
        >
          {conf.label}
        </span>
      </div>
    </div>
  );
}

function UptimeRow({
  component,
  componentId,
}: {
  component: string;
  componentId: string;
}) {
  const days = getDays(componentId);
  const pct = getUptimePct(componentId);

  const dayColor = (s: DayStatus) => {
    if (s === "ok") return "var(--success)";
    if (s === "minor") return "var(--amber)";
    if (s === "major") return "var(--red-loss)";
    return "var(--steel-light)";
  };

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-[12px]">
        <span style={{ color: "var(--slate-light)" }}>{component}</span>
        <span
          className="tabular font-semibold"
          style={{ color: "var(--success)" }}
        >
          {pct.toFixed(1)}% uptime
        </span>
      </div>
      <div className="flex h-8 items-stretch gap-[2px]">
        {days.map((d, i) => (
          <div
            key={i}
            title={`Día ${90 - i}: ${d}`}
            className="flex-1 rounded-[2px] transition-opacity hover:opacity-70"
            style={{ background: dayColor(d), minWidth: 2 }}
          />
        ))}
      </div>
    </div>
  );
}

function statusConf(s: ComponentStatus) {
  if (s === "operational") {
    return {
      label: "Operacional",
      color: "var(--success)",
      heroBg: "rgba(0,214,143,0.06)",
      heroBorder: "rgba(0,214,143,0.25)",
      headline: "Todos los sistemas operando normalmente",
      Icon: CheckCircle2,
    };
  }
  if (s === "degraded") {
    return {
      label: "Degradado",
      color: "var(--amber)",
      heroBg: "rgba(255,176,32,0.06)",
      heroBorder: "rgba(255,176,32,0.3)",
      headline: "Algunos servicios con desempeño degradado",
      Icon: AlertTriangle,
    };
  }
  return {
    label: "Interrupción",
    color: "var(--red-loss)",
    heroBg: "rgba(255,71,87,0.06)",
    heroBorder: "rgba(255,71,87,0.3)",
    headline: "Detectamos una interrupción del servicio",
    Icon: XCircle,
  };
}
