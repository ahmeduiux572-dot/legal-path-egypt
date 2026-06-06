import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MapPin, Users, Briefcase, CalendarDays } from "lucide-react";
import { StarRating } from "@/components/StarRating";
import { BookingDialog } from "@/components/BookingDialog";
import { ReviewsSection } from "@/components/ReviewsSection";
import { getFirm } from "@/data/firms";

export const Route = createFileRoute("/firms/$firmId")({
  head: ({ params }) => {
    const f = getFirm(params.firmId);
    return {
      meta: [
        { title: f ? `${f.name} | محام` : "مكتب محاماة | محام" },
        { name: "description", content: f ? `${f.tagline} — ${f.about.slice(0, 120)}` : "ملف مكتب المحاماة" },
      ],
    };
  },
  loader: ({ params }) => {
    const firm = getFirm(params.firmId);
    if (!firm) throw notFound();
    return { firm };
  },
  notFoundComponent: () => (
    <div className="bg-navy py-24 text-center text-cream">
      <p>لم يتم العثور على المكتب.</p>
      <Link to="/lawyers" className="mt-4 inline-block text-gold">العودة للقائمة</Link>
    </div>
  ),
  errorComponent: () => (
    <div className="bg-navy py-24 text-center text-cream">حدث خطأ ما.</div>
  ),
  component: FirmProfile,
});

function FirmProfile() {
  const { firm } = Route.useLoaderData();

  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-8">
        <h1 className="border-b-2 border-gold pb-3 text-2xl font-extrabold text-navy md:text-3xl">
          {firm.name}
        </h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl shadow-card">
            <img src={firm.image} alt={firm.name} width={1024} height={768} className="h-full w-full object-cover" />
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <span className="text-sm text-muted-foreground">التخصص الرئيسي</span>
              <h2 className="text-lg font-bold text-navy">{firm.specialty}</h2>
            </div>
            <div className="flex items-center justify-between border-b border-border py-4">
              <span className="text-2xl font-extrabold text-navy">{firm.consultationPrice} ج.م</span>
              <span className="text-sm text-muted-foreground">سعر الاستشارة</span>
            </div>
            <div className="flex items-center justify-between border-b border-border py-4">
              <div className="flex items-center gap-2">
                <span className="font-bold text-navy">{firm.rating.toFixed(1)}</span>
                <StarRating value={firm.rating} />
              </div>
              <span className="text-sm text-muted-foreground">التقييم ({firm.reviews})</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-secondary p-4 text-center">
                <Briefcase className="mx-auto h-5 w-5 text-gold" />
                <p className="mt-2 text-lg font-extrabold text-navy">{firm.cases}+</p>
                <p className="text-xs text-muted-foreground">قضية منجزة</p>
              </div>
              <div className="rounded-xl bg-secondary p-4 text-center">
                <Users className="mx-auto h-5 w-5 text-gold" />
                <p className="mt-2 text-lg font-extrabold text-navy">{firm.teamSize}</p>
                <p className="text-xs text-muted-foreground">عضو في الفريق</p>
              </div>
            </div>
            <BookingDialog name={firm.name} price={firm.consultationPrice} />
            <div className="mt-5 space-y-3 text-sm">
              <p className="flex items-center justify-between text-muted-foreground"><span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gold" />{firm.city}</span><span>المقر</span></p>
              <p className="flex items-center justify-between text-muted-foreground"><span className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-gold" />{firm.established}</span><span>سنة التأسيس</span></p>
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-card p-7 shadow-card">
          <h3 className="text-xl font-bold text-navy">عن المكتب</h3>
          <p className="mt-4 text-sm leading-loose text-muted-foreground">{firm.about}</p>
        </div>

        <ReviewsSection lawyerName={firm.name} />

        <div className="mt-10 text-center">
          <Link to="/lawyers" className="text-sm font-semibold text-navy underline">العودة لقائمة المحامين والمكاتب</Link>
        </div>
      </div>
    </div>
  );
}