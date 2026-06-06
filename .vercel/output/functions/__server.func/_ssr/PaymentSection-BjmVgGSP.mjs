import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a6 as CreditCard, W as Wallet, a7 as Smartphone } from "../_libs/lucide-react.mjs";
const field = "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-gold";
const methods = [
  { id: "card", label: "بطاقة ائتمان", icon: CreditCard },
  { id: "vodafone", label: "فودافون كاش", icon: Wallet },
  { id: "orange", label: "أورنج كاش", icon: Wallet },
  { id: "etisalat", label: "اتصالات كاش", icon: Wallet },
  { id: "instapay", label: "إنستا باي", icon: Smartphone }
];
function PaymentSection({ onValidChange }) {
  const [method, setMethod] = reactExports.useState("card");
  const [card, setCard] = reactExports.useState("");
  const [exp, setExp] = reactExports.useState("");
  const [cvv, setCvv] = reactExports.useState("");
  const [wallet, setWallet] = reactExports.useState("");
  reactExports.useEffect(() => {
    const valid = method === "card" ? card.replace(/\s/g, "").length >= 12 && exp.length >= 4 && cvv.length >= 3 : method === "instapay" ? wallet.trim().length >= 4 : wallet.replace(/\D/g, "").length >= 10;
    onValidChange(valid);
  }, [method, card, exp, cvv, wallet, onValidChange]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-sm font-semibold text-navy", children: "طريقة الدفع" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2 sm:grid-cols-3", children: methods.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setMethod(m.id),
          className: `flex items-center justify-center gap-1.5 rounded-lg border px-2 py-2.5 text-xs font-semibold transition-colors ${method === m.id ? "border-gold bg-secondary text-navy" : "border-border text-muted-foreground"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(m.icon, { className: "h-4 w-4 text-gold" }),
            m.label
          ]
        },
        m.id
      )) })
    ] }),
    method === "card" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mb-2 flex items-center gap-2 text-sm font-semibold text-navy", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-4 w-4 text-gold" }),
          "رقم البطاقة"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: card, onChange: (e) => setCard(e.target.value), className: field, placeholder: "0000 0000 0000 0000", inputMode: "numeric" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-sm font-semibold text-navy", children: "تاريخ الانتهاء" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: exp, onChange: (e) => setExp(e.target.value), className: field, placeholder: "MM/YY" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-sm font-semibold text-navy", children: "CVV" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: cvv, onChange: (e) => setCvv(e.target.value), className: field, placeholder: "123", inputMode: "numeric" })
        ] })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mb-2 flex items-center gap-2 text-sm font-semibold text-navy", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-4 w-4 text-gold" }),
        method === "instapay" ? "عنوان الدفع (إنستا باي)" : "رقم المحفظة الإلكترونية"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          value: wallet,
          onChange: (e) => setWallet(e.target.value),
          className: field,
          placeholder: method === "instapay" ? "example@instapay" : "01XXXXXXXXX",
          inputMode: method === "instapay" ? "text" : "numeric"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-muted-foreground", children: "سيصلك طلب تأكيد الدفع على محفظتك لإتمام العملية." })
    ] })
  ] });
}
export {
  PaymentSection as P
};
