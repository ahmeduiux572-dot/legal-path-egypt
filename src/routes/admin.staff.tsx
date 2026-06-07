import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, Pencil, Trash2, ShieldCheck } from "lucide-react";
import {
  PageHeader, DataTable, Badge, StatCard, Toolbar, ActionButton,
  AdminDialog, Labeled, TextInput, SelectInput, type Column,
} from "@/components/admin/parts";
import {
  permissionGroups, rolePermissionLabels, ALL_PERMISSIONS, type JobRole,
} from "@/data/permissions";
import {
  useAdminStore, saveRole, deleteRole, saveStaff, deleteStaff, newId,
  resolvePermissions, type StaffMember,
} from "@/lib/admin-store";

export const Route = createFileRoute("/admin/staff")({ component: StaffPage });
const fmt = (n: number) => new Intl.NumberFormat("ar-EG").format(n);

const emptyRole = (): JobRole => ({ id: "", title: "", department: "", permissions: [] });
const emptyStaff = (): StaffMember => ({
  id: "", name: "", role: "", department: "", email: "", phone: "",
  status: "نشط", joined: "2026", permissions: [],
});

function StaffPage() {
  const store = useAdminStore();
  const [search, setSearch] = useState("");
  const [roleEdit, setRoleEdit] = useState<JobRole | null>(null);
  const [staffEdit, setStaffEdit] = useState<StaffMember | null>(null);
  const [del, setDel] = useState<{ kind: "role" | "staff"; id: string; name: string } | null>(null);

  const filteredStaff = useMemo(
    () => store.staff.filter((m) => m.name.includes(search) || m.role.includes(search) || m.email.includes(search)),
    [store.staff, search],
  );

  const roleCols: Column<JobRole>[] = [
    { key: "title", label: "الوظيفة", render: (r) => <span className="font-semibold text-cream">{r.title}</span> },
    { key: "department", label: "القسم", render: (r) => <Badge tone="blue">{r.department}</Badge> },
    {
      key: "permissions", label: "الصلاحيات",
      render: (r) => <Badge tone={r.permissions.includes(ALL_PERMISSIONS) ? "gold" : "muted"}>{rolePermissionLabels(r)}</Badge>,
    },
    {
      key: "actions", label: "",
      render: (r) => (
        <div className="flex justify-end gap-2">
          <ActionButton tone="outline" onClick={() => setRoleEdit({ ...r, permissions: [...r.permissions] })}>
            <Pencil className="h-4 w-4" /> تعديل
          </ActionButton>
          <ActionButton tone="red" onClick={() => setDel({ kind: "role", id: r.id, name: r.title })}>
            <Trash2 className="h-4 w-4" />
          </ActionButton>
        </div>
      ),
    },
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
    {
      key: "actions", label: "",
      render: (r) => (
        <div className="flex justify-end gap-2">
          <ActionButton tone="outline" onClick={() => setStaffEdit({ ...r, permissions: [...r.permissions] })}>
            <Pencil className="h-4 w-4" /> تعديل
          </ActionButton>
          <ActionButton tone="red" onClick={() => setDel({ kind: "staff", id: r.id, name: r.name })}>
            <Trash2 className="h-4 w-4" />
          </ActionButton>
        </div>
      ),
    },
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

      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-bold text-cream">الوظائف والصلاحيات</h2>
        <ActionButton tone="gold" onClick={() => setRoleEdit(emptyRole())}>
          <Plus className="h-4 w-4" /> إضافة وظيفة
        </ActionButton>
      </div>
      <DataTable columns={roleCols} rows={store.roles} />

      <div className="mb-3 mt-8 flex items-center justify-between">
        <h2 className="text-lg font-bold text-cream">الموظفون</h2>
        <ActionButton tone="gold" onClick={() => setStaffEdit(emptyStaff())}>
          <Plus className="h-4 w-4" /> إضافة موظف
        </ActionButton>
      </div>
      <Toolbar search={search} onSearch={setSearch} placeholder="ابحث بالاسم أو الوظيفة..." />
      <DataTable columns={staffCols} rows={filteredStaff} />

      {roleEdit && <RoleForm draft={roleEdit} onClose={() => setRoleEdit(null)} />}
      {staffEdit && <StaffForm draft={staffEdit} roles={store.roles} onClose={() => setStaffEdit(null)} />}

      {del && (
        <AdminDialog open onOpenChange={(v) => !v && setDel(null)} title="تأكيد الحذف" className="sm:max-w-md">
          <p className="text-sm text-cream/70">هل أنت متأكد من حذف «{del.name}»؟</p>
          <div className="mt-5 flex justify-end gap-2">
            <ActionButton tone="outline" onClick={() => setDel(null)}>إلغاء</ActionButton>
            <ActionButton tone="red" onClick={() => { del.kind === "role" ? deleteRole(del.id) : deleteStaff(del.id); setDel(null); }}>
              <Trash2 className="h-4 w-4" /> حذف
            </ActionButton>
          </div>
        </AdminDialog>
      )}
    </>
  );
}

