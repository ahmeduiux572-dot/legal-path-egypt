import { CheckCircle2, XCircle } from "lucide-react";
import { Field, FieldGrid, SectionTitle, FileList, ActionButton, Badge } from "@/components/admin/parts";

export function ApplicationView({
  image,
  name,
  subtitle,
  fields,
  files,
  status,
  onApprove,
  onReject,
}: {
  image?: string;
  name: string;
  subtitle: string;
  fields: { label: string; value: React.ReactNode }[];
  files: string[];
  status: "pending" | "approved" | "rejected";
  onApprove: () => void;
  onReject: () => void;
}) {
  const tone = { pending: "gold", approved: "green", rejected: "red" } as const;
  const label = { pending: "قيد المراجعة", approved: "مقبول", rejected: "مرفوض" } as const;
  return (
    <div className="rounded-2xl border border-white/10 bg-navy-card/40 p-5 md:p-6">
      <div className="flex flex-wrap items-center gap-4">
        {image && <img src={image} alt={name} className="h-16 w-16 rounded-2xl object-cover" />}
        <div className="flex-1">
          <h2 className="text-xl font-extrabold text-cream">{name}</h2>
          <p className="text-sm text-cream/60">{subtitle}</p>
        </div>
        <Badge tone={tone[status]}>{label[status]}</Badge>
      </div>

      <SectionTitle>بيانات المتقدّم</SectionTitle>
      <FieldGrid>
        {fields.map((f) => (
          <Field key={f.label} label={f.label} value={f.value} />
        ))}
      </FieldGrid>

      <SectionTitle>المستندات المرفوعة</SectionTitle>
      <FileList files={files} />

      {status === "pending" && (
        <div className="mt-6 flex justify-end gap-2">
          <ActionButton tone="red" onClick={onReject}>
            <XCircle className="h-4 w-4" /> رفض الطلب
          </ActionButton>
          <ActionButton tone="green" onClick={onApprove}>
            <CheckCircle2 className="h-4 w-4" /> قبول الطلب
          </ActionButton>
        </div>
      )}
    </div>
  );
}