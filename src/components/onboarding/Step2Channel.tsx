import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, Phone, Globe, ShieldCheck } from "lucide-react";
import { Field } from "./Field";
import type { WizardData } from "./types";

const PORTALS = [
  "Inmuebles24",
  "Lamudi",
  "Mercado Libre Inmuebles",
  "Mi propio sitio web",
  "Instagram / Facebook",
];

export function Step2Channel({
  data,
  update,
}: {
  data: WizardData;
  update: (patch: Partial<WizardData>) => void;
}) {
  const simulateConnect = () => {
    update({ whatsappStatus: "connecting" });
    setTimeout(() => {
      update({
        whatsappStatus: "connected",
        whatsappNumber: "+52 55 1234 5678",
      });
    }, 1800);
  };

  const disconnect = () => {
    update({
      whatsappStatus: "idle",
      whatsappNumber: "",
      whatsappOption: null,
    });
  };

  const profileName = data.businessName?.trim() || "Tu negocio";
  const initials = profileName
    .split(" ")
    .map((p) => p.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="space-y-6">
      {/* WHATSAPP */}
      <div
        className="rounded-[16px] p-6 sm:p-8 transition-all"
        style={{
          background:
            data.whatsappStatus === "connected"
              ? "rgba(0,214,143,0.06)"
              : "var(--card-bg)",
          border:
            data.whatsappStatus === "connected"
              ? "1px solid rgba(0,214,143,0.3)"
              : "1px solid var(--border-subtle)",
        }}
      >
        <div className="mb-5 flex items-center gap-3">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="#25D366">
            <path d="M16 2C8.27 2 2 8.27 2 16c0 2.5.66 4.84 1.81 6.87L2 30l7.34-1.92A13.93 13.93 0 0 0 16 30c7.73 0 14-6.27 14-14S23.73 2 16 2zm7.97 19.62c-.34.95-1.69 1.78-2.65 1.94-.71.12-1.62.21-4.71-1.01-3.96-1.56-6.51-5.59-6.71-5.85-.2-.27-1.61-2.14-1.61-4.08 0-1.94 1.02-2.89 1.38-3.29.36-.4.79-.5 1.05-.5l.76.01c.24.01.57-.09.89.68.34.78 1.15 2.72 1.25 2.92.1.2.17.43.03.7-.13.27-.2.43-.39.66-.2.23-.41.51-.59.69-.2.2-.4.41-.17.8.23.39 1.03 1.7 2.21 2.75 1.52 1.36 2.81 1.78 3.2 1.97.39.2.62.17.85-.1.23-.27.98-1.14 1.24-1.53.27-.39.53-.32.89-.2.36.12 2.31 1.09 2.7 1.29.39.2.66.3.76.46.1.17.1.95-.24 1.91z" />
          </svg>
          <div className="flex-1">
            <h3
              className="text-[16px] font-bold"
              style={{
                color:
                  data.whatsappStatus === "connected"
                    ? "var(--success)"
                    : "var(--platinum)",
              }}
            >
              WhatsApp Business
              {data.whatsappStatus === "connected" && " conectado"}
            </h3>
          </div>
          <span
            className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase"
            style={{
              background:
                data.whatsappStatus === "connected"
                  ? "rgba(0,214,143,0.15)"
                  : "rgba(0,214,143,0.1)",
              border: "1px solid rgba(0,214,143,0.25)",
              color: "var(--success)",
            }}
          >
            {data.whatsappStatus === "connected" ? "Activo ✓" : "Recomendado"}
          </span>
        </div>

        {data.whatsappStatus === "connected" ? (
          <ConnectedDetail
            number={data.whatsappNumber}
            profileName={profileName}
            initials={initials}
            onDisconnect={disconnect}
          />
        ) : (
          <div className="space-y-3">
            {/* Opción A */}
            <button
              type="button"
              onClick={() => update({ whatsappOption: "existing" })}
              className="block w-full rounded-[12px] p-5 text-left transition-all"
              style={{
                background:
                  data.whatsappOption === "existing"
                    ? "rgba(30,95,255,0.06)"
                    : "transparent",
                border:
                  data.whatsappOption === "existing"
                    ? "1px solid rgba(30,95,255,0.3)"
                    : "1px solid var(--steel)",
              }}
            >
              <p className="text-[15px] font-semibold text-[color:var(--platinum)]">
                Conectar mi número actual
              </p>
              <p className="mt-1 text-[13px] text-[color:var(--slate)]">
                Usa el número de WhatsApp que ya tienen tus contactos.
              </p>

              {data.whatsappOption === "existing" && (
                <div className="mt-4">
                  <AnimatePresence mode="wait">
                    {data.whatsappStatus === "idle" && (
                      <motion.div
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            simulateConnect();
                          }}
                          className="inline-flex items-center gap-2 rounded-[10px] px-5 py-3 text-[14px] font-semibold text-white transition-transform hover:scale-[1.02]"
                          style={{ background: "#25D366" }}
                        >
                          Autorizar con WhatsApp →
                        </button>
                      </motion.div>
                    )}
                    {data.whatsappStatus === "connecting" && (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 text-[14px] text-[color:var(--slate-light)]"
                      >
                        <Loader2 size={16} className="animate-spin" />
                        Conectando con WhatsApp Business...
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </button>

            {/* Opción B */}
            <button
              type="button"
              onClick={() => update({ whatsappOption: "new" })}
              className="block w-full rounded-[12px] p-5 text-left transition-all"
              style={{
                background:
                  data.whatsappOption === "new"
                    ? "rgba(30,95,255,0.06)"
                    : "transparent",
                border:
                  data.whatsappOption === "new"
                    ? "1px solid rgba(30,95,255,0.3)"
                    : "1px solid var(--steel)",
              }}
            >
              <p className="text-[15px] font-semibold text-[color:var(--platinum)]">
                Usar un número nuevo
              </p>
              <p className="mt-1 text-[13px] text-[color:var(--slate)]">
                Un número dedicado solo para el sistema, separado del tuyo personal.
              </p>
            </button>
          </div>
        )}
      </div>

      {/* CALLS */}
      <ToggleCard
        icon={<Phone size={20} className="text-[color:var(--electric)]" />}
        label="¿También recibes leads por llamada?"
        active={data.callsEnabled}
        onToggle={() => update({ callsEnabled: !data.callsEnabled })}
      >
        <div className="space-y-3 pt-4">
          <RadioRow
            selected={data.callsOption === "forward"}
            onClick={() => update({ callsOption: "forward" })}
            title="Desviar llamadas a mi número al sistema"
            sub="Te damos las instrucciones de desvío para tu operador."
          />
          <RadioRow
            selected={data.callsOption === "new"}
            onClick={() => update({ callsOption: "new" })}
            title="Número nuevo dedicado para llamadas"
            sub="~$1-2 USD/mes · Número MX incluido en tu plan"
          />
        </div>
      </ToggleCard>

      {/* FORMS */}
      <ToggleCard
        icon={<Globe size={20} className="text-[color:var(--electric)]" />}
        label="¿Recibes leads de portales o formularios?"
        active={data.formsEnabled}
        onToggle={() => update({ formsEnabled: !data.formsEnabled })}
      >
        <div className="space-y-3 pt-4">
          <div className="flex flex-wrap gap-2">
            {PORTALS.map((p) => {
              const active = data.portals.includes(p);
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() =>
                    update({
                      portals: active
                        ? data.portals.filter((x) => x !== p)
                        : [...data.portals, p],
                    })
                  }
                  className="rounded-[8px] border px-3.5 py-2 text-[13px] font-medium transition-all"
                  style={{
                    background: active
                      ? "rgba(30,95,255,0.15)"
                      : "rgba(30,95,255,0.04)",
                    borderColor: active ? "var(--electric)" : "var(--steel-light)",
                    color: active ? "var(--electric)" : "var(--slate-light)",
                  }}
                >
                  {p}
                </button>
              );
            })}
          </div>
          {data.portals.includes("Mi propio sitio web") && (
            <Field
              label="URL de tu sitio"
              placeholder="https://miinmobiliaria.com"
              value={data.websiteUrl}
              onChange={(e) => update({ websiteUrl: e.target.value })}
            />
          )}
        </div>
      </ToggleCard>
    </div>
  );
}

