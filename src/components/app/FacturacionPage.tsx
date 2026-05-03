import { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  Download,
  CheckCircle2,
  TrendingUp,
  Trash2,
  XCircle,
} from "lucide-react";
import { DestructiveConfirmModal } from "@/components/ui/DestructiveConfirmModal";

const INVOICES = [
  { id: "INV-2026-04", date: "1 abr 2026", amount: 199, status: "Pagada" },
  { id: "INV-2026-03", date: "1 mar 2026", amount: 199, status: "Pagada" },
  { id: "INV-2026-02", date: "1 feb 2026", amount: 199, status: "Pagada" },
  { id: "INV-2026-01", date: "1 ene 2026", amount: 199, status: "Pagada" },
];

export function FacturacionPage() {
  const [cancelOpen, setCancelOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [canceled, setCanceled] = useState(false);

  return (
    <div className="px-6 py-8 sm:px-10 sm:py-10">
      <header className="mb-8">
        <h1 className="text-[28px] sm:text-[32px] font-bold tracking-[-0.01em] text-[color:var(--platinum)]">
          Facturación
        </h1>
        <p className="mt-1.5 text-[14px] sm:text-[15px] text-[color:var(--slate)]">
          Plan actual, uso del mes, historial de cobros y valor estimado generado.
        </p>
      </header>

      {canceled && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[12px] font-medium"
          style={{ background: "rgba(255,176,32,0.1)", color: "var(--amber)" }}
        >
          <CheckCircle2 size={14} />
          Tu suscripción se cancelará al final del periodo actual.
        </motion.div>
      )}

      {/* Plan actual */}
      <section
        className="mb-6 rounded-[16px] p-6 sm:p-8"
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--border-subtle)",
        }}
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p
              className="text-[11px] font-bold uppercase"
              style={{ letterSpacing: "0.12em", color: "var(--electric)" }}
            >
              Plan actual
            </p>
            <h2 className="mt-2 text-[24px] font-bold text-[color:var(--platinum)]">
              Revenue Engine
            </h2>
            <p className="mt-1 text-[13px] text-[color:var(--slate)]">
              Próxima renovación: 1 may 2026 · $199 USD/mes
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:items-end">
            <button className="btn-primary">Cambiar plan</button>
            <button
              type="button"
              onClick={() => setCancelOpen(true)}
              className="text-[13px] font-medium text-[color:var(--slate)] hover:text-[color:var(--red-loss)]"
            >
              Cancelar suscripción
            </button>
          </div>
        </div>
      </section>

      {/* Uso del mes */}
      <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <UsageCard label="Minutos de voz" used={342} total={500} unit="min" />
        <UsageCard label="Conversaciones" used={684} total={1000} unit="conv" />
      </section>

      {/* Valor generado */}
      <section
        className="mb-6 rounded-[16px] p-6 sm:p-8"
        style={{
          background: "linear-gradient(135deg, rgba(0,214,143,0.08), rgba(30,95,255,0.05))",
          border: "1px solid rgba(0,214,143,0.18)",
        }}
      >
        <div className="flex items-start gap-3">
          <TrendingUp size={22} color="var(--success)" className="mt-1" />
          <div>
            <h3 className="text-[18px] font-bold text-[color:var(--platinum)]">
              Valor estimado generado este mes
            </h3>
            <p className="mt-1 text-[34px] font-extrabold tabular text-[color:var(--success)]">
              $1,840,000 MXN
            </p>
            <p className="mt-1 text-[13px] text-[color:var(--slate)]">
              23 cierres atribuibles · ROI: 92x sobre tu plan
            </p>
          </div>
        </div>
      </section>

      {/* Método de pago */}
      <section
        className="mb-6 rounded-[16px] p-6"
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--border-subtle)",
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-14 items-center justify-center rounded-[8px]"
              style={{ background: "rgba(30,95,255,0.12)" }}
            >
              <CreditCard size={18} color="var(--electric)" />
            </div>
            <div>
              <p className="text-[14px] font-semibold text-[color:var(--platinum)]">
                Visa terminada en 4242
              </p>
              <p className="text-[12px] text-[color:var(--slate)]">Vence 12/28</p>
            </div>
          </div>
          <button className="text-[13px] font-medium text-[color:var(--electric)] hover:underline">
            Cambiar
          </button>
        </div>
      </section>

      {/* Historial */}
      <section
        className="mb-6 rounded-[16px] p-6"
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--border-subtle)",
        }}
      >
        <h3 className="mb-4 text-[16px] font-bold text-[color:var(--platinum)]">
          Historial de cobros
        </h3>
        <div className="overflow-hidden rounded-[10px]" style={{ border: "1px solid var(--border-subtle)" }}>
          <table className="w-full">
            <thead>
              <tr style={{ background: "rgba(8,14,29,0.6)" }}>
                <th className="p-3 text-left text-[11px] font-bold uppercase tracking-wider text-[color:var(--slate)]">
                  Factura
                </th>
                <th className="p-3 text-left text-[11px] font-bold uppercase tracking-wider text-[color:var(--slate)]">
                  Fecha
                </th>
                <th className="p-3 text-left text-[11px] font-bold uppercase tracking-wider text-[color:var(--slate)]">
                  Monto
                </th>
                <th className="p-3 text-left text-[11px] font-bold uppercase tracking-wider text-[color:var(--slate)]">
                  Estado
                </th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {INVOICES.map((inv) => (
                <tr key={inv.id} style={{ borderTop: "1px solid var(--border-subtle)" }}>
                  <td className="p-3 text-[13px] text-[color:var(--platinum)]">{inv.id}</td>
                  <td className="p-3 text-[13px] text-[color:var(--slate-light)]">{inv.date}</td>
                  <td className="p-3 text-[13px] text-[color:var(--platinum)]">
                    ${inv.amount} USD
                  </td>
                  <td className="p-3">
                    <span
                      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold"
                      style={{ background: "rgba(0,214,143,0.12)", color: "var(--success)" }}
                    >
                      <CheckCircle2 size={10} />
                      {inv.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button className="inline-flex items-center gap-1 text-[12px] font-medium text-[color:var(--electric)] hover:underline">
                      <Download size={12} />
                      PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Zona de peligro */}
      <section
        className="rounded-[16px] p-6"
        style={{
          background: "rgba(255,71,87,0.04)",
          border: "1px solid rgba(255,71,87,0.18)",
        }}
      >
        <h3 className="text-[16px] font-bold text-[color:var(--red-loss)]">Zona de peligro</h3>
        <p className="mt-1 text-[13px] text-[color:var(--slate)]">
          Acciones irreversibles. Procede con cuidado.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => setCancelOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-[10px] px-4 py-2.5 text-[13px] font-semibold text-[color:var(--amber)]"
            style={{
              background: "rgba(255,176,32,0.08)",
              border: "1px solid rgba(255,176,32,0.25)",
            }}
          >
            <XCircle size={14} />
            Cancelar suscripción
          </button>
          <button
            type="button"
            onClick={() => setDeleteOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-[10px] px-4 py-2.5 text-[13px] font-semibold text-[color:var(--red-loss)]"
            style={{
              background: "rgba(255,71,87,0.08)",
              border: "1px solid rgba(255,71,87,0.25)",
            }}
          >
            <Trash2 size={14} />
            Eliminar cuenta permanentemente
          </button>
        </div>
      </section>

      <DestructiveConfirmModal
        isOpen={cancelOpen}
        onClose={() => setCancelOpen(false)}
        onConfirm={() => {
          setCanceled(true);
        }}
        severity="warning"
        title="Cancelar suscripción"
        description="Tu plan Revenue Engine se cancelará al final del periodo actual (1 may 2026)."
        consequences={[
          "Tu sistema seguirá activo hasta el 1 may 2026.",
          "Después de esa fecha, dejará de responder a tus leads.",
          "Tus datos se conservan 30 días por si reactivas.",
          "Puedes reactivar con un click antes de que expire.",
        ]}
        confirmText="CANCELAR"
        confirmLabel="Sí, cancelar mi suscripción"
      />

      <DestructiveConfirmModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={() => {
          window.localStorage.clear();
          window.location.href = "/";
        }}
        severity="danger"
        title="Eliminar cuenta"
        description="Esto borrará permanentemente tu cuenta y todos tus datos. No se puede deshacer."
        consequences={[
          "Tu cuenta se elimina inmediatamente.",
          "Todos tus leads, conversaciones e historial se borran.",
          "Tu sistema se apaga y no podrá reactivarse.",
          "Esta acción es 100% irreversible.",
        ]}
        confirmText="ELIMINAR CUENTA"
        confirmLabel="Eliminar mi cuenta para siempre"
      />
    </div>
  );
}

function UsageCard({
  label,
  used,
  total,
  unit,
}: {
  label: string;
  used: number;
  total: number;
  unit: string;
}) {
  const pct = Math.round((used / total) * 100);
  const color =
    pct >= 90 ? "var(--red-loss)" : pct >= 70 ? "var(--amber)" : "var(--electric)";
  return (
    <div
      className="rounded-[14px] p-5"
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      <p className="text-[12px] uppercase tracking-wider text-[color:var(--slate)]">{label}</p>
      <p className="mt-2 text-[24px] font-extrabold tabular text-[color:var(--platinum)]">
        {used.toLocaleString()}
        <span className="text-[14px] font-medium text-[color:var(--slate)]">
          {" / "}
          {total.toLocaleString()} {unit}
        </span>
      </p>
      <div
        className="mt-3 h-2 overflow-hidden rounded-full"
        style={{ background: "var(--steel)" }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
      <p className="mt-2 text-[11px]" style={{ color }}>
        {pct}% utilizado
      </p>
    </div>
  );
}
