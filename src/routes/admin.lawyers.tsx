import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Eye, ClipboardCheck } from "lucide-react";
import {
  PageHeader, DataTable, Badge, StatCard, Toolbar, ActionButton, SectionTitle, type Column,
} from "@/components/admin/parts";
import { ProfileDialog } from "@/components/admin/ProfileDialog";
import { ApplicationDialog } from "@/components/admin/ApplicationDialog";
import { lawyers, specialties, cities, type Lawyer } from "@/data/lawyers";
import { lawyerApplications, type LawyerApplication } from "@/data/applications";
import { lawyerProfile } from "@/data/profiles";
import {
  useAdminStore, isBlocked, toggleBlock, appStatus, setApplicationStatus,
} from "@/lib/admin-store";

export const Route = createFileRoute("/admin/lawyers")({ component: LawyersPage });
const fmt = (n: number) => new Intl.NumberFormat("ar-EG").format(n);

const appBadge = { pending: "gold", approved: "green", rejected: "red" } as const;
const appLabel = { pending: "قيد المراجعة", approved: "مقبول", rejected: "مرفوض" } as const;

function LawyersPage() {
  const store = useAdminStore();
  const [search, setSearch] = useState("");
  const [spec, setSpec] = useState("كل التخصصات");
  const [city, setCity] = useState("كل المدن");
  const [selected, setSelected] = useState<Lawyer | null>(null);
  const [review, setReview] = useState<LawyerApplication | null>(null);

  const filtered = useMemo(
    () =>
      lawyers.filter(
        (l) =>
          (spec === "كل التخصصات" || l.specialty === spec) &&
          (city === "كل المدن" || l.city === city) &&
          (l.name.includes(search) || l.title.includes(search) || l.email.includes(search)),
      ),
    [search, spec, city],
  );

  const pendingCount = lawyerApplications.filter((a) => appStatus(store, a.id) === "pending").length;

  const cols: Column<Lawyer>[] = [
    {
      key: "name", label: "المحامي",
      render: (r) => (
        <div className="flex items-center gap-3">
          <img src={r.image} alt={r.name} className="h-10 w-10 rounded-lg object-cover" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-cream">{r.name}</span>
              {isBlocked(store, "lawyer", r.id) && <Badge tone="red">محظور</Badge>}
            </div>
            <div className="text-xs text-cream/55">{r.title}</div>
          </div>
        </div>
      ),
    },
    { key: "specialty", label: "التخصص" },
    { key: "city", label: "المدينة" },
    { key: "experience", label: "الخبرة", render: (r) => `${r.experience} سنة` },
    { key: "price", label: "السعر", render: (r) => `${fmt(r.price)} ج.م` },
    { key: "rating", label: "التقييم", render: (r) => <Badge tone="gold">★ {r.rating}</Badge> },
    {
      key: "actions", label: "",
      render: (r) => (
        <ActionButton tone="outline" onClick={() => setSelected(r)}>
          <Eye className="h-4 w-4" /> عرض الملف
        </ActionButton>
      ),
    },
  ];

  const appCols: Column<LawyerApplication>[] = [
    {
      key: "name", label: "المتقدّم",
      render: (r) => (
        <div className="flex items-center gap-3">
          <img src={r.image} alt={r.name} className="h-10 w-10 rounded-lg object-cover" />
          <div>
            <div className="font-semibold text-cream">{r.name}</div>
            <div className="text-xs text-cream/55">{r.title}</div>
          </div>
        </div>
      ),
    },
    { key: "specialty", label: "التخصص" },
    { key: "city", label: "المدينة" },
    { key: "submittedAt", label: "تاريخ التقديم" },
    { key: "files", label: "الملفات", render: (r) => <Badge tone="blue">{fmt(r.files.length)} ملف</Badge> },
    { key: "status", label: "الحالة", render: (r) => {
        const st = appStatus(store, r.id);
        return <Badge tone={appBadge[st]}>{appLabel[st]}</Badge>;
      } },
    {
      key: "actions", label: "",
      render: (r) =>
        appStatus(store, r.id) === "pending" ? (
          <ActionButton tone="gold" onClick={() => setReview(r)}>
            <ClipboardCheck className="h-4 w-4" /> مراجعة
          </ActionButton>
        ) : null,
    },
  ];

  return (
    <>
      <PageHeader title="المحامون" subtitle={`${fmt(lawyers.length)} محامٍ مسجّل على المنصة`} />
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="إجمالي المحامين" value={fmt(lawyers.length)} />
        <StatCard label="طلبات قيد المراجعة" value={fmt(pendingCount)} />
        <StatCard label="محظورون" value={fmt(lawyers.filter((l) => isBlocked(store, "lawyer", l.id)).length)} />
        <StatCard label="متوسط التقييم" value={(lawyers.reduce((s, l) => s + l.rating, 0) / lawyers.length).toFixed(1)} />
      </div>

      <SectionTitle>طلبات التسجيل الجديدة</SectionTitle>
      <DataTable columns={appCols} rows={lawyerApplications} empty="لا توجد طلبات" />

      <SectionTitle>المحامون المسجّلون</SectionTitle>
      <Toolbar
        search={search}
        onSearch={setSearch}
        placeholder="ابحث بالاسم أو البريد..."
        filters={[
          { value: spec, onChange: setSpec, options: specialties.map((s) => ({ value: s, label: s })) },
          { value: city, onChange: setCity, options: cities.map((c) => ({ value: c, label: c })) },
        ]}
      />
      <DataTable columns={cols} rows={filtered} />

      {selected && (
        <ProfileDialog
          open={Boolean(selected)}
          onOpenChange={(v) => !v && setSelected(null)}
          image={selected.image}
          name={selected.name}
          subtitle={`${selected.title} • ${selected.specialty}`}
          blocked={isBlocked(store, "lawyer", selected.id)}
          onToggleBlock={() => toggleBlock("lawyer", selected.id)}
          profile={lawyerProfile(selected)}
          fields={[
            { label: "التخصص", value: selected.specialty },
            { label: "المدينة", value: selected.city },
            { label: "سنوات الخبرة", value: `${selected.experience} سنة` },
            { label: "سعر الاستشارة", value: `${fmt(selected.price)} ج.م` },
            { label: "الهاتف", value: <span dir="ltr">{selected.phone}</span> },
            { label: "البريد", value: <span dir="ltr">{selected.email}</span> },
            { label: "التقييم", value: `★ ${selected.rating} (${selected.reviews} تقييم)` },
            { label: "عدد الاستشارات", value: fmt(selected.consultations) },
          ]}
        />
      )}

      {review && (
        <ApplicationDialog
          open={Boolean(review)}
          onOpenChange={(v) => !v && setReview(null)}
          image={review.image}
          name={review.name}
          subtitle={`${review.title} • ${review.specialty}`}
          files={review.files}
          fields={[
            { label: "التخصص", value: review.specialty },
            { label: "المدينة", value: review.city },
            { label: "سنوات الخبرة", value: `${review.experience} سنة` },
            { label: "سعر الاستشارة", value: `${fmt(review.price)} ج.م` },
            { label: "رقم العضوية", value: review.barNumber },
            { label: "الهاتف", value: <span dir="ltr">{review.phone}</span> },
            { label: "البريد", value: <span dir="ltr">{review.email}</span> },
            { label: "نبذة", value: <span className="text-cream/70">{review.bio}</span> },
          ]}
          onApprove={() => { setApplicationStatus(review.id, "approved"); setReview(null); }}
          onReject={() => { setApplicationStatus(review.id, "rejected"); setReview(null); }}
        />
      )}
    </>
  );
}
