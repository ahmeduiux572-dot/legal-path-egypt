import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, DataTable, Badge, StatCard, type Column } from "@/components/admin/parts";
import { cases, type CaseListing } from "@/data/content";

export const Route = createFileRoute("/admin/cases")({ component: CasesPage });
const fmt = (n: number) => new Intl.NumberFormat("ar-EG").format(n);

function CasesPage() {
  const cols: Column<CaseListing>[] = [
    { key: "title", label: "القضية", render: (r) => <span className="font-semibold text-cream">{r.title}</span> },
    { key: "category", label: "التصنيف", render: (r) => <Badge tone="gold">{r.category}</Badge> },
    { key: "city", label: "المدينة" },
    { key: "budget", label: "الميزانية" },
    { key: "deadline", label: "الموعد" },
    { key: "proposals", label: "العروض", render: (r) => <Badge tone="blue">{fmt(r.proposals)}</Badge> },
  ];
  return (
    <>
      <PageHeader title="سوق القضايا" subtitle="القضايا المطروحة من العملاء" />
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3">
        <StatCard label="إجمالي القضايا" value={fmt(cases.length)} />
        <StatCard label="إجمالي العروض" value={fmt(cases.reduce((s, c) => s + c.proposals, 0))} />
        <StatCard label="متوسط العروض" value={(cases.reduce((s, c) => s + c.proposals, 0) / cases.length).toFixed(1)} />
      </div>
      <DataTable columns={cols} rows={cases} />
    </>
  );
}
