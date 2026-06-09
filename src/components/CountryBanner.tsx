import { MapPin, Scale, Coins } from "lucide-react";
import { getCountry } from "@/data/countries";
import { useActiveCountry } from "@/lib/country-store";
import { lawyers } from "@/data/lawyers";
import { firms } from "@/data/firms";

export function CountryBanner() {
  const active = useActiveCountry();
  const country = getCountry(active);
  const lawyerCount = lawyers.filter(
    (l) => l.country === active || l.countries.includes(active),
  ).length;
  const firmCount = firms.filter((f) => f.countries.includes(active)).length;

  return (
    <section className="relative overflow-hidden bg-navy-deep">
      {/* Full-flag background */}
      <div
        key={country.code}
        className="absolute inset-0 flex select-none items-center justify-center overflow-hidden"
        aria-hidden
      >
        <span className="animate-in fade-in zoom-in-95 text-[26rem] leading-none opacity-[0.12] blur-[2px] duration-700 sm:text-[34rem]">
          {country.flag}
        </span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-l from-navy-deep via-navy-deep/85 to-navy-deep/70" />
      <div className="absolute inset-0 pattern-grid opacity-20" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-12 text-center md:flex-row md:items-center md:justify-between md:px-8 md:text-right">
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-center">
          {/* Framed full flag */}
          <span
            key={country.code}
            className="flex h-20 w-28 shrink-0 animate-in fade-in zoom-in-75 items-center justify-center overflow-hidden rounded-xl border border-gold/40 bg-white/5 text-6xl shadow-gold duration-500 sm:h-24 sm:w-36 sm:text-7xl"
          >
            {country.flag}
          </span>
          <div className="md:text-right">
            <span className="inline-block rounded-full border border-gold/40 px-3 py-0.5 text-[11px] font-medium text-gold">
              تتصفّح الآن خدمات
            </span>
            <h2 className="mt-1.5 text-2xl font-extrabold text-cream md:text-3xl">
              المنصة في <span className="text-gradient-gold">{country.name}</span>
            </h2>
            <p className="mt-1 text-xs text-cream/60">يتم عرض المحامين والمكاتب المتاحة في {country.name}</p>
          </div>
        </div>

        <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4 md:w-auto md:gap-4">
          <Stat icon={Scale} value={`${lawyerCount}+`} label="محامٍ متاح" />
          <Stat icon={MapPin} value={`${firmCount}`} label="مكتب محاماة" />
          <Stat icon={Coins} value={country.currency.symbol} label="العملة المحلية" />
          <Stat icon={MapPin} value={`${country.cities.length}`} label="مدينة مغطّاة" />
        </div>
      </div>
    </section>
  );
}

function Stat({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof MapPin;
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl border border-white/10 bg-navy-card/60 px-3 py-3 text-center">
      <Icon className="h-5 w-5 text-gold" />
      <span className="text-lg font-extrabold text-cream">{value}</span>
      <span className="text-[11px] text-cream/60">{label}</span>
    </div>
  );
}