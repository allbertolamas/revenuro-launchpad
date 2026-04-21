import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  DollarSign,
  Calendar,
  Clock,
  AlertCircle,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import { TextField } from "./Field";
import { DEFAULT_MESSAGES, type WizardData } from "./types";

const MESSAGE_DEFS: {
  id: keyof typeof DEFAULT_MESSAGES;
  title: string;
  sub: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}[] = [
  { id: "welcome", title: "Bienvenida inicial", sub: "Primer mensaje cuando llega un lead", icon: MessageCircle },
  { id: "budget", title: "Calificación de presupuesto", sub: "Para entender el rango de inversión", icon: DollarSign },
  { id: "appointmentConfirm", title: "Confirmación de cita", sub: "Se envía al agendar una cita", icon: Calendar },
  { id: "reminder24", title: "Recordatorio 24 horas", sub: "24 horas antes de la cita", icon: Clock },
  { id: "reminder1", title: "Recordatorio 1 hora", sub: "1 hora antes de la cita", icon: AlertCircle },
  { id: "unconfirmed", title: "Sin confirmar (reactivación)", sub: "Si no confirma después de 4 horas", icon: RefreshCw },
  { id: "reactivation", title: "Reactivación de lead frío", sub: "Para leads que no convirtieron en 30 días", icon: TrendingUp },
];

export function Step5Messages({
  data,
  update,
}: {
  data: WizardData;
  update: (patch: Partial<WizardData>) => void;
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  const updateMessage = (id: string, val: string) => {
    update({ messages: { ...data.messages, [id]: val } });
  };

  return (
    <div className="space-y-3">
      {MESSAGE_DEFS.map((m) => {
        const Icon = m.icon;
        const open = openId === m.id;
        const customized = data.messages[m.id] !== DEFAULT_MESSAGES[m.id];
        return (
          <div
            key={m.id}
            className="overflow-hidden rounded-[14px]"
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <div
              className="flex items-center justify-between gap-3 p-4"
              style={{ borderBottom: open ? "1px solid var(--steel)" : "none" }}
            >
              <div className="flex flex-1 items-center gap-3 min-w-0">
                <Icon size={18} className="flex-shrink-0 text-[color:var(--electric)]" />
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-semibold text-[color:var(--platinum)]">
                    {m.title}
                  </p>
                  <p className="truncate text-[12px] text-[color:var(--slate)]">
                    {m.sub}
                  </p>
                </div>
              </div>
              <span
                className="hidden rounded-full px-2.5 py-1 text-[10px] font-bold uppercase sm:inline-block"
                style={{
                  background: customized ? "rgba(30,95,255,0.1)" : "rgba(0,214,143,0.1)",
                  border: customized
                    ? "1px solid rgba(30,95,255,0.2)"
                    : "1px solid rgba(0,214,143,0.2)",
                  color: customized ? "var(--electric)" : "var(--success)",
                }}
              >
                {customized ? "Personalizado" : "Optimizado"}
              </span>
              <button
                type="button"
                onClick={() => setOpenId(open ? null : m.id)}
                className="text-[13px] font-semibold text-[color:var(--electric)]"
              >
                {open ? "Cerrar" : "Editar"}
              </button>
            </div>

            <AnimatePresence>
              {open ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4">
                    <TextField
                      value={data.messages[m.id] || ""}
                      onChange={(e) => updateMessage(m.id, e.target.value)}
                    />
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[11px] text-[color:var(--slate)]">
                        {(data.messages[m.id] || "").length} caracteres
                      </span>
                      <button
                        type="button"
                        onClick={() => updateMessage(m.id, DEFAULT_MESSAGES[m.id])}
                        className="text-[12px] font-medium text-[color:var(--slate-light)] hover:text-[color:var(--platinum)]"
                      >
                        Restaurar original
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <p
                  className="line-clamp-2 px-4 py-3 text-[13px] italic"
                  style={{ color: "var(--slate)" }}
                >
                  {data.messages[m.id]}
                </p>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
