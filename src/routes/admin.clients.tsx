import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, DataTable, Badge, StatCard, type Column } from "@/components/admin/parts";
import { dashClients, type DashClient } from "@/data/dashboard";

export const Route = createFileRoute("/admin/clients")({ component: ClientsPage });
const fmt = (n: number) => new Intl.NumberFormat("ar-EG").format(n);

function ClientsPage() {
  const cols: Column<DashClient>[] = [
    { key: "name", label: "العميل", render: (r) => <span className="font-semibold text-cream">{r.name}</span> },
    { key: "type", label: "النوع", render: (r) => <Badge tone={r.type === "شركة" ? "blue" : "muted"}>{r.type ?? "فرد"}</Badge> },
    { key: "city", label: "المدينة" },
    { key: "phone", label: "الهاتف", render: (r) => <span dir="ltr">{r.phone}</span> },
    { key: "email", label: "البريد", render: (r) => <span dir="ltr">{r.email}</span> },
    { key: "cases", label: "القضايا", render: (r) => fmt(r.cases) },
    { key: "since", label: "عميل منذ" },
  ];
  return (
    <>
      <PageHeader title="العملاء" subtitle="قاعدة عملاء المنصة" />
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3">
        <StatCard label="إجمالي العملاء" value={fmt(dashClients.length)} />
        <StatCard label="شركات" value={fmt(dashClients.filter((c) => c.type === "شركة").length)} />
        <StatCard label="إجمالي القضايا" value={fmt(dashClients.reduce((s, c) => s + c.cases, 0))} />
      </div>
      <DataTable columns={cols} rows={dashClients} />
    </>
  );
}
