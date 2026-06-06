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
  files?: string[];
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
  {
    id: "c1", title: "نزاع نفقة وحضانة", client: "أحمد سمير", type: "قانون الأسرة", status: "نشطة",
    nextDate: "10 يونيو 2026", progress: 65, caseNumber: "452/2026", court: "محكمة الأسرة",
    priority: "عاجلة", degree: "أول درجة", startDate: "5 يناير 2026", claimAmount: 80000,
    opponent: "سامي عبد الرحمن", opponentLawyer: "الأستاذة هدى فاروق",
    description: "دعوى نفقة وحضانة للأبناء القُصّر مع طلب مؤخر الصداق ونفقة العدة، بناءً على عقد زواج موثق ومستندات إثبات الدخل.",
    files: ["عقد الزواج.pdf", "شهادات ميلاد الأبناء.pdf", "كشف حساب بنكي.pdf"],
  },
  {
    id: "c2", title: "صياغة عقد شراكة", client: "شركة النور", type: "تجاري", status: "قيد المراجعة",
    nextDate: "12 يونيو 2026", progress: 40, caseNumber: "118/2026", court: "محكمة الاقتصادية",
    priority: "متوسطة", degree: "أول درجة", startDate: "20 فبراير 2026", claimAmount: 1500000,
    opponent: "—", opponentLawyer: "—",
    description: "صياغة ومراجعة عقد شراكة تجارية بين شركة النور وشريك مستثمر، مع تحديد حصص الشركاء وآلية توزيع الأرباح وشروط فض النزاع.",
    files: ["مسودة العقد.docx", "السجل التجاري.pdf"],
  },
  {
    id: "c3", title: "تعويض إصابة عمل", client: "كريم حسن", type: "عمالي", status: "نشطة",
    nextDate: "15 يونيو 2026", progress: 80, caseNumber: "274/2026", court: "محكمة العمال",
    priority: "عاجلة", degree: "استئناف", startDate: "12 نوفمبر 2025", claimAmount: 250000,
    opponent: "مصنع الدلتا للصناعات", opponentLawyer: "الأستاذ وليد منصور",
    description: "دعوى تعويض عن إصابة عمل أدت إلى عجز جزئي، مع المطالبة بفروق الأجر ومستحقات التأمينات الاجتماعية.",
    files: ["تقرير طبي.pdf", "محضر الإصابة.pdf", "عقد العمل.pdf"],
  },
  {
    id: "c4", title: "دعوى إيجار", client: "منى عبد الله", type: "مدني", status: "مغلقة",
    nextDate: "—", progress: 100, caseNumber: "061/2025", court: "محكمة القاهرة",
    priority: "عادية", degree: "تنفيذ", startDate: "3 مارس 2025", claimAmount: 45000,
    opponent: "ورثة المرحوم حسن علي", opponentLawyer: "الأستاذ ماجد سعيد",
    description: "دعوى إخلاء عين مؤجرة لعدم سداد الأجرة، صدر فيها حكم نهائي لصالح الموكلة وتم التنفيذ.",
    files: ["عقد الإيجار.pdf", "الحكم النهائي.pdf"],
  },
  {
    id: "c5", title: "نزاع علامة تجارية", client: "مؤسسة الأمل", type: "ملكية فكرية", status: "نشطة",
    nextDate: "18 يونيو 2026", progress: 25, caseNumber: "390/2026", court: "محكمة الاقتصادية",
    priority: "متوسطة", degree: "أول درجة", startDate: "1 أبريل 2026", claimAmount: 600000,
    opponent: "شركة الريادة", opponentLawyer: "الأستاذة نهى جمال",
    description: "دعوى حماية علامة تجارية مسجلة ومنع الغير من استخدامها، مع المطالبة بالتعويض عن الأضرار التجارية.",
    files: ["شهادة تسجيل العلامة.pdf", "صور المنتجات المخالفة.pdf"],
  },
];

