import { useSyncExternalStore } from "react";

// كود الدولة (يُسمح بإضافة دول جديدة من لوحة الأدمن)
export type CountryCode = string;

export interface CountryCurrency {
  code: string;
  symbol: string;
  locale: string;
}

/** مصطلحات قانونية ومسميات واجهة تختلف حسب الدولة */
export interface CountryTerms {
  cassationCourt: string; // أعلى درجة طعن
  bailiff: string; // مُحضِر / مُبلّغ
  prosecution: string; // جهة الادعاء
  attorneyDoc: string; // وثيقة التوكيل
  firstInstance: string; // محكمة الدرجة الأولى
}

/** نصوص تسويقية بلهجة كل دولة */
export interface CountryMarketing {
  heroBadge: string;
  heroLead: string;
  aboutTitle: string;
  aboutBody: string;
  pitches: string[];
}

export interface Country {
  code: CountryCode;
  name: string;
  flag: string;
  dialCode: string;
  currency: CountryCurrency;
  vat: number; // نسبة الضريبة %
  cities: string[];
  courts: string[];
  withdrawalMethods: string[];
  caseTypes: string[];
  sessionTypes: string[];
  invoiceItems: string[];
  caseDegrees: string[];
  terms: CountryTerms;
  marketing: CountryMarketing;
}