function ConnectedDetail({
  number,
  profileName,
  initials,
  onDisconnect,
}: {
  number: string;
  profileName: string;
  initials: string;
  onDisconnect: () => void;
}) {
  const [showBubble, setShowBubble] = useState(false);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setShowBubble(true), 800);
    const t2 = setTimeout(() => setTyping(false), 1900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-4"
    >
      {/* Datos del perfil */}
      <div
        className="flex items-center gap-4 rounded-[10px] p-4"
        style={{ background: "rgba(0,0,0,0.25)" }}
      >
        <div
          className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-[14px] font-bold text-white"
          style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}
        >
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <p
            className="truncate text-[15px] font-bold"
            style={{ color: "var(--platinum)" }}
          >
            {profileName}
          </p>
          <p
            className="text-[13px] tabular-nums"
            style={{ color: "var(--slate)", fontFamily: "JetBrains Mono, monospace" }}
          >
            {number}
          </p>
          <p
            className="mt-1 flex items-center gap-1 text-[11px] font-semibold"
            style={{ color: "var(--success)" }}
          >
            <ShieldCheck size={12} /> Verificado por Meta
          </p>
        </div>
      </div>

      <p className="text-[13px] sm:text-[14px]" style={{ color: "var(--slate)" }}>
        Tu número está conectado y listo para recibir mensajes de tus leads.
      </p>

      {/* Burbuja simulada */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="max-w-[80%] px-3 py-2"
            style={{
              background: "rgba(37,211,102,0.1)",
              border: "1px solid rgba(37,211,102,0.2)",
              borderRadius: "8px 8px 8px 2px",
              color: "var(--slate-light)",
              fontSize: 13,
            }}
          >
            {typing ? (
              <span className="inline-flex items-center gap-1">
                <span className="brerev-typing-dot" />
                <span className="brerev-typing-dot" style={{ animationDelay: "0.15s" }} />
                <span className="brerev-typing-dot" style={{ animationDelay: "0.3s" }} />
              </span>
            ) : (
              "¡Hola! Me interesa una propiedad..."
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={onDisconnect}
        className="text-[12px] underline-offset-2 hover:underline"
        style={{ color: "var(--slate)" }}
      >
        Cambiar número
      </button>

      <style>{`
        @keyframes brerev-typing {
          0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-2px); }
        }
        .brerev-typing-dot {
          display: inline-block;
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--success);
          animation: brerev-typing 1.2s ease-in-out infinite;
        }
      `}</style>
    </motion.div>
  );
}

function ToggleCard({
  icon,
  label,
  active,
  onToggle,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-[16px] p-5 sm:p-6"
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="text-[15px] font-semibold text-[color:var(--platinum)]">
            {label}
          </span>
        </div>
        <div
          className="relative h-6 w-11 rounded-full transition-colors"
          style={{ background: active ? "var(--electric)" : "var(--steel-light)" }}
        >
          <span
            className="absolute top-1 h-4 w-4 rounded-full bg-white transition-transform"
            style={{ transform: active ? "translateX(22px)" : "translateX(4px)" }}
          />
        </div>
      </button>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function RadioRow({
  selected,
  onClick,
  title,
  sub,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  sub: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="block w-full rounded-[10px] p-4 text-left transition-all"
      style={{
        background: selected ? "rgba(30,95,255,0.06)" : "transparent",
        border: selected
          ? "1px solid rgba(30,95,255,0.3)"
          : "1px solid var(--steel)",
      }}
    >
      <p className="text-[14px] font-semibold text-[color:var(--platinum)]">{title}</p>
      <p className="mt-0.5 text-[12px] text-[color:var(--slate)]">{sub}</p>
    </button>
  );
}
