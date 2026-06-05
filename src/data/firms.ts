export interface LawFirm {
  id: string;
  name: string;
  initials: string;
  tagline: string;
  specialties: string[];
  lawyers: number;
  cases: number;
  rating: number;
  city: string;
}

export const firms: LawFirm[] = [
  {
    id: "al-adala",
    name: "مكتب العدالة للمحاماة",
    initials: "ع",
    tagline: "رواد القضايا التجارية والشركات في مصر والخليج",
    specialties: ["القانون التجاري", "قانون الشركات", "التحكيم"],
    lawyers: 24,
    cases: 1850,
    rating: 5,
    city: "القاهرة",
  },
  {
    id: "al-mizan",
    name: "مجموعة الميزان القانونية",
    initials: "م",
    tagline: "خبرة ممتدة في قضايا الأسرة والأحوال الشخصية",
    specialties: ["قانون الأسرة", "المواريث", "القانون المدني"],
    lawyers: 18,
    cases: 1420,
    rating: 4.9,
    city: "الإسكندرية",
  },
  {
    id: "al-haq",
    name: "مكتب الحق للاستشارات",
    initials: "ح",
    tagline: "حلول قانونية متكاملة للأعمال والملكية الفكرية",
    specialties: ["الملكية الفكرية", "قانون العمل", "العقارات"],
    lawyers: 31,
    cases: 2100,
    rating: 4.8,
    city: "دبي",
  },
  {
    id: "al-difaa",
    name: "مكتب الدفاع المتحد",
    initials: "د",
    tagline: "نخبة من محامي القضايا الجنائية والترافع",
    specialties: ["القانون الجنائي", "حقوق الإنسان", "التقاضي"],
    lawyers: 15,
    cases: 980,
    rating: 4.9,
    city: "الرياض",
  },
];