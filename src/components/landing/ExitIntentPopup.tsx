import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Link } from "@tanstack/react-router";

const SS_KEY = "brerev_exit_popup_shown";

function useCountUp(value: number, duration = 600) {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);
  useEffect(() => {
    const from = fromRef.current;
    const start = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(from + (value - from) * eased));
      if (p < 1) raf = requestAnimationFrame(step);
      else fromRef.current = value;
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return display;
}

export function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const [leads, setLeads] = useState(60);
  const startedAt = useRef<number>(Date.now());

  // Estimate: 38% of leads lost × $4500 MXN avg per lost lead
  const monthlyLoss = Math.round(leads * 0.38 * 4500);
  const animated = useCountUp(monthlyLoss, 500);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(SS_KEY) === "true") return;

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY > 0) return;
      const elapsed = Date.now() - startedAt.current;
      if (elapsed < 20000) return;
      if (window.sessionStorage.getItem(SS_KEY) === "true") return;
      window.sessionStorage.setItem(SS_KEY, "true");
      setOpen(true);
    };
    document.addEventListener("mouseleave", onMouseLeave);
    return () => document.removeEventListener("mouseleave", onMouseLeave);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[150]"
            style={{
              background: "rgba(0,0,0,0.75)",
              backdropFilter: "blur(6px)",
            }}
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ scale: 0.92, opacity: 0, x: "-50%", y: "-50%" }}
            animate={{ scale: 1, opacity: 1, x: "-50%", y: "-50%" }}
            exit={{ scale: 0.92, opacity: 0, x: "-50%", y: "-50%" }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            className="fixed left-1/2 top-1/2 z-[151] w-[90%] max-w-[520px] rounded-[20px] p-8 sm:p-12"
            style={{
              background: "var(--midnight)",
              border: "1px solid var(--border-subtle)",
              boxShadow:
                "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(30,95,255,0.1)",
            }}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
              className="absolute right-4 top-4"
              style={{ color: "var(--slate)" }}
            >
              <X size={18} />
            </button>

            <p
              className="text-[11px] font-semibold uppercase"
              style={{ color: "var(--electric)", letterSpacing: "0.12em" }}
            >
              ESPERA UN MOMENTO
            </p>
            <h2
              className="mt-3 text-[26px] sm:text-[30px] font-bold leading-[1.15]"
              style={{ color: "var(--platinum)", letterSpacing: "-0.02em" }}
            >
              ¿Cuántos leads perdiste esta semana sin saberlo?
            </h2>
            <p
              className="mt-3 text-[15px] sm:text-[16px]"
              style={{ color: "var(--slate)" }}
            >
              Mueve el slider y ve el dinero que se está yendo.
            </p>

            <div className="mt-6">
              <div className="mb-3 flex items-center justify-between">
                <span
                  className="text-[13px] font-medium"
                  style={{ color: "var(--slate-light)" }}
                >
                  ¿Cuántos leads recibes al mes?
                </span>
                <span
                  className="rounded-full px-3 py-1 text-[13px] font-bold tabular-nums"
                  style={{
                    background: "rgba(30,95,255,0.15)",
                    color: "var(--electric)",
                  }}
                >
                  {leads}
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={300}
                step={5}
                value={leads}
                onChange={(e) => setLeads(Number(e.target.value))}
                className="w-full accent-[color:var(--electric)]"
              />
            </div>

            <div
              className="mt-5 rounded-[12px] px-6 py-5 text-center"
              style={{
                background: "rgba(255,71,87,0.08)",
                border: "1px solid rgba(255,71,87,0.2)",
              }}
            >
              <p className="text-[13px]" style={{ color: "var(--slate)" }}>
                Pérdida estimada mensual
              </p>
              <p
                className="mt-1 text-[40px] sm:text-[44px] font-extrabold tabular-nums leading-none"
                style={{ color: "var(--red-loss)" }}
              >
                ${animated.toLocaleString("es-MX")}{" "}
                <span className="text-[18px] font-bold">MXN</span>
              </p>
              <p
                className="mt-2 text-[14px] font-semibold"
                style={{ color: "var(--success)" }}
              >
                Con Brerev: $0 de pérdidas
              </p>
            </div>

            <Link
              to="/registro"
              onClick={() => setOpen(false)}
              className="btn-primary mt-6 w-full justify-center text-[15px] sm:text-[16px]"
              style={{ height: 52 }}
            >
              Activar mi prueba gratuita y proteger mis leads →
            </Link>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-3 block w-full text-center text-[13px]"
              style={{ color: "var(--slate)" }}
            >
              No, prefiero seguir perdiendo leads
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
