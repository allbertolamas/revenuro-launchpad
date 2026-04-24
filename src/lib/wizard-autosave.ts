// Save status helper para el wizard de onboarding.
// localStorage como fuente principal + stub para Supabase futuro.

import { useCallback, useEffect, useRef, useState } from "react";

const DRAFT_KEY = "brerev_wizard_draft";

export type WizardDraft<T> = {
  step: number;
  data: T;
  lastSavedAt: number;
};

export type SaveStatus = "idle" | "saving" | "saved";

export function loadDraft<T>(): WizardDraft<T> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as WizardDraft<T>;
  } catch {
    return null;
  }
}

export function clearDraft() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(DRAFT_KEY);
  // TODO(Supabase): borrar también onboarding_progress draft del usuario actual.
}

/**
 * Hook que auto-guarda con debounce 800ms y expone el estado visual.
 * - Guarda en localStorage como backup.
 * - Stub: cuando exista Supabase + usuario autenticado, hacer UPSERT
 *   en onboarding_progress con todos los campos.
 */
export function useAutoSave<T>(step: number, data: T, enabled = true) {
  const [status, setStatus] = useState<SaveStatus>("idle");
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const firstRun = useRef(true);

  useEffect(() => {
    if (!enabled) return;
    // Skip the very first render to avoid showing "Guardando" on hydrate
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    setStatus("saving");
    if (timerRef.current) clearTimeout(timerRef.current);
    if (savedRef.current) clearTimeout(savedRef.current);

    timerRef.current = setTimeout(() => {
      try {
        const payload: WizardDraft<T> = {
          step,
          data,
          lastSavedAt: Date.now(),
        };
        window.localStorage.setItem(DRAFT_KEY, JSON.stringify(payload));
        // TODO(Supabase): si hay usuario autenticado, también:
        //   await supabase.from('onboarding_progress')
        //     .upsert({ user_id: userId, step, data, last_saved_at: ... });
        setLastSavedAt(payload.lastSavedAt);
        setStatus("saved");
        savedRef.current = setTimeout(() => setStatus("idle"), 1500);
      } catch {
        setStatus("idle");
      }
    }, 800);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, JSON.stringify(data), enabled]);

  const reset = useCallback(() => {
    clearDraft();
    setLastSavedAt(null);
    setStatus("idle");
  }, []);

  return { status, lastSavedAt, reset };
}

export function formatSavedAt(ms: number): string {
  const d = new Date(ms);
  return d.toLocaleString("es-MX", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });
}
