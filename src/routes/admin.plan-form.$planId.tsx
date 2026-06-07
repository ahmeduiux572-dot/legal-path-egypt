import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Save } from "lucide-react";
import {
  PageHeader, BackButton, ActionButton, Labeled, TextInput, TextArea,
} from "@/components/admin/parts";
import type { Plan } from "@/data/content";
import { useAdminStore, savePackage, newId } from "@/lib/admin-store";

export const Route = createFileRoute("/admin/plan-form/$planId")({ component: PlanForm });

function PlanForm() {
  const { planId } = Route.useParams();
  const store = useAdminStore();
  const navigate = useNavigate();
  const isNew = planId === "new";
  const existing = store.packages.find((p) => p.id === planId);
  const draft: Plan = existing ?? { id: "", name: "", price: 0, period: "شهرياً", highlight: false, features: [] };

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
    navigate({ to: "/admin/plans" });
  };

  return (
    <>
      <BackButton label="رجوع للباقات" />
      <PageHeader title={isNew ? "إضافة باقة" : "تعديل الباقة"} subtitle={isNew ? "إنشاء باقة اشتراك جديدة" : draft.name} />
      <div className="max-w-2xl rounded-2xl border border-white/10 bg-navy-card/40 p-5 md:p-6">
        <div className="grid gap-4">
          <Labeled label="اسم الباقة"><TextInput value={name} onChange={(e) => setName(e.target.value)} placeholder="مثال: الباقة الاحترافية" /></Labeled>
          <div className="grid gap-4 sm:grid-cols-2">
            <Labeled label="السعر (ج.م)"><TextInput type="number" value={price} onChange={(e) => setPrice(e.target.value)} /></Labeled>
            <Labeled label="الدورة"><TextInput value={period} onChange={(e) => setPeriod(e.target.value)} placeholder="شهرياً / سنوياً" /></Labeled>
          </div>
          <Labeled label="المزايا (ميزة في كل سطر)">
            <TextArea value={features} onChange={(e) => setFeatures(e.target.value)} className="min-h-[160px]" />
          </Labeled>
          <label className="flex items-center gap-2 text-sm text-cream/80">
            <input type="checkbox" checked={highlight} onChange={(e) => setHighlight(e.target.checked)} className="h-4 w-4 accent-gold" />
            تمييز كالأكثر طلباً
          </label>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <ActionButton tone="outline" onClick={() => navigate({ to: "/admin/plans" })}>إلغاء</ActionButton>
          <ActionButton tone="gold" onClick={submit}><Save className="h-4 w-4" /> حفظ</ActionButton>
        </div>
      </div>
    </>
  );
}
