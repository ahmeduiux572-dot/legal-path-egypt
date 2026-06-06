import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { S as SectionHeading } from "./SectionHeading-DjF0OAAd.mjs";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle } from "./dialog-U2-3YMO2.mjs";
import { s as specialties, c as cities } from "./router-xJ7VNU2Z.mjs";
import { c as cases } from "./content-B_ooFhCY.mjs";
import { W as Wallet, j as MapPin, m as Users, r as Clock, C as CircleCheck } from "../_libs/lucide-react.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/isbot.mjs";
const field$1 = "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-gold";
function PostCaseDialog({ trigger }) {
  const [open, setOpen] = reactExports.useState(false);
  const [done, setDone] = reactExports.useState(false);
  const [title, setTitle] = reactExports.useState("");
  const [category, setCategory] = reactExports.useState(specialties[1]);
  const [city, setCity] = reactExports.useState(cities[1]);
  const [budget, setBudget] = reactExports.useState("");
  const [desc, setDesc] = reactExports.useState("");
  const valid = title.trim().length > 3 && desc.trim().length > 10;
  const reset = () => {
    setDone(false);
    setTitle("");
    setBudget("");
    setDesc("");
    setCategory(specialties[1]);
    setCity(cities[1]);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: (v) => {
    setOpen(v);
    if (!v) reset();
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: trigger }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[90vh] overflow-y-auto sm:max-w-lg", dir: "rtl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-start text-navy", children: "انشر قضيتك" }) }),
      done ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-6 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mx-auto h-14 w-14 text-gold" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mt-4 text-lg font-bold text-navy", children: "تم نشر قضيتك بنجاح" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "سيصلك إشعار عند استقبال عروض من المحامين المتخصصين." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          setOpen(false);
          reset();
        }, className: "mt-5 rounded-lg bg-navy px-6 py-2.5 text-sm font-bold text-cream", children: "تم" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: (e) => {
            e.preventDefault();
            if (valid) setDone(true);
          },
          className: "space-y-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-sm font-semibold text-navy", children: "عنوان القضية" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: title, onChange: (e) => setTitle(e.target.value), className: field$1, placeholder: "مثال: نزاع تجاري على عقد توريد", maxLength: 120 })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-sm font-semibold text-navy", children: "التخصص" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: category, onChange: (e) => setCategory(e.target.value), className: field$1, children: specialties.slice(1).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: s }, s)) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-sm font-semibold text-navy", children: "المدينة" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: city, onChange: (e) => setCity(e.target.value), className: field$1, children: cities.slice(1).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: c }, c)) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-sm font-semibold text-navy", children: "الميزانية المتوقعة" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: budget, onChange: (e) => setBudget(e.target.value), className: field$1, placeholder: "مثال: 5,000 - 12,000 ج.م", maxLength: 60 })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-sm font-semibold text-navy", children: "تفاصيل القضية" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: desc, onChange: (e) => setDesc(e.target.value), rows: 4, className: field$1, placeholder: "اشرح تفاصيل قضيتك بوضوح ليتمكن المحامون من تقديم عروضهم.", maxLength: 1e3 })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: !valid, className: "w-full rounded-lg bg-gradient-gold py-2.5 text-sm font-bold text-navy shadow-gold disabled:opacity-50", children: "نشر القضية" })
          ]
        }
      )
    ] })
  ] });
}
const field = "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-gold";
function SubmitOfferDialog({ caseTitle, trigger }) {
  const [open, setOpen] = reactExports.useState(false);
  const [done, setDone] = reactExports.useState(false);
  const [price, setPrice] = reactExports.useState("");
  const [duration, setDuration] = reactExports.useState("");
  const [msg, setMsg] = reactExports.useState("");
  const valid = price.trim().length > 0 && msg.trim().length > 10;
  const reset = () => {
    setDone(false);
    setPrice("");
    setDuration("");
    setMsg("");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: (v) => {
    setOpen(v);
    if (!v) reset();
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: trigger }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[90vh] overflow-y-auto sm:max-w-lg", dir: "rtl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-start text-navy", children: "تقديم عرض" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "-mt-1 text-sm text-muted-foreground", children: [
        "على قضية: ",
        caseTitle
      ] }),
      done ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-6 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mx-auto h-14 w-14 text-gold" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mt-4 text-lg font-bold text-navy", children: "تم إرسال عرضك بنجاح" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "سيتم إشعارك عند رد صاحب القضية على عرضك." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          setOpen(false);
          reset();
        }, className: "mt-5 rounded-lg bg-navy px-6 py-2.5 text-sm font-bold text-cream", children: "تم" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
        e.preventDefault();
        if (valid) setDone(true);
      }, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-sm font-semibold text-navy", children: "قيمة العرض (ج.م)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: price, onChange: (e) => setPrice(e.target.value), className: field, placeholder: "مثال: 8000", inputMode: "numeric" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-sm font-semibold text-navy", children: "مدة الإنجاز" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: duration, onChange: (e) => setDuration(e.target.value), className: field, placeholder: "مثال: أسبوعان", maxLength: 40 })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-sm font-semibold text-navy", children: "رسالتك لصاحب القضية" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: msg, onChange: (e) => setMsg(e.target.value), rows: 4, className: field, placeholder: "اشرح خبرتك وخطتك للتعامل مع القضية.", maxLength: 1e3 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: !valid, className: "w-full rounded-lg bg-gradient-gold py-2.5 text-sm font-bold text-navy shadow-gold disabled:opacity-50", children: "إرسال العرض" })
      ] })
    ] })
  ] });
}
function CasesPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-navy", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-gradient-navy", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4 py-14 text-center md:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { light: true, title: "سوق القضايا", subtitle: "اطرح قضيتك واستقبل عروضاً تنافسية من المحامين، أو تصفح القضايا المتاحة وقدّم عرضك." }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-12 md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 flex flex-col items-center justify-between gap-4 rounded-xl border border-gold/30 bg-navy-card/50 p-6 text-center md:flex-row md:text-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-cream", children: "لديك قضية تبحث لها عن محامٍ؟" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-cream/65", children: "انشر تفاصيل قضيتك مجاناً واستقبل عروضاً من محامين متخصصين خلال ساعات." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PostCaseDialog, { trigger: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "rounded-md bg-gradient-gold px-6 py-3 text-sm font-bold text-navy shadow-gold transition-transform hover:-translate-y-0.5", children: "انشر قضيتك الآن" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3", children: cases.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col rounded-xl border border-white/10 bg-navy-card/60 p-6 transition-all hover:-translate-y-1 hover:border-gold/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-gold/15 px-3 py-1 text-xs font-medium text-gold", children: c.category }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-cream/50", children: c.deadline })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 text-base font-bold text-cream", children: c.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-cream/65", children: c.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-2 border-t border-white/10 pt-4 text-xs text-cream/70", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-4 w-4 text-gold" }),
            "الميزانية: ",
            c.budget
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-gold" }),
            c.city
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4 text-gold" }),
            c.proposals,
            " عروض مقدمة"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-gold" }),
            c.deadline
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SubmitOfferDialog, { caseTitle: c.title, trigger: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "mt-5 w-full rounded-md border border-gold/50 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-white/5", children: "قدّم عرضك" }) })
      ] }, c.id)) })
    ] })
  ] });
}
export {
  CasesPage as component
};
