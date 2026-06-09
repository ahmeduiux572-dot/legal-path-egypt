import { useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Eye } from "lucide-react";
import {
  PageHeader, DataTable, Badge, StatCard, Toolbar, ActionButton, type Column,
} from "@/components/admin/parts";
import { cases, caseBudget, type CaseListing } from "@/data/content";
import { useAdminStore, caseStatus } from "@/lib/admin-store";

export const Route = createFileRoute("/admin/cases")({ component: CasesPage });
const fmt = (n: number) => new Intl.NumberFormat("ar-EG").format(n);

const csBadge = { pending: "gold", published: "green", rejected: "red" } as const;
const csLabel = { pending: "قيد المراجعة", published: "منشورة", rejected: "مرفوضة" } as const;

const categories = ["all", "تجاري", "أسرة", "ملكية فكرية", "عمل", "عقارات", "شركات"];

function CasesPage() {
  const store = useAdminStore();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("all");
  const [st, setSt] = useState("all");

  const filtered = useMemo(
    () =>
      cases.filter(
        (c) =>
          (cat === "all" || c.category === cat) &&
          (st === "all" || caseStatus(store, c.id) === st) &&
          (c.title.includes(search) || c.description.includes(search)),
      ),
    [search, cat, st, store],
  );

  const cols: Column<CaseListing>[] = [
    { key: "title", label: "القضية", render: (r) => <span className="font-semibold text-cream">{r.title}</span> },
    { key: "category", label: "التصنيف", render: (r) => <Badge tone="gold">{r.category}</Badge> },
    { key: "city", label: "المدينة" },
    { key: "budget", label: "الميزانية", render: (r) => caseBudget(r) },
    { key: "proposals", label: "العروض", render: (r) => <Badge tone="blue">{fmt(r.proposals)}</Badge> },
    { key: "status", label: "الحالة", render: (r) => {
        const s = caseStatus(store, r.id);
        return <Badge tone={csBadge[s]}>{csLabel[s]}</Badge>;
      } },
    {
      key: "actions", label: "",
      render: (r) => (
        <ActionButton tone="outline" onClick={() => navigate({ to: "/admin/case/$caseId", params: { caseId: r.id } })}>
          <Eye className="h-4 w-4" /> مراجعة
        </ActionButton>
      ),
    },
  ];

  const pending = cases.filter((c) => caseStatus(store, c.id) === "pending").length;
  const published = cases.filter((c) => caseStatus(store, c.id) === "published").length;

  return (
    <>
      <PageHeader title="سوق القضايا" subtitle="مراجعة ونشر القضايا المطروحة من العملاء" />
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="إجمالي القضايا" value={fmt(cases.length)} />
        <StatCard label="قيد المراجعة" value={fmt(pending)} />
        <StatCard label="منشورة" value={fmt(published)} />
        <StatCard label="إجمالي العروض" value={fmt(cases.reduce((s, c) => s + c.proposals, 0))} />
      </div>
      <Toolbar
        search={search}
        onSearch={setSearch}
        placeholder="ابحث في القضايا..."
        filters={[
          { value: cat, onChange: setCat, options: categories.map((c) => ({ value: c, label: c === "all" ? "كل التصنيفات" : c })) },
          { value: st, onChange: setSt, options: [
            { value: "all", label: "كل الحالات" }, { value: "pending", label: "قيد المراجعة" },
            { value: "published", label: "منشورة" }, { value: "rejected", label: "مرفوضة" },
          ] },
        ]}
      />
      <DataTable columns={cols} rows={filtered} />
    </>
  );
}
