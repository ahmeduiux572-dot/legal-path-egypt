import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, Plus, Pencil, Trash2 } from "lucide-react";
import {
  PageHeader, Badge, ActionButton, AdminDialog, Labeled, TextInput, TextArea,
} from "@/components/admin/parts";
import type { Plan } from "@/data/content";
import { useAdminStore, savePackage, deletePackage, newId } from "@/lib/admin-store";

export const Route = createFileRoute("/admin/plans")({ component: PlansPage });
const fmt = (n: number) => new Intl.NumberFormat("ar-EG").format(n);

const emptyDraft = (): Plan => ({ id: "", name: "", price: 0, period: "شهرياً", highlight: false, features: [] });

function PlansPage() {
  const store = useAdminStore();
  const [editing, setEditing] = useState<Plan | null>(null);
  const [confirmDel, setConfirmDel] = useState<Plan | null>(null);

  return (
    <>
      <PageHeader
        title="الباقات"
        subtitle="باقات الاشتراك المتاحة للمحامين"
        action={
          <ActionButton tone="gold" onClick={() => setEditing(emptyDraft())}>
            <Plus className="h-4 w-4" /> إضافة باقة
          </ActionButton>
        }
      />
      <div className="grid gap-6 md:grid-cols-3">
        {store.packages.map((p) => (
          <div
            key={p.id}
            className={`flex flex-col rounded-2xl border bg-navy-card/60 p-6 shadow-lg ${
              p.highlight ? "border-gold/50 ring-1 ring-gold/30" : "border-white/10"
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-cream">{p.name}</h3>
              {p.highlight && <Badge tone="gold">الأكثر طلباً</Badge>}
            </div>
            <div className="mt-4 flex items-end gap-1">
              <span className="text-3xl font-extrabold text-gold">{fmt(p.price)}</span>
              <span className="mb-1 text-sm text-cream/60">ج.م / {p.period}</span>
            </div>
            <ul className="mt-5 flex-1 space-y-2.5">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-cream/80">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex gap-2 border-t border-white/10 pt-4">
              <ActionButton tone="outline" className="flex-1" onClick={() => setEditing({ ...p, features: [...p.features] })}>
                <Pencil className="h-4 w-4" /> تعديل
              </ActionButton>
              <ActionButton tone="red" onClick={() => setConfirmDel(p)}>
                <Trash2 className="h-4 w-4" /> حذف
              </ActionButton>
            </div>
          </div>
        ))}
      </div>

      {editing && <PlanForm draft={editing} onClose={() => setEditing(null)} />}

      {confirmDel && (
        <AdminDialog
          open={Boolean(confirmDel)}
          onOpenChange={(v) => !v && setConfirmDel(null)}
          title="حذف الباقة"
          className="sm:max-w-md"
        >
          <p className="text-sm text-cream/70">
            هل أنت متأكد من حذف باقة «{confirmDel.name}»؟ لا يمكن التراجع عن هذا الإجراء.
          </p>
          <div className="mt-5 flex justify-end gap-2">
            <ActionButton tone="outline" onClick={() => setConfirmDel(null)}>إلغاء</ActionButton>
            <ActionButton tone="red" onClick={() => { deletePackage(confirmDel.id); setConfirmDel(null); }}>
              <Trash2 className="h-4 w-4" /> حذف
            </ActionButton>
          </div>
        </AdminDialog>
      )}
    </>
  );
}

function PlanForm({ draft, onClose }: { draft: Plan; onClose: () => void }) {
  const [name, setName] = useState(draft.name);
  const [price, setPrice] = useState(String(draft.price));
  const [period, setPeriod] = useState(draft.period);
  const [highlight, setHighlight] = useState(Boolean(draft.highlight));
  const [features, setFeatures] = useState(draft.features.join("\n"));

  const submit = () => {
    if (!name.trim()) return;
    savePackage({
      id: draft.id || newId("plan"),
      name: name.trim(),
      price: Number(price) || 0,
      period: period.trim() || "شهرياً",
      highlight,
      features: features.split("\n").map((f) => f.trim()).filter(Boolean),
    });
    onClose();
  };

  return (
    <AdminDialog open onOpenChange={(v) => !v && onClose()} title={draft.id ? "تعديل الباقة" : "إضافة باقة"}>
      <div className="grid gap-4">
        <Labeled label="اسم الباقة"><TextInput value={name} onChange={(e) => setName(e.target.value)} placeholder="مثال: الباقة الاحترافية" /></Labeled>
        <div className="grid gap-4 sm:grid-cols-2">
          <Labeled label="السعر (ج.م)"><TextInput type="number" value={price} onChange={(e) => setPrice(e.target.value)} /></Labeled>
          <Labeled label="الدورة"><TextInput value={period} onChange={(e) => setPeriod(e.target.value)} placeholder="شهرياً / سنوياً" /></Labeled>
        </div>
        <Labeled label="المزايا (ميزة في كل سطر)">
          <TextArea value={features} onChange={(e) => setFeatures(e.target.value)} className="min-h-[140px]" />
        </Labeled>
        <label className="flex items-center gap-2 text-sm text-cream/80">
          <input type="checkbox" checked={highlight} onChange={(e) => setHighlight(e.target.checked)} className="h-4 w-4 accent-gold" />
          تمييز كالأكثر طلباً
        </label>
      </div>
      <div className="mt-5 flex justify-end gap-2">
        <ActionButton tone="outline" onClick={onClose}>إلغاء</ActionButton>
        <ActionButton tone="gold" onClick={submit}>حفظ</ActionButton>
      </div>
    </AdminDialog>
  );
}
