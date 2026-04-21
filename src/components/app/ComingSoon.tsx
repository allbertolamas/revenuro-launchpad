import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function ComingSoon({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-[640px] flex-col items-center justify-center text-center">
      <div
        className="flex h-16 w-16 items-center justify-center rounded-2xl"
        style={{
          background: "rgba(30,95,255,0.08)",
          border: "1px solid rgba(30,95,255,0.2)",
        }}
      >
        <Sparkles size={26} style={{ color: "var(--electric)" }} />
      </div>
      <h2
        className="mt-6 text-[28px] font-bold"
        style={{ color: "var(--platinum)" }}
      >
        {title}
      </h2>
      <p
        className="mt-2 max-w-[440px] text-[15px]"
        style={{ color: "var(--slate)" }}
      >
        {description}
      </p>
      <p
        className="mt-1 max-w-[440px] text-[13px]"
        style={{ color: "var(--slate)", opacity: 0.7 }}
      >
        Próximamente en esta entrega.
      </p>
      <Link to="/app/dashboard" className="btn-ghost mt-8">
        ← Volver al dashboard
      </Link>
    </div>
  );
}