export const dashClients: DashClient[] = [
  {
    id: "u1", name: "أحمد سمير", phone: "+20 100 123 4567", altPhone: "+20 122 998 7654",
    email: "ahmed@mail.com", cases: 2, since: "يناير 2025", type: "فرد", city: "القاهرة",
    nationalId: "28704121200513", address: "12 شارع التحرير، الدقي، الجيزة",
    notes: "عميل متعاون، يفضّل التواصل مساءً عبر الهاتف.",
    files: ["صورة البطاقة.pdf", "توكيل رسمي.pdf"],
  },
  {
    id: "u2", name: "منى عبد الله", phone: "+20 101 234 5678", altPhone: "+20 111 222 3344",
    email: "mona@mail.com", cases: 1, since: "مارس 2025", type: "فرد", city: "الإسكندرية",
    nationalId: "29103154500218", address: "8 شارع فؤاد، محطة الرمل، الإسكندرية",
    notes: "تم إغلاق قضيتها بنجاح وقد توصي بمكتبنا لمعارفها.",
  },
  {
    id: "u3", name: "كريم حسن", phone: "+20 102 345 6789", altPhone: "+20 100 555 6677",
    email: "karim@mail.com", cases: 3, since: "نوفمبر 2024", type: "فرد", city: "الجيزة",
    nationalId: "28912091800437", address: "45 شارع الهرم، الجيزة",
    notes: "لديه أكثر من قضية، يحتاج متابعة دورية لمواعيد الجلسات.",
  },
  {
    id: "u4", name: "شركة النور", phone: "+20 103 456 7890", altPhone: "+20 2 3760 1122",
    email: "info@noor.com", cases: 1, since: "مايو 2025", type: "شركة", city: "القاهرة",
    nationalId: "سجل تجاري 145872", address: "برج النيل، كورنيش النيل، ماسبيرو، القاهرة",
    notes: "ممثل الشركة القانوني: م. طارق النجار — جميع المراسلات عبر البريد الرسمي.",
    files: ["السجل التجاري.pdf", "البطاقة الضريبية.pdf", "عقد التأسيس.pdf"],
  },
  {
    id: "u5", name: "مؤسسة الأمل", phone: "+20 104 567 8901", altPhone: "+20 2 2680 4455",
    email: "contact@amal.com", cases: 1, since: "فبراير 2025", type: "شركة", city: "القاهرة",
    nationalId: "سجل تجاري 209914", address: "22 شارع مكرم عبيد، مدينة نصر، القاهرة",
    notes: "مؤسسة خيرية، يلزم التنسيق المسبق قبل أي جلسة.",
  },
];

export const dashSessions: DashSession[] = [
  { id: "s1", day: 8, title: "جلسة استئناف", client: "أحمد سمير", time: "10:00 ص", location: "محكمة الأسرة", status: "قادمة", type: "جلسة مرافعة", caseRef: "نزاع نفقة وحضانة", notes: "تقديم مذكرة الدفاع وحافظة المستندات قبل بدء الجلسة." },
  { id: "s2", day: 10, title: "استشارة عقد", client: "شركة النور", time: "01:00 م", location: "أونلاين", status: "قادمة", type: "استشارة", caseRef: "صياغة عقد شراكة", notes: "مراجعة البنود المالية مع ممثل الشركة عبر مكالمة فيديو." },
  { id: "s3", day: 15, title: "جلسة تعويض", client: "كريم حسن", time: "11:30 ص", location: "محكمة العمال", status: "قادمة", type: "جلسة استئناف", caseRef: "تعويض إصابة عمل", notes: "استدعاء الشاهد وإحضار التقرير الطبي المحدّث." },
  { id: "s4", day: 18, title: "مرافعة علامة", client: "مؤسسة الأمل", time: "09:00 ص", location: "محكمة الاقتصادية", status: "قادمة", type: "جلسة مرافعة", caseRef: "نزاع علامة تجارية", notes: "عرض أدلة المخالفة وشهادة تسجيل العلامة." },
  { id: "s5", day: 22, title: "متابعة قضية", client: "منى عبد الله", time: "12:00 م", location: "أونلاين", status: "قادمة", type: "متابعة قضية", caseRef: "دعوى إيجار", notes: "متابعة إجراءات التنفيذ بعد صدور الحكم." },
];

