import { useEffect, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { isTourCompleted, markTourCompleted } from "@/lib/mock-globals";

type TourStep = {
  selector: string;
  title: string;
  body: string;
  placement?: "top" | "bottom" | "left" | "right";
};

const STEPS: TourStep[] = [
  {
    selector: "[data-tour='kpis']",
    title: "Tus KPIs en tiempo real",
    body: "Aquí ves todo lo que está pasando con tus leads en tiempo real. Cada número se actualiza automáticamente.",
    placement: "bottom",
  },
  {
    selector: "[data-tour='feed']",
    title: "Feed de actividad",
    body: "Cada vez que el sistema actúa — responde un lead, agenda una cita — aparece aquí al instante.",
    placement: "left",
  },
  {
    selector: "[data-tour='leads']",
    title: "Tus leads",
    body: "Todos tus leads y su estado actual. Puedes ver cada conversación completa con un solo clic.",
    placement: "right",
  },
  {
    selector: "[data-tour='mensajes']",
    title: "Editor de mensajes",
    body: "Los mensajes que usa el sistema ya están optimizados. Si quieres ajustar algo, lo haces aquí.",
    placement: "right",
  },
  {
    selector: "[data-tour='configuracion']",
    title: "Tus canales y configuración",
    body: "Conecta o cambia tus canales desde aquí. Si WhatsApp se desconecta, lo reconectas en 2 clics.",
    placement: "right",
  },
  {
    selector: "[data-tour='ayuda']",
    title: "Estamos aquí para ti",
    body: "¿Tienes dudas? Nuestro equipo responde en minutos por WhatsApp.",
    placement: "right",
  },
];

const PADDING = 8;

export function GuidedTour({ onClose }: { onClose?: () => void }) {
  const [active, setActive] = useState(false);
  const [step, setStep] = useState(0);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;
    if (isTourCompleted()) return;
    // Esperar a que el dashboard pinte
    const t = setTimeout(() => setActive(true), 600);
    return () => clearTimeout(t);
  }, []);

  useLayoutEffect(() => {
    if (!active) return;
    const sel = STEPS[step]?.selector;
    if (!sel) return;
    const update = () => {
      const el = document.querySelector(sel) as HTMLElement | null;
      if (!el) {
        setRect(null);
        return;
      }
      el.scrollIntoView({ block: "center", behavior: "smooth" });
      // Pequeño delay para esperar el scroll
      requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        setRect(r);
      });
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [active, step]);

  if (!mounted || !active) return null;

  const finish = () => {
    markTourCompleted();
    setActive(false);
    onClose?.();
  };

  const next = () => {
    if (step >= STEPS.length - 1) finish();
    else setStep((s) => s + 1);
  };

  const current = STEPS[step];
  const placement = current.placement ?? "bottom";

  // Calcular posición del tooltip
  let tooltipStyle: React.CSSProperties = {
    position: "fixed",
    zIndex: 10001,
    maxWidth: 320,
  };
  if (rect) {
    if (placement === "bottom") {
      tooltipStyle.top = rect.bottom + PADDING + 12;
      tooltipStyle.left = Math.max(16, Math.min(window.innerWidth - 336, rect.left));
    } else if (placement === "top") {
      tooltipStyle.bottom = window.innerHeight - rect.top + PADDING + 12;
      tooltipStyle.left = Math.max(16, Math.min(window.innerWidth - 336, rect.left));
    } else if (placement === "right") {
      tooltipStyle.top = Math.max(16, rect.top);
      tooltipStyle.left = Math.min(window.innerWidth - 336, rect.right + PADDING + 12);
    } else if (placement === "left") {
      tooltipStyle.top = Math.max(16, rect.top);
      tooltipStyle.right = window.innerWidth - rect.left + PADDING + 12;
    }
  } else {
    tooltipStyle.top = "50%";
    tooltipStyle.left = "50%";
    tooltipStyle.transform = "translate(-50%, -50%)";
  }

  // Cut-out via 4 overlays alrededor del rect
  const overlays: React.CSSProperties[] = rect
    ? [
        { top: 0, left: 0, right: 0, height: Math.max(0, rect.top - PADDING) },
        {
          top: Math.max(0, rect.top - PADDING),
          left: 0,
          width: Math.max(0, rect.left - PADDING),
          height: rect.height + PADDING * 2,
        },
        {
          top: Math.max(0, rect.top - PADDING),
          left: rect.right + PADDING,
          right: 0,
          height: rect.height + PADDING * 2,
        },
        {
          top: rect.bottom + PADDING,
          left: 0,
          right: 0,
          bottom: 0,
        },
      ]
    : [{ inset: 0 }];

  return createPortal(
    <div style={{ position: "fixed", inset: 0, zIndex: 10000, pointerEvents: "none" }}>
      {overlays.map((s, i) => (
        <div
          key={i}
          style={{
            position: "fixed",
            background: "rgba(0,0,0,0.7)",
            pointerEvents: "auto",
            transition: "all 0.25s ease",
            ...s,
          }}
          onClick={() => {
            /* bloquear interacción detrás */
          }}
        />
      ))}

      {rect && (
        <div
          style={{
            position: "fixed",
            top: rect.top - PADDING,
            left: rect.left - PADDING,
            width: rect.width + PADDING * 2,
            height: rect.height + PADDING * 2,
            border: "2px solid var(--electric)",
            borderRadius: 12,
            boxShadow:
              "0 0 0 9999px rgba(0,0,0,0), 0 0 32px rgba(30,95,255,0.5)",
            pointerEvents: "none",
            transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      )}

      <div
        style={{
          ...tooltipStyle,
          pointerEvents: "auto",
          background: "var(--navy)",
          border: "1px solid var(--electric)",
          borderRadius: 12,
          padding: "20px 24px",
          boxShadow:
            "0 0 0 1px rgba(30,95,255,0.2), 0 20px 40px rgba(0,0,0,0.5)",
        }}
      >
        <div
          className="text-[11px] font-semibold uppercase"
          style={{ color: "var(--electric)", letterSpacing: "0.1em" }}
        >
          {step + 1} / {STEPS.length}
        </div>
        <h3
          className="mt-2 text-[17px] font-semibold"
          style={{ color: "var(--platinum)" }}
        >
          {current.title}
        </h3>
        <p
          className="mt-2 text-[14px]"
          style={{ color: "var(--slate-light)", lineHeight: 1.6 }}
        >
          {current.body}
        </p>
        <div className="mt-5 flex items-center justify-between">
          <button
            onClick={finish}
            className="text-[13px]"
            style={{ color: "var(--slate)" }}
          >
            Saltar tour
          </button>
          <button
            onClick={next}
            className="rounded-[8px] px-4 py-2 text-[13px] font-semibold text-white transition-transform hover:scale-[1.02]"
            style={{ background: "var(--electric)" }}
          >
            {step === STEPS.length - 1 ? "Entendido ✓" : "Siguiente →"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