/* ---------- محرر الصلاحيات ---------- */
function PermissionPicker({
  selected, onChange,
}: {
  selected: string[];
  onChange: (perms: string[]) => void;
}) {
  const all = selected.includes(ALL_PERMISSIONS);
  const toggle = (id: string) => {
    if (all) return;
    onChange(selected.includes(id) ? selected.filter((p) => p !== id) : [...selected, id]);
  };
  return (
    <div className="rounded-2xl border border-white/10 bg-navy-card/40 p-4">
      <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-gold">
        <input
          type="checkbox"
          checked={all}
          onChange={(e) => onChange(e.target.checked ? [ALL_PERMISSIONS] : [])}
          className="h-4 w-4 accent-gold"
        />
        <ShieldCheck className="h-4 w-4" /> كل الصلاحيات
      </label>
      <div className={`grid gap-4 sm:grid-cols-2 ${all ? "pointer-events-none opacity-40" : ""}`}>
        {permissionGroups.map((g) => (
          <div key={g.group}>
            <div className="mb-1.5 text-xs font-bold text-cream/70">{g.group}</div>
            <div className="space-y-1.5">
              {g.items.map((p) => (
                <label key={p.id} className="flex items-center gap-2 text-sm text-cream/80">
                  <input
                    type="checkbox"
                    checked={all || selected.includes(p.id)}
                    onChange={() => toggle(p.id)}
                    className="h-4 w-4 accent-gold"
                  />
                  {p.label}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RoleForm({ draft, onClose }: { draft: JobRole; onClose: () => void }) {
  const [title, setTitle] = useState(draft.title);
  const [department, setDepartment] = useState(draft.department);
  const [perms, setPerms] = useState<string[]>(draft.permissions);

  const submit = () => {
    if (!title.trim()) return;
    saveRole({ id: draft.id || newId("role"), title: title.trim(), department: department.trim(), permissions: perms });
    onClose();
  };
  return (
    <AdminDialog open onOpenChange={(v) => !v && onClose()} title={draft.id ? "تعديل الوظيفة" : "إضافة وظيفة"}>
      <div className="grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Labeled label="مسمى الوظيفة"><TextInput value={title} onChange={(e) => setTitle(e.target.value)} placeholder="مثال: مدير عمليات" /></Labeled>
          <Labeled label="القسم"><TextInput value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="مثال: العمليات" /></Labeled>
        </div>
        <div>
          <span className="mb-1.5 block text-xs font-semibold text-cream/70">الصلاحيات</span>
          <PermissionPicker selected={perms} onChange={setPerms} />
        </div>
      </div>
      <div className="mt-5 flex justify-end gap-2">
        <ActionButton tone="outline" onClick={onClose}>إلغاء</ActionButton>
        <ActionButton tone="gold" onClick={submit}>حفظ</ActionButton>
      </div>
    </AdminDialog>
  );
}

function StaffForm({ draft, roles, onClose }: { draft: StaffMember; roles: JobRole[]; onClose: () => void }) {
  const [name, setName] = useState(draft.name);
  const [email, setEmail] = useState(draft.email);
  const [phone, setPhone] = useState(draft.phone);
  const [status, setStatus] = useState<StaffMember["status"]>(draft.status);
  const [roleId, setRoleId] = useState(draft.roleId ?? "");
  const [perms, setPerms] = useState<string[]>(draft.permissions);

  const onRoleChange = (id: string) => {
    setRoleId(id);
    const role = roles.find((r) => r.id === id);
    if (role) setPerms(resolvePermissions(role));
  };

  const submit = () => {
    if (!name.trim()) return;
    const role = roles.find((r) => r.id === roleId);
    saveStaff({
      ...draft,
      id: draft.id || newId("emp"),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      status,
      roleId: roleId || undefined,
      role: role?.title ?? draft.role ?? "—",
      department: role?.department ?? draft.department ?? "—",
      permissions: perms,
    });
    onClose();
  };

  return (
    <AdminDialog open onOpenChange={(v) => !v && onClose()} title={draft.id ? "تعديل موظف" : "إضافة موظف"}>
      <div className="grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Labeled label="الاسم"><TextInput value={name} onChange={(e) => setName(e.target.value)} /></Labeled>
          <Labeled label="البريد الإلكتروني"><TextInput dir="ltr" value={email} onChange={(e) => setEmail(e.target.value)} /></Labeled>
          <Labeled label="الهاتف"><TextInput dir="ltr" value={phone} onChange={(e) => setPhone(e.target.value)} /></Labeled>
          <Labeled label="الحالة">
            <SelectInput
              value={status}
              onChange={(v) => setStatus(v as StaffMember["status"])}
              options={[
                { value: "نشط", label: "نشط" },
                { value: "إجازة", label: "إجازة" },
                { value: "موقوف", label: "موقوف" },
              ]}
            />
          </Labeled>
        </div>
        <Labeled label="الوظيفة">
          <SelectInput
            value={roleId}
            onChange={onRoleChange}
            options={[{ value: "", label: "— اختر الوظيفة —" }, ...roles.map((r) => ({ value: r.id, label: r.title }))]}
          />
        </Labeled>
        <div>
          <span className="mb-1.5 block text-xs font-semibold text-cream/70">
            الصلاحيات {roleId && <span className="text-cream/45">(محمّلة من الوظيفة — يمكن تعديلها)</span>}
          </span>
          <PermissionPicker selected={perms} onChange={setPerms} />
        </div>
      </div>
      <div className="mt-5 flex justify-end gap-2">
        <ActionButton tone="outline" onClick={onClose}>إلغاء</ActionButton>
        <ActionButton tone="gold" onClick={submit}>حفظ</ActionButton>
      </div>
    </AdminDialog>
  );
}
