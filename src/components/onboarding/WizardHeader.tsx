import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import brerevLogo from "@/assets/brerev-logo.png";
import { STEP_LABELS } from "./types";

export function WizardHeader({ step }: { step: number }) {
  return (
    <header
      className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between px-6 sm:px-8"
      style={{
        background: "rgba(8,14,29,0.95)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--steel)",
      }}
    >
      <Link to="/" className="flex items-center gap-2">
        <img src={brerevLogo} alt="Brerev" className="h-6 w-auto" />
      </Link>

      <div className="hidden items-center gap-2 md:flex">
        {STEP_LABELS.map((label, i) => {
          const idx = i + 1;
          const completed = idx < step;
          const active = idx === step;
          return (
            <div key={label} className="flex items-center gap-2">
              <div className="flex flex-col items-center gap-1">
                <motion.div
                  initial={false}
                  animate={{
                    scale: active ? 1.1 : 1,
                    background: completed
                      ? "var(--success)"
                      : active
                        ? "var(--electric)"
                        : "var(--steel)",
                  }}
                  className="relative flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-bold text-white"
                >
                  {completed ? <Check size={14} strokeWidth={3} /> : idx}
                  {active && (
                    <span
                      className="absolute inset-0 animate-ping rounded-full opacity-30"
                      style={{ background: "var(--electric)" }}
                    />
                  )}
                </motion.div>
                <span
                  className="hidden text-[10px] lg:block"
                  style={{ color: active ? "var(--platinum)" : "var(--slate)" }}
                >
                  {label}
                </span>
              </div>
              {idx < STEP_LABELS.length && (
                <div
                  className="h-px w-6 transition-colors duration-500"
                  style={{
                    background: completed ? "var(--success)" : "var(--steel)",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      <Link
        to="/"
        className="text-[13px] font-medium transition-colors hover:text-[color:var(--platinum)]"
        style={{ color: "var(--slate)" }}
      >
        Guardar y salir
      </Link>
    </header>
  );
}
