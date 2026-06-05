import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MapPin, Briefcase } from "lucide-react";
import { StarRating } from "@/components/StarRating";
import { BookingDialog } from "@/components/BookingDialog";
import { ReviewsSection } from "@/components/ReviewsSection";
import { getLawyer } from "@/data/lawyers";

export const Route = createFileRoute("/lawyers/$lawyerId")({
  head: ({ params }) => {
    const l = getLawyer(params.lawyerId);
    return {
      meta: [
        { title: l ? `${l.name} | محاميك` : "محامٍ | محاميك" },
        { name: "description", content: l ? `${l.title} — ${l.bio.slice(0, 120)}` : "ملف المحامي" },
      ],
    };
  },
  loader: ({ params }) => {
    const lawyer = getLawyer(params.lawyerId);
    if (!lawyer) throw notFound();
    return { lawyer };
  },
  notFoundComponent: () => (
    <div className="bg-navy py-24 text-center text-cream">
      <p>لم يتم العثور على المحامي.</p>
      <Link to="/lawyers" className="mt-4 inline-block text-gold">العودة للقائمة</Link>
    </div>
  ),
  errorComponent: () => (
    <div className="bg-navy py-24 text-center text-cream">حدث خطأ ما.</div>
  ),
  component: LawyerProfile,
});

function LawyerProfile() {
  const { lawyer } = Route.useLoaderData();

  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-8">
        <h1 className="border-b-2 border-gold pb-3 text-2xl font-extrabold text-navy md:text-3xl">
          {lawyer.name}
        </h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl shadow-card">
            <img src={lawyer.image} alt={lawyer.name} width={1024} height={1024} className="h-full w-full object-cover" />
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <span className="text-sm text-muted-foreground">حسب حالة المحامي</span>
              <h2 className="text-lg font-bold text-navy">{lawyer.title}</h2>
            </div>
            <div className="flex items-center justify-between border-b border-border py-4">
              <span className="text-2xl font-extrabold text-navy">${lawyer.price}</span>
              <span className="text-sm text-muted-foreground">سعر الاستشارة</span>
            </div>
            <div className="flex items-center justify-between border-b border-border py-4">
              <div className="flex items-center gap-2">
                <span className="font-bold text-navy">{lawyer.rating.toFixed(1)}</span>
                <StarRating value={lawyer.rating} />
              </div>
              <span className="text-sm text-muted-foreground">التقييم ({lawyer.reviews})</span>
            </div>

            <BookingDialog lawyer={lawyer} />

            <div className="mt-5 space-y-3 text-sm">
              <p className="flex items-center justify-between text-muted-foreground"><span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gold" />{lawyer.city}</span><span>المدينة</span></p>
              <p className="flex items-center justify-between text-muted-foreground"><span className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-gold" />{lawyer.experience} سنة</span><span>سنوات الخبرة</span></p>
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-border bg-card p-7 shadow-card">
          <h3 className="text-xl font-bold text-navy">السيرة الذاتية</h3>
          <p className="mt-4 text-sm leading-loose text-muted-foreground">{lawyer.bio}</p>
          <p className="mt-4 text-sm leading-loose text-muted-foreground">
            يتمتع {lawyer.name} بسجل حافل بالنجاح في تأمين نتائج إيجابية وتسويات عادلة لعملائه، مع التزام كامل بالسرية والاحترافية في كل قضية.
          </p>

          <h4 className="mt-6 text-lg font-bold text-navy">مجال الممارسة</h4>
          <p className="mt-2 text-sm text-muted-foreground">{lawyer.specialty}</p>

          <h4 className="mt-6 text-lg font-bold text-navy">الخبرة المهنية</h4>
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-muted-foreground">
            <li>محامٍ ومستشار قانوني معتمد لدى نقابة المحامين</li>
            <li>خبرة {lawyer.experience} عاماً في الترافع والاستشارات</li>
            <li>الترافع أمام المحاكم بمختلف درجاتها</li>
          </ul>
        </div>

        <ReviewsSection lawyerName={lawyer.name} />

        <div className="mt-10 text-center">
          <Link to="/lawyers" className="text-sm font-semibold text-navy underline">العودة لقائمة المحامين</Link>
        </div>
      </div>
    </div>
  );
}