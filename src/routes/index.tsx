import { createFileRoute, Link } from "@tanstack/react-router";
import { Scale, GraduationCap, Building2, ShieldCheck, MessageSquare, Clock, ArrowLeft } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { LawyerCard } from "@/components/LawyerCard";
import { AdCarousel } from "@/components/AdCarousel";
import { topRated, mostConsulted } from "@/data/lawyers";
import heroLegal from "@/assets/hero-legal.jpg";
import library from "@/assets/library.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "محاميك | منصة قانونية رقمية في مصر والشرق الأوسط" },
      { name: "description", content: "تواصل مع أفضل المحامين، احجز استشارة قانونية، تصفح سوق القضايا والنماذج القانونية على منصة محاميك." },
      { property: "og:title", content: "محاميك | منصة قانونية رقمية" },
      { property: "og:description", content: "العلاقة بين القانون والتكنولوجيا — استشارات قانونية موثوقة بسهولة وأمان." },
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
  { icon: MessageSquare, title: "تواصل مباشر", text: "شات ومكالمات صوتية ومرئية مع محاميك بكل سهولة." },
  { icon: Clock, title: "العمل في الوقت المناسب", text: "متابعة فورية للحالة ورد سريع على استفساراتك على مدار الساعة." },
];

const stats = [
  { value: "30", label: "عميلاً سعيداً" },
  { value: "+300", label: "قضية قانونية" },
  { value: "8", label: "سنوات من الخبرة" },
];

function Index() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src={heroLegal}
          alt="محامٍ يحمل ميزان العدالة داخل قاعة محكمة"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-navy-deep/95 via-navy-deep/85 to-navy-deep/60" />
        <div className="absolute inset-0 pattern-grid opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-36">
          <div className="max-w-2xl">
            <span className="inline-block rounded-full border border-gold/40 px-4 py-1 text-xs font-medium text-gold">
              منصة قانونية رقمية · مصر والشرق الأوسط
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight text-cream md:text-6xl">
              محاميك
              <span className="block text-gradient-gold">العلاقة بين القانون والتكنولوجيا</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-cream/80">
              مجتمع من المحامين نسعى لتعزيز الوصول إلى العدالة من خلال الابتكار والتكنولوجيا، لتحصل على استشارتك القانونية بسرعة واحترافية وشفافية.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/lawyers" className="rounded-md bg-gradient-gold px-6 py-3 text-sm font-bold text-navy shadow-gold transition-transform hover:-translate-y-0.5">
                تواصل مع محامٍ متخصص
              </Link>
              <Link to="/ai" className="rounded-md border border-gold/50 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-white/5">
                جرّب المساعد الذكي
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="bg-cream">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center md:px-8">
          <h2 className="text-2xl font-extrabold text-gradient-gold md:text-3xl">مرحباً بكم في محاميك</h2>
          <p className="mt-5 text-sm leading-loose text-muted-foreground md:text-base">
            "محاميك" منصة قانونية رقمية تهدف إلى تسهيل التواصل بين العملاء والمحامين بطريقة حديثة وموثوقة، من خلال تجربة استخدام سهلة تساعدك على الوصول إلى المحامي المناسب وفقاً للتخصص والتقييمات وآراء العملاء.
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

      {/* Top rated */}
      <section className="bg-navy pb-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading light title="المحامون الأكثر تقييماً" subtitle="نخبة من المحامين الحاصلين على أعلى تقييمات من عملائنا." />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {topRated.map((l) => (
              <LawyerCard key={l.id} lawyer={l} />
            ))}
          </div>
        </div>
      </section>

      {/* Most consulted */}
      <section className="bg-navy-deep py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading light title="المحامون الأكثر استشارة" subtitle="الأكثر طلباً من العملاء على المنصة." />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mostConsulted.map((l) => (
              <LawyerCard key={l.id} lawyer={l} />
            ))}
          </div>
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
