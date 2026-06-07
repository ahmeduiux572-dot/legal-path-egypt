import { useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Send, Sparkles, Loader2 } from "lucide-react";

export const Route = createFileRoute("/ai")({
  head: () => ({
    meta: [
      { title: "المساعد القانوني الذكي | مُحامٍ" },
      { name: "description", content: "اطرح سؤالك القانوني واحصل على إجابة فورية من المساعد القانوني الذكي." },
      { property: "og:title", content: "المساعد القانوني الذكي | مُحامٍ" },
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
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      const el = scrollRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    });
  };

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || loading) return;
    setInput("");

    const history: Msg[] = [...messages, { from: "user", text: q }];
    setMessages([...history, { from: "bot", text: "" }]);
    setLoading(true);
    scrollToBottom();

    const apiMessages = history
      .filter((_, i) => i > 0)
      .map((m) => ({
        role: (m.from === "user" ? "user" : "assistant") as "user" | "assistant",
        content: m.text,
      }));

    let assistantText = "";
    const appendDelta = (chunk: string) => {
      assistantText += chunk;
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = { from: "bot", text: assistantText };
        return next;
      });
      scrollToBottom();
    };

    try {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!resp.ok || !resp.body) {
        let msg = "تعذّر الاتصال بالمساعد الذكي. حاول مرة أخرى.";
        try {
          const data = await resp.json();
          if (data?.error) msg = data.error;
        } catch {
          /* ignore */
        }
        appendDelta(msg);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let done = false;

      while (!done) {
        const { done: streamDone, value } = await reader.read();
        if (streamDone) break;
        buffer += decoder.decode(value, { stream: true });

        let nl: number;
        while ((nl = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, nl);
          buffer = buffer.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            done = true;
            break;
          }
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) appendDelta(content);
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }

      if (!assistantText) {
        appendDelta("لم أتمكن من إنشاء إجابة. حاول إعادة صياغة سؤالك.");
      }
    } catch {
      appendDelta("تعذّر الاتصال بالمساعد الذكي. حاول مرة أخرى.");
    } finally {
      setLoading(false);
      scrollToBottom();
    }
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
          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-5">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-start" : "justify-end"}`}>
                <div className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${m.from === "user" ? "bg-gradient-gold text-navy" : "bg-navy-deep text-cream/90"}`}>
                  {m.text || (loading && i === messages.length - 1 ? (
                    <Loader2 className="h-4 w-4 animate-spin text-gold" />
                  ) : null)}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 px-5 pb-3">
            {suggestions.map((s) => (
              <button key={s} onClick={() => send(s)} disabled={loading} className="rounded-full border border-gold/30 px-3 py-1 text-xs text-cream/80 transition-colors hover:bg-white/5 disabled:opacity-50">
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
            <button type="submit" disabled={loading} className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-gold text-navy transition-transform hover:-translate-y-0.5 disabled:opacity-50" aria-label="إرسال">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}