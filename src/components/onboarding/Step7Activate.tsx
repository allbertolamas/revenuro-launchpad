import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, AlertCircle, Loader2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { WizardData } from "./types";

type Status = "pending" | "loading" | "done" | "error";

type ActivationStep = {
  id: string;
  label: string;
  status: Status;
  durationMs: number | null;
  errorMessage: string | null;
  // Probabilidad de fallar (mock). 0 = nunca falla.
  failChance?: number;
  minMs: number;
  maxMs: number;
};

function buildSteps(data: WizardData): ActivationStep[] {
  return [
    { id: "profile", label: "Creando tu perfil", status: "pending", durationMs: null, errorMessage: null, minMs: 400, maxMs: 700 },
    {
      id: "agent",
      label: `Configurando ${data.assistantName || "tu asistente"}`,
      status: "pending",
      durationMs: null,
      errorMessage: null,
      minMs: 800,
      maxMs: 1400,
    },
    { id: "whatsapp", label: "Conectando WhatsApp", status: "pending", durationMs: null, errorMessage: null, minMs: 600, maxMs: 1100 },
    { id: "inventory", label: "Cargando tus propiedades", status: "pending", durationMs: null, errorMessage: null, minMs: 700, maxMs: 1500 },
    { id: "messages", label: "Activando flujos de seguimiento", status: "pending", durationMs: null, errorMessage: null, minMs: 500, maxMs: 900 },
    { id: "calendar", label: "Sincronizando tu calendario", status: "pending", durationMs: null, errorMessage: null, minMs: 600, maxMs: 1100 },
    { id: "verify", label: "Verificando el sistema completo", status: "pending", durationMs: null, errorMessage: null, minMs: 800, maxMs: 1300 },
  ];
}

const ERROR_NOTES: Record<string, string> = {
  whatsapp:
    "No pudimos conectar WhatsApp. Tu sistema se activará de todas formas — puedes conectar WhatsApp después desde Configuración.",
  calendar:
    "No pudimos sincronizar tu calendario. Puedes conectarlo después desde Configuración.",
};

