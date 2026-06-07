import { useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Eye } from "lucide-react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from "recharts";
import {
  PageHeader, DataTable, Badge, StatCard, Toolbar, ActionButton,
  DateRangeFilter, inDateRange, type Column,
} from "@/components/admin/parts";
import { revenueByMonth, subscriptionsMRR, invoicesTotal, consultationsRevenue } from "@/data/admin";
import { dashInvoices, type DashInvoice } from "@/data/dashboard";

export const Route = createFileRoute("/admin/revenue")({ component: RevenuePage });
const fmt = (n: number) => new Intl.NumberFormat("ar-EG").format(n);
const tone = (s: DashInvoice["status"]) => (s === "مدفوعة" ? "green" : s === "معلقة" ? "blue" : "red");

function RevenuePage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("الكل");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const filtered = useMemo(
    () =>
      dashInvoices.filter(
        (i) =>
          (status === "الكل" || i.status === status) &&
          inDateRange(i.date, from, to) &&
          (i.client.includes(search) || i.number.includes(search) || (i.item ?? "").includes(search)),
      ),
    [search, status, from, to],
  );

  const cols: Column<DashInvoice>[] = [
    { key: "number", label: "رقم الفاتورة", render: (r) => <span dir="ltr" className="font-semibold text-cream">{r.number}</span> },
    { key: "client", label: "العميل" },
    { key: "item", label: "البند" },
    { key: "amount", label: "المبلغ", render: (r) => `${fmt(r.amount)} ج.م` },
    { key: "date", label: "التاريخ" },
    {
      key: "status", label: "الحالة",
      render: (r) => <Badge tone={tone(r.status)}>{r.status}</Badge>,
    },
    {
      key: "actions", label: "",
      render: (r) => (
        <ActionButton tone="outline" onClick={() => navigate({ to: "/admin/invoice/$invoiceId", params: { invoiceId: r.id } })}>
          <Eye className="h-4 w-4" /> التفاصيل
        </ActionButton>
      ),
    },
  ];
  const totalYear = revenueByMonth.reduce((s, m) => s + m.consultations + m.subscriptions + m.cases, 0);

  return (
    <>
      <PageHeader title="الإيرادات" subtitle="تقارير الإيرادات والفواتير" />
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="إجمالي الإيرادات" value={`${fmt(totalYear)} ج.م`} hint="آخر 6 أشهر" />
        <StatCard label="إيراد الاشتراكات الشهري" value={`${fmt(subscriptionsMRR)} ج.م`} />
        <StatCard label="إيراد الاستشارات" value={`${fmt(consultationsRevenue)} ج.م`} />
        <StatCard label="إجمالي الفواتير" value={`${fmt(invoicesTotal)} ج.م`} />
      </div>

      <div className="mb-6 rounded-2xl border border-white/10 bg-navy-card/50 p-5 shadow-lg">
        <h2 className="mb-4 text-lg font-bold text-cream">الإيرادات حسب المصدر</h2>
        <div className="h-72 w-full" dir="ltr">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueByMonth} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
              <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 12 }} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 12 }} width={48} />
              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.05)" }}
                contentStyle={{ background: "oklch(0.19 0.05 264)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#fff" }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="subscriptions" name="الاشتراكات" fill="oklch(0.76 0.1 80)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="consultations" name="الاستشارات" fill="oklch(0.7 0.13 240)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="cases" name="القضايا" fill="oklch(0.7 0.13 150)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <h2 className="mb-3 text-lg font-bold text-cream">أحدث الفواتير</h2>
      <Toolbar
        search={search}
        onSearch={setSearch}
        placeholder="ابحث برقم الفاتورة أو العميل..."
        filters={[
          { value: status, onChange: setStatus, options: [
            { value: "الكل", label: "كل الحالات" },
            { value: "مدفوعة", label: "مدفوعة" },
            { value: "معلقة", label: "معلقة" },
            { value: "متأخرة", label: "متأخرة" },
          ] },
        ]}
      >
        <DateRangeFilter from={from} to={to} onFrom={setFrom} onTo={setTo} />
      </Toolbar>
      <DataTable columns={cols} rows={filtered} />
    </>
  );
}
