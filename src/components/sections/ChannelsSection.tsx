import { motion } from "framer-motion";
import {
  MessageCircle,
  Phone,
  FileText,
  Building2,
  Instagram,
  CalendarDays,
  Database,
  Globe,
  Layers,
  Bell,
} from "lucide-react";

const INPUTS = [
  { Icon: MessageCircle, name: "WhatsApp Business", desc: "Conecta tu número actual en 2 clics" },
  { Icon: Phone, name: "Llamadas telefónicas", desc: "Número dedicado o el tuyo existente" },
  { Icon: FileText, name: "Formularios web", desc: "Cualquier formulario, cualquier portal" },
  { Icon: Building2, name: "Inmuebles24 / Lamudi", desc: "Leads de portales en automático" },
  { Icon: Instagram, name: "Instagram / Facebook", desc: "Mensajes y leads de redes sociales" },
];

const OUTPUTS = [
  { Icon: CalendarDays, name: "Google Calendar / Outlook", desc: "Citas directamente en tu agenda" },
  { Icon: Database, name: "Tokko Broker", desc: "Sincronización nativa" },
  { Icon: Globe, name: "WebProp", desc: "Integración directa" },
  { Icon: Layers, name: "HubSpot / CRM genérico", desc: "Vía conexión estándar" },
  { Icon: Bell, name: "WhatsApp de notificaciones", desc: "Tú recibes alertas al instante" },
];

function Column({ title, items }: { title: string; items: typeof INPUTS }) {
  return (
    <div>
      <h3 className="text-[14px] font-semibold uppercase tracking-wider text-[color:var(--slate)]">
        {title}
      </h3>
      <ul className="mt-5">
        {items.map((it, i) => (
          <motion.li
            key={it.name}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="flex items-center gap-4 py-4"
            style={{ borderBottom: i < items.length - 1 ? "1px solid var(--steel)" : "none" }}
          >
            <div
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[8px]"
              style={{
                background: "rgba(30,95,255,0.08)",
                border: "1px solid rgba(30,95,255,0.18)",
              }}
            >
              <it.Icon size={18} className="text-[color:var(--electric)]" />
            </div>
            <div>
              <div className="text-[15px] font-semibold text-[color:var(--platinum)]">
                {it.name}
              </div>
              <div className="text-[13px] text-[color:var(--slate)]">{it.desc}</div>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export function ChannelsSection() {
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
          <h2 className="text-[36px] sm:text-[44px] lg:text-[48px] font-bold leading-[1.1] tracking-[-0.02em] text-[color:var(--platinum)]">
            Conecta todo lo que ya usas.
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[18px] text-[color:var(--slate)]">
            El sistema se adapta a tu operación, no al revés.
          </p>
        </motion.div>

        <div className="mx-auto mt-14 grid max-w-[960px] grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <Column title="Tu sistema recibe leads desde" items={INPUTS} />
          <Column title="Y ejecuta acciones en" items={OUTPUTS} />
        </div>

        <p className="mx-auto mt-12 max-w-[560px] text-center text-[14px] text-[color:var(--slate)]">
          ¿Usas algo diferente? Nuestro equipo de implementación lo conecta en 48 horas.
        </p>
      </div>
    </section>
  );
}
