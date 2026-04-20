import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import { PublicShell } from "@/components/PublicShell";

export const Route = createFileRoute("/precios")({
  head: () => ({
    meta: [
      { title: "Precios — Brerev | Planes desde $99 USD/mes" },
      {
        name: "description",
        content:
          "Compara los planes de Brerev: Closer Lite, Revenue Engine y Deal Machine. 5 días de prueba sin tarjeta.",
      },
      { property: "og:title", content: "Precios — Brerev" },
      {
        property: "og:description",
        content:
          "Elige el sistema comercial que mejor se adapta a tu inmobiliaria. Sin tarjeta de crédito requerida.",
      },
    ],
  }),
  component: PreciosPage,
});

type Plan = {
  id: "lite" | "engine" | "machine";
  name: string;
  monthly: number;
  yearly: number;
  mxn: string;
  description: string;
  highlighted?: boolean;
  features: string[];
  notIncluded?: string[];
  cta: string;
  ghost?: boolean;
};

const PLANS: Plan[] = [
  {
    id: "lite",
    name: "Closer Lite",
    monthly: 99,
    yearly: 82,
    mxn: "~$1,700 MXN",
    description: "Para el asesor que empieza a no perder ningún lead",
    features: [
      "1 agente activo en tu negocio",
      "WhatsApp Business conectado",
      "Llamadas entrantes gestionadas",
      "Formularios web capturados",
      "Respuesta en menos de 12 segundos",
      "Calificación básica de leads",
      "Agendado automático en tu calendario",
      "Recordatorios 24h y 1h antes de cada cita",
      "Seguimiento hasta 14 días",
      "Editor de mensajes del sistema",
      "Dashboard de métricas básico",
      "150 minutos de voz incluidos",
      "300 conversaciones incluidas",
    ],
    notIncluded: [
      "Múltiples agentes",
      "Lead scoring avanzado",
      "Reactivación de leads fríos",
      "Integración CRM inmobiliario",
      "Revenue analytics",
    ],
    cta: "Probar 5 días gratis",
    ghost: true,
  },
  {
    id: "engine",
    name: "Revenue Engine",
    monthly: 199,
    yearly: 165,
    mxn: "~$3,400 MXN",
    description: "Para el asesor serio con inversión activa en leads",
    highlighted: true,
    features: [
      "Todo lo del plan Closer Lite",
      "Hasta 3 agentes activos simultáneos",
      "Todos los canales: WA, llamadas, SMS, formularios",
      "Lead scoring dinámico por intención de compra",
      "Routing automático entre tus agentes",
      "Seguimiento y reactivación hasta 60 días",
      "Reactivación automática de leads fríos",
      "Editor completo de todos los mensajes",
      "Integración con Tokko Broker y WebProp",
      "Alertas en tiempo real de leads calientes",
      "Dashboard completo con pipeline en MXN",
      "Revenue estimado por el sistema cada mes",
      "Configuración guiada incluida",
      "500 minutos de voz incluidos",
      "1,000 conversaciones incluidas",
    ],
    cta: "Activar Revenue Engine",
  },
  {
    id: "machine",
    name: "Deal Machine",
    monthly: 399,
    yearly: 332,
    mxn: "~$6,800 MXN",
    description: "Para equipos que quieren máxima conversión",
    features: [
      "Todo lo del Revenue Engine",
      "Hasta 5 agentes activos simultáneos",
      "Workflows por tipo de propiedad, zona y canal",
      "Seguimiento extendido 90+ días",
      "Revenue analytics y proyección de cierres",
      "Onboarding guiado con el equipo Brerev",
      "Integraciones avanzadas sin límite",
      "1,500 minutos de voz incluidos",
      "3,000 conversaciones incluidas",
      "Soporte prioritario",
      "Opción: +0.5% sobre cierres atribuibles",
    ],
    cta: "Probar 5 días gratis",
    ghost: true,
  },
];

