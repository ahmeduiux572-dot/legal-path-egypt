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
        <select value={specialty} onChange={(e) => setSpecialty(e.target.value)} className="rounded-lg border border-white/15 bg-navy-deep px-3 py-2.5 text-sm text-cream focus:border-gold focus:outline-none">
          {firmSpecialties.map((s) => (<option key={s} value={s}>{s}</option>))}
        </select>
        <select value={city} onChange={(e) => setCity(e.target.value)} className="rounded-lg border border-white/15 bg-navy-deep px-3 py-2.5 text-sm text-cream focus:border-gold focus:outline-none">
          {firmCities.map((c) => (<option key={c} value={c}>{c}</option>))}
        </select>
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