import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const ROWS: Array<[string, string, string, string]> = [
  ["Costo mensual", "$25,000–35,000 MXN", "$6,000–50,000 MXN", "desde $1,700 MXN"],
  ["Disponibilidad", "8 hrs / 5 días", "Variable", "24 / 7 / 365"],
  ["Responde leads en", "Minutos u horas", "Variable", "< 12 segundos"],
  ["Días malos / ausencias", "Sí", "Sí", "Nunca"],
  ["Escala sin costo extra", "No", "No", "Sí"],
  ["Configuración inicial", "Semanas", "Semanas", "15 minutos"],
];

function Cell({ value, isRevenuro }: { value: string; isRevenuro?: boolean }) {
  const positive = isRevenuro && (value === "Nunca" || value === "Sí" || value.includes("24") || value.includes("12 segundos") || value.includes("15"));
  const negative = !isRevenuro && (value === "Sí" || value === "No" || value.includes("Variable"));
  return (
    <div className={`flex items-center gap-2 ${isRevenuro ? "font-semibold text-[color:var(--success)]" : "text-[color:var(--slate-light)]"}`}>
      {isRevenuro && positive && <Check size={14} className="flex-shrink-0" />}
      {!isRevenuro && negative && value === "Sí" && <X size={14} className="flex-shrink-0 text-[color:var(--red-loss)]" />}
      <span>{value}</span>
    </div>
  );
}

export function ReplacesTable() {
  return (
    <section
      className="relative"
      style={{ background: "var(--navy)", paddingTop: "120px", paddingBottom: "120px" }}
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-[34px] sm:text-[42px] lg:text-[48px] font-bold leading-[1.1] tracking-[-0.02em] text-[color:var(--platinum)]">
            Estabas a punto de contratar a alguien para hacer esto.
          </h2>
          <p className="mt-4 text-[18px] text-[color:var(--slate)]">
            Compara antes de decidir.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-14 max-w-[900px] overflow-hidden rounded-[20px]"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--border-subtle)",
            backdropFilter: "blur(12px)",
          }}
        >
          {/* Header */}
          <div className="grid grid-cols-[1.3fr_1fr_1fr_1.1fr] text-[12px] sm:text-[14px]">
            <div className="p-4 sm:p-5" />
            <div className="p-4 sm:p-5 text-center font-semibold text-[color:var(--slate-light)]">
              Recepcionista
            </div>
            <div className="p-4 sm:p-5 text-center font-semibold text-[color:var(--slate-light)]">
              Servicio externo
            </div>
            <div
              className="relative p-4 sm:p-5 text-center font-bold text-[color:var(--platinum)]"
              style={{
                background: "rgba(30,95,255,0.08)",
                borderLeft: "1px solid rgba(30,95,255,0.25)",
                borderRight: "1px solid rgba(30,95,255,0.25)",
              }}
            >
              <span
                className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white"
                style={{ background: "var(--electric)" }}
              >
                Recomendado
              </span>
              Revenuro
            </div>
          </div>

          {ROWS.map((row, idx) => (
            <div
              key={idx}
              className="grid grid-cols-[1.3fr_1fr_1fr_1.1fr] text-[12px] sm:text-[14px]"
              style={{
                borderTop: "1px solid var(--steel)",
                background: idx % 2 === 1 ? "rgba(8,14,29,0.3)" : "transparent",
              }}
            >
              <div className="p-4 sm:p-5 font-medium text-[color:var(--platinum)]">
                {row[0]}
              </div>
              <div className="p-4 sm:p-5 text-center">
                <Cell value={row[1]} />
              </div>
              <div className="p-4 sm:p-5 text-center">
                <Cell value={row[2]} />
              </div>
              <div
                className="p-4 sm:p-5 text-center"
                style={{
                  background: "rgba(30,95,255,0.06)",
                  borderLeft: "1px solid rgba(30,95,255,0.25)",
                  borderRight: "1px solid rgba(30,95,255,0.25)",
                }}
              >
                <div className="flex justify-center">
                  <Cell value={row[3]} isRevenuro />
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-10 max-w-[600px] text-center text-[16px] sm:text-[17px] font-medium text-[color:var(--platinum)]"
        >
          No estás pagando software. Estás activando tu sistema de ventas más confiable.
        </motion.p>
      </div>
    </section>
  );
}