export const dashReminders: DashReminder[] = [
  { id: "r1", text: "تسليم مذكرة دفاع قضية أحمد سمير", due: "اليوم", urgent: true },
  { id: "r2", text: "مراجعة عقد شركة النور قبل الجلسة", due: "خلال يومين", urgent: false },
  { id: "r3", text: "تجديد توكيل قضية كريم حسن", due: "20 يونيو", urgent: false },
];

export const dashInvoices: DashInvoice[] = [
  { id: "i1", number: "INV-2041", client: "أحمد سمير", amount: 5000, date: "2 يونيو 2026", status: "مدفوعة", item: "أتعاب قضية", caseRef: "نزاع نفقة وحضانة", tax: 14, issueDate: "2 يونيو 2026", dueDate: "12 يونيو 2026", notes: "الدفعة الأولى من أتعاب القضية، تم السداد نقداً." },
  { id: "i2", number: "INV-2042", client: "شركة النور", amount: 12000, date: "4 يونيو 2026", status: "معلقة", item: "صياغة عقد", caseRef: "صياغة عقد شراكة", tax: 14, issueDate: "4 يونيو 2026", dueDate: "18 يونيو 2026", notes: "أتعاب صياغة ومراجعة عقد الشراكة التجارية." },
  { id: "i3", number: "INV-2043", client: "كريم حسن", amount: 6500, date: "5 يونيو 2026", status: "مدفوعة", item: "تمثيل قانوني", caseRef: "تعويض إصابة عمل", tax: 14, issueDate: "5 يونيو 2026", dueDate: "15 يونيو 2026", notes: "أتعاب التمثيل أمام محكمة العمال." },
  { id: "i4", number: "INV-2039", client: "منى عبد الله", amount: 3000, date: "28 مايو 2026", status: "متأخرة", item: "أتعاب قضية", caseRef: "دعوى إيجار", tax: 14, issueDate: "28 مايو 2026", dueDate: "4 يونيو 2026", notes: "الدفعة الأخيرة بعد صدور الحكم، متأخرة عن موعد الاستحقاق." },
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
  duration?: string;
  caseRef?: string;
  notes?: string;
}

export const dashConsultations: DashConsultation[] = [
  { id: "co1", client: "أحمد سمير", subject: "استشارة نفقة وحضانة", date: "8 يونيو 2026", time: "04:30 م", channel: "أونلاين", status: "قادمة", price: 500, duration: "45 دقيقة", caseRef: "نزاع نفقة وحضانة", notes: "مناقشة خطوات رفع دعوى النفقة والمستندات المطلوبة." },
  { id: "co2", client: "منى عبد الله", subject: "مراجعة عقد إيجار", date: "10 يونيو 2026", time: "11:00 ص", channel: "مكتب", status: "قادمة", price: 700, duration: "30 دقيقة", caseRef: "دعوى إيجار", notes: "مراجعة بنود عقد إيجار جديد قبل التوقيع." },
  { id: "co3", client: "كريم حسن", subject: "نزاع تجاري", date: "3 يونيو 2026", time: "01:00 م", channel: "هاتف", status: "مكتملة", price: 600, duration: "20 دقيقة", notes: "تم توضيح الموقف القانوني وإحالة الموضوع لقسم القضايا." },
  { id: "co4", client: "شركة النور", subject: "تأسيس شركة", date: "1 يونيو 2026", time: "10:00 ص", channel: "مكتب", status: "مكتملة", price: 1200, duration: "60 دقيقة", caseRef: "صياغة عقد شراكة", notes: "استشارة حول الشكل القانوني الأنسب للشركة والإجراءات." },
  { id: "co5", client: "مؤسسة الأمل", subject: "حماية علامة تجارية", date: "28 مايو 2026", time: "12:00 م", channel: "أونلاين", status: "ملغاة", price: 800, duration: "40 دقيقة", caseRef: "نزاع علامة تجارية", notes: "أُلغيت بناءً على طلب العميل وأُعيد الجدولة لاحقاً." },
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