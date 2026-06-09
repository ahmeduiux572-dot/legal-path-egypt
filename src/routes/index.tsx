import { createFileRoute, Link } from "@tanstack/react-router";
import { Scale, GraduationCap, Building2, ShieldCheck, MessageSquare, Clock, ArrowLeft } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { LawyerCard } from "@/components/LawyerCard";
import { FirmCard } from "@/components/FirmCard";
import { AdCarousel } from "@/components/AdCarousel";
import { topRated, mostConsulted, lawyers } from "@/data/lawyers";
import { topFirms, firms } from "@/data/firms";
import { useActiveCountry } from "@/lib/country-store";
import { getCountry } from "@/data/countries";
import heroLegal from "@/assets/hero-legal.jpg";
import library from "@/assets/library.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "مُحامٍ | منصة قانونية رقمية في مصر والشرق الأوسط" },
      { name: "description", content: "تواصل مع أفضل المحامين، احجز استشارة قانونية، تصفح سوق القضايا والنماذج القانونية على منصة مُحامٍ." },
      { property: "og:title", content: "مُحامٍ | منصة قانونية رقمية" },
      { property: "og:description", content: "أول بنية رقمية للمحاماة في مصر والشرق الأوسط — استشارات قانونية موثوقة بسهولة وأمان." },
    ],
  }),
  component: Index,
});

const services = [
  { icon: Scale, title: "استشارة قانونية سريعة", text: "احصل على استشارة قانونية سريعة وموثوقة من أفضل المحامين في أي وقت ومن أي مكان." },
  { icon: GraduationCap, title: "المحامون الخبراء", text: "نخبة من المحامين المتخصصين في مختلف المجالات يقدمون لك استشارات دقيقة وآمنة." },
  { icon: Building2, title: "قانون الشركات", text: "حماية حقوق شركتك وتنظيم إجراءاتها ومسؤولياتها لضمان عمل قانوني ومنظّم." },
];

const why = [
  { icon: ShieldCheck, title: "خصوصية وأمان", text: "حماية كاملة لبياناتك ومحادثاتك مع المحامين بسرية تامة." },
  { icon: MessageSquare, title: "تواصل مباشر", text: "شات ومكالمات صوتية ومرئية مع محام بكل سهولة." },
  { icon: Clock, title: "العمل في الوقت المناسب", text: "متابعة فورية للحالة ورد سريع على استفساراتك على مدار الساعة." },
];

const stats = [
  { value: "30", label: "عميلاً سعيداً" },
  { value: "+300", label: "قضية قانونية" },
  { value: "8", label: "سنوات من الخبرة" },
];

