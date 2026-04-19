import { motion } from "framer-motion";

const HEADLINE_WORDS = [
  "Mientras",
  "lees",
  "esto,",
  "hay",
  "un",
  "lead",
  "tuyo",
  "que",
  "no",
  "recibió",
  "respuesta.",
];

export function FinalCTA() {
  return (
    <section
      id="cta-final"
      className="relative overflow-hidden bg-grid-subtle"
      style={{ background: "var(--navy)", paddingTop: "140px", paddingBottom: "140px" }}
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "1000px",
          height: "600px",
          background:
            "radial-gradient(ellipse at center, rgba(30,95,255,0.16) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1200px] px-6 text-center">
        <h2 className="mx-auto max-w-[760px] text-[38px] sm:text-[48px] lg:text-[60px] font-extrabold leading-[1.05] tracking-[-0.03em] text-[color:var(--platinum)]">
          {HEADLINE_WORDS.map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block mr-3"
            >
              {w}
            </motion.span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mx-auto mt-6 max-w-[560px] text-[18px] sm:text-[20px] leading-[1.5] text-[color:var(--slate-light)]"
        >
          En 15 minutos puedes asegurarte de que eso no vuelva a pasar.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10 flex flex-col items-center"
        >
          <motion.a
            whileHover={{ scale: 1.02, y: -2 }}
            href="#"
            className="btn-primary text-[16px] sm:text-[18px] !font-bold !px-10 !py-5 !rounded-[12px]"
            style={{ boxShadow: "0 0 40px rgba(30,95,255,0.3)" }}
          >
            Activar mi sistema gratis por 5 días <span className="arrow">→</span>
          </motion.a>

          <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[13px] font-medium text-[color:var(--slate)]">
            {["Sin tarjeta de crédito", "Cancela cuando quieras", "Activo en 15 minutos"].map(
              (t) => (
                <span key={t} className="inline-flex items-center gap-1.5">
                  <span className="text-[color:var(--success)]">✓</span> {t}
                </span>
              ),
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
