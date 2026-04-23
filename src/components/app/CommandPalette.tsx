import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Command } from "cmdk";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Edit3,
  Bell,
  FileBarChart2,
  Settings,
  Search,
  Sparkles,
  MessageSquare,
  Plug,
  HelpCircle,
} from "lucide-react";

type QuickItem = {
  label: string;
  to: string;
  icon: typeof LayoutDashboard;
  shortcut?: string;
};

const QUICK_ITEMS: QuickItem[] = [
  { label: "Dashboard", to: "/app/dashboard", icon: LayoutDashboard, shortcut: "G D" },
  { label: "Leads de hoy", to: "/app/leads", icon: Users, shortcut: "G L" },
  { label: "Próximas citas", to: "/app/citas", icon: Calendar },
  { label: "Conversaciones", to: "/app/conversaciones", icon: MessageSquare },
  { label: "Editar mensajes", to: "/app/mensajes", icon: Edit3 },
  { label: "Notificaciones", to: "/app/notificaciones", icon: Bell, shortcut: "G N" },
  { label: "Reporte del mes", to: "/app/reporte", icon: FileBarChart2 },
  { label: "Integraciones", to: "/app/integraciones", icon: Plug },
  { label: "Configuración", to: "/app/configuracion", icon: Settings },
  { label: "Bienvenida", to: "/app/bienvenida", icon: Sparkles },
  { label: "Centro de ayuda", to: "/ayuda", icon: HelpCircle },
];

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  // ESC close manejado por cmdk; backdrop click
  if (!open) return null;

  const go = (to: string) => {
    onOpenChange(false);
    navigate({ to });
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[15vh]"
      style={{
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(8px)",
        animation: "brerev-fade-in 0.15s ease",
      }}
      onClick={() => onOpenChange(false)}
    >
      <div
        className="w-full max-w-[560px] overflow-hidden"
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--border-subtle)",
          borderRadius: 16,
          boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
          animation: "brerev-pop-in 0.15s cubic-bezier(0.16,1,0.3,1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Command label="Comando rápido" loop>
          <div
            className="flex items-center gap-3 px-5 py-4"
            style={{ borderBottom: "1px solid var(--steel)" }}
          >
            <Search size={18} style={{ color: "var(--slate)" }} />
            <Command.Input
              autoFocus
              value={query}
              onValueChange={setQuery}
              placeholder="Buscar leads, ir a página…"
              className="flex-1 bg-transparent text-[16px] outline-none"
              style={{ color: "var(--platinum)" }}
            />
            <kbd
              className="rounded px-1.5 py-0.5 text-[10px] font-semibold"
              style={{ background: "var(--steel)", color: "var(--slate-light)" }}
            >
              ESC
            </kbd>
          </div>

          <Command.List
            className="max-h-[400px] overflow-y-auto p-2"
            style={{ scrollBehavior: "smooth" }}
          >
            <Command.Empty
              className="px-5 py-10 text-center text-[14px]"
              style={{ color: "var(--slate)" }}
            >
              No encontramos nada para "{query}"
            </Command.Empty>

            <Command.Group
              heading="Accesos rápidos"
              className="brerev-cmd-group"
            >
              {QUICK_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <Command.Item
                    key={item.to}
                    value={item.label}
                    onSelect={() => go(item.to)}
                    className="brerev-cmd-item"
                  >
                    <Icon size={16} style={{ color: "var(--slate)" }} />
                    <span className="flex-1 text-[14px]">{item.label}</span>
                    {item.shortcut && (
                      <kbd
                        className="rounded px-1.5 py-0.5 text-[10px] font-semibold"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          color: "var(--slate)",
                        }}
                      >
                        {item.shortcut}
                      </kbd>
                    )}
                  </Command.Item>
                );
              })}
            </Command.Group>

            <Command.Group heading="Leads" className="brerev-cmd-group">
              <div
                className="flex items-center gap-3 px-3 py-3 text-[13px]"
                style={{ color: "var(--slate)" }}
              >
                <Search size={14} />
                <span>
                  La búsqueda de leads se activará al conectar tu base de datos.
                </span>
              </div>
            </Command.Group>
          </Command.List>

          <div
            className="flex items-center justify-between px-4 py-2.5 text-[11px]"
            style={{
              borderTop: "1px solid var(--steel)",
              color: "var(--slate)",
            }}
          >
            <span>↑↓ navegar · Enter seleccionar</span>
            <span>ESC cerrar</span>
          </div>
        </Command>
      </div>

      <style>{`
        @keyframes brerev-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes brerev-pop-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .brerev-cmd-group [cmdk-group-heading] {
          padding: 12px 12px 6px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--slate);
        }
        .brerev-cmd-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 8px;
          cursor: pointer;
          color: var(--platinum);
          transition: background 0.12s ease, color 0.12s ease;
        }
        .brerev-cmd-item[data-selected="true"] {
          background: rgba(30,95,255,0.08);
          color: var(--electric);
        }
        .brerev-cmd-item[data-selected="true"] svg {
          color: var(--electric) !important;
        }
      `}</style>
    </div>
  );
}

export function CommandTrigger({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-[8px] px-3 py-1.5 text-[13px] transition-colors hover:bg-white/5"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid var(--steel)",
        color: "var(--slate)",
      }}
      aria-label="Abrir buscador"
    >
      <Search size={14} />
      <span className="hidden sm:inline">Buscar…</span>
      <kbd
        className="rounded px-1 py-0.5 text-[10px] font-semibold"
        style={{ background: "var(--steel)", color: "var(--slate-light)" }}
      >
        ⌘K
      </kbd>
    </button>
  );
}
