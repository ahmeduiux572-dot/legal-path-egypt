import { useMemo, useState } from "react";
import { Search, Scale, MapPin } from "lucide-react";
import { FirmCard } from "@/components/FirmCard";
import { FilterSelect } from "@/components/FilterSelect";
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
      <div className="mb-10 rounded-2xl border border-white/10 bg-navy-card/50 p-4 md:p-5">
        <div className="relative mb-3">
          <Search className="absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-cream/50" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث باسم المكتب أو التخصص..."
            className="h-11 w-full rounded-lg border border-white/15 bg-navy-deep px-11 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/40"
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <FilterSelect value={specialty} options={[...firmSpecialties]} onChange={setSpecialty} icon={Scale} ariaLabel="فلترة تخصص المكتب" />
          <FilterSelect value={city} options={[...firmCities]} onChange={setCity} icon={MapPin} ariaLabel="فلترة مدينة المكتب" />
        </div>
        <p className="mt-3 text-xs text-cream/50">{filtered.length} نتيجة</p>
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
