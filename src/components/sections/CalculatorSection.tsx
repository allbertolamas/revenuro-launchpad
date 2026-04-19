import { useMemo, useState } from "react";
import { motion } from "framer-motion";

function Slider({
  label,
  min,
  max,
  step,
  value,
  onChange,
  format,
}: {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between">
        <span className="text-[14px] font-medium text-[color:var(--slate-light)]">{label}</span>
        <span className="tabular text-[18px] font-bold text-[color:var(--platinum)]">
          {format(value)}
        </span>
      </div>
      <div className="relative h-2 rounded-full" style={{ background: "var(--steel-light)" }}>
        <div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{
            width: `${pct}%`,
            background: "var(--electric)",
            boxShadow: "0 0 12px rgba(30,95,255,0.6)",
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
        <div
          className="pointer-events-none absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-[color:var(--midnight)]"
          style={{
            left: `${pct}%`,
            background: "var(--electric)",
            boxShadow: "0 0 12px rgba(30,95,255,0.7)",
          }}
        />
      </div>
    </div>
  );
}

const fmtMoney = (v: number) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(v);

export function CalculatorSection() {
  const [leads, setLeads] = useState(80);
  const [pct, setPct] = useState(60);
  const [commission, setCommission] = useState(150000);

  const loss = useMemo(() => {
    const noAtendidos = leads * (pct / 100);
    const cierres = noAtendidos * 0.08;
    return Math.round(cierres * commission);
  }, [leads, pct, commission]);

  return (
    <section
      id="calculadora"
      className="relative"
      style={{ background: "var(--midnight)", paddingTop: "120px", paddingBottom: "120px" }}
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-[760px] rounded-[20px] p-8 sm:p-12 lg:p-14"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--border-subtle)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 0 0 1px rgba(30,95,255,0.08), 0 40px 80px rgba(0,0,0,0.4)",
          }}
        >
          <h2 className="text-center text-[28px] sm:text-[32px] font-bold leading-tight tracking-[-0.02em] text-[color:var(--platinum)]">
            ¿Cuánto estás perdiendo cada mes?
          </h2>
          <p className="mt-3 text-center text-[16px] text-[color:var(--slate)]">
            Ajusta los valores y ve el impacto en tiempo real.
          </p>

          <div className="mt-10 space-y-7">
            <Slider
              label="Leads que recibes al mes"
              min={10}
              max={300}
              step={5}
              value={leads}
              onChange={setLeads}
              format={(v) => `${v} leads`}
            />
            <Slider
              label="% que no reciben respuesta en 5 minutos"
              min={20}
              max={80}
              step={1}
              value={pct}
              onChange={setPct}
              format={(v) => `${v}%`}
            />
            <Slider
              label="Tu comisión promedio por cierre (MXN)"
              min={50000}
              max={500000}
              step={5000}
              value={commission}
              onChange={setCommission}
              format={fmtMoney}
            />
          </div>

          <div
            className="mt-10 rounded-[12px] px-6 py-7 sm:px-8"
            style={{
              background: "rgba(255,71,87,0.06)",
              border: "1px solid rgba(255,71,87,0.2)",
            }}
          >
            <p className="text-center text-[15px] text-[color:var(--slate)]">
              Estás perdiendo aproximadamente
            </p>
            <motion.div
              key={loss}
              initial={{ opacity: 0.6, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="tabular mt-2 text-center text-[40px] sm:text-[56px] font-extrabold leading-tight"
              style={{ color: "var(--red-loss)", textShadow: "0 0 40px rgba(255,71,87,0.3)" }}
            >
              {fmtMoney(loss)}
              <span className="text-[20px] sm:text-[24px] font-medium opacity-70">/mes</span>
            </motion.div>
            <p className="mt-3 text-center text-[16px] sm:text-[17px] font-semibold text-[color:var(--success)]">
              Con Revenuro, ese número puede ser $0.
            </p>
          </div>

          <a
            href="#cta-final"
            className="btn-primary mt-8 w-full justify-center !py-4 text-[16px]"
          >
            Activar mi sistema y recuperar ese dinero <span className="arrow">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
