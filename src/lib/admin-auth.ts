import { useSyncExternalStore } from "react";

// Simple password-based admin gate (display-only dashboard).
// Credentials are intentionally fixed; this is a lightweight gate, not full auth.
export const ADMIN_EMAIL = "admin@mohamy.eg";
export const ADMIN_PASSWORD = "mohamy2026";

const STORAGE_KEY = "mohamy_admin_session";
const listeners = new Set<() => void>();

let cache: boolean = false;
let cacheRaw: string | null | undefined = undefined;

function read(): boolean {
  if (typeof window === "undefined") return false;
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return cache;
  }
  if (raw !== cacheRaw) {
    cacheRaw = raw;
    cache = raw === "1";
  }
  return cache;
}

function emit() {
  cacheRaw = undefined;
  listeners.forEach((l) => l());
}

export function adminLogin(email: string, password: string): boolean {
  const ok =
    email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD;
  if (ok && typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, "1");
    emit();
  }
  return ok;
}

export function adminLogout() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(STORAGE_KEY);
  }
  emit();
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  if (typeof window !== "undefined") window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    if (typeof window !== "undefined") window.removeEventListener("storage", cb);
  };
}

export function useAdminAuth(): boolean {
  return useSyncExternalStore(subscribe, read, () => false);
}
