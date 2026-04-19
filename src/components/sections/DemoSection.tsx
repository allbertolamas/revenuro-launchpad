import { motion } from "framer-motion";
import { Mic } from "lucide-react";
import { useEffect } from "react";

export function DemoSection() {
  useEffect(() => {
    if (document.querySelector('script[data-elevenlabs="convai"]')) return;
    const s = document.createElement("script");
    s.src = "https://elevenlabs.io/convai-widget/index.js";
    s.async = true;
    s.dataset.elevenlabs = "convai";
    document.body.appendChild(s);
  }, []);

  return (
    <section
      id="demo"
      className="relative overflow-hidden"
      style={{ background: "var(--navy)", paddingTop: "120px", paddingBottom: "120px" }}
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "900px",
          height: "600px",
          background:
            "radial-gradient(ellipse at center, rgba(30,95,255,0.1) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1200px] px-6">
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
            Demo en vivo
          </p>
          <h2 className="mx-auto mt-4 max-w-[700px] text-[36px] sm:text-[44px] lg:text-[48px] font-bold leading-[1.1] tracking-[-0.02em] text-[color:var(--platinum)]">
            Esto es exactamente lo que tu próximo lead va a experimentar.
          </h2>
          <p className="mx-auto mt-4 max-w-[520px] text-[18px] text-[color:var(--slate)]">
            Escribe o habla con el sistema ahora mismo. Sin registrarte. Sin compromisos.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-12 max-w-[680px] rounded-[20px] p-8 sm:p-10 text-center"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--border-subtle)",
            backdropFilter: "blur(12px)",
            boxShadow:
              "0 0 0 1px rgba(30,95,255,0.1), 0 60px 120px rgba(0,0,0,0.5), 0 0 80px rgba(30,95,255,0.06)",
          }}
        >
          <div
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full"
            style={{
              background: "rgba(30,95,255,0.12)",
              border: "1px solid rgba(30,95,255,0.25)",
            }}
          >
            <Mic size={28} className="text-[color:var(--electric)]" />
          </div>
          <h3 className="mt-5 text-[22px] font-semibold text-[color:var(--platinum)]">
            Haz clic y habla con el sistema
          </h3>
          <p className="mt-2 text-[15px] text-[color:var(--slate)]">
            Pregunta por una propiedad, horarios, o agenda una cita.
          </p>

          <div id="el-widget-container" className="mt-8 flex justify-center">
            {/* @ts-expect-error - custom element from ElevenLabs */}
            <elevenlabs-convai agent-id="AGENT_ID_PLACEHOLDER"></elevenlabs-convai>
          </div>
        </motion.div>

        <p className="mx-auto mt-10 max-w-[560px] text-center text-[15px] text-[color:var(--slate)]">
          Acabas de experimentar lo que siente un lead tuyo cuando contacta tu negocio a las 11 PM
          y hay un sistema que responde, entiende y agenda.
        </p>
      </div>
    </section>
  );
}
