import { createFileRoute } from "@tanstack/react-router";
import {
  PageHeader, BackButton, Badge, Field, FieldGrid, SectionTitle,
} from "@/components/admin/parts";
import { dashConsultations, type DashConsultation } from "@/data/dashboard";
import { lawyers } from "@/data/lawyers";

export const Route = createFileRoute("/admin/consultation/$consultationId")({ component: ConsultationDetail });
const fmt = (n: number) => new Intl.NumberFormat("ar-EG").format(n);

function assignedLawyer(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return lawyers[h % lawyers.length];
}
const tone = (s: DashConsultation["status"]) =>
  s === "مكتملة" ? "green" : s === "قادمة" ? "blue" : "red";

function ConsultationDetail() {
  const { consultationId } = Route.useParams();
  const c = dashConsultations.find((x) => x.id === consultationId);

  if (!c) {
    return (
      <>
        <BackButton label="رجوع للاستشارات" />
        <PageHeader title="غير موجود" subtitle="لم يتم العثور على الاستشارة" />
      </>
    );
  }

  const lawyer = assignedLawyer(c.id);

  return (
    <>
      <BackButton label="رجوع للاستشارات" />
      <PageHeader title="تفاصيل الاستشارة" subtitle={c.subject} />
      <div className="rounded-2xl border border-white/10 bg-navy-card/40 p-5 md:p-6">
        <SectionTitle>بيانات الاستشارة</SectionTitle>
        <FieldGrid>
          <Field label="العميل" value={c.client} />
          <Field label="الموضوع" value={c.subject} />
          <Field label="القناة" value={c.channel} />
          <Field label="التاريخ" value={`${c.date} - ${c.time}`} />
          <Field label="المدة" value={c.duration ?? "—"} />
          <Field label="السعر" value={`${fmt(c.price)} ج.م`} />
          <Field label="القضية المرتبطة" value={c.caseRef ?? "—"} />
          <Field label="الحالة" value={<Badge tone={tone(c.status)}>{c.status}</Badge>} />
        </FieldGrid>

        <SectionTitle>المحامي المعيّن</SectionTitle>
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-navy-card/40 p-4">
          <img src={lawyer.image} alt={lawyer.name} className="h-12 w-12 rounded-xl object-cover" />
          <div className="flex-1">
            <div className="font-semibold text-cream">{lawyer.name}</div>
            <div className="text-xs text-cream/55">{lawyer.title} • {lawyer.specialty}</div>
          </div>
          <Badge tone="gold">★ {lawyer.rating}</Badge>
        </div>

        {c.notes && (
          <>
            <SectionTitle>ملاحظات</SectionTitle>
            <p className="rounded-2xl border border-white/10 bg-navy-card/40 p-4 text-sm text-cream/75">{c.notes}</p>
          </>
        )}
      </div>
    </>
  );
}
