import { createFileRoute } from "@tanstack/react-router";

const SYSTEM_PROMPT = `أنت مساعد قانوني ذكي على منصة "مُحَامٌ" القانونية الرقمية في مصر والشرق الأوسط.
مهمتك تقديم إجابات قانونية مبدئية واضحة ومبسطة باللغة العربية لأغراض التوعية القانونية.
قواعد مهمة:
- قدّم معلومات عامة ومبدئية فقط، وليست استشارة قانونية رسمية.
- وضّح دائماً أن الإجابة لأغراض التوعية وأنه يُنصح بالتواصل مع محامٍ متخصص عبر المنصة لمتابعة الحالة بدقة.
- استخدم لغة عربية فصيحة وبسيطة ومنظمة بنقاط عند الحاجة.
- إذا كان السؤال خارج النطاق القانوني، وجّه المستخدم بلطف.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { messages } = (await request.json()) as {
            messages: { role: "user" | "assistant"; content: string }[];
          };

          const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
          if (!LOVABLE_API_KEY) {
            return new Response(
              JSON.stringify({ error: "LOVABLE_API_KEY is not configured" }),
              { status: 500, headers: { "Content-Type": "application/json" } },
            );
          }

          if (!Array.isArray(messages) || messages.length === 0) {
            return new Response(
              JSON.stringify({ error: "messages are required" }),
              { status: 400, headers: { "Content-Type": "application/json" } },
            );
          }

          const safeMessages = messages
            .slice(-20)
            .filter(
              (m) =>
                (m.role === "user" || m.role === "assistant") &&
                typeof m.content === "string" &&
                m.content.length > 0 &&
                m.content.length <= 4000,
            );

          const response = await fetch(
            "https://ai.gateway.lovable.dev/v1/chat/completions",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${LOVABLE_API_KEY}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                model: "google/gemini-3-flash-preview",
                messages: [
                  { role: "system", content: SYSTEM_PROMPT },
                  ...safeMessages,
                ],
                stream: true,
              }),
            },
          );

          if (!response.ok) {
            if (response.status === 429) {
              return new Response(
                JSON.stringify({
                  error: "تم تجاوز حد الطلبات، يرجى المحاولة بعد قليل.",
                }),
                { status: 429, headers: { "Content-Type": "application/json" } },
              );
            }
            if (response.status === 402) {
              return new Response(
                JSON.stringify({
                  error: "انتهى الرصيد المتاح، يرجى إضافة رصيد لمواصلة الاستخدام.",
                }),
                { status: 402, headers: { "Content-Type": "application/json" } },
              );
            }
            const t = await response.text();
            console.error("AI gateway error:", response.status, t);
            return new Response(
              JSON.stringify({ error: "حدث خطأ في المساعد الذكي." }),
              { status: 500, headers: { "Content-Type": "application/json" } },
            );
          }

          return new Response(response.body, {
            headers: {
              "Content-Type": "text/event-stream",
              "Cache-Control": "no-cache",
              Connection: "keep-alive",
            },
          });
        } catch (e) {
          console.error("chat error:", e);
          return new Response(
            JSON.stringify({
              error: e instanceof Error ? e.message : "Unknown error",
            }),
            { status: 500, headers: { "Content-Type": "application/json" } },
          );
        }
      },
    },
  },
});