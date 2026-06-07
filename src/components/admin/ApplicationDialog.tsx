import { CheckCircle2, XCircle } from "lucide-react";
import { AdminDialog, Field, FieldGrid, SectionTitle, FileList, ActionButton } from "@/components/admin/parts";

export function ApplicationDialog({
  open,
  onOpenChange,
  image,
  name,
  subtitle,
  fields,
  files,
  onApprove,
  onReject,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  image?: string;
  name: string;
  subtitle: string;
  fields: { label: string; value: React.ReactNode }[];
  files: string[];
  onApprove: () => void;
  onReject: () => void;
}) {
  return (
    <AdminDialog open={open} onOpenChange={onOpenChange} title="مراجعة طلب التسجيل">
      <div className="flex flex-wrap items-center gap-4">
        {image && <img src={image} alt={name} className="h-16 w-16 rounded-2xl object-cover" />}
        <div>
          <h2 className="text-lg font-extrabold text-cream">{name}</h2>
          <p className="text-sm text-cream/60">{subtitle}</p>
        </div>
      </div>

      <SectionTitle>بيانات المتقدّم</SectionTitle>
      <FieldGrid>
        {fields.map((f) => (
          <Field key={f.label} label={f.label} value={f.value} />
        ))}
      </FieldGrid>

      <SectionTitle>المستندات المرفوعة</SectionTitle>
      <FileList files={files} />

      <div className="mt-6 flex justify-end gap-2">
        <ActionButton tone="red" onClick={onReject}>
          <XCircle className="h-4 w-4" /> رفض الطلب
        </ActionButton>
        <ActionButton tone="green" onClick={onApprove}>
          <CheckCircle2 className="h-4 w-4" /> قبول الطلب
        </ActionButton>
      </div>
    </AdminDialog>
  );
}