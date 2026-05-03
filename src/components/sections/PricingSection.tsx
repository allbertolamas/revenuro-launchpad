import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

type Plan = {
  name: string;
  monthly: number;
  yearly: number;
  subtitle: string;
  features: string[];
  cta: string;
  activeCount: number;
  highlight?: boolean;
  ghost?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Closer Lite",
    monthly: 99,
    yearly: 82,
    subtitle: "Para el asesor que quiere empezar a no perder leads",
    activeCount: 47,
    features: [
      "1 agente activo",
      "WhatsApp + llamadas + formularios",
      "Respuesta en menos de 12 segundos, 24/7",
      "Calificación básica de leads",
      "Agendado automático en tu calendario",
      "Recordatorios automáticos de citas",
      "Seguimiento hasta 14 días",
      "150 min de voz / 300 conversaciones",
      "Dashboard de métricas básico",
    ],
    cta: "Probar 5 días gratis",
    ghost: true,
  },
  {
    name: "Revenue Engine",
    monthly: 199,
    yearly: 165,
    subtitle: "Para el asesor serio que ya invierte en leads",
    activeCount: 128,
    features: [
      "Todo lo del plan anterior",
      "Hasta 3 agentes activos",
      "Todos los canales: WhatsApp, llamadas, SMS, formularios",
      "Calificación avanzada con scoring de intención",
      "Routing automático entre agentes",
      "Seguimiento y reactivación hasta 60 días",
      "Editor completo de mensajes del sistema",
      "Integración con CRM inmobiliario (Tokko, WebProp)",
      "Alertas en tiempo real de leads calientes",
      "Reactivación automática de leads fríos",
      "500 min de voz / 1,000 conversaciones",
      "Dashboard completo con pipeline en MXN",
      "Configuración guiada incluida",
    ],
    cta: "Activar Revenue Engine",
    highlight: true,
  },
  {
    name: "Deal Machine",
    monthly: 399,
    yearly: 332,
    subtitle: "Para equipos que quieren máxima conversión",
    activeCount: 23,
    features: [
      "Todo lo del plan anterior",
      "Hasta 5 agentes activos",
      "Workflows personalizados por propiedad, zona y canal",
      "Seguimiento extendido hasta 90+ días",
      "Revenue analytics y estimación de cierres",
      "Onboarding guiado con el equipo incluido",
      "1,500 min de voz / 3,000 conversaciones",
      "Integraciones avanzadas sin límite",
      "Opción: +0.5% sobre cierres atribuibles al sistema",
    ],
    cta: "Probar 5 días gratis",
    ghost: true,
  },
];

function PriceFlip({ price }: { price: number }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={price}
        initial={{ rotateX: 90, opacity: 0 }}
        animate={{ rotateX: 0, opacity: 1 }}
        exit={{ rotateX: -90, opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="tabular text-[44px] sm:text-[52px] font-extrabold text-[color:var(--platinum)]"
      >
        ${price}
        <span className="text-[16px] font-medium text-[color:var(--slate)]"> USD/mes</span>
      </motion.div>
    </AnimatePresence>
  );
}

export function PricingSection() {
  const [yearly, setYearly] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section
      id="precios"
      className="relative"
      style={{ background: "var(--midnight)", paddingTop: "120px", paddingBottom: "120px" }}
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p
            className="text-[11px] font-semibold uppercase text-[color:var(--electric)]"
            style={{ letterSpacing: "0.14em" }}
          >
            Planes
          </p>
          <h2 className="mt-4 text-[36px] sm:text-[44px] lg:text-[52px] font-bold leading-[1.1] tracking-[-0.02em] text-[color:var(--platinum)]">
            ¿Cuánto vale no perder un solo lead más?
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-[18px] text-[color:var(--slate)]">
            Si el sistema genera una sola cita adicional que cierra, el plan más caro se paga 30
            veces.
          </p>
        </motion.div>

        {/* Toggle */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <span className={`text-[14px] font-medium ${!yearly ? "text-[color:var(--platinum)]" : "text-[color:var(--slate)]"}`}>
            Mensual
          </span>
          <button
            onClick={() => setYearly(!yearly)}
            className="relative h-7 w-12 rounded-full transition-colors"
            style={{ background: yearly ? "var(--electric)" : "var(--steel-light)" }}
            aria-label="Toggle billing"
          >
            <span
              className="absolute top-1 h-5 w-5 rounded-full bg-white transition-transform"
              style={{ transform: yearly ? "translateX(22px)" : "translateX(4px)" }}
            />
          </button>
          <span className={`text-[14px] font-medium ${yearly ? "text-[color:var(--platinum)]" : "text-[color:var(--slate)]"}`}>
            Anual <span className="text-[color:var(--success)]">— 2 meses gratis</span>
          </span>
        </div>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-stretch">
          {PLANS.map((p, i) => {
            const isSelected = selected === p.name;
            return (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              animate={isSelected ? { scale: [1, 1.04, 1.02] } : {}}
              onClick={() => setSelected(p.name)}
              className={`relative flex cursor-pointer flex-col rounded-[18px] p-8 transition-all ${p.highlight ? "lg:scale-[1.03]" : ""}`}
              style={{
                background: p.highlight ? "rgba(15,30,61,0.95)" : "var(--card-bg)",
                border: isSelected
                  ? "1px solid var(--electric)"
                  : p.highlight
                  ? "1px solid rgba(30,95,255,0.4)"
                  : "1px solid var(--border-subtle)",
                backdropFilter: "blur(12px)",
                boxShadow: isSelected
                  ? "0 0 0 2px rgba(30,95,255,0.35), 0 40px 80px rgba(0,0,0,0.5), 0 0 80px rgba(30,95,255,0.18)"
                  : p.highlight
                  ? "0 0 0 1px rgba(30,95,255,0.2), 0 40px 80px rgba(0,0,0,0.5), 0 0 60px rgba(30,95,255,0.1)"
                  : "none",
              }}
            >
              {p.highlight && (
                <span
                  className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white"
                  style={{ background: "var(--electric)" }}
                >
                  Más elegido
                </span>
              )}

              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 18 }}
                    className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full text-white"
                    style={{ background: "var(--electric)" }}
                  >
                    <Check size={14} strokeWidth={3} />
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <h3 className="text-[20px] font-bold text-[color:var(--platinum)]">{p.name}</h3>
                <p className="mt-1 text-[14px] text-[color:var(--slate)]">{p.subtitle}</p>
              </div>

              <div className="mt-6">
                <PriceFlip price={yearly ? p.yearly : p.monthly} />
              </div>

              <div
                className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium"
                style={{
                  background: "rgba(0,214,143,0.08)",
                  color: "var(--success)",
                }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: "var(--success)" }}
                />
                {p.activeCount} brokers activos en este plan
              </div>

              <ul className="mt-8 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3 text-[14px] text-[color:var(--slate-light)]">
                    <Check size={16} className="mt-0.5 flex-shrink-0 text-[color:var(--success)]" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#cta-final"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className={`mt-8 justify-center ${p.ghost ? "btn-ghost" : "btn-primary"}`}
              >
                {p.cta} {!p.ghost && <span className="arrow">→</span>}
              </a>
            </motion.div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-[13px] text-[color:var(--slate)]">
          Minutos extra: $15 USD / 100 min · Conversaciones extra: $20 USD / 500
        </p>

        <p className="mx-auto mt-10 max-w-[560px] text-center text-[15px] text-[color:var(--slate-light)]">
          ¿Operación más compleja? Nuestro equipo lo configura e integra todo por ti.{" "}
          <a href="#dos-formas" className="font-semibold text-[color:var(--electric)] hover:underline">
            Conocer el servicio de implementación →
          </a>
        </p>
      </div>
    </section>
  );
}
