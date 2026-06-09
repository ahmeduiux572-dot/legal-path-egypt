import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { type Country } from "@/data/countries";

const linesToArr = (s: string) =>
  s
    .split("\n")
    .map((x) => x.trim())
    .filter(Boolean);
const arrToLines = (a: string[]) => a.join("\n");

const emptyCountry: Country = {
  code: "",
  name: "",
  flag: "",
  dialCode: "+",
  currency: { code: "", symbol: "", locale: "ar" },
  vat: 0,
  cities: [],
  courts: [],
  withdrawalMethods: [],
  caseTypes: [],
  sessionTypes: [],
  invoiceItems: [],
  caseDegrees: [],
  terms: { cassationCourt: "", bailiff: "", prosecution: "", attorneyDoc: "", firstInstance: "" },
  marketing: { heroBadge: "", heroLead: "", aboutTitle: "", aboutBody: "", pitches: [] },
};

const inputCls =
  "w-full rounded-lg border border-white/10 bg-navy-deep/60 px-3 py-2 text-sm text-cream outline-none focus:border-gold";
const labelCls = "mb-1.5 block text-xs font-semibold text-cream/70";

function Txt({ label, value, onChange, ltr, hint }: { label: string; value: string; onChange: (v: string) => void; ltr?: boolean; hint?: string }) {
  return (
    <div>
      <label className={labelCls}>{label}{hint && <span className="text-cream/40"> — {hint}</span>}</label>
      <input dir={ltr ? "ltr" : "rtl"} className={inputCls} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function Area({ label, value, onChange, rows = 3, hint }: { label: string; value: string; onChange: (v: string) => void; rows?: number; hint?: string }) {
  return (
    <div>
      <label className={labelCls}>{label}{hint && <span className="text-cream/40"> — {hint}</span>}</label>
      <textarea rows={rows} className={inputCls} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="rounded-xl border border-white/10 bg-navy-deep/30 p-4">
    <h3 className="mb-3 text-sm font-bold text-gold">{title}</h3>
    <div className="grid gap-3 sm:grid-cols-2">{children}</div>
  </div>
);

export function CountryFormDialog({
  open,
  onOpenChange,
  initial,
  existingCodes,
  onSave,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initial: Country | null; // null = إضافة دولة جديدة
  existingCodes: string[];
  onSave: (c: Country) => void;
}) {
  const isEdit = !!initial;
  const [c, setC] = useState<Country>(initial ?? emptyCountry);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (open) {
      setC(initial ? JSON.parse(JSON.stringify(initial)) : JSON.parse(JSON.stringify(emptyCountry)));
      setErr("");
    }
  }, [open, initial]);

  const set = <K extends keyof Country>(k: K, v: Country[K]) => setC((p) => ({ ...p, [k]: v }));

  const submit = () => {
    const code = c.code.trim().toUpperCase();
    if (!code) return setErr("كود الدولة مطلوب");
    if (!c.name.trim()) return setErr("اسم الدولة مطلوب");
    if (!isEdit && existingCodes.includes(code)) return setErr("كود الدولة موجود بالفعل");
    onSave({ ...c, code });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent dir="rtl" className="max-h-[90vh] max-w-3xl overflow-y-auto border-white/10 bg-navy-card text-cream">
        <DialogHeader>
          <DialogTitle className="text-start text-cream">
            {isEdit ? `تعديل دولة: ${initial?.name}` : "إضافة دولة جديدة"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Section title="المعلومات الأساسية">
            <div className={isEdit ? "opacity-60" : ""}>
              <label className={labelCls}>كود الدولة {isEdit ? "(غير قابل للتعديل)" : "— مثل EG"}</label>
              <input dir="ltr" disabled={isEdit} className={inputCls} value={c.code} onChange={(e) => set("code", e.target.value)} />
            </div>
            <Txt label="الاسم" value={c.name} onChange={(v) => set("name", v)} />
            <Txt label="العلم (إيموجي)" value={c.flag} onChange={(v) => set("flag", v)} hint="مثل 🇪🇬" />
            <Txt label="كود الاتصال" value={c.dialCode} onChange={(v) => set("dialCode", v)} ltr hint="مثل +20" />
          </Section>

          <Section title="العملة والضرائب">
            <Txt label="رمز العملة" value={c.currency.symbol} onChange={(v) => set("currency", { ...c.currency, symbol: v })} hint="مثل ج.م" />
            <Txt label="كود العملة" value={c.currency.code} onChange={(v) => set("currency", { ...c.currency, code: v })} ltr hint="مثل EGP" />
            <Txt label="Locale" value={c.currency.locale} onChange={(v) => set("currency", { ...c.currency, locale: v })} ltr hint="مثل ar-EG" />
            <div>
              <label className={labelCls}>نسبة الضريبة %</label>
              <input type="number" className={inputCls} value={c.vat} onChange={(e) => set("vat", Number(e.target.value))} />
            </div>
          </Section>

          <Section title="القوائم (كل سطر = عنصر)">
            <Area label="المدن" value={arrToLines(c.cities)} onChange={(v) => set("cities", linesToArr(v))} rows={4} />
            <Area label="المحاكم" value={arrToLines(c.courts)} onChange={(v) => set("courts", linesToArr(v))} rows={4} />
            <Area label="وسائل السحب" value={arrToLines(c.withdrawalMethods)} onChange={(v) => set("withdrawalMethods", linesToArr(v))} rows={4} />
            <Area label="أنواع القضايا" value={arrToLines(c.caseTypes)} onChange={(v) => set("caseTypes", linesToArr(v))} rows={4} />
            <Area label="أنواع الجلسات" value={arrToLines(c.sessionTypes)} onChange={(v) => set("sessionTypes", linesToArr(v))} rows={4} />
            <Area label="بنود الفواتير" value={arrToLines(c.invoiceItems)} onChange={(v) => set("invoiceItems", linesToArr(v))} rows={4} />
            <Area label="درجات التقاضي" value={arrToLines(c.caseDegrees)} onChange={(v) => set("caseDegrees", linesToArr(v))} rows={4} />
          </Section>

          <Section title="المصطلحات القانونية">
            <Txt label="أعلى محكمة طعن" value={c.terms.cassationCourt} onChange={(v) => set("terms", { ...c.terms, cassationCourt: v })} />
            <Txt label="المُحضِر / المُبلّغ" value={c.terms.bailiff} onChange={(v) => set("terms", { ...c.terms, bailiff: v })} />
            <Txt label="جهة الادعاء" value={c.terms.prosecution} onChange={(v) => set("terms", { ...c.terms, prosecution: v })} />
            <Txt label="وثيقة التوكيل" value={c.terms.attorneyDoc} onChange={(v) => set("terms", { ...c.terms, attorneyDoc: v })} />
            <Txt label="محكمة الدرجة الأولى" value={c.terms.firstInstance} onChange={(v) => set("terms", { ...c.terms, firstInstance: v })} />
          </Section>

          <Section title="النصوص التسويقية (لهجة الدولة)">
            <Txt label="شارة الهيرو" value={c.marketing.heroBadge} onChange={(v) => set("marketing", { ...c.marketing, heroBadge: v })} />
            <Txt label="عنوان قسم التعريف" value={c.marketing.aboutTitle} onChange={(v) => set("marketing", { ...c.marketing, aboutTitle: v })} />
            <div className="sm:col-span-2"><Area label="نص الهيرو" value={c.marketing.heroLead} onChange={(v) => set("marketing", { ...c.marketing, heroLead: v })} /></div>
            <div className="sm:col-span-2"><Area label="نص التعريف" value={c.marketing.aboutBody} onChange={(v) => set("marketing", { ...c.marketing, aboutBody: v })} /></div>
            <div className="sm:col-span-2"><Area label="عبارات الإعلانات (كل سطر = عبارة)" value={arrToLines(c.marketing.pitches)} onChange={(v) => set("marketing", { ...c.marketing, pitches: linesToArr(v) })} rows={4} /></div>
          </Section>

          {err && <p className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">{err}</p>}

          <div className="flex justify-end gap-3 pt-1">
            <button onClick={() => onOpenChange(false)} className="rounded-xl border border-white/15 px-5 py-2.5 text-sm font-semibold text-cream/80 transition-colors hover:bg-white/5">
              إلغاء
            </button>
            <button onClick={submit} className="rounded-xl bg-gradient-gold px-6 py-2.5 text-sm font-bold text-navy shadow-gold">
              {isEdit ? "حفظ التعديلات" : "إضافة الدولة"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}