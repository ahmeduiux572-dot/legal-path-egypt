import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LogOut, ShieldCheck, Globe, MapPin, Landmark, Wallet, Plus, Pencil, Trash2, RotateCcw } from "lucide-react";
import { PageHeader } from "@/components/admin/parts";
import { adminLogout, ADMIN_EMAIL } from "@/lib/admin-auth";
import {
  useCountries,
  saveCountry,
  removeCountry,
  resetCountries,
  type Country,
  type CountryCode,
} from "@/data/countries";
import { CountryFormDialog } from "@/components/admin/CountryFormDialog";

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
  const countries = useCountries();
  const [disabled, setDisabled] = useState<CountryCode[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Country | null>(null);
  const toggleCountry = (code: CountryCode) =>
    setDisabled((prev) => (prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]));
  const openAdd = () => { setEditing(null); setDialogOpen(true); };
  const openEdit = (c: Country) => { setEditing(c); setDialogOpen(true); };
  const handleDelete = (c: Country) => {
    if (countries.length <= 1) return;
    if (typeof window !== "undefined" && window.confirm(`حذف دولة «${c.name}»؟`)) removeCountry(c.code);
  };
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

      {/* إدارة الدول */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-navy-card/50 p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-lg font-bold text-cream">
            <Globe className="h-5 w-5 text-gold" /> إدارة الدول
          </h2>
          <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
            {activeCountries.length} / {countries.length} مفعّلة
          </span>
        </div>
        <p className="mb-5 text-sm text-cream/60">
          تحكّم في الدول المتاحة على المنصة وراجع عملة كل دولة ونسبة الضريبة والمحاكم ووسائل السحب الخاصة بها.
        </p>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {countries.map((c) => {
            const on = activeCountries.includes(c.code);
            return (
              <div
                key={c.code}
                className={`rounded-xl border p-4 transition-colors ${
                  on ? "border-gold/30 bg-navy-deep/40" : "border-white/10 bg-navy-deep/20 opacity-70"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl leading-none">{c.flag}</span>
                    <div>
                      <p className="text-sm font-bold text-cream">{c.name}</p>
                      <p className="text-xs text-cream/50" dir="ltr">{c.dialCode}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleCountry(c.code)}
                    aria-label={`تفعيل ${c.name}`}
                    className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
                      on ? "bg-gold" : "bg-white/15"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        on ? "-translate-x-1" : "-translate-x-6"
                      }`}
                    />
                  </button>
                </div>
                <div className="mt-4 space-y-2 text-xs text-cream/70">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="flex items-center gap-1.5 text-cream/50"><Wallet className="h-3.5 w-3.5 text-gold" /> العملة</span>
                    <span className="font-semibold text-cream">{c.currency.symbol} ({c.currency.code})</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-cream/50">نسبة الضريبة</span>
                    <span className="font-semibold text-cream">{c.vat}%</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="flex items-center gap-1.5 text-cream/50"><MapPin className="h-3.5 w-3.5 text-gold" /> المدن</span>
                    <span className="font-semibold text-cream">{c.cities.length} مدينة</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="flex items-center gap-1.5 text-cream/50"><Landmark className="h-3.5 w-3.5 text-gold" /> المحاكم</span>
                    <span className="font-semibold text-cream">{c.courts.length} محكمة</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-cream/50">وسائل السحب</span>
                    <span className="font-semibold text-cream">{c.withdrawalMethods.length} وسيلة</span>
                  </div>
                </div>
              </div>
            );
          })}
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
