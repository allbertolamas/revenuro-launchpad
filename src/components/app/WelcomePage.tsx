import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  MessageCircle,
  Building2,
  Edit3,
  Share2,
  MessageSquare,
  CalendarCheck,
  Check,
  Copy,
  X,
  Trophy,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  loadOnboarding,
  saveOnboarding,
  completedCount,
  isFullyCompleted,
  STEP_KEYS,
  type StepKey,
  type OnboardingState,
} from "@/lib/mock-onboarding";

type StepDef = {
  key: StepKey;
  number: number;
  icon: typeof Rocket;
  title: string;
  description: string;
  estimate: string;
  cta?: { label: string; to?: string; opens?: "share" };
  autoCompleted?: boolean;
};

const STEPS: StepDef[] = [
  {
    key: "activated",
    number: 1,
    icon: Rocket,
    title: "Tu sistema está activo",
    description:
      "Brerev ya está respondiendo leads en tu nombre. ¡Bienvenido!",
    estimate: "Completado automáticamente",
    autoCompleted: true,
  },
  {
    key: "whatsapp",
    number: 2,
    icon: MessageCircle,
    title: "WhatsApp conectado",
    description:
      "Conecta tu número para que el sistema responda mensajes automáticamente.",
    estimate: "~2 minutos",
    cta: { label: "Conectar WhatsApp", to: "/app/configuracion" },
  },
  {
    key: "inventory",
    number: 3,
    icon: Building2,
    title: "Inventario de propiedades",
    description:
      "Con tu inventario cargado, el sistema puede responder preguntas específicas sobre cada propiedad.",
    estimate: "~3 minutos",
    cta: { label: "Subir propiedades", to: "/app/configuracion" },
  },
  {
    key: "messages",
    number: 4,
    icon: Edit3,
    title: "Mensajes personalizados",
    description:
      "Revisa que cada mensaje suene exactamente como tú quieres.",
    estimate: "~4 minutos",
    cta: { label: "Revisar mensajes", to: "/app/mensajes" },
  },
  {
    key: "share",
    number: 5,
    icon: Share2,
    title: "Comparte con tus clientes",
    description:
      "Asegúrate de que tus leads tengan el número correcto para contactarte.",
    estimate: "~1 minuto",
    cta: { label: "Compartir mi número", opens: "share" },
  },
  {
    key: "first_conversation",
    number: 6,
    icon: MessageSquare,
    title: "Ve tu primera conversación",
    description:
      "Cuando llegue el primer lead, verás la conversación completa aquí. Todo queda guardado automáticamente.",
    estimate: "~1 minuto",
    cta: { label: "Ver conversaciones", to: "/app/conversaciones" },
  },
  {
    key: "review",
    number: 7,
    icon: CalendarCheck,
    title: "Revisión con el equipo Brerev",
    description:
      "30 minutos con nuestro equipo para optimizar tu sistema basado en tus primeras conversaciones reales.",
    estimate: "~30 minutos",
    cta: { label: "Agendar llamada", to: "/app/configuracion" },
  },
];

const SYSTEM_NUMBER = "+52 55 9876 5432";

