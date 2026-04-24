import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, createElement } from "react";
import { EMAIL_TEMPLATES } from "@/lib/emails/templates";
import { Mail, Code2, Eye } from "lucide-react";

export const Route = createFileRoute("/_app/app/dev/emails")({
  head: () => ({
    meta: [
      { title: "Preview emails — Brerev" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: EmailsPreviewPage,
});

function EmailsPreviewPage() {
  const [selectedId, setSelectedId] = useState(EMAIL_TEMPLATES[0].id);
  const [view, setView] = useState<"preview" | "html">("preview");
  const [html, setHtml] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const selected = useMemo(
    () => EMAIL_TEMPLATES.find((t) => t.id === selectedId)!,
    [selectedId]
  );

  // Render @react-email solo en cliente (no SSR-safe en Worker)
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      try {
        const mod = await import("@react-email/components");
        if (cancelled) return;
        const result = await mod.render(createElement(selected.component), {
          pretty: true,
        });
        if (!cancelled) setHtml(result as unknown as string);
      } catch (err) {
        if (!cancelled)
          setHtml(`<!-- error: ${(err as Error).message} -->`);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [selected]);

  return (
    <div className="mx-auto max-w-[1400px]">
      <header className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p
            className="text-[12px] font-semibold uppercase"
            style={{ color: "var(--electric)", letterSpacing: "0.1em" }}
          >
            Sistema de emails
          </p>
          <h1
            className="mt-1 text-[28px] font-semibold"
            style={{ color: "var(--platinum)" }}
          >
            Preview de los 12 emails transaccionales
          </h1>
          <p
            className="mt-2 text-[14px]"
            style={{ color: "var(--slate)" }}
          >
            Vista previa local. Cuando se conecte Resend, estos templates se
            envían desde el backend con los triggers correspondientes.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-1">
          {EMAIL_TEMPLATES.map((tpl) => {
            const active = tpl.id === selectedId;
            return (
              <button
                key={tpl.id}
                onClick={() => setSelectedId(tpl.id)}
                className="flex w-full items-start gap-3 rounded-[10px] px-3 py-2.5 text-left transition-colors"
                style={{
                  background: active ? "rgba(30,95,255,0.12)" : "transparent",
                  borderLeft: active
                    ? "2px solid var(--electric)"
                    : "2px solid transparent",
                }}
              >
                <Mail
                  size={16}
                  style={{
                    color: active ? "var(--electric)" : "var(--slate)",
                    marginTop: 2,
                  }}
                />
                <div className="min-w-0 flex-1">
                  <p
                    className="truncate text-[13px] font-medium"
                    style={{
                      color: active ? "var(--platinum)" : "var(--slate-light)",
                    }}
                  >
                    {tpl.name}
                  </p>
                  <p
                    className="mt-0.5 truncate text-[11px]"
                    style={{ color: "var(--slate)" }}
                  >
                    {tpl.trigger}
                  </p>
                </div>
              </button>
            );
          })}
        </aside>

        <div
          className="overflow-hidden rounded-[16px]"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <div
            className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"
            style={{ borderBottom: "1px solid var(--steel)" }}
          >
            <div className="min-w-0 flex-1">
              <p
                className="text-[11px] uppercase"
                style={{ color: "var(--slate)", letterSpacing: "0.1em" }}
              >
                Asunto
              </p>
              <p
                className="mt-1 truncate text-[15px] font-semibold"
                style={{ color: "var(--platinum)" }}
              >
                {selected.subject}
              </p>
              <p className="mt-1 text-[12px]" style={{ color: "var(--slate)" }}>
                Trigger: {selected.trigger}
              </p>
            </div>
            <div
              className="flex items-center gap-1 rounded-full p-1"
              style={{ background: "var(--steel)" }}
            >
              <button
                onClick={() => setView("preview")}
                className="flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold"
                style={{
                  background: view === "preview" ? "var(--electric)" : "transparent",
                  color: view === "preview" ? "white" : "var(--slate)",
                }}
              >
                <Eye size={12} /> Preview
              </button>
              <button
                onClick={() => setView("html")}
                className="flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold"
                style={{
                  background: view === "html" ? "var(--electric)" : "transparent",
                  color: view === "html" ? "white" : "var(--slate)",
                }}
              >
                <Code2 size={12} /> HTML
              </button>
            </div>
          </div>

          <div className="p-5">
            {loading ? (
              <div
                className="flex items-center justify-center rounded-[12px]"
                style={{
                  height: "70vh",
                  background: "rgba(0,0,0,0.4)",
                  border: "1px solid var(--steel)",
                  color: "var(--slate)",
                  fontSize: 14,
                }}
              >
                Renderizando email…
              </div>
            ) : view === "preview" ? (
              <iframe
                title={selected.name}
                srcDoc={html}
                className="w-full rounded-[12px]"
                style={{
                  height: "70vh",
                  background: "#080E1D",
                  border: "1px solid var(--steel)",
                }}
              />
            ) : (
              <pre
                className="max-h-[70vh] overflow-auto rounded-[12px] p-4 text-[11px] leading-relaxed"
                style={{
                  background: "rgba(0,0,0,0.4)",
                  border: "1px solid var(--steel)",
                  color: "var(--slate-light)",
                  fontFamily: "JetBrains Mono, monospace",
                }}
              >
                {html}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
