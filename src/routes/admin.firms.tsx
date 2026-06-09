import { useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Eye, ClipboardCheck } from "lucide-react";
import {
  PageHeader, DataTable, Badge, StatCard, Toolbar, ActionButton, Tabs,
  DateRangeFilter, inDateRange, type Column,
} from "@/components/admin/parts";
import { firms, firmSpecialties, firmCities, type Firm } from "@/data/firms";
import { firmApplications, type FirmApplication } from "@/data/applications";
import { useAdminStore, isBlocked, appStatus } from "@/lib/admin-store";
import { useCountries, getCountry, formatMoney } from "@/data/countries";

export const Route = createFileRoute("/admin/firms")({ component: FirmsPage });
const fmt = (n: number) => new Intl.NumberFormat("ar-EG").format(n);

const appBadge = { pending: "gold", approved: "green", rejected: "red" } as const;
const appLabel = { pending: "قيد المراجعة", approved: "مقبول", rejected: "مرفوض" } as const;

function FirmsPage() {
  const store = useAdminStore();
  const countries = useCountries();
  const navigate = useNavigate();
  const [tab, setTab] = useState("registered");
  const [search, setSearch] = useState("");
  const [spec, setSpec] = useState("كل التخصصات");
  const [city, setCity] = useState("كل المدن");
  const [country, setCountry] = useState("all");
  const [appSearch, setAppSearch] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const filtered = useMemo(
    () =>
      firms.filter(
        (f) =>
          (spec === "كل التخصصات" || f.specialty === spec) &&
          (city === "كل المدن" || f.city === city) &&
          (country === "all" || f.country === country || f.countries.includes(country as never)) &&
          (f.name.includes(search) || f.tagline.includes(search)),
      ),
    [search, spec, city, country],
  );

  const filteredApps = useMemo(
    () =>
      firmApplications.filter(
        (a) =>
          inDateRange(a.submittedAt, from, to) &&
          (a.name.includes(appSearch) || a.tagline.includes(appSearch) || a.email.includes(appSearch)),
      ),
    [appSearch, from, to],
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
    { key: "country", label: "الدولة", render: (r) => `${getCountry(r.country).flag} ${getCountry(r.country).name}` },
    { key: "teamSize", label: "الفريق", render: (r) => `${r.teamSize} عضو` },
    { key: "price", label: "سعر الاستشارة", render: (r) => formatMoney(r.consultationPrice, r.country) },
    { key: "cases", label: "القضايا", render: (r) => fmt(r.cases) },
    { key: "rating", label: "التقييم", render: (r) => <Badge tone="gold">★ {r.rating}</Badge> },
    {
      key: "actions", label: "",
      render: (r) => (
        <ActionButton tone="outline" onClick={() => navigate({ to: "/admin/firm/$firmId", params: { firmId: r.id } })}>
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
      render: (r) => (
        <ActionButton tone="gold" onClick={() => navigate({ to: "/admin/firm-app/$appId", params: { appId: r.id } })}>
          <ClipboardCheck className="h-4 w-4" /> {appStatus(store, r.id) === "pending" ? "مراجعة" : "عرض"}
        </ActionButton>
      ),
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

      <Tabs
        active={tab}
        onChange={setTab}
        tabs={[
          { value: "registered", label: "المكاتب المسجّلة", count: firms.length },
          { value: "applications", label: "طلبات التسجيل", count: firmApplications.length },
        ]}
      />

      {tab === "registered" ? (
        <>
          <Toolbar
            search={search}
            onSearch={setSearch}
            placeholder="ابحث باسم المكتب..."
            filters={[
              { value: spec, onChange: setSpec, options: firmSpecialties.map((s) => ({ value: s, label: s })) },
              { value: city, onChange: setCity, options: firmCities.map((c) => ({ value: c, label: c })) },
              { value: country, onChange: setCountry, options: [{ value: "all", label: "كل الدول" }, ...countries.map((c) => ({ value: c.code, label: `${c.flag} ${c.name}` }))] },
            ]}
          />
          <DataTable columns={cols} rows={filtered} />
        </>
      ) : (
        <>
          <Toolbar search={appSearch} onSearch={setAppSearch} placeholder="ابحث في الطلبات...">
            <DateRangeFilter from={from} to={to} onFrom={setFrom} onTo={setTo} />
          </Toolbar>
          <DataTable columns={appCols} rows={filteredApps} empty="لا توجد طلبات" />
        </>
      )}
    </>
  );
}