export const baseCountries: Country[] = [
  {
    code: "EG",
    name: "مصر",
    flag: "🇪🇬",
    dialCode: "+20",
    currency: { code: "EGP", symbol: "ج.م", locale: "ar-EG" },
    vat: 14,
    cities: ["القاهرة", "الإسكندرية", "الجيزة", "المنصورة", "أسيوط", "طنطا"],
    courts: [
      "محكمة القاهرة الابتدائية",
      "محكمة الجيزة الابتدائية",
      "محكمة الإسكندرية الابتدائية",
      "محكمة الأسرة",
      "محكمة النقض",
      "مجلس الدولة",
      "المحكمة الاقتصادية",
    ],
    withdrawalMethods: ["فودافون كاش", "أورنج كاش", "اتصالات كاش", "إنستا باي", "تحويل بنكي"],
    caseTypes: ["قانون الأسرة", "تجاري", "عمالي", "مدني", "جنائي", "إداري", "ملكية فكرية", "عقاري", "ضرائب"],
    sessionTypes: ["جلسة مرافعة", "جلسة استئناف", "جلسة نقض", "استشارة", "متابعة قضية", "تحضير شهود"],
    invoiceItems: ["أتعاب قضية", "استشارة قانونية", "صياغة عقد", "تمثيل قانوني", "مراجعة مستندات"],
    caseDegrees: ["أول درجة", "استئناف", "نقض", "تنفيذ"],
    terms: {
      cassationCourt: "محكمة النقض",
      bailiff: "مُحضِر",
      prosecution: "النيابة العامة",
      attorneyDoc: "توكيل رسمي",
      firstInstance: "المحكمة الابتدائية",
    },
    marketing: {
      heroBadge: "أهلاً بيك في منصة المحاماة في مصر",
      heroLead:
        "إحنا مجتمع من المحامين هدفنا نقرّبلك العدالة بالتكنولوجيا والابتكار، عشان توصل لاستشارتك القانونية بسرعة واحترافية وشفافية.",
      aboutTitle: "أهلاً بيك في محام",
      aboutBody:
        "«محام» منصة قانونية رقمية بتسهّل التواصل بينك وبين المحامي بطريقة عصرية وموثوقة، بتجربة سهلة توصّلك للمحامي المناسب حسب التخصص والتقييمات وآراء العملاء.",
      pitches: [
        "خبرة قانونية محترمة في خدمتك — كلّمنا دلوقتي واحصل على استشارة دقيقة وسريعة.",
        "بنتابع قضيتك خطوة بخطوة وبسرّية تامة وحلول قانونية واضحة.",
        "خبرة طويلة وآلاف الاستشارات الناجحة — ثقة عملائنا هي عنواننا.",
        "احجز ميعادك دلوقتي واحصل على توجيه قانوني موثوق على مقاسك.",
      ],
    },
  },
  {
    code: "SA",
    name: "السعودية",
    flag: "🇸🇦",
    dialCode: "+966",
    currency: { code: "SAR", symbol: "ر.س", locale: "ar-SA" },
    vat: 15,
    cities: ["الرياض", "جدة", "مكة المكرمة", "المدينة المنورة", "الدمام", "الخبر"],
    courts: [
      "المحكمة العامة بالرياض",
      "محكمة الاستئناف",
      "المحكمة التجارية",
      "محكمة الأحوال الشخصية",
      "المحكمة العمالية",
      "ديوان المظالم",
    ],
    withdrawalMethods: ["تحويل بنكي (آيبان)", "STC Pay", "محفظة urpay", "محفظة barq"],
    caseTypes: ["الأحوال الشخصية", "تجاري", "عمالي", "مدني", "جزائي", "إداري", "ملكية فكرية", "عقاري", "زكاة وضريبة"],
    sessionTypes: ["جلسة مرافعة", "جلسة استئناف", "جلسة نقض", "استشارة", "متابعة قضية", "تحضير شهود"],
    invoiceItems: ["أتعاب قضية", "استشارة قانونية", "صياغة عقد", "تمثيل قانوني", "مراجعة مستندات"],
    caseDegrees: ["ابتدائي", "استئناف", "نقض", "تنفيذ"],
    terms: {
      cassationCourt: "المحكمة العليا",
      bailiff: "مُبلّغ",
      prosecution: "النيابة العامة",
      attorneyDoc: "وكالة شرعية",
      firstInstance: "المحكمة العامة",
    },
    marketing: {
      heroBadge: "حيّاك الله في منصة المحاماة في السعودية",
      heroLead:
        "نخبة من المحامين نسعى نقرّب لك العدالة بالتقنية والابتكار، عشان توصل لاستشارتك القانونية بسرعة واحترافية وشفافية.",
      aboutTitle: "حيّاك الله في محام",
      aboutBody:
        "«محام» منصة قانونية رقمية تسهّل التواصل بينك وبين المحامي بطريقة عصرية وموثوقة، بتجربة سلسة توصّلك للمحامي المناسب حسب التخصص والتقييمات وآراء العملاء.",
      pitches: [
        "خبرة قانونية عالية بين يديك — تواصل الحين واحصل على استشارة دقيقة وسريعة.",
        "نتابع قضيتك خطوة بخطوة بسرّية تامة وحلول قانونية واضحة.",
        "خبرة طويلة وآلاف الاستشارات الناجحة — ثقة عملائنا هي عنواننا.",
        "احجز موعدك الحين واحصل على توجيه قانوني موثوق يناسب احتياجك.",
      ],
    },
  },
  {
    code: "JO",
    name: "الأردن",
    flag: "🇯🇴",
    dialCode: "+962",
    currency: { code: "JOD", symbol: "د.أ", locale: "ar-JO" },
    vat: 16,
    cities: ["عمّان", "الزرقاء", "إربد", "العقبة", "السلط", "المفرق"],
    courts: [
      "محكمة بداية عمّان",
      "محكمة الاستئناف",
      "محكمة التمييز",
      "المحكمة الشرعية",
      "محكمة الصلح",
      "محكمة الجنايات الكبرى",
    ],
    withdrawalMethods: ["تحويل بنكي (آيبان)", "زين كاش", "أورنج موني", "محفظة dinarak"],
    caseTypes: ["الأحوال الشخصية", "تجاري", "عمالي", "مدني", "جزائي", "إداري", "ملكية فكرية", "عقاري", "ضرائب"],
    sessionTypes: ["جلسة مرافعة", "جلسة استئناف", "جلسة تمييز", "استشارة", "متابعة قضية", "تحضير شهود"],
    invoiceItems: ["أتعاب قضية", "استشارة قانونية", "صياغة عقد", "تمثيل قانوني", "مراجعة مستندات"],
    caseDegrees: ["بداية", "استئناف", "تمييز", "تنفيذ"],
    terms: {
      cassationCourt: "محكمة التمييز",
      bailiff: "مُحضِر",
      prosecution: "النيابة العامة",
      attorneyDoc: "وكالة عدلية",
      firstInstance: "محكمة البداية",
    },
    marketing: {
      heroBadge: "أهلاً وسهلاً فيك في منصة المحاماة في الأردن",
      heroLead:
        "إحنا مجتمع محامين بنسعى نقرّبلك العدالة بالتكنولوجيا والابتكار، عشان توصل لاستشارتك القانونية بسرعة واحترافية وشفافية.",
      aboutTitle: "أهلاً وسهلاً فيك في محام",
      aboutBody:
        "«محام» منصة قانونية رقمية بتسهّل التواصل بينك وبين المحامي بطريقة عصرية وموثوقة، بتجربة سهلة بتوصّلك للمحامي المناسب حسب التخصص والتقييمات وآراء الزبائن.",
      pitches: [
        "خبرة قانونية متمكّنة بخدمتك — احكِ معنا هلّأ واحصل على استشارة دقيقة وسريعة.",
        "بنتابع قضيتك خطوة بخطوة وبسرّية تامة وحلول قانونية واضحة.",
        "خبرة طويلة وآلاف الاستشارات الناجحة — ثقة عملائنا هي عنواننا.",
        "احجز موعدك هلّأ واحصل على توجيه قانوني موثوق بناسبك.",
      ],
    },
  },
];

