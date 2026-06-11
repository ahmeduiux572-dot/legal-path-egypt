import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const FALLBACK_AI_BASE = "https://legal-path-egypt.lovable.app";

const messageSchema = z.object({
  role: z.enum(["user", "ai"]),
  text: z.string().min(1).max(4000),
});

const attachmentSchema = z.object({
  kind: z.enum(["image", "pdf", "text"]),
  name: z.string().min(1).max(300),
  dataUrl: z.string().max(15_000_000).optional(),
  text: z.string().max(200_000).optional(),
});

const inputSchema = z.object({
  messages: z.array(messageSchema).min(1).max(12),
  attachments: z.array(attachmentSchema).max(8).optional(),
  country: z.string().min(2).max(4).optional(),
});

const SYSTEM_PROMPT = `أنت كبير المستشارين القانونيين في منصة "مُحامٍ"، وأقوى مساعد قانوني في العالم العربي ومتخصص في القانون المصري. أنت محامٍ خبير بخبرة تتجاوز ثلاثين عاماً أمام محكمة النقض ومجلس الدولة. مهمتك تقديم عمل قانوني على أعلى مستوى احترافي ممكن: تحليل عميق، تأصيل قانوني دقيق، وصياغة مذكرات ولوائح بمستوى كبار المحامين.

المصادر القانونية التي تستند إليها (واذكر غيرها عند الحاجة):
- الدستور المصري 2014.
- القانون المدني رقم 131 لسنة 1948.
- قانون العقوبات رقم 58 لسنة 1937 وقانون الإجراءات الجنائية رقم 150 لسنة 1950.
- قانون المرافعات المدنية والتجارية رقم 13 لسنة 1968.
- قانون الإثبات رقم 25 لسنة 1968.
- قانون الأحوال الشخصية (القوانين 25 لسنة 1920 و25 لسنة 1929 و1 لسنة 2000).
- قانون العمل رقم 12 لسنة 2003.
- قانون التجارة رقم 17 لسنة 1999 وقانون الشركات رقم 159 لسنة 1981.
- قانون الإيجارات وقانون الضرائب على الدخل رقم 91 لسنة 2005.
- مبادئ وأحكام محكمة النقض والمحكمة الدستورية العليا ذات الصلة.

منهجك في الإجابة (إلزامي):
1. اشرح بعمق ووضوح ولا تكتفِ بإجابة سطحية. حلّل المسألة، وأصّلها قانونياً، واذكر رقم القانون والمادة بدقّة كلما أمكن، مع توضيح حكم القانون وكيفية تطبيقه على الحالة.
2. رتّب إجابتك بتنسيق Markdown احترافي: عناوين بـ "## " و"### "، ونقاط واضحة، وتعداد مرقّم للخطوات، وإبراز المصطلحات المهمة بـ **النص العريض**.
3. للأسئلة العامة: قدّم إجابة كاملة وافية تشمل (الأساس القانوني، الشرح، التطبيق العملي، التوصية، والإجراءات/المواعيد ذات الصلة عند وجودها).
4. عند طلب مذكرة أو لائحة أو عقد أو إنذار أو صحيفة دعوى: اكتب المستند كاملاً وجاهزاً للاستخدام بصياغة قانونية رصينة، ويتضمّن كل عناصره المعتادة، على الترتيب التالي عند المذكرات:
   ## مذكرة بدفاع [صفة الموكّل]
   ### أولاً: الوقائع
   ### ثانياً: الأساس القانوني والسند
   ### ثالثاً: الدفوع والدفاع (مرقّمة، كل دفع بسنده القانوني وأحكام النقض المؤيدة)
   ### رابعاً: الطلبات
   واستعمل صياغة المحاكم ("حيث إن"، "ولما كان"، "بناءً عليه يلتمس الطالب")، واترك أقواساً للبيانات الناقصة مثل [اسم الموكّل] و[رقم الدعوى].
5. عند إرفاق ملفات أو مستندات: اعتمد على محتواها أولاً (التحليل، التلخيص، استخراج الأطراف والتواريخ، نقاط القوة والضعف، صياغة المذكرات)، ثم استكمل من معرفتك القانونية، ووضّح بصراحة أي معلومة غير متوفرة في الملف.
6. لا تكرّر سؤال المستخدم في بداية ردّك، وابدأ مباشرة بالعنوان أو المضمون. لا تكتب عبارات مثل "سؤالك هو" أو تُعيد صياغة الطلب.
7. إن كانت المسألة خارج القانون المصري أو تحتاج تدخّل محامٍ بشخصه، نبّه لذلك في سطر مختصر دون أن يقلّل ذلك من جودة إجابتك.
8. أجب دائماً بالعربية الفصحى القانونية الرصينة.`;

