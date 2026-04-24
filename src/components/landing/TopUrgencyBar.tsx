import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, X } from "lucide-react";

const STORAGE_KEY = "brerev_topbar_dismissed";
const SPOTS_LEFT = 23;

export function TopUrgencyBar({
  onVisibleChange,
}: {
  onVisibleChange?: (visible: boolean) => void;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const dismissed = window.localStorage.getItem(STORAGE_KEY) === "true";
    if (dismissed) {
      onVisibleChange?.(false);
      return;
    }
    const t = setTimeout(() => {
      setVisible(true);
      onVisibleChange?.(true);
    }, 500);
    return () => clearTimeout(t);
  }, [onVisibleChange]);

  const dismiss = () => {
    window.localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
    onVisibleChange?.(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 38, opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed left-0 right-0 top-0 z-[110] flex items-center justify-center overflow-hidden"
          style={{
            background: "rgba(30,95,255,0.1)",
            borderBottom: "1px solid rgba(30,95,255,0.2)",
            padding: "0 20px",
          }}
        >
          <div className="flex items-center gap-2">
            <Zap size={14} style={{ color: "var(--electric)" }} />
            <p
              className="text-[12px] sm:text-[13px]"
              style={{ color: "var(--platinum)", fontWeight: 500 }}
            >
              <span className="hidden sm:inline">
                Oferta de lanzamiento — 3 meses al 50% para los primeros 50
                clientes ·{" "}
              </span>
              <span className="sm:hidden">3 meses al 50% · </span>
              <span style={{ color: "var(--electric)", fontWeight: 700 }}>
                Quedan {SPOTS_LEFT} lugares
              </span>
            </p>
          </div>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Cerrar"
            className="absolute right-3 sm:right-4 rounded p-1 transition-colors"
            style={{ color: "var(--slate)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--platinum)";
              e.currentTarget.style.background = "rgba(255,255,255,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--slate)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