function Index() {
  const country = useActiveCountry();
  const activeCountry = getCountry(country);
  const countryName = activeCountry.name;
  const ratedInCountry = topRated.filter(
    (l) => l.country === country || l.countries.includes(country),
  );
  const consultedInCountry = mostConsulted.filter(
    (l) => l.country === country || l.countries.includes(country),
  );
  const firmsInCountry = topFirms.filter((f) => f.countries.includes(country));
  const lawyerCount = lawyers.filter(
    (l) => l.country === country || l.countries.includes(country),
  ).length;
  const firmCount = firms.filter((f) => f.countries.includes(country)).length;
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src={heroLegal}
          alt="محامٍ يحمل ميزان العدالة داخل قاعة محكمة"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Country flag backdrop */}
        <div
          key={country}
          className="absolute inset-0 flex select-none items-center justify-center overflow-hidden"
          aria-hidden
        >
          <span className="animate-in fade-in zoom-in-95 text-[34rem] leading-none opacity-[0.14] blur-[1px] duration-700 md:text-[52rem]">
            {getCountry(country).flag}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-l from-navy-deep/95 via-navy-deep/85 to-navy-deep/60" />
        <div className="absolute inset-0 pattern-grid opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-36">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-4 py-1 text-xs font-medium text-gold">
              <span className="text-base leading-none">{getCountry(country).flag}</span>
              مرحباً بكم في منصة المحاماة في {countryName}
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight text-cream md:text-6xl">
              مُحامٍ
              <span className="block text-gradient-gold">أول بنية رقمية للمحاماة في مصر والشرق الأوسط</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-cream/80">
              مجتمع من المحامين نسعى لتعزيز الوصول إلى العدالة من خلال الابتكار والتكنولوجيا، لتحصل على استشارتك القانونية بسرعة واحترافية وشفافية.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/lawyers" className="flex h-12 items-center justify-center rounded-md bg-gradient-gold px-6 text-sm font-bold text-navy shadow-gold transition-transform hover:-translate-y-0.5 sm:flex-1 sm:max-w-[16rem]">
                تواصل مع محامٍ متخصص
              </Link>
              <Link to="/ai" className="flex h-12 items-center justify-center rounded-md border border-gold/50 px-6 text-sm font-semibold text-cream transition-colors hover:bg-white/5 sm:flex-1 sm:max-w-[16rem]">
                جرّب المساعد الذكي
              </Link>
            </div>
            {/* Country stats inside hero */}
            <div className="mt-10 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
              <HeroStat value={`${lawyerCount}+`} label="محامٍ متاح" />
              <HeroStat value={`${firmCount}`} label="مكتب محاماة" />
              <HeroStat value={activeCountry.currency.symbol} label="العملة المحلية" />
              <HeroStat value={`${activeCountry.cities.length}`} label="مدينة مغطّاة" />
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="bg-cream">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center md:px-8">
          <h2 className="text-2xl font-extrabold text-gradient-gold md:text-3xl">مرحباً بكم في محام</h2>
          <p className="mt-5 text-sm leading-loose text-muted-foreground md:text-base">
            "محام" منصة قانونية رقمية تهدف إلى تسهيل التواصل بين العملاء والمحامين بطريقة حديثة وموثوقة، من خلال تجربة استخدام سهلة تساعدك على الوصول إلى المحامي المناسب وفقاً للتخصص والتقييمات وآراء العملاء.
          </p>
          <p className="mt-4 text-sm leading-loose text-muted-foreground md:text-base">
            تتيح المنصة التواصل مع المحامين عبر الشات والمكالمات الصوتية والمرئية، ومتابعة الاستشارات والقضايا في أي وقت، لتقديم تجربة قانونية أكثر سرعة واحترافية وشفافية.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="bg-cream pb-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-3 md:px-8">
          {services.map((s) => (
            <div key={s.title} className="rounded-2xl border border-border bg-card p-7 text-center shadow-card">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-gold">
                <s.icon className="h-7 w-7 text-navy" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-navy">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why us — dark with statue image bg */}
      <section className="relative overflow-hidden bg-navy-deep">
        <img src={library} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-10" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 md:px-8">
          <SectionHeading light title="لماذا يعتبر التعاقد معنا خطوة رابحة؟" subtitle="نلتزم بأعلى معايير الجودة والشفافية في كل خطوة قانونية." />
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {why.map((w) => (
              <div key={w.title} className="text-center">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/40">
                  <w.icon className="h-6 w-6 text-gold" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-cream">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/65">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad carousel */}
      <AdCarousel />

      {/* Top law firms */}
      <section className="bg-navy-deep pb-16 pt-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading light title="أشهر مكاتب المحاماة" subtitle={`نخبة من أعرق مكاتب المحاماة المتاحة في ${countryName} بخبرات ممتدة وفرق متخصصة.`} />
          {firmsInCountry.length === 0 ? (
            <p className="mt-10 text-center text-cream/60">لا توجد مكاتب متاحة في {countryName} حالياً.</p>
          ) : (
            <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {firmsInCountry.map((f) => (
                <FirmCard key={f.id} firm={f} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Top rated */}
      <section className="bg-navy py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading light title="المحامون الأكثر تقييماً" subtitle={`نخبة من المحامين الحاصلين على أعلى تقييمات في ${countryName}.`} />
          {ratedInCountry.length === 0 ? (
            <p className="mt-10 text-center text-cream/60">لا يوجد محامون متاحون في {countryName} حالياً.</p>
          ) : (
            <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
              {ratedInCountry.map((l) => (
                <LawyerCard key={l.id} lawyer={l} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Most consulted */}
      <section className="bg-navy-deep py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading light title="المحامون الأكثر استشارة" subtitle={`الأكثر طلباً من العملاء في ${countryName}.`} />
          {consultedInCountry.length === 0 ? (
            <p className="mt-10 text-center text-cream/60">لا يوجد محامون متاحون في {countryName} حالياً.</p>
          ) : (
            <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
              {consultedInCountry.map((l) => (
                <LawyerCard key={l.id} lawyer={l} />
              ))}
            </div>
          )}
          <div className="mt-10 text-center">
            <Link to="/lawyers" className="inline-flex items-center gap-2 rounded-md border border-gold/50 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-white/5">
              تصفح كل المحامين
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative overflow-hidden bg-gradient-navy py-16">
        <div className="absolute inset-0 pattern-grid opacity-50" />
        <div className="relative mx-auto max-w-5xl px-4 md:px-8">
          <SectionHeading light title="أرقام تهمك" subtitle="إنجازاتنا في رحلتنا معك، نوضحها لك من خلال الأرقام." />
          <div className="mt-10 grid grid-cols-3 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-extrabold text-gold md:text-5xl">{s.value}</div>
                <div className="mt-2 text-xs text-cream/70 md:text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-navy-card/50 px-3 py-3 text-center backdrop-blur">
      <div className="text-xl font-extrabold text-gold">{value}</div>
      <div className="mt-1 text-[11px] text-cream/65">{label}</div>
    </div>
  );
}
