export type CountryCode = "EG" | "SA" | "JO";

export interface CountryCurrency {
  code: "EGP" | "SAR" | "JOD";
  symbol: string;
  locale: string;
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
}

export const countries: Country[] = [
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
  },
];

export const DEFAULT_COUNTRY: CountryCode = "EG";

export function getCountry(code: CountryCode): Country {
  return countries.find((c) => c.code === code) ?? countries[0];
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
