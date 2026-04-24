import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, AlertCircle, X as XIcon } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  consequences: string[];
  confirmText: string;
  confirmLabel: string;
  severity: "warning" | "danger";
};

export function DestructiveConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  consequences,
  confirmText,
  confirmLabel,
  severity,
}: Props) {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (!isOpen) setTyped("");
  }, [isOpen]);

  const matches = typed === confirmText; // case-sensitive, no trim
  const accentColor =
    severity === "danger" ? "var(--red-loss)" : "var(--amber)";
  const accentTint =
    severity === "danger" ? "rgba(255,71,87,0.12)" : "rgba(255,176,32,0.12)";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[160]"
            style={{
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(6px)",
            }}
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, x: "-50%", y: "-50%" }}
            animate={{ scale: 1, opacity: 1, x: "-50%", y: "-50%" }}
            exit={{ scale: 0.95, opacity: 0, x: "-50%", y: "-50%" }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            className="fixed left-1/2 top-1/2 z-[161] w-[90%] max-w-[480px] rounded-[18px] p-7 sm:p-8"
            style={{
              background: "var(--midnight)",
              border: "1px solid var(--border-subtle)",
              boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute right-4 top-4"
              style={{ color: "var(--slate)" }}
            >
              <XIcon size={18} />
            </button>

            <div className="flex items-start gap-4">
              <div
                className="flex flex-shrink-0 items-center justify-center rounded-full"
                style={{
                  width: 56,
                  height: 56,
                  background: accentTint,
                }}
              >
                {severity === "danger" ? (
                  <AlertCircle size={28} color={accentColor} />
                ) : (
                  <AlertTriangle size={28} color={accentColor} />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h3
                  className="text-[20px] sm:text-[22px] font-bold"
                  style={{ color: accentColor, letterSpacing: "-0.01em" }}
                >
                  {title}
                </h3>
                <p
                  className="mt-1.5 text-[14px] sm:text-[15px]"
                  style={{ color: "var(--slate)" }}
                >
                  {description}
                </p>
              </div>
            </div>

            {consequences.length > 0 && (
              <div
                className="mt-5 rounded-[10px] p-4"
                style={{
                  background: "rgba(255,71,87,0.06)",
                  border: "1px solid rgba(255,71,87,0.15)",
                }}
              >
                <ul className="space-y-2">
                  {consequences.map((c) => (
                    <li key={c} className="flex items-start gap-2">
                      <XIcon
                        size={14}
                        color="var(--red-loss)"
                        style={{ marginTop: 3, flexShrink: 0 }}
                      />
                      <span
                        className="text-[13px] sm:text-[14px]"
                        style={{ color: "var(--slate-light)" }}
                      >
                        {c}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-5">
              <p
                className="text-[13px] sm:text-[14px]"
                style={{ color: "var(--platinum)" }}
              >
                Para confirmar, escribe{" "}
                <code
                  className="rounded px-1.5 py-0.5"
                  style={{
                    background: "rgba(30,95,255,0.12)",
                    color: "var(--electric)",
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "0.9em",
                  }}
                >
                  {confirmText}
                </code>{" "}
                abajo:
              </p>
              <input
                type="text"
                value={typed}
                onChange={(e) => setTyped(e.target.value)}
                placeholder="Escribe aquí para confirmar"
                autoFocus
                className="mt-2 w-full rounded-[10px] border px-4 py-3 text-[14px] outline-none transition-all"
                style={{
                  background: "rgba(8,14,29,0.6)",
                  borderColor: matches ? "var(--success)" : "var(--steel-light)",
                  color: "var(--platinum)",
                  boxShadow: matches
                    ? "0 0 0 3px rgba(0,214,143,0.15)"
                    : "none",
                }}
              />
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                className="btn-ghost"
                style={{ padding: "10px 20px" }}
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={!matches}
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className={matches ? "brerev-confirm-pulse" : ""}
                style={{
                  padding: "12px 22px",
                  borderRadius: 10,
                  border: "none",
                  background: matches ? accentColor : "var(--steel)",
                  color: matches ? "#fff" : "var(--slate)",
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: matches ? "pointer" : "not-allowed",
                  transition: "all 0.2s ease",
                }}
              >
                {confirmLabel}
              </button>
            </div>

            <style>{`
              @keyframes brerev-confirm-pulse {
                0%, 100% { box-shadow: 0 0 0 0 ${accentColor}55; }
                50% { box-shadow: 0 0 0 6px ${accentColor}22; }
              }
              .brerev-confirm-pulse { animation: brerev-confirm-pulse 1.6s ease-in-out infinite; }
            `}</style>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
