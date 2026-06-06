import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { S as SectionHeading } from "./SectionHeading-DjF0OAAd.mjs";
import { L as LawyerCard, F as FirmCard } from "./FirmCard-BYshnZwi.mjs";
import { s as specialties, c as cities, a as lawyers, f as firmSpecialties, e as firmCities, g as firms } from "./router-xJ7VNU2Z.mjs";
import { m as Users, J as Building2, E as Search } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "./StarRating-D_DIxzYB.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
function FirmsExplorer() {
  const [query, setQuery] = reactExports.useState("");
  const [specialty, setSpecialty] = reactExports.useState(firmSpecialties[0]);
  const [city, setCity] = reactExports.useState(firmCities[0]);
  const filtered = reactExports.useMemo(() => {
    return firms.filter((f) => {
      const q = query.trim();
      const matchesQuery = !q || f.name.includes(q) || f.specialty.includes(q) || f.tagline.includes(q);
      const matchesSpec = specialty === firmSpecialties[0] || f.specialty === specialty;
      const matchesCity = city === firmCities[0] || f.city === city;
      return matchesQuery && matchesSpec && matchesCity;
    });
  }, [query, specialty, city]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 grid gap-3 rounded-xl border border-white/10 bg-navy-card/50 p-4 md:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative md:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream/50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            value: query,
            onChange: (e) => setQuery(e.target.value),
            placeholder: "ابحث باسم المكتب أو التخصص...",
            className: "w-full rounded-lg border border-white/15 bg-navy-deep px-10 py-2.5 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: specialty, onChange: (e) => setSpecialty(e.target.value), className: "rounded-lg border border-white/15 bg-navy-deep px-3 py-2.5 text-sm text-cream focus:border-gold focus:outline-none", children: firmSpecialties.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s }, s)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: city, onChange: (e) => setCity(e.target.value), className: "rounded-lg border border-white/15 bg-navy-deep px-3 py-2.5 text-sm text-cream focus:border-gold focus:outline-none", children: firmCities.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: c }, c)) })
    ] }),
    filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-16 text-center text-cream/60", children: "لا توجد مكاتب مطابقة لبحثك." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: filtered.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(FirmCard, { firm: f }, f.id)) })
  ] });
}
function LawyersPage() {
  const [activeTab, setActiveTab] = reactExports.useState("lawyers");
  const [lawyerQuery, setLawyerQuery] = reactExports.useState("");
  const [specialty, setSpecialty] = reactExports.useState(specialties[0]);
  const [city, setCity] = reactExports.useState(cities[0]);
  const [sort, setSort] = reactExports.useState("rating");
  const filteredLawyers = reactExports.useMemo(() => {
    let list = lawyers.filter((l) => {
      const q = lawyerQuery.trim();
      const matchesQuery = !q || l.name.includes(q) || l.title.includes(q) || l.specialty.includes(q);
      const matchesSpec = specialty === specialties[0] || l.specialty === specialty;
      const matchesCity = city === cities[0] || l.city === city;
      return matchesQuery && matchesSpec && matchesCity;
    });
    list = [...list].sort((a, b) => sort === "price" ? a.price - b.price : sort === "experience" ? b.experience - a.experience : b.rating - a.rating);
    return list;
  }, [lawyerQuery, specialty, city, sort]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-navy", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-gradient-navy", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4 py-14 text-center md:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { light: true, title: "المحامون والمكاتب", subtitle: "حل مشاكلك القانونية بخطوات بسيطة مع أفضل المحامين والمكاتب. اطلب استشارتك الآن واترك الباقي علينا." }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-12 md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-10 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex rounded-xl border border-white/10 bg-navy-card/60 p-1 backdrop-blur-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActiveTab("lawyers"), className: `flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-medium transition-all duration-300 ${activeTab === "lawyers" ? "bg-gold text-navy-deep shadow-lg shadow-gold/20" : "text-cream/70 hover:bg-white/5 hover:text-cream"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4" }),
          "المحامون"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActiveTab("firms"), className: `flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-medium transition-all duration-300 ${activeTab === "firms" ? "bg-gold text-navy-deep shadow-lg shadow-gold/20" : "text-cream/70 hover:bg-white/5 hover:text-cream"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-4 w-4" }),
          "مكاتب المحاماة"
        ] })
      ] }) }),
      activeTab === "lawyers" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { light: true, title: "المحامون", subtitle: "ابحث عن المحامي المناسب حسب التخصص والتقييم والمدينة." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 grid gap-3 rounded-xl border border-white/10 bg-navy-card/50 p-4 md:grid-cols-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative md:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream/50" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: lawyerQuery, onChange: (e) => setLawyerQuery(e.target.value), placeholder: "ابحث باسم المحامي أو التخصص...", className: "w-full rounded-lg border border-white/15 bg-navy-deep px-10 py-2.5 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: specialty, onChange: (e) => setSpecialty(e.target.value), className: "rounded-lg border border-white/15 bg-navy-deep px-3 py-2.5 text-sm text-cream focus:border-gold focus:outline-none", children: specialties.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s }, s)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 md:col-span-1 md:contents", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: city, onChange: (e) => setCity(e.target.value), className: "rounded-lg border border-white/15 bg-navy-deep px-3 py-2.5 text-sm text-cream focus:border-gold focus:outline-none", children: cities.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: c }, c)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: sort, onChange: (e) => setSort(e.target.value), className: "rounded-lg border border-white/15 bg-navy-deep px-3 py-2.5 text-sm text-cream focus:border-gold focus:outline-none", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "rating", children: "الأعلى تقييماً" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "price", children: "الأقل سعراً" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "experience", children: "الأكثر خبرة" })
            ] })
          ] })
        ] }),
        filteredLawyers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-16 text-center text-cream/60", children: "لا توجد نتائج مطابقة لبحثك." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: filteredLawyers.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(LawyerCard, { lawyer: l }, l.id)) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { light: true, title: "مكاتب المحاماة", subtitle: "تصفّح أشهر مكاتب المحاماة وابحث عن المكتب المناسب حسب التخصص والمدينة." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FirmsExplorer, {})
      ] })
    ] })
  ] });
}
export {
  LawyersPage as component
};
