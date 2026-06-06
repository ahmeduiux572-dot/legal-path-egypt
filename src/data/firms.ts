import firm1 from "@/assets/firm-1.jpg";
import firm2 from "@/assets/firm-2.jpg";
import firm3 from "@/assets/firm-3.jpg";
import firm4 from "@/assets/firm-4.jpg";
import { lawyers, type Lawyer } from "@/data/lawyers";

export interface Firm {
  id: string;
  name: string;
  tagline: string;
  specialty: string;
  image: string;
  rating: number;
  reviews: number;
  cases: number;
  city: string;
  established: number;
  teamSize: number;
  consultationPrice: number;
  about: string;
  lawyerIds: string[];
  verified?: boolean;
}

const baseAbout =
  "مكتب محاماة رائد يضم نخبة من المحامين والمستشارين القانونيين المتخصصين في مختلف فروع القانون. نقدم خدمات قانونية متكاملة تشمل الاستشارات والترافع وصياغة العقود وحل النزاعات، مع التزام كامل بالسرية والاحترافية وحماية مصالح عملائنا.";

export const firms: Firm[] = [
  {
    id: "almizan-legal",
    name: "مكتب الميزان للمحاماة",
    tagline: "العدالة بثقة واحترافية",
    specialty: "قانون الشركات",
    image: firm1,
    rating: 5,
    reviews: 214,
    cases: 1280,
    city: "القاهرة",
    established: 2004,
    teamSize: 24,
    consultationPrice: 600,
    about: baseAbout,
    lawyerIds: ["murtada-mansour", "khaled-elsayed", "mahmoud-ibrahim"],
  },
  {
    id: "aladl-partners",
    name: "مكتب العدل وشركاه",
    tagline: "شركاؤك في كل قضية",
    specialty: "القانون التجاري",
    image: firm2,
    rating: 4.9,
    reviews: 178,
    cases: 960,
    city: "دبي",
    established: 2010,
    teamSize: 18,
    consultationPrice: 750,
    about: baseAbout,
    lawyerIds: ["mohamed-elnabawy", "fares-awad", "nourhan-adel"],
  },
  {
    id: "alhaq-consultants",
    name: "مكتب الحق للاستشارات القانونية",
    tagline: "خبرة تصنع الفارق",
    specialty: "القانون الجنائي",
    image: firm3,
    rating: 4.8,
    reviews: 142,
    cases: 845,
    city: "الرياض",
    established: 2007,
    teamSize: 21,
    consultationPrice: 550,
    about: baseAbout,
    lawyerIds: ["fahd-elwaled", "mahmoud-ibrahim"],
  },
  {
    id: "almasader-law",
    name: "مكتب المصادر القانونية",
    tagline: "حلول قانونية حديثة",
    specialty: "قانون العقارات",
    image: firm4,
    rating: 4.9,
    reviews: 156,
    cases: 720,
    city: "الإسكندرية",
    established: 2013,
    teamSize: 15,
    consultationPrice: 500,
    about: baseAbout,
    lawyerIds: ["salma-fawzy", "khaled-elsayed", "hossam-tarek"],
  },
];

export function getFirm(id: string): Firm | undefined {
  return firms.find((f) => f.id === id);
}

// Most firms are verified on the platform
const unverifiedFirms = new Set(["almasader-law"]);
firms.forEach((f) => {
  f.verified = !unverifiedFirms.has(f.id);
});

export function getFirmLawyers(firm: Firm): Lawyer[] {
  return firm.lawyerIds
    .map((id) => lawyers.find((l) => l.id === id))
    .filter((l): l is Lawyer => Boolean(l));
}

export const firmCities = ["كل المدن", "القاهرة", "الإسكندرية", "دبي", "الرياض"] as const;
export const firmSpecialties = [
  "كل التخصصات",
  "قانون الشركات",
  "القانون التجاري",
  "القانون الجنائي",
  "قانون العقارات",
] as const;

export const topFirms = [...firms].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);