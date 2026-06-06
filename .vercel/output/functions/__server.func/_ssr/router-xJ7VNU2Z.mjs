import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent, d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { Q as notFound } from "../_libs/tanstack__router-core.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as LayoutDashboard, a as LogOut, X, M as Menu, A as Apple, P as Play, T as Twitter, F as Facebook, b as Linkedin, I as Instagram } from "../_libs/lucide-react.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
const appCss = "/assets/styles-KE6jhzo1.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
function Logo({ variant = "light" }) {
  const textClass = variant === "light" ? "text-cream" : "text-navy";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex flex-col leading-none", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xl font-extrabold ${textClass}`, children: "محام" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium tracking-wide text-gold", children: "MOHAM · LEGAL" })
  ] }) });
}
const STORAGE_KEY = "muhamik_auth";
const listeners = /* @__PURE__ */ new Set();
let cache = null;
let cacheRaw = null;
function read() {
  if (typeof window === "undefined") return null;
  let raw = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return cache;
  }
  if (raw !== cacheRaw) {
    cacheRaw = raw;
    try {
      cache = raw ? JSON.parse(raw) : null;
    } catch {
      cache = null;
    }
  }
  return cache;
}
function emit() {
  cacheRaw = null;
  listeners.forEach((l) => l());
}
function login(user) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }
  emit();
}
function logout() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(STORAGE_KEY);
  }
  emit();
}
function subscribe(cb) {
  listeners.add(cb);
  if (typeof window !== "undefined") {
    window.addEventListener("storage", cb);
  }
  return () => {
    listeners.delete(cb);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", cb);
    }
  };
}
function useAuth() {
  return reactExports.useSyncExternalStore(subscribe, read, () => null);
}
const links = [
  { to: "/", label: "الرئيسية" },
  { to: "/lawyers", label: "المحامون" },
  { to: "/cases", label: "سوق القضايا" },
  { to: "/templates", label: "النماذج القانونية" },
  { to: "/ai", label: "المساعد الذكي" }
];
function Navbar() {
  const [open, setOpen] = reactExports.useState(false);
  const user = useAuth();
  const navigate = useNavigate();
  const isLawyer = user?.role === "lawyer";
  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate({ to: "/" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-50 border-b border-white/10 bg-navy-deep/95 backdrop-blur", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden items-center gap-7 lg:flex", children: links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: l.to,
          className: "text-sm font-medium text-cream/80 transition-colors hover:text-gold",
          activeProps: { className: "text-gold" },
          activeOptions: { exact: l.to === "/" },
          children: l.label
        },
        l.to
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden items-center gap-2 lg:flex", children: user ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        isLawyer && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/dashboard",
            className: "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-cream/80 transition-colors hover:text-gold",
            activeProps: { className: "text-gold" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "h-4 w-4" }),
              " لوحة التحكم"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: handleLogout,
            className: "flex items-center gap-2 rounded-md border border-gold/50 px-4 py-2 text-sm font-semibold text-cream transition-colors hover:bg-white/5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
              " تسجيل الخروج"
            ]
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/login",
            className: "rounded-md px-3 py-2 text-sm font-semibold text-cream/80 transition-colors hover:text-gold",
            children: "تسجيل الدخول"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/register",
            className: "rounded-md border border-gold/50 px-4 py-2 text-sm font-semibold text-cream transition-colors hover:bg-white/5",
            children: "انضم كمحامٍ"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/lawyers",
            className: "rounded-md bg-gradient-gold px-4 py-2 text-sm font-bold text-navy shadow-gold transition-transform hover:-translate-y-0.5",
            children: "احجز استشارة"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setOpen((v) => !v),
          className: "text-cream lg:hidden",
          "aria-label": "القائمة",
          children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, {})
        }
      )
    ] }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-white/10 bg-navy-deep px-4 py-4 lg:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex flex-col gap-1", children: [
      links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: l.to,
          onClick: () => setOpen(false),
          className: "rounded-md px-3 py-2.5 text-sm font-medium text-cream/85 hover:bg-white/5",
          activeProps: { className: "text-gold" },
          activeOptions: { exact: l.to === "/" },
          children: l.label
        },
        l.to
      )),
      user ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-col gap-2", children: [
        isLawyer && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/dashboard",
            onClick: () => setOpen(false),
            className: "flex items-center justify-center gap-2 rounded-md border border-white/15 px-4 py-2 text-center text-sm font-semibold text-cream",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "h-4 w-4" }),
              " لوحة التحكم"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: handleLogout,
            className: "flex items-center justify-center gap-2 rounded-md border border-gold/50 px-4 py-2 text-center text-sm font-semibold text-cream",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
              " تسجيل الخروج"
            ]
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/login",
            onClick: () => setOpen(false),
            className: "flex-1 rounded-md border border-white/15 px-4 py-2 text-center text-sm font-semibold text-cream",
            children: "تسجيل الدخول"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/register",
            onClick: () => setOpen(false),
            className: "flex-1 rounded-md border border-gold/50 px-4 py-2 text-center text-sm font-semibold text-cream",
            children: "انضم كمحامٍ"
          }
        )
      ] })
    ] }) })
  ] });
}
const columns = [
  {
    title: "المنصة",
    links: [
      { label: "عن محام", to: "/" },
      { label: "المحامون", to: "/lawyers" },
      { label: "سوق القضايا", to: "/cases" },
      { label: "النماذج القانونية", to: "/templates" }
    ]
  },
  {
    title: "الخدمات",
    links: [
      { label: "المساعد الذكي", to: "/ai" },
      { label: "حجز استشارة", to: "/lawyers" },
      { label: "انضم كمحامٍ", to: "/register" },
      { label: "الباقات", to: "/register" }
    ]
  }
];
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "bg-navy-deep text-cream", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-14 md:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-10 md:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-xs text-sm leading-relaxed text-cream/65", children: "منصة متخصصة في الاستشارات القانونية تقدم خدمات شخصية وتجارية بأمان واحترافية لتلبية احتياجاتك في مصر والشرق الأوسط." })
      ] }),
      columns.map((col) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mb-4 text-sm font-bold text-gold", children: col.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5", children: col.links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: l.to, className: "text-sm text-cream/70 transition-colors hover:text-gold", children: l.label }) }, l.label)) })
      ] }, col.title)),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mb-4 text-sm font-bold text-gold", children: "حمّل تطبيقنا" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#", className: "flex items-center gap-3 rounded-lg border border-white/15 px-4 py-2.5 transition-colors hover:border-gold/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Apple, { className: "h-6 w-6 text-gold" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex flex-col leading-tight", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-cream/60", children: "حمّله من" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold", children: "App Store" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#", className: "flex items-center gap-3 rounded-lg border border-white/15 px-4 py-2.5 transition-colors hover:border-gold/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-6 w-6 text-gold" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex flex-col leading-tight", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-cream/60", children: "احصل عليه من" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold", children: "Google Play" })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 border-t border-white/10 pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4 text-center text-sm text-cream/60", children: "تابعنا عبر مواقع التواصل الاجتماعي" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center gap-3", children: [Twitter, Facebook, Linkedin, Instagram].map((Icon, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "#",
          className: "flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-cream transition-colors hover:bg-gradient-gold hover:text-navy",
          "aria-label": "social",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" })
        },
        i
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 text-center text-xs text-cream/45", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " محام. جميع الحقوق محفوظة."
      ] })
    ] })
  ] }) });
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$b = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "محام | منصة قانونية رقمية" },
      {
        name: "description",
        content: "محام منصة قانونية رقمية تربط العملاء بأفضل المحامين في مصر والشرق الأوسط: استشارات، حجز، سوق قضايا ونماذج قانونية."
      },
      { name: "author", content: "محام" },
      { property: "og:title", content: "محام | منصة قانونية رقمية" },
      {
        property: "og:description",
        content: "تواصل مع أفضل المحامين واحجز استشارتك القانونية بسهولة وأمان."
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "محام | منصة قانونية رقمية" },
      { name: "description", content: "Lovable Generated Project" },
      { property: "og:description", content: "Lovable Generated Project" },
      { name: "twitter:description", content: "Lovable Generated Project" },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2dbd3b59-ba93-40a5-80bb-47f522629f58/id-preview-84f067bf--01454a72-c1b8-433d-b96b-ea7652cb2695.lovable.app-1780462855868.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2dbd3b59-ba93-40a5-80bb-47f522629f58/id-preview-84f067bf--01454a72-c1b8-433d-b96b-ea7652cb2695.lovable.app-1780462855868.png" }
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&family=Cairo:wght@400;600;700;800&display=swap"
      },
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "ar", dir: "rtl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$b.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen flex-col bg-navy", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] }) });
}
const $$splitComponentImporter$9 = () => import("./templates-CDIhHIvk.mjs");
const Route$a = createFileRoute("/templates")({
  head: () => ({
    meta: [{
      title: "النماذج القانونية | محام"
    }, {
      name: "description",
      content: "نماذج وعقود قانونية جاهزة للبيع: عقود إيجار وعمل واتفاقيات وتوكيلات وصحف دعاوى."
    }, {
      property: "og:title",
      content: "النماذج القانونية | محام"
    }, {
      property: "og:description",
      content: "نماذج وعقود قانونية جاهزة للتحميل والتعديل."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const lawyer1 = "/assets/lawyer-1-DIQDI1lc.jpg";
const lawyer2 = "/assets/lawyer-2-B_ne_iQy.jpg";
const lawyer3 = "/assets/lawyer-3-CL_RGwQC.jpg";
const lawyer4 = "/assets/lawyer-4-DKuNemhU.jpg";
const sampleReviews = [
  { id: "r1", author: "أحمد سمير", rating: 5, date: "منذ أسبوع", text: "تعامل راقٍ واحترافية عالية، تابع قضيتي خطوة بخطوة وحصلت على نتيجة ممتازة. أنصح به بشدة." },
  { id: "r2", author: "منى عبد الله", rating: 5, date: "منذ شهر", text: "استشارة واضحة ودقيقة وفّرت عليّ وقتاً ومجهوداً كبيراً. شرح لي كل التفاصيل القانونية ببساطة." },
  { id: "r3", author: "كريم حسن", rating: 4, date: "منذ شهرين", text: "محامٍ متمكن ورده سريع على الاستفسارات، تجربة موفّقة بشكل عام." }
];
const specialties = [
  "كل التخصصات",
  "قانون الأسرة",
  "القانون التجاري",
  "قانون العقارات",
  "قانون العمل",
  "القانون الجنائي",
  "الملكية الفكرية",
  "قانون الشركات"
];
const cities = ["كل المدن", "القاهرة", "الإسكندرية", "دبي", "الرياض", "جدة", "عمّان"];
const baseBio = "محامٍ ومستشار قانوني يتمتع بخبرة واسعة في تقديم الاستشارات والترافع أمام المحاكم. يحرص على حماية حقوق موكليه ومتابعة قضاياهم بدقة واحترافية، مع تقديم حلول قانونية واضحة وسريعة تناسب احتياجات كل عميل.";
const lawyers = [
  {
    id: "murtada-mansour",
    name: "المستشار / مرتضى منصور",
    title: "محامي الأسرة",
    specialty: "قانون الأسرة",
    image: lawyer1,
    rating: 5,
    reviews: 128,
    consultations: 940,
    price: 2e3,
    city: "القاهرة",
    experience: 18,
    phone: "+20 122 158 2585",
    email: "mansour@muhamik.com",
    bio: baseBio
  },
  {
    id: "mohamed-elnabawy",
    name: "محمد النبوي",
    title: "مستشار قانوني للأعمال",
    specialty: "القانون التجاري",
    image: lawyer2,
    rating: 4.9,
    reviews: 96,
    consultations: 812,
    price: 1500,
    city: "دبي",
    experience: 12,
    phone: "+971 50 245 1180",
    email: "elnabawy@muhamik.com",
    bio: baseBio
  },
  {
    id: "fahd-elwaled",
    name: "فهد الوالد",
    title: "محامي حقوق إنسان",
    specialty: "القانون الجنائي",
    image: lawyer4,
    rating: 4.8,
    reviews: 87,
    consultations: 760,
    price: 1800,
    city: "الرياض",
    experience: 22,
    phone: "+966 55 410 2233",
    email: "fahd@muhamik.com",
    bio: baseBio
  },
  {
    id: "salma-fawzy",
    name: "سلمى فوزي",
    title: "مستشارة قانونية في حقوق المرأة",
    specialty: "قانون الأسرة",
    image: lawyer3,
    rating: 5,
    reviews: 142,
    consultations: 1020,
    price: 1700,
    city: "الإسكندرية",
    experience: 10,
    phone: "+20 100 778 9012",
    email: "salma@muhamik.com",
    bio: baseBio
  },
  {
    id: "fares-awad",
    name: "فارس عوض",
    title: "مستشار قانوني تجاري",
    specialty: "قانون الشركات",
    image: lawyer2,
    rating: 4.7,
    reviews: 64,
    consultations: 540,
    price: 1300,
    city: "جدة",
    experience: 9,
    phone: "+966 56 882 4471",
    email: "fares@muhamik.com",
    bio: baseBio
  },
  {
    id: "khaled-elsayed",
    name: "خالد السيد",
    title: "مستشار قانون عقاري",
    specialty: "قانون العقارات",
    image: lawyer1,
    rating: 4.9,
    reviews: 110,
    consultations: 690,
    price: 1600,
    city: "القاهرة",
    experience: 15,
    phone: "+20 111 334 5566",
    email: "khaled@muhamik.com",
    bio: baseBio
  },
  {
    id: "hossam-tarek",
    name: "حسام طارق",
    title: "مستشار الملكية الفكرية",
    specialty: "الملكية الفكرية",
    image: lawyer4,
    rating: 4.6,
    reviews: 52,
    consultations: 430,
    price: 1400,
    city: "عمّان",
    experience: 11,
    phone: "+962 79 220 1144",
    email: "hossam@muhamik.com",
    bio: baseBio
  },
  {
    id: "nourhan-adel",
    name: "نورهان عادل",
    title: "مستشارة قانون العمل",
    specialty: "قانون العمل",
    image: lawyer3,
    rating: 4.8,
    reviews: 73,
    consultations: 588,
    price: 1200,
    city: "دبي",
    experience: 8,
    phone: "+971 52 661 0099",
    email: "nourhan@muhamik.com",
    bio: baseBio
  },
  {
    id: "mahmoud-ibrahim",
    name: "محمود إبراهيم",
    title: "مستشار قانوني للأعمال",
    specialty: "القانون التجاري",
    image: lawyer1,
    rating: 4.7,
    reviews: 81,
    consultations: 612,
    price: 1550,
    city: "الرياض",
    experience: 14,
    phone: "+966 53 117 2200",
    email: "mahmoud@muhamik.com",
    bio: baseBio
  }
];
function getLawyer(id) {
  return lawyers.find((l) => l.id === id);
}
const topRated = [...lawyers].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews).slice(0, 6);
const mostConsulted = [...lawyers].sort((a, b) => b.consultations - a.consultations).slice(0, 6);
const BASE_URL = "";
const Route$9 = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const paths = ["/", "/lawyers", "/cases", "/templates", "/ai", "/register", ...lawyers.map((l) => `/lawyers/${l.id}`)];
        const urls = paths.map((p) => `  <url><loc>${BASE_URL}${p}</loc><changefreq>weekly</changefreq></url>`);
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`
        ].join("\n");
        return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } });
      }
    }
  }
});
const $$splitComponentImporter$8 = () => import("./register-Dze4FYyE.mjs");
const Route$8 = createFileRoute("/register")({
  head: () => ({
    meta: [{
      title: "انضم كمحامٍ | محام"
    }, {
      name: "description",
      content: "سجّل كمحامٍ على منصة محام، اختر باقتك وارفع بياناتك وصورتك وسيرتك الذاتية."
    }, {
      property: "og:title",
      content: "انضم كمحامٍ | محام"
    }, {
      property: "og:description",
      content: "اختر باقتك وابدأ استقبال العملاء على منصة محام."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./login-CIruuprz.mjs");
const Route$7 = createFileRoute("/login")({
  head: () => ({
    meta: [{
      title: "تسجيل الدخول | محام"
    }, {
      name: "description",
      content: "سجّل الدخول إلى منصة محام كمحامٍ أو كعميل للوصول إلى حسابك واستشاراتك."
    }, {
      property: "og:title",
      content: "تسجيل الدخول | محام"
    }, {
      property: "og:description",
      content: "ادخل إلى حسابك على منصة محام كمحامٍ أو عميل."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./dashboard-BIKTnstK.mjs");
const Route$6 = createFileRoute("/dashboard")({
  head: () => ({
    meta: [{
      title: "لوحة تحكم المحامي | محام"
    }, {
      name: "description",
      content: "إدارة الملف الشخصي والقضايا والعملاء والجلسات والاستشارات والفواتير والمحفظة والذكاء الاصطناعي القانوني."
    }, {
      property: "og:title",
      content: "لوحة تحكم المحامي | محام"
    }, {
      property: "og:description",
      content: "كل أدوات المحامي في مكان واحد."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./cases-CGE-jbXv.mjs");
const Route$5 = createFileRoute("/cases")({
  head: () => ({
    meta: [{
      title: "سوق القضايا | محام"
    }, {
      name: "description",
      content: "اطرح قضيتك واستقبل عروضاً من المحامين، أو تصفح القضايا المتاحة على سوق القضايا."
    }, {
      property: "og:title",
      content: "سوق القضايا | محام"
    }, {
      property: "og:description",
      content: "اطرح قضيتك واستقبل عروضاً من أفضل المحامين."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./ai-egvcPJkC.mjs");
const Route$4 = createFileRoute("/ai")({
  head: () => ({
    meta: [{
      title: "المساعد القانوني الذكي | محام"
    }, {
      name: "description",
      content: "اطرح سؤالك القانوني واحصل على إجابة فورية من المساعد القانوني الذكي."
    }, {
      property: "og:title",
      content: "المساعد القانوني الذكي | محام"
    }, {
      property: "og:description",
      content: "إجابات قانونية فورية على مدار الساعة."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./index-wvVJvok8.mjs");
const Route$3 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "محام | منصة قانونية رقمية في مصر والشرق الأوسط"
    }, {
      name: "description",
      content: "تواصل مع أفضل المحامين، احجز استشارة قانونية، تصفح سوق القضايا والنماذج القانونية على منصة محام."
    }, {
      property: "og:title",
      content: "محام | منصة قانونية رقمية"
    }, {
      property: "og:description",
      content: "العلاقة بين القانون والتكنولوجيا — استشارات قانونية موثوقة بسهولة وأمان."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./lawyers.index-D2Ult1jE.mjs");
const Route$2 = createFileRoute("/lawyers/")({
  head: () => ({
    meta: [{
      title: "المحامون | محام"
    }, {
      name: "description",
      content: "تصفح قائمة المحامين والمستشارين القانونيين، ابحث وفلتر حسب التخصص والمدينة."
    }, {
      property: "og:title",
      content: "المحامون | محام"
    }, {
      property: "og:description",
      content: "ابحث عن المحامي المناسب حسب التخصص والتقييم والمدينة."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./lawyers._lawyerId-B6d0laCE.mjs");
const $$splitErrorComponentImporter$1 = () => import("./lawyers._lawyerId-DxWTWPen.mjs");
const $$splitNotFoundComponentImporter$1 = () => import("./lawyers._lawyerId-DL_nHFHt.mjs");
const Route$1 = createFileRoute("/lawyers/$lawyerId")({
  head: ({
    params
  }) => {
    const l = getLawyer(params.lawyerId);
    return {
      meta: [{
        title: l ? `${l.name} | محام` : "محامٍ | محام"
      }, {
        name: "description",
        content: l ? `${l.title} — ${l.bio.slice(0, 120)}` : "ملف المحامي"
      }]
    };
  },
  loader: ({
    params
  }) => {
    const lawyer = getLawyer(params.lawyerId);
    if (!lawyer) throw notFound();
    return {
      lawyer
    };
  },
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$1, "notFoundComponent"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter$1, "errorComponent"),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const firm1 = "/assets/firm-1-NRWJokJ7.jpg";
const firm2 = "/assets/firm-2-C3upqOUo.jpg";
const firm3 = "/assets/firm-3-Dt-e_Di5.jpg";
const firm4 = "/assets/firm-4-DXhv9YvO.jpg";
const baseAbout = "مكتب محاماة رائد يضم نخبة من المحامين والمستشارين القانونيين المتخصصين في مختلف فروع القانون. نقدم خدمات قانونية متكاملة تشمل الاستشارات والترافع وصياغة العقود وحل النزاعات، مع التزام كامل بالسرية والاحترافية وحماية مصالح عملائنا.";
const firms = [
  {
    id: "almizan-legal",
    name: "مكتب الميزان للمحاماة",
    tagline: "العدالة بثقة واحترافية",
    specialty: "قانون الشركات",
    image: firm1,
    rating: 5,
    reviews: 214,
    cases: 1280,
    city: "القاهرة",
    established: 2004,
    teamSize: 24,
    consultationPrice: 600,
    about: baseAbout,
    lawyerIds: ["murtada-mansour", "khaled-elsayed", "mahmoud-ibrahim"]
  },
  {
    id: "aladl-partners",
    name: "مكتب العدل وشركاه",
    tagline: "شركاؤك في كل قضية",
    specialty: "القانون التجاري",
    image: firm2,
    rating: 4.9,
    reviews: 178,
    cases: 960,
    city: "دبي",
    established: 2010,
    teamSize: 18,
    consultationPrice: 750,
    about: baseAbout,
    lawyerIds: ["mohamed-elnabawy", "fares-awad", "nourhan-adel"]
  },
  {
    id: "alhaq-consultants",
    name: "مكتب الحق للاستشارات القانونية",
    tagline: "خبرة تصنع الفارق",
    specialty: "القانون الجنائي",
    image: firm3,
    rating: 4.8,
    reviews: 142,
    cases: 845,
    city: "الرياض",
    established: 2007,
    teamSize: 21,
    consultationPrice: 550,
    about: baseAbout,
    lawyerIds: ["fahd-elwaled", "mahmoud-ibrahim"]
  },
  {
    id: "almasader-law",
    name: "مكتب المصادر القانونية",
    tagline: "حلول قانونية حديثة",
    specialty: "قانون العقارات",
    image: firm4,
    rating: 4.9,
    reviews: 156,
    cases: 720,
    city: "الإسكندرية",
    established: 2013,
    teamSize: 15,
    consultationPrice: 500,
    about: baseAbout,
    lawyerIds: ["salma-fawzy", "khaled-elsayed", "hossam-tarek"]
  }
];
function getFirm(id) {
  return firms.find((f) => f.id === id);
}
const firmCities = ["كل المدن", "القاهرة", "الإسكندرية", "دبي", "الرياض"];
const firmSpecialties = [
  "كل التخصصات",
  "قانون الشركات",
  "القانون التجاري",
  "القانون الجنائي",
  "قانون العقارات"
];
const topFirms = [...firms].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
const $$splitComponentImporter = () => import("./firms._firmId-Cl_r5kVd.mjs");
const $$splitErrorComponentImporter = () => import("./firms._firmId-DxWTWPen.mjs");
const $$splitNotFoundComponentImporter = () => import("./firms._firmId-BlhmQIaW.mjs");
const Route = createFileRoute("/firms/$firmId")({
  head: ({
    params
  }) => {
    const f = getFirm(params.firmId);
    return {
      meta: [{
        title: f ? `${f.name} | محام` : "مكتب محاماة | محام"
      }, {
        name: "description",
        content: f ? `${f.tagline} — ${f.about.slice(0, 120)}` : "ملف مكتب المحاماة"
      }]
    };
  },
  loader: ({
    params
  }) => {
    const firm = getFirm(params.firmId);
    if (!firm) throw notFound();
    return {
      firm
    };
  },
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const TemplatesRoute = Route$a.update({
  id: "/templates",
  path: "/templates",
  getParentRoute: () => Route$b
});
const SitemapDotxmlRoute = Route$9.update({
  id: "/sitemap.xml",
  path: "/sitemap.xml",
  getParentRoute: () => Route$b
});
const RegisterRoute = Route$8.update({
  id: "/register",
  path: "/register",
  getParentRoute: () => Route$b
});
const LoginRoute = Route$7.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$b
});
const DashboardRoute = Route$6.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => Route$b
});
const CasesRoute = Route$5.update({
  id: "/cases",
  path: "/cases",
  getParentRoute: () => Route$b
});
const AiRoute = Route$4.update({
  id: "/ai",
  path: "/ai",
  getParentRoute: () => Route$b
});
const IndexRoute = Route$3.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$b
});
const LawyersIndexRoute = Route$2.update({
  id: "/lawyers/",
  path: "/lawyers/",
  getParentRoute: () => Route$b
});
const LawyersLawyerIdRoute = Route$1.update({
  id: "/lawyers/$lawyerId",
  path: "/lawyers/$lawyerId",
  getParentRoute: () => Route$b
});
const FirmsFirmIdRoute = Route.update({
  id: "/firms/$firmId",
  path: "/firms/$firmId",
  getParentRoute: () => Route$b
});
const rootRouteChildren = {
  IndexRoute,
  AiRoute,
  CasesRoute,
  DashboardRoute,
  LoginRoute,
  RegisterRoute,
  SitemapDotxmlRoute,
  TemplatesRoute,
  FirmsFirmIdRoute,
  LawyersLawyerIdRoute,
  LawyersIndexRoute
};
const routeTree = Route$b._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$1 as R,
  lawyers as a,
  logout as b,
  cities as c,
  topRated as d,
  firmCities as e,
  firmSpecialties as f,
  firms as g,
  Route as h,
  sampleReviews as i,
  login as l,
  mostConsulted as m,
  router as r,
  specialties as s,
  topFirms as t,
  useAuth as u
};
