import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Check, Upload, CheckCircle2, Scale, User } from "lucide-react";
import logoImg from "@/assets/mohaam-logo-v2.png";
import { SectionHeading } from "@/components/SectionHeading";
import { plans } from "@/data/content";
import { specialties as specs } from "@/data/lawyers";
import { login } from "@/lib/auth";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "إنشاء حساب | محام" },
      { name: "description", content: "أنشئ حسابك على منصة محام كعميل لطلب الاستشارات، أو كمحامٍ لاستقبال العملاء." },
      { property: "og:title", content: "إنشاء حساب | محام" },
      { property: "og:description", content: "انضم إلى منصة محام كعميل أو كمحامٍ." },
    ],
  }),
  component: RegisterPage,
});

type Role = "client" | "lawyer";

function RegisterPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("client");
  const [plan, setPlan] = useState("pro");
  const [photo, setPhoto] = useState<string | null>(null);
  const [cv, setCv] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "client") {
      login({ role: "client", email });
      navigate({ to: "/account" });
    } else {
      setSubmitted(true);
    }
  };

  return (
    <div className="bg-navy">
      <section className="bg-gradient-navy">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center md:px-8">
          <div className="mb-6 flex items-center justify-center">
            <img
              src={logoImg}
              alt="شعار منصة مُحامٍ"
              width={1280}
              height={640}
              className="h-14 w-auto object-contain md:h-16"
            />
          </div>
          <SectionHeading
            light
            title="انضم إلى منصة مُحامٍ"
            subtitle={role === "client" ? "أنشئ حسابك كعميل لطلب الاستشارات ونشر قضاياك ومتابعتها." : "اختر الباقة المناسبة، ارفع بياناتك وسيرتك الذاتية، وابدأ استقبال العملاء."}
          />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        {/* Role switcher */}
        <div className="mx-auto mb-10 grid max-w-md grid-cols-2 gap-2 rounded-xl border border-white/10 bg-navy-card/60 p-1.5">
          <button
            onClick={() => setRole("client")}
            className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-bold transition-all ${role === "client" ? "bg-gradient-gold text-navy shadow-gold" : "text-cream/70 hover:text-cream"}`}
          >
            <User className="h-4 w-4" /> عميل
          </button>
          <button
            onClick={() => setRole("lawyer")}
            className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-bold transition-all ${role === "lawyer" ? "bg-gradient-gold text-navy shadow-gold" : "text-cream/70 hover:text-cream"}`}
          >
            <Scale className="h-4 w-4" /> محامٍ
          </button>
        </div>

        {/* Plans (lawyers only) */}
        {role === "lawyer" && (
         <>
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
         </>
        )}

        {/* Form */}
        {submitted ? (
          <div className="mx-auto max-w-2xl rounded-2xl border border-gold/30 bg-navy-card/60 p-10 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-gold" />
            <h3 className="mt-4 text-xl font-bold text-cream">تم استلام طلب التسجيل بنجاح</h3>
            <p className="mt-2 text-sm text-cream/70">سيقوم فريقنا بمراجعة بياناتك والتواصل معك لتفعيل حسابك على المنصة.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-navy-card/50 p-7"
          >
            <h3 className="mb-5 text-lg font-bold text-cream">بياناتك</h3>
            {role === "client" ? (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="الاسم الكامل" required />
                  <div>
                    <label className="mb-1.5 block text-sm text-cream/80">البريد الإلكتروني</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-white/15 bg-navy-deep px-3 py-2.5 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
                    />
                  </div>
                  <Field label="رقم الهاتف" type="tel" required />
                  <Field label="المدينة" required />
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-sm text-cream/80">كلمة المرور</label>
                    <input type="password" required placeholder="••••••••" className="w-full rounded-lg border border-white/15 bg-navy-deep px-3 py-2.5 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none" />
                  </div>
                </div>
                <button type="submit" className="mt-6 w-full rounded-lg bg-gradient-gold py-3 text-sm font-bold text-navy shadow-gold transition-transform hover:-translate-y-0.5">
                  إنشاء حساب العميل
                </button>
              </>
            ) : (
              <>
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
              </>
            )}
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