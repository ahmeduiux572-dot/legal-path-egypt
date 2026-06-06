export interface DashCase {
  id: string;
  title: string;
  client: string;
  type: string;
  status: "نشطة" | "قيد المراجعة" | "مغلقة";
  nextDate: string;
  progress: number;
}

export interface DashClient {
  id: string;
  name: string;
  phone: string;
  email: string;
  cases: number;
  since: string;
}

export interface DashSession {
  id: string;
  day: number; // day of month (June 2026)
  title: string;
  client: string;
  time: string;
  location: string;
}

export interface DashReminder {
  id: string;
  text: string;
  due: string;
  urgent: boolean;
}

export interface DashInvoice {
  id: string;
  number: string;
  client: string;
  amount: number;
  date: string;
  status: "مدفوعة" | "معلقة" | "متأخرة";
}

export interface WalletTx {
  id: string;
  label: string;
  date: string;
  amount: number; // positive = deposit, negative = withdrawal
}

export const dashCases: DashCase[] = [
  { id: "c1", title: "نزاع نفقة وحضانة", client: "أحمد سمير", type: "قانون الأسرة", status: "نشطة", nextDate: "10 يونيو", progress: 65 },
  { id: "c2", title: "صياغة عقد شراكة", client: "شركة النور", type: "تجاري", status: "قيد المراجعة", nextDate: "12 يونيو", progress: 40 },
  { id: "c3", title: "تعويض إصابة عمل", client: "كريم حسن", type: "عمالي", status: "نشطة", nextDate: "15 يونيو", progress: 80 },
  { id: "c4", title: "دعوى إيجار", client: "منى عبد الله", type: "مدني", status: "مغلقة", nextDate: "—", progress: 100 },
  { id: "c5", title: "نزاع علامة تجارية", client: "مؤسسة الأمل", type: "ملكية فكرية", status: "نشطة", nextDate: "18 يونيو", progress: 25 },
];

export const dashClients: DashClient[] = [
  { id: "u1", name: "أحمد سمير", phone: "+20 100 123 4567", email: "ahmed@mail.com", cases: 2, since: "يناير 2025" },
  { id: "u2", name: "منى عبد الله", phone: "+20 101 234 5678", email: "mona@mail.com", cases: 1, since: "مارس 2025" },
  { id: "u3", name: "كريم حسن", phone: "+20 102 345 6789", email: "karim@mail.com", cases: 3, since: "نوفمبر 2024" },
  { id: "u4", name: "شركة النور", phone: "+20 103 456 7890", email: "info@noor.com", cases: 1, since: "مايو 2025" },
  { id: "u5", name: "مؤسسة الأمل", phone: "+20 104 567 8901", email: "contact@amal.com", cases: 1, since: "فبراير 2025" },
];

export const dashSessions: DashSession[] = [
  { id: "s1", day: 8, title: "جلسة استئناف", client: "أحمد سمير", time: "10:00 ص", location: "محكمة القاهرة" },
  { id: "s2", day: 10, title: "استشارة عقد", client: "شركة النور", time: "01:00 م", location: "أونلاين" },
  { id: "s3", day: 15, title: "جلسة تعويض", client: "كريم حسن", time: "11:30 ص", location: "محكمة الجيزة" },
  { id: "s4", day: 18, title: "مرافعة علامة", client: "مؤسسة الأمل", time: "09:00 ص", location: "محكمة الاقتصادية" },
  { id: "s5", day: 22, title: "متابعة قضية", client: "منى عبد الله", time: "12:00 م", location: "أونلاين" },
];

export const dashReminders: DashReminder[] = [
  { id: "r1", text: "تسليم مذكرة دفاع قضية أحمد سمير", due: "اليوم", urgent: true },
  { id: "r2", text: "مراجعة عقد شركة النور قبل الجلسة", due: "خلال يومين", urgent: false },
  { id: "r3", text: "تجديد توكيل قضية كريم حسن", due: "20 يونيو", urgent: false },
];

export const dashInvoices: DashInvoice[] = [
  { id: "i1", number: "INV-2041", client: "أحمد سمير", amount: 5000, date: "2 يونيو 2026", status: "مدفوعة" },
  { id: "i2", number: "INV-2042", client: "شركة النور", amount: 12000, date: "4 يونيو 2026", status: "معلقة" },
  { id: "i3", number: "INV-2043", client: "كريم حسن", amount: 6500, date: "5 يونيو 2026", status: "مدفوعة" },
  { id: "i4", number: "INV-2039", client: "منى عبد الله", amount: 3000, date: "28 مايو 2026", status: "متأخرة" },
];

export const walletTransactions: WalletTx[] = [
  { id: "w1", label: "دفعة قضية أحمد سمير", date: "2 يونيو 2026", amount: 5000 },
  { id: "w2", label: "سحب إلى المحفظة الإلكترونية", date: "30 مايو 2026", amount: -8000 },
  { id: "w3", label: "دفعة قضية كريم حسن", date: "5 يونيو 2026", amount: 6500 },
  { id: "w4", label: "دفعة استشارة", date: "27 مايو 2026", amount: 2000 },
];

export const walletBalance = 42500;