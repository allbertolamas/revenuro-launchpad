import { useEffect, useState, type ReactNode } from "react";
import { Link, Outlet, useLocation, useNavigate, useRouter } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Calendar,
  Edit3,
  Settings,
  CreditCard,
  Bell,
  LogOut,
  Settings2,
} from "lucide-react";
import brerevLogo from "@/assets/brerev-logo.png";

type Period = "today" | "7d" | "30d" | "90d";

type NavItem = { label: string; to: string; icon: typeof LayoutDashboard; badge?: number };

const NAV_GROUPS: { label: string; items: NavItem[] }[] = [
  {
    label: "Visión general",
    items: [
      { label: "Dashboard", to: "/app/dashboard", icon: LayoutDashboard },
      { label: "Leads", to: "/app/leads", icon: Users, badge: 4 },
    ],
  },
  {
    label: "Operaciones",
    items: [
      { label: "Conversaciones", to: "/app/conversaciones", icon: MessageSquare },
      { label: "Citas", to: "/app/citas", icon: Calendar },
    ],
  },
  {
    label: "Configuración",
    items: [
      { label: "Mensajes", to: "/app/mensajes", icon: Edit3 },
      { label: "Configuración", to: "/app/configuracion", icon: Settings },
      { label: "Facturación", to: "/app/facturacion", icon: CreditCard },
    ],
  },
];

const PAGE_TITLES: Record<string, string> = {
  "/app/dashboard": "Dashboard",
  "/app/leads": "Leads",
  "/app/conversaciones": "Conversaciones",
  "/app/citas": "Citas",
  "/app/mensajes": "Mensajes del sistema",
  "/app/configuracion": "Configuración",
  "/app/facturacion": "Facturación",
};

export type PeriodContext = { period: Period; setPeriod: (p: Period) => void };
import { createContext, useContext } from "react";
const PeriodCtx = createContext<PeriodContext | null>(null);
export function usePeriod() {
  const ctx = useContext(PeriodCtx);
  if (!ctx) throw new Error("usePeriod must be used inside AppShell");
  return ctx;
}

export function AppShell() {
  const navigate = useNavigate();
  const router = useRouter();
  const [period, setPeriod] = useState<Period>("7d");

  // Guard simulado: si no hay flag, redirige a /login
  useEffect(() => {
    if (typeof window === "undefined") return;
    const flag = window.localStorage.getItem("brerev_logged_in");
    if (flag !== "true") {
      navigate({ to: "/login" });
    }
  }, [navigate]);

  const handleLogout = () => {
    window.localStorage.removeItem("brerev_logged_in");
    router.invalidate();
    navigate({ to: "/login" });
  };

  return (
    <PeriodCtx.Provider value={{ period, setPeriod }}>
      <div className="min-h-screen" style={{ background: "var(--midnight)" }}>
        {/* SIDEBAR DESKTOP */}
        <Sidebar onLogout={handleLogout} />

        {/* CONTENIDO */}
        <div className="lg:pl-[240px]">
          <TopBar period={period} setPeriod={setPeriod} />
          <main className="px-5 pb-24 pt-6 sm:px-8 lg:pb-12">
            <Outlet />
          </main>
        </div>

        {/* MOBILE BOTTOM NAV */}
        <MobileNav />
      </div>
    </PeriodCtx.Provider>
  );
}

