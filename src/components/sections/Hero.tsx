import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { PlayCircle } from "lucide-react";

type FeedItem = {
  id: number;
  status: "success" | "active" | "pending";
  title: string;
  meta: string;
  badge: string;
  badgeColor: "success" | "active" | "pending";
};

const SEED_ITEMS: FeedItem[] = [
  {
    id: 1,
    status: "success",
    title: "Lead calificado — 11:47 PM",
    meta: "Carlos M. · Depto 3 rec · Polanco · $4.5M",
    badge: "Cita: Mañana 10:00 AM ✓",
    badgeColor: "success",
  },
  {
    id: 2,
    status: "active",
    title: "Seguimiento activo — 11:31 PM",
    meta: "Ana Torres · Sin confirmar · 18 hrs",
    badge: "Recordatorio enviado",
    badgeColor: "active",
  },
  {
    id: 3,
    status: "pending",
    title: "Lead reactivado — 11:18 PM",
    meta: "Roberto S. · Inactivo 31 días",
    badge: "Respondió · Agendando...",
    badgeColor: "pending",
  },
  {
    id: 4,
    status: "success",
    title: "Cita confirmada — 10:55 PM",
    meta: "María L. · Casa Lomas Verdes",
    badge: "Agenda sincronizada ✓",
    badgeColor: "success",
  },
];

const ROTATING_ITEMS: FeedItem[] = [
  {
    id: 100,
    status: "success",
    title: "Nueva cita — Ahora",
    meta: "Diego H. · Penthouse · Santa Fe · $8.2M",
    badge: "Confirmada ✓",
    badgeColor: "success",
  },
  {
    id: 101,
    status: "active",
    title: "Lead entrando — Ahora",
    meta: "Patricia R. · WhatsApp · Condesa",
    badge: "Calificando...",
    badgeColor: "active",
  },
  {
    id: 102,
    status: "pending",
    title: "Reactivación — Ahora",
    meta: "Luis G. · Inactivo 47 días",
    badge: "Mensaje enviado",
    badgeColor: "pending",
  },
];

function dotColor(s: FeedItem["status"]) {
  if (s === "success") return "var(--success)";
  if (s === "active") return "var(--electric)";
  return "var(--amber)";
}
function badgeStyle(c: FeedItem["badgeColor"]) {
  if (c === "success")
    return { background: "rgba(0,214,143,0.12)", color: "var(--success)", border: "1px solid rgba(0,214,143,0.25)" };
  if (c === "active")
    return { background: "rgba(30,95,255,0.12)", color: "var(--electric)", border: "1px solid rgba(30,95,255,0.25)" };
  return { background: "rgba(255,176,32,0.12)", color: "var(--amber)", border: "1px solid rgba(255,176,32,0.25)" };
}

