// Helper to route AI requests to a backend that actually has LOVABLE_API_KEY.
//
// LOVABLE_API_KEY is provisioned ONLY on Lovable's own hosting. When the app is
// served from another host (e.g. Vercel or a custom domain attached to Vercel),
// process.env.LOVABLE_API_KEY is undefined there, so the AI endpoints fail.
//
// To make the AI features work everywhere without any manual setup, we send the
// AI requests to the stable Lovable deployment (which has the key) whenever we
// are NOT already running on a *.lovable.app host or local dev.

// Stable Lovable URL for this project (immutable, won't change on rename).
const FALLBACK_AI_BASE = "https://project--01454a72-c1b8-433d-b96b-ea7652cb2695.lovable.app";

export function aiUrl(path: string): string {
  // During SSR keep it relative (same origin) — SSR on Lovable has the key.
  if (typeof window === "undefined") return path;

  const host = window.location.hostname;
  const isLovableHost =
    host.endsWith(".lovable.app") || host === "localhost" || host === "127.0.0.1";

  if (isLovableHost) return path;

  const base =
    (import.meta.env.VITE_AI_BASE_URL as string | undefined)?.replace(/\/$/, "") ||
    FALLBACK_AI_BASE;
  return `${base}${path}`;
}