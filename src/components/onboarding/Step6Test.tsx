import { useEffect } from "react";
import { Mic } from "lucide-react";
import type { WizardData } from "./types";

export function Step6Test({
  data,
  update,
}: {
  data: WizardData;
  update: (patch: Partial<WizardData>) => void;
}) {
  useEffect(() => {
    if (!data.tested) update({ tested: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-5">
      <div
        className="overflow-hidden rounded-[20px]"
        style={{
          background: "var(--card-bg)",
          border: "1px solid rgba(30,95,255,0.2)",
          boxShadow:
            "0 0 0 1px rgba(30,95,255,0.1), 0 40px 80px rgba(0,0,0,0.5), 0 0 80px rgba(30,95,255,0.08)",
        }}
      >
        {/* Top bar */}
        <div
          className="flex h-12 items-center justify-between px-4"
          style={{
            background: "rgba(8,14,29,0.9)",
            borderBottom: "1px solid var(--steel)",
          }}
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--success)] opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--success)]" />
            </span>
            <span className="text-[13px] font-medium text-[color:var(--slate-light)]">
              Tu asistente: {data.assistantName || "Sin nombre"}
            </span>
          </div>
          <span
            className="rounded-md px-2 py-0.5 text-[10px] font-bold uppercase"
            style={{
              background: "rgba(255,176,32,0.15)",
              border: "1px solid rgba(255,176,32,0.3)",
              color: "var(--amber)",
            }}
          >
            Prueba
          </span>
        </div>

        {/* Body */}
        <div className="flex flex-col items-center gap-5 px-6 py-12 text-center">
          <div
            className="flex h-20 w-20 items-center justify-center rounded-[20px]"
            style={{
              background: "rgba(30,95,255,0.1)",
              border: "1px solid rgba(30,95,255,0.2)",
            }}
          >
            <Mic size={40} className="text-[color:var(--electric)]" />
          </div>
          <div>
            <p className="text-[18px] font-semibold text-[color:var(--platinum)]">
              Habla con tu asistente
            </p>
            <p className="mx-auto mt-2 max-w-[420px] text-[14px] text-[color:var(--slate)]">
              Pregunta sobre una propiedad, pide una cita, o haz lo que harían tus
              leads. Tu sistema responde con tu nombre, tu inventario y tus mensajes.
            </p>
          </div>

          {/* Context summary */}
          <div
            className="grid w-full max-w-[420px] grid-cols-3 gap-2 text-left"
            style={{ marginTop: 8 }}
          >
            <Stat label="Negocio" value={data.businessName || "—"} />
            <Stat
              label="Voz"
              value={
                data.voiceId.charAt(0).toUpperCase() + data.voiceId.slice(1)
              }
            />
            <Stat
              label="Inventario"
              value={
                data.inventoryCount > 0
                  ? `${data.inventoryCount} props`
                  : "Pendiente"
              }
            />
          </div>

          <p className="mt-2 text-[12px] text-[color:var(--slate)]">
            Widget de voz se conectará al activar tu sistema.
          </p>
        </div>
      </div>

      <p className="text-center text-[14px] text-[color:var(--slate)]">
        ¿Todo suena como quieres? Si no, vuelve al paso anterior y ajústalo.
      </p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="rounded-[10px] p-2.5"
      style={{
        background: "rgba(8,14,29,0.6)",
        border: "1px solid var(--steel)",
      }}
    >
      <p className="text-[10px] uppercase tracking-wider text-[color:var(--slate)]">
        {label}
      </p>
      <p className="mt-0.5 truncate text-[12px] font-semibold text-[color:var(--platinum)]">
        {value}
      </p>
    </div>
  );
}
