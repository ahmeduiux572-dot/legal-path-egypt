import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, BackButton, Badge, Field, FieldGrid, SectionTitle } from "@/components/admin/parts";
import { subscriptions, type Subscription } from "@/data/admin";

export const Route = createFileRoute("/admin/subscription/$subId")({ component: SubscriptionDetail });
const fmt = (n: number) => new Intl.NumberFormat("ar-EG").format(n);
const tone = (s: Subscription["status"]) => (s === "نشط" ? "green" : s === "قيد التجديد" ? "blue" : "red");

function SubscriptionDetail() {
  const { subId } = Route.useParams();
  const sub = subscriptions.find((x) => x.id === subId);

  if (!sub) {
    return (
      <>
        <BackButton label="رجوع للاشتراكات" />
        <PageHeader title="غير موجود" subtitle="لم يتم العثور على الاشتراك" />
      </>
    );
  }

  return (
    <>
      <BackButton label="رجوع للاشتراكات" />
      <PageHeader title="تفاصيل الاشتراك" subtitle={sub.subscriber} />
      <div className="rounded-2xl border border-white/10 bg-navy-card/40 p-5 md:p-6">
        <SectionTitle>بيانات الاشتراك</SectionTitle>
        <FieldGrid>
          <Field label="المشترك" value={sub.subscriber} />
          <Field label="الباقة" value={<Badge tone="gold">{sub.plan}</Badge>} />
          <Field label="القيمة" value={`${fmt(sub.price)} ج.م`} />
          <Field label="تاريخ البداية" value={sub.startDate} />
          <Field label="تاريخ التجديد" value={sub.renewDate} />
          <Field label="الحالة" value={<Badge tone={tone(sub.status)}>{sub.status}</Badge>} />
        </FieldGrid>
      </div>
    </>
  );
}
