import { useSyncExternalStore } from "react";

export type AuthRole = "client" | "lawyer";

export interface AuthUser {
  role: AuthRole;
  email: string;
}

const STORAGE_KEY = "muhamik_auth";
const listeners = new Set<() => void>();

function read(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

function emit() {
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