import { useState } from "react";
import { ShieldCheck, Lock, Mail, Loader2 } from "lucide-react";
import { adminLogin } from "@/lib/admin-auth";

export function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      const ok = adminLogin(email, password);
      if (!ok) {
        setError("البريد الإلكتروني أو كلمة السر غير صحيحة.");
        setLoading(false);
      }
    }, 350);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-navy-deep via-navy to-navy-deep px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gold/15 text-gold ring-1 ring-gold/30">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-extrabold text-cream">لوحة تحكم الإدارة</h1>
          <p className="mt-2 text-sm text-cream/60">سجّل الدخول للوصول إلى لوحة إدارة منصة مُحامٍ</p>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-white/10 bg-navy-card/70 p-6 shadow-2xl backdrop-blur"
        >
          <label className="mb-2 block text-sm font-semibold text-cream/80">البريد الإلكتروني</label>
          <div className="relative mb-4">
            <Mail className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream/40" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@mohamy.eg"
              required
              dir="ltr"
              className="w-full rounded-xl border border-white/10 bg-navy-deep/60 px-4 py-2.5 pr-10 text-right text-cream placeholder:text-cream/30 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/40"
            />
          </div>

          <label className="mb-2 block text-sm font-semibold text-cream/80">كلمة السر</label>
          <div className="relative mb-5">
            <Lock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream/40" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              dir="ltr"
              className="w-full rounded-xl border border-white/10 bg-navy-deep/60 px-4 py-2.5 pr-10 text-right text-cream placeholder:text-cream/30 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/40"
            />
          </div>

          {error && (
            <p className="mb-4 rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-gold to-gold-soft px-4 py-2.5 font-bold text-navy-deep transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            تسجيل الدخول
          </button>

          <p className="mt-5 rounded-lg bg-white/[0.03] px-3 py-2 text-center text-xs leading-relaxed text-cream/45">
            بيانات الدخول التجريبية:<br />
            <span dir="ltr" className="text-cream/70">admin@mohamy.eg</span> / <span dir="ltr" className="text-cream/70">mohamy2026</span>
          </p>
        </form>
      </div>
    </div>
  );
}
