import lawyer2 from "@/assets/lawyer-2.jpg";
import lawyer3 from "@/assets/lawyer-3.jpg";
import lawyer4 from "@/assets/lawyer-4.jpg";
import firm2 from "@/assets/firm-2.jpg";
import firm4 from "@/assets/firm-4.jpg";

/* ---------- طلبات تسجيل المحامين الجدد ---------- */
export interface LawyerApplication {
  id: string;
  name: string;
  title: string;
  specialty: string;
  city: string;
  phone: string;
  email: string;
  experience: number;
  price: number;
  bio: string;
  submittedAt: string;
  barNumber: string;
  files: string[];
  image: string;
}

export const lawyerApplications: LawyerApplication[] = [
  {
    id: "app-l1",
    name: "عمر الشناوي",
    title: "محامٍ بالنقض",
    specialty: "القانون الجنائي",
    city: "القاهرة",
    phone: "+20 100 552 3344",
    email: "omar.shenawy@mail.com",
    experience: 16,
    price: 1900,
    bio: "محامٍ بالنقض متخصص في القضايا الجنائية والجنح، خبرة واسعة في الترافع أمام محاكم الاستئناف والنقض.",
    submittedAt: "5 يونيو 2026",
    barNumber: "نقابة المحامين - عضوية 48217",
    files: ["كارنيه نقابة المحامين.pdf", "صورة البطاقة.pdf", "شهادة الليسانس.pdf", "صحيفة الحالة الجنائية.pdf"],
    image: lawyer2,
  },
  {
    id: "app-l2",
    name: "هبة مصطفى",
    title: "مستشارة قانون أسرة",
    specialty: "قانون الأسرة",
    city: "الإسكندرية",
    phone: "+20 122 778 9900",
    email: "heba.mostafa@mail.com",
    experience: 7,
    price: 1100,
    bio: "مستشارة قانونية في قضايا الأسرة والأحوال الشخصية، تهتم بحلول الصلح والوساطة قبل التقاضي.",
    submittedAt: "4 يونيو 2026",
    barNumber: "نقابة المحامين - عضوية 51902",
    files: ["كارنيه نقابة المحامين.pdf", "صورة البطاقة.pdf", "شهادة الليسانس.pdf"],
    image: lawyer3,
  },
  {
    id: "app-l3",
    name: "زياد العربي",
    title: "مستشار قانوني تجاري",
    specialty: "القانون التجاري",
    city: "الجيزة",
    phone: "+20 111 334 2211",
    email: "ziad.elaraby@mail.com",
    experience: 5,
    price: 1000,
    bio: "محامٍ في مجال الشركات والعقود التجارية، عمل سابقاً ضمن الإدارة القانونية لإحدى الشركات الكبرى.",
    submittedAt: "2 يونيو 2026",
    barNumber: "نقابة المحامين - عضوية 53461",
    files: ["كارنيه نقابة المحامين.pdf", "السيرة الذاتية.pdf"],
    image: lawyer4,
  },
];

/* ---------- طلبات تسجيل المكاتب الجديدة ---------- */
export interface FirmApplication {
  id: string;
  name: string;
  tagline: string;
  specialty: string;
  city: string;
  phone: string;
  email: string;
  established: number;
  teamSize: number;
  about: string;
  submittedAt: string;
  licenseNumber: string;
  files: string[];
  image: string;
}

export const firmApplications: FirmApplication[] = [
  {
    id: "app-f1",
    name: "مكتب الراية للمحاماة",
    tagline: "خبرة قانونية موثوقة",
    specialty: "القانون التجاري",
    city: "القاهرة",
    phone: "+20 2 3344 5566",
    email: "info@alraya-law.com",
    established: 2016,
    teamSize: 9,
    about: "مكتب محاماة متخصص في قضايا الشركات والعقود التجارية وتسوية المنازعات بين الشركات.",
    submittedAt: "5 يونيو 2026",
    licenseNumber: "ترخيص مزاولة رقم 7741",
    files: ["السجل التجاري.pdf", "البطاقة الضريبية.pdf", "ترخيص مزاولة المهنة.pdf"],
    image: firm2,
  },
  {
    id: "app-f2",
    name: "مكتب الإنصاف القانوني",
    tagline: "العدالة في متناول الجميع",
    specialty: "قانون العقارات",
    city: "الإسكندرية",
    phone: "+20 3 2211 8899",
    email: "contact@alinsaf.com",
    established: 2019,
    teamSize: 6,
    about: "مكتب ناشئ متخصص في القضايا العقارية وعقود البيع والإيجار وتوثيق المعاملات.",
    submittedAt: "3 يونيو 2026",
    licenseNumber: "ترخيص مزاولة رقم 8123",
    files: ["السجل التجاري.pdf", "البطاقة الضريبية.pdf"],
    image: firm4,
  },
];