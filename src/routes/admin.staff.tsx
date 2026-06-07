import { useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import {
  PageHeader, DataTable, Badge, StatCard, Toolbar, ActionButton, Tabs, type Column,
} from "@/components/admin/parts";
import { rolePermissionLabels, ALL_PERMISSIONS, type JobRole } from "@/data/permissions";
import { useAdminStore, deleteRole, deleteStaff, type StaffMember } from "@/lib/admin-store";

export const Route = createFileRoute("/admin/staff")({ component: StaffPage });
const fmt = (n: number) => new Intl.NumberFormat("ar-EG").format(n);

function StaffPage() {
  const store = useAdminStore();
  const navigate = useNavigate();
  const [tab, setTab] = useState("staff");
  const [search, setSearch] = useState("");
  const [del, setDel] = useState<{ kind: "role" | "staff"; id: string } | null>(null);

  const filteredStaff = useMemo(
    () => store.staff.filter((m) => m.name.includes(search) || m.role.includes(search) || m.email.includes(search)),
    [store.staff, search],
  );

  const ConfirmCell = ({ kind, id, name }: { kind: "role" | "staff"; id: string; name: string }) => {
    const editTo = kind === "role"
      ? () => navigate({ to: "/admin/role-form/$roleId", params: { roleId: id } })
      : () => navigate({ to: "/admin/staff-form/$staffId", params: { staffId: id } });
    if (del && del.kind === kind && del.id === id) {
      return (
        <div className="flex justify-end gap-2">
          <ActionButton tone="outline" onClick={() => setDel(null)}><X className="h-4 w-4" /> إلغاء</ActionButton>
          <ActionButton tone="red" onClick={() => { kind === "role" ? deleteRole(id) : deleteStaff(id); setDel(null); }}>
            <Trash2 className="h-4 w-4" /> تأكيد
          </ActionButton>
        </div>
      );
    }
    return (
      <div className="flex justify-end gap-2">
        <ActionButton tone="outline" onClick={editTo}><Pencil className="h-4 w-4" /> تعديل</ActionButton>
        <ActionButton tone="red" onClick={() => setDel({ kind, id })}><Trash2 className="h-4 w-4" /></ActionButton>
      </div>
    );
  };

  const roleCols: Column<JobRole>[] = [
    { key: "title", label: "الوظيفة", render: (r) => <span className="font-semibold text-cream">{r.title}</span> },
    { key: "department", label: "القسم", render: (r) => <Badge tone="blue">{r.department}</Badge> },
    {
      key: "permissions", label: "الصلاحيات",
      render: (r) => <Badge tone={r.permissions.includes(ALL_PERMISSIONS) ? "gold" : "muted"}>{rolePermissionLabels(r)}</Badge>,
    },
    { key: "actions", label: "", render: (r) => <ConfirmCell kind="role" id={r.id} name={r.title} /> },
  ];

  const staffCols: Column<StaffMember>[] = [
    { key: "name", label: "الموظف", render: (r) => <span className="font-semibold text-cream">{r.name}</span> },
    { key: "role", label: "الوظيفة" },
    { key: "department", label: "القسم", render: (r) => <Badge tone="blue">{r.department}</Badge> },
    { key: "email", label: "البريد", render: (r) => <span dir="ltr">{r.email}</span> },
    {
      key: "perms", label: "الصلاحيات",
      render: (r) => (
        <Badge tone={r.permissions.includes(ALL_PERMISSIONS) ? "gold" : "muted"}>
          {r.permissions.includes(ALL_PERMISSIONS) ? "كل الصلاحيات" : `${r.permissions.length} صلاحية`}
        </Badge>
      ),
    },
    {
      key: "status", label: "الحالة",
      render: (r) => <Badge tone={r.status === "نشط" ? "green" : r.status === "إجازة" ? "gold" : "red"}>{r.status}</Badge>,
    },
    { key: "actions", label: "", render: (r) => <ConfirmCell kind="staff" id={r.id} name={r.name} /> },
  ];

  return (
    <>
      <PageHeader title="الموظفون والوظائف" subtitle="إدارة فريق العمل والوظائف والصلاحيات" />
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="إجمالي الموظفين" value={fmt(store.staff.length)} />
        <StatCard label="نشطون" value={fmt(store.staff.filter((e) => e.status === "نشط").length)} />
        <StatCard label="الوظائف" value={fmt(store.roles.length)} />
        <StatCard label="موقوفون" value={fmt(store.staff.filter((e) => e.status === "موقوف").length)} />
      </div>

      <Tabs
        active={tab}
        onChange={(v) => { setTab(v); setDel(null); }}
        tabs={[
          { value: "staff", label: "الموظفون", count: store.staff.length },
          { value: "roles", label: "الوظائف والصلاحيات", count: store.roles.length },
        ]}
      />

      {tab === "staff" ? (
        <>
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-cream">الموظفون</h2>
            <ActionButton tone="gold" onClick={() => navigate({ to: "/admin/staff-form/$staffId", params: { staffId: "new" } })}>
              <Plus className="h-4 w-4" /> إضافة موظف
            </ActionButton>
          </div>
          <Toolbar search={search} onSearch={setSearch} placeholder="ابحث بالاسم أو الوظيفة..." />
          <DataTable columns={staffCols} rows={filteredStaff} />
        </>
      ) : (
        <>
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-cream">الوظائف والصلاحيات</h2>
            <ActionButton tone="gold" onClick={() => navigate({ to: "/admin/role-form/$roleId", params: { roleId: "new" } })}>
              <Plus className="h-4 w-4" /> إضافة وظيفة
            </ActionButton>
          </div>
          <DataTable columns={roleCols} rows={store.roles} />
        </>
      )}
    </>
  );
}
