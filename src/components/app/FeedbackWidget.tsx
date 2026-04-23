import { useEffect, useState } from "react";
import { useLocation } from "@tanstack/react-router";
import { ThumbsUp, ThumbsDown, X } from "lucide-react";
import { recordFeedback, shouldShowFeedback } from "@/lib/mock-globals";

const APPEAR_MS = 30_000;

type Stage = "ask" | "comment" | "thanks";

export function FeedbackWidget() {
  const location = useLocation();
  const path = location.pathname;
  const [visible, setVisible] = useState(false);
  const [stage, setStage] = useState<Stage>("ask");
  const [comment, setComment] = useState("");

  useEffect(() => {
    setVisible(false);
    setStage("ask");
    setComment("");
    if (!shouldShowFeedback(path)) return;
    const t = setTimeout(() => setVisible(true), APPEAR_MS);
    return () => clearTimeout(t);
  }, [path]);

  if (!visible) return null;

  const handleUp = () => {
    recordFeedback(path, 1);
    setStage("thanks");
    setTimeout(() => setVisible(false), 2000);
  };
  const handleDown = () => {
    setStage("comment");
  };
  const submitComment = () => {
    recordFeedback(path, -1, comment.trim() || undefined);
    setStage("thanks");
    setTimeout(() => setVisible(false), 1500);
  };
  const dismiss = () => setVisible(false);

  return (
    <div
      className="fixed bottom-5 right-5 z-[60] hidden lg:block"
      style={{
        animation: "brerev-slide-up 0.3s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--border-subtle)",
          borderRadius: 10,
          padding: "12px 16px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          backdropFilter: "blur(12px)",
          maxWidth: stage === "comment" ? 320 : "auto",
        }}
      >
        {stage === "ask" && (
          <div className="flex items-center gap-3">
            <span className="text-[13px]" style={{ color: "var(--slate)" }}>
              ¿Esta página es útil?
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={handleUp}
                className="flex h-7 w-7 items-center justify-center rounded transition-all hover:bg-white/5"
                style={{ color: "var(--slate)" }}
                aria-label="Sí"
              >
                <ThumbsUp size={16} />
              </button>
              <button
                onClick={handleDown}
                className="flex h-7 w-7 items-center justify-center rounded transition-all hover:bg-white/5"
                style={{ color: "var(--slate)" }}
                aria-label="No"
              >
                <ThumbsDown size={16} />
              </button>
            </div>
            <button
              onClick={dismiss}
              className="flex h-6 w-6 items-center justify-center rounded transition-colors hover:bg-white/5"
              style={{ color: "var(--slate)" }}
              aria-label="Cerrar"
            >
              <X size={12} />
            </button>
          </div>
        )}

        {stage === "comment" && (
          <div className="space-y-2">
            <p className="text-[13px]" style={{ color: "var(--platinum)" }}>
              ¿Qué mejorarías de esta página?
            </p>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tu opinión nos ayuda a mejorar…"
              rows={3}
              className="w-full resize-none rounded-md p-2 text-[13px] outline-none"
              style={{
                background: "rgba(8,14,29,0.6)",
                border: "1px solid var(--steel)",
                color: "var(--platinum)",
              }}
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={dismiss}
                className="rounded px-3 py-1 text-[12px]"
                style={{ color: "var(--slate)" }}
              >
                Cancelar
              </button>
              <button
                onClick={submitComment}
                className="rounded px-3 py-1 text-[12px] font-semibold text-white"
                style={{ background: "var(--electric)" }}
              >
                Enviar
              </button>
            </div>
          </div>
        )}

        {stage === "thanks" && (
          <div className="flex items-center gap-2 text-[13px]" style={{ color: "var(--success)" }}>
            <span>¡Gracias! 🙌</span>
          </div>
        )}
      </div>
      <style>{`
        @keyframes brerev-slide-up {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
