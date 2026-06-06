import { useSyncExternalStore } from "react";

export type AuthRole = "client" | "lawyer";

export interface AuthUser {
  role: AuthRole;
  email: string;
}

const STORAGE_KEY = "muhamik_auth";
const listeners = new Set<() => void>();

let cache: AuthUser | null = null;
// `undefined` is an "unset" sentinel that can never equal a real stored value
// (which is always `string | null`), so emit() always forces a re-read.
let cacheRaw: string | null | undefined = undefined;

function read(): AuthUser | null {
  if (typeof window === "undefined") return null;
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return cache;
  }
  // Only re-parse (and create a new object) when the stored value changes,
  // so the snapshot reference stays stable for useSyncExternalStore.
  if (raw !== cacheRaw) {
    cacheRaw = raw;
    try {
      cache = raw ? (JSON.parse(raw) as AuthUser) : null;
    } catch {
      cache = null;
    }
  }
  return cache;
}

function emit() {
  // Invalidate the cache so the next read picks up the new value.
  cacheRaw = undefined;
  listeners.forEach((l) => l());
}

export function login(user: AuthUser) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }
  emit();
}

export function logout() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(STORAGE_KEY);
  }
  emit();
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  if (typeof window !== "undefined") {
    window.addEventListener("storage", cb);
  }
  return () => {
    listeners.delete(cb);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", cb);
    }
  };
}

export function useAuth(): AuthUser | null {
  return useSyncExternalStore(subscribe, read, () => null);
}