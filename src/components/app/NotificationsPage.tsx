import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Flame,
  CalendarCheck,
  UserPlus,
  AlertCircle,
  RefreshCw,
  BarChart2,
  WifiOff,
  TrendingUp,
  Settings,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  getMockNotifications,
  loadReadIds,
  saveReadIds,
  dateBucket,
  timeAgo,
  type NotificationItem,
  type NotificationType,
} from "@/lib/mock-notifications";

type FilterTab = "all" | "unread" | "leads" | "citas" | "sistema";

const ICON_MAP: Record<
  NotificationType,
  { icon: typeof Flame; color: string; bg: string }
> = {
  lead_hot: {
    icon: Flame,
    color: "var(--amber)",
    bg: "rgba(255,176,32,0.15)",
  },
  appointment: {
    icon: CalendarCheck,
    color: "var(--success)",
    bg: "rgba(0,214,143,0.12)",
  },
  lead_new: {
    icon: UserPlus,
    color: "var(--electric)",
    bg: "rgba(30,95,255,0.15)",
  },
  no_confirm: {
    icon: AlertCircle,
    color: "var(--red-loss)",
    bg: "rgba(255,71,87,0.12)",
  },
  reactivation: {
    icon: RefreshCw,
    color: "var(--electric)",
    bg: "rgba(30,95,255,0.1)",
  },
  plan_usage: {
    icon: BarChart2,
    color: "var(--amber)",
    bg: "rgba(255,176,32,0.12)",
  },
  system_offline: {
    icon: WifiOff,
    color: "var(--red-loss)",
    bg: "rgba(255,71,87,0.1)",
  },
  weekly_report: {
    icon: TrendingUp,
    color: "var(--electric)",
    bg: "rgba(30,95,255,0.08)",
  },
};

