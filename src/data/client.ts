export interface ClientConsultation {
  id: string;
  lawyer: string;
  lawyerTitle: string;
  subject: string;
  date: string;
  time: string;
  channel: "أونلاين" | "مكتب" | "هاتف";
  status: "قادمة" | "مكتملة" | "ملغاة";
  price: number;
  duration?: string;
  notes?: string;
}

export interface ClientCase {
  id: string;
  title: string;
  category: string;
  budget: string;
  status: "مفتوحة" | "قيد التنفيذ" | "مغلقة";
  proposals: number;
  date: string;
}

export interface ClientInvoice {
  id: string;
  number: string;
  lawyer: string;
  amount: number;
  date: string;
  status: "مدفوعة" | "معلقة";
  item: string;
}

export const clientProfile = {
  name: "محمد العميل",
  email: "client@mail.com",
  phone: "+20 100 555 7788",
  city: "القاهرة",
  since: "مارس 2026",
  consultations: 4,
  activeCases: 2,
};

export const clientConsultations: ClientConsultation[] = [
  { id: "cc1", lawyer: "أحمد المنصوري", lawyerTitle: "محامٍ بالنقض", subject: "استشارة نفقة وحضانة", date: "12 يونيو 2026", time: "04:30 م", channel: "أونلاين", status: "قادمة", price: 500, duration: "45 دقيقة", notes: "مناقشة خطوات رفع دعوى النفقة والمستندات المطلوبة." },
  { id: "cc2", lawyer: "سارة عبد الرحمن", lawyerTitle: "محامية تجارية", subject: "مراجعة عقد إيجار", date: "15 يونيو 2026", time: "11:00 ص", channel: "مكتب", status: "قادمة", price: 700, duration: "30 دقيقة", notes: "مراجعة بنود عقد إيجار جديد قبل التوقيع." },
  { id: "cc3", lawyer: "خالد فؤاد", lawyerTitle: "محامٍ عمالي", subject: "فصل تعسفي من العمل", date: "1 يونيو 2026", time: "01:00 م", channel: "هاتف", status: "مكتملة", price: 600, duration: "20 دقيقة", notes: "تم توضيح الموقف القانوني وخطوات المطالبة بالمستحقات." },
  { id: "cc4", lawyer: "منى حسن", lawyerTitle: "محامية أسرة", subject: "استشارة طلاق", date: "25 مايو 2026", time: "12:00 م", channel: "أونلاين", status: "ملغاة", price: 450, duration: "30 دقيقة", notes: "أُلغيت بناءً على طلبك وأُعيد الجدولة لاحقاً." },
];

export const clientCases: ClientCase[] = [
  { id: "ca1", title: "نزاع تجاري على عقد توريد", category: "تجاري", budget: "5,000 - 12,000 ج.م", status: "قيد التنفيذ", proposals: 7, date: "2 يونيو 2026" },
  { id: "ca2", title: "قضية حضانة أطفال", category: "أسرة", budget: "3,000 - 8,000 ج.م", status: "مفتوحة", proposals: 12, date: "4 يونيو 2026" },
];

export const clientInvoices: ClientInvoice[] = [
  { id: "ci1", number: "INV-5021", lawyer: "أحمد المنصوري", amount: 500, date: "12 يونيو 2026", status: "معلقة", item: "استشارة قانونية" },
  { id: "ci2", number: "INV-5018", lawyer: "خالد فؤاد", amount: 600, date: "1 يونيو 2026", status: "مدفوعة", item: "استشارة قانونية" },
];