export const DEFAULT_COUNTRY: CountryCode = "EG";

/* ---------------- مخزن الدول القابل للتعديل (يُدار من لوحة الأدمن) ---------------- */

const STORAGE_KEY = "mohamy_countries_v1";
const listeners = new Set<() => void>();
let live: Country[] | null = null;

function clone(list: Country[]): Country[] {
  return JSON.parse(JSON.stringify(list)) as Country[];
}

function load(): Country[] {
  if (live) return live;
  if (typeof window === "undefined") {
    live = baseCountries;
    return live;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as Country[]) : null;
    live = parsed && Array.isArray(parsed) && parsed.length ? parsed : clone(baseCountries);
  } catch {
    live = clone(baseCountries);
  }
  return live;
}

function persist() {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(live));
    } catch {
      /* ignore */
    }
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

/** القائمة الحالية للدول (لقطة متزامنة) */
export function getCountries(): Country[] {
  return load();
}

/** Hook تفاعلي يعيد قائمة الدول ويُحدّث عند أي تعديل */
export function useCountries(): Country[] {
  return useSyncExternalStore(subscribe, getCountries, () => baseCountries);
}

/** إضافة أو تعديل دولة (حسب الكود) */
export function saveCountry(country: Country) {
  const list = load().slice();
  const i = list.findIndex((c) => c.code === country.code);
  if (i >= 0) list[i] = country;
  else list.push(country);
  live = list;
  persist();
}

/** حذف دولة */
export function removeCountry(code: CountryCode) {
  live = load().filter((c) => c.code !== code);
  persist();
}

/** إعادة الضبط لقائمة الدول الافتراضية */
export function resetCountries() {
  live = clone(baseCountries);
  persist();
}

export function getCountry(code: CountryCode): Country {
  const list = load();
  return list.find((c) => c.code === code) ?? list[0] ?? baseCountries[0];
}

export function countryName(code: CountryCode): string {
  return getCountry(code).name;
}

/** تنسيق مبلغ بعملة دولة معيّنة */
export function formatMoney(amount: number, code: CountryCode): string {
  const c = getCountry(code);
  const n = new Intl.NumberFormat(c.currency.locale, { maximumFractionDigits: 0 }).format(amount);
  return `${n} ${c.currency.symbol}`;
}

/** رمز العملة فقط */
export function currencySymbol(code: CountryCode): string {
  return getCountry(code).currency.symbol;
}
