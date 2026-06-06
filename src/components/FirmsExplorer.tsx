import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { FirmCard } from "@/components/FirmCard";
import { firms, firmCities, firmSpecialties } from "@/data/firms";

export function FirmsExplorer() {
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState<string>(firmSpecialties[0]);
  const [city, setCity] = useState<string>(firmCities[0]);

  const filtered = useMemo(() => {
    return firms.filter((f) => {
      const q = query.trim();
      const matchesQuery = !q || f.name.includes(q) || f.specialty.includes(q) || f.tagline.includes(q);
      const matchesSpec = specialty === firmSpecialties[0] || f.specialty === specialty;
      const matchesCity = city === firmCities[0] || f.city === city;
      return matchesQuery && matchesSpec && matchesCity;
    });
  }, [query, specialty, city]);

  return (
    <div>
      <div className="mb-10 grid gap-3 rounded-xl border border-white/10 bg-navy-card/50 p-4 md:grid-cols-4">
        <div className="relative md:col-span-2">
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream/50" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث باسم المكتب أو التخصص..."
            className="w-full rounded-lg border border-white/15 bg-navy-deep px-10 py-2.5 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
          />
        </div>
        <OptionScroller value={specialty} options={[...firmSpecialties]} onChange={setSpecialty} ariaLabel="فلترة تخصص المكتب" />
        <OptionScroller value={city} options={[...firmCities]} onChange={setCity} ariaLabel="فلترة مدينة المكتب" />
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-cream/60">لا توجد مكاتب مطابقة لبحثك.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((f) => (<FirmCard key={f.id} firm={f} />))}
        </div>
      )}
    </div>
  );
}

function OptionScroller({
  value,
  options,
  onChange,
  ariaLabel,
}: {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  ariaLabel: string;
}) {
  return (
    <div className="flex min-h-11 items-center gap-2 overflow-x-auto rounded-lg border border-white/15 bg-navy-deep p-1" role="radiogroup" aria-label={ariaLabel}>
      {options.map((option) => {
        const selected = option === value;
        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option)}
            className={`shrink-0 rounded-md px-3 py-2 text-xs font-semibold transition-colors ${selected ? "bg-gold text-navy-deep" : "text-cream/70 hover:bg-white/5 hover:text-cream"}`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}