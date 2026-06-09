import { Link } from "@tanstack/react-router";
import { ArrowLeft, MapPin, Users, BadgeCheck } from "lucide-react";
import type { Firm } from "@/data/firms";
import { getCountry } from "@/data/countries";
import { StarRating } from "./StarRating";

export function FirmCard({ firm }: { firm: Firm }) {
  const home = getCountry(firm.country);
  return (
    <Link
      to="/firms/$firmId"
      params={{ firmId: firm.id }}
      className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-navy-card/60 transition-all hover:-translate-y-1 hover:border-gold/40 hover:shadow-gold"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={firm.image}
          alt={firm.name}
          loading="lazy"
          width={1024}
          height={768}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute right-3 top-3 rounded-full bg-navy-deep/80 px-3 py-1 text-[11px] font-semibold text-gold backdrop-blur">
          {firm.specialty}
        </span>
        <span
          className="absolute left-3 top-3 flex items-center gap-1 rounded-full border border-gold/40 bg-navy-deep/80 px-2.5 py-1 text-[11px] font-semibold text-cream backdrop-blur"
          title={`المقر: ${home.name}`}
        >
          <span className="text-sm leading-none">{home.flag}</span>
          {home.name}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-3 text-center sm:p-5">
        <h3 className="flex items-center justify-center gap-1.5 text-base font-bold text-cream">
          {firm.name}
          {firm.verified && (
            <BadgeCheck className="h-4 w-4 shrink-0 fill-gold/20 text-gold" aria-label="مكتب موثّق" />
          )}
        </h3>
        {firm.countries.length > 1 && (
          <div className="mt-2 flex items-center justify-center gap-1">
            <span className="text-[10px] text-cream/50">يخدم في</span>
            {firm.countries.map((c) => (
              <span key={c} className="text-sm leading-none" title={getCountry(c).name}>
                {getCountry(c).flag}
              </span>
            ))}
          </div>
        )}
        <p className="mt-1 text-xs text-gold">{firm.tagline}</p>
        <div className="mt-3 flex items-center justify-center gap-2">
          <StarRating value={firm.rating} size={14} />
          <span className="text-xs text-cream/60">({firm.reviews})</span>
        </div>
        <div className="mt-4 flex items-center justify-center gap-4 text-xs text-cream/65">
          <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-gold" />{firm.city}</span>
          <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5 text-gold" />{firm.teamSize} محامٍ</span>
        </div>
        <span className="mt-4 inline-flex items-center justify-center gap-1 text-sm font-semibold text-gold">
          عرض المكتب
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        </span>
      </div>
    </Link>
  );
}