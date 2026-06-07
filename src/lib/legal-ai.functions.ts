import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const messageSchema = z.object({
  role: z.enum(["user", "ai"]),
  text: z.string().min(1).max(4000),
});

const inputSchema = z.object({
  messages: z.array(messageSchema).min(1).max(12),
});

// Compact Egyptian-law system prompt. Kept short on purpose to minimise token
// usage while still grounding the model in the main Egyptian legal sources.
const SYSTEM_PROMPT = `أنت مساعد قانوني مصري خبير داخل منصة "مُحَامٌ". تجيب فقط وفق القانون المصري وتستند إلى المصادر التالية عند الحاجة:
- الدستور المصري 2014.
- القانون المدني رقم 131 لسنة 1948.
- قانون العقوبات رقم 58 لسنة 1937 وقانون الإجراءات الجنائية رقم 150 لسنة 1950.
- قانون المرافعات المدنية والتجارية رقم 13 لسنة 1968.
- قانون الأحوال الشخصية (القوانين 25 لسنة 1920 و25 لسنة 1929 و1 لسنة 2000).
- قانون العمل رقم 12 لسنة 2003.
- قانون التجارة رقم 17 لسنة 1999 وقانون الشركات رقم 159 لسنة 1981.
- قانون الإيجارات وقانون الضرائب على الدخل رقم 91 لسنة 2005.
قواعد الرد:
1. أجب بالعربية بإيجاز شديد ووضوح، في نقاط مختصرة عند الحاجة.
2. اذكر رقم القانون أو المادة عند الإمكان.
3. إن كان السؤال خارج القانون المصري أو يحتاج محاميًا، نبّه لذلك بسطر واحد.
4. لا تكرر المقدمات، ادخل في صلب الإجابة مباشرة.`;

export const askLegalAi = createServerFn({ method: "POST" })
  .inputValidator(inputSchema)
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return { reply: "خدمة الذكاء الاصطناعي غير مهيأة حالياً.", error: "no_key" as const };
    }

    const chatMessages = data.messages.map((m) => ({
      role: m.role === "ai" ? "assistant" : "user",
      content: m.text,
    }));

    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...chatMessages],
          max_tokens: 600,
          temperature: 0.3,
        }),
      });

      if (res.status === 429) {
        return { reply: "تم تجاوز الحد المسموح من الطلبات، حاول بعد قليل.", error: "rate_limit" as const };
      }
      if (res.status === 402) {
        return { reply: "انتهى رصيد الذكاء الاصطناعي، يرجى إضافة رصيد لمواصلة الاستخدام.", error: "payment" as const };
      }
      if (!res.ok) {
        const body = await res.text();
        console.error("Legal AI gateway error:", res.status, body);
        return { reply: "تعذّر الحصول على رد من المساعد القانوني، حاول مرة أخرى.", error: "gateway" as const };
      }

      const json = await res.json();
      const reply: string =
        json?.choices?.[0]?.message?.content?.trim() ||
        "لم أتمكن من توليد إجابة، أعد صياغة سؤالك.";
      return { reply, error: null };
    } catch (e) {
      console.error("Legal AI error:", e);
      return { reply: "حدث خطأ غير متوقع، حاول مرة أخرى.", error: "unknown" as const };
    }
  });