export function NotificationsPage() {
  const allNotifs = useMemo(() => getMockNotifications(), []);
  const [readIds, setReadIds] = useState<Set<string>>(new Set());
  const [tab, setTab] = useState<FilterTab>("all");

  useEffect(() => {
    setReadIds(loadReadIds());
  }, []);

  const persist = (next: Set<string>) => {
    setReadIds(next);
    saveReadIds(next);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("brerev:state-change"));
    }
  };

  const markRead = (id: string) => {
    if (readIds.has(id)) return;
    const next = new Set(readIds);
    next.add(id);
    persist(next);
  };

  const markAllRead = () => {
    const next = new Set<string>();
    allNotifs.forEach((n) => next.add(n.id));
    persist(next);
  };

  const unreadCount = allNotifs.filter((n) => !readIds.has(n.id)).length;

  const filtered = allNotifs.filter((n) => {
    if (tab === "all") return true;
    if (tab === "unread") return !readIds.has(n.id);
    return n.category === tab;
  });

  // Group by date bucket
  const grouped = useMemo(() => {
    const buckets: Record<string, NotificationItem[]> = {};
    filtered.forEach((n) => {
      const b = dateBucket(n.createdAt);
      if (!buckets[b]) buckets[b] = [];
      buckets[b].push(n);
    });
    return buckets;
  }, [filtered]);

  const bucketOrder = ["Hoy", "Ayer", "Esta semana", "Más antiguas"];

  const tabs: { id: FilterTab; label: string; count?: number }[] = [
    { id: "all", label: "Todas", count: allNotifs.length },
    { id: "unread", label: "Sin leer", count: unreadCount },
    {
      id: "leads",
      label: "Leads",
      count: allNotifs.filter((n) => n.category === "leads").length,
    },
    {
      id: "citas",
      label: "Citas",
      count: allNotifs.filter((n) => n.category === "citas").length,
    },
    {
      id: "sistema",
      label: "Sistema",
      count: allNotifs.filter((n) => n.category === "sistema").length,
    },
  ];

  return (
    <div className="mx-auto max-w-[820px] py-2">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2
            className="text-[28px] font-bold sm:text-[32px]"
            style={{ color: "var(--platinum)", letterSpacing: "-0.01em" }}
          >
            Notificaciones
          </h2>
          <p className="mt-1 text-[14px]" style={{ color: "var(--slate)" }}>
            {unreadCount > 0
              ? `${unreadCount} sin leer`
              : "Todo al día"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="text-[13px] font-medium transition-colors"
              style={{ color: "var(--electric)" }}
            >
              Marcar todas como leídas
            </button>
          )}
          <Link
            to="/app/configuracion"
            className="inline-flex items-center gap-1.5 rounded-[10px] px-3 py-2 text-[12px] font-medium transition-colors hover:bg-white/5"
            style={{
              color: "var(--slate-light)",
              border: "1px solid var(--steel-light)",
            }}
          >
            <Settings size={14} />
            Configurar alertas
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div
        className="mb-5 flex gap-1 overflow-x-auto pb-1"
        style={{ borderBottom: "1px solid var(--steel)" }}
      >
        {tabs.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="relative flex items-center gap-1.5 whitespace-nowrap px-3 py-2.5 text-[13px] font-medium transition-colors"
              style={{
                color: active ? "var(--platinum)" : "var(--slate)",
                borderBottom: active
                  ? "2px solid var(--electric)"
                  : "2px solid transparent",
                marginBottom: "-1px",
              }}
            >
              {t.label}
              {t.count !== undefined && t.count > 0 && (
                <span
                  className="rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular"
                  style={{
                    background: active
                      ? "var(--electric)"
                      : "var(--steel-light)",
                    color: active ? "white" : "var(--slate-light)",
                  }}
                >
                  {t.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Lista */}
      {filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col gap-6">
          {bucketOrder.map((bucket) => {
            const items = grouped[bucket];
            if (!items || items.length === 0) return null;
            return (
              <div key={bucket}>
                <div className="mb-3 flex items-center gap-3">
                  <p
                    className="text-[11px] font-semibold uppercase"
                    style={{ color: "var(--slate)", letterSpacing: "0.1em" }}
                  >
                    {bucket}
                  </p>
                  <div
                    className="flex-1"
                    style={{ borderTop: "1px solid var(--steel)" }}
                  />
                </div>
                <AnimatePresence initial={false}>
                  {items.map((n) => (
                    <NotifRow
                      key={n.id}
                      notif={n}
                      isRead={readIds.has(n.id)}
                      onClick={() => markRead(n.id)}
                    />
                  ))}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function NotifRow({
  notif,
  isRead,
  onClick,
}: {
  notif: NotificationItem;
  isRead: boolean;
  onClick: () => void;
}) {
  const conf = ICON_MAP[notif.type];
  const Icon = conf.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
      className="relative mb-2 flex cursor-pointer gap-4 rounded-[12px] p-4 transition-all hover:-translate-y-px"
      style={{
        background: isRead ? "var(--card-bg)" : "rgba(30,95,255,0.04)",
        border: "1px solid var(--border-subtle)",
        borderLeft: isRead
          ? "3px solid transparent"
          : "3px solid var(--electric)",
        opacity: isRead ? 0.75 : 1,
      }}
    >
      {!isRead && (
        <span
          className="absolute right-4 top-4 h-2 w-2 rounded-full"
          style={{ background: "var(--electric)" }}
        />
      )}

      <div
        className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[12px]"
        style={{ background: conf.bg }}
      >
        <Icon size={20} style={{ color: conf.color }} />
      </div>

      <div className="min-w-0 flex-1 pr-4">
        <p
          className="text-[15px] font-semibold"
          style={{ color: "var(--platinum)" }}
        >
          {notif.title}
        </p>
        <p
          className="mt-1 text-[14px]"
          style={{ color: "var(--slate-light)", lineHeight: 1.5 }}
        >
          {notif.body}
        </p>
        <p
          className="mt-1.5 text-[12px]"
          style={{ color: "var(--slate)", opacity: 0.7 }}
        >
          {timeAgo(notif.createdAt)}
        </p>
        {notif.actions && notif.actions.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {notif.actions.map((a, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  onClick();
                }}
                className="rounded-[8px] px-3 py-1.5 text-[12px] font-semibold transition-all"
                style={
                  a.primary
                    ? {
                        background: "rgba(30,95,255,0.12)",
                        color: "var(--electric)",
                        border: "1px solid rgba(30,95,255,0.25)",
                      }
                    : {
                        background: "transparent",
                        color: "var(--slate)",
                      }
                }
              >
                {a.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function EmptyState() {
  return (
    <div
      className="flex flex-col items-center rounded-[16px] py-16 text-center"
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      <Bell size={48} style={{ color: "var(--steel-light)" }} />
      <p
        className="mt-4 text-[16px] font-semibold"
        style={{ color: "var(--platinum)" }}
      >
        Sin notificaciones por ahora
      </p>
      <p className="mt-1 text-[14px]" style={{ color: "var(--slate)" }}>
        Cuando tu sistema detecte algo importante, aparecerá aquí.
      </p>
    </div>
  );
}
