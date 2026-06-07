import { useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Eye } from "lucide-react";
import {
  PageHeader, DataTable, Badge, StatCard, Toolbar, ActionButton,
  DateRangeFilter, inDateRange, type Column,
} from "@/components/admin/parts";
import { subscriptions, subscriptionsMRR, type Subscription } from "@/data/admin";

export const Route = createFileRoute("/admin/subscriptions")({ component: SubscriptionsPage });
const fmt = (n: number) => new Intl.NumberFormat("ar-EG").format(n);
const tone = (s: Subscription["status"]) => (s === "نشط" ? "green" : s === "قيد التجديد" ? "blue" : "red");

function SubscriptionsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("الكل");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const filtered = useMemo(
    () =>
      subscriptions.filter(
        (s) =>
          (status === "الكل" || s.status === status) &&
          inDateRange(s.startDate, from, to) &&
          (s.subscriber.includes(search) || s.plan.includes(search)),
      ),
    [search, status, from, to],
  );

  const cols: Column<Subscription>[] = [
    { key: "subscriber", label: "المشترك", render: (r) => <span className="font-semibold text-cream">{r.subscriber}</span> },
    { key: "plan", label: "الباقة", render: (r) => <Badge tone="gold">{r.plan}</Badge> },
    { key: "price", label: "القيمة", render: (r) => `${fmt(r.price)} ج.م` },
    { key: "startDate", label: "البداية" },
    { key: "renewDate", label: "التجديد" },
    { key: "status", label: "الحالة", render: (r) => <Badge tone={tone(r.status)}>{r.status}</Badge> },
    {
      key: "actions", label: "",
      render: (r) => (
        <ActionButton tone="outline" onClick={() => navigate({ to: "/admin/subscription/$subId", params: { subId: r.id } })}>
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
      >
        <DateRangeFilter from={from} to={to} onFrom={setFrom} onTo={setTo} />
      </Toolbar>
      <DataTable columns={cols} rows={filtered} />
    </>
  );
}
