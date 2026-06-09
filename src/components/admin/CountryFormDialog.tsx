import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { type Country } from "@/data/countries";
import { Plus, X, ArrowUp, ArrowDown } from "lucide-react";

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

function ListEditor({
  label,
  items,
  onChange,
  placeholder = "اكتب عنصرًا ثم اضغط Enter",
}: {
  label: string;
  items: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}) {
  const [draft, setDraft] = useState("");

  const add = () => {
    const v = draft.trim();
    if (!v) return;
    if (items.some((i) => i.toLowerCase() === v.toLowerCase())) {
      setDraft("");
      return;
    }
    onChange([...items, v]);
    setDraft("");
  };

  const removeAt = (idx: number) => onChange(items.filter((_, i) => i !== idx));

  const move = (idx: number, dir: -1 | 1) => {
    const target = idx + dir;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[idx], next[target]] = [next[target], next[idx]];
    onChange(next);
  };

  const editAt = (idx: number, v: string) =>
    onChange(items.map((it, i) => (i === idx ? v : it)));

  return (
    <div>
      <label className={labelCls}>
        {label}
        <span className="text-cream/40"> — {items.length} عنصر</span>
      </label>

      <div className="flex gap-2">
        <input
          dir="rtl"
          className={inputCls}
          value={draft}
          placeholder={placeholder}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
        />
        <button
          type="button"
          onClick={add}
          className="flex shrink-0 items-center gap-1 rounded-lg bg-gradient-gold px-3 text-sm font-bold text-navy shadow-gold"
        >
          <Plus className="h-4 w-4" />
          إضافة
        </button>
      </div>

      {items.length > 0 && (
        <ul className="mt-2 space-y-1.5">
          {items.map((item, idx) => (
            <li
              key={idx}
              className="group flex items-center gap-1 rounded-lg border border-white/10 bg-navy-deep/40 px-2 py-1.5"
            >
              <span className="w-5 shrink-0 text-center text-xs text-cream/40">{idx + 1}</span>
              <input
                dir="rtl"
                className="min-w-0 flex-1 bg-transparent text-sm text-cream outline-none"
                value={item}
                onChange={(e) => editAt(idx, e.target.value)}
              />
              <div className="flex shrink-0 items-center gap-0.5 opacity-60 transition-opacity group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => move(idx, -1)}
                  disabled={idx === 0}
                  className="rounded p-1 text-cream/60 hover:bg-white/10 hover:text-cream disabled:opacity-30"
                  aria-label="تحريك لأعلى"
                >
                  <ArrowUp className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => move(idx, 1)}
                  disabled={idx === items.length - 1}
                  className="rounded p-1 text-cream/60 hover:bg-white/10 hover:text-cream disabled:opacity-30"
                  aria-label="تحريك لأسفل"
                >
                  <ArrowDown className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => removeAt(idx)}
                  className="rounded p-1 text-red-300/70 hover:bg-red-500/15 hover:text-red-300"
                  aria-label="حذف"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
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

          <Section title="القوائم">
            <ListEditor label="المدن" items={c.cities} onChange={(v) => set("cities", v)} placeholder="أضف مدينة…" />
            <ListEditor label="المحاكم" items={c.courts} onChange={(v) => set("courts", v)} placeholder="أضف محكمة…" />
            <ListEditor label="وسائل السحب" items={c.withdrawalMethods} onChange={(v) => set("withdrawalMethods", v)} placeholder="أضف وسيلة سحب…" />
            <ListEditor label="أنواع القضايا" items={c.caseTypes} onChange={(v) => set("caseTypes", v)} placeholder="أضف نوع قضية…" />
            <ListEditor label="أنواع الجلسات" items={c.sessionTypes} onChange={(v) => set("sessionTypes", v)} placeholder="أضف نوع جلسة…" />
            <ListEditor label="بنود الفواتير" items={c.invoiceItems} onChange={(v) => set("invoiceItems", v)} placeholder="أضف بند فاتورة…" />
            <ListEditor label="درجات التقاضي" items={c.caseDegrees} onChange={(v) => set("caseDegrees", v)} placeholder="أضف درجة تقاضي…" />
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
            <div className="sm:col-span-2">
              <ListEditor label="عبارات الإعلانات" items={c.marketing.pitches} onChange={(v) => set("marketing", { ...c.marketing, pitches: v })} placeholder="أضف عبارة إعلانية…" />
            </div>
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