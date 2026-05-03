import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Bot,
  MessageSquare,
  Bell,
  Users,
  RotateCw,
  LogOut,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { DestructiveConfirmModal } from "@/components/ui/DestructiveConfirmModal";

const TABS = [
  { id: "negocio", label: "Negocio", icon: Building2 },
  { id: "asistente", label: "Asistente", icon: Bot },
  { id: "canales", label: "Canales", icon: MessageSquare },
  { id: "notificaciones", label: "Notificaciones", icon: Bell },
  { id: "equipo", label: "Equipo", icon: Users },
  { id: "sistema", label: "Sistema", icon: RotateCw },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function ConfiguracionPage() {
  const [tab, setTab] = useState<TabId>("negocio");
  const [resetOpen, setResetOpen] = useState(false);
  const [disconnectOpen, setDisconnectOpen] = useState(false);
  const [whatsappConnected, setWhatsappConnected] = useState(true);
  const [resetDone, setResetDone] = useState(false);

  return (
    <div className="px-6 py-8 sm:px-10 sm:py-10">
      <header className="mb-8">
        <h1 className="text-[28px] sm:text-[32px] font-bold tracking-[-0.01em] text-[color:var(--platinum)]">
          Configuración
        </h1>
        <p className="mt-1.5 text-[14px] sm:text-[15px] text-[color:var(--slate)]">
          Tu negocio, tu asistente, canales conectados, notificaciones y equipo.
        </p>
      </header>

      {/* Tabs */}
      <div
        className="mb-6 flex flex-wrap gap-1 rounded-[12px] p-1.5"
        style={{
          background: "rgba(8,14,29,0.6)",
          border: "1px solid var(--border-subtle)",
        }}
      >
        {TABS.map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className="inline-flex items-center gap-1.5 rounded-[8px] px-3 py-2 text-[13px] font-medium transition-all"
              style={{
                background: active ? "var(--electric)" : "transparent",
                color: active ? "#fff" : "var(--slate-light)",
              }}
            >
              <Icon size={14} />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Panels */}
      <div
        className="rounded-[16px] p-6 sm:p-8"
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--border-subtle)",
        }}
      >
        {tab === "negocio" && (
          <div className="space-y-5">
            <SettingRow label="Nombre del negocio" value="Inmobiliaria Torres" />
            <SettingRow label="Ciudad / zona" value="CDMX" />
            <SettingRow
              label="Tipos de propiedad"
              value="Departamentos, Casas, Preventas"
            />
            <SettingRow label="Leads mensuales estimados" value="~120" />
          </div>
        )}

        {tab === "asistente" && (
          <div className="space-y-5">
            <SettingRow label="Nombre" value="Sofía Torres" />
            <SettingRow label="Voz" value="Femenina mexicana cálida" />
            <SettingRow label="Tono" value="Cálido y cercano" />
          </div>
        )}

        {tab === "canales" && (
          <div className="space-y-4">
            <ChannelRow
              name="WhatsApp Business"
              connected={whatsappConnected}
              meta={
                whatsappConnected
                  ? "+52 55 1234 5678 · Conectado hace 14 días"
                  : "Sin conectar"
              }
              onDisconnect={() => setDisconnectOpen(true)}
            />
            <ChannelRow name="Llamadas" connected meta="Twilio · 500 min/mes" />
            <ChannelRow name="Formularios web" connected meta="Embed activo" />
          </div>
        )}

        {tab === "notificaciones" && (
          <div className="space-y-4">
            <ToggleRow label="Lead caliente detectado" defaultOn />
            <ToggleRow label="Cita agendada" defaultOn />
            <ToggleRow label="Resumen diario por email" defaultOn />
            <ToggleRow label="Resumen semanal" />
          </div>
        )}

        {tab === "equipo" && (
          <div className="space-y-3">
            <TeamRow name="Carlos Mendoza" email="carlos@torres.mx" role="Owner" />
            <TeamRow
              name="Laura Pérez"
              email="laura@torres.mx"
              role="Asesora"
            />
            <button className="btn-ghost mt-2">+ Invitar miembro</button>
          </div>
        )}

        {tab === "sistema" && (
          <div className="space-y-6">
            <div
              className="rounded-[12px] p-5"
              style={{
                background: "rgba(255,176,32,0.06)",
                border: "1px solid rgba(255,176,32,0.2)",
              }}
            >
              <div className="flex items-start gap-3">
                <AlertTriangle size={20} color="var(--amber)" className="mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-[15px] font-bold text-[color:var(--platinum)]">
                    Reiniciar sistema completo
                  </h3>
                  <p className="mt-1 text-[13px] text-[color:var(--slate)]">
                    Borra toda la configuración del asistente, mensajes y plantillas.
                    Tus leads y conversaciones se conservan.
                  </p>
                  <button
                    type="button"
                    onClick={() => setResetOpen(true)}
                    className="mt-3 rounded-[10px] px-4 py-2 text-[13px] font-semibold text-[color:var(--amber)]"
                    style={{
                      background: "rgba(255,176,32,0.1)",
                      border: "1px solid rgba(255,176,32,0.3)",
                    }}
                  >
                    Reiniciar sistema
                  </button>
                </div>
              </div>
            </div>

            {resetDone && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[12px] font-medium"
                style={{
                  background: "rgba(0,214,143,0.1)",
                  color: "var(--success)",
                }}
              >
                <CheckCircle2 size={14} />
                Sistema reiniciado correctamente
              </motion.div>
            )}
          </div>
        )}
      </div>

      <DestructiveConfirmModal
        isOpen={resetOpen}
        onClose={() => setResetOpen(false)}
        onConfirm={() => {
          setResetDone(true);
          setTimeout(() => setResetDone(false), 4000);
        }}
        severity="warning"
        title="Reiniciar sistema"
        description="Vas a borrar toda la configuración actual de tu asistente y mensajes. Esta acción no se puede deshacer."
        consequences={[
          "Se borra la configuración del asistente (nombre, voz, tono).",
          "Se restablecen todos los mensajes a los predeterminados.",
          "Las plantillas personalizadas se eliminan.",
          "Tus leads y conversaciones se conservan.",
        ]}
        confirmText="REINICIAR"
        confirmLabel="Sí, reiniciar sistema"
      />

      <DestructiveConfirmModal
        isOpen={disconnectOpen}
        onClose={() => setDisconnectOpen(false)}
        onConfirm={() => setWhatsappConnected(false)}
        severity="danger"
        title="Desconectar WhatsApp"
        description="Tu sistema dejará de responder en WhatsApp inmediatamente."
        consequences={[
          "Los leads que escriban por WhatsApp no recibirán respuesta.",
          "Las conversaciones activas se pausan.",
          "Las citas agendadas por WhatsApp siguen vigentes.",
          "Puedes reconectar en cualquier momento.",
        ]}
        confirmText="DESCONECTAR"
        confirmLabel="Sí, desconectar WhatsApp"
      />
    </div>
  );
}

function SettingRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: "var(--border-subtle)" }}>
      <div>
        <p className="text-[12px] uppercase tracking-wider text-[color:var(--slate)]">{label}</p>
        <p className="mt-1 text-[15px] text-[color:var(--platinum)]">{value}</p>
      </div>
      <button className="text-[13px] font-medium text-[color:var(--electric)] hover:underline">Editar</button>
    </div>
  );
}

function ChannelRow({
  name,
  connected,
  meta,
  onDisconnect,
}: {
  name: string;
  connected: boolean;
  meta: string;
  onDisconnect?: () => void;
}) {
  return (
    <div
      className="flex items-center justify-between rounded-[12px] p-4"
      style={{
        background: "rgba(8,14,29,0.4)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      <div>
        <div className="flex items-center gap-2">
          <p className="text-[15px] font-semibold text-[color:var(--platinum)]">{name}</p>
          {connected ? (
            <span
              className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold"
              style={{ background: "rgba(0,214,143,0.12)", color: "var(--success)" }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--success)" }} />
              Conectado
            </span>
          ) : (
            <span className="text-[11px] text-[color:var(--slate)]">Desconectado</span>
          )}
        </div>
        <p className="mt-0.5 text-[12px] text-[color:var(--slate)]">{meta}</p>
      </div>
      {connected && onDisconnect ? (
        <button
          type="button"
          onClick={onDisconnect}
          className="inline-flex items-center gap-1.5 rounded-[8px] px-3 py-1.5 text-[12px] font-medium text-[color:var(--red-loss)] hover:bg-white/5"
        >
          <LogOut size={12} />
          Desconectar
        </button>
      ) : (
        connected && (
          <button className="text-[13px] font-medium text-[color:var(--slate)]">Configurar</button>
        )
      )}
    </div>
  );
}

function ToggleRow({ label, defaultOn = false }: { label: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between">
      <span className="text-[14px] text-[color:var(--platinum)]">{label}</span>
      <button
        type="button"
        onClick={() => setOn(!on)}
        className="relative h-6 w-11 rounded-full transition-colors"
        style={{ background: on ? "var(--electric)" : "var(--steel)" }}
      >
        <span
          className="absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform"
          style={{ transform: on ? "translateX(22px)" : "translateX(2px)" }}
        />
      </button>
    </div>
  );
}

function TeamRow({ name, email, role }: { name: string; email: string; role: string }) {
  return (
    <div
      className="flex items-center justify-between rounded-[10px] p-3"
      style={{
        background: "rgba(8,14,29,0.4)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      <div>
        <p className="text-[14px] font-semibold text-[color:var(--platinum)]">{name}</p>
        <p className="text-[12px] text-[color:var(--slate)]">{email}</p>
      </div>
      <span
        className="rounded-full px-2.5 py-1 text-[11px] font-bold"
        style={{
          background: role === "Owner" ? "rgba(30,95,255,0.15)" : "rgba(255,255,255,0.06)",
          color: role === "Owner" ? "var(--electric)" : "var(--slate-light)",
        }}
      >
        {role}
      </span>
    </div>
  );
}
