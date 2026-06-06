import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Wallet,
  CalendarClock,
  Star,
  Briefcase,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  MapPin,
  Bell,
} from "lucide-react";
import { StarRating } from "@/components/StarRating";
import { lawyers, sampleReviews } from "@/data/lawyers";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "لوحة تحكم المحامي | محام" },
      { name: "description", content: "تابع استشاراتك القادمة وأرباحك وتقييماتك وعروض القضايا من لوحة تحكم المحامي." },
      { property: "og:title", content: "لوحة تحكم المحامي | محام" },
      { property: "og:description", content: "إدارة الاستشارات والأرباح والتقييمات في مكان واحد." },
    ],
  }),
  component: DashboardPage,
});

const lawyer = lawyers[0];

const stats = [
  { label: "إجمالي الأرباح", value: "84,500 ج.م", icon: Wallet, hint: "هذا الشهر +12%" },
  { label: "استشارات قادمة", value: "6", icon: CalendarClock, hint: "خلال 7 أيام" },
  { label: "متوسط التقييم", value: lawyer.rating.toFixed(1), icon: Star, hint: `${lawyer.reviews} تقييم` },
  { label: "قضايا نشطة", value: "9", icon: Briefcase, hint: "قيد المتابعة" },
];

const appointments = [
  { id: 1, client: "أحمد سمير", type: "استشارة قانون أسرة", date: "اليوم 04:30 م", status: "مؤكد" },
  { id: 2, client: "منى عبد الله", type: "مراجعة عقد إيجار", date: "غداً 11:00 ص", status: "بانتظار التأكيد" },
  { id: 3, client: "كريم حسن", type: "نزاع تجاري", date: "الأربعاء 01:00 م", status: "مؤكد" },
  { id: 4, client: "سارة محمود", type: "استشارة عمالية", date: "الخميس 06:00 م", status: "بانتظار التأكيد" },
];

const caseRequests = [
  { id: 1, title: "قضية نفقة وحضانة", city: "القاهرة", budget: "5,000 ج.م", time: "منذ ساعة" },
  { id: 2, title: "صياغة عقد شراكة تجارية", city: "الجيزة", budget: "8,000 ج.م", time: "منذ 3 ساعات" },
  { id: 3, title: "تعويض عن إصابة عمل", city: "الإسكندرية", budget: "6,500 ج.م", time: "أمس" },
];

function DashboardPage() {
  return (
    <div className="bg-navy">
      {/* Header */}
      <section className="bg-gradient-navy">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-12 md:flex-row md:items-center md:px-8">
          <div className="flex items-center gap-4">
            <img
              src={lawyer.image}
              alt={lawyer.name}
              width={72}
              height={72}
              className="h-16 w-16 rounded-2xl border border-gold/30 object-cover md:h-18 md:w-18"
            />
            <div>
              <p className="text-sm text-cream/60">مرحباً بعودتك</p>
              <h1 className="text-2xl font-extrabold text-gradient-gold md:text-3xl">{lawyer.name}</h1>
              <p className="mt-1 flex items-center gap-2 text-sm text-cream/65">
                <MapPin className="h-4 w-4 text-gold" /> {lawyer.city} — {lawyer.title}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 rounded-md border border-white/15 px-4 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-white/5">
              <Bell className="h-4 w-4 text-gold" /> الإشعارات
            </button>
            <Link
              to="/lawyers/$lawyerId"
              params={{ lawyerId: lawyer.id }}
              className="rounded-md bg-gradient-gold px-4 py-2.5 text-sm font-bold text-navy shadow-gold transition-transform hover:-translate-y-0.5"
            >
              عرض ملفي العام
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        {/* Stats */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-white/10 bg-navy-card/60 p-6 transition-all hover:-translate-y-1 hover:border-gold/40"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-gold/15 text-gold">
                  <s.icon className="h-5 w-5" />
                </span>
                <TrendingUp className="h-4 w-4 text-gold/60" />
              </div>
              <p className="mt-4 text-2xl font-extrabold text-cream">{s.value}</p>
              <p className="mt-1 text-sm text-cream/65">{s.label}</p>
              <p className="mt-2 text-xs text-gold/80">{s.hint}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {/* Upcoming appointments */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-white/10 bg-navy-card/60 p-6">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-lg font-bold text-cream">
                  <CalendarClock className="h-5 w-5 text-gold" /> الاستشارات القادمة
                </h2>
                <span className="text-xs text-cream/50">{appointments.length} مواعيد</span>
              </div>
              <div className="space-y-3">
                {appointments.map((a) => (
                  <div
                    key={a.id}
                    className="flex flex-col gap-3 rounded-xl border border-white/10 bg-navy-deep/50 p-4 transition-colors hover:border-gold/30 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-bold text-cream">{a.client}</p>
                      <p className="mt-0.5 text-sm text-cream/60">{a.type}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5 text-sm text-cream/70">
                        <Clock className="h-4 w-4 text-gold" /> {a.date}
                      </span>
                      <span
                        className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                          a.status === "مؤكد"
                            ? "bg-emerald-500/15 text-emerald-400"
                            : "bg-gold/15 text-gold"
                        }`}
                      >
                        {a.status === "مؤكد" ? (
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        ) : (
                          <Clock className="h-3.5 w-3.5" />
                        )}
                        {a.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Case requests */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-navy-card/60 p-6">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-lg font-bold text-cream">
                  <Briefcase className="h-5 w-5 text-gold" /> عروض قضايا جديدة
                </h2>
                <Link to="/cases" className="text-xs font-semibold text-gold hover:underline">
                  عرض الكل
                </Link>
              </div>
              <div className="space-y-3">
                {caseRequests.map((c) => (
                  <div
                    key={c.id}
                    className="flex flex-col gap-3 rounded-xl border border-white/10 bg-navy-deep/50 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-bold text-cream">{c.title}</p>
                      <p className="mt-0.5 flex items-center gap-3 text-xs text-cream/55">
                        <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-gold" />{c.city}</span>
                        <span className="flex items-center gap-1"><Wallet className="h-3.5 w-3.5 text-gold" />{c.budget}</span>
                        <span>{c.time}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="rounded-md bg-gradient-gold px-4 py-2 text-xs font-bold text-navy shadow-gold transition-transform hover:-translate-y-0.5">
                        تقديم عرض
                      </button>
                      <button className="flex items-center gap-1 rounded-md border border-white/15 px-3 py-2 text-xs font-semibold text-cream/70 transition-colors hover:bg-white/5">
                        <XCircle className="h-4 w-4" /> تجاهل
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar: rating + reviews */}
          <div className="space-y-8">
            <div className="rounded-2xl border border-white/10 bg-navy-card/60 p-6 text-center">
              <h2 className="text-lg font-bold text-cream">تقييم العملاء</h2>
              <p className="mt-4 text-4xl font-extrabold text-gold">{lawyer.rating.toFixed(1)}</p>
              <div className="mt-2 flex justify-center">
                <StarRating value={lawyer.rating} />
              </div>
              <p className="mt-2 text-sm text-cream/60">من {lawyer.reviews} تقييماً</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-navy-card/60 p-6">
              <h2 className="mb-4 text-lg font-bold text-cream">أحدث المراجعات</h2>
              <div className="space-y-4">
                {sampleReviews.map((r) => (
                  <div key={r.id} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-cream">{r.author}</span>
                      <StarRating value={r.rating} />
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-cream/65">{r.text}</p>
                    <p className="mt-1.5 text-[11px] text-cream/40">{r.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}