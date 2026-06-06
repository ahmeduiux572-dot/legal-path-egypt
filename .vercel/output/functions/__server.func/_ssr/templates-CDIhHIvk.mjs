import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { S as SectionHeading } from "./SectionHeading-DjF0OAAd.mjs";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle } from "./dialog-U2-3YMO2.mjs";
import { P as PaymentSection } from "./PaymentSection-BjmVgGSP.mjs";
import { s as specialties } from "./router-xJ7VNU2Z.mjs";
import { t as templates } from "./content-B_ooFhCY.mjs";
import { c as PenLine, S as Sparkles, d as FileText, D as Download, C as CircleCheck } from "../_libs/lucide-react.mjs";
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
function BuyTemplateDialog({ title, price, trigger }) {
  const [open, setOpen] = reactExports.useState(false);
  const [done, setDone] = reactExports.useState(false);
  const [email, setEmail] = reactExports.useState("");
  const [payValid, setPayValid] = reactExports.useState(false);
  const valid = /\S+@\S+\.\S+/.test(email) && payValid;
  const reset = () => {
    setDone(false);
    setEmail("");
    setPayValid(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: (v) => {
    setOpen(v);
    if (!v) reset();
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: trigger }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[90vh] overflow-y-auto sm:max-w-md", dir: "rtl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-start text-navy", children: "شراء النموذج" }) }),
      done ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-6 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mx-auto h-14 w-14 text-gold" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mt-4 text-lg font-bold text-navy", children: "تمت عملية الشراء بنجاح" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-muted-foreground", children: [
          "تم إرسال نسخة من «",
          title,
          "» إلى بريدك، ويمكنك تحميلها الآن."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
          setOpen(false);
          reset();
        }, className: "mt-5 inline-flex items-center gap-2 rounded-lg bg-gradient-gold px-6 py-2.5 text-sm font-bold text-navy shadow-gold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
          " تحميل النموذج"
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
        e.preventDefault();
        if (valid) setDone(true);
      }, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-lg bg-secondary p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg font-extrabold text-navy", children: [
            price,
            " ج.م"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: title })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-sm font-semibold text-navy", children: "البريد الإلكتروني" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: email, onChange: (e) => setEmail(e.target.value), className: field$1, placeholder: "example@email.com" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PaymentSection, { onValidChange: setPayValid }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", disabled: !valid, className: "w-full rounded-lg bg-navy py-2.5 text-sm font-bold text-cream disabled:opacity-50", children: [
          "ادفع ",
          price,
          " ج.م"
        ] })
      ] })
    ] })
  ] });
}
const field = "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-gold";
function CustomTemplateDialog({ trigger }) {
  const [open, setOpen] = reactExports.useState(false);
  const [done, setDone] = reactExports.useState(false);
  const [name, setName] = reactExports.useState("");
  const [type, setType] = reactExports.useState("");
  const [category, setCategory] = reactExports.useState(specialties[1]);
  const [contents, setContents] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const valid = name.trim().length > 1 && type.trim().length > 2 && contents.trim().length > 10 && /\S+@\S+\.\S+/.test(email);
  const reset = () => {
    setDone(false);
    setName("");
    setType("");
    setContents("");
    setEmail("");
    setCategory(specialties[1]);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: (v) => {
    setOpen(v);
    if (!v) reset();
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: trigger }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[90vh] overflow-y-auto sm:max-w-lg", dir: "rtl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-start text-navy", children: "اطلب نموذجاً مخصصاً" }) }),
      done ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-6 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mx-auto h-14 w-14 text-gold" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mt-4 text-lg font-bold text-navy", children: "تم استلام طلبك" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "سيقوم أحد المحامين المتخصصين بإعداد النموذج وفق المحتويات التي طلبتها وإرساله إلى بريدك خلال 48 ساعة." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          setOpen(false);
          reset();
        }, className: "mt-5 rounded-lg bg-navy px-6 py-2.5 text-sm font-bold text-cream", children: "تم" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
        e.preventDefault();
        if (valid) setDone(true);
      }, className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-lg bg-secondary/60 p-3 text-xs leading-relaxed text-muted-foreground", children: "صف المحتويات والبنود التي تريدها في النموذج، وسيقوم محامٍ متخصص بصياغته لك بشكل احترافي." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-sm font-semibold text-navy", children: "اسمك" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: name, onChange: (e) => setName(e.target.value), className: field, placeholder: "اكتب اسمك", maxLength: 60 })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-sm font-semibold text-navy", children: "التخصص" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: category, onChange: (e) => setCategory(e.target.value), className: field, children: specialties.slice(1).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: s }, s)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-sm font-semibold text-navy", children: "نوع النموذج المطلوب" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: type, onChange: (e) => setType(e.target.value), className: field, placeholder: "مثال: عقد شراكة بين ثلاثة مؤسسين", maxLength: 120 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-sm font-semibold text-navy", children: "المحتويات والبنود المطلوبة" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: contents, onChange: (e) => setContents(e.target.value), rows: 5, className: field, placeholder: "اكتب البنود التي تريد أن يتضمنها النموذج بالتفصيل...", maxLength: 1500 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-sm font-semibold text-navy", children: "البريد الإلكتروني للتسليم" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: email, onChange: (e) => setEmail(e.target.value), className: field, placeholder: "example@email.com" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: !valid, className: "w-full rounded-lg bg-gradient-gold py-2.5 text-sm font-bold text-navy shadow-gold disabled:opacity-50", children: "إرسال الطلب" })
      ] })
    ] })
  ] });
}
function TemplatesPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-navy", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-gradient-navy", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4 py-14 text-center md:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeading, { light: true, title: "النماذج القانونية", subtitle: "عقود ونماذج قانونية جاهزة، مصاغة بدقة من متخصصين، جاهزة للتحميل والتعديل بأسعار مناسبة." }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-12 md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 flex flex-col items-center justify-between gap-4 rounded-xl border border-gold/30 bg-navy-card/50 p-6 text-center md:flex-row md:text-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "flex items-center gap-2 text-lg font-bold text-cream", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "h-5 w-5 text-gold" }),
            "لم تجد النموذج المناسب؟"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-cream/65", children: "اطلب نموذجاً مخصصاً وحدّد محتوياته بنفسك، ويقوم محامٍ متخصص بصياغته لك." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CustomTemplateDialog, { trigger: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "inline-flex items-center gap-2 rounded-md bg-gradient-gold px-6 py-3 text-sm font-bold text-navy shadow-gold transition-transform hover:-translate-y-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
          "اطلب نموذجاً مخصصاً"
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:grid-cols-2 lg:grid-cols-4", children: templates.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col rounded-xl border border-white/10 bg-navy-card/60 p-6 transition-all hover:-translate-y-1 hover:border-gold/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-gold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-6 w-6 text-navy" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-4 text-xs text-gold", children: [
          t.category,
          " · ",
          t.pages,
          " صفحات"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-1 text-base font-bold text-cream", children: t.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-cream/65", children: t.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between border-t border-white/10 pt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg font-extrabold text-gold", children: [
            t.price,
            " ج.م"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(BuyTemplateDialog, { title: t.title, price: t.price, trigger: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "inline-flex items-center gap-1.5 rounded-md bg-gradient-gold px-4 py-2 text-sm font-bold text-navy transition-transform hover:-translate-y-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
            "شراء"
          ] }) })
        ] })
      ] }, t.id)) })
    ] })
  ] });
}
export {
  TemplatesPage as component
};
