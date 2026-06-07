import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CheckCircle2, XCircle } from "lucide-react";
import {
  PageHeader, BackButton, Badge, Field, FieldGrid, SectionTitle, ActionButton,
} from "@/components/admin/parts";
import { cases } from "@/data/content";
import { useAdminStore, caseStatus, setCaseStatus } from "@/lib/admin-store";

export const Route = createFileRoute("/admin/case/$caseId")({ component: CaseDetail });
const fmt = (n: number) => new Intl.NumberFormat("ar-EG").format(n);
const csBadge = { pending: "gold", published: "green", rejected: "red" } as const;
const csLabel = { pending: "قيد المراجعة", published: "منشورة", rejected: "مرفوضة" } as const;

function CaseDetail() {
  const { caseId } = Route.useParams();
  const store = useAdminStore();
  const navigate = useNavigate();
  const c = cases.find((x) => x.id === caseId);

  if (!c) {
    return (
      <>
        <BackButton label="رجوع لسوق القضايا" />
        <PageHeader title="غير موجود" subtitle="لم يتم العثور على القضية" />
      </>
    );
  }

  const s = caseStatus(store, c.id);
  const back = () => navigate({ to: "/admin/cases" });

  return (
    <>
      <BackButton label="رجوع لسوق القضايا" />
      <PageHeader title="مراجعة القضية" subtitle={c.title} />
      <div className="rounded-2xl border border-white/10 bg-navy-card/40 p-5 md:p-6">
        <SectionTitle>بيانات القضية</SectionTitle>
        <FieldGrid>
          <Field label="العنوان" value={c.title} />
          <Field label="التصنيف" value={<Badge tone="gold">{c.category}</Badge>} />
          <Field label="المدينة" value={c.city} />
          <Field label="الميزانية" value={c.budget} />
          <Field label="الموعد" value={c.deadline} />
          <Field label="عدد العروض" value={fmt(c.proposals)} />
          <Field label="الحالة" value={<Badge tone={csBadge[s]}>{csLabel[s]}</Badge>} />
        </FieldGrid>

        <SectionTitle>الوصف</SectionTitle>
        <p className="rounded-2xl border border-white/10 bg-navy-card/40 p-4 text-sm text-cream/75">{c.description}</p>

        <div className="mt-6 flex justify-end gap-2">
          <ActionButton tone="red" onClick={() => { setCaseStatus(c.id, "rejected"); back(); }}>
            <XCircle className="h-4 w-4" /> رفض
          </ActionButton>
          <ActionButton tone="green" onClick={() => { setCaseStatus(c.id, "published"); back(); }}>
            <CheckCircle2 className="h-4 w-4" /> نشر القضية
          </ActionButton>
        </div>
      </div>
    </>
  );
}
