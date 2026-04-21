import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { WizardData } from "./types";

const STEPS = [
  "Creando tu perfil de sistema...",
  (d: WizardData) => `Configurando tu asistente ${d.assistantName || ""}...`,
  "Conectando tu WhatsApp...",
  "Cargando tu inventario de propiedades...",
  "Activando flujos de seguimiento...",
  "Sincronizando tu calendario...",
  "Verificando todo el sistema...",
];

export function Step7Activate({ data }: { data: WizardData }) {
  const [current, setCurrent] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (current >= STEPS.length) {
      setDone(true);
      return;
    }
    const t = setTimeout(() => setCurrent((c) => c + 1), 1400);
    return () => clearTimeout(t);
  }, [current]);

  if (done) {
    return <ActivatedScreen data={data} />;
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

      <ul className="w-full max-w-[420px] space-y-3">
        {STEPS.map((s, i) => {
          const label = typeof s === "function" ? s(data) : s;
          const isDone = i < current;
          const isCurrent = i === current;
          const isPending = i > current;

          return (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{
                opacity: isPending ? 0.4 : 1,
                x: 0,
              }}
              className="flex items-center gap-3"
            >
              <div className="flex h-5 w-5 items-center justify-center">
                {isDone && (
                  <Check
                    size={18}
                    strokeWidth={3}
                    className="text-[color:var(--success)]"
                  />
                )}
                {isCurrent && (
                  <Loader2
                    size={18}
                    className="animate-spin text-[color:var(--electric)]"
                  />
                )}
                {isPending && (
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ background: "var(--steel)" }}
                  />
                )}
              </div>
              <span
                className="text-[14px]"
                style={{
                  color: isCurrent
                    ? "var(--platinum)"
                    : "var(--slate-light)",
                }}
              >
                {label}
              </span>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}

function ActivatedScreen({ data }: { data: WizardData }) {
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
            background: "rgba(0,214,143,0.12)",
            border: "2px solid var(--success)",
            boxShadow: "0 0 60px rgba(0,214,143,0.3)",
          }}
        >
          <Check size={52} strokeWidth={3} className="text-[color:var(--success)]" />
        </motion.div>

        <h2
          className="text-[40px] font-extrabold sm:text-[48px]"
          style={{ color: "var(--success)", letterSpacing: "-0.02em" }}
        >
          ¡Tu sistema está activo!
        </h2>
        <p className="mx-auto mt-3 max-w-[480px] text-[18px] text-[color:var(--slate)]">
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
              <span className="text-[14px] text-[color:var(--platinum)]">{line}</span>
            </div>
          ))}
        </div>

        <Link
          to="/"
          className="btn-primary mt-8 inline-flex justify-center"
        >
          Ir a la landing <span className="arrow">→</span>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
}
