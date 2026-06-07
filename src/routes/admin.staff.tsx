import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, DataTable, Badge, StatCard, type Column } from "@/components/admin/parts";
import { employees, jobOpenings, type Employee, type JobOpening } from "@/data/admin";

export const Route = createFileRoute("/admin/staff")({ component: StaffPage });
const fmt = (n: number) => new Intl.NumberFormat("ar-EG").format(n);

function StaffPage() {
  const empCols: Column<Employee>[] = [
    { key: "name", label: "الموظف", render: (r) => <span className="font-semibold text-cream">{r.name}</span> },
    { key: "role", label: "المسمى الوظيفي" },
    { key: "department", label: "القسم", render: (r) => <Badge tone="blue">{r.department}</Badge> },
    { key: "email", label: "البريد", render: (r) => <span dir="ltr">{r.email}</span> },
    { key: "joined", label: "تاريخ الالتحاق" },
    {
      key: "status", label: "الحالة",
      render: (r) => (
        <Badge tone={r.status === "نشط" ? "green" : r.status === "إجازة" ? "gold" : "red"}>{r.status}</Badge>
      ),
    },
  ];
  const jobCols: Column<JobOpening>[] = [
    { key: "title", label: "الوظيفة", render: (r) => <span className="font-semibold text-cream">{r.title}</span> },
    { key: "department", label: "القسم", render: (r) => <Badge tone="blue">{r.department}</Badge> },
    { key: "type", label: "النوع" },
    { key: "applicants", label: "المتقدمون", render: (r) => fmt(r.applicants) },
    { key: "posted", label: "تاريخ النشر" },
    { key: "status", label: "الحالة", render: (r) => <Badge tone={r.status === "مفتوحة" ? "green" : "muted"}>{r.status}</Badge> },
  ];
  return (
    <>
      <PageHeader title="الموظفون والوظائف" subtitle="فريق العمل والوظائف الشاغرة" />
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="إجمالي الموظفين" value={fmt(employees.length)} />
        <StatCard label="نشطون" value={fmt(employees.filter((e) => e.status === "نشط").length)} />
        <StatCard label="وظائف مفتوحة" value={fmt(jobOpenings.filter((j) => j.status === "مفتوحة").length)} />
        <StatCard label="إجمالي المتقدمين" value={fmt(jobOpenings.reduce((s, j) => s + j.applicants, 0))} />
      </div>

      <h2 className="mb-3 text-lg font-bold text-cream">الموظفون</h2>
      <DataTable columns={empCols} rows={employees} />

      <h2 className="mb-3 mt-8 text-lg font-bold text-cream">الوظائف الشاغرة</h2>
      <DataTable columns={jobCols} rows={jobOpenings} />
    </>
  );
}
