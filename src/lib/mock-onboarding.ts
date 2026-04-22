// Estado del checklist de bienvenida con persistencia en localStorage.
// Cuando se conecte Supabase, este módulo se reemplaza por queries a onboarding_progress.

export type StepKey =
  | "activated"
  | "whatsapp"
  | "inventory"
  | "messages"
  | "share"
  | "first_conversation"
  | "review";

export type OnboardingState = {
  activated: boolean;
  whatsapp: boolean;
  inventory: boolean;
  messages: boolean;
  share: boolean;
  first_conversation: boolean;
  review: boolean;
  // tiempo en que el sistema fue activado (ms epoch)
  activatedAt: number;
  // tiempo en que se completó todo (para ocultar del sidebar 3 días después)
  completedAt: number | null;
};

const STORAGE_KEY = "brerev_onboarding_v1";

export const STEP_KEYS: StepKey[] = [
  "activated",
  "whatsapp",
  "inventory",
  "messages",
  "share",
  "first_conversation",
  "review",
];

export function defaultOnboarding(): OnboardingState {
  return {
    activated: true,
    whatsapp: false,
    inventory: false,
    messages: false,
    share: false,
    first_conversation: false,
    review: false,
    activatedAt: Date.now(),
    completedAt: null,
  };
}

export function loadOnboarding(): OnboardingState {
  if (typeof window === "undefined") return defaultOnboarding();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const init = defaultOnboarding();
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(init));
      return init;
    }
    const parsed = JSON.parse(raw) as OnboardingState;
    return { ...defaultOnboarding(), ...parsed };
  } catch {
    return defaultOnboarding();
  }
}

export function saveOnboarding(state: OnboardingState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function completedCount(state: OnboardingState): number {
  return STEP_KEYS.filter((k) => state[k]).length;
}

export function isFullyCompleted(state: OnboardingState): boolean {
  return completedCount(state) === STEP_KEYS.length;
}

// Reglas para mostrar/ocultar "Bienvenida" en el sidebar:
//  - los primeros 7 días después de activado
//  - O hasta 3 días después de completar todo
export function shouldShowWelcomeInSidebar(state: OnboardingState): boolean {
  const now = Date.now();
  const days = (ms: number) => ms / (1000 * 60 * 60 * 24);
  if (state.completedAt) {
    return days(now - state.completedAt) < 3;
  }
  return days(now - state.activatedAt) < 7;
}