export function Step7Activate({ data }: { data: WizardData }) {
  const [steps, setSteps] = useState<ActivationStep[]>(() => buildSteps(data));
  const [done, setDone] = useState(false);
  const [hasError, setHasError] = useState(false);
  const ranRef = useRef(false);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    let cancelled = false;
    const sequence = buildSteps(data);

    (async () => {
      for (let i = 0; i < sequence.length; i++) {
        if (cancelled) return;
        const step = sequence[i];

        setSteps((prev) =>
          prev.map((s, idx) => (idx === i ? { ...s, status: "loading" } : s))
        );

        const start =
          typeof performance !== "undefined" ? performance.now() : Date.now();
        const target = step.minMs + Math.random() * (step.maxMs - step.minMs);
        await new Promise((r) => setTimeout(r, target));
        const end =
          typeof performance !== "undefined" ? performance.now() : Date.now();
        const durationMs = Math.round(end - start);

        // Sin fallos forzados — todo pasa correctamente en este mock.
        setSteps((prev) =>
          prev.map((s, idx) =>
            idx === i ? { ...s, status: "done", durationMs } : s
          )
        );
      }
      if (!cancelled) {
        await new Promise((r) => setTimeout(r, 400));
        setDone(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [data]);

  if (done) {
    return <ActivatedScreen data={data} hasError={hasError} />;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-10 flex h-28 w-28 items-center justify-center">
        <div
          className="absolute inset-0 animate-spin rounded-full border-2 border-transparent"
          style={{
            borderTopColor: "var(--electric)",
            borderRightColor: "var(--electric)",
            borderBottomColor: "var(--electric)",
            animationDuration: "1.5s",
          }}
        />
        <div
          className="h-3 w-3 rounded-full"
          style={{
            background: "var(--electric)",
            boxShadow: "0 0 30px var(--electric)",
          }}
        />
      </div>

      <ul className="w-full max-w-[460px] space-y-1">
        {steps.map((s, i) => (
          <li
            key={s.id}
            className="flex flex-col gap-2 py-2"
            style={{ borderBottom: "1px solid rgba(30,45,79,0.4)" }}
          >
            <div className="flex items-center gap-4">
              <StepIcon step={s} index={i} />
              <span
                className="flex-1 text-[14px] sm:text-[15px]"
                style={{
                  color:
                    s.status === "loading"
                      ? "var(--platinum)"
                      : s.status === "error"
                      ? "var(--red-loss)"
                      : "var(--slate)",
                  fontWeight: s.status === "loading" ? 500 : 400,
                }}
              >
                {s.label}
              </span>
              <AnimatePresence>
                {s.status === "done" && s.durationMs !== null && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-[11px] sm:text-[12px] tabular-nums"
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      color: durationColor(s.durationMs),
                    }}
                  >
                    completado en {(s.durationMs / 1000).toFixed(1)}s
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            {s.status === "error" && s.errorMessage && (
              <div
                className="ml-12 rounded-[8px] p-3 text-[12px] sm:text-[13px]"
                style={{
                  background: "rgba(255,71,87,0.08)",
                  border: "1px solid rgba(255,71,87,0.2)",
                  color: "var(--slate-light)",
                }}
              >
                {s.errorMessage}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function StepIcon({ step, index }: { step: ActivationStep; index: number }) {
  if (step.status === "done") {
    return (
      <div
        className="flex h-7 w-7 items-center justify-center rounded-full"
        style={{ background: "var(--success)" }}
      >
        <Check size={14} color="#fff" strokeWidth={3} />
      </div>
    );
  }
  if (step.status === "loading") {
    return (
      <div
        className="flex h-7 w-7 items-center justify-center rounded-full"
        style={{
          border: "2px solid var(--steel)",
          borderTopColor: "var(--electric)",
          animation: "spin 0.7s linear infinite",
        }}
      />
    );
  }
  if (step.status === "error") {
    return (
      <div
        className="flex h-7 w-7 items-center justify-center rounded-full"
        style={{ background: "var(--red-loss)" }}
      >
        <AlertCircle size={14} color="#fff" />
      </div>
    );
  }
  return (
    <div
      className="flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-semibold"
      style={{ background: "var(--steel)", color: "var(--slate)" }}
    >
      {index + 1}
    </div>
  );
}

function durationColor(ms: number) {
  if (ms < 500) return "var(--success)";
  if (ms <= 3000) return "var(--slate)";
  return "var(--amber)";
}

function ActivatedScreen({
  data,
  hasError,
}: {
  data: WizardData;
  hasError: boolean;
}) {
  const accent = hasError ? "var(--amber)" : "var(--success)";
  const tint = hasError
    ? "rgba(255,176,32,0.12)"
    : "rgba(0,214,143,0.12)";
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 14 }}
          className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full"
          style={{
            background: tint,
            border: `2px solid ${accent}`,
            boxShadow: `0 0 60px ${tint}`,
          }}
        >
          {hasError ? (
            <AlertCircle size={48} color={accent} />
          ) : (
            <Check size={52} strokeWidth={3} color={accent} />
          )}
        </motion.div>

        <h2
          className="text-[36px] sm:text-[48px] font-extrabold"
          style={{ color: accent, letterSpacing: "-0.02em" }}
        >
          {hasError
            ? "Sistema activo con una advertencia"
            : "¡Tu sistema está activo!"}
        </h2>
        <p className="mx-auto mt-3 max-w-[480px] text-[16px] sm:text-[18px] text-[color:var(--slate)]">
          {data.assistantName || "Tu asistente"} ya está respondiendo leads en{" "}
          {data.businessName || "tu negocio"}. A partir de ahora, ningún lead queda
          sin atención.
        </p>

        <div
          className="mx-auto mt-8 max-w-[480px] rounded-[16px] p-6 text-left"
          style={{
            background: "rgba(0,214,143,0.05)",
            border: "1px solid rgba(0,214,143,0.2)",
          }}
        >
          {[
            data.whatsappStatus === "connected"
              ? `WhatsApp conectado: ${data.whatsappNumber}`
              : "WhatsApp listo para conectar",
            `Asistente: ${data.assistantName || "—"} con voz ${data.voiceId}`,
            data.inventoryCount > 0
              ? `${data.inventoryCount} propiedades cargadas`
              : "Inventario por configurar",
            `${Object.keys(data.messages).length} mensajes configurados`,
            "Seguimiento automático activado",
          ].map((line) => (
            <div key={line} className="mb-2 flex gap-2 last:mb-0">
              <Check
                size={16}
                className="mt-0.5 flex-shrink-0 text-[color:var(--success)]"
              />
              <span className="text-[14px] text-[color:var(--platinum)]">
                {line}
              </span>
            </div>
          ))}
        </div>

        <Link to="/app/dashboard" className="btn-primary mt-8 inline-flex justify-center">
          Ir al dashboard <span className="arrow">→</span>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
}

// Mantengo Loader2 import por compat (no se usa pero queda disponible si se reactivan errores)
void Loader2;
