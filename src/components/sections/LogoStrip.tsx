import { motion } from "framer-motion";

const SOURCES = [
  "INEGI",
  "InsideSales",
  "Harvard Business Review",
  "Homeflow",
  "BBVA Research",
  "NAR",
];

export function LogoStrip() {
  return (
    <section
      style={{
        background: "var(--midnight)",
        borderTop: "1px solid var(--steel)",
        borderBottom: "1px solid var(--steel)",
      }}
      className="py-10"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <p
          className="text-center text-[12px] font-medium uppercase text-[color:var(--slate)]"
          style={{ letterSpacing: "0.1em" }}
        >
          Datos que respaldan cada decisión de diseño
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-3"
        >
          {SOURCES.map((s, i) => (
            <span key={s} className="flex items-center gap-3">
              <span
                className="text-[14px] font-semibold text-[color:var(--slate)] opacity-40 transition-opacity duration-200 hover:opacity-70"
                style={{ letterSpacing: "0.02em" }}
              >
                {s}
              </span>
              {i < SOURCES.length - 1 && (
                <span className="text-[color:var(--steel-light)]">·</span>
              )}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