export function WelcomePage() {
  const [state, setState] = useState<OnboardingState | null>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setState(loadOnboarding());
  }, []);

  if (!state) {
    return <div className="h-32" />;
  }

  const completed = completedCount(state);
  const isAllDone = isFullyCompleted(state);

  // Encontrar el primer paso pendiente (que se vuelve "activo")
  const firstPending = STEP_KEYS.find((k) => !state[k]);

  const handleComplete = (key: StepKey) => {
    const next: OnboardingState = { ...state, [key]: true };
    if (isFullyCompleted(next) && !next.completedAt) {
      next.completedAt = Date.now();
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3500);
    }
    setState(next);
    saveOnboarding(next);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("brerev:state-change"));
    }
  };

  const subtitle =
    completed <= 2
      ? "Configura todo en menos de 10 minutos"
      : completed <= 5
        ? "¡Vas muy bien! Ya casi terminas"
        : completed < 7
          ? "Solo unos pasos más"
          : "¡Todo listo! Tu sistema al 100%";

  return (
    <div className="mx-auto max-w-[760px] py-2">
      {showConfetti && <Confetti />}

      {/* Header */}
      {isAllDone ? (
        <CompletedHero state={state} />
      ) : (
        <div className="mb-8">
          <h2
            className="text-[28px] font-bold sm:text-[32px]"
            style={{ color: "var(--platinum)", letterSpacing: "-0.01em" }}
          >
            Primeros pasos
          </h2>
          <p className="mt-1 text-[15px]" style={{ color: "var(--slate)" }}>
            {subtitle}
          </p>

          {/* Progress bar */}
          <div className="mt-5">
            <div
              className="h-2 w-full overflow-hidden rounded-full"
              style={{ background: "var(--steel)" }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(completed / STEPS.length) * 100}%`,
                  background:
                    "linear-gradient(90deg, var(--electric), var(--success))",
                  transition: "width 0.6s ease",
                }}
              />
            </div>
            <p
              className="mt-2 text-[14px]"
              style={{ color: "var(--slate)" }}
            >
              {completed} de {STEPS.length} pasos completados
            </p>
          </div>
        </div>
      )}

      {/* Lista de pasos */}
      <div className="flex flex-col gap-3">
        {STEPS.map((step) => {
          const isDone = state[step.key];
          const isActive = !isDone && firstPending === step.key;
          const isPending = !isDone && !isActive;

          return (
            <StepCard
              key={step.key}
              step={step}
              status={isDone ? "done" : isActive ? "active" : "pending"}
              onAction={() => {
                if (step.cta?.opens === "share") {
                  setShareOpen(true);
                } else if (step.autoCompleted) {
                  // Already done — noop
                } else {
                  handleComplete(step.key);
                }
              }}
              onMarkDone={() => handleComplete(step.key)}
            />
          );
        })}
      </div>

      <ShareModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        onShared={() => {
          setShareOpen(false);
          handleComplete("share");
        }}
      />
    </div>
  );
}

function StepCard({
  step,
  status,
  onAction,
  onMarkDone,
}: {
  step: StepDef;
  status: "done" | "active" | "pending";
  onAction: () => void;
  onMarkDone: () => void;
}) {
  const Icon = step.icon;
  const isDone = status === "done";
  const isActive = status === "active";

  const borderColor = isDone
    ? "rgba(0,214,143,0.25)"
    : isActive
      ? "rgba(30,95,255,0.3)"
      : "var(--border-subtle)";

  const bg = isDone
    ? "rgba(0,214,143,0.04)"
    : isActive
      ? "rgba(30,95,255,0.05)"
      : "var(--card-bg)";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4 rounded-[14px] p-5 sm:flex-row sm:items-center sm:gap-5 sm:p-6"
      style={{
        background: bg,
        border: `1px solid ${borderColor}`,
        opacity: status === "pending" ? 0.6 : 1,
        boxShadow: isActive ? "0 0 0 1px rgba(30,95,255,0.1)" : undefined,
        transition: "all 0.3s",
      }}
    >
      {/* Status icon */}
      <div className="flex-shrink-0">
        {isDone ? (
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full"
            style={{ background: "var(--success)" }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 16 }}
            >
              <Check size={20} strokeWidth={3} className="text-white" />
            </motion.div>
          </div>
        ) : isActive ? (
          <div className="relative">
            <span
              className="absolute inset-0 animate-ping rounded-full"
              style={{ background: "rgba(30,95,255,0.25)" }}
            />
            <div
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-[15px] font-bold"
              style={{
                background: "rgba(30,95,255,0.15)",
                color: "var(--electric)",
                border: "1.5px solid rgba(30,95,255,0.4)",
              }}
            >
              {step.number}
            </div>
          </div>
        ) : (
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full text-[15px] font-bold"
            style={{ background: "var(--steel)", color: "var(--slate)" }}
          >
            {step.number}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <Icon
            size={16}
            style={{
              color: isDone
                ? "var(--success)"
                : isActive
                  ? "var(--electric)"
                  : "var(--slate)",
            }}
          />
          <h3
            className="text-[16px] font-semibold"
            style={{
              color: "var(--platinum)",
              opacity: isDone ? 0.7 : 1,
            }}
          >
            {step.title}
          </h3>
        </div>
        <p
          className="mt-1 text-[14px]"
          style={{
            color: "var(--slate-light)",
            lineHeight: 1.5,
            opacity: isDone ? 0.7 : 1,
          }}
        >
          {step.description}
        </p>
        <p
          className="mt-1.5 text-[12px]"
          style={{ color: "var(--slate)", opacity: 0.7 }}
        >
          {step.estimate}
        </p>
      </div>

      {/* Action */}
      <div className="flex-shrink-0">
        {isDone ? (
          <span
            className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[12px] font-semibold"
            style={{
              background: "rgba(0,214,143,0.12)",
              color: "var(--success)",
              border: "1px solid rgba(0,214,143,0.25)",
            }}
          >
            <Check size={12} strokeWidth={3} />
            Completado
          </span>
        ) : isActive ? (
          <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
            <button
              onClick={onAction}
              className="inline-flex items-center justify-center gap-1.5 rounded-[10px] px-4 py-2 text-[13px] font-semibold text-white transition-all hover:brightness-110"
              style={{
                background: "var(--electric)",
                boxShadow: "0 4px 14px rgba(30,95,255,0.25)",
              }}
            >
              {step.cta?.label}
              <span>→</span>
            </button>
            {!step.autoCompleted && step.cta?.opens !== "share" && (
              <button
                onClick={onMarkDone}
                className="text-[12px] underline-offset-2 transition-colors hover:underline"
                style={{ color: "var(--slate)" }}
              >
                Marcar como hecho
              </button>
            )}
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}

function ShareModal({
  open,
  onClose,
  onShared,
}: {
  open: boolean;
  onClose: () => void;
  onShared: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(SYSTEM_NUMBER);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const shareWhatsApp = () => {
    const msg = encodeURIComponent(
      "Hola, a partir de hoy puedes contactarme por este número para información sobre propiedades.",
    );
    window.open(`https://wa.me/?text=${msg}`, "_blank");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[520px] rounded-[20px] p-8 sm:p-10"
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--border-subtle)",
              backdropFilter: "blur(16px)",
            }}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-white/5"
              style={{ color: "var(--slate)" }}
              aria-label="Cerrar"
            >
              <X size={18} />
            </button>

            <h3
              className="text-[22px] font-bold"
              style={{ color: "var(--platinum)" }}
            >
              Tu número de sistema
            </h3>
            <p
              className="mt-1 text-[14px]"
              style={{ color: "var(--slate)" }}
            >
              Compártelo con tus clientes. Cuando te contacten, el sistema
              responderá automáticamente.
            </p>

            <div
              className="mt-6 rounded-[12px] p-5"
              style={{
                background: "rgba(30,95,255,0.08)",
                border: "1px solid rgba(30,95,255,0.2)",
              }}
            >
              <p
                className="font-mono text-[24px] font-bold sm:text-[28px]"
                style={{ color: "var(--platinum)", letterSpacing: "0.02em" }}
              >
                {SYSTEM_NUMBER}
              </p>
            </div>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <button
                onClick={copy}
                className="flex flex-1 items-center justify-center gap-2 rounded-[10px] px-4 py-3 text-[14px] font-semibold transition-all"
                style={{
                  background: copied
                    ? "rgba(0,214,143,0.15)"
                    : "rgba(255,255,255,0.04)",
                  color: copied ? "var(--success)" : "var(--platinum)",
                  border: `1px solid ${copied ? "rgba(0,214,143,0.3)" : "var(--steel-light)"}`,
                }}
              >
                {copied ? (
                  <>
                    <Check size={16} strokeWidth={3} /> Copiado!
                  </>
                ) : (
                  <>
                    <Copy size={16} /> Copiar número
                  </>
                )}
              </button>
              <button
                onClick={shareWhatsApp}
                className="flex flex-1 items-center justify-center gap-2 rounded-[10px] px-4 py-3 text-[14px] font-semibold text-white transition-all hover:brightness-110"
                style={{ background: "var(--success)" }}
              >
                Compartir por WhatsApp
              </button>
            </div>

            <button
              onClick={onShared}
              className="mt-5 w-full rounded-[10px] px-4 py-3 text-[14px] font-semibold text-white transition-all hover:brightness-110"
              style={{
                background: "var(--electric)",
                boxShadow: "0 4px 14px rgba(30,95,255,0.25)",
              }}
            >
              Ya lo compartí ✓
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CompletedHero({ state }: { state: OnboardingState }) {
  const lines = useMemo(
    () => [
      "WhatsApp conectado",
      "Propiedades en inventario",
      "Mensajes personalizados",
      "Sistema revisado con el equipo",
    ],
    [],
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 text-center"
    >
      <motion.div
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 240, damping: 14 }}
        className="mx-auto flex h-20 w-20 items-center justify-center rounded-full"
        style={{
          background: "rgba(0,214,143,0.12)",
          border: "2px solid var(--success)",
          boxShadow: "0 0 40px rgba(0,214,143,0.3)",
        }}
      >
        <Trophy size={40} className="text-[color:var(--success)]" />
      </motion.div>
      <h2
        className="mt-4 text-[36px] font-extrabold sm:text-[40px]"
        style={{ color: "var(--success)", letterSpacing: "-0.02em" }}
      >
        ¡Sistema al 100%!
      </h2>
      <p
        className="mx-auto mt-2 max-w-[460px] text-[15px]"
        style={{ color: "var(--slate-light)" }}
      >
        Tu sistema está completamente optimizado. Ahora verás resultados máximos.
      </p>

      <div
        className="mx-auto mt-6 grid max-w-[480px] grid-cols-1 gap-3 rounded-[16px] p-6 text-left sm:grid-cols-2"
        style={{
          background: "rgba(0,214,143,0.06)",
          border: "1px solid rgba(0,214,143,0.2)",
        }}
      >
        {lines.map((line) => (
          <div key={line} className="flex items-center gap-2">
            <Check
              size={16}
              strokeWidth={3}
              className="flex-shrink-0 text-[color:var(--success)]"
            />
            <span className="text-[13px]" style={{ color: "var(--platinum)" }}>
              {line}
            </span>
          </div>
        ))}
      </div>

      <Link
        to="/app/dashboard"
        className="mt-6 inline-flex items-center gap-1.5 rounded-[10px] px-5 py-2.5 text-[14px] font-semibold text-white transition-all hover:brightness-110"
        style={{
          background: "var(--electric)",
          boxShadow: "0 4px 14px rgba(30,95,255,0.25)",
        }}
      >
        Ver mi dashboard <span>→</span>
      </Link>

      {/* fake usage of state to satisfy TS */}
      <span className="hidden">{state.activatedAt}</span>
    </motion.div>
  );
}

function Confetti() {
  const pieces = Array.from({ length: 60 }, (_, i) => i);
  const colors = ["#1e5fff", "#00d68f", "#ffb020", "#eef2ff"];
  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      {pieces.map((i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 0.4;
        const duration = 2 + Math.random() * 1.2;
        const color = colors[i % colors.length];
        const rot = Math.random() * 360;
        return (
          <motion.span
            key={i}
            initial={{ y: -20, opacity: 1, rotate: 0 }}
            animate={{ y: "110vh", opacity: 0, rotate: rot }}
            transition={{ duration, delay, ease: "easeIn" }}
            className="absolute h-2 w-2 rounded-sm"
            style={{ left: `${left}%`, top: 0, background: color }}
          />
        );
      })}
    </div>
  );
}
