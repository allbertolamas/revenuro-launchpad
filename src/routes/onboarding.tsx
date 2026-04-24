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
