import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, DataTable, Badge, StatCard, type Column } from "@/components/admin/parts";
import { dashConsultations, type DashConsultation } from "@/data/dashboard";

export const Route = createFileRoute("/admin/consultations")({ component: ConsultationsPage });
const fmt = (n: number) => new Intl.NumberFormat("ar-EG").format(n);

function ConsultationsPage() {
  const cols: Column<DashConsultation>[] = [
    { key: "client", label: "العميل", render: (r) => <span className="font-semibold text-cream">{r.client}</span> },
    { key: "subject", label: "الموضوع" },
    { key: "channel", label: "القناة" },
    { key: "date", label: "التاريخ", render: (r) => `${r.date} - ${r.time}` },
    { key: "duration", label: "المدة" },
    { key: "price", label: "السعر", render: (r) => `${fmt(r.price)} ج.م` },
    {
      key: "status", label: "الحالة",
      render: (r) => (
        <Badge tone={r.status === "مكتملة" ? "green" : r.status === "قادمة" ? "blue" : "red"}>{r.status}</Badge>
      ),
    },
  ];
  const completed = dashConsultations.filter((c) => c.status === "مكتملة");
  return (
    <>
      <PageHeader title="الاستشارات" subtitle="إدارة جلسات الاستشارات القانونية" />
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="إجمالي الاستشارات" value={fmt(dashConsultations.length)} />
        <StatCard label="قادمة" value={fmt(dashConsultations.filter((c) => c.status === "قادمة").length)} />
        <StatCard label="مكتملة" value={fmt(completed.length)} />
        <StatCard label="إيراد الاستشارات" value={`${fmt(completed.reduce((s, c) => s + c.price, 0))} ج.م`} />
      </div>
      <DataTable columns={cols} rows={dashConsultations} />
    </>
  );
}
