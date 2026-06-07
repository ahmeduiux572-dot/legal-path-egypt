import { useSyncExternalStore } from "react";
import { plans as seedPlans, type Plan } from "@/data/content";
import { employees as seedEmployees, jobOpenings as seedJobs, type Employee, type JobOpening } from "@/data/admin";
import { defaultRoles, type JobRole, ALL_PERMISSIONS } from "@/data/permissions";

export type AppStatus = "pending" | "approved" | "rejected";
export type CaseStatus = "pending" | "published" | "rejected";
export type BlockKind = "lawyer" | "firm" | "client";

export interface StaffMember extends Employee {
  roleId?: string;
  permissions: string[]; // معرّفات أو ["all"]
}

export interface AdminState {
  blocked: Record<string, boolean>;
  applications: Record<string, AppStatus>;
  cases: Record<string, CaseStatus>;
  packages: Plan[];
  roles: JobRole[];
  staff: StaffMember[];
  jobs: JobOpening[];
}

const KEY = "mohamy_admin_data_v1";
const listeners = new Set<() => void>();

function seedStaff(): StaffMember[] {
  return seedEmployees.map((e) => {
    const role = defaultRoles.find((r) => r.title === e.role);
    return {
      ...e,
      roleId: role?.id,
      permissions: role ? [...role.permissions] : [],
    };
  });
}

function seed(): AdminState {
  return {
    blocked: {},
    applications: {},
    cases: {},
    packages: seedPlans.map((p) => ({ ...p, features: [...p.features] })),
    roles: defaultRoles.map((r) => ({ ...r, permissions: [...r.permissions] })),
    staff: seedStaff(),
    jobs: seedJobs.map((j) => ({ ...j })),
  };
}

const SERVER_SNAPSHOT = seed();
let state: AdminState | null = null;

function load(): AdminState {
  if (state) return state;
  if (typeof window === "undefined") return SERVER_SNAPSHOT;
  try {
    const raw = window.localStorage.getItem(KEY);
    state = raw ? { ...seed(), ...(JSON.parse(raw) as Partial<AdminState>) } : seed();
  } catch {
    state = seed();
  }
  return state;
}

function persist() {
  if (typeof window !== "undefined" && state) {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }
}

function set(updater: (s: AdminState) => AdminState) {
  state = updater(load());
  persist();
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function useAdminStore(): AdminState {
  return useSyncExternalStore(subscribe, load, () => SERVER_SNAPSHOT);
}

/* ---------- الحظر ---------- */
const blockKey = (kind: BlockKind, id: string) => `${kind}:${id}`;
export function toggleBlock(kind: BlockKind, id: string) {
  set((s) => {
    const k = blockKey(kind, id);
    const blocked = { ...s.blocked };
    if (blocked[k]) delete blocked[k];
    else blocked[k] = true;
    return { ...s, blocked };
  });
}
export function isBlocked(s: AdminState, kind: BlockKind, id: string) {
  return Boolean(s.blocked[blockKey(kind, id)]);
}

/* ---------- طلبات التسجيل ---------- */
export function setApplicationStatus(id: string, status: AppStatus) {
  set((s) => ({ ...s, applications: { ...s.applications, [id]: status } }));
}
export function appStatus(s: AdminState, id: string): AppStatus {
  return s.applications[id] ?? "pending";
}

/* ---------- سوق القضايا ---------- */
export function setCaseStatus(id: string, status: CaseStatus) {
  set((s) => ({ ...s, cases: { ...s.cases, [id]: status } }));
}
export function caseStatus(s: AdminState, id: string): CaseStatus {
  return s.cases[id] ?? "pending";
}

/* ---------- الباقات ---------- */
export function savePackage(pkg: Plan) {
  set((s) => {
    const exists = s.packages.some((p) => p.id === pkg.id);
    return {
      ...s,
      packages: exists
        ? s.packages.map((p) => (p.id === pkg.id ? pkg : p))
        : [...s.packages, pkg],
    };
  });
}
export function deletePackage(id: string) {
  set((s) => ({ ...s, packages: s.packages.filter((p) => p.id !== id) }));
}

/* ---------- الوظائف والأدوار ---------- */
export function saveRole(role: JobRole) {
  set((s) => {
    const exists = s.roles.some((r) => r.id === role.id);
    return {
      ...s,
      roles: exists ? s.roles.map((r) => (r.id === role.id ? role : r)) : [...s.roles, role],
    };
  });
}
export function deleteRole(id: string) {
  set((s) => ({ ...s, roles: s.roles.filter((r) => r.id !== id) }));
}

/* ---------- الوظائف الشاغرة ---------- */
export function saveJob(job: JobOpening) {
  set((s) => {
    const exists = s.jobs.some((j) => j.id === job.id);
    return {
      ...s,
      jobs: exists ? s.jobs.map((j) => (j.id === job.id ? job : j)) : [...s.jobs, job],
    };
  });
}
export function deleteJob(id: string) {
  set((s) => ({ ...s, jobs: s.jobs.filter((j) => j.id !== id) }));
}

/* ---------- الموظفون ---------- */
export function saveStaff(member: StaffMember) {
  set((s) => {
    const exists = s.staff.some((m) => m.id === member.id);
    return {
      ...s,
      staff: exists ? s.staff.map((m) => (m.id === member.id ? member : m)) : [...s.staff, member],
    };
  });
}
export function deleteStaff(id: string) {
  set((s) => ({ ...s, staff: s.staff.filter((m) => m.id !== id) }));
}

export function resolvePermissions(role: JobRole | undefined): string[] {
  if (!role) return [];
  return role.permissions.includes(ALL_PERMISSIONS) ? [ALL_PERMISSIONS] : [...role.permissions];
}

export function newId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}${Math.floor(Math.random() * 1e4).toString(36)}`;
}