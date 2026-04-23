import { useEffect, useState } from "react";
import { Sparkles, X } from "lucide-react";
import {
  APP_CHANGELOG,
  APP_VERSION,
  APP_VERSION_DATE,
  dismissUpdateBanner,
  markVersionSeen,
  shouldShowUpdateBanner,
} from "@/lib/mock-globals";

const TYPE_META: Record<string, { icon: string; color: string }> = {
  feature: { icon: "✨", color: "var(--electric)" },
  improvement: { icon: "🔧", color: "var(--amber)" },
  fix: { icon: "🐛", color: "var(--success)" },
};

export function UpdateBanner() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setShow(shouldShowUpdateBanner());
    const handler = () => setShow(shouldShowUpdateBanner());
    window.addEventListener("brerev:state-change", handler);
    return () => window.removeEventListener("brerev:state-change", handler);
  }, []);

  if (!show) return null;

  const handleDismiss = () => {
    dismissUpdateBanner();
    setShow(false);
  };

  const handleOpen = () => {
    setOpen(true);
    markVersionSeen();
  };

  return (
    <>
      <div
        className="sticky z-20 flex items-center justify-between gap-3 px-5 py-2.5 sm:px-8"
        style={{
          top: 60,
          background: "rgba(30,95,255,0.1)",
          borderBottom: "1px solid rgba(30,95,255,0.2)",
        }}
      >
        <div className="flex min-w-0 items-center gap-2">
          <Sparkles size={16} style={{ color: "var(--electric)" }} className="flex-shrink-0" />
          <span className="truncate text-[14px]" style={{ color: "var(--platinum)" }}>
            Brerev se actualizó — hay nuevas mejoras disponibles
          </span>
        </div>
        <div className="flex flex-shrink-0 items-center gap-3">
          <button
            onClick={handleOpen}
            className="text-[13px] font-medium transition-opacity hover:opacity-80"
            style={{ color: "var(--electric)" }}
          >
            Ver qué hay de nuevo →
          </button>
          <button
            onClick={handleDismiss}
            className="flex h-6 w-6 items-center justify-center rounded transition-colors hover:bg-white/5"
            style={{ color: "var(--slate)" }}
            aria-label="Cerrar"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-[560px] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--navy)",
              border: "1px solid var(--border-subtle)",
              borderRadius: 16,
              boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
            }}
          >
            <div
              className="flex items-start justify-between px-7 pt-7"
              style={{ borderBottom: "1px solid var(--steel)", paddingBottom: 20 }}
            >
              <div>
                <h2 className="text-[22px] font-semibold" style={{ color: "var(--platinum)" }}>
                  Novedades de Brerev
                </h2>
                <p className="mt-1 text-[13px]" style={{ color: "var(--slate)" }}>
                  v{APP_VERSION} · {APP_VERSION_DATE}
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-1 transition-colors hover:bg-white/5"
                style={{ color: "var(--slate)" }}
                aria-label="Cerrar"
              >
                <X size={18} />
              </button>
            </div>

            <ul className="max-h-[60vh] space-y-4 overflow-y-auto p-7">
              {APP_CHANGELOG.map((entry, i) => {
                const meta = TYPE_META[entry.type];
                return (
                  <li key={i} className="flex gap-3">
                    <span className="text-[18px]">{meta.icon}</span>
                    <div>
                      <p className="text-[15px]" style={{ color: "var(--platinum)" }}>
                        {entry.title}
                      </p>
                      {entry.detail && (
                        <p className="mt-1 text-[13px]" style={{ color: "var(--slate)" }}>
                          {entry.detail}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="px-7 pb-7">
              <button
                onClick={() => {
                  setOpen(false);
                  handleDismiss();
                }}
                className="w-full rounded-[10px] py-3 text-[14px] font-semibold text-white transition-transform hover:scale-[1.01]"
                style={{ background: "var(--electric)" }}
              >
                Entendido, ¡gracias!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
