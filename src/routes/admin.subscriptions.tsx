import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, DataTable, Badge, StatCard, type Column } from "@/components/admin/parts";
import { subscriptions, subscriptionsMRR, type Subscription } from "@/data/admin";

export const Route = createFileRoute("/admin/subscriptions")({ component: SubscriptionsPage });
const fmt = (n: number) => new Intl.NumberFormat("ar-EG").format(n);

function SubscriptionsPage() {
  const cols: Column<Subscription>[] = [
    { key: "subscriber", label: "المشترك", render: (r) => <span className="font-semibold text-cream">{r.subscriber}</span> },
    { key: "plan", label: "الباقة", render: (r) => <Badge tone="gold">{r.plan}</Badge> },
    { key: "price", label: "القيمة", render: (r) => `${fmt(r.price)} ج.م` },
    { key: "startDate", label: "البداية" },
    { key: "renewDate", label: "التجديد" },
    {
      key: "status", label: "الحالة",
      render: (r) => (
        <Badge tone={r.status === "نشط" ? "green" : r.status === "قيد التجديد" ? "blue" : "red"}>{r.status}</Badge>
      ),
    },
  ];
  return (
    <>
      <PageHeader title="الاشتراكات" subtitle="اشتراكات المحامين في الباقات" />
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="إجمالي الاشتراكات" value={fmt(subscriptions.length)} />
        <StatCard label="نشطة" value={fmt(subscriptions.filter((s) => s.status === "نشط").length)} />
        <StatCard label="قيد التجديد" value={fmt(subscriptions.filter((s) => s.status === "قيد التجديد").length)} />
        <StatCard label="الإيراد الشهري" value={`${fmt(subscriptionsMRR)} ج.م`} />
      </div>
      <DataTable columns={cols} rows={subscriptions} />
    </>
  );
}
