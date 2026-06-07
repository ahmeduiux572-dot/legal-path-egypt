import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CheckCircle2, XCircle, RotateCcw, Wallet } from "lucide-react";
import {
  PageHeader, BackButton, Badge, Field, FieldGrid, SectionTitle, ActionButton,
} from "@/components/admin/parts";
import { findWithdrawal, type WithdrawalStatus } from "@/data/withdrawals";
import { lawyers } from "@/data/lawyers";
import { firms } from "@/data/firms";
import { useAdminStore, withdrawalStatus, setWithdrawalStatus } from "@/lib/admin-store";

export const Route = createFileRoute("/admin/withdrawal/$withdrawalId")({ component: WithdrawalDetail });
const fmt = (n: number) => new Intl.NumberFormat("ar-EG").format(n);
const tone = (s: WithdrawalStatus) => (s === "منفذ" ? "green" : s === "قيد المراجعة" ? "gold" : "red");

function WithdrawalDetail() {
  const { withdrawalId } = Route.useParams();
  const store = useAdminStore();
  const navigate = useNavigate();
  const w = findWithdrawal(withdrawalId);

  if (!w) {
    return (
      <>
        <BackButton label="رجوع لطلبات السحب" />
        <PageHeader title="غير موجود" subtitle="لم يتم العثور على الطلب" />
      </>
    );
  }

  const status = withdrawalStatus(store, w.id, w.status);
  const goProfile = () =>
    w.requesterType === "lawyer"
      ? navigate({ to: "/admin/lawyer/$lawyerId", params: { lawyerId: w.requesterId } })
      : navigate({ to: "/admin/firm/$firmId", params: { firmId: w.requesterId } });
  const exists =
    w.requesterType === "lawyer"
      ? lawyers.some((l) => l.id === w.requesterId)
      : firms.some((f) => f.id === w.requesterId);

  return (
    <>
      <BackButton label="رجوع لطلبات السحب" />
      <PageHeader
        title="تفاصيل طلب السحب"
        subtitle={w.requester}
        action={<Badge tone={tone(status)}>{status}</Badge>}
      />
      <div className="rounded-2xl border border-white/10 bg-navy-card/40 p-5 md:p-6">
        <SectionTitle>بيانات الطلب</SectionTitle>
        <FieldGrid>
          <Field label="مقدّم الطلب" value={w.requester} />
          <Field label="النوع" value={<Badge tone="blue">{w.requesterType === "lawyer" ? "محامٍ" : "مكتب"}</Badge>} />
          <Field label="المبلغ" value={<span className="text-gold font-bold">{fmt(w.amount)} ج.م</span>} />
          <Field label="وسيلة السحب" value={w.method} />
          <Field label="الحساب / المحفظة" value={<span dir="ltr">{w.account}</span>} />
          <Field label="تاريخ الطلب" value={w.date} />
          <Field label="الحالة" value={<Badge tone={tone(status)}>{status}</Badge>} />
        </FieldGrid>

        {exists && (
          <div className="mt-4">
            <ActionButton tone="outline" onClick={goProfile}>
              <Wallet className="h-4 w-4" /> عرض ملف مقدّم الطلب
            </ActionButton>
          </div>
        )}

        <SectionTitle>تغيير الحالة</SectionTitle>
        <div className="flex flex-wrap justify-end gap-2">
          {status !== "قيد المراجعة" && (
            <ActionButton tone="outline" onClick={() => setWithdrawalStatus(w.id, "قيد المراجعة")}>
              <RotateCcw className="h-4 w-4" /> إعادة للمراجعة
            </ActionButton>
          )}
          {status !== "مرفوض" && (
            <ActionButton tone="red" onClick={() => setWithdrawalStatus(w.id, "مرفوض")}>
              <XCircle className="h-4 w-4" /> رفض الطلب
            </ActionButton>
          )}
          {status !== "منفذ" && (
            <ActionButton tone="green" onClick={() => setWithdrawalStatus(w.id, "منفذ")}>
              <CheckCircle2 className="h-4 w-4" /> اعتماد وتنفيذ السحب
            </ActionButton>
          )}
        </div>
      </div>
    </>
  );
}
