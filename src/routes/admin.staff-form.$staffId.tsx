import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Save } from "lucide-react";
import {
  PageHeader, BackButton, ActionButton, Labeled, TextInput, SelectInput,
} from "@/components/admin/parts";
import { PermissionPicker } from "@/components/admin/PermissionPicker";
import {
  useAdminStore, saveStaff, newId, resolvePermissions, type StaffMember,
} from "@/lib/admin-store";

export const Route = createFileRoute("/admin/staff-form/$staffId")({ component: StaffForm });

const emptyStaff = (): StaffMember => ({
  id: "", name: "", role: "", department: "", email: "", phone: "",
  status: "نشط", joined: "2026", permissions: [],
});

function StaffForm() {
  const { staffId } = Route.useParams();
  const store = useAdminStore();
  const navigate = useNavigate();
  const isNew = staffId === "new";
  const draft = store.staff.find((m) => m.id === staffId) ?? emptyStaff();
  const roles = store.roles;

  const [name, setName] = useState(draft.name);
  const [email, setEmail] = useState(draft.email);
  const [phone, setPhone] = useState(draft.phone);
  const [status, setStatus] = useState<StaffMember["status"]>(draft.status);
  const [roleId, setRoleId] = useState(draft.roleId ?? "");
  const [perms, setPerms] = useState<string[]>([...draft.permissions]);

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
    navigate({ to: "/admin/staff" });
  };

  return (
    <>
      <BackButton label="رجوع للموظفين والوظائف" />
      <PageHeader title={isNew ? "إضافة موظف" : "تعديل موظف"} subtitle={isNew ? "إضافة عضو لفريق العمل" : draft.name} />
      <div className="max-w-3xl rounded-2xl border border-white/10 bg-navy-card/40 p-5 md:p-6">
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
        <div className="mt-6 flex justify-end gap-2">
          <ActionButton tone="outline" onClick={() => navigate({ to: "/admin/staff" })}>إلغاء</ActionButton>
          <ActionButton tone="gold" onClick={submit}><Save className="h-4 w-4" /> حفظ</ActionButton>
        </div>
      </div>
    </>
  );
}
