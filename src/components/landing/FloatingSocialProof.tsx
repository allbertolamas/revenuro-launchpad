import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const ITEMS = [
  { name: "Carlos M.", city: "CDMX", action: "activó su sistema", time: "hace 2 min" },
  { name: "Sofía R.", city: "Guadalajara", action: "agendó su primera cita", time: "hace 5 min" },
  { name: "Roberto T.", city: "Monterrey", action: "conectó su WhatsApp", time: "hace 8 min" },
  { name: "Ana G.", city: "Tijuana", action: "configuró su asistente", time: "hace 11 min" },
  { name: "Miguel L.", city: "Querétaro", action: "activó su sistema", time: "hace 14 min" },
  { name: "Laura V.", city: "Puebla", action: "cargó 67 propiedades", time: "hace 18 min" },
];

const SS_KEY = "brerev_social_proof_dismissed";

function avatarGradient(name: string) {
  const c = name.charAt(0).toUpperCase();
  if (c >= "A" && c <= "G")
    return "linear-gradient(135deg, #1e5fff 0%, #2d6fff 100%)";
  if (c >= "H" && c <= "N")
    return "linear-gradient(135deg, #00d68f 0%, #00b378 100%)";
  return "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)";
}

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p.charAt(0))
    .slice(0, 2)
    .join("");
}

export function FloatingSocialProof() {
  const [active, setActive] = useState(false);
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(SS_KEY) === "true") {
      setDismissed(true);
      return;
    }
    const t = setTimeout(() => {
      setActive(true);
      setVisible(true);
    }, 15000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!active || dismissed) return;
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % ITEMS.length);
        setVisible(true);
      }, 500);
    }, 45000);
    return () => clearInterval(interval);
  }, [active, dismissed]);

  if (!active || dismissed) return null;

  const item = ITEMS[idx];

  return (
    <div
      className="fixed bottom-6 left-6 z-[80] hidden sm:block"
      style={{ maxWidth: 300 }}
    >
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            key={idx}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="relative flex items-center gap-3 rounded-[12px] px-4 py-3"
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--border-subtle)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
              backdropFilter: "blur(12px)",
            }}
          >
            <span
              className="absolute"
              style={{
                top: 10,
                right: 10,
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--success)",
                animation: "pulse-ring 2s infinite",
              }}
            />
            <div
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white"
              style={{ background: avatarGradient(item.name) }}
            >
              {initials(item.name)}
            </div>
            <div className="min-w-0 flex-1">
              <p
                className="truncate text-[13px] font-semibold"
                style={{ color: "var(--platinum)" }}
              >
                {item.name} de {item.city}
              </p>
              <p className="truncate text-[12px]" style={{ color: "var(--slate)" }}>
                {item.action} · {item.time}
              </p>
            </div>
            {hover && (
              <button
                type="button"
                onClick={() => {
                  window.sessionStorage.setItem(SS_KEY, "true");
                  setDismissed(true);
                }}
                aria-label="Cerrar"
                className="absolute"
                style={{
                  top: 4,
                  right: 22,
                  color: "var(--slate)",
                  padding: 2,
                }}
              >
                <X size={10} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
