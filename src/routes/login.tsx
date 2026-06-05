import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Lock, LogIn, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "تسجيل الدخول | محام" },
      { name: "description", content: "سجّل الدخول إلى حسابك على منصة محام للوصول إلى استشاراتك وقضاياك ونماذجك القانونية." },
      { property: "og:title", content: "تسجيل الدخول | محام" },
      { property: "og:description", content: "ادخل إلى حسابك على منصة محام." },
    ],
  }),
  component: LoginPage,
});

const inputBase =
  "w-full rounded-lg border border-white/15 bg-navy-deep px-10 py-2.5 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none";

function LoginPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-navy">
      <section className="bg-gradient-navy">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center md:px-8">
          <h1 className="text-2xl font-extrabold text-gradient-gold md:text-3xl">تسجيل الدخول</h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-cream/70">
            مرحباً بعودتك، ادخل بياناتك للوصول إلى حسابك على منصة محام.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-md px-4 py-12 md:px-8">
        {submitted ? (
          <div className="rounded-2xl border border-gold/30 bg-navy-card/60 p-10 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-gold" />
            <h3 className="mt-4 text-xl font-bold text-cream">تم تسجيل الدخول بنجاح</h3>
            <p className="mt-2 text-sm text-cream/70">يسعدنا عودتك إلى منصة محام.</p>
            <Link to="/" className="mt-5 inline-block rounded-lg bg-gradient-gold px-6 py-2.5 text-sm font-bold text-navy shadow-gold">
              الذهاب للرئيسية
            </Link>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            className="rounded-2xl border border-white/10 bg-navy-card/50 p-7"
          >
            <div className="mb-4">
              <label className="mb-1.5 block text-sm text-cream/80">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream/50" />
                <input type="email" required className={inputBase} placeholder="example@email.com" />
              </div>
            </div>
            <div className="mb-3">
              <label className="mb-1.5 block text-sm text-cream/80">كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream/50" />
                <input type="password" required minLength={6} className={inputBase} placeholder="••••••••" />
              </div>
            </div>
            <div className="mb-5 flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-cream/70">
                <input type="checkbox" className="accent-gold" />
                تذكرني
              </label>
              <a href="#" className="text-gold hover:underline">نسيت كلمة المرور؟</a>
            </div>
            <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-gold py-3 text-sm font-bold text-navy shadow-gold transition-transform hover:-translate-y-0.5">
              <LogIn className="h-4 w-4" />
              تسجيل الدخول
            </button>
            <p className="mt-5 text-center text-sm text-cream/70">
              ليس لديك حساب؟{" "}
              <Link to="/register" className="font-semibold text-gold hover:underline">انضم كمحامٍ</Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}