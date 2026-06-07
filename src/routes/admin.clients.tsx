import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Eye, Ban, CheckCircle2 } from "lucide-react";
import {
  PageHeader, DataTable, Badge, StatCard, Toolbar, ActionButton,
  AdminDialog, Field, FieldGrid, SectionTitle, FileList, type Column,
} from "@/components/admin/parts";
import { dashClients, type DashClient } from "@/data/dashboard";
import { useAdminStore, isBlocked, toggleBlock } from "@/lib/admin-store";

export const Route = createFileRoute("/admin/clients")({ component: ClientsPage });
const fmt = (n: number) => new Intl.NumberFormat("ar-EG").format(n);

function ClientsPage() {
  const store = useAdminStore();
  const [search, setSearch] = useState("");
  const [type, setType] = useState("الكل");
  const [selected, setSelected] = useState<DashClient | null>(null);

  const filtered = useMemo(
    () =>
      dashClients.filter(
        (c) =>
          (type === "الكل" || (c.type ?? "فرد") === type) &&
          (c.name.includes(search) || c.email.includes(search) || c.phone.includes(search)),
      ),
    [search, type],
  );

  const cols: Column<DashClient>[] = [
    {
      key: "name", label: "العميل",
      render: (r) => (
        <div className="flex items-center gap-2">
          <span className="font-semibold text-cream">{r.name}</span>
          {isBlocked(store, "client", r.id) && <Badge tone="red">محظور</Badge>}
        </div>
      ),
    },
    { key: "type", label: "النوع", render: (r) => <Badge tone={r.type === "شركة" ? "blue" : "muted"}>{r.type ?? "فرد"}</Badge> },
    { key: "city", label: "المدينة" },
    { key: "phone", label: "الهاتف", render: (r) => <span dir="ltr">{r.phone}</span> },
    { key: "cases", label: "القضايا", render: (r) => fmt(r.cases) },
    { key: "since", label: "عميل منذ" },
    {
      key: "actions", label: "",
      render: (r) => (
        <ActionButton tone="outline" onClick={() => setSelected(r)}>
          <Eye className="h-4 w-4" /> عرض الملف
        </ActionButton>
      ),
    },
  ];

  return (
    <>
      <PageHeader title="العملاء" subtitle="قاعدة عملاء المنصة" />
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="إجمالي العملاء" value={fmt(dashClients.length)} />
        <StatCard label="شركات" value={fmt(dashClients.filter((c) => c.type === "شركة").length)} />
        <StatCard label="محظورون" value={fmt(dashClients.filter((c) => isBlocked(store, "client", c.id)).length)} />
        <StatCard label="إجمالي القضايا" value={fmt(dashClients.reduce((s, c) => s + c.cases, 0))} />
      </div>

      <Toolbar
        search={search}
        onSearch={setSearch}
        placeholder="ابحث بالاسم أو البريد أو الهاتف..."
        filters={[
          { value: type, onChange: setType, options: [
            { value: "الكل", label: "كل الأنواع" },
            { value: "فرد", label: "أفراد" },
            { value: "شركة", label: "شركات" },
          ] },
        ]}
      />
      <DataTable columns={cols} rows={filtered} />

      {selected && (
        <AdminDialog
          open={Boolean(selected)}
          onOpenChange={(v) => !v && setSelected(null)}
          title={
            <span className="flex items-center gap-2">
              {selected.name}
              {isBlocked(store, "client", selected.id) && <Badge tone="red">محظور</Badge>}
            </span>
          }
        >
          <div className="mb-2 flex justify-end">
            <ActionButton
              tone={isBlocked(store, "client", selected.id) ? "green" : "red"}
              onClick={() => toggleBlock("client", selected.id)}
            >
              {isBlocked(store, "client", selected.id)
                ? <><CheckCircle2 className="h-4 w-4" /> رفع الحظر</>
                : <><Ban className="h-4 w-4" /> حظر العميل</>}
            </ActionButton>
          </div>
          <SectionTitle>البيانات</SectionTitle>
          <FieldGrid>
            <Field label="النوع" value={selected.type ?? "فرد"} />
            <Field label="المدينة" value={selected.city ?? "—"} />
            <Field label="الهاتف" value={<span dir="ltr">{selected.phone}</span>} />
            {selected.altPhone && <Field label="هاتف بديل" value={<span dir="ltr">{selected.altPhone}</span>} />}
            <Field label="البريد" value={<span dir="ltr">{selected.email}</span>} />
            <Field label="الرقم القومي / السجل" value={selected.nationalId ?? "—"} />
            <Field label="العنوان" value={selected.address ?? "—"} />
            <Field label="عدد القضايا" value={fmt(selected.cases)} />
            <Field label="عميل منذ" value={selected.since} />
            {selected.notes && <Field label="ملاحظات" value={<span className="text-cream/70">{selected.notes}</span>} />}
          </FieldGrid>
          <SectionTitle>الملفات المرفوعة</SectionTitle>
          <FileList files={selected.files ?? []} />
        </AdminDialog>
      )}
    </>
  );
}
