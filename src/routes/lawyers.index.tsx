import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { LawyerCard } from "@/components/LawyerCard";
import { lawyers, specialties, cities } from "@/data/lawyers";

export const Route = createFileRoute("/lawyers/")({
  head: () => ({
    meta: [
      { title: "المحامون | محاميك" },
      { name: "description", content: "تصفح قائمة المحامين والمستشارين القانونيين، ابحث وفلتر حسب التخصص والمدينة." },
      { property: "og:title", content: "المحامون | محاميك" },
      { property: "og:description", content: "ابحث عن المحامي المناسب حسب التخصص والتقييم والمدينة." },
    ],
  }),
  component: LawyersPage,
});

function LawyersPage() {
  const [query, setQuery] = useState("");
  const [specialty, setSpecialty] = useState<string>(specialties[0]);
  const [city, setCity] = useState<string>(cities[0]);
  const [sort, setSort] = useState("rating");

  const filtered = useMemo(() => {
    let list = lawyers.filter((l) => {
      const q = query.trim();
      const matchesQuery = !q || l.name.includes(q) || l.title.includes(q) || l.specialty.includes(q);
      const matchesSpec = specialty === specialties[0] || l.specialty === specialty;
      const matchesCity = city === cities[0] || l.city === city;
      return matchesQuery && matchesSpec && matchesCity;
    });
    list = [...list].sort((a, b) =>
      sort === "price" ? a.price - b.price : sort === "experience" ? b.experience - a.experience : b.rating - a.rating,
    );
    return list;
  }, [query, specialty, city, sort]);

  return (
    <div className="bg-navy">
      <section className="bg-gradient-navy">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center md:px-8">
          <SectionHeading light title="قائمة المحامين" subtitle="حل مشاكلك القانونية بخطوات بسيطة مع أفضل المحامين. اطلب استشارتك الآن واترك الباقي علينا." />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        {/* Filters */}
        <div className="mb-10 grid gap-3 rounded-xl border border-white/10 bg-navy-card/50 p-4 md:grid-cols-4">
          <div className="relative md:col-span-2">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream/50" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث باسم المحامي أو التخصص..."
              className="w-full rounded-lg border border-white/15 bg-navy-deep px-10 py-2.5 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
            />
          </div>
          <select value={specialty} onChange={(e) => setSpecialty(e.target.value)} className="rounded-lg border border-white/15 bg-navy-deep px-3 py-2.5 text-sm text-cream focus:border-gold focus:outline-none">
            {specialties.map((s) => (<option key={s} value={s}>{s}</option>))}
          </select>
          <div className="grid grid-cols-2 gap-3 md:col-span-1 md:contents">
            <select value={city} onChange={(e) => setCity(e.target.value)} className="rounded-lg border border-white/15 bg-navy-deep px-3 py-2.5 text-sm text-cream focus:border-gold focus:outline-none">
              {cities.map((c) => (<option key={c} value={c}>{c}</option>))}
            </select>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-lg border border-white/15 bg-navy-deep px-3 py-2.5 text-sm text-cream focus:border-gold focus:outline-none">
              <option value="rating">الأعلى تقييماً</option>
              <option value="price">الأقل سعراً</option>
              <option value="experience">الأكثر خبرة</option>
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="py-16 text-center text-cream/60">لا توجد نتائج مطابقة لبحثك.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((l) => (<LawyerCard key={l.id} lawyer={l} />))}
          </div>
        )}
      </div>
    </div>
  );
}