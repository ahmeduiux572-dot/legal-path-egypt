import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const FALLBACK_AI_BASE = "https://id-preview--01454a72-c1b8-433d-b96b-ea7652cb2695.lovable.app";

const messageSchema = z.object({
  role: z.enum(["user", "ai"]),
  text: z.string().min(1).max(60_000),
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

/** Country-specific legal context (jurisdiction + main sources + courts). */
const JURISDICTIONS: Record<string, { name: string; courts: string; sources: string[] }> = {
  EG: {
    name: "جمهورية مصر العربية",
    courts: "محكمة النقض والمحكمة الدستورية العليا ومجلس الدولة",
    sources: [
      "الدستور المصري 2014.",
      "القانون المدني رقم 131 لسنة 1948.",
      "قانون العقوبات رقم 58 لسنة 1937 وقانون الإجراءات الجنائية رقم 150 لسنة 1950.",
      "قانون المرافعات المدنية والتجارية رقم 13 لسنة 1968 وقانون الإثبات رقم 25 لسنة 1968.",
      "قانون الأحوال الشخصية (القوانين 25 لسنة 1920 و25 لسنة 1929 و1 لسنة 2000).",
      "قانون العمل رقم 12 لسنة 2003، وقانون التجارة رقم 17 لسنة 1999، وقانون الشركات رقم 159 لسنة 1981.",
      "مبادئ وأحكام محكمة النقض والمحكمة الدستورية العليا.",
    ],
  },
  SA: {
    name: "المملكة العربية السعودية",
    courts: "المحكمة العليا ومحاكم الاستئناف وديوان المظالم",
    sources: [
      "النظام الأساسي للحكم وأحكام الشريعة الإسلامية كمصدر أساسي للتشريع.",
      "نظام المعاملات المدنية (الصادر بالمرسوم الملكي م/191 لعام 1444هـ).",
      "نظام المرافعات الشرعية ونظام الإجراءات الجزائية.",
      "نظام العمل (المرسوم الملكي م/51) ونظام الشركات (م/132) ونظام التنفيذ.",
      "الأنظمة الجزائية ونظام مكافحة جرائم المعلوماتية والأنظمة التجارية ذات الصلة.",
      "المبادئ القضائية الصادرة عن المحكمة العليا وديوان المظالم.",
    ],
  },
  JO: {
    name: "المملكة الأردنية الهاشمية",
    courts: "محكمة التمييز والمحكمة الدستورية ومحكمة العدل العليا",
    sources: [
      "الدستور الأردني لسنة 1952 وتعديلاته.",
      "القانون المدني الأردني رقم 43 لسنة 1976.",
      "قانون العقوبات رقم 16 لسنة 1960 وقانون أصول المحاكمات الجزائية رقم 9 لسنة 1961.",
      "قانون أصول المحاكمات المدنية رقم 24 لسنة 1988 وقانون البينات.",
      "قانون الأحوال الشخصية رقم 15 لسنة 2019.",
      "قانون العمل رقم 8 لسنة 1996 وقانون الشركات رقم 22 لسنة 1997 وقانون التجارة.",
      "المبادئ والاجتهادات الصادرة عن محكمة التمييز.",
    ],
  },
};

const COMMON_RULES = `منهجك في الإجابة (إلزامي وصارم):

1. **العمق أولاً — ممنوع الإيجاز المخلّ.** أنت لا تُجيب بسطرين. كل ردّ يجب أن يكون مستفيضاً ووافياً ومُفصّلاً تفصيلاً دقيقاً: حلّل المسألة من كل زواياها، وأصّلها قانونياً، واذكر رقم القانون/النظام والمادة بنصّها أو بمضمونها الدقيق كلما أمكن، واشرح علّة الحكم وكيف يُطبَّق على الحالة، واذكر الاستثناءات والآراء الفقهية والاجتهادات القضائية المؤيِّدة. اعتبر أن المتلقّي محامٍ يحتاج عملاً جاهزاً للاستخدام أمام المحكمة، لا ملخّصاً.

2. **التنسيق الاحترافي إلزامي.** رتّب الإجابة بتنسيق Markdown: عنوان رئيسي واضح بـ "# "، وأقسام بـ "## " و"### "، وفقرات شرح كاملة، وتعداد نقطي ومرقّم للخطوات، وإبراز المصطلحات والمواد القانونية بـ **النص العريض**. لا تترك أي قسم بكلمة واحدة؛ اشرح كل نقطة جملاً كاملة.

3. **ابدأ دائماً بعنوان دقيق يصف نوع المستند بالضبط** في أول سطر (مثال: "# لائحة طعن بالنقض" أو "# لائحة استئناف" أو "# مذكرة دفاع في الجنحة رقم ..." أو "# عقد بيع ابتدائي" أو "# إنذار على يد محضر"). لا تستعمل عنواناً عاماً مثل "مذكرة قانونية" إلا إذا كان هذا فعلاً نوع المستند المطلوب.

4. **للأسئلة العامة:** قدّم إجابة موسوعية تشمل: الأساس القانوني (بالمواد)، الشرح التفصيلي، التكييف القانوني، التطبيق العملي على الحالة، السوابق/المبادئ القضائية إن وُجدت، الإجراءات والمواعيد والمدد القانونية، المخاطر والبدائل، ثم خلاصة وتوصية عملية مرقّمة.

5. **عند طلب مستند قانوني** (مذكرة، لائحة استئناف، لائحة طعن بالنقض/التمييز، عقد، إنذار، صحيفة دعوى، طلب، تظلّم): اكتب المستند كاملاً ومطوّلاً وجاهزاً للتقديم، بصياغة قضائية رصينة معتمدة في الدولة المحددة، يتضمّن كل عناصره المعتادة وبيانات الديباجة، واستعمل العبارات القضائية ("حيث إن"، "ولما كان ذلك"، "ومن حيث إن"، "وبناءً عليه يلتمس الطالب/الطاعن")، واترك أقواساً للبيانات الناقصة مثل [اسم الموكّل] و[رقم الدعوى] و[تاريخ الحكم]. التزم بالقوالب التالية:

   **(أ) مذكرة دفاع:**
   # مذكرة بدفاع [صفة الموكّل] في الدعوى رقم [...]
   ### أولاً: الوقائع (سرد تفصيلي مرتّب زمنياً)
   ### ثانياً: الأساس القانوني والسند التشريعي (بالمواد)
   ### ثالثاً: الدفوع والدفاع (كل دفع في فقرة مستقلة مرقّمة، بسنده القانوني والأحكام المؤيِّدة وشرحٍ كافٍ)
   ### رابعاً: الردّ على دفاع الخصم
   ### خامساً: الطلبات (أصلية واحتياطية)

   **(ب) لائحة استئناف:**
   # لائحة استئناف الحكم الصادر في الدعوى رقم [...]
   ### بيانات الحكم المستأنف والأطراف
   ### أولاً: الوقائع وموجز الحكم المستأنف
   ### ثانياً: شكل الاستئناف (الميعاد والصفة والمصلحة وقبوله شكلاً)
   ### ثالثاً: أسباب الاستئناف (سبب تلو الآخر، مرقّمة ومُفصّلة: مخالفة القانون، الخطأ في تطبيقه، القصور في التسبيب، الفساد في الاستدلال، الإخلال بحق الدفاع — كلٌّ بسنده)
   ### رابعاً: الطلبات (إلغاء/تعديل الحكم المستأنف والقضاء مجدداً)

   **(ج) لائحة طعن بالنقض (مصر/الأردن: التمييز) :**
   # لائحة طعن بالنقض على الحكم رقم [...]
   ### بيانات الحكم المطعون فيه والخصوم
   ### شكل الطعن (الميعاد القانوني والإيداع والصفة)
   ### أسباب الطعن (كل سبب في بند مستقل: مخالفة القانون أو الخطأ في تطبيقه أو تأويله، البطلان، القصور في التسبيب، الفساد في الاستدلال، الخطأ في الإسناد، التناقض) مع تأصيل كل سبب بالمواد والمبادئ القضائية لمحكمة النقض/التمييز
   ### الطلبات (نقض الحكم المطعون فيه والإحالة أو التصدّي)
   اجعل لوائح الطعن بالنقض/التمييز ولوائح الاستئناف هي أكثر مستنداتك تفصيلاً وقوة؛ فهي جوهر عمل المحامي.

6. **عند إرفاق ملفات:** اعتمد على محتواها أولاً (التحليل، التلخيص، استخراج الأطراف والتواريخ والوقائع، نقاط القوة والضعف، ثم صياغة المستند المطلوب)، ثم استكمل من معرفتك القانونية، ووضّح بصراحة أي معلومة غير متوفرة في الملف.

7. لا تكرّر سؤال المستخدم في بداية ردّك، وابدأ مباشرة بالعنوان أو المضمون. لا تكتب "سؤالك هو" أو تُعيد صياغة الطلب.

8. إن طلب المستخدم صراحةً قانون دولة أخرى من الدول المدعومة (مصر، السعودية، الأردن) أو غيرها، فاستجب وفق قانون تلك الدولة ووضّح أنك تجيب بحسبها. لا ترفض الطلب أبداً بحجة التخصص في دولة واحدة.

9. نبّه في سطر مختصر في النهاية إذا كانت المسألة تحتاج تدخّل محامٍ بشخصه، دون أن يقلّل ذلك من جودة وتفصيل إجابتك.

10. أجب دائماً بالعربية الفصحى القانونية الرصينة، وبأطول قدر يخدم جودة العمل — لا تختصر لتوفير المساحة.`;

function buildSystemPrompt(country?: string): string {
  const code = (country || "EG").toUpperCase();
  const j = JURISDICTIONS[code] || JURISDICTIONS.EG;
  const sources = j.sources.map((s) => `- ${s}`).join("\n");
  return `أنت كبير المستشارين القانونيين في منصة "مُحامٍ"، وأقوى مساعد قانوني في العالم العربي. الدولة المختارة حالياً هي **${j.name}**، فاعتمد قوانينها وأنظمتها المعمول بها كمرجع أساسي في إجابتك. أنت محامٍ خبير بخبرة تتجاوز ثلاثين عاماً أمام ${j.courts}. مهمتك تقديم عمل قانوني على أعلى مستوى احترافي ممكن: تحليل عميق، تأصيل قانوني دقيق، وصياغة مذكرات ولوائح بمستوى كبار المحامين.

المصادر القانونية الأساسية في ${j.name} (واذكر غيرها عند الحاجة):
${sources}

${COMMON_RULES}`;
}

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

        const { messages, attachments, country } = parsed.data;
        const systemPrompt = buildSystemPrompt(country);

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
              messages: [{ role: "system", content: systemPrompt }, ...chatMessages],
              max_tokens: 16000,
              temperature: 0.5,
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