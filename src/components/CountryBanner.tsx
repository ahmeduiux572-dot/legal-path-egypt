import { MapPin, Scale, Coins } from "lucide-react";
import { getCountry } from "@/data/countries";
import { useActiveCountry } from "@/lib/country-store";
import { lawyers } from "@/data/lawyers";

export function CountryBanner() {
  const active = useActiveCountry();
  const country = getCountry(active);
  const lawyerCount = lawyers.filter(
    (l) => l.country === active || l.countries.includes(active),
  ).length;

  return (
    <section className="relative overflow-hidden bg-navy-deep">
      <div className="absolute inset-0 pattern-grid opacity-30" />
      <div
        className="absolute -right-10 -top-10 select-none text-[14rem] leading-none opacity-10 blur-[1px] transition-all duration-700 sm:text-[18rem]"
        aria-hidden
      >
        {country.flag}
      </div>
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-10 text-center md:flex-row md:items-center md:justify-between md:px-8 md:text-right">
        <div className="flex items-center gap-4">
          <span
            key={country.code}
            className="flex h-16 w-16 shrink-0 animate-in fade-in zoom-in-50 items-center justify-center rounded-2xl border border-gold/30 bg-white/5 text-4xl shadow-gold duration-500 sm:h-20 sm:w-20 sm:text-5xl"
          >
            {country.flag}
          </span>
          <div className="text-right">
            <span className="inline-block rounded-full border border-gold/40 px-3 py-0.5 text-[11px] font-medium text-gold">
              تتصفّح الآن خدمات
            </span>
            <h2 className="mt-1.5 text-2xl font-extrabold text-cream md:text-3xl">
              المنصة في <span className="text-gradient-gold">{country.name}</span>
            </h2>
          </div>
        </div>

        <div className="grid w-full grid-cols-3 gap-3 md:w-auto md:gap-6">
          <Stat icon={Scale} value={`${lawyerCount}+`} label="محامٍ متاح" />
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