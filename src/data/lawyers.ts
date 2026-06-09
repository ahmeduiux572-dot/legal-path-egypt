import lawyer1 from "@/assets/lawyer-1.jpg";
import lawyer2 from "@/assets/lawyer-2.jpg";
import lawyer3 from "@/assets/lawyer-3.jpg";
import lawyer4 from "@/assets/lawyer-4.jpg";
import type { CountryCode } from "@/data/countries";

export interface Lawyer {
  id: string;
  name: string;
  title: string;
  specialty: string;
  image: string;
  rating: number;
  reviews: number;
  consultations: number;
  price: number;
  city: string;
  country: CountryCode; // دولة المقر
  countries: CountryCode[]; // الدول التي يخدمها
  experience: number;
  phone: string;
  email: string;
  bio: string;
  verified?: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
}

export const sampleReviews: Review[] = [
  { id: "r1", author: "أحمد سمير", rating: 5, date: "منذ أسبوع", text: "تعامل راقٍ واحترافية عالية، تابع قضيتي خطوة بخطوة وحصلت على نتيجة ممتازة. أنصح به بشدة." },
  { id: "r2", author: "منى عبد الله", rating: 5, date: "منذ شهر", text: "استشارة واضحة ودقيقة وفّرت عليّ وقتاً ومجهوداً كبيراً. شرح لي كل التفاصيل القانونية ببساطة." },
  { id: "r3", author: "كريم حسن", rating: 4, date: "منذ شهرين", text: "محامٍ متمكن ورده سريع على الاستفسارات، تجربة موفّقة بشكل عام." },
];

export const specialties = [
  "كل التخصصات",
  "قانون الأسرة",
  "القانون التجاري",
  "قانون العقارات",
  "قانون العمل",
  "القانون الجنائي",
  "الملكية الفكرية",
  "قانون الشركات",
] as const;

export const cities = ["كل المدن", "القاهرة", "الإسكندرية", "دبي", "الرياض", "جدة", "عمّان"] as const;

const baseBio =
  "محامٍ ومستشار قانوني يتمتع بخبرة واسعة في تقديم الاستشارات والترافع أمام المحاكم. يحرص على حماية حقوق موكليه ومتابعة قضاياهم بدقة واحترافية، مع تقديم حلول قانونية واضحة وسريعة تناسب احتياجات كل عميل.";

export const lawyers: Lawyer[] = [
  {
    id: "murtada-mansour",
    name: "المستشار / مرتضى منصور",
    title: "محامي الأسرة",
    specialty: "قانون الأسرة",
    image: lawyer1,
    rating: 5,
    reviews: 128,
    consultations: 940,
    price: 2000,
    city: "القاهرة",
    country: "EG",
    countries: ["EG", "SA"],
    experience: 18,
    phone: "+20 122 158 2585",
    email: "mansour@muhamik.com",
    bio: baseBio,
  },
  {
    id: "mohamed-elnabawy",
    name: "محمد النبوي",
    title: "مستشار قانوني للأعمال",
    specialty: "القانون التجاري",
    image: lawyer2,
    rating: 4.9,
    reviews: 96,
    consultations: 812,
    price: 1500,
    city: "جدة",
    country: "SA",
    countries: ["SA", "JO"],
    experience: 12,
    phone: "+966 50 245 1180",
    email: "elnabawy@muhamik.com",
    bio: baseBio,
  },
  {
    id: "fahd-elwaled",
    name: "فهد الوالد",
    title: "محامي حقوق إنسان",
    specialty: "القانون الجنائي",
    image: lawyer4,
    rating: 4.8,
    reviews: 87,
    consultations: 760,
    price: 1800,
    city: "الرياض",
    country: "SA",
    countries: ["SA"],
    experience: 22,
    phone: "+966 55 410 2233",
    email: "fahd@muhamik.com",
    bio: baseBio,
  },
  {
    id: "salma-fawzy",
    name: "سلمى فوزي",
    title: "مستشارة قانونية في حقوق المرأة",
    specialty: "قانون الأسرة",
    image: lawyer3,
    rating: 5,
    reviews: 142,
    consultations: 1020,
    price: 1700,
    city: "الإسكندرية",
    country: "EG",
    countries: ["EG"],
    experience: 10,
    phone: "+20 100 778 9012",
    email: "salma@muhamik.com",
    bio: baseBio,
  },
  {
    id: "fares-awad",
    name: "فارس عوض",
    title: "مستشار قانوني تجاري",
    specialty: "قانون الشركات",
    image: lawyer2,
    rating: 4.7,
    reviews: 64,
    consultations: 540,
    price: 1300,
    city: "جدة",
    country: "SA",
    countries: ["SA", "EG"],
    experience: 9,
    phone: "+966 56 882 4471",
    email: "fares@muhamik.com",
    bio: baseBio,
  },
  {
    id: "khaled-elsayed",
    name: "خالد السيد",
    title: "مستشار قانون عقاري",
    specialty: "قانون العقارات",
    image: lawyer1,
    rating: 4.9,
    reviews: 110,
    consultations: 690,
    price: 1600,
    city: "القاهرة",
    country: "EG",
    countries: ["EG"],
    experience: 15,
    phone: "+20 111 334 5566",
    email: "khaled@muhamik.com",
    bio: baseBio,
  },
  {
    id: "hossam-tarek",
    name: "حسام طارق",
    title: "مستشار الملكية الفكرية",
    specialty: "الملكية الفكرية",
    image: lawyer4,
    rating: 4.6,
    reviews: 52,
    consultations: 430,
    price: 1400,
    city: "عمّان",
    country: "JO",
    countries: ["JO"],
    experience: 11,
    phone: "+962 79 220 1144",
    email: "hossam@muhamik.com",
    bio: baseBio,
  },
  {
    id: "nourhan-adel",
    name: "نورهان عادل",
    title: "مستشارة قانون العمل",
    specialty: "قانون العمل",
    image: lawyer3,
    rating: 4.8,
    reviews: 73,
    consultations: 588,
    price: 1200,
    city: "عمّان",
    country: "JO",
    countries: ["JO", "SA"],
    experience: 8,
    phone: "+962 52 661 0099",
    email: "nourhan@muhamik.com",
    bio: baseBio,
  },
  {
    id: "mahmoud-ibrahim",
    name: "محمود إبراهيم",
    title: "مستشار قانوني للأعمال",
    specialty: "القانون التجاري",
    image: lawyer1,
    rating: 4.7,
    reviews: 81,
    consultations: 612,
    price: 1550,
    city: "الرياض",
    country: "SA",
    countries: ["SA"],
    experience: 14,
    phone: "+966 53 117 2200",
    email: "mahmoud@muhamik.com",
    bio: baseBio,
  },
];

export function getLawyer(id: string): Lawyer | undefined {
  return lawyers.find((l) => l.id === id);
}

// Most lawyers are verified on the platform
const unverifiedLawyers = new Set(["hossam-tarek", "fares-awad"]);
lawyers.forEach((l) => {
  l.verified = !unverifiedLawyers.has(l.id);
});

export const topRated = [...lawyers].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews).slice(0, 6);
export const mostConsulted = [...lawyers].sort((a, b) => b.consultations - a.consultations).slice(0, 6);