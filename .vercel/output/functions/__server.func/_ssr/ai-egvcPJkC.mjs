import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { S as Sparkles, N as Send } from "../_libs/lucide-react.mjs";
const suggestions = ["ما هي إجراءات رفع دعوى نفقة؟", "كيف أسجّل علامة تجارية؟", "ما حقوقي عند الفصل التعسفي؟"];
function AiPage() {
  const [messages, setMessages] = reactExports.useState([{
    from: "bot",
    text: "مرحباً بك في المساعد القانوني الذكي. اطرح سؤالك القانوني وسأساعدك بإجابة مبدئية، مع إمكانية توجيهك لمحامٍ متخصص."
  }]);
  const [input, setInput] = reactExports.useState("");
  const send = (text) => {
    const q = text.trim();
    if (!q) return;
    setMessages((m) => [...m, {
      from: "user",
      text: q
    }, {
      from: "bot",
      text: "هذه إجابة مبدئية لأغراض التوعية القانونية ولا تُعد استشارة رسمية. ننصح بالتواصل مع محامٍ متخصص عبر المنصة لمتابعة حالتك بدقة وحجز استشارة كاملة."
    }]);
    setInput("");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-navy", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl px-4 py-12 md:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-gold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-6 w-6 text-navy" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 text-2xl font-extrabold text-gradient-gold md:text-3xl", children: "المساعد القانوني الذكي" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-cream/70", children: "إجابات قانونية مبدئية فورية على مدار الساعة." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-[460px] flex-col rounded-2xl border border-white/10 bg-navy-card/50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 space-y-4 overflow-y-auto p-5", children: messages.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex ${m.from === "user" ? "justify-start" : "justify-end"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${m.from === "user" ? "bg-gradient-gold text-navy" : "bg-navy-deep text-cream/90"}`, children: m.text }) }, i)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 px-5 pb-3", children: suggestions.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => send(s), className: "rounded-full border border-gold/30 px-3 py-1 text-xs text-cream/80 transition-colors hover:bg-white/5", children: s }, s)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
        e.preventDefault();
        send(input);
      }, className: "flex items-center gap-2 border-t border-white/10 p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: input, onChange: (e) => setInput(e.target.value), placeholder: "اكتب سؤالك القانوني...", className: "flex-1 rounded-lg border border-white/15 bg-navy-deep px-4 py-2.5 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-gold text-navy transition-transform hover:-translate-y-0.5", "aria-label": "إرسال", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" }) })
      ] })
    ] })
  ] }) });
}
export {
  AiPage as component
};
