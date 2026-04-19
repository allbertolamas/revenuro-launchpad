import { motion } from "framer-motion";
import { Rocket, Users } from "lucide-react";

const CARDS = [
  {
    Icon: Rocket,
    title: "Lo configuras en 15 minutos",
    text: "Entra, conecta tu WhatsApp, sube tu inventario y activa. El sistema crea tu agente automáticamente. Sin llamadas, sin esperas.",
    bullets: ["Sin instalaciones", "Sin conocimientos técnicos", "Sin intervención del equipo"],
    cta: "Empezar ahora",
    micro: "Sin tarjeta de crédito · 5 días gratis",
    primary: true,
  },
  {
    Icon: Users,
    title: "Nuestro equipo lo integra por ti",
    text: "¿Tienes CRM, múltiples agentes o una operación más compleja? Pago único de implementación. Tu equipo queda activo en 48 horas.",
    bullets: [
      "Integración con tu CRM existente",
      "Configuración de workflows personalizados",
      "Capacitación de tu equipo",
    ],
    cta: "Hablar con el equipo",
    primary: false,
  },
];

export function TwoPaths() {
  return (
    <section
      id="dos-formas"
      className="relative"
      style={{ background: "var(--navy)", paddingTop: "120px", paddingBottom: "120px" }}
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center text-[36px] sm:text-[44px] lg:text-[48px] font-bold leading-[1.1] tracking-[-0.02em] text-[color:var(--platinum)]"
        >
          Elige cómo quieres empezar hoy.
        </motion.h2>

        <div className="mx-auto mt-12 grid max-w-[960px] grid-cols-1 gap-6 lg:grid-cols-2">
          {CARDS.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col rounded-[16px] p-10"
              style={{
                background: "var(--card-bg)",
                border: c.primary
                  ? "1px solid rgba(30,95,255,0.3)"
                  : "1px solid var(--border-subtle)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div
                className="flex h-16 w-16 items-center justify-center rounded-[14px]"
                style={{
                  background: "rgba(30,95,255,0.1)",
                  border: "1px solid rgba(30,95,255,0.2)",
                }}
              >
                <c.Icon size={28} className="text-[color:var(--electric)]" />
              </div>

              <h3 className="mt-6 text-[24px] font-semibold text-[color:var(--platinum)]">
                {c.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.7] text-[color:var(--slate)]">{c.text}</p>

              <ul className="mt-6 flex-1 space-y-2">
                {c.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-center gap-3 text-[14px] text-[color:var(--slate-light)]"
                  >
                    <span className="text-[color:var(--electric)]">→</span>
                    {b}
                  </li>
                ))}
              </ul>

              <a
                href="#cta-final"
                className={`mt-8 justify-center ${c.primary ? "btn-primary" : "btn-ghost"}`}
              >
                {c.cta} {c.primary && <span className="arrow">→</span>}
              </a>
              {c.micro && (
                <p className="mt-3 text-center text-[12px] text-[color:var(--slate)]">
                  {c.micro}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
