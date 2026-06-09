import { useEffect, useRef, useState } from "react";
import { ChevronDown, Globe, Check } from "lucide-react";
import { countries } from "@/data/countries";
import { useActiveCountry, setActiveCountry } from "@/lib/country-store";

export function CountrySwitcher({ compact = false }: { compact?: boolean }) {
  const active = useActiveCountry();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = countries.find((c) => c.code === active) ?? countries[0];

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 rounded-md border border-white/15 px-2.5 py-2 text-sm font-semibold text-cream/90 transition-colors hover:border-gold/50 hover:bg-white/5 ${compact ? "w-full justify-center" : ""}`}
        aria-label="اختر الدولة"
      >
        <Globe className="h-4 w-4 text-gold" />
        <span className="text-base leading-none">{current.flag}</span>
        <span className="hidden sm:inline">{current.name}</span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className={`absolute z-50 mt-2 min-w-[10rem] overflow-hidden rounded-xl border border-white/10 bg-navy-deep/95 p-1 shadow-xl backdrop-blur ${compact ? "left-0 right-0" : "end-0"}`}>
          {countries.map((c) => (
            <button
              key={c.code}
              onClick={() => {
                setActiveCountry(c.code);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-white/5 ${c.code === active ? "text-gold" : "text-cream/85"}`}
            >
              <span className="flex items-center gap-2">
                <span className="text-base leading-none">{c.flag}</span>
                {c.name}
              </span>
              {c.code === active && <Check className="h-4 w-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