function Sidebar({ onLogout }: { onLogout: () => void }) {
  const location = useLocation();
  const path = location.pathname;

  return (
    <aside
      className="fixed left-0 top-0 z-40 hidden h-screen w-[240px] flex-col lg:flex"
      style={{
        background: "rgba(8,14,29,0.98)",
        borderRight: "1px solid var(--steel)",
      }}
    >
      {/* Header */}
      <div className="px-5 pb-4 pt-5" style={{ borderBottom: "1px solid var(--steel)" }}>
        <Link to="/app/dashboard" className="flex items-center gap-2">
          <img
            src={brerevLogo}
            alt="Brerev"
            className="h-6 w-auto"
            style={{ filter: "drop-shadow(0 0 12px rgba(30,95,255,0.35))" }}
          />
        </Link>
        <div className="mt-3 flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
              style={{ background: "var(--success)" }}
            />
            <span
              className="relative inline-flex h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--success)" }}
            />
          </span>
          <span className="text-[12px]" style={{ color: "var(--success)" }}>
            Sofía activa
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-3">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="mb-2">
            <p
              className="px-2 pb-1.5 pt-4 text-[10px] font-semibold uppercase"
              style={{ color: "var(--slate)", letterSpacing: "0.1em" }}
            >
              {group.label}
            </p>
            {group.items.map((item) => {
              const active = path === item.to;
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className="group mb-0.5 flex items-center gap-2.5 rounded-[10px] px-3 py-2.5 text-[14px] transition-all"
                  style={{
                    color: active ? "var(--platinum)" : "var(--slate)",
                    background: active ? "rgba(30,95,255,0.12)" : "transparent",
                    borderLeft: active ? "2px solid var(--electric)" : "2px solid transparent",
                    fontWeight: active ? 500 : 400,
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                      e.currentTarget.style.color = "var(--platinum)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "var(--slate)";
                    }
                  }}
                >
                  <Icon size={18} />
                  <span className="flex-1">{item.label}</span>
                  {item.badge ? (
                    <span
                      className="rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular text-white"
                      style={{ background: "var(--electric)" }}
                    >
                      {item.badge}
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3" style={{ borderTop: "1px solid var(--steel)" }}>
        <div className="flex items-center gap-2.5 rounded-[10px] px-2 py-2">
          <div
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-white"
            style={{ background: "linear-gradient(135deg, var(--electric), #2d6fff)" }}
          >
            JM
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-semibold" style={{ color: "var(--platinum)" }}>
              Juan Martínez
            </p>
            <p className="truncate text-[11px]" style={{ color: "var(--slate)" }}>
              juan@inmobiliaria.mx
            </p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="mt-1 flex w-full items-center gap-2 rounded-[8px] px-3 py-2 text-[12px] transition-colors hover:bg-white/5"
          style={{ color: "var(--slate)" }}
        >
          <LogOut size={14} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}

function TopBar({
  period,
  setPeriod,
}: {
  period: Period;
  setPeriod: (p: Period) => void;
}) {
  const location = useLocation();
  const title = PAGE_TITLES[location.pathname] ?? "Brerev";
  const [notifOpen, setNotifOpen] = useState(false);

  const periods: { id: Period; label: string }[] = [
    { id: "today", label: "Hoy" },
    { id: "7d", label: "7 días" },
    { id: "30d", label: "30 días" },
    { id: "90d", label: "90 días" },
  ];

  return (
    <header
      className="sticky top-0 z-30 flex h-[60px] items-center justify-between px-5 sm:px-8"
      style={{
        background: "rgba(8,14,29,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--steel)",
      }}
    >
      <h1 className="text-[18px] font-semibold" style={{ color: "var(--platinum)" }}>
        {title}
      </h1>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Period selector — visible solo en dashboard / leads / conversaciones */}
        <div
          className="hidden items-center gap-1 rounded-full p-1 sm:flex"
          style={{ background: "var(--steel)" }}
        >
          {periods.map((p) => (
            <button
              key={p.id}
              onClick={() => setPeriod(p.id)}
              className="rounded-full px-3 py-1 text-[12px] font-semibold transition-all"
              style={{
                background: period === p.id ? "var(--electric)" : "transparent",
                color: period === p.id ? "white" : "var(--slate)",
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white/5"
            style={{ color: "var(--slate-light)" }}
            aria-label="Notificaciones"
          >
            <Bell size={18} />
            <span
              className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white"
              style={{ background: "var(--red-loss)" }}
            >
              3
            </span>
          </button>
          {notifOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setNotifOpen(false)}
              />
              <div
                className="absolute right-0 top-11 z-50 w-[320px] overflow-hidden rounded-[14px] shadow-2xl"
                style={{
                  background: "var(--card-bg)",
                  border: "1px solid var(--border-subtle)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div className="p-3" style={{ borderBottom: "1px solid var(--steel)" }}>
                  <p className="text-[13px] font-semibold" style={{ color: "var(--platinum)" }}>
                    Notificaciones recientes
                  </p>
                </div>
                <ul className="max-h-[320px] overflow-y-auto">
                  {[
                    { t: "🔥 Lead caliente", d: "Mariana López — Polanco $4M", a: "hace 2 min" },
                    { t: "Cita confirmada", d: "Patricia Ortiz — hoy 5:00 PM", a: "hace 18 min" },
                    { t: "Nuevo lead", d: "Andrés Vega — Casa Coyoacán", a: "hace 41 min" },
                  ].map((n, i) => (
                    <li
                      key={i}
                      className="cursor-pointer p-3 transition-colors hover:bg-white/5"
                      style={{ borderBottom: i < 2 ? "1px solid var(--steel)" : undefined }}
                    >
                      <p className="text-[13px] font-medium" style={{ color: "var(--platinum)" }}>
                        {n.t}
                      </p>
                      <p className="mt-0.5 text-[12px]" style={{ color: "var(--slate)" }}>
                        {n.d}
                      </p>
                      <p className="mt-1 text-[11px]" style={{ color: "var(--slate)", opacity: 0.7 }}>
                        {n.a}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>

        {/* Avatar */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-full text-[12px] font-bold text-white transition-transform hover:scale-105"
          style={{ background: "linear-gradient(135deg, var(--electric), #2d6fff)" }}
          aria-label="Cuenta"
        >
          JM
        </button>
      </div>
    </header>
  );
}

function MobileNav() {
  const location = useLocation();
  const path = location.pathname;
  const items: NavItem[] = [
    { label: "Dashboard", to: "/app/dashboard", icon: LayoutDashboard },
    { label: "Leads", to: "/app/leads", icon: Users },
    { label: "Citas", to: "/app/citas", icon: Calendar },
    { label: "Mensajes", to: "/app/mensajes", icon: Edit3 },
    { label: "Config", to: "/app/configuracion", icon: Settings2 },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 flex h-[60px] items-center justify-around lg:hidden"
      style={{
        background: "rgba(8,14,29,0.98)",
        borderTop: "1px solid var(--steel)",
        backdropFilter: "blur(12px)",
      }}
    >
      {items.map((item) => {
        const active = path === item.to;
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            className="flex flex-1 flex-col items-center gap-0.5 py-2"
            style={{ color: active ? "var(--electric)" : "var(--slate)" }}
          >
            <Icon size={22} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

// Re-export types
export type { Period };
// helper for skeleton screens used by sub-pages
export function SkeletonBlock({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={className}
      style={{
        background:
          "linear-gradient(90deg, rgba(42,58,92,0.2) 0%, rgba(42,58,92,0.5) 50%, rgba(42,58,92,0.2) 100%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s linear infinite",
        borderRadius: 8,
        ...style,
      }}
    />
  );
}

// silence unused warning if ReactNode imported but not used
type _unused = ReactNode;
