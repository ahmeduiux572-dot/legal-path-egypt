import { useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Eye } from "lucide-react";
import {
  PageHeader, DataTable, Badge, StatCard, Toolbar, ActionButton,
  DateRangeFilter, inDateRange, type Column,
} from "@/components/admin/parts";
import { withdrawals, type Withdrawal, type WithdrawalStatus } from "@/data/withdrawals";
import { useAdminStore, withdrawalStatus } from "@/lib/admin-store";

export const Route = createFileRoute("/admin/withdrawals")({ component: WithdrawalsPage });
const fmt = (n: number) => new Intl.NumberFormat("ar-EG").format(n);
const tone = (s: WithdrawalStatus) => (s === "منفذ" ? "green" : s === "قيد المراجعة" ? "gold" : "red");

function WithdrawalsPage() {
  const store = useAdminStore();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("الكل");
  const [type, setType] = useState("الكل");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const resolved = useMemo(
    () => withdrawals.map((w) => ({ ...w, status: withdrawalStatus(store, w.id, w.status) })),
    [store.withdrawals],
  );

  const filtered = useMemo(
    () =>
      resolved.filter(
        (w) =>
          (status === "الكل" || w.status === status) &&
          (type === "الكل" || w.requesterType === type) &&
          inDateRange(w.date, from, to) &&
          (w.requester.includes(search) || w.method.includes(search)),
      ),
    [resolved, search, status, type, from, to],
  );

  const pending = resolved.filter((w) => w.status === "قيد المراجعة");
  const done = resolved.filter((w) => w.status === "منفذ");
  const total = pending.reduce((s, w) => s + w.amount, 0);

  const cols: Column<Withdrawal>[] = [
    { key: "requester", label: "مقدّم الطلب", render: (r) => <span className="font-semibold text-cream">{r.requester}</span> },
    { key: "requesterType", label: "النوع", render: (r) => <Badge tone="blue">{r.requesterType === "lawyer" ? "محامٍ" : "مكتب"}</Badge> },
    { key: "amount", label: "المبلغ", render: (r) => `${fmt(r.amount)} ج.م` },
    { key: "method", label: "الوسيلة" },
    { key: "date", label: "التاريخ" },
    { key: "status", label: "الحالة", render: (r) => <Badge tone={tone(r.status)}>{r.status}</Badge> },
    {
      key: "actions", label: "",
      render: (r) => (
        <ActionButton tone="gold" onClick={() => navigate({ to: "/admin/withdrawal/$withdrawalId", params: { withdrawalId: r.id } })}>
          <Eye className="h-4 w-4" /> {r.status === "قيد المراجعة" ? "مراجعة" : "عرض"}
        </ActionButton>
      ),
    },
  ];

  return (
    <>
      <PageHeader title="طلبات السحب" subtitle="مراجعة طلبات سحب أرصدة المحامين والمكاتب" />
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="إجمالي الطلبات" value={fmt(withdrawals.length)} />
        <StatCard label="قيد المراجعة" value={fmt(pending.length)} />
        <StatCard label="منفّذة" value={fmt(done.length)} />
        <StatCard label="قيمة المعلّقة" value={`${fmt(total)} ج.م`} />
      </div>
      <Toolbar
        search={search}
        onSearch={setSearch}
        placeholder="ابحث بمقدّم الطلب أو الوسيلة..."
        filters={[
          { value: status, onChange: setStatus, options: [
            { value: "الكل", label: "كل الحالات" },
            { value: "قيد المراجعة", label: "قيد المراجعة" },
            { value: "منفذ", label: "منفذ" },
            { value: "مرفوض", label: "مرفوض" },
          ] },
          { value: type, onChange: setType, options: [
            { value: "الكل", label: "الكل" },
            { value: "lawyer", label: "محامٍ" },
            { value: "firm", label: "مكتب" },
          ] },
        ]}
      >
        <DateRangeFilter from={from} to={to} onFrom={setFrom} onTo={setTo} />
      </Toolbar>
      <DataTable columns={cols} rows={filtered} empty="لا توجد طلبات سحب" />
    </>
  );
}
