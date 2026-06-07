/* ---------- صلاحيات لوحة الإدارة ---------- */
export interface Permission {
  id: string;
  label: string;
  group: string;
}

export const permissions: Permission[] = [
  { id: "lawyers.view", label: "عرض المحامين", group: "المحامون" },
  { id: "lawyers.approve", label: "قبول/رفض طلبات المحامين", group: "المحامون" },
  { id: "lawyers.block", label: "حظر المحامين", group: "المحامون" },
  { id: "firms.view", label: "عرض المكاتب", group: "المكاتب" },
  { id: "firms.approve", label: "قبول/رفض طلبات المكاتب", group: "المكاتب" },
  { id: "firms.block", label: "حظر المكاتب", group: "المكاتب" },
  { id: "consultations.view", label: "إدارة الاستشارات", group: "الاستشارات" },
  { id: "cases.view", label: "عرض سوق القضايا", group: "سوق القضايا" },
  { id: "cases.publish", label: "نشر/رفض القضايا", group: "سوق القضايا" },
  { id: "clients.view", label: "عرض العملاء", group: "العملاء" },
  { id: "clients.block", label: "حظر العملاء", group: "العملاء" },
  { id: "plans.manage", label: "إدارة الباقات", group: "الباقات" },
  { id: "subscriptions.view", label: "إدارة الاشتراكات", group: "الاشتراكات" },
  { id: "revenue.view", label: "عرض الإيرادات والفواتير", group: "الإيرادات" },
  { id: "staff.manage", label: "إدارة الموظفين والوظائف", group: "الموظفون" },
  { id: "settings.manage", label: "إدارة الإعدادات", group: "الإعدادات" },
];

export const ALL_PERMISSIONS = "all";

export const permissionGroups = Array.from(
  permissions.reduce((map, p) => {
    map.set(p.group, [...(map.get(p.group) ?? []), p]);
    return map;
  }, new Map<string, Permission[]>()),
).map(([group, items]) => ({ group, items }));

export function permissionLabel(id: string): string {
  return permissions.find((p) => p.id === id)?.label ?? id;
}

export interface JobRole {
  id: string;
  title: string;
  department: string;
  /** قائمة معرّفات الصلاحيات، أو ["all"] لكل الصلاحيات */
  permissions: string[];
}

export const defaultRoles: JobRole[] = [
  { id: "role-admin", title: "مدير عام", department: "الإدارة", permissions: [ALL_PERMISSIONS] },
  { id: "role-support", title: "مسؤول الدعم الفني", department: "الدعم", permissions: ["consultations.view", "clients.view", "lawyers.view", "firms.view"] },
  { id: "role-marketing", title: "أخصائي تسويق", department: "التسويق", permissions: ["lawyers.view", "firms.view", "cases.view"] },
  { id: "role-accountant", title: "محاسب", department: "المالية", permissions: ["revenue.view", "subscriptions.view", "plans.manage"] },
  { id: "role-ops", title: "مسؤول علاقات المحامين", department: "العمليات", permissions: ["lawyers.view", "lawyers.approve", "firms.view", "firms.approve", "cases.view", "cases.publish"] },
  { id: "role-dev", title: "مطوّر منصة", department: "التقنية", permissions: ["settings.manage"] },
];

export function rolePermissionLabels(role: JobRole): string {
  if (role.permissions.includes(ALL_PERMISSIONS)) return "كل الصلاحيات";
  return `${role.permissions.length} صلاحية`;
}