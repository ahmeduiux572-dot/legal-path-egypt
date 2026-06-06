import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { S as SectionHeading } from "./SectionHeading-DjF0OAAd.mjs";
import { F as FirmCard, L as LawyerCard } from "./FirmCard-BYshnZwi.mjs";
import { t as topFirms, d as topRated, m as mostConsulted } from "./router-xJ7VNU2Z.mjs";
import { f as Scale, a3 as GraduationCap, J as Building2, a4 as ShieldCheck, o as MessageSquare, r as Clock, a5 as ArrowLeft, y as ChevronLeft, x as ChevronRight } from "../_libs/lucide-react.mjs";
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
const gavelBanner = "/assets/gavel-banner-D8v0eAXv.jpg";
const justiceStatue = "/assets/justice-statue-m3fI_D8h.jpg";
const booksGavel = "/assets/books-gavel-0Qjl8R5p.jpg";
const library = "/assets/library-Ndk8jDPD.jpg";
const ads = [
  {
    id: "ad-discount",
    badge: "عرض خاص لفترة محدودة",
    title: "خصم 50% على أول استشارة قانونية",
    text: "ابدأ رحلتك القانونية مع نخبة المحامين والمستشارين واحصل على أول استشارة بنصف السعر.",
    cta: "احجز استشارتك الآن",
    to: "/lawyers",
    image: gavelBanner
  },
  {
    id: "ad-cases",
    badge: "سوق القضايا",
    title: "انشر قضيتك واستقبل عروضاً تنافسية",
    text: "اطرح تفاصيل قضيتك مجاناً واختر العرض الأنسب لك من بين عشرات المحامين المتخصصين.",
    cta: "انشر قضيتك",
    to: "/cases",
    image: justiceStatue
  },
  {
    id: "ad-templates",
    badge: "النماذج القانونية",
    title: "عقود ونماذج جاهزة بصياغة احترافية",
    text: "حمّل عقودك ونماذجك القانونية فوراً، أو اطلب نموذجاً مخصصاً يصممه لك محامٍ متخصص.",
    cta: "تصفح النماذج",
    to: "/templates",
    image: booksGavel
  },
  {
    id: "ad-ai",
    badge: "المساعد القانوني الذكي",
    title: "إجابات قانونية فورية على مدار الساعة",
    text: "احصل على توجيه قانوني أولي سريع في أي وقت قبل التواصل مع المحامي المناسب.",
    cta: "جرّب المساعد",
    to: "/ai",
    image: library
  }
];
function AdCarousel() {
  const [index, setIndex] = reactExports.useState(0);
  const count = ads.length;
  const go = reactExports.useCallback((dir) => {
    setIndex((i) => (i + dir + count) % count);
  }, [count]);
  reactExports.useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % count), 5e3);
    return () => clearInterval(t);
  }, [count]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-navy py-14", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-6xl px-4 md:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-2xl border border-gold/20 shadow-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex transition-transform duration-700 ease-out",
        style: { transform: `translateX(${index * 100}%)` },
        children: ads.map((ad) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: ad.image,
              alt: ad.title,
              loading: "lazy",
              className: "h-[320px] w-full object-cover md:h-[420px]"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-l from-navy-deep/95 via-navy-deep/70 to-navy-deep/20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl px-6 text-start md:px-12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block rounded-full border border-gold/40 bg-navy-deep/40 px-4 py-1 text-xs font-semibold text-gold", children: ad.badge }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 text-2xl font-extrabold leading-snug text-cream md:text-4xl", children: ad.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-md text-sm leading-relaxed text-cream/80 md:text-base", children: ad.text }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: ad.to,
                className: "mt-6 inline-flex items-center gap-2 rounded-md bg-gradient-gold px-6 py-3 text-sm font-bold text-navy shadow-gold transition-transform hover:-translate-y-0.5",
                children: [
                  ad.cta,
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" })
                ]
              }
            )
          ] }) })
        ] }, ad.id))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => go(1),
        "aria-label": "التالي",
        className: "absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-navy-deep/60 p-2 text-cream backdrop-blur transition-colors hover:bg-navy-deep",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-5 w-5" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => go(-1),
        "aria-label": "السابق",
        className: "absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-navy-deep/60 p-2 text-cream backdrop-blur transition-colors hover:bg-navy-deep",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-5 w-5" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2", children: ads.map((ad, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => setIndex(i),
        "aria-label": `الإعلان ${i + 1}`,
        className: `h-2 rounded-full transition-all ${i === index ? "w-6 bg-gold" : "w-2 bg-cream/40"}`
      },
      ad.id
    )) })
  ] }) }) });
}
const heroLegal = "/assets/hero-legal-Da0Ak6Av.jpg";
const services = [{
  icon: Scale,
  title: "استشارة قانونية سريعة",
  text: "احصل على استشارة قانونية سريعة وموثوقة من أفضل المحامين في أي وقت ومن أي مكان."
}, {
  icon: GraduationCap,
  title: "المحامون الخبراء",
  text: "نخبة من المحامين المتخصصين في مختلف المجالات يقدمون لك استشارات دقيقة وآمنة."
}, {
  icon: Building2,
  title: "قانون الشركات",
  text: "حماية حقوق شركتك وتنظيم إجراءاتها ومسؤولياتها لضمان عمل قانوني ومنظّم."
}];
const why = [{
  icon: ShieldCheck,
  title: "خصوصية وأمان",
  text: "حماية كاملة لبياناتك ومحادثاتك مع المحامين بسرية تامة."
}, {
  icon: MessageSquare,
  title: "تواصل مباشر",
  text: "شات ومكالمات صوتية ومرئية مع محام بكل سهولة."
}, {
  icon: Clock,
  title: "العمل في الوقت المناسب",
  text: "متابعة فورية للحالة ورد سريع على استفساراتك على مدار الساعة."
}];
const stats = [{
  value: "30",
  label: "عميلاً سعيداً"
}, {
  value: "+300",
  label: "قضية قانونية"
}, {
  value: "8",
  label: "سنوات من الخبرة"
}];
function Index() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroLegal, alt: "محامٍ يحمل ميزان العدالة داخل قاعة محكمة", className: "absolute inset-0 h-full w-full object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-l from-navy-deep/95 via-navy-deep/85 to-navy-deep/60" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pattern-grid opacity-30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-36", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block rounded-full border border-gold/40 px-4 py-1 text-xs font-medium text-gold", children: "منصة قانونية رقمية · مصر والشرق الأوسط" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-5 text-4xl font-extrabold leading-tight text-cream md:text-6xl", children: [
          "محام",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-gradient-gold", children: "العلاقة بين القانون والتكنولوجيا" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 max-w-lg text-base leading-relaxed text-cream/80", children: "مجتمع من المحامين نسعى لتعزيز الوصول إلى العدالة من خلال الابتكار والتكنولوجيا، لتحصل على استشارتك القانونية بسرعة واحترافية وشفافية." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/lawyers", className: "rounded-md bg-gradient-gold px-6 py-3 text-sm font-bold text-navy shadow-gold transition-transform hover:-translate-y-0.5", children: "تواصل مع محامٍ متخصص" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/ai", className: "rounded-md border border-gold/50 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-white/5", children: "جرّب المساعد الذكي" })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-cream", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl px-4 py-16 text-center md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-extrabold text-gradient-gold md:text-3xl", children: "مرحباً بكم في محام" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-sm leading-loose text-muted-foreground md:text-base", children: '"محام" منصة قانونية رقمية تهدف إلى تسهيل التواصل بين العملاء والمحامين بطريقة حديثة وموثوقة، من خلال تجربة استخدام سهلة تساعدك على الوصول إلى المحامي المناسب وفقاً للتخصص والتقييمات وآراء العملاء.' }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm leading-loose text-muted-foreground md:text-base", children: "تتيح المنصة التواصل مع المحامين عبر الشات والمكالمات الصوتية والمرئية، ومتابعة الاستشارات والقضايا في أي وقت، لتقديم تجربة قانونية أكثر سرعة واحترافية وشفافية." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-cream pb-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-3 md:px-8", children: services.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-7 text-center shadow-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-gold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-7 w-7 text-navy" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-5 text-lg font-bold text-navy", children: s.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm leading-relaxed text-muted-foreground", children: s.text })
    ] }, s.title)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden bg-navy-deep", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: library, alt: "", "aria-hidden": true, className: "absolute inset-0 h-full w-full object-cover opacity-10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-6xl px-4 py-16 md:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { light: true, title: "لماذا يعتبر التعاقد معنا خطوة رابحة؟", subtitle: "نلتزم بأعلى معايير الجودة والشفافية في كل خطوة قانونية." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid gap-8 md:grid-cols-3", children: why.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(w.icon, { className: "h-6 w-6 text-gold" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 text-lg font-bold text-cream", children: w.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm leading-relaxed text-cream/65", children: w.text })
        ] }, w.title)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdCarousel, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-navy-deep pb-16 pt-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { light: true, title: "أشهر مكاتب المحاماة", subtitle: "نخبة من أعرق مكاتب المحاماة في مصر والشرق الأوسط بخبرات ممتدة وفرق متخصصة." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4", children: topFirms.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(FirmCard, { firm: f }, f.id)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-navy py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { light: true, title: "المحامون الأكثر تقييماً", subtitle: "نخبة من المحامين الحاصلين على أعلى تقييمات من عملائنا." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: topRated.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(LawyerCard, { lawyer: l }, l.id)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-navy-deep py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { light: true, title: "المحامون الأكثر استشارة", subtitle: "الأكثر طلباً من العملاء على المنصة." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: mostConsulted.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(LawyerCard, { lawyer: l }, l.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/lawyers", className: "inline-flex items-center gap-2 rounded-md border border-gold/50 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-white/5", children: [
        "تصفح كل المحامين",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden bg-gradient-navy py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pattern-grid opacity-50" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-5xl px-4 md:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { light: true, title: "أرقام تهمك", subtitle: "إنجازاتنا في رحلتنا معك، نوضحها لك من خلال الأرقام." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid grid-cols-3 gap-6", children: stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-extrabold text-gold md:text-5xl", children: s.value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-xs text-cream/70 md:text-sm", children: s.label })
        ] }, s.label)) })
      ] })
    ] })
  ] });
}
export {
  Index as component
};
