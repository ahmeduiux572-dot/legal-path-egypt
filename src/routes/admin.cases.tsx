import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Eye, CheckCircle2, XCircle } from "lucide-react";
import {
  PageHeader, DataTable, Badge, StatCard, Toolbar, ActionButton,
  AdminDialog, Field, FieldGrid, type Column,
} from "@/components/admin/parts";
import { cases, type CaseListing } from "@/data/content";
import { useAdminStore, caseStatus, setCaseStatus } from "@/lib/admin-store";

export const Route = createFileRoute("/admin/cases")({ component: CasesPage });
const fmt = (n: number) => new Intl.NumberFormat("ar-EG").format(n);

const csBadge = { pending: "gold", published: "green", rejected: "red" } as const;
const csLabel = { pending: "قيد المراجعة", published: "منشورة", rejected: "مرفوضة" } as const;

const categories = ["all", "تجاري", "أسرة", "ملكية فكرية", "عمل", "عقارات", "شركات"];

function CasesPage() {
  const store = useAdminStore();
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("all");
  const [st, setSt] = useState("all");
  const [selected, setSelected] = useState<CaseListing | null>(null);

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
    { key: "budget", label: "الميزانية" },
    { key: "proposals", label: "العروض", render: (r) => <Badge tone="blue">{fmt(r.proposals)}</Badge> },
    { key: "status", label: "الحالة", render: (r) => {
        const s = caseStatus(store, r.id);
        return <Badge tone={csBadge[s]}>{csLabel[s]}</Badge>;
      } },
    {
      key: "actions", label: "",
      render: (r) => (
        <ActionButton tone="outline" onClick={() => setSelected(r)}>
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

      {selected && (() => {
        const s = caseStatus(store, selected.id);
        return (
          <AdminDialog open onOpenChange={(v) => !v && setSelected(null)} title="مراجعة القضية">
            <FieldGrid>
              <Field label="العنوان" value={selected.title} />
              <Field label="التصنيف" value={<Badge tone="gold">{selected.category}</Badge>} />
              <Field label="المدينة" value={selected.city} />
              <Field label="الميزانية" value={selected.budget} />
              <Field label="الموعد" value={selected.deadline} />
              <Field label="عدد العروض" value={fmt(selected.proposals)} />
              <Field label="الحالة" value={<Badge tone={csBadge[s]}>{csLabel[s]}</Badge>} />
            </FieldGrid>
            <p className="mt-4 rounded-2xl border border-white/10 bg-navy-card/40 p-4 text-sm text-cream/75">
              {selected.description}
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <ActionButton tone="red" onClick={() => { setCaseStatus(selected.id, "rejected"); setSelected(null); }}>
                <XCircle className="h-4 w-4" /> رفض
              </ActionButton>
              <ActionButton tone="green" onClick={() => { setCaseStatus(selected.id, "published"); setSelected(null); }}>
                <CheckCircle2 className="h-4 w-4" /> نشر القضية
              </ActionButton>
            </div>
          </AdminDialog>
        );
      })()}
    </>
  );
}
