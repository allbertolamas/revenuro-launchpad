import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "¿Mis clientes van a saber que es un sistema automatizado?",
    a: "El asistente trabaja con el nombre y el tono que tú elijas. Puede llamarse Carlos, hablar como tú hablas y sonar completamente natural en cada conversación. Tú decides cómo lo presentas a tus clientes.",
  },
  {
    q: "¿Funciona con mi número de WhatsApp actual?",
    a: "Sí. Conectas tu WhatsApp Business existente en 2 clics con autorización directa. Tus contactos no se enteran de ningún cambio, conservas todo tu historial y tu número de siempre.",
  },
  {
    q: "¿Qué pasa si alguien pregunta algo fuera del alcance del sistema?",
    a: "El sistema detecta cuando algo requiere tu atención directa y te notifica al instante con el contexto completo de la conversación. Nunca deja a un lead sin respuesta ni sin escalamiento a ti.",
  },
  {
    q: "¿Cuánto tarda en estar funcionando?",
    a: "Si lo configuras tú con nuestro wizard: 15 minutos. Si lo hace nuestro equipo con integraciones complejas (CRM, múltiples canales, workflows personalizados): 48 horas.",
  },
  {
    q: "¿Se integra con mi CRM inmobiliario?",
    a: "Sí. Compatible con Tokko Broker, WebProp, Google Calendar, HubSpot y más. Si usas algo diferente, el equipo de implementación lo conecta directamente.",
  },
  {
    q: "¿Y si cancelo?",
    a: "Cancelas desde tu dashboard en un clic. Sin penalizaciones, sin contratos de permanencia, sin llamadas de retención. Tu sistema se desactiva ese mismo día.",
  },
  {
    q: "¿Mis datos y los de mis clientes están protegidos?",
    a: "Toda la información se almacena con encriptación y cumple con la LFPDPPP (Ley Federal de Protección de Datos Personales en México). La infraestructura cumple con SOC 2 y cuenta con modo de retención cero disponible.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      className="relative"
      style={{ background: "var(--midnight)", paddingTop: "120px", paddingBottom: "120px" }}
    >
      <div className="mx-auto max-w-[760px] px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center text-[36px] sm:text-[44px] lg:text-[48px] font-bold tracking-[-0.02em] text-[color:var(--platinum)]"
        >
          Preguntas frecuentes
        </motion.h2>

        <div className="mt-12">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                style={{ borderBottom: "1px solid var(--steel)" }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-[color:var(--electric)]"
                >
                  <span className="text-[16px] sm:text-[17px] font-semibold text-[color:var(--platinum)] group-hover:text-[color:var(--electric)]">
                    {f.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className="flex-shrink-0 transition-transform duration-300 text-[color:var(--slate)]"
                    style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <p className="pb-5 pr-8 text-[15px] leading-[1.7] text-[color:var(--slate)]">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
