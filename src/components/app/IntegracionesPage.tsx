import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Search, Plug, ExternalLink, X } from "lucide-react";
import {
  INTEGRATIONS,
  CATEGORY_LABELS,
  loadConnectedIds,
  toggleConnected,
  type Integration,
  type IntegrationCategory,
} from "@/lib/mock-integraciones";

const CATEGORIES: ("all" | IntegrationCategory)[] = [
  "all",
  "calendario",
  "crm",
  "portales",
  "comunicacion",
  "automatizacion",
];

export function IntegracionesPage() {
  const [connected, setConnected] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<"all" | IntegrationCategory>("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Integration | null>(null);

  useEffect(() => {
    setConnected(loadConnectedIds());
  }, []);

  const filtered = useMemo(() => {
    return INTEGRATIONS.filter((i) => {
      if (filter !== "all" && i.category !== filter) return false;
      if (query.trim().length >= 2) {
        const q = query.toLowerCase();
        return (
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [filter, query]);

  const handleToggle = (id: string) => {
    toggleConnected(id);
    setConnected(loadConnectedIds());
  };

  const totalConnected = connected.size;

  return (
    <div className="mx-auto max-w-[1200px]">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-[22px] font-bold" style={{ color: "var(--platinum)" }}>
            Integraciones
          </h2>
          <p className="mt-1 text-[13px]" style={{ color: "var(--slate)" }}>
            Conecta Brerev con las herramientas que ya usas.{" "}
            <span style={{ color: "var(--electric)" }}>{totalConnected}</span>{" "}
            de {INTEGRATIONS.length} conectadas.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-[320px]">
          <Search
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2"
            style={{ color: "var(--slate)" }}
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar integración..."
            className="w-full rounded-[10px] py-2.5 pl-10 pr-4 text-[13px] outline-none"
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--border-subtle)",
              color: "var(--platinum)",
            }}
          />
        </div>
      </div>

      {/* Filter pills */}
      <div className="mb-6 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className="rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition-all"
            style={{
              background: filter === c ? "var(--electric)" : "var(--steel)",
              color: filter === c ? "white" : "var(--slate-light)",
            }}
          >
            {c === "all" ? "Todas" : CATEGORY_LABELS[c]}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div
          className="rounded-[14px] p-12 text-center"
          style={{ background: "var(--card-bg)", border: "1px solid var(--border-subtle)" }}
        >
          <p style={{ color: "var(--slate)" }}>Sin resultados para "{query}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((integration, i) => (
            <IntegrationCard
              key={integration.id}
              integration={integration}
              connected={connected.has(integration.id)}
              onToggle={() => handleToggle(integration.id)}
              onOpen={() => setSelected(integration)}
              index={i}
            />
          ))}
        </div>
      )}

      {/* Empty CTA */}
      <div
        className="mt-10 rounded-[14px] p-6 text-center"
        style={{
          background: "linear-gradient(135deg, rgba(30,95,255,0.08), rgba(30,95,255,0.02))",
          border: "1px dashed rgba(30,95,255,0.3)",
        }}
      >
        <Plug size={22} className="mx-auto" style={{ color: "var(--electric)" }} />
        <p className="mt-2 text-[14px] font-semibold" style={{ color: "var(--platinum)" }}>
          ¿Necesitas otra integración?
        </p>
        <p className="mt-1 text-[12px]" style={{ color: "var(--slate)" }}>
          Cuéntanos qué herramienta usas y la priorizamos en el roadmap.
        </p>
        <a
          href="mailto:integraciones@brerev.com"
          className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold"
          style={{ color: "var(--electric)" }}
        >
          Sugerir integración
          <ExternalLink size={11} />
        </a>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <IntegrationModal
            integration={selected}
            connected={connected.has(selected.id)}
            onToggle={() => handleToggle(selected.id)}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function IntegrationCard({
  integration,
  connected,
  onToggle,
  onOpen,
  index,
}: {
  integration: Integration;
  connected: boolean;
  onToggle: () => void;
  onOpen: () => void;
  index: number;
}) {
  const isComingSoon = integration.status === "coming_soon";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="group cursor-pointer rounded-[14px] p-5 transition-all hover:-translate-y-0.5"
      style={{
        background: "var(--card-bg)",
        border: connected
          ? "1px solid rgba(0,214,143,0.4)"
          : "1px solid var(--border-subtle)",
      }}
      onClick={onOpen}
    >
      <div className="flex items-start justify-between">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-[12px] text-[14px] font-bold text-white"
          style={{ background: integration.badgeColor }}
        >
          {integration.badge}
        </div>
        {connected && (
          <span
            className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold"
            style={{ background: "rgba(0,214,143,0.12)", color: "var(--success)" }}
          >
            <Check size={10} />
            Conectada
          </span>
        )}
        {isComingSoon && (
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
            style={{ background: "rgba(255,176,32,0.12)", color: "var(--amber)" }}
          >
            Próximamente
          </span>
        )}
      </div>
      <h3 className="mt-4 text-[15px] font-semibold" style={{ color: "var(--platinum)" }}>
        {integration.name}
      </h3>
      <p className="mt-1 line-clamp-2 text-[12px]" style={{ color: "var(--slate)" }}>
        {integration.description}
      </p>

      <button
        onClick={(e) => {
          e.stopPropagation();
          if (!isComingSoon) onToggle();
        }}
        disabled={isComingSoon}
        className="mt-4 w-full rounded-[8px] py-2 text-[12px] font-semibold transition-all disabled:opacity-50"
        style={{
          background: connected
            ? "rgba(255,71,87,0.08)"
            : isComingSoon
              ? "var(--steel)"
              : "var(--electric)",
          color: connected ? "var(--red-loss)" : isComingSoon ? "var(--slate)" : "white",
        }}
      >
        {isComingSoon ? "No disponible aún" : connected ? "Desconectar" : "Conectar"}
      </button>
    </motion.div>
  );
}

