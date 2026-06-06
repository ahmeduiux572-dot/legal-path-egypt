import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { S as SectionHeading } from "./SectionHeading-DjF0OAAd.mjs";
import { p as plans } from "./content-B_ooFhCY.mjs";
import { s as specialties } from "./router-xJ7VNU2Z.mjs";
import { e as Check, C as CircleCheck, U as Upload } from "../_libs/lucide-react.mjs";
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
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
function RegisterPage() {
  const [plan, setPlan] = reactExports.useState("pro");
  const [photo, setPhoto] = reactExports.useState(null);
  const [cv, setCv] = reactExports.useState(null);
  const [submitted, setSubmitted] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-navy", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-gradient-navy", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4 py-14 text-center md:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { light: true, title: "انضم إلى محام كمحامٍ", subtitle: "اختر الباقة المناسبة، ارفع بياناتك وسيرتك الذاتية، وابدأ استقبال العملاء." }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-12 md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-6 text-center text-xl font-bold text-cream", children: "اختر باقتك" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-14 grid gap-6 lg:grid-cols-3", children: plans.map((p) => {
        const active = plan === p.id;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setPlan(p.id), className: `relative flex flex-col rounded-2xl border p-7 text-start transition-all ${active ? "border-gold bg-navy-card shadow-gold" : "border-white/10 bg-navy-card/50 hover:border-gold/40"}`, children: [
          p.highlight && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-gold px-3 py-0.5 text-xs font-bold text-navy", children: "الأكثر طلباً" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-lg font-bold text-cream", children: p.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl font-extrabold text-gold", children: p.price }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-cream/60", children: [
              " ج.م / ",
              p.period
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-5 flex-1 space-y-2.5", children: p.features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2 text-sm text-cream/75", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "mt-0.5 h-4 w-4 shrink-0 text-gold" }),
            f
          ] }, f)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `mt-6 rounded-md py-2.5 text-center text-sm font-bold ${active ? "bg-gradient-gold text-navy" : "border border-gold/50 text-cream"}`, children: active ? "الباقة المختارة" : "اختر هذه الباقة" })
        ] }, p.id);
      }) }),
      submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl rounded-2xl border border-gold/30 bg-navy-card/60 p-10 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mx-auto h-12 w-12 text-gold" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 text-xl font-bold text-cream", children: "تم استلام طلب التسجيل بنجاح" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-cream/70", children: "سيقوم فريقنا بمراجعة بياناتك والتواصل معك لتفعيل حسابك على المنصة." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
        e.preventDefault();
        setSubmitted(true);
      }, className: "mx-auto max-w-2xl rounded-2xl border border-white/10 bg-navy-card/50 p-7", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-5 text-lg font-bold text-cream", children: "بياناتك" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "الاسم الكامل", required: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "رقم نقابة المحامين", required: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "البريد الإلكتروني", type: "email", required: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "رقم الهاتف", type: "tel", required: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm text-cream/80", children: "التخصص" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("select", { className: "w-full rounded-lg border border-white/15 bg-navy-deep px-3 py-2.5 text-sm text-cream focus:border-gold focus:outline-none", children: specialties.slice(1).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: s }, s)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "المدينة", required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm text-cream/80", children: "نبذة تعريفية" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 3, className: "w-full rounded-lg border border-white/15 bg-navy-deep px-3 py-2.5 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none", placeholder: "اكتب نبذة مختصرة عن خبرتك..." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileInput, { label: "الصورة الشخصية", value: photo, onChange: setPhoto, accept: "image/*" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileInput, { label: "السيرة الذاتية (CV)", value: cv, onChange: setCv, accept: ".pdf,.doc,.docx" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "mt-6 w-full rounded-lg bg-gradient-gold py-3 text-sm font-bold text-navy shadow-gold transition-transform hover:-translate-y-0.5", children: "إرسال طلب التسجيل" })
      ] })
    ] })
  ] });
}
function Field({
  label,
  type = "text",
  required
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm text-cream/80", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type, required, className: "w-full rounded-lg border border-white/15 bg-navy-deep px-3 py-2.5 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none" })
  ] });
}
function FileInput({
  label,
  value,
  onChange,
  accept
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm text-cream/80", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-white/25 bg-navy-deep px-3 py-2.5 text-sm text-cream/70 transition-colors hover:border-gold/50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4 text-gold" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: value ?? "اختر ملفاً" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept, className: "hidden", onChange: (e) => onChange(e.target.files?.[0]?.name ?? "") })
    ] })
  ] });
}
export {
  RegisterPage as component
};
