import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, DataTable, Badge, StatCard, type Column } from "@/components/admin/parts";
import { lawyers, type Lawyer } from "@/data/lawyers";

export const Route = createFileRoute("/admin/lawyers")({ component: LawyersPage });
const fmt = (n: number) => new Intl.NumberFormat("ar-EG").format(n);

function LawyersPage() {
  const cols: Column<Lawyer>[] = [
    {
      key: "name", label: "المحامي",
      render: (r) => (
        <div className="flex items-center gap-3">
          <img src={r.image} alt={r.name} className="h-10 w-10 rounded-lg object-cover" />
          <div>
            <div className="font-semibold text-cream">{r.name}</div>
            <div className="text-xs text-cream/55">{r.title}</div>
          </div>
        </div>
      ),
    },
    { key: "specialty", label: "التخصص" },
    { key: "city", label: "المدينة" },
    { key: "experience", label: "الخبرة", render: (r) => `${r.experience} سنة` },
    { key: "consultations", label: "الاستشارات", render: (r) => fmt(r.consultations) },
    { key: "price", label: "سعر الاستشارة", render: (r) => `${fmt(r.price)} ج.م` },
    { key: "rating", label: "التقييم", render: (r) => <Badge tone="gold">★ {r.rating} ({r.reviews})</Badge> },
  ];

  return (
    <>
      <PageHeader title="المحامون" subtitle={`${fmt(lawyers.length)} محامٍ مسجّل على المنصة`} />
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3">
        <StatCard label="إجمالي المحامين" value={fmt(lawyers.length)} />
        <StatCard label="متوسط التقييم" value={(lawyers.reduce((s, l) => s + l.rating, 0) / lawyers.length).toFixed(1)} />
        <StatCard label="إجمالي الاستشارات" value={fmt(lawyers.reduce((s, l) => s + l.consultations, 0))} />
      </div>
      <DataTable columns={cols} rows={lawyers} />
    </>
  );
}
