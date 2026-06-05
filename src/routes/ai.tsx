import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Send, Sparkles } from "lucide-react";

export const Route = createFileRoute("/ai")({
  head: () => ({
    meta: [
      { title: "المساعد القانوني الذكي | محاميك" },
      { name: "description", content: "اطرح سؤالك القانوني واحصل على إجابة فورية من المساعد القانوني الذكي." },
      { property: "og:title", content: "المساعد القانوني الذكي | محاميك" },
      { property: "og:description", content: "إجابات قانونية فورية على مدار الساعة." },
    ],
  }),
  component: AiPage,
});

interface Msg { from: "user" | "bot"; text: string }

const suggestions = [
  "ما هي إجراءات رفع دعوى نفقة؟",
  "كيف أسجّل علامة تجارية؟",
  "ما حقوقي عند الفصل التعسفي؟",
];

function AiPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { from: "bot", text: "مرحباً بك في المساعد القانوني الذكي. اطرح سؤالك القانوني وسأساعدك بإجابة مبدئية، مع إمكانية توجيهك لمحامٍ متخصص." },
  ]);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    const q = text.trim();
    if (!q) return;
    setMessages((m) => [
      ...m,
      { from: "user", text: q },
      { from: "bot", text: "هذه إجابة مبدئية لأغراض التوعية القانونية ولا تُعد استشارة رسمية. ننصح بالتواصل مع محامٍ متخصص عبر المنصة لمتابعة حالتك بدقة وحجز استشارة كاملة." },
    ]);
    setInput("");
  };

  return (
    <div className="bg-navy">
      <div className="mx-auto max-w-3xl px-4 py-12 md:px-8">
        <div className="mb-6 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-gold">
            <Sparkles className="h-6 w-6 text-navy" />
          </span>
          <h1 className="mt-4 text-2xl font-extrabold text-gradient-gold md:text-3xl">المساعد القانوني الذكي</h1>
          <p className="mt-2 text-sm text-cream/70">إجابات قانونية مبدئية فورية على مدار الساعة.</p>
        </div>

        <div className="flex h-[460px] flex-col rounded-2xl border border-white/10 bg-navy-card/50">
          <div className="flex-1 space-y-4 overflow-y-auto p-5">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-start" : "justify-end"}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${m.from === "user" ? "bg-gradient-gold text-navy" : "bg-navy-deep text-cream/90"}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 px-5 pb-3">
            {suggestions.map((s) => (
              <button key={s} onClick={() => send(s)} className="rounded-full border border-gold/30 px-3 py-1 text-xs text-cream/80 transition-colors hover:bg-white/5">
                {s}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="flex items-center gap-2 border-t border-white/10 p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="اكتب سؤالك القانوني..."
              className="flex-1 rounded-lg border border-white/15 bg-navy-deep px-4 py-2.5 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
            />
            <button type="submit" className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-gold text-navy transition-transform hover:-translate-y-0.5" aria-label="إرسال">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}