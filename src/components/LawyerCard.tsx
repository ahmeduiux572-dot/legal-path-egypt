import { Link } from "@tanstack/react-router";
import { ArrowLeft, BadgeCheck } from "lucide-react";
import type { Lawyer } from "@/data/lawyers";
import { StarRating } from "./StarRating";

export function LawyerCard({ lawyer }: { lawyer: Lawyer }) {
  return (
    <Link
      to="/lawyers/$lawyerId"
      params={{ lawyerId: lawyer.id }}
      className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-navy-card/60 transition-all hover:-translate-y-1 hover:border-gold/40 hover:shadow-gold"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={lawyer.image}
          alt={lawyer.name}
          loading="lazy"
          width={1024}
          height={1024}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-3 text-center sm:p-5">
        <h3 className="flex items-center justify-center gap-1.5 text-base font-bold text-cream">
          {lawyer.name}
          {lawyer.verified && (
            <BadgeCheck className="h-4 w-4 shrink-0 fill-gold/20 text-gold" aria-label="محامٍ موثّق" />
          )}
        </h3>
        <p className="mt-1 text-xs text-gold">{lawyer.title}</p>
        <div className="mt-3 flex items-center justify-center gap-2">
          <StarRating value={lawyer.rating} size={14} />
          <span className="text-xs text-cream/60">({lawyer.reviews})</span>
        </div>
        <p className="mt-3 line-clamp-2 flex-1 text-xs leading-relaxed text-cream/65">{lawyer.bio}</p>
        <span className="mt-4 inline-flex items-center justify-center gap-1 text-sm font-semibold text-gold">
          اعرف المزيد
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        </span>
      </div>
    </Link>
  );
}