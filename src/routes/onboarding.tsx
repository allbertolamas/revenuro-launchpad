import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, RefreshCw, Check, RotateCcw } from "lucide-react";
import { WizardHeader } from "@/components/onboarding/WizardHeader";
import { Step1Business } from "@/components/onboarding/Step1Business";
import { Step2Channel } from "@/components/onboarding/Step2Channel";
import { Step3Assistant } from "@/components/onboarding/Step3Assistant";
import { Step4Inventory } from "@/components/onboarding/Step4Inventory";
import { Step5Messages } from "@/components/onboarding/Step5Messages";
import { Step6Test } from "@/components/onboarding/Step6Test";
import { Step7Activate } from "@/components/onboarding/Step7Activate";
import { INITIAL_DATA, type WizardData } from "@/components/onboarding/types";
import {
  loadDraft,
  clearDraft,
  useAutoSave,
  formatSavedAt,
} from "@/lib/wizard-autosave";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Configura tu sistema — Brerev" },
      {
        name: "description",
        content:
          "Configura tu sistema Brerev en 7 pasos. Tu asistente quedará activo en menos de 10 minutos.",
      },
    ],
  }),
  component: OnboardingPage,
});

const STORAGE_KEY = "brerev_onboarding_v1";

function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<WizardData>(INITIAL_DATA);
  const [hydrated, setHydrated] = useState(false);
  const [resumeBanner, setResumeBanner] = useState<{
    step: number;
    data: WizardData;
    lastSavedAt: number;
  } | null>(null);

  // Hydrate from localStorage on mount (client-only)
  useEffect(() => {
    const draft = loadDraft<WizardData>();
    if (draft && draft.lastSavedAt) {
      // Mostrar banner de recuperación; aún no aplicamos los datos.
      setResumeBanner({
        step: Math.min(draft.step ?? 1, 6),
        data: { ...INITIAL_DATA, ...draft.data },
        lastSavedAt: draft.lastSavedAt,
      });
    }
    setHydrated(true);
  }, []);

  // Auto-guardado debounced
  const { status: saveStatus } = useAutoSave(step, data, hydrated);

  const update = (patch: Partial<WizardData>) =>
    setData((d) => ({ ...d, ...patch }));

  const canContinue = () => {
    switch (step) {
      case 1:
        return (
          data.businessName.trim().length > 0 &&
          data.ownerName.trim().length > 0 &&
          data.city.length > 0 &&
          data.propertyTypes.length > 0
        );
      case 2:
        return data.whatsappOption !== null;
      case 3:
        return data.assistantName.trim().length > 0 && data.voiceId.length > 0;
      case 4:
        return data.inventoryMethod !== null;
      case 5:
        return true;
      case 6:
        return true;
      default:
        return true;
    }
  };

  const meta = META[step - 1];

  return (
    <div className="min-h-screen" style={{ background: "var(--midnight)" }}>
      <div className="absolute inset-0 bg-grid-subtle opacity-40" />
      <WizardHeader step={step} />

      <main className="relative mx-auto max-w-[680px] px-5 pb-20 pt-28 sm:pt-32">
        {/* Banner de recuperación de borrador */}
        <AnimatePresence>
          {resumeBanner && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="mb-6 rounded-[14px] p-4 sm:p-5"
              style={{
                background: "rgba(30,95,255,0.08)",
                border: "1px solid rgba(30,95,255,0.25)",
              }}
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <div
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full"
                    style={{ background: "rgba(30,95,255,0.18)" }}
                  >
                    <RotateCcw size={16} style={{ color: "var(--electric)" }} />
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-[color:var(--platinum)]">
                      Tienes un avance guardado
                    </p>
                    <p className="mt-0.5 text-[12px] text-[color:var(--slate)]">
                      Última edición: {formatSavedAt(resumeBanner.lastSavedAt)} · Paso {resumeBanner.step} de 7
                    </p>
                  </div>
                </div>
                <div className="flex flex-shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      clearDraft();
                      setResumeBanner(null);
                    }}
                    className="rounded-[10px] px-3 py-2 text-[12px] font-medium text-[color:var(--slate)] transition-colors hover:bg-white/5 hover:text-[color:var(--platinum)]"
                  >
                    Empezar de nuevo
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setData(resumeBanner.data);
                      setStep(resumeBanner.step);
                      setResumeBanner(null);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-[10px] px-3 py-2 text-[12px] font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ background: "var(--electric)" }}
                  >
                    Continuar donde lo dejé
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Indicador de auto-guardado */}
        {step < 7 && (
          <div
            className="mb-4 flex items-center justify-end gap-1.5 text-[11px]"
            style={{ color: "var(--slate)", minHeight: 16 }}
            aria-live="polite"
          >
            <AnimatePresence mode="wait">
              {saveStatus === "saving" && (
                <motion.div
                  key="saving"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="inline-flex items-center gap-1.5"
                >
                  <RefreshCw size={11} className="animate-spin" />
                  Guardando…
                </motion.div>
              )}
              {saveStatus === "saved" && (
                <motion.div
                  key="saved"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="inline-flex items-center gap-1.5"
                  style={{ color: "var(--success)" }}
                >
                  <Check size={11} strokeWidth={3} />
                  Guardado
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -40, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {step < 7 && (
              <header className="mb-8">
                <p
                  className="text-[11px] font-bold uppercase"
                  style={{
                    letterSpacing: "0.12em",
                    color: "var(--electric)",
                  }}
                >
                  Paso {step} de 7
                </p>
                <h1 className="mt-3 text-[28px] font-bold leading-[1.15] text-[color:var(--platinum)] sm:text-[36px]">
                  {meta.title}
                </h1>
                <p className="mt-3 text-[15px] leading-[1.6] text-[color:var(--slate)] sm:text-[16px]">
                  {meta.subtitle}
                </p>
              </header>
            )}

            {step === 1 && <Step1Business data={data} update={update} />}
            {step === 2 && <Step2Channel data={data} update={update} />}
            {step === 3 && <Step3Assistant data={data} update={update} />}
            {step === 4 && <Step4Inventory data={data} update={update} />}
            {step === 5 && <Step5Messages data={data} update={update} />}
            {step === 6 && <Step6Test data={data} update={update} />}
            {step === 7 && <Step7Activate data={data} />}
          </motion.div>
        </AnimatePresence>

        {step < 7 && (
          <div className="mt-10 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[color:var(--slate)] transition-colors hover:text-[color:var(--platinum)]"
              >
                <ArrowLeft size={16} />
                Anterior
              </button>
            ) : (
              <span />
            )}
            <button
              type="button"
              disabled={!canContinue()}
              onClick={() => {
                if (step === 6) {
                  setStep(7);
                  return;
                }
                setStep((s) => s + 1);
              }}
              className="btn-primary inline-flex items-center gap-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {step === 6 ? "Activar mi sistema" : "Continuar"}
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

const META = [
  {
    title: "Cuéntanos sobre tu negocio",
    subtitle:
      "Esta información personaliza todo el sistema para que hable exactamente como tú lo harías.",
  },
  {
    title: "Conecta cómo te contactan tus leads",
    subtitle:
      "Tu sistema responderá exactamente donde tus clientes ya te buscan.",
  },
  {
    title: "Configura cómo se presenta tu sistema",
    subtitle:
      "El asistente habla con tus leads en tu nombre. Defínelo exactamente como quieres.",
  },
  {
    title: "Agrega tus propiedades",
    subtitle:
      "Tu sistema conocerá tu inventario completo y podrá responder preguntas específicas al instante.",
  },
  {
    title: "Revisa los mensajes de tu sistema",
    subtitle:
      "Estos son los mensajes que enviará el sistema a tus leads. Ya están optimizados — pero puedes editarlos.",
  },
  {
    title: "Prueba tu sistema antes de activarlo",
    subtitle:
      "Habla con tu propio asistente configurado, exactamente como lo van a experimentar tus leads.",
  },
];
