import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Eye } from "lucide-react";
import {
  PageHeader, DataTable, Badge, StatCard, Toolbar, ActionButton,
  AdminDialog, Field, FieldGrid, type Column,
} from "@/components/admin/parts";
import { dashConsultations, type DashConsultation } from "@/data/dashboard";
import { lawyers } from "@/data/lawyers";

export const Route = createFileRoute("/admin/consultations")({ component: ConsultationsPage });
const fmt = (n: number) => new Intl.NumberFormat("ar-EG").format(n);

function assignedLawyer(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return lawyers[h % lawyers.length];
}

const tone = (s: DashConsultation["status"]) =>
  s === "مكتملة" ? "green" : s === "قادمة" ? "blue" : "red";

function ConsultationsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [channel, setChannel] = useState("all");
  const [selected, setSelected] = useState<DashConsultation | null>(null);

  const filtered = useMemo(
    () =>
      dashConsultations.filter(
        (c) =>
          (status === "all" || c.status === status) &&
          (channel === "all" || c.channel === channel) &&
          (c.client.includes(search) || c.subject.includes(search)),
      ),
    [search, status, channel],
  );

  const cols: Column<DashConsultation>[] = [
    { key: "client", label: "العميل", render: (r) => <span className="font-semibold text-cream">{r.client}</span> },
    { key: "subject", label: "الموضوع" },
    { key: "lawyer", label: "المحامي المعيّن", render: (r) => assignedLawyer(r.id).name },
    { key: "channel", label: "القناة" },
    { key: "date", label: "التاريخ", render: (r) => `${r.date} - ${r.time}` },
    { key: "price", label: "السعر", render: (r) => `${fmt(r.price)} ج.م` },
    { key: "status", label: "الحالة", render: (r) => <Badge tone={tone(r.status)}>{r.status}</Badge> },
    {
      key: "actions", label: "",
      render: (r) => (
        <ActionButton tone="outline" onClick={() => setSelected(r)}>
          <Eye className="h-4 w-4" /> التفاصيل
        </ActionButton>
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
      <Toolbar
        search={search}
        onSearch={setSearch}
        placeholder="ابحث بالعميل أو الموضوع..."
        filters={[
          { value: status, onChange: setStatus, options: [
            { value: "all", label: "كل الحالات" }, { value: "قادمة", label: "قادمة" },
            { value: "مكتملة", label: "مكتملة" }, { value: "ملغاة", label: "ملغاة" },
          ] },
          { value: channel, onChange: setChannel, options: [
            { value: "all", label: "كل القنوات" }, { value: "أونلاين", label: "أونلاين" },
            { value: "مكتب", label: "مكتب" }, { value: "هاتف", label: "هاتف" },
          ] },
        ]}
      />
      <DataTable columns={cols} rows={filtered} />

      {selected && (
        <AdminDialog open onOpenChange={(v) => !v && setSelected(null)} title="تفاصيل الاستشارة">
          <FieldGrid>
            <Field label="العميل" value={selected.client} />
            <Field label="الموضوع" value={selected.subject} />
            <Field label="المحامي المعيّن" value={assignedLawyer(selected.id).name} />
            <Field label="القناة" value={selected.channel} />
            <Field label="التاريخ" value={`${selected.date} - ${selected.time}`} />
            <Field label="المدة" value={selected.duration ?? "—"} />
            <Field label="السعر" value={`${fmt(selected.price)} ج.م`} />
            <Field label="القضية المرتبطة" value={selected.caseRef ?? "—"} />
            <Field label="الحالة" value={<Badge tone={tone(selected.status)}>{selected.status}</Badge>} />
          </FieldGrid>
          {selected.notes && (
            <p className="mt-4 rounded-2xl border border-white/10 bg-navy-card/40 p-4 text-sm text-cream/75">
              {selected.notes}
            </p>
          )}
        </AdminDialog>
      )}
    </>
  );
}
