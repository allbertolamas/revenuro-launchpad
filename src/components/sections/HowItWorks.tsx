import { motion } from "framer-motion";
import { MessageCircle, Zap, Calendar, X, Check } from "lucide-react";

const STEPS = [
  {
    n: "01",
    Icon: MessageCircle,
    title: "Tu lead llega — por donde sea",
    text: "WhatsApp, llamada, formulario web, redes sociales. A cualquier hora. El sistema captura todo al instante, sin importar el canal ni si estás disponible.",
    chips: ["WhatsApp", "Llamada", "Formulario", "Instagram"],
  },
  {
    n: "02",
    Icon: Zap,
    title: "El sistema actúa en segundos",
    text: "Responde de inmediato con el tono y nombre que elijas. Hace las preguntas correctas según el tipo de propiedad, zona y presupuesto. Sin improvisación. Sin días malos.",
    badge: "⚡ Tiempo de respuesta: < 12 segundos",
  },
  {
    n: "03",
    Icon: Calendar,
    title: "Tú recibes la cita. Solo apareces a cerrar.",
    text: "El sistema agenda en tu calendario, manda recordatorios y confirma asistencia. Cuando llegues a la cita, el lead ya sabe quién eres, ya está listo.",
  },
];

const WITHOUT = [
  "10:45 PM — Lead contacta por WhatsApp",
  "— Sin respuesta",
  "10:48 PM — Lead escribe de nuevo",
  "— Sin respuesta",
  "10:52 PM — Lead contacta a otro asesor",
  "10:53 PM — Oportunidad perdida 💸",
];

const WITH = [
  "10:45 PM — Lead contacta por WhatsApp",
  "10:45:12 PM — Respuesta inmediata",
  "10:45:45 PM — Lead calificado",
  "10:46:20 PM — Cita agendada",
  "10:46:30 PM — Broker notificado",
];

export function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="relative"
      style={{ background: "var(--midnight)", paddingTop: "120px", paddingBottom: "120px" }}
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
            El sistema
          </p>
          <h2 className="mt-4 text-[36px] sm:text-[44px] lg:text-[52px] font-bold leading-[1.1] tracking-[-0.02em] text-[color:var(--platinum)]">
            De lead ignorado a cita confirmada.
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-[18px] text-[color:var(--slate)]">
            Sin intervención humana. Sin errores. Sin excepciones.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mx-auto mt-16 max-w-[760px]">
          <div
            className="absolute left-[27px] top-4 bottom-4 w-[2px] hidden sm:block"
            style={{
              background:
                "linear-gradient(to bottom, var(--electric), rgba(30,95,255,0.2))",
              opacity: 0.5,
            }}
          />

          <div className="space-y-12">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="flex gap-6 sm:gap-8"
              >
                <div className="relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full"
                  style={{
                    background: "var(--midnight)",
                    border: "1px solid rgba(30,95,255,0.4)",
                    boxShadow: "0 0 24px rgba(30,95,255,0.15)",
                  }}>
                  <s.Icon size={22} className="text-[color:var(--electric)]" />
                </div>
                <div className="flex-1 pt-1">
                  <div
                    className="font-mono text-[13px] font-semibold text-[color:var(--electric)]"
                  >
                    {s.n}
                  </div>
                  <h3 className="mt-2 text-[22px] sm:text-[24px] font-semibold text-[color:var(--platinum)]">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-[520px] text-[16px] leading-[1.7] text-[color:var(--slate)]">
                    {s.text}
                  </p>
                  {s.chips && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {s.chips.map((c) => (
                        <span
                          key={c}
                          className="rounded-full px-3 py-1 text-[12px] font-medium text-[color:var(--slate-light)]"
                          style={{
                            background: "rgba(12,23,48,0.6)",
                            border: "1px solid var(--steel-light)",
                          }}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  )}
                  {s.badge && (
                    <div
                      className="mt-4 inline-block rounded-lg px-4 py-2 font-mono text-[13px] text-[color:var(--electric)]"
                      style={{
                        background: "rgba(30,95,255,0.1)",
                        border: "1px solid rgba(30,95,255,0.25)",
                      }}
                    >
                      {s.badge}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Comparison */}
        <div className="mt-24">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center text-[28px] sm:text-[32px] font-bold text-[color:var(--platinum)]"
          >
            La diferencia es visible
          </motion.h3>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="rounded-[12px] p-6"
              style={{
                background: "rgba(255,71,87,0.04)",
                border: "1px solid rgba(255,71,87,0.15)",
              }}
            >
              <div className="mb-5 text-[14px] font-semibold uppercase tracking-wider text-[color:var(--red-loss)]">
                Sin Revenuro
              </div>
              <ul className="space-y-3">
                {WITHOUT.map((t, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex gap-3 text-[14px] text-[color:var(--slate-light)]"
                  >
                    <X size={16} className="mt-0.5 flex-shrink-0 text-[color:var(--red-loss)]" />
                    <span>{t}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="rounded-[12px] p-6"
              style={{
                background: "rgba(0,214,143,0.04)",
                border: "1px solid rgba(0,214,143,0.15)",
              }}
            >
              <div className="mb-5 text-[14px] font-semibold uppercase tracking-wider text-[color:var(--success)]">
                Con Revenuro
              </div>
              <ul className="space-y-3">
                {WITH.map((t, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex gap-3 text-[14px] text-[color:var(--slate-light)]"
                  >
                    <Check size={16} className="mt-0.5 flex-shrink-0 text-[color:var(--success)]" />
                    <span>{t}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
