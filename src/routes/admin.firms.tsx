import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, DataTable, Badge, StatCard, type Column } from "@/components/admin/parts";
import { firms, type Firm } from "@/data/firms";

export const Route = createFileRoute("/admin/firms")({ component: FirmsPage });
const fmt = (n: number) => new Intl.NumberFormat("ar-EG").format(n);

function FirmsPage() {
  const cols: Column<Firm>[] = [
    {
      key: "name", label: "المكتب",
      render: (r) => (
        <div className="flex items-center gap-3">
          <img src={r.image} alt={r.name} className="h-10 w-10 rounded-lg object-cover" />
          <div>
            <div className="font-semibold text-cream">{r.name}</div>
            <div className="text-xs text-cream/55">{r.tagline}</div>
          </div>
        </div>
      ),
    },
    { key: "specialty", label: "التخصص" },
    { key: "city", label: "المدينة" },
    { key: "established", label: "سنة التأسيس" },
    { key: "teamSize", label: "حجم الفريق", render: (r) => `${r.teamSize} عضو` },
    { key: "cases", label: "القضايا", render: (r) => fmt(r.cases) },
    { key: "rating", label: "التقييم", render: (r) => <Badge tone="gold">★ {r.rating} ({r.reviews})</Badge> },
  ];

  return (
    <>
      <PageHeader title="المكاتب" subtitle={`${fmt(firms.length)} مكتب محاماة`} />
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3">
        <StatCard label="إجمالي المكاتب" value={fmt(firms.length)} />
        <StatCard label="إجمالي القضايا" value={fmt(firms.reduce((s, f) => s + f.cases, 0))} />
        <StatCard label="إجمالي أعضاء الفرق" value={fmt(firms.reduce((s, f) => s + f.teamSize, 0))} />
      </div>
      <DataTable columns={cols} rows={firms} />
    </>
  );
}
