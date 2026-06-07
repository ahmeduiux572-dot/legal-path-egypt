import { createFileRoute } from "@tanstack/react-router";
import { Ban, CheckCircle2 } from "lucide-react";
import {
  PageHeader, BackButton, Badge, Field, FieldGrid, SectionTitle, ActionButton, FileList,
} from "@/components/admin/parts";
import { dashClients } from "@/data/dashboard";
import { useAdminStore, isBlocked, toggleBlock } from "@/lib/admin-store";

export const Route = createFileRoute("/admin/client-profile/$clientId")({ component: ClientDetail });
const fmt = (n: number) => new Intl.NumberFormat("ar-EG").format(n);

function ClientDetail() {
  const { clientId } = Route.useParams();
  const store = useAdminStore();
  const c = dashClients.find((x) => x.id === clientId);

  if (!c) {
    return (
      <>
        <BackButton label="رجوع للعملاء" />
        <PageHeader title="غير موجود" subtitle="لم يتم العثور على العميل" />
      </>
    );
  }

  const blocked = isBlocked(store, "client", c.id);

  return (
    <>
      <BackButton label="رجوع للعملاء" />
      <PageHeader title="ملف العميل" subtitle={c.name} />
      <div className="rounded-2xl border border-white/10 bg-navy-card/40 p-5 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-cream">{c.name}</h2>
            <Badge tone={c.type === "شركة" ? "blue" : "muted"}>{c.type ?? "فرد"}</Badge>
            {blocked && <Badge tone="red">محظور</Badge>}
          </div>
          <ActionButton tone={blocked ? "green" : "red"} onClick={() => toggleBlock("client", c.id)}>
            {blocked ? <><CheckCircle2 className="h-4 w-4" /> رفع الحظر</> : <><Ban className="h-4 w-4" /> حظر العميل</>}
          </ActionButton>
        </div>

        <SectionTitle>البيانات</SectionTitle>
        <FieldGrid>
          <Field label="النوع" value={c.type ?? "فرد"} />
          <Field label="المدينة" value={c.city ?? "—"} />
          <Field label="الهاتف" value={<span dir="ltr">{c.phone}</span>} />
          {c.altPhone && <Field label="هاتف بديل" value={<span dir="ltr">{c.altPhone}</span>} />}
          <Field label="البريد" value={<span dir="ltr">{c.email}</span>} />
          <Field label="الرقم القومي / السجل" value={c.nationalId ?? "—"} />
          <Field label="العنوان" value={c.address ?? "—"} />
          <Field label="عدد القضايا" value={fmt(c.cases)} />
          <Field label="عميل منذ" value={c.since} />
          {c.notes && <Field label="ملاحظات" value={<span className="text-cream/70">{c.notes}</span>} />}
        </FieldGrid>

        <SectionTitle>الملفات المرفوعة</SectionTitle>
        <FileList files={c.files ?? []} />
      </div>
    </>
  );
}