function PriceFlip({ price }: { price: number }) {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={price}
        initial={{ rotateX: 90, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        exit={{ rotateX: -90, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="tabular inline-block text-[56px] font-extrabold leading-none text-[color:var(--platinum)]"
        style={{ transformPerspective: 600 }}
      >
        ${price}
      </motion.span>
    </AnimatePresence>
  );
}

type Row =
  | { type: "group"; label: string }
  | {
      type: "row";
      label: string;
      lite: string | boolean;
      engine: string | boolean;
      machine: string | boolean;
    };

const COMPARISON: Row[] = [
  { type: "group", label: "Canales y captura" },
  { type: "row", label: "WhatsApp Business", lite: true, engine: true, machine: true },
  { type: "row", label: "Llamadas entrantes", lite: true, engine: true, machine: true },
  { type: "row", label: "Formularios web", lite: true, engine: true, machine: true },
  { type: "row", label: "SMS", lite: false, engine: true, machine: true },
  { type: "row", label: "Redes sociales", lite: false, engine: true, machine: true },

  { type: "group", label: "Ejecución comercial" },
  { type: "row", label: "Respuesta < 12 seg 24/7", lite: true, engine: true, machine: true },
  { type: "row", label: "Calificación de leads", lite: "Básica", engine: "Avanzada", machine: "Avanzada" },
  { type: "row", label: "Lead scoring", lite: false, engine: true, machine: true },
  { type: "row", label: "Agendado automático", lite: true, engine: true, machine: true },
  { type: "row", label: "Seguimiento", lite: "14 días", engine: "60 días", machine: "90+ días" },
  { type: "row", label: "Reactivación leads fríos", lite: false, engine: true, machine: true },
  { type: "row", label: "Routing entre agentes", lite: false, engine: true, machine: true },

  { type: "group", label: "Integraciones" },
  { type: "row", label: "Google Calendar", lite: true, engine: true, machine: true },
  { type: "row", label: "Tokko Broker", lite: false, engine: true, machine: true },
  { type: "row", label: "WebProp", lite: false, engine: true, machine: true },
  { type: "row", label: "CRM personalizado", lite: false, engine: false, machine: true },
  { type: "row", label: "Portales (Inmuebles24)", lite: true, engine: true, machine: true },

  { type: "group", label: "Visibilidad y control" },
  { type: "row", label: "Editor de mensajes", lite: true, engine: true, machine: true },
  { type: "row", label: "Dashboard de métricas", lite: "Básico", engine: "Completo", machine: "Completo" },
  { type: "row", label: "Revenue estimado", lite: false, engine: true, machine: true },
  { type: "row", label: "Proyección de cierres", lite: false, engine: false, machine: true },
  { type: "row", label: "Alertas leads calientes", lite: false, engine: true, machine: true },

  { type: "group", label: "Capacidad" },
  { type: "row", label: "Agentes activos", lite: "1", engine: "3", machine: "5" },
  { type: "row", label: "Minutos de voz", lite: "150", engine: "500", machine: "1,500" },
  { type: "row", label: "Conversaciones", lite: "300", engine: "1,000", machine: "3,000" },

  { type: "group", label: "Soporte" },
  { type: "row", label: "Onboarding", lite: "Self-serve", engine: "Guiado", machine: "Dedicado" },
  { type: "row", label: "Soporte", lite: "Email", engine: "Prioritario", machine: "Prioritario +" },
  { type: "row", label: "Revenue sharing", lite: false, engine: false, machine: "+0.5% opcional" },
];

const FAQ_ITEMS = [
  {
    q: "¿Puedo cambiar de plan cuando quiera?",
    a: "Sí. Puedes hacer upgrade o downgrade desde tu dashboard en cualquier momento. Los cambios aplican al siguiente ciclo de facturación.",
  },
  {
    q: "¿Qué pasa si supero mis minutos o conversaciones?",
    a: "El sistema te avisa cuando alcanzas el 80% de tu límite. Si lo superas, se aplica el cargo de overage automáticamente. Nunca se corta el servicio sin aviso.",
  },
  {
    q: "¿El plan anual requiere pago completo por adelantado?",
    a: "Sí, el plan anual se paga en un solo cobro con el descuento de 2 meses incluido. Si cancelas antes del año, no hay reembolso proporcional.",
  },
];

function CellValue({ value }: { value: string | boolean }) {
  if (value === true) {
    return <Check size={18} className="mx-auto text-[color:var(--success)]" strokeWidth={2.5} />;
  }
  if (value === false) {
    return <X size={18} className="mx-auto text-[color:var(--slate)] opacity-40" />;
  }
  return <span className="font-semibold text-[color:var(--platinum)]">{value}</span>;
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full text-left rounded-2xl border p-6 transition-colors duration-300"
      style={{
        background: "var(--card-bg)",
        borderColor: open ? "rgba(30,95,255,0.35)" : "var(--border-subtle)",
      }}
    >
      <div className="flex items-center justify-between gap-6">
        <h3 className="text-[17px] font-semibold text-[color:var(--platinum)]">{q}</h3>
        <span
          className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[color:var(--electric)] transition-transform duration-300"
          style={{ background: "rgba(30,95,255,0.1)", transform: open ? "rotate(45deg)" : "rotate(0)" }}
        >
          +
        </span>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="mt-4 text-[15px] leading-relaxed text-[color:var(--slate-light)]">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}

function PreciosPage() {
  const [yearly, setYearly] = useState(false);

  return (
    <PublicShell>
      {/* HERO */}
      <section className="relative bg-grid" style={{ background: "var(--midnight)", paddingTop: "140px", paddingBottom: "80px" }}>
        <div className="ambient-glow" />
        <div className="relative mx-auto max-w-[1200px] px-6 text-center">
          <p className="text-[11px] font-semibold uppercase text-[color:var(--electric)]" style={{ letterSpacing: "0.14em" }}>
            Planes y precios
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto mt-4 max-w-[860px] text-[44px] sm:text-[52px] lg:text-[60px] font-extrabold leading-[1.05] tracking-[-0.025em] text-[color:var(--platinum)]"
          >
            Elige el sistema que mejor se{" "}
            <span className="text-shimmer">adapta a tu operación.</span>
          </motion.h1>
          <p className="mx-auto mt-5 max-w-[620px] text-[19px] text-[color:var(--slate)]">
            Todos los planes incluyen 5 días de prueba sin tarjeta de crédito. Cancelas cuando quieras.
          </p>

          {/* Toggle */}
          <div className="mt-10 inline-flex items-center gap-3">
            <div
              className="relative flex items-center rounded-full p-1"
              style={{ background: "var(--steel)" }}
            >
              <button
                onClick={() => setYearly(false)}
                className="relative z-10 px-5 py-2 text-[14px] font-semibold transition-colors"
                style={{ color: !yearly ? "white" : "var(--slate)" }}
              >
                Mensual
              </button>
              <button
                onClick={() => setYearly(true)}
                className="relative z-10 px-5 py-2 text-[14px] font-semibold transition-colors"
                style={{ color: yearly ? "white" : "var(--slate)" }}
              >
                Anual
              </button>
              <motion.div
                className="absolute top-1 bottom-1 rounded-full"
                style={{ background: "var(--electric)" }}
                animate={{ left: yearly ? "50%" : "4px", right: yearly ? "4px" : "50%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </div>
            <AnimatePresence>
              {yearly && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="rounded-full border px-3 py-1.5 text-[12px] font-semibold"
                  style={{
                    background: "rgba(0,214,143,0.15)",
                    borderColor: "rgba(0,214,143,0.3)",
                    color: "var(--success)",
                  }}
                >
                  2 meses gratis
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* PRICING CARDS */}
      <section className="relative" style={{ background: "var(--midnight)", paddingBottom: "80px" }}>
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-stretch">
            {PLANS.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: p.highlighted ? 1 : 0.97, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex flex-col rounded-[20px] p-10 ${p.highlighted ? "lg:scale-[1.04]" : ""}`}
                style={{
                  background: p.highlighted ? "rgba(14,26,60,0.95)" : "var(--card-bg)",
                  border: p.highlighted
                    ? "1px solid rgba(30,95,255,0.35)"
                    : "1px solid var(--border-subtle)",
                  backdropFilter: "blur(12px)",
                  boxShadow: p.highlighted
                    ? "0 0 0 1px rgba(30,95,255,0.15), 0 40px 80px rgba(0,0,0,0.5), 0 0 80px rgba(30,95,255,0.1)"
                    : "none",
                }}
              >
                {p.highlighted && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-1.5 text-[11px] font-bold uppercase text-white"
                    style={{ background: "var(--electric)", letterSpacing: "0.1em" }}
                  >
                    Más elegido
                  </span>
                )}

                <div>
                  <h3 className="text-[20px] font-bold text-[color:var(--platinum)]">{p.name}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-[color:var(--slate)]">
                    {p.description}
                  </p>
                </div>

                <div className="mt-8">
                  <div className="flex items-end gap-2">
                    <PriceFlip price={yearly ? p.yearly : p.monthly} />
                    <span className="text-[16px] font-medium text-[color:var(--slate)] pb-2">/mes</span>
                  </div>
                  <p className="mt-2 text-[12px] text-[color:var(--slate)]">
                    USD · {p.mxn}
                    {yearly && (
                      <span className="ml-2 line-through opacity-60">${p.monthly}/mes</span>
                    )}
                  </p>
                </div>

                <div className="my-6 h-px" style={{ background: "var(--steel)" }} />

                <ul className="flex-1 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-3 text-[15px] text-[color:var(--platinum)]">
                      <Check size={16} className="mt-1 flex-shrink-0 text-[color:var(--success)]" strokeWidth={2.5} />
                      <span>{f}</span>
                    </li>
                  ))}
                  {p.notIncluded?.map((f) => (
                    <li key={f} className="flex gap-3 text-[15px] text-[color:var(--slate)] opacity-60">
                      <X size={16} className="mt-1 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/registro"
                  search={{ plan: p.id }}
                  className={`mt-8 justify-center ${p.ghost ? "btn-ghost" : "btn-primary"}`}
                >
                  {p.cta} {!p.ghost && <span className="arrow">→</span>}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Overage card */}
          <div
            className="mx-auto mt-10 flex max-w-[640px] flex-col items-center justify-center gap-4 rounded-xl px-8 py-5 sm:flex-row sm:gap-10"
            style={{
              background: "rgba(30,95,255,0.04)",
              border: "1px solid rgba(30,95,255,0.12)",
            }}
          >
            <div className="text-center sm:text-left">
              <p className="text-[12px] uppercase text-[color:var(--slate)]" style={{ letterSpacing: "0.1em" }}>
                Minutos extra de voz
              </p>
              <p className="mt-1 text-[15px] font-semibold text-[color:var(--platinum)]">
                $15 USD / 100 minutos
              </p>
            </div>
            <div className="hidden h-10 w-px sm:block" style={{ background: "var(--steel)" }} />
            <div className="text-center sm:text-left">
              <p className="text-[12px] uppercase text-[color:var(--slate)]" style={{ letterSpacing: "0.1em" }}>
                Conversaciones extra
              </p>
              <p className="mt-1 text-[15px] font-semibold text-[color:var(--platinum)]">
                $20 USD / 500 conversaciones
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="relative" style={{ background: "var(--navy)", paddingTop: "100px", paddingBottom: "100px" }}>
        <div className="mx-auto max-w-[1100px] px-6">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase text-[color:var(--electric)]" style={{ letterSpacing: "0.14em" }}>
              Comparación
            </p>
            <h2 className="mt-3 text-[36px] sm:text-[44px] font-bold tracking-[-0.02em] text-[color:var(--platinum)]">
              Comparación detallada
            </h2>
          </div>

          <div
            className="mt-12 overflow-hidden rounded-2xl"
            style={{ background: "var(--card-bg)", border: "1px solid var(--border-subtle)" }}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="sticky top-[72px] z-10" style={{ background: "rgba(8,14,29,0.95)", backdropFilter: "blur(12px)" }}>
                  <tr style={{ borderBottom: "1px solid var(--steel)" }}>
                    <th className="px-6 py-5 text-[13px] font-semibold uppercase text-[color:var(--slate)]" style={{ letterSpacing: "0.08em" }}>
                      Feature
                    </th>
                    <th className="px-6 py-5 text-center text-[14px] font-bold text-[color:var(--platinum)]">
                      Closer Lite
                    </th>
                    <th
                      className="px-6 py-5 text-center text-[14px] font-bold text-[color:var(--platinum)]"
                      style={{
                        background: "rgba(30,95,255,0.08)",
                        borderLeft: "1px solid rgba(30,95,255,0.2)",
                        borderRight: "1px solid rgba(30,95,255,0.2)",
                      }}
                    >
                      Revenue Engine
                    </th>
                    <th className="px-6 py-5 text-center text-[14px] font-bold text-[color:var(--platinum)]">
                      Deal Machine
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row, i) => {
                    if (row.type === "group") {
                      return (
                        <tr key={i} style={{ background: "rgba(30,95,255,0.04)" }}>
                          <td
                            colSpan={4}
                            className="px-6 py-3 text-[12px] font-bold uppercase text-[color:var(--electric)]"
                            style={{ letterSpacing: "0.1em" }}
                          >
                            {row.label}
                          </td>
                        </tr>
                      );
                    }
                    return (
                      <tr
                        key={i}
                        className="transition-colors hover:bg-[rgba(30,95,255,0.03)]"
                        style={{ borderTop: "1px solid var(--steel)" }}
                      >
                        <td className="px-6 py-4 text-[14px] text-[color:var(--slate-light)]">
                          {row.label}
                        </td>
                        <td className="px-6 py-4 text-center text-[14px]">
                          <CellValue value={row.lite} />
                        </td>
                        <td
                          className="px-6 py-4 text-center text-[14px]"
                          style={{
                            background: "rgba(30,95,255,0.04)",
                            borderLeft: "1px solid rgba(30,95,255,0.12)",
                            borderRight: "1px solid rgba(30,95,255,0.12)",
                          }}
                        >
                          <CellValue value={row.engine} />
                        </td>
                        <td className="px-6 py-4 text-center text-[14px]">
                          <CellValue value={row.machine} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative" style={{ background: "var(--midnight)", paddingTop: "100px", paddingBottom: "100px" }}>
        <div className="mx-auto max-w-[760px] px-6">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase text-[color:var(--electric)]" style={{ letterSpacing: "0.14em" }}>
              Preguntas frecuentes
            </p>
            <h2 className="mt-3 text-[36px] sm:text-[44px] font-bold tracking-[-0.02em] text-[color:var(--platinum)]">
              Sobre el cobro y los planes
            </h2>
          </div>
          <div className="mt-10 space-y-4">
            {FAQ_ITEMS.map((item) => (
              <FAQItem key={item.q} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        className="relative"
        style={{ background: "var(--navy)", paddingTop: "100px", paddingBottom: "100px" }}
      >
        <div className="ambient-glow" />
        <div className="relative mx-auto max-w-[760px] px-6 text-center">
          <h2 className="text-[40px] sm:text-[52px] font-extrabold leading-[1.1] tracking-[-0.02em] text-[color:var(--platinum)]">
            Empieza hoy.{" "}
            <span className="text-[color:var(--electric)]">Ve resultados esta semana.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[560px] text-[18px] text-[color:var(--slate)]">
            5 días de prueba sin tarjeta. Tu primer lead atendido en menos de 1 hora desde la activación.
          </p>
          <div className="mt-8">
            <Link to="/registro" className="btn-primary text-[16px]">
              Activar mi plan <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
