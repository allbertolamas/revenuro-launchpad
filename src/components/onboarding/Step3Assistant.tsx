import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Lock } from "lucide-react";
import { Field } from "./Field";
import { VOICES, type WizardData } from "./types";

const TONES: { id: WizardData["tone"]; title: string; sub: string }[] = [
  {
    id: "formal",
    title: "Formal y profesional",
    sub: "Más apropiado para propiedades de lujo o clientes corporativos",
  },
  {
    id: "warm",
    title: "Cálido y cercano",
    sub: "El balance ideal para la mayoría de clientes inmobiliarios en México",
  },
  {
    id: "direct",
    title: "Directo y rápido",
    sub: "Para leads de alto volumen que prefieren respuestas concretas al instante",
  },
];

export function Step3Assistant({
  data,
  update,
}: {
  data: WizardData;
  update: (patch: Partial<WizardData>) => void;
}) {
  // Preview real con ElevenLabs aún no disponible en este turno —
  // la UI está completa, el botón quedará habilitado al activar el sistema.
  const [playing, setPlaying] = useState<string | null>(null);

  const togglePlay = (id: string) => {
    // Animación "decorativa": las barras del preview reaccionan ~3s
    if (playing === id) {
      setPlaying(null);
      return;
    }
    setPlaying(id);
    setTimeout(() => setPlaying((p) => (p === id ? null : p)), 3000);
  };

  const selectedVoice = VOICES.find((v) => v.id === data.voiceId);
  const showPreview =
    !!data.assistantName.trim() &&
    !!data.businessName.trim() &&
    !!data.voiceId;

  return (
    <div className="space-y-8">
      {/* Nombre */}
      <div>
        <Field
          label="Nombre del asistente"
          placeholder="Ej: Sofía, Asistente Torres, Equipo [tu negocio]"
          helper="Puede ser un nombre real o uno neutral. Tus leads lo conocerán con este nombre."
          value={data.assistantName}
          onChange={(e) => update({ assistantName: e.target.value })}
        />

        {data.assistantName && (
          <div
            className="mt-4 rounded-[12px] p-4"
            style={{
              background: "rgba(30,95,255,0.05)",
              border: "1px solid rgba(30,95,255,0.15)",
            }}
          >
            <p className="text-[13px] uppercase tracking-wider text-[color:var(--slate)]">
              Vista previa
            </p>
            <p className="mt-1 text-[14px] text-[color:var(--platinum)]">
              <span className="font-semibold">{data.assistantName}</span> — Hola,
              gracias por contactar a {data.businessName || "[tu negocio]"}. ¿En qué
              puedo ayudarte?
            </p>
          </div>
        )}
      </div>

      {/* Voz */}
      <div>
        <h3 className="mb-3 text-[15px] font-semibold text-[color:var(--platinum)]">
          Elige la voz
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {VOICES.map((v) => {
            const selected = data.voiceId === v.id;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => update({ voiceId: v.id })}
                className="rounded-[12px] p-4 text-left transition-all"
                style={{
                  background: selected
                    ? "rgba(30,95,255,0.08)"
                    : "var(--card-bg)",
                  border: selected
                    ? "1px solid var(--electric)"
                    : "1px solid var(--border-subtle)",
                  boxShadow: selected
                    ? "0 0 0 3px rgba(30,95,255,0.15)"
                    : "none",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-10 w-10 rounded-full bg-gradient-to-br ${v.gradient}`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-bold text-[color:var(--platinum)]">
                      {v.name}
                    </p>
                    <p className="text-[11px] text-[color:var(--slate)]">{v.style}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay(v.id);
                  }}
                  className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-[8px] py-1.5 text-[12px] font-medium transition-colors"
                  style={{
                    background: "rgba(30,95,255,0.08)",
                    color: "var(--electric)",
                  }}
                  title="Disponible al activar tu sistema"
                >
                  {playing === v.id ? (
                    <>
                      <Pause size={12} /> Pausar
                    </>
                  ) : (
                    <>
                      <Play size={12} /> Escuchar
                    </>
                  )}
                </button>
              </button>
            );
          })}
        </div>

        {/* Preview en contexto real */}
        <AnimatePresence>
          {showPreview && selectedVoice && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
              className="mt-5 rounded-[12px] p-5"
              style={{
                background: "rgba(30,95,255,0.06)",
                border: "1px solid rgba(30,95,255,0.2)",
              }}
            >
              <div className="flex items-center gap-4">
                {/* Wave bars */}
                <div
                  className="flex flex-shrink-0 items-end gap-1"
                  style={{ width: 32, height: 32 }}
                >
                  {[0, 1, 2].map((i) => {
                    const isPlaying = playing === data.voiceId;
                    return (
                      <span
                        key={i}
                        style={{
                          width: 4,
                          height: isPlaying ? "100%" : "30%",
                          background: isPlaying
                            ? "var(--electric)"
                            : "var(--steel-light)",
                          borderRadius: 2,
                          animation: isPlaying
                            ? `brerev-wave 0.9s ease-in-out ${i * 0.15}s infinite`
                            : "none",
                          transformOrigin: "center bottom",
                        }}
                      />
                    );
                  })}
                </div>

                <div className="min-w-0 flex-1">
                  <p
                    className="text-[14px] sm:text-[15px] italic"
                    style={{ color: "var(--platinum)" }}
                  >
                    "Hola, soy {data.assistantName}, asistente de{" "}
                    {data.businessName}. ¿En qué puedo ayudarte hoy?"
                  </p>
                  <p
                    className="mt-1.5 flex items-center gap-1.5 text-[12px]"
                    style={{ color: "var(--slate)" }}
                  >
                    <Lock size={11} />
                    Disponible al activar — preview con voz {selectedVoice.name}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => togglePlay(data.voiceId)}
                  aria-label={playing === data.voiceId ? "Pausar" : "Reproducir"}
                  className="flex flex-shrink-0 items-center justify-center rounded-full transition-colors"
                  style={{
                    width: 40,
                    height: 40,
                    background: "rgba(30,95,255,0.15)",
                    color: "var(--electric)",
                  }}
                >
                  {playing === data.voiceId ? (
                    <Pause size={16} />
                  ) : (
                    <Play size={16} style={{ marginLeft: 2 }} />
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <style>{`
          @keyframes brerev-wave {
            0%, 100% { transform: scaleY(0.3); }
            50% { transform: scaleY(1); }
          }
        `}</style>
      </div>

      {/* Tono */}
      <div>
        <h3 className="mb-3 text-[15px] font-semibold text-[color:var(--platinum)]">
          Tono de comunicación
        </h3>
        <div className="space-y-2">
          {TONES.map((t) => {
            const selected = data.tone === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => update({ tone: t.id })}
                className="block w-full rounded-[10px] p-4 text-left transition-all"
                style={{
                  background: selected ? "rgba(30,95,255,0.06)" : "transparent",
                  border: selected
                    ? "1px solid var(--electric)"
                    : "1px solid var(--steel)",
                }}
              >
                <p className="text-[14px] font-semibold text-[color:var(--platinum)]">
                  {t.title}
                </p>
                <p className="mt-0.5 text-[12px] text-[color:var(--slate)]">{t.sub}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Idioma */}
      <div
        className="flex items-center justify-between rounded-[12px] p-4"
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--border-subtle)",
        }}
      >
        <div>
          <p className="text-[14px] font-semibold text-[color:var(--platinum)]">
            ¿Atiendes clientes en inglés también?
          </p>
          <p className="mt-0.5 text-[12px] text-[color:var(--slate)]">
            El sistema detecta el idioma del lead y responde igual.
          </p>
        </div>
        <button
          type="button"
          onClick={() => update({ bilingual: !data.bilingual })}
          className="relative h-6 w-11 rounded-full transition-colors"
          style={{
            background: data.bilingual ? "var(--electric)" : "var(--steel-light)",
          }}
        >
          <span
            className="absolute top-1 h-4 w-4 rounded-full bg-white transition-transform"
            style={{
              transform: data.bilingual ? "translateX(22px)" : "translateX(4px)",
            }}
          />
        </button>
      </div>
    </div>
  );
}