function DashboardMockup() {
  const [items, setItems] = useState<FeedItem[]>(SEED_ITEMS);
  const [rotIdx, setRotIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setItems((prev) => {
        const next = ROTATING_ITEMS[rotIdx % ROTATING_ITEMS.length];
        setRotIdx((i) => i + 1);
        return [{ ...next, id: Date.now() }, ...prev.slice(0, 3)];
      });
    }, 3500);
    return () => clearInterval(t);
  }, [rotIdx]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-[20px]"
      style={{
        background: "rgba(12,23,48,0.9)",
        border: "1px solid var(--steel-light)",
        boxShadow:
          "0 0 0 1px rgba(30,95,255,0.1), 0 40px 80px rgba(0,0,0,0.5), 0 0 60px rgba(30,95,255,0.08)",
      }}
    >
      {/* Title bar */}
      <div
        className="flex h-11 items-center justify-between px-4"
        style={{ background: "rgba(8,14,29,0.8)", borderBottom: "1px solid var(--steel)" }}
      >
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
        </div>
        <span className="text-[12px] font-medium text-[color:var(--slate)]">
          Brerev — Dashboard
        </span>
        <div className="w-12" />
      </div>

      {/* Header */}
      <div className="px-6 pt-5">
        <div className="text-[14px] font-semibold text-[color:var(--platinum)]">
          Panel de actividad
        </div>
        <div className="text-[12px] text-[color:var(--slate)]">Hoy, 11:52 PM</div>
      </div>

      {/* Feed */}
      <div className="flex flex-col gap-2.5 p-5">
        {items.map((item, idx) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: idx === 0 ? 0 : 0 }}
            className="flex gap-3 rounded-[10px] px-3.5 py-3"
            style={{
              background: "rgba(30,95,255,0.06)",
              border: "1px solid rgba(30,95,255,0.15)",
            }}
          >
            <div
              className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full ${item.status === "active" ? "pulse-dot" : ""}`}
              style={{ background: dotColor(item.status) }}
            />
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold text-[color:var(--platinum)]">
                {item.title}
              </div>
              <div className="text-[12px] text-[color:var(--slate-light)] truncate">
                {item.meta}
              </div>
            </div>
            <span
              className="self-start rounded-md px-2 py-0.5 text-[10px] font-semibold whitespace-nowrap"
              style={badgeStyle(item.badgeColor)}
            >
              {item.badge}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Metrics */}
      <div
        className="grid grid-cols-3 px-6 py-4"
        style={{ borderTop: "1px solid var(--steel)" }}
      >
        {[
          { value: 47, suffix: "", label: "Leads · Este mes" },
          { value: 18, suffix: "", label: "Citas · Agendadas" },
          { value: 2.8, suffix: "M", label: "MXN · Pipeline", prefix: "$", decimals: 1 },
        ].map((m, i) => (
          <div key={i} className="text-center">
            <div className="tabular text-[20px] font-bold text-[color:var(--platinum)]">
              {m.prefix ?? ""}
              <CountUp end={m.value} duration={2.2} decimals={m.decimals ?? 0} enableScrollSpy scrollSpyOnce />
              {m.suffix}
            </div>
            <div className="text-[10px] mt-0.5 text-[color:var(--slate)]">{m.label}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-grid"
      style={{ background: "var(--midnight)", paddingTop: "160px", paddingBottom: "100px" }}
    >
      {/* Halo */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
        style={{
          width: "800px",
          height: "600px",
          background:
            "radial-gradient(ellipse at center, rgba(30,95,255,0.12) 0%, transparent 70%)",
        }}
      />
      <div className="bg-grid absolute inset-0 opacity-100 pointer-events-none" />

      <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-6 lg:grid-cols-[55fr_45fr] lg:gap-10 items-center">
        {/* Left */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5"
            style={{
              background: "rgba(30,95,255,0.1)",
              border: "1px solid rgba(30,95,255,0.25)",
            }}
          >
            <span
              className="pulse-dot h-2 w-2 rounded-full"
              style={{ background: "var(--electric)" }}
            />
            <span
              className="text-[11px] font-semibold text-[color:var(--electric)]"
              style={{ letterSpacing: "0.12em" }}
            >
              INFRAESTRUCTURA COMERCIAL PARA INMOBILIARIAS
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 font-extrabold text-[color:var(--platinum)] text-[42px] leading-[1.04] tracking-[-0.03em] sm:text-[52px] lg:text-[68px]"
          >
            El{" "}
            <span
              style={{
                color: "var(--amber)",
                textShadow: "0 0 30px rgba(255,176,32,0.4)",
              }}
            >
              62%
            </span>{" "}
            de tus leads llegan cuando ya cerraste la oficina.{" "}
            <span className="text-[color:var(--slate-light)]">¿Quién los atiende?</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 max-w-[480px] text-[19px] leading-[1.65] text-[color:var(--slate-light)]"
          >
            Brerev responde, califica y agenda cada lead en menos de 12 segundos — a cualquier
            hora, por cualquier canal. Sin depender de que alguien esté disponible.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <a href="#cta-final" className="btn-primary !px-8 !py-4 text-[16px]">
              Activar mi sistema gratis <span className="arrow">→</span>
            </a>
            <a
              href="#demo"
              className="inline-flex items-center gap-2 text-[15px] font-medium text-[color:var(--slate)] transition-colors hover:text-[color:var(--platinum)]"
            >
              <PlayCircle size={18} className="text-[color:var(--electric)]" />
              Ver demo en vivo ↓
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] font-medium text-[color:var(--slate)]"
          >
            {["Sin tarjeta de crédito", "5 días de prueba", "Activo en 15 minutos"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5">
                <span className="text-[color:var(--success)]">✓</span> {t}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right */}
        <DashboardMockup />
      </div>
    </section>
  );
}
