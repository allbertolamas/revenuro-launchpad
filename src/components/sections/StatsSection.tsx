import { motion } from "framer-motion";
import CountUp from "react-countup";

type Stat = {
  number: string;
  numericValue: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  color: string;
  glow: string;
  bg?: string;
  border?: string;
  text: string;
  sub: string;
  source: string;
};

const STATS: Stat[] = [
  {
    number: "62%",
    numericValue: 62,
    suffix: "%",
    color: "var(--amber)",
    glow: "rgba(255,176,32,0.3)",
    text: "de tus leads llegan después de las 6 PM",
    sub: "Cuando ya cerraste y nadie contesta.",
    source: "— Homeflow / Proyectoras LATAM, 2025",
  },
  {
    number: "48%",
    numericValue: 48,
    suffix: "%",
    color: "var(--red-loss)",
    glow: "rgba(255,71,87,0.3)",
    text: "de consultas inmobiliarias nunca reciben respuesta",
    sub: "Casi la mitad de las personas que contactaron tu negocio — ignoradas.",
    source: "— Homeflow Research",
  },
  {
    number: "21×",
    numericValue: 21,
    suffix: "×",
    color: "var(--amber)",
    glow: "rgba(255,176,32,0.3)",
    text: "menos probabilidad de cierre si respondes después de 5 minutos",
    sub: "En ese tiempo, tu competencia ya tomó la llamada.",
    source: "— InsideSales Lead Response Study",
  },
  {
    number: "11.4%",
    numericValue: 11.4,
    decimals: 1,
    suffix: "%",
    color: "var(--success)",
    glow: "rgba(0,214,143,0.25)",
    bg: "rgba(0,214,143,0.04)",
    border: "rgba(0,214,143,0.15)",
    text: "del PIB nacional es el sector vivienda en México",
    sub: "$3.58 billones de pesos en movimiento. El problema no es la demanda.",
    source: "— INEGI, Cuenta Satélite de Vivienda 2024",
  },
];

export function StatsSection() {
  return (
    <section
      className="bg-grid-subtle relative overflow-hidden"
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
          <p
            className="text-[11px] font-semibold uppercase text-[color:var(--electric)]"
            style={{ letterSpacing: "0.14em" }}
          >
            La realidad del mercado inmobiliario en México
          </p>
          <h2 className="mt-4 text-[36px] sm:text-[44px] lg:text-[52px] font-bold leading-[1.1] tracking-[-0.02em] text-[color:var(--platinum)]">
            Los números que nadie en tu equipo quiere ver
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[18px] leading-[1.6] text-[color:var(--slate)]">
            Datos verificados de INEGI, InsideSales y estudios de comportamiento inmobiliario en
            México y LATAM.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-[16px] p-9"
              style={{
                background: s.bg ?? "var(--card-bg)",
                border: `1px solid ${s.border ?? "var(--border-subtle)"}`,
                backdropFilter: "blur(12px)",
              }}
            >
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-10"
                style={{ background: s.color }}
              />
              <div
                className="tabular text-[64px] sm:text-[72px] font-extrabold leading-none"
                style={{ color: s.color, textShadow: `0 0 40px ${s.glow}` }}
              >
                <CountUp
                  end={s.numericValue}
                  duration={2.2}
                  decimals={s.decimals ?? 0}
                  enableScrollSpy
                  scrollSpyOnce
                />
                {s.suffix}
              </div>
              <p className="mt-4 text-[18px] font-semibold text-[color:var(--platinum)]">
                {s.text}
              </p>
              <p className="mt-2 text-[14px] text-[color:var(--slate)]">{s.sub}</p>
              <p className="mt-3 text-[12px] text-[color:var(--slate)] opacity-70">{s.source}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
