import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Eye } from "lucide-react";
import {
  PageHeader, DataTable, Badge, StatCard, Toolbar, ActionButton,
  AdminDialog, Field, FieldGrid, type Column,
} from "@/components/admin/parts";
import { subscriptions, subscriptionsMRR, type Subscription } from "@/data/admin";

export const Route = createFileRoute("/admin/subscriptions")({ component: SubscriptionsPage });
const fmt = (n: number) => new Intl.NumberFormat("ar-EG").format(n);
const tone = (s: Subscription["status"]) => (s === "نشط" ? "green" : s === "قيد التجديد" ? "blue" : "red");

function SubscriptionsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("الكل");
  const [selected, setSelected] = useState<Subscription | null>(null);

  const filtered = useMemo(
    () =>
      subscriptions.filter(
        (s) =>
          (status === "الكل" || s.status === status) &&
          (s.subscriber.includes(search) || s.plan.includes(search)),
      ),
    [search, status],
  );

  const cols: Column<Subscription>[] = [
    { key: "subscriber", label: "المشترك", render: (r) => <span className="font-semibold text-cream">{r.subscriber}</span> },
    { key: "plan", label: "الباقة", render: (r) => <Badge tone="gold">{r.plan}</Badge> },
    { key: "price", label: "القيمة", render: (r) => `${fmt(r.price)} ج.م` },
    { key: "startDate", label: "البداية" },
    { key: "renewDate", label: "التجديد" },
    {
      key: "status", label: "الحالة",
      render: (r) => <Badge tone={tone(r.status)}>{r.status}</Badge>,
    },
    {
      key: "actions", label: "",
      render: (r) => (
        <ActionButton tone="outline" onClick={() => setSelected(r)}>
          <Eye className="h-4 w-4" /> التفاصيل
        </ActionButton>
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
      <Toolbar
        search={search}
        onSearch={setSearch}
        placeholder="ابحث بالمشترك أو الباقة..."
        filters={[
          { value: status, onChange: setStatus, options: [
            { value: "الكل", label: "كل الحالات" },
            { value: "نشط", label: "نشط" },
            { value: "قيد التجديد", label: "قيد التجديد" },
            { value: "منتهٍ", label: "منتهٍ" },
          ] },
        ]}
      />
      <DataTable columns={cols} rows={filtered} />

      {selected && (
        <AdminDialog
          open={Boolean(selected)}
          onOpenChange={(v) => !v && setSelected(null)}
          title={`اشتراك: ${selected.subscriber}`}
          className="sm:max-w-lg"
        >
          <FieldGrid>
            <Field label="المشترك" value={selected.subscriber} />
            <Field label="الباقة" value={<Badge tone="gold">{selected.plan}</Badge>} />
            <Field label="القيمة" value={`${fmt(selected.price)} ج.م`} />
            <Field label="تاريخ البداية" value={selected.startDate} />
            <Field label="تاريخ التجديد" value={selected.renewDate} />
            <Field label="الحالة" value={<Badge tone={tone(selected.status)}>{selected.status}</Badge>} />
          </FieldGrid>
        </AdminDialog>
      )}
    </>
  );
}
