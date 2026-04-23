// Estado global de la app (localStorage, consistente con Fase 3 Parte 1)

const KEYS = {
  TOUR_DONE: "brerev_tour_completed",
  APP_VERSION_SEEN: "brerev_version_seen",
  BANNER_DISMISSED: "brerev_banner_dismissed",
  FEEDBACK_PREFIX: "brerev_feedback_",
} as const;

// ── Versión actual de la app (mock changelog)
export type ChangelogEntry = {
  type: "feature" | "improvement" | "fix";
  title: string;
  detail?: string;
};

export const APP_VERSION = "1.4.0";
export const APP_VERSION_DATE = "23 abril 2026";
export const APP_CHANGELOG: ChangelogEntry[] = [
  {
    type: "feature",
    title: "Centro de bienvenida con checklist guiado",
    detail: "Sigue paso a paso la activación de tu sistema desde la barra lateral.",
  },
  {
    type: "feature",
    title: "Buscador rápido con ⌘K",
    detail: "Navega y encuentra leads sin levantar las manos del teclado.",
  },
  {
    type: "improvement",
    title: "Notificaciones agrupadas por día",
    detail: "Más fácil revisar lo que pasó cuando estabas fuera.",
  },
  {
    type: "improvement",
    title: "Reporte mensual descargable en PDF",
  },
  {
    type: "fix",
    title: "Corrección de zona horaria en citas de mañana temprano",
  },
];

// ── Tour
export function isTourCompleted(): boolean {
  if (typeof window === "undefined") return true;
  return window.localStorage.getItem(KEYS.TOUR_DONE) === "true";
}
export function markTourCompleted() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEYS.TOUR_DONE, "true");
  window.dispatchEvent(new Event("brerev:state-change"));
}
export function resetTour() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEYS.TOUR_DONE);
  window.dispatchEvent(new Event("brerev:state-change"));
}

// ── Banner de actualización
export function shouldShowUpdateBanner(): boolean {
  if (typeof window === "undefined") return false;
  const seen = window.localStorage.getItem(KEYS.APP_VERSION_SEEN);
  const dismissed = window.localStorage.getItem(KEYS.BANNER_DISMISSED);
  if (dismissed === APP_VERSION) return false;
  return seen !== APP_VERSION;
}
export function dismissUpdateBanner() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEYS.BANNER_DISMISSED, APP_VERSION);
  window.dispatchEvent(new Event("brerev:state-change"));
}
export function markVersionSeen() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEYS.APP_VERSION_SEEN, APP_VERSION);
  window.dispatchEvent(new Event("brerev:state-change"));
}

// ── Feedback (cooldown 7 días por página)
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
function feedbackKey(path: string) {
  return `${KEYS.FEEDBACK_PREFIX}${path}`;
}
export function shouldShowFeedback(path: string): boolean {
  if (typeof window === "undefined") return false;
  const raw = window.localStorage.getItem(feedbackKey(path));
  if (!raw) return true;
  const ts = parseInt(raw, 10);
  if (Number.isNaN(ts)) return true;
  return Date.now() - ts > SEVEN_DAYS_MS;
}
export function recordFeedback(path: string, rating: 1 | -1, comment?: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(feedbackKey(path), String(Date.now()));
  // En producción esto enviaría a Supabase; aquí solo log
  // eslint-disable-next-line no-console
  console.info("[brerev:feedback]", { path, rating, comment });
  window.dispatchEvent(new Event("brerev:state-change"));
}
