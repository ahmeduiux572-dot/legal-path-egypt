import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, Users, Building2 } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { LawyerCard } from "@/components/LawyerCard";
import { FirmsExplorer } from "@/components/FirmsExplorer";
import { lawyers, specialties, cities } from "@/data/lawyers";

export const Route = createFileRoute("/lawyers/")({
  head: () => ({
    meta: [
      { title: "المحامون | محام" },
      { name: "description", content: "تصفح قائمة المحامين والمستشارين القانونيين، ابحث وفلتر حسب التخصص والمدينة." },
      { property: "og:title", content: "المحامون | محام" },
      { property: "og:description", content: "ابحث عن المحامي المناسب حسب التخصص والتقييم والمدينة." },
    ],
  }),
  component: LawyersPage,
});

function LawyersPage() {
  const [activeTab, setActiveTab] = useState<"lawyers" | "firms">("lawyers");

  // Lawyers filters
  const [lawyerQuery, setLawyerQuery] = useState("");
  const [specialty, setSpecialty] = useState<string>(specialties[0]);
  const [city, setCity] = useState<string>(cities[0]);
  const [sort, setSort] = useState("rating");

  const filteredLawyers = useMemo(() => {
    let list = lawyers.filter((l) => {
      const q = lawyerQuery.trim();
      const matchesQuery = !q || l.name.includes(q) || l.title.includes(q) || l.specialty.includes(q);
      const matchesSpec = specialty === specialties[0] || l.specialty === specialty;
      const matchesCity = city === cities[0] || l.city === city;
      return matchesQuery && matchesSpec && matchesCity;
    });
    list = [...list].sort((a, b) =>
      sort === "price" ? a.price - b.price : sort === "experience" ? b.experience - a.experience : b.rating - a.rating,
    );
    return list;
  }, [lawyerQuery, specialty, city, sort]);

  return (
    <div className="bg-navy">
      <section className="bg-gradient-navy">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center md:px-8">
          <SectionHeading light title="المحامون والمكاتب" subtitle="حل مشاكلك القانونية بخطوات بسيطة مع أفضل المحامين والمكاتب. اطلب استشارتك الآن واترك الباقي علينا." />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        {/* Tabs */}
        <div className="mb-10 flex justify-center">
          <div className="inline-flex rounded-xl border border-white/10 bg-navy-card/60 p-1 backdrop-blur-sm">
            <button
              onClick={() => setActiveTab("lawyers")}
              className={`flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                activeTab === "lawyers"
                  ? "bg-gold text-navy-deep shadow-lg shadow-gold/20"
                  : "text-cream/70 hover:bg-white/5 hover:text-cream"
              }`}
            >
              <Users className="h-4 w-4" />
              المحامون
            </button>
            <button
              onClick={() => setActiveTab("firms")}
              className={`flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                activeTab === "firms"
                  ? "bg-gold text-navy-deep shadow-lg shadow-gold/20"
                  : "text-cream/70 hover:bg-white/5 hover:text-cream"
              }`}
            >
              <Building2 className="h-4 w-4" />
              مكاتب المحاماة
            </button>
          </div>
        </div>

        {activeTab === "lawyers" ? (
          <>
            <SectionHeading light title="المحامون" subtitle="ابحث عن المحامي المناسب حسب التخصص والتقييم والمدينة." />
            <div className="h-8" />

            {/* Lawyers Filters */}
            <div className="mb-10 grid gap-3 rounded-xl border border-white/10 bg-navy-card/50 p-4 md:grid-cols-4">
              <div className="relative md:col-span-2">
                <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream/50" />
                <input
                  value={lawyerQuery}
                  onChange={(e) => setLawyerQuery(e.target.value)}
                  placeholder="ابحث باسم المحامي أو التخصص..."
                  className="w-full rounded-lg border border-white/15 bg-navy-deep px-10 py-2.5 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
                />
              </div>
              <OptionScroller value={specialty} options={[...specialties]} onChange={setSpecialty} ariaLabel="فلترة التخصص" />
              <div className="grid gap-3 md:contents">
                <OptionScroller value={city} options={[...cities]} onChange={setCity} ariaLabel="فلترة المدينة" />
                <OptionScroller
                  value={sort}
                  options={["rating", "price", "experience"]}
                  labels={{ rating: "الأعلى تقييماً", price: "الأقل سعراً", experience: "الأكثر خبرة" }}
                  onChange={setSort}
                  ariaLabel="ترتيب النتائج"
                />
              </div>
            </div>

            {filteredLawyers.length === 0 ? (
              <p className="py-16 text-center text-cream/60">لا توجد نتائج مطابقة لبحثك.</p>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredLawyers.map((l) => (<LawyerCard key={l.id} lawyer={l} />))}
              </div>
            )}
          </>
        ) : (
          <>
            <SectionHeading light title="مكاتب المحاماة" subtitle="تصفّح أشهر مكاتب المحاماة وابحث عن المكتب المناسب حسب التخصص والمدينة." />
            <div className="h-8" />
            <FirmsExplorer />
          </>
        )}
      </div>
    </div>
  );
}

function OptionScroller({
  value,
  options,
  labels,
  onChange,
  ariaLabel,
}: {
  value: string;
  options: string[];
  labels?: Record<string, string>;
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
            {labels?.[option] ?? option}
          </button>
        );
      })}
    </div>
  );
}
