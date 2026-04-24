import { useState } from "react";

const PARTNERS = [
  { name: "ElevenLabs", role: "Motor de conversación" },
  { name: "Stripe", role: "Pagos seguros" },
  { name: "Google", role: "Sincronización de calendario" },
  { name: "Supabase", role: "Infraestructura de datos" },
];

export function PoweredByBar() {
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <section
      className="relative px-6 py-8"
      style={{
        background: "var(--midnight)",
        borderTop: "1px solid var(--steel)",
      }}
    >
      <div className="mx-auto max-w-[1200px] text-center">
        <p
          className="mb-6 text-[11px] sm:text-[12px] uppercase"
          style={{ color: "var(--slate)", letterSpacing: "0.1em" }}
        >
          La infraestructura detrás de Brerev
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 sm:gap-x-12">
          {PARTNERS.map((p) => (
            <div
              key={p.name}
              className="relative"
              onMouseEnter={() => setHovered(p.name)}
              onMouseLeave={() => setHovered(null)}
            >
              <span
                className="text-[16px] sm:text-[18px] font-semibold transition-opacity duration-200"
                style={{
                  color: "var(--platinum)",
                  opacity: hovered === p.name ? 0.95 : 0.45,
                  letterSpacing: "-0.01em",
                }}
              >
                {p.name}
              </span>
              {hovered === p.name && (
                <span
                  className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-md px-2.5 py-1 text-[11px]"
                  style={{
                    background: "var(--navy-light)",
                    color: "var(--platinum)",
                    border: "1px solid var(--steel-light)",
                  }}
                >
                  {p.role}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
