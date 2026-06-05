import { Building2, Star, Users, Gavel } from "lucide-react";
import type { LawFirm } from "@/data/firms";

export function LawFirmCard({ firm }: { firm: LawFirm }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-gold/20 bg-gradient-navy p-6 transition-all hover:-translate-y-1 hover:border-gold/50 hover:shadow-gold">
      <span className="pointer-events-none absolute -left-6 -top-6 h-24 w-24 rounded-full bg-gold/10 blur-2xl" />
      <div className="flex items-center gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-gold text-2xl font-extrabold text-navy shadow-gold">
          {firm.initials}
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-base font-bold text-cream">{firm.name}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-gold">
            <Building2 className="h-3.5 w-3.5" />
            {firm.city}
          </p>
        </div>
      </div>

      <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-cream/70">{firm.tagline}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {firm.specialties.map((s) => (
          <span key={s} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-cream/75">
            {s}
          </span>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/10 pt-4 text-center">
        <Stat icon={Users} value={`${firm.lawyers}`} label="محامٍ" />
        <Stat icon={Gavel} value={`+${firm.cases}`} label="قضية" />
        <Stat icon={Star} value={firm.rating.toFixed(1)} label="التقييم" />
      </div>
    </div>
  );
}

function Stat({ icon: Icon, value, label }: { icon: typeof Star; value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <Icon className="h-4 w-4 text-gold" />
      <span className="text-sm font-bold text-cream">{value}</span>
      <span className="text-[10px] text-cream/55">{label}</span>
    </div>
  );
}