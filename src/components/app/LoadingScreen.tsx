import { useEffect, useState } from "react";

export function LoadingScreen({ minMs = 600 }: { minMs?: number }) {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setFading(true);
      setTimeout(() => setVisible(false), 300);
    }, minMs);
    return () => clearTimeout(t);
  }, [minMs]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-5"
      style={{
        background: "var(--midnight)",
        opacity: fading ? 0 : 1,
        transition: "opacity 0.3s ease",
      }}
    >
      <div
        className="text-[24px] font-bold"
        style={{ color: "var(--platinum)", letterSpacing: "0.08em" }}
      >
        BREREV
      </div>
      <div
        style={{
          width: 40,
          height: 40,
          border: "2px solid var(--steel)",
          borderTopColor: "var(--electric)",
          borderRadius: "50%",
          animation: "brerev-spin 0.8s linear infinite",
        }}
      />
      <p className="text-[14px]" style={{ color: "var(--slate)" }}>
        Cargando tu sistema…
      </p>
      <style>{`
        @keyframes brerev-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
