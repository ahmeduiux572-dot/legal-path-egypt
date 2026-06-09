import { formatMoney, type CountryCode } from "@/data/countries";

export interface LegalTemplate {
  id: string;
  title: string;
  category: string;
  price: number;
  pages: number;
  description: string;
}

export const templates: LegalTemplate[] = [
  { id: "rent-contract", title: "عقد إيجار سكني", category: "عقود", price: 150, pages: 6, description: "نموذج عقد إيجار سكني متكامل ومتوافق مع القانون المدني، يحدد التزامات الطرفين والمدة والقيمة الإيجارية." },
  { id: "employment-contract", title: "عقد عمل محدد المدة", category: "عمل", price: 200, pages: 8, description: "صيغة عقد عمل تحمي حقوق صاحب العمل والموظف وتتضمن بنود الأجر والإجازات وإنهاء الخدمة." },
  { id: "nda", title: "اتفاقية عدم إفشاء (NDA)", category: "شركات", price: 250, pages: 5, description: "اتفاقية حفاظ على السرية لحماية المعلومات والأسرار التجارية بين الأطراف المتعاقدة." },
  { id: "power-of-attorney", title: "توكيل عام", category: "توكيلات", price: 120, pages: 3, description: "نموذج توكيل عام جاهز للتعديل يخول الوكيل التصرف نيابة عن الموكل في الأمور المحددة." },
  { id: "company-incorporation", title: "عقد تأسيس شركة", category: "شركات", price: 400, pages: 12, description: "عقد تأسيس شركة ذات مسؤولية محدودة يشمل رأس المال وحصص الشركاء والإدارة." },
  { id: "sale-contract", title: "عقد بيع منقول", category: "عقود", price: 180, pages: 5, description: "نموذج عقد بيع واضح يحدد المبيع والثمن وشروط التسليم والضمان." },
  { id: "divorce-petition", title: "صحيفة دعوى طلاق", category: "أسرة", price: 220, pages: 4, description: "صيغة قانونية لرفع دعوى طلاق أمام محكمة الأسرة مع البيانات والطلبات." },
  { id: "demand-letter", title: "إنذار رسمي على يد محضر", category: "إجراءات", price: 90, pages: 2, description: "نموذج إنذار رسمي للمطالبة بحق أو تنفيذ التزام قبل اللجوء للقضاء." },
];

export interface CaseListing {
  id: string;
  title: string;
  category: string;
  city: string;
  country: CountryCode;
  budgetMin: number;
  budgetMax: number;
  deadline: string;
  proposals: number;
  description: string;
}

export const cases: CaseListing[] = [
  { id: "c1", title: "نزاع تجاري على عقد توريد", category: "تجاري", city: "القاهرة", country: "EG", budgetMin: 5000, budgetMax: 12000, deadline: "خلال أسبوع", proposals: 7, description: "أبحث عن محامٍ متخصص لمتابعة نزاع حول إخلال طرف بعقد توريد بضائع والمطالبة بالتعويض." },
  { id: "c2", title: "قضية حضانة أطفال", category: "أسرة", city: "الإسكندرية", country: "EG", budgetMin: 3000, budgetMax: 8000, deadline: "عاجل", proposals: 12, description: "حاجة لمحامي أسرة لمتابعة دعوى حضانة وتنظيم الرؤية أمام محكمة الأسرة." },
  { id: "c3", title: "تسجيل علامة تجارية", category: "ملكية فكرية", city: "الرياض", country: "SA", budgetMin: 4000, budgetMax: 9000, deadline: "خلال شهر", proposals: 5, description: "مطلوب مستشار لتسجيل علامة تجارية وحمايتها من التعدي محلياً وإقليمياً." },
  { id: "c4", title: "فصل تعسفي من العمل", category: "عمل", city: "الرياض", country: "SA", budgetMin: 2500, budgetMax: 6000, deadline: "خلال أسبوعين", proposals: 9, description: "أحتاج محامي عمل للمطالبة بمستحقات نهاية الخدمة والتعويض عن الفصل التعسفي." },
  { id: "c5", title: "نزاع ملكية عقار", category: "عقارات", city: "جدة", country: "SA", budgetMin: 8000, budgetMax: 20000, deadline: "خلال شهر", proposals: 4, description: "نزاع على ملكية قطعة أرض وأحتاج لمحامٍ متخصص في القضايا العقارية." },
  { id: "c6", title: "صياغة عقد شراكة", category: "شركات", city: "عمّان", country: "JO", budgetMin: 1500, budgetMax: 4000, deadline: "خلال أسبوع", proposals: 6, description: "مطلوب صياغة ومراجعة عقد شراكة بين ثلاثة مؤسسين مع تحديد الحصص والمسؤوليات." },
];

/** نطاق الميزانية مُنسّقاً بعملة دولة القضية */
export function caseBudget(c: CaseListing): string {
  const min = new Intl.NumberFormat("en-US").format(c.budgetMin);
  return `${min} - ${formatMoney(c.budgetMax, c.country)}`;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  highlight?: boolean;
  features: string[];
}

export const plans: Plan[] = [
  {
    id: "basic",
    name: "الباقة الأساسية",
    price: 199,
    period: "شهرياً",
    features: ["ملف شخصي على المنصة", "استقبال حتى 20 استشارة شهرياً", "ظهور في نتائج البحث", "دعم عبر البريد الإلكتروني"],
  },
  {
    id: "pro",
    name: "الباقة الاحترافية",
    price: 399,
    period: "شهرياً",
    highlight: true,
    features: ["كل مزايا الباقة الأساسية", "استشارات غير محدودة", "شارة محامٍ موثّق", "أولوية في الظهور والترشيح", "تقارير أداء شهرية", "دعم فني على مدار الساعة"],
  },
  {
    id: "elite",
    name: "باقة النخبة",
    price: 799,
    period: "شهرياً",
    features: ["كل مزايا الباقة الاحترافية", "صفحة محامٍ مميّزة", "ظهور في بانر الصفحة الرئيسية", "مدير حساب مخصص", "أولوية في سوق القضايا"],
  },
];

export interface AdSlide {
  id: string;
  badge: string;
  title: string;
  text: string;
  cta: string;
  to: "/lawyers" | "/cases" | "/templates" | "/ai";
  image: string;
}