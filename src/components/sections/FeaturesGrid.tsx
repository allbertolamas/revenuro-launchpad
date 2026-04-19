import { motion } from "framer-motion";
import { Zap, Filter, Calendar, RefreshCw, BarChart2, Edit3 } from "lucide-react";

const FEATURES = [
  {
    Icon: Zap,
    title: "Respuesta en 12 segundos",
    text: "Cada lead recibe respuesta inmediata, a cualquier hora. Nunca más un lead sin contestar.",
  },
  {
    Icon: Filter,
    title: "Calificación automática",
    text: "Preguntas inteligentes adaptadas a zona, tipo de propiedad y presupuesto. Leads listos para ti antes de que llegues.",
  },
  {
    Icon: Calendar,
    title: "Agendado sin fricción",
    text: "Citas directo en tu calendario con recordatorios automáticos 24h y 1h antes.",
  },
  {
    Icon: RefreshCw,
    title: "Seguimiento que no falla",
    text: "Si no confirman, el sistema reactiva. Si no convierten en 30 días, los recupera con un mensaje personalizado.",
  },
  {
    Icon: BarChart2,
    title: "Dashboard de resultados",
    text: "Ve en tiempo real leads atendidos, citas generadas y pipeline estimado en pesos. Números reales, no suposiciones.",
  },
  {
    Icon: Edit3,
    title: "Mensajes que suenan como tú",
    text: "Revisa y edita cada mensaje del sistema en lenguaje natural. Tú controlas el tono, las palabras, todo el sistema.",
  },
];

export function FeaturesGrid() {
  return (
    <section
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
            Capacidades
          </p>
          <h2 className="mt-4 text-[36px] sm:text-[44px] lg:text-[52px] font-bold leading-[1.1] tracking-[-0.02em] text-[color:var(--platinum)]">
            Tu sistema trabaja. Tú cierras.
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[18px] text-[color:var(--slate)]">
            Todo lo que ocurre automáticamente mientras tú te dedicas a vender.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="group rounded-[14px] p-7 transition-all duration-300"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--border-subtle)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div
                className="flex h-11 w-11 items-center justify-center rounded-[10px] transition-all group-hover:shadow-[0_0_20px_rgba(30,95,255,0.3)]"
                style={{
                  background: "rgba(30,95,255,0.1)",
                  border: "1px solid rgba(30,95,255,0.2)",
                }}
              >
                <f.Icon size={20} className="text-[color:var(--electric)]" />
              </div>
              <h3 className="mt-5 text-[18px] font-semibold text-[color:var(--platinum)]">
                {f.title}
              </h3>
              <p className="mt-2 text-[15px] leading-[1.65] text-[color:var(--slate)]">
                {f.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
