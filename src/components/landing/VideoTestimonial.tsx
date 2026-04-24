import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";

const SHOW_VIDEO = false;
const VIDEO_URL = "";

export function VideoTestimonial() {
  const [open, setOpen] = useState(false);

  return (
    <section
      className="relative px-6 py-24 sm:py-28"
      style={{ background: "var(--navy)" }}
    >
      <div className="mx-auto max-w-[1080px]">
        <div className="text-center">
          <p
            className="text-[11px] font-semibold uppercase"
            style={{ color: "var(--electric)", letterSpacing: "0.12em" }}
          >
            CASO DE ESTUDIO
          </p>
          <h2
            className="mt-3 text-[36px] sm:text-[48px] font-bold leading-[1.1]"
            style={{ color: "var(--platinum)", letterSpacing: "-0.02em" }}
          >
            Resultados reales de los
            <br />
            primeros brokers en Brerev
          </h2>
        </div>

        <div
          className="mx-auto mt-12 overflow-hidden rounded-[20px]"
          style={{
            maxWidth: 820,
            background: "var(--card-bg)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          {/* Video / Placeholder area */}
          <div
            className="relative flex items-center justify-center"
            style={{
              aspectRatio: "16 / 9",
              background:
                "linear-gradient(135deg, rgba(30,95,255,0.15), rgba(0,0,0,0.8)), var(--navy)",
            }}
          >
            <span
              className="absolute left-5 top-5 rounded-md px-2.5 py-1 text-[11px] font-bold uppercase text-white"
              style={{
                background: "rgba(255,71,87,0.9)",
                letterSpacing: "0.08em",
              }}
            >
              ● {SHOW_VIDEO ? "VER TESTIMONIO" : "PRÓXIMAMENTE"}
            </span>

            {SHOW_VIDEO ? (
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="group relative flex flex-col items-center gap-3"
              >
                <div
                  className="flex items-center justify-center rounded-full transition-transform group-hover:scale-110"
                  style={{
                    width: 96,
                    height: 96,
                    background: "rgba(255,255,255,0.15)",
                    border: "2px solid rgba(255,255,255,0.4)",
                  }}
                >
                  <Play size={40} fill="white" color="white" />
                </div>
              </button>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width: 96,
                    height: 96,
                    background: "rgba(255,255,255,0.1)",
                    border: "2px solid rgba(255,255,255,0.3)",
                  }}
                >
                  <Play size={40} color="rgba(255,255,255,0.85)" />
                </div>
                <p
                  className="text-[14px] sm:text-[15px]"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  Primer testimonio en video — Semana 2
                </p>
              </div>
            )}
          </div>

          {/* Quote area */}
          <div className="p-7 sm:p-8">
            <p
              className="text-[16px] sm:text-[18px] italic leading-[1.6]"
              style={{ color: "var(--platinum)", fontWeight: 500 }}
            >
              "Antes no contestaba leads después de las 8 PM. Ahora el sistema
              los atiende a cualquier hora. En la primera semana me llegaron 3
              citas agendadas mientras dormía."
            </p>

            <div className="mt-5 flex items-center gap-3">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-full text-[14px] font-bold text-white"
                style={{
                  background: "linear-gradient(135deg, #1e5fff, #2d6fff)",
                }}
              >
                RM
              </div>
              <div>
                <p
                  className="text-[15px] font-semibold"
                  style={{ color: "var(--platinum)" }}
                >
                  Roberto Mendoza
                </p>
                <p className="text-[13px]" style={{ color: "var(--slate)" }}>
                  Inmobiliaria Mendoza · Monterrey
                </p>
              </div>
            </div>

            <div
              className="mt-6 grid grid-cols-3 gap-4 border-t pt-6"
              style={{ borderColor: "var(--steel)" }}
            >
              {[
                { v: "34", l: "leads atendidos" },
                { v: "+3", l: "citas sem 1" },
                { v: "$0", l: "perdidos" },
              ].map((m) => (
                <div key={m.l} className="text-center">
                  <p
                    className="text-[20px] sm:text-[22px] font-bold tabular-nums"
                    style={{ color: "var(--electric)" }}
                  >
                    {m.v}
                  </p>
                  <p
                    className="mt-1 text-[11px] sm:text-[12px]"
                    style={{ color: "var(--slate)" }}
                  >
                    {m.l}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open && SHOW_VIDEO && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center px-4"
            style={{
              background: "rgba(0,0,0,0.9)",
              backdropFilter: "blur(4px)",
            }}
            onClick={() => setOpen(false)}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
              className="absolute right-5 top-5 text-white"
            >
              <X size={28} />
            </button>
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[900px] overflow-hidden rounded-[12px]"
              style={{ aspectRatio: "16 / 9" }}
            >
              <iframe
                src={`${VIDEO_URL}?autoplay=1`}
                allow="autoplay; fullscreen"
                style={{ width: "100%", height: "100%", border: "none" }}
                title="Testimonio"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
