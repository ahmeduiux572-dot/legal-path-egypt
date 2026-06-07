import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Eye, ClipboardCheck } from "lucide-react";
import {
  PageHeader, DataTable, Badge, StatCard, Toolbar, ActionButton, SectionTitle, type Column,
} from "@/components/admin/parts";
import { ProfileDialog } from "@/components/admin/ProfileDialog";
import { ApplicationDialog } from "@/components/admin/ApplicationDialog";
import { firms, firmSpecialties, firmCities, type Firm } from "@/data/firms";
import { firmApplications, type FirmApplication } from "@/data/applications";
import { firmProfile } from "@/data/profiles";
import {
  useAdminStore, isBlocked, toggleBlock, appStatus, setApplicationStatus,
} from "@/lib/admin-store";

export const Route = createFileRoute("/admin/firms")({ component: FirmsPage });
const fmt = (n: number) => new Intl.NumberFormat("ar-EG").format(n);

const appBadge = { pending: "gold", approved: "green", rejected: "red" } as const;
const appLabel = { pending: "قيد المراجعة", approved: "مقبول", rejected: "مرفوض" } as const;

function FirmsPage() {
  const store = useAdminStore();
  const [search, setSearch] = useState("");
  const [spec, setSpec] = useState("كل التخصصات");
  const [city, setCity] = useState("كل المدن");
  const [selected, setSelected] = useState<Firm | null>(null);
  const [review, setReview] = useState<FirmApplication | null>(null);

  const filtered = useMemo(
    () =>
      firms.filter(
        (f) =>
          (spec === "كل التخصصات" || f.specialty === spec) &&
          (city === "كل المدن" || f.city === city) &&
          (f.name.includes(search) || f.tagline.includes(search)),
      ),
    [search, spec, city],
  );

  const pendingCount = firmApplications.filter((a) => appStatus(store, a.id) === "pending").length;

  const cols: Column<Firm>[] = [
    {
      key: "name", label: "المكتب",
      render: (r) => (
        <div className="flex items-center gap-3">
          <img src={r.image} alt={r.name} className="h-10 w-10 rounded-lg object-cover" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-cream">{r.name}</span>
              {isBlocked(store, "firm", r.id) && <Badge tone="red">محظور</Badge>}
            </div>
            <div className="text-xs text-cream/55">{r.tagline}</div>
          </div>
        </div>
      ),
    },
    { key: "specialty", label: "التخصص" },
    { key: "city", label: "المدينة" },
    { key: "teamSize", label: "الفريق", render: (r) => `${r.teamSize} عضو` },
    { key: "cases", label: "القضايا", render: (r) => fmt(r.cases) },
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

  const appCols: Column<FirmApplication>[] = [
    {
      key: "name", label: "المكتب المتقدّم",
      render: (r) => (
        <div className="flex items-center gap-3">
          <img src={r.image} alt={r.name} className="h-10 w-10 rounded-lg object-cover" />
          <div>
            <div className="font-semibold text-cream">{r.name}</div>
            <div className="text-xs text-cream/55">{r.tagline}</div>
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
      <PageHeader title="المكاتب" subtitle={`${fmt(firms.length)} مكتب محاماة`} />
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="إجمالي المكاتب" value={fmt(firms.length)} />
        <StatCard label="طلبات قيد المراجعة" value={fmt(pendingCount)} />
        <StatCard label="محظورة" value={fmt(firms.filter((f) => isBlocked(store, "firm", f.id)).length)} />
        <StatCard label="إجمالي القضايا" value={fmt(firms.reduce((s, f) => s + f.cases, 0))} />
      </div>

      <SectionTitle>طلبات التسجيل الجديدة</SectionTitle>
      <DataTable columns={appCols} rows={firmApplications} empty="لا توجد طلبات" />

      <SectionTitle>المكاتب المسجّلة</SectionTitle>
      <Toolbar
        search={search}
        onSearch={setSearch}
        placeholder="ابحث باسم المكتب..."
        filters={[
          { value: spec, onChange: setSpec, options: firmSpecialties.map((s) => ({ value: s, label: s })) },
          { value: city, onChange: setCity, options: firmCities.map((c) => ({ value: c, label: c })) },
        ]}
      />
      <DataTable columns={cols} rows={filtered} />

      {selected && (
        <ProfileDialog
          open={Boolean(selected)}
          onOpenChange={(v) => !v && setSelected(null)}
          image={selected.image}
          name={selected.name}
          subtitle={`${selected.specialty} • ${selected.city}`}
          blocked={isBlocked(store, "firm", selected.id)}
          onToggleBlock={() => toggleBlock("firm", selected.id)}
          profile={firmProfile(selected)}
          fields={[
            { label: "التخصص", value: selected.specialty },
            { label: "المدينة", value: selected.city },
            { label: "سنة التأسيس", value: selected.established },
            { label: "حجم الفريق", value: `${selected.teamSize} عضو` },
            { label: "سعر الاستشارة", value: `${fmt(selected.consultationPrice)} ج.م` },
            { label: "عدد القضايا", value: fmt(selected.cases) },
            { label: "التقييم", value: `★ ${selected.rating} (${selected.reviews} تقييم)` },
            { label: "نبذة", value: <span className="text-cream/70">{selected.about}</span> },
          ]}
        />
      )}

      {review && (
        <ApplicationDialog
          open={Boolean(review)}
          onOpenChange={(v) => !v && setReview(null)}
          image={review.image}
          name={review.name}
          subtitle={`${review.specialty} • ${review.city}`}
          files={review.files}
          fields={[
            { label: "التخصص", value: review.specialty },
            { label: "المدينة", value: review.city },
            { label: "سنة التأسيس", value: review.established },
            { label: "حجم الفريق", value: `${review.teamSize} عضو` },
            { label: "رقم الترخيص", value: review.licenseNumber },
            { label: "الهاتف", value: <span dir="ltr">{review.phone}</span> },
            { label: "البريد", value: <span dir="ltr">{review.email}</span> },
            { label: "نبذة", value: <span className="text-cream/70">{review.about}</span> },
          ]}
          onApprove={() => { setApplicationStatus(review.id, "approved"); setReview(null); }}
          onReject={() => { setApplicationStatus(review.id, "rejected"); setReview(null); }}
        />
      )}
    </>
  );
}
