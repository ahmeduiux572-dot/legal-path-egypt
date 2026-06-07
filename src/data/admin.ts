import { lawyers } from "./lawyers";
import { plans } from "./content";
import { dashInvoices, dashConsultations } from "./dashboard";

/* ---------- الاشتراكات ---------- */
export interface Subscription {
  id: string;
  subscriber: string;
  plan: string;
  price: number;
  status: "نشط" | "قيد التجديد" | "منتهٍ";
  startDate: string;
  renewDate: string;
}

const subStatuses: Subscription["status"][] = ["نشط", "نشط", "قيد التجديد", "منتهٍ"];
export const subscriptions: Subscription[] = lawyers.map((l, i) => {
  const plan = plans[i % plans.length];
  return {
    id: `sub-${i + 1}`,
    subscriber: l.name,
    plan: plan.name,
    price: plan.price,
    status: subStatuses[i % subStatuses.length],
    startDate: `${(i % 12) + 1} يناير 2026`,
    renewDate: `${(i % 12) + 1} يناير 2027`,
  };
});

/* ---------- الموظفون ---------- */
export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  status: "نشط" | "إجازة" | "موقوف";
  joined: string;
}

export const employees: Employee[] = [
  { id: "e1", name: "ياسمين عادل", role: "مدير عام", department: "الإدارة", email: "yasmin@mohamy.eg", phone: "+20 100 111 2233", status: "نشط", joined: "مارس 2023" },
  { id: "e2", name: "محمود فؤاد", role: "مسؤول الدعم الفني", department: "الدعم", email: "mahmoud@mohamy.eg", phone: "+20 101 222 3344", status: "نشط", joined: "يوليو 2023" },
  { id: "e3", name: "سارة منيب", role: "أخصائي تسويق", department: "التسويق", email: "sara@mohamy.eg", phone: "+20 102 333 4455", status: "إجازة", joined: "يناير 2024" },
  { id: "e4", name: "كريم وجدي", role: "محاسب", department: "المالية", email: "karim@mohamy.eg", phone: "+20 106 444 5566", status: "نشط", joined: "سبتمبر 2024" },
  { id: "e5", name: "نورهان سامي", role: "مسؤول علاقات المحامين", department: "العمليات", email: "nourhan@mohamy.eg", phone: "+20 109 555 6677", status: "نشط", joined: "فبراير 2025" },
  { id: "e6", name: "أحمد جلال", role: "مطوّر منصة", department: "التقنية", email: "ahmed@mohamy.eg", phone: "+20 111 666 7788", status: "موقوف", joined: "مايو 2025" },
];

/* ---------- الوظائف الشاغرة ---------- */
export interface JobOpening {
  id: string;
  title: string;
  department: string;
  type: "دوام كامل" | "دوام جزئي" | "عن بُعد";
  applicants: number;
  status: "مفتوحة" | "مغلقة";
  posted: string;
}

export const jobOpenings: JobOpening[] = [
  { id: "j1", title: "مستشار قانوني أول", department: "العمليات", type: "دوام كامل", applicants: 24, status: "مفتوحة", posted: "1 يونيو 2026" },
  { id: "j2", title: "أخصائي خدمة عملاء", department: "الدعم", type: "دوام كامل", applicants: 41, status: "مفتوحة", posted: "28 مايو 2026" },
  { id: "j3", title: "مصمم واجهات UX", department: "التقنية", type: "عن بُعد", applicants: 18, status: "مفتوحة", posted: "20 مايو 2026" },
  { id: "j4", title: "محاسب مالي", department: "المالية", type: "دوام جزئي", applicants: 12, status: "مغلقة", posted: "2 مايو 2026" },
];

/* ---------- الإيرادات ---------- */
export interface RevenuePoint {
  month: string;
  consultations: number;
  subscriptions: number;
  cases: number;
}

export const revenueByMonth: RevenuePoint[] = [
  { month: "يناير", consultations: 42000, subscriptions: 58000, cases: 31000 },
  { month: "فبراير", consultations: 48000, subscriptions: 61000, cases: 27000 },
  { month: "مارس", consultations: 53000, subscriptions: 64000, cases: 39000 },
  { month: "أبريل", consultations: 61000, subscriptions: 69000, cases: 44000 },
  { month: "مايو", consultations: 58000, subscriptions: 72000, cases: 51000 },
  { month: "يونيو", consultations: 67000, subscriptions: 78000, cases: 49000 },
];

export const subscriptionsMRR = subscriptions
  .filter((s) => s.status !== "منتهٍ")
  .reduce((sum, s) => sum + s.price, 0);

export const invoicesTotal = dashInvoices.reduce((sum, i) => sum + i.amount, 0);
export const consultationsRevenue = dashConsultations
  .filter((c) => c.status === "مكتملة")
  .reduce((sum, c) => sum + c.price, 0);
