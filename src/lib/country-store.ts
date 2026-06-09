import { useSyncExternalStore } from "react";
import { DEFAULT_COUNTRY, getCountries, type CountryCode } from "@/data/countries";

const KEY = "mohamy_active_country_v1";
const listeners = new Set<() => void>();

let active: CountryCode | null = null;

function load(): CountryCode {
  if (active) return active;
  if (typeof window === "undefined") return DEFAULT_COUNTRY;
  try {
    const raw = window.localStorage.getItem(KEY);
    const known = getCountries().some((c) => c.code === raw);
    active = raw && known ? raw : DEFAULT_COUNTRY;
  } catch {
    active = DEFAULT_COUNTRY;
  }
  return active;
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function setActiveCountry(code: CountryCode) {
  active = code;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(KEY, code);
    } catch {
      /* ignore */
    }
  }
  listeners.forEach((l) => l());
}

/** الدولة النشطة على الموقع العام */
export function useActiveCountry(): CountryCode {
  return useSyncExternalStore(subscribe, load, () => DEFAULT_COUNTRY);
}
