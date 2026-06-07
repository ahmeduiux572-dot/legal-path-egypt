import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Check, Plus, Pencil, Trash2, X } from "lucide-react";
import { PageHeader, Badge, ActionButton } from "@/components/admin/parts";
import { useAdminStore, deletePackage } from "@/lib/admin-store";

export const Route = createFileRoute("/admin/plans")({ component: PlansPage });
const fmt = (n: number) => new Intl.NumberFormat("ar-EG").format(n);

function PlansPage() {
  const store = useAdminStore();
  const navigate = useNavigate();
  const [confirmId, setConfirmId] = useState<string | null>(null);

  return (
    <>
      <PageHeader
        title="الباقات"
        subtitle="باقات الاشتراك المتاحة للمحامين"
        action={
          <ActionButton tone="gold" onClick={() => navigate({ to: "/admin/plan-form/$planId", params: { planId: "new" } })}>
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
            {confirmId === p.id ? (
              <div className="mt-5 rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-center">
                <p className="mb-2 text-sm text-cream/80">تأكيد حذف «{p.name}»؟</p>
                <div className="flex gap-2">
                  <ActionButton tone="outline" className="flex-1" onClick={() => setConfirmId(null)}>
                    <X className="h-4 w-4" /> إلغاء
                  </ActionButton>
                  <ActionButton tone="red" className="flex-1" onClick={() => { deletePackage(p.id); setConfirmId(null); }}>
                    <Trash2 className="h-4 w-4" /> حذف
                  </ActionButton>
                </div>
              </div>
            ) : (
              <div className="mt-5 flex gap-2 border-t border-white/10 pt-4">
                <ActionButton tone="outline" className="flex-1" onClick={() => navigate({ to: "/admin/plan-form/$planId", params: { planId: p.id } })}>
                  <Pencil className="h-4 w-4" /> تعديل
                </ActionButton>
                <ActionButton tone="red" onClick={() => setConfirmId(p.id)}>
                  <Trash2 className="h-4 w-4" /> حذف
                </ActionButton>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