function IntegrationModal({
  integration,
  connected,
  onToggle,
  onClose,
}: {
  integration: Integration;
  connected: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const isComingSoon = integration.status === "coming_soon";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 10 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[480px] overflow-hidden rounded-[16px]"
        style={{
          background: "var(--navy-light)",
          border: "1px solid var(--steel-light)",
        }}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-white/5"
          style={{ color: "var(--slate)" }}
        >
          <X size={16} />
        </button>

        <div className="p-6">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-[14px] text-[18px] font-bold text-white"
            style={{ background: integration.badgeColor }}
          >
            {integration.badge}
          </div>
          <h3 className="mt-4 text-[22px] font-bold" style={{ color: "var(--platinum)" }}>
            {integration.name}
          </h3>
          <p className="mt-2 text-[13px]" style={{ color: "var(--slate-light)" }}>
            {integration.description}
          </p>

          <div className="mt-5 space-y-2.5">
            <Feature text="Sincronización bidireccional en tiempo real" />
            <Feature text="Configuración guiada en menos de 2 minutos" />
            <Feature text="Sin código ni mantenimiento técnico" />
          </div>

          {isComingSoon ? (
            <div
              className="mt-6 rounded-[10px] px-4 py-3 text-center text-[12px]"
              style={{ background: "rgba(255,176,32,0.08)", color: "var(--amber)" }}
            >
              Esta integración está en desarrollo. Te avisamos cuando esté lista.
            </div>
          ) : (
            <button
              onClick={() => {
                onToggle();
                onClose();
              }}
              className="mt-6 w-full rounded-[10px] py-3 text-[14px] font-semibold transition-all hover:brightness-110"
              style={{
                background: connected ? "var(--red-loss)" : "var(--electric)",
                color: "white",
              }}
            >
              {connected ? "Desconectar integración" : "Conectar ahora"}
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <div
        className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full"
        style={{ background: "rgba(0,214,143,0.15)" }}
      >
        <Check size={10} style={{ color: "var(--success)" }} />
      </div>
      <p className="text-[12.5px]" style={{ color: "var(--slate-light)" }}>
        {text}
      </p>
    </div>
  );
}