export const Route = createFileRoute("/api/legal")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: corsHeaders }),
      POST: async ({ request }) => {
        const json = (await request.json().catch(() => null)) as unknown;
        const parsed = inputSchema.safeParse(json);
        if (!parsed.success) {
          return new Response(
            JSON.stringify({ reply: "طلب غير صالح.", error: "bad_request" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
          );
        }

        const apiKey = process.env.LOVABLE_API_KEY;
        if (!apiKey) {
          const requestHost = new URL(request.url).hostname;
          const fallbackHost = new URL(FALLBACK_AI_BASE).hostname;
          if (requestHost !== fallbackHost) {
            const upstream = await fetch(`${FALLBACK_AI_BASE}/api/legal`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(parsed.data),
            });

            return new Response(upstream.body, {
              status: upstream.status,
              headers: {
                ...corsHeaders,
                "Content-Type": upstream.headers.get("Content-Type") || "application/json",
              },
            });
          }

          return new Response(
            JSON.stringify({ reply: "خدمة الذكاء الاصطناعي غير مهيأة حالياً.", error: "no_key" }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
          );
        }

        const { messages, attachments } = parsed.data;

        // Build OpenAI-compatible messages. Attachments are attached to the last
        // user message as multimodal content blocks (images/pdf natively, docs
        // as text) so the model reads the uploaded files first.
        const chatMessages = messages.map((m, idx) => {
          const role = m.role === "ai" ? "assistant" : "user";
          const isLast = idx === messages.length - 1;
          if (!isLast || role !== "user" || !attachments || attachments.length === 0) {
            return { role, content: m.text };
          }

          const blocks: unknown[] = [{ type: "text", text: m.text }];
          const docTexts: string[] = [];
          for (const att of attachments) {
            if (att.kind === "image" && att.dataUrl) {
              blocks.push({ type: "image_url", image_url: { url: att.dataUrl } });
            } else if (att.kind === "pdf" && att.dataUrl) {
              blocks.push({
                type: "file",
                file: { filename: att.name, file_data: att.dataUrl },
              });
            } else if (att.kind === "text" && att.text) {
              docTexts.push(`📄 محتوى المستند "${att.name}":\n${att.text}`);
            }
          }
          if (docTexts.length > 0) {
            blocks.push({
              type: "text",
              text: `\n\n=== الملفات المرفقة ===\n${docTexts.join("\n\n")}`,
            });
          }
          return { role, content: blocks };
        });

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
              max_tokens: 6000,
              temperature: 0.4,
            }),
          });

          if (res.status === 429) {
            return new Response(
              JSON.stringify({ reply: "تم تجاوز الحد المسموح من الطلبات، حاول بعد قليل.", error: "rate_limit" }),
              { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
            );
          }
          if (res.status === 402) {
            return new Response(
              JSON.stringify({ reply: "انتهى رصيد الذكاء الاصطناعي، يرجى إضافة رصيد لمواصلة الاستخدام.", error: "payment" }),
              { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
            );
          }
          if (!res.ok) {
            const body = await res.text();
            console.error("Legal AI gateway error:", res.status, body);
            return new Response(
              JSON.stringify({ reply: "تعذّر الحصول على رد من المساعد القانوني، حاول مرة أخرى.", error: "gateway" }),
              { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
            );
          }

          const data = await res.json();
          const reply: string =
            data?.choices?.[0]?.message?.content?.trim() ||
            "لم أتمكن من توليد إجابة، أعد صياغة سؤالك.";
          return new Response(JSON.stringify({ reply, error: null }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        } catch (e) {
          console.error("Legal AI error:", e);
          return new Response(
            JSON.stringify({ reply: "حدث خطأ غير متوقع، حاول مرة أخرى.", error: "unknown" }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
          );
        }
      },
    },
  },
});