import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Mail, Lock, CheckCircle2, Scale, User } from "lucide-react";
import loginBg from "@/assets/login-bg.jpg";
import { login } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "تسجيل الدخول | مُحامٍ" },
      { name: "description", content: "سجّل الدخول إلى منصة مُحامٍ كمحامٍ أو كعميل للوصول إلى حسابك واستشاراتك." },
      { property: "og:title", content: "تسجيل الدخول | مُحامٍ" },
      { property: "og:description", content: "ادخل إلى حسابك على منصة مُحامٍ كمحامٍ أو عميل." },
    ],
  }),
  component: LoginPage,
});

type Role = "client" | "lawyer";

function LoginPage() {
  const [role, setRole] = useState<Role>("client");
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ role, email });
    if (role === "lawyer") {
      navigate({ to: "/dashboard" });
    } else {
      navigate({ to: "/account" });
    }
  };

  return (
    <div
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-navy-deep px-4 py-12"
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-navy-deep/75" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/60 to-navy-deep/40" />

      {/* Centered form on top of background */}
      <div className="relative z-10 flex w-full flex-col items-center justify-center">
        {/* Logo */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gold/30 bg-navy-card/60">
            <Scale className="h-5 w-5 text-gold" />
          </div>
          <span className="text-xl font-bold text-cream">مُحامٍ</span>
        </div>

        {submitted ? (
          <div className="w-full max-w-lg rounded-2xl border border-gold/30 bg-navy-card/80 p-10 text-center backdrop-blur-md">
            <CheckCircle2 className="mx-auto h-12 w-12 text-gold" />
            <h3 className="mt-4 text-xl font-bold text-cream">تم تسجيل الدخول بنجاح</h3>
            <p className="mt-2 text-sm text-cream/70">
              مرحباً بك مجدداً في منصة مُحامٍ {role === "lawyer" ? "كمحامٍ" : "كعميل"}.
            </p>
          </div>
        ) : (
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-navy-card/70 p-6 backdrop-blur-md sm:p-8">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold text-cream">تسجيل الدخول</h1>
              <p className="mt-2 text-sm text-cream/60">
                ادخل إلى حسابك على منصة مُحامٍ للوصول إلى استشاراتك وخدماتك.
              </p>
            </div>

            {/* Role switcher */}
            <div className="mb-6 grid grid-cols-2 gap-2 rounded-xl border border-white/10 bg-navy-deep p-1.5">
              <button
                onClick={() => setRole("client")}
                className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-bold transition-all duration-200 ${
                  role === "client"
                    ? "bg-gradient-gold text-navy shadow-gold"
                    : "text-cream/70 hover:text-cream"
                }`}
              >
                <User className="h-4 w-4" /> عميل
              </button>
              <button
                onClick={() => setRole("lawyer")}
                className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-bold transition-all duration-200 ${
                  role === "lawyer"
                    ? "bg-gradient-gold text-navy shadow-gold"
                    : "text-cream/70 hover:text-cream"
                }`}
              >
                <Scale className="h-4 w-4" /> محامٍ
              </button>
            </div>

            {/* Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-cream/80">البريد الإلكتروني</label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@email.com"
                      className="w-full rounded-lg border border-white/15 bg-navy-deep px-3 py-2.5 pr-9 text-sm text-cream placeholder:text-cream/40 transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-cream/80">كلمة المرور</label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      className="w-full rounded-lg border border-white/15 bg-navy-deep px-3 py-2.5 pr-9 text-sm text-cream placeholder:text-cream/40 transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <label className="flex cursor-pointer items-center gap-2 text-cream/70">
                    <input type="checkbox" className="accent-gold h-3.5 w-3.5 rounded border-white/20" /> تذكّرني
                  </label>
                  <button type="button" className="text-gold transition-colors hover:text-gold-soft hover:underline">
                    نسيت كلمة المرور؟
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-gradient-gold py-3 text-sm font-bold text-navy shadow-gold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-gold"
                >
                  تسجيل الدخول
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-cream/70">
                {role === "lawyer" ? (
                  <>ليس لديك حساب محامٍ؟{" "}
                    <Link to="/register" className="font-semibold text-gold transition-colors hover:text-gold-soft hover:underline">
                      انضم كمحامٍ
                    </Link>
                  </>
                ) : (
                  <>ليس لديك حساب؟{" "}
                    <Link to="/register" className="font-semibold text-gold transition-colors hover:text-gold-soft hover:underline">
                      سجّل الآن
                    </Link>
                  </>
                )}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
