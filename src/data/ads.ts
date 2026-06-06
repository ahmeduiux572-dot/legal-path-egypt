import { lawyers, type Lawyer } from "./lawyers";

export interface LawyerAd extends Pick<Lawyer, "id" | "name" | "title" | "image" | "rating" | "reviews" | "city"> {
  offer: string;
  text: string;
}

const offers = ["خصم 50% على أول استشارة", "استشارة مجانية أولى", "عرض خاص لفترة محدودة", "خصم 30% هذا الأسبوع"];
const pitches = [
  "نخبة الخبرة القانونية في خدمتك — تواصل الآن واحصل على استشارة دقيقة وسريعة.",
  "متابعة احترافية لقضيتك خطوة بخطوة مع سرية تامة وحلول قانونية واضحة.",
  "خبرة طويلة وآلاف الاستشارات الناجحة — ثقة عملائنا هي عنواننا.",
  "احجز موعدك الآن واحصل على توجيه قانوني موثوق يناسب احتياجك.",
];

export const featuredLawyerAds: LawyerAd[] = lawyers.slice(0, 4).map((l, i) => ({
  id: l.id,
  name: l.name,
  title: l.title,
  image: l.image,
  rating: l.rating,
  reviews: l.reviews,
  city: l.city,
  offer: offers[i % offers.length],
  text: pitches[i % pitches.length],
}));