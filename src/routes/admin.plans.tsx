import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PageHeader, Badge } from "@/components/admin/parts";
import { plans } from "@/data/content";

export const Route = createFileRoute("/admin/plans")({ component: PlansPage });
const fmt = (n: number) => new Intl.NumberFormat("ar-EG").format(n);

function PlansPage() {
  return (
    <>
      <PageHeader title="الباقات" subtitle="باقات الاشتراك المتاحة للمحامين" />
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.id}
            className={`rounded-2xl border bg-navy-card/60 p-6 shadow-lg ${
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
            <ul className="mt-5 space-y-2.5">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-cream/80">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
