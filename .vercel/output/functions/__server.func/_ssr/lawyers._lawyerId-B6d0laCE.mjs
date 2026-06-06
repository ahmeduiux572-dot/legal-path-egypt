import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { S as StarRating } from "./StarRating-D_DIxzYB.mjs";
import { B as BookingDialog, R as ReviewsSection } from "./ReviewsSection-BRwwbPNW.mjs";
import { R as Route$1 } from "./router-xJ7VNU2Z.mjs";
import { j as MapPin, l as Briefcase } from "../_libs/lucide-react.mjs";
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
import "./dialog-U2-3YMO2.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "./PaymentSection-BjmVgGSP.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
function LawyerProfile() {
  const {
    lawyer
  } = Route$1.useLoaderData();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-cream", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-4 py-12 md:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "border-b-2 border-gold pb-3 text-2xl font-extrabold text-navy md:text-3xl", children: lawyer.name }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid gap-8 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-2xl shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: lawyer.image, alt: lawyer.name, width: 1024, height: 1024, className: "h-full w-full object-cover" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border pb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "حسب حالة المحامي" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-navy", children: lawyer.title })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-extrabold text-navy", children: [
            lawyer.price,
            " ج.م"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "سعر الاستشارة" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-navy", children: lawyer.rating.toFixed(1) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { value: lawyer.rating })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
            "التقييم (",
            lawyer.reviews,
            ")"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(BookingDialog, { name: lawyer.name, price: lawyer.price }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 space-y-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center justify-between text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-gold" }),
              lawyer.city
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "المدينة" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center justify-between text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-4 w-4 text-gold" }),
              lawyer.experience,
              " سنة"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "سنوات الخبرة" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 rounded-2xl border border-border bg-card p-7 shadow-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-navy", children: "السيرة الذاتية" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm leading-loose text-muted-foreground", children: lawyer.bio }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-sm leading-loose text-muted-foreground", children: [
        "يتمتع ",
        lawyer.name,
        " بسجل حافل بالنجاح في تأمين نتائج إيجابية وتسويات عادلة لعملائه، مع التزام كامل بالسرية والاحترافية في كل قضية."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mt-6 text-lg font-bold text-navy", children: "مجال الممارسة" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: lawyer.specialty }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mt-6 text-lg font-bold text-navy", children: "الخبرة المهنية" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-2 list-inside list-disc space-y-1 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "محامٍ ومستشار قانوني معتمد لدى نقابة المحامين" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "خبرة ",
          lawyer.experience,
          " عاماً في الترافع والاستشارات"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "الترافع أمام المحاكم بمختلف درجاتها" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ReviewsSection, { lawyerName: lawyer.name }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/lawyers", className: "text-sm font-semibold text-navy underline", children: "العودة لقائمة المحامين" }) })
  ] }) });
}
export {
  LawyerProfile as component
};
