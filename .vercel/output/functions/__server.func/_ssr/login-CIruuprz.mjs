import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { l as login } from "./router-xJ7VNU2Z.mjs";
import { f as Scale, C as CircleCheck, g as User, h as Mail, i as Lock } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
const loginBg = "/assets/login-bg-CDnRH5bb.jpg";
function LoginPage() {
  const [role, setRole] = reactExports.useState("client");
  const [submitted, setSubmitted] = reactExports.useState(false);
  const [email, setEmail] = reactExports.useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      role,
      email
    });
    if (role === "lawyer") {
      navigate({
        to: "/dashboard"
      });
    } else {
      setSubmitted(true);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-navy-deep px-4 py-12", style: {
    backgroundImage: `url(${loginBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-navy-deep/75" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/60 to-navy-deep/40" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex w-full flex-col items-center justify-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-lg border border-gold/30 bg-navy-card/60", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Scale, { className: "h-5 w-5 text-gold" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold text-cream", children: "محام" })
      ] }),
      submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm rounded-2xl border border-gold/30 bg-navy-card/80 p-10 text-center backdrop-blur-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mx-auto h-12 w-12 text-gold" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 text-xl font-bold text-cream", children: "تم تسجيل الدخول بنجاح" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-cream/70", children: [
          "مرحباً بك مجدداً في منصة محام ",
          role === "lawyer" ? "كمحامٍ" : "كعميل",
          "."
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm rounded-2xl border border-white/10 bg-navy-card/70 p-6 backdrop-blur-md sm:p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-cream", children: "تسجيل الدخول" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-cream/60", children: "ادخل إلى حسابك على منصة محام للوصول إلى استشاراتك وخدماتك." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 grid grid-cols-2 gap-2 rounded-xl border border-white/10 bg-navy-deep p-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setRole("client"), className: `flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-bold transition-all duration-200 ${role === "client" ? "bg-gradient-gold text-navy shadow-gold" : "text-cream/70 hover:text-cream"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4" }),
            " عميل"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setRole("lawyer"), className: `flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-bold transition-all duration-200 ${role === "lawyer" ? "bg-gradient-gold text-navy shadow-gold" : "text-cream/70 hover:text-cream"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Scale, { className: "h-4 w-4" }),
            " محامٍ"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium text-cream/80", children: "البريد الإلكتروني" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), placeholder: "example@email.com", className: "w-full rounded-lg border border-white/15 bg-navy-deep px-3 py-2.5 pr-9 text-sm text-cream placeholder:text-cream/40 transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium text-cream/80", children: "كلمة المرور" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", required: true, placeholder: "••••••••", className: "w-full rounded-lg border border-white/15 bg-navy-deep px-3 py-2.5 pr-9 text-sm text-cream placeholder:text-cream/40 transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex cursor-pointer items-center gap-2 text-cream/70", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", className: "accent-gold h-3.5 w-3.5 rounded border-white/20" }),
                " تذكّرني"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "text-gold transition-colors hover:text-gold-soft hover:underline", children: "نسيت كلمة المرور؟" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "w-full rounded-lg bg-gradient-gold py-3 text-sm font-bold text-navy shadow-gold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-gold", children: "تسجيل الدخول" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-center text-sm text-cream/70", children: role === "lawyer" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            "ليس لديك حساب محامٍ؟",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", className: "font-semibold text-gold transition-colors hover:text-gold-soft hover:underline", children: "انضم كمحامٍ" })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            "ليس لديك حساب؟",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", className: "font-semibold text-gold transition-colors hover:text-gold-soft hover:underline", children: "سجّل الآن" })
          ] }) })
        ] })
      ] })
    ] })
  ] });
}
export {
  LoginPage as component
};
