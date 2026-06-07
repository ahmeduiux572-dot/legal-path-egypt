import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LogOut, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/admin/parts";
import { adminLogout, ADMIN_EMAIL } from "@/lib/admin-auth";

export const Route = createFileRoute("/admin/settings")({ component: SettingsPage });

const toggles = [
  { label: "تفعيل تسجيل محامين جدد", on: true },
  { label: "إظهار سوق القضايا للعملاء", on: true },
  { label: "تفعيل المساعد القانوني الذكي", on: true },
  { label: "إشعارات البريد الإلكتروني للإدارة", on: false },
  { label: "وضع الصيانة", on: false },
];

const fields = [
  { label: "اسم المنصة", value: "مُحامٍ" },
  { label: "البريد الرسمي", value: "info@mohamy.eg" },
  { label: "الدولة", value: "مصر" },
  { label: "العملة", value: "جنيه مصري (ج.م)" },
  { label: "نسبة الضريبة", value: "14%" },
];

function SettingsPage() {
  const navigate = useNavigate();
  const handleLogout = () => {
    adminLogout();
    navigate({ to: "/admin" });
  };

  return (
    <>
      <PageHeader title="الإعدادات" subtitle="إعدادات المنصة وحساب الإدارة" />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-navy-card/50 p-6 shadow-lg">
          <h2 className="mb-4 text-lg font-bold text-cream">معلومات المنصة</h2>
          <div className="space-y-3">
            {fields.map((f) => (
              <div key={f.label} className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0">
                <span className="text-sm text-cream/60">{f.label}</span>
                <span className="text-sm font-semibold text-cream">{f.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-navy-card/50 p-6 shadow-lg">
          <h2 className="mb-4 text-lg font-bold text-cream">إعدادات عامة</h2>
          <div className="space-y-3">
            {toggles.map((t) => (
              <div key={t.label} className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0">
                <span className="text-sm text-cream/80">{t.label}</span>
                <span
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    t.on ? "bg-gold" : "bg-white/15"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      t.on ? "-translate-x-1" : "-translate-x-6"
                    }`}
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-navy-card/50 p-6 shadow-lg">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-cream">
          <ShieldCheck className="h-5 w-5 text-gold" /> حساب الإدارة
        </h2>
        <p className="text-sm text-cream/70">
          أنت مسجّل الدخول كـ <span dir="ltr" className="font-semibold text-cream">{ADMIN_EMAIL}</span>
        </p>
        <button
          onClick={handleLogout}
          className="mt-4 flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-300 transition-colors hover:bg-red-500/20"
        >
          <LogOut className="h-4 w-4" /> تسجيل الخروج
        </button>
      </div>
    </>
  );
}
