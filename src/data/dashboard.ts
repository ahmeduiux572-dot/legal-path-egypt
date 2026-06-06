export interface DashCase {
  id: string;
  title: string;
  client: string;
  type: string;
  status: "نشطة" | "قيد المراجعة" | "مغلقة";
  nextDate: string;
  progress: number;
  caseNumber?: string;
  court?: string;
  priority?: "عادية" | "متوسطة" | "عاجلة";
  description?: string;
  files?: string[];
  opponent?: string;
  opponentLawyer?: string;
  degree?: string;
  claimAmount?: number;
  startDate?: string;
}

export interface DashClient {
  id: string;
  name: string;
  phone: string;
  email: string;
  cases: number;
  since: string;
  type?: "فرد" | "شركة";
  city?: string;
  nationalId?: string;
  address?: string;
  notes?: string;
  altPhone?: string;
}

export interface DashSession {
  id: string;
  day: number; // day of month (June 2026)
  title: string;
  client: string;
  time: string;
  location: string;
  type?: string;
  caseRef?: string;
  notes?: string;
  status?: "قادمة" | "منتهية" | "مؤجلة" | "ملغاة";
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
  dueDate?: string;
  item?: string;
  caseRef?: string;
  tax?: number;
  issueDate?: string;
  notes?: string;
}

/* ---------- Shared option lists for dashboard forms ---------- */
export const caseTypes = [
  "قانون الأسرة",
  "تجاري",
  "عمالي",
  "مدني",
  "جنائي",
  "إداري",
  "ملكية فكرية",
  "عقاري",
  "ضرائب",
];

export const courts = [
  "محكمة القاهرة",
  "محكمة الجيزة",
  "محكمة الاقتصادية",
  "محكمة الأسرة",
  "محكمة العمال",
  "محكمة الاستئناف",
  "محكمة النقض",
  "مجلس الدولة",
];

export const sessionTypes = [
  "جلسة مرافعة",
  "جلسة استئناف",
  "استشارة",
  "متابعة قضية",
  "تحضير شهود",
];

export const invoiceItems = [
  "أتعاب قضية",
  "استشارة قانونية",
  "صياغة عقد",
  "تمثيل قانوني",
  "مراجعة مستندات",
];

export const caseDegrees = [
  "أول درجة",
  "استئناف",
  "نقض",
  "تنفيذ",
];

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
  { id: "s1", day: 8, title: "جلسة استئناف", client: "أحمد سمير", time: "10:00 ص", location: "محكمة القاهرة", status: "قادمة" },
  { id: "s2", day: 10, title: "استشارة عقد", client: "شركة النور", time: "01:00 م", location: "أونلاين", status: "قادمة" },
  { id: "s3", day: 15, title: "جلسة تعويض", client: "كريم حسن", time: "11:30 ص", location: "محكمة الجيزة", status: "قادمة" },
  { id: "s4", day: 18, title: "مرافعة علامة", client: "مؤسسة الأمل", time: "09:00 ص", location: "محكمة الاقتصادية", status: "قادمة" },
  { id: "s5", day: 22, title: "متابعة قضية", client: "منى عبد الله", time: "12:00 م", location: "أونلاين", status: "قادمة" },
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

export interface DashConsultation {
  id: string;
  client: string;
  subject: string;
  date: string;
  time: string;
  channel: "أونلاين" | "مكتب" | "هاتف";
  status: "قادمة" | "مكتملة" | "ملغاة";
  price: number;
}

export const dashConsultations: DashConsultation[] = [
  { id: "co1", client: "أحمد سمير", subject: "استشارة نفقة وحضانة", date: "8 يونيو 2026", time: "04:30 م", channel: "أونلاين", status: "قادمة", price: 500 },
  { id: "co2", client: "منى عبد الله", subject: "مراجعة عقد إيجار", date: "10 يونيو 2026", time: "11:00 ص", channel: "مكتب", status: "قادمة", price: 700 },
  { id: "co3", client: "كريم حسن", subject: "نزاع تجاري", date: "3 يونيو 2026", time: "01:00 م", channel: "هاتف", status: "مكتملة", price: 600 },
  { id: "co4", client: "شركة النور", subject: "تأسيس شركة", date: "1 يونيو 2026", time: "10:00 ص", channel: "مكتب", status: "مكتملة", price: 1200 },
  { id: "co5", client: "مؤسسة الأمل", subject: "حماية علامة تجارية", date: "28 مايو 2026", time: "12:00 م", channel: "أونلاين", status: "ملغاة", price: 800 },
];

export interface AIConversation {
  id: string;
  title: string;
  date: string;
  messages: { role: "user" | "ai"; text: string }[];
}

export const aiConversations: AIConversation[] = [
  {
    id: "conv1",
    title: "صياغة مذكرة دفاع",
    date: "أمس",
    messages: [
      { role: "user", text: "ساعدني في صياغة مذكرة دفاع في قضية نفقة." },
      { role: "ai", text: "بالتأكيد، إليك هيكل مذكرة الدفاع: أولاً البيانات، ثانياً الوقائع، ثالثاً الأسانيد القانونية، رابعاً الطلبات..." },
    ],
  },
  {
    id: "conv2",
    title: "إجراءات دعوى تعويض",
    date: "منذ 3 أيام",
    messages: [
      { role: "user", text: "ما هي إجراءات رفع دعوى تعويض إصابة عمل؟" },
      { role: "ai", text: "تبدأ الإجراءات بإثبات إصابة العمل عبر تقرير طبي، ثم تقديم الطلب لجهة العمل والتأمينات، وفي حال الرفض تُرفع الدعوى أمام المحكمة العمالية المختصة..." },
    ],
  },
  {
    id: "conv3",
    title: "مراجعة عقد شراكة",
    date: "منذ أسبوع",
    messages: [
      { role: "user", text: "راجع بنود عقد الشراكة التجارية." },
      { role: "ai", text: "عند مراجعة عقد الشراكة ركّز على: حصص الشركاء، توزيع الأرباح والخسائر، آلية اتخاذ القرار، وشروط الخروج وفض النزاعات..." },
    ],
  },
];