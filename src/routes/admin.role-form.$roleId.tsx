import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Save } from "lucide-react";
import {
  PageHeader, BackButton, ActionButton, Labeled, TextInput,
} from "@/components/admin/parts";
import { PermissionPicker } from "@/components/admin/PermissionPicker";
import type { JobRole } from "@/data/permissions";
import { useAdminStore, saveRole, newId } from "@/lib/admin-store";

export const Route = createFileRoute("/admin/role-form/$roleId")({ component: RoleForm });

function RoleForm() {
  const { roleId } = Route.useParams();
  const store = useAdminStore();
  const navigate = useNavigate();
  const isNew = roleId === "new";
  const existing = store.roles.find((r) => r.id === roleId);
  const draft: JobRole = existing ?? { id: "", title: "", department: "", permissions: [] };

  const [title, setTitle] = useState(draft.title);
  const [department, setDepartment] = useState(draft.department);
  const [perms, setPerms] = useState<string[]>([...draft.permissions]);

  const submit = () => {
    if (!title.trim()) return;
    saveRole({ id: draft.id || newId("role"), title: title.trim(), department: department.trim(), permissions: perms });
    navigate({ to: "/admin/staff" });
  };

  return (
    <>
      <BackButton label="رجوع للموظفين والوظائف" />
      <PageHeader title={isNew ? "إضافة وظيفة" : "تعديل الوظيفة"} subtitle={isNew ? "تعريف وظيفة وصلاحياتها" : draft.title} />
      <div className="max-w-3xl rounded-2xl border border-white/10 bg-navy-card/40 p-5 md:p-6">
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
        <div className="mt-6 flex justify-end gap-2">
          <ActionButton tone="outline" onClick={() => navigate({ to: "/admin/staff" })}>إلغاء</ActionButton>
          <ActionButton tone="gold" onClick={submit}><Save className="h-4 w-4" /> حفظ</ActionButton>
        </div>
      </div>
    </>
  );
}
