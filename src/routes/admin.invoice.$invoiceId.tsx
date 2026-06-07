import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, BackButton, Badge, Field, FieldGrid, SectionTitle } from "@/components/admin/parts";
import { dashInvoices, type DashInvoice } from "@/data/dashboard";

export const Route = createFileRoute("/admin/invoice/$invoiceId")({ component: InvoiceDetail });
const fmt = (n: number) => new Intl.NumberFormat("ar-EG").format(n);
const tone = (s: DashInvoice["status"]) => (s === "مدفوعة" ? "green" : s === "معلقة" ? "blue" : "red");

function InvoiceDetail() {
  const { invoiceId } = Route.useParams();
  const inv = dashInvoices.find((x) => x.id === invoiceId);

  if (!inv) {
    return (
      <>
        <BackButton label="رجوع للإيرادات" />
        <PageHeader title="غير موجود" subtitle="لم يتم العثور على الفاتورة" />
      </>
    );
  }

  return (
    <>
      <BackButton label="رجوع للإيرادات" />
      <PageHeader title={<span dir="ltr">فاتورة {inv.number}</span>} subtitle={inv.client} />
      <div className="rounded-2xl border border-white/10 bg-navy-card/40 p-5 md:p-6">
        <SectionTitle>تفاصيل الفاتورة</SectionTitle>
        <FieldGrid>
          <Field label="رقم الفاتورة" value={<span dir="ltr">{inv.number}</span>} />
          <Field label="العميل" value={inv.client} />
          <Field label="البند" value={inv.item ?? "—"} />
          {inv.caseRef && <Field label="مرجع القضية" value={inv.caseRef} />}
          <Field label="المبلغ" value={`${fmt(inv.amount)} ج.م`} />
          {inv.tax != null && <Field label="الضريبة" value={`${inv.tax}%`} />}
          <Field label="تاريخ الإصدار" value={inv.issueDate ?? inv.date} />
          {inv.dueDate && <Field label="تاريخ الاستحقاق" value={inv.dueDate} />}
          <Field label="الحالة" value={<Badge tone={tone(inv.status)}>{inv.status}</Badge>} />
          {inv.notes && <Field label="ملاحظات" value={<span className="text-cream/70">{inv.notes}</span>} />}
        </FieldGrid>
      </div>
    </>
  );
}
