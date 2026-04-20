import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mic, Lock } from "lucide-react";
import { PublicShell } from "@/components/PublicShell";

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: "Demo en vivo — Brerev | Habla con el sistema ahora" },
      {
        name: "description",
        content:
          "Experimenta el sistema de Brerev en vivo. Sin registrarte, sin compromiso. Habla o escribe ahora mismo.",
      },
      { property: "og:title", content: "Demo en vivo — Brerev" },
      {
        property: "og:description",
        content: "Esto es exactamente lo que va a vivir tu próximo lead.",
      },
    ],
  }),
  component: DemoPage,
});

const EXAMPLE_QUESTIONS = [
  "¿Tienen departamentos en Polanco?",
  "¿Cuándo puedo agendar una visita?",
  "Busco casa con 3 recámaras, $4M MXN",
];

const CITIES = ["CDMX", "Guadalajara", "Monterrey", "Tijuana", "Cancún", "Querétaro", "Otra"];
const LEAD_RANGES = ["Menos de 30", "30 - 80", "80 - 200", "Más de 200"];

function DemoPage() {
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.querySelector('script[data-elevenlabs="convai"]')) return;
    const s = document.createElement("script");
    s.src = "https://elevenlabs.io/convai-widget/index.js";
    s.async = true;
    s.dataset.elevenlabs = "convai";
    document.body.appendChild(s);
  }, []);

  return (
    <PublicShell>
      {/* HERO */}
      <section
        className="relative bg-grid"
        style={{ background: "var(--midnight)", paddingTop: "140px", paddingBottom: "60px" }}
      >
        <div className="ambient-glow" />
        <div className="relative mx-auto max-w-[1100px] px-6 text-center">
          <p
            className="text-[11px] font-semibold uppercase text-[color:var(--electric)]"
            style={{ letterSpacing: "0.14em" }}
          >
            Demo en vivo
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto mt-4 max-w-[860px] text-[44px] sm:text-[52px] lg:text-[60px] font-extrabold leading-[1.05] tracking-[-0.025em] text-[color:var(--platinum)]"
          >
            Experimenta exactamente lo que{" "}
            <span className="text-shimmer">van a vivir tus leads.</span>
          </motion.h1>
          <p className="mx-auto mt-5 max-w-[640px] text-[19px] text-[color:var(--slate)]">
            Habla con el sistema ahora mismo, sin registrarte. Esto es lo que ocurre cuando un lead
            contacta tu negocio — a cualquier hora, por cualquier canal.
          </p>
        </div>
      </section>

      {/* WIDGET */}
      <section className="relative" style={{ background: "var(--midnight)", paddingBottom: "60px" }}>
        <div className="mx-auto max-w-[800px] px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden rounded-[24px]"
            style={{
              background: "var(--card-bg)",
              border: "1px solid rgba(30,95,255,0.2)",
              boxShadow:
                "0 0 0 1px rgba(30,95,255,0.1), 0 60px 120px rgba(0,0,0,0.6), 0 0 100px rgba(30,95,255,0.08)",
            }}
          >
            {/* Top bar */}
            <div
              className="flex h-[52px] items-center justify-between px-5"
              style={{ background: "rgba(8,14,29,0.9)", borderBottom: "1px solid var(--steel)" }}
            >
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full" style={{ background: "#FF5F57" }} />
                <span className="h-3 w-3 rounded-full" style={{ background: "#FEBC2E" }} />
                <span className="h-3 w-3 rounded-full" style={{ background: "#28C840" }} />
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                    style={{ background: "var(--success)" }}
                  />
                  <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "var(--success)" }} />
                </span>
                <span className="text-[13px] font-medium text-[color:var(--slate)]">
                  Sistema activo — Inmobiliaria Demo Brerev
                </span>
              </div>
              <span
                className="rounded-md border px-2.5 py-1 text-[11px] font-semibold"
                style={{
                  background: "rgba(255,176,32,0.15)",
                  borderColor: "rgba(255,176,32,0.3)",
                  color: "var(--amber)",
                }}
              >
                Demo
              </span>
            </div>

            {/* Widget area */}
            <div className="flex min-h-[400px] flex-col items-center justify-center gap-6 p-10 text-center">
              {!activated ? (
                <>
                  <motion.div
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex h-20 w-20 items-center justify-center rounded-[20px]"
                    style={{
                      background: "rgba(30,95,255,0.1)",
                      border: "1px solid rgba(30,95,255,0.2)",
                    }}
                  >
                    <Mic size={40} className="text-[color:var(--electric)]" />
                  </motion.div>
                  <h3 className="text-[20px] font-semibold text-[color:var(--platinum)]">
                    Haz clic para hablar con el sistema
                  </h3>
                  <p className="mx-auto max-w-[460px] text-[16px] text-[color:var(--slate)]">
                    Pregunta por una propiedad, un horario disponible, o pide que te agende una cita.
                    El sistema responde como lo haría con cualquiera de tus leads reales.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {EXAMPLE_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        onClick={() => setActivated(true)}
                        className="rounded-lg border px-4 py-2 text-[14px] text-[color:var(--slate)] transition-all hover:border-[color:var(--electric)] hover:text-[color:var(--electric)]"
                        style={{
                          background: "rgba(30,95,255,0.08)",
                          borderColor: "rgba(30,95,255,0.2)",
                        }}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setActivated(true)}
                    className="btn-primary mt-2"
                  >
                    Iniciar conversación de prueba <span className="arrow">→</span>
                  </button>
                </>
              ) : (
                <div
                  className="w-full"
                  dangerouslySetInnerHTML={{
                    __html:
                      '<elevenlabs-convai agent-id="AGENT_ID_PLACEHOLDER" style="width:100%;min-height:300px;"></elevenlabs-convai>',
                  }}
                />
              )}
            </div>

            {/* Bottom bar */}
            <div
              className="flex h-11 items-center gap-2 px-5"
              style={{ background: "rgba(8,14,29,0.8)", borderTop: "1px solid var(--steel)" }}
            >
              <Lock size={12} className="text-[color:var(--slate)]" />
              <span className="text-[12px] text-[color:var(--slate)]">
                Conversación segura · No se guarda información personal en modo demo
              </span>
            </div>
          </motion.div>

          <p className="mx-auto mt-8 max-w-[600px] text-center text-[16px] text-[color:var(--slate)]">
            Lo que acabas de experimentar es exactamente lo que siente un lead cuando contacta tu
            negocio y hay un sistema que responde, entiende y actúa al instante.
          </p>
        </div>
      </section>

      {/* OR DIVIDER */}
      <section className="relative" style={{ background: "var(--midnight)", paddingTop: "20px", paddingBottom: "40px" }}>
        <div className="mx-auto flex max-w-[700px] items-center gap-4 px-6">
          <div className="h-px flex-1" style={{ background: "var(--steel)" }} />
          <span className="text-[14px] text-[color:var(--slate)]">o</span>
          <div className="h-px flex-1" style={{ background: "var(--steel)" }} />
        </div>
      </section>

      {/* PERSONALIZED DEMO */}
      <section className="relative" style={{ background: "var(--midnight)", paddingBottom: "120px" }}>
        <div className="mx-auto max-w-[820px] px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 gap-10 rounded-[20px] p-12 md:grid-cols-2"
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--border-subtle)",
              backdropFilter: "blur(12px)",
            }}
          >
            <div>
              <h2 className="text-[26px] font-bold leading-tight text-[color:var(--platinum)]">
                Demo personalizada para tu inmobiliaria
              </h2>
              <p className="mt-3 text-[16px] leading-relaxed text-[color:var(--slate)]">
                Nuestro equipo configura una demo en vivo con datos reales de tu operación: tus
                propiedades, tu zona, tu forma de hablar.
              </p>
              <ul className="mt-6 space-y-3 text-[15px] text-[color:var(--platinum)]">
                {[
                  "Demo con tu inventario real de propiedades",
                  "Configuración adaptada a tu zona de trabajo",
                  "Sesión de 30 minutos por videollamada",
                  "Sin compromiso de compra",
                ].map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-[color:var(--success)]">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Demo solicitada. Te contactamos en menos de 2 horas por WhatsApp.");
              }}
            >
              <FormInput label="Nombre completo" required placeholder="Tu nombre" />
              <FormInput label="WhatsApp" required type="tel" placeholder="+52 55 1234 5678" defaultValue="+52 " />
              <FormInput label="Inmobiliaria o agencia" placeholder="Nombre de tu negocio" />
              <FormSelect label="¿En qué ciudad operas?" options={CITIES} />
              <FormSelect label="Leads al mes (aprox)" options={LEAD_RANGES} />
              <button type="submit" className="btn-primary mt-2 w-full justify-center">
                Solicitar mi demo personalizada <span className="arrow">→</span>
              </button>
              <p className="text-center text-[13px] text-[color:var(--slate)]">
                Te contactamos en menos de 2 horas por WhatsApp
              </p>
            </form>
          </motion.div>
        </div>
      </section>
    </PublicShell>
  );
}

function FormInput(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const { label, ...rest } = props;
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-[color:var(--slate-light)]">{label}</span>
      <input
        {...rest}
        className="w-full rounded-[10px] border px-4 py-3.5 text-[15px] text-[color:var(--platinum)] outline-none transition-all placeholder:text-[color:var(--slate)] placeholder:opacity-60 focus:border-[color:var(--electric)]"
        style={{
          background: "rgba(8,14,29,0.6)",
          borderColor: "var(--steel-light)",
        }}
        onFocus={(e) => {
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(30,95,255,0.1)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.boxShadow = "none";
        }}
      />
    </label>
  );
}

function FormSelect({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-[color:var(--slate-light)]">{label}</span>
      <select
        className="w-full rounded-[10px] border px-4 py-3.5 text-[15px] text-[color:var(--platinum)] outline-none transition-all focus:border-[color:var(--electric)]"
        style={{
          background: "rgba(8,14,29,0.6)",
          borderColor: "var(--steel-light)",
        }}
      >
        <option value="">Selecciona una opción</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
