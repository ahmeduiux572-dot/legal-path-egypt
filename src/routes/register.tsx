import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, Upload, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { plans } from "@/data/content";
import { specialties as specs } from "@/data/lawyers";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "انضم كمحامٍ | محاميك" },
      { name: "description", content: "سجّل كمحامٍ على منصة محاميك، اختر باقتك وارفع بياناتك وصورتك وسيرتك الذاتية." },
      { property: "og:title", content: "انضم كمحامٍ | محاميك" },
      { property: "og:description", content: "اختر باقتك وابدأ استقبال العملاء على منصة محاميك." },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const [plan, setPlan] = useState("pro");
  const [photo, setPhoto] = useState<string | null>(null);
  const [cv, setCv] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-navy">
      <section className="bg-gradient-navy">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center md:px-8">
          <SectionHeading light title="انضم إلى محاميك كمحامٍ" subtitle="اختر الباقة المناسبة، ارفع بياناتك وسيرتك الذاتية، وابدأ استقبال العملاء." />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        {/* Plans */}
        <h3 className="mb-6 text-center text-xl font-bold text-cream">اختر باقتك</h3>
        <div className="mb-14 grid gap-6 lg:grid-cols-3">
          {plans.map((p) => {
            const active = plan === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setPlan(p.id)}
                className={`relative flex flex-col rounded-2xl border p-7 text-start transition-all ${active ? "border-gold bg-navy-card shadow-gold" : "border-white/10 bg-navy-card/50 hover:border-gold/40"}`}
              >
                {p.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-gold px-3 py-0.5 text-xs font-bold text-navy">الأكثر طلباً</span>
                )}
                <h4 className="text-lg font-bold text-cream">{p.name}</h4>
                <div className="mt-3"><span className="text-3xl font-extrabold text-gold">{p.price}</span><span className="text-sm text-cream/60"> ج.م / {p.period}</span></div>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-cream/75"><Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{f}</li>
                  ))}
                </ul>
                <span className={`mt-6 rounded-md py-2.5 text-center text-sm font-bold ${active ? "bg-gradient-gold text-navy" : "border border-gold/50 text-cream"}`}>
                  {active ? "الباقة المختارة" : "اختر هذه الباقة"}
                </span>
              </button>
            );
          })}
        </div>

        {/* Form */}
        {submitted ? (
          <div className="mx-auto max-w-2xl rounded-2xl border border-gold/30 bg-navy-card/60 p-10 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-gold" />
            <h3 className="mt-4 text-xl font-bold text-cream">تم استلام طلب التسجيل بنجاح</h3>
            <p className="mt-2 text-sm text-cream/70">سيقوم فريقنا بمراجعة بياناتك والتواصل معك لتفعيل حسابك على المنصة.</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-navy-card/50 p-7"
          >
            <h3 className="mb-5 text-lg font-bold text-cream">بياناتك</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="الاسم الكامل" required />
              <Field label="رقم نقابة المحامين" required />
              <Field label="البريد الإلكتروني" type="email" required />
              <Field label="رقم الهاتف" type="tel" required />
              <div>
                <label className="mb-1.5 block text-sm text-cream/80">التخصص</label>
                <select className="w-full rounded-lg border border-white/15 bg-navy-deep px-3 py-2.5 text-sm text-cream focus:border-gold focus:outline-none">
                  {specs.slice(1).map((s) => (<option key={s}>{s}</option>))}
                </select>
              </div>
              <Field label="المدينة" required />
            </div>

            <div className="mt-4">
              <label className="mb-1.5 block text-sm text-cream/80">نبذة تعريفية</label>
              <textarea rows={3} className="w-full rounded-lg border border-white/15 bg-navy-deep px-3 py-2.5 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none" placeholder="اكتب نبذة مختصرة عن خبرتك..." />
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <FileInput label="الصورة الشخصية" value={photo} onChange={setPhoto} accept="image/*" />
              <FileInput label="السيرة الذاتية (CV)" value={cv} onChange={setCv} accept=".pdf,.doc,.docx" />
            </div>

            <button type="submit" className="mt-6 w-full rounded-lg bg-gradient-gold py-3 text-sm font-bold text-navy shadow-gold transition-transform hover:-translate-y-0.5">
              إرسال طلب التسجيل
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({ label, type = "text", required }: { label: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm text-cream/80">{label}</label>
      <input type={type} required={required} className="w-full rounded-lg border border-white/15 bg-navy-deep px-3 py-2.5 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none" />
    </div>
  );
}

function FileInput({ label, value, onChange, accept }: { label: string; value: string | null; onChange: (v: string) => void; accept: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm text-cream/80">{label}</label>
      <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-white/25 bg-navy-deep px-3 py-2.5 text-sm text-cream/70 transition-colors hover:border-gold/50">
        <Upload className="h-4 w-4 text-gold" />
        <span className="truncate">{value ?? "اختر ملفاً"}</span>
        <input type="file" accept={accept} className="hidden" onChange={(e) => onChange(e.target.files?.[0]?.name ?? "")} />
      </label>
    </div>
  );
}