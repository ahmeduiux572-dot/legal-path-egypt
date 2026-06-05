import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Wallet, Clock, Users } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { PostCaseDialog } from "@/components/PostCaseDialog";
import { SubmitOfferDialog } from "@/components/SubmitOfferDialog";
import { cases } from "@/data/content";

export const Route = createFileRoute("/cases")({
  head: () => ({
    meta: [
      { title: "سوق القضايا | محاميك" },
      { name: "description", content: "اطرح قضيتك واستقبل عروضاً من المحامين، أو تصفح القضايا المتاحة على سوق القضايا." },
      { property: "og:title", content: "سوق القضايا | محاميك" },
      { property: "og:description", content: "اطرح قضيتك واستقبل عروضاً من أفضل المحامين." },
    ],
  }),
  component: CasesPage,
});

function CasesPage() {
  return (
    <div className="bg-navy">
      <section className="bg-gradient-navy">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center md:px-8">
          <SectionHeading light title="سوق القضايا" subtitle="اطرح قضيتك واستقبل عروضاً تنافسية من المحامين، أو تصفح القضايا المتاحة وقدّم عرضك." />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="mb-10 flex flex-col items-center justify-between gap-4 rounded-xl border border-gold/30 bg-navy-card/50 p-6 text-center md:flex-row md:text-start">
          <div>
            <h3 className="text-lg font-bold text-cream">لديك قضية تبحث لها عن محامٍ؟</h3>
            <p className="mt-1 text-sm text-cream/65">انشر تفاصيل قضيتك مجاناً واستقبل عروضاً من محامين متخصصين خلال ساعات.</p>
          </div>
          <PostCaseDialog
            trigger={
              <button className="rounded-md bg-gradient-gold px-6 py-3 text-sm font-bold text-navy shadow-gold transition-transform hover:-translate-y-0.5">
                انشر قضيتك الآن
              </button>
            }
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <div key={c.id} className="flex flex-col rounded-xl border border-white/10 bg-navy-card/60 p-6 transition-all hover:-translate-y-1 hover:border-gold/40">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-medium text-gold">{c.category}</span>
                <span className="text-xs text-cream/50">{c.deadline}</span>
              </div>
              <h3 className="mt-4 text-base font-bold text-cream">{c.title}</h3>
              <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-cream/65">{c.description}</p>
              <div className="mt-4 space-y-2 border-t border-white/10 pt-4 text-xs text-cream/70">
                <p className="flex items-center gap-2"><Wallet className="h-4 w-4 text-gold" />الميزانية: {c.budget}</p>
                <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gold" />{c.city}</p>
                <p className="flex items-center gap-2"><Users className="h-4 w-4 text-gold" />{c.proposals} عروض مقدمة</p>
                <p className="flex items-center gap-2"><Clock className="h-4 w-4 text-gold" />{c.deadline}</p>
              </div>
              <SubmitOfferDialog
                caseTitle={c.title}
                trigger={
                  <button className="mt-5 w-full rounded-md border border-gold/50 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-white/5">
                    قدّم عرضك
                  </button>
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}