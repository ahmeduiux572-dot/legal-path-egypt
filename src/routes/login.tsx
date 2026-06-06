import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Lock, CheckCircle2, Scale, User } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "تسجيل الدخول | محام" },
      { name: "description", content: "سجّل الدخول إلى منصة محام كمحامٍ أو كعميل للوصول إلى حسابك واستشاراتك." },
      { property: "og:title", content: "تسجيل الدخول | محام" },
      { property: "og:description", content: "ادخل إلى حسابك على منصة محام كمحامٍ أو عميل." },
    ],
  }),
  component: LoginPage,
});

type Role = "client" | "lawyer";

function LoginPage() {
  const [role, setRole] = useState<Role>("client");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-navy">
      <section className="bg-gradient-navy">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center md:px-8">
          <SectionHeading light title="تسجيل الدخول" subtitle="ادخل إلى حسابك على منصة محام للوصول إلى استشاراتك وخدماتك." />
        </div>
      </section>

      <div className="mx-auto max-w-md px-4 py-12 md:px-8">
        {submitted ? (
          <div className="rounded-2xl border border-gold/30 bg-navy-card/60 p-10 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-gold" />
            <h3 className="mt-4 text-xl font-bold text-cream">تم تسجيل الدخول بنجاح</h3>
            <p className="mt-2 text-sm text-cream/70">
              مرحباً بك مجدداً في منصة محام {role === "lawyer" ? "كمحامٍ" : "كعميل"}.
            </p>
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-navy-card/50 p-7">
            <div className="mb-6 grid grid-cols-2 gap-2 rounded-lg border border-white/10 bg-navy-deep p-1">
              <button
                onClick={() => setRole("client")}
                className={`flex items-center justify-center gap-2 rounded-md py-2.5 text-sm font-bold transition-colors ${role === "client" ? "bg-gradient-gold text-navy" : "text-cream/70"}`}
              >
                <User className="h-4 w-4" /> عميل
              </button>
              <button
                onClick={() => setRole("lawyer")}
                className={`flex items-center justify-center gap-2 rounded-md py-2.5 text-sm font-bold transition-colors ${role === "lawyer" ? "bg-gradient-gold text-navy" : "text-cream/70"}`}
              >
                <Scale className="h-4 w-4" /> محامٍ
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm text-cream/80">البريد الإلكتروني</label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" />
                  <input type="email" required placeholder="example@email.com" className="w-full rounded-lg border border-white/15 bg-navy-deep px-3 py-2.5 pr-9 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm text-cream/80">كلمة المرور</label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" />
                  <input type="password" required placeholder="••••••••" className="w-full rounded-lg border border-white/15 bg-navy-deep px-3 py-2.5 pr-9 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none" />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-cream/70">
                  <input type="checkbox" className="accent-gold" /> تذكّرني
                </label>
                <button type="button" className="text-gold hover:underline">نسيت كلمة المرور؟</button>
              </div>

              <button type="submit" className="w-full rounded-lg bg-gradient-gold py-3 text-sm font-bold text-navy shadow-gold transition-transform hover:-translate-y-0.5">
                تسجيل الدخول
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-cream/70">
              {role === "lawyer" ? (
                <>ليس لديك حساب محامٍ؟ <Link to="/register" className="font-semibold text-gold hover:underline">انضم كمحامٍ</Link></>
              ) : (
                <>ليس لديك حساب؟ <Link to="/register" className="font-semibold text-gold hover:underline">سجّل الآن</Link></>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
