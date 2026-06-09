import { useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Eye, ClipboardCheck } from "lucide-react";
import {
  PageHeader, DataTable, Badge, StatCard, Toolbar, ActionButton, Tabs,
  DateRangeFilter, inDateRange, type Column,
} from "@/components/admin/parts";
import { lawyers, specialties, cities, type Lawyer } from "@/data/lawyers";
import { lawyerApplications, type LawyerApplication } from "@/data/applications";
import { useAdminStore, isBlocked, appStatus } from "@/lib/admin-store";
import { useCountries, getCountry, formatMoney } from "@/data/countries";

export const Route = createFileRoute("/admin/lawyers")({ component: LawyersPage });
const fmt = (n: number) => new Intl.NumberFormat("ar-EG").format(n);

const appBadge = { pending: "gold", approved: "green", rejected: "red" } as const;
const appLabel = { pending: "قيد المراجعة", approved: "مقبول", rejected: "مرفوض" } as const;

function LawyersPage() {
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
      lawyers.filter(
        (l) =>
          (spec === "كل التخصصات" || l.specialty === spec) &&
          (city === "كل المدن" || l.city === city) &&
          (country === "all" || l.country === country || l.countries.includes(country as never)) &&
          (l.name.includes(search) || l.title.includes(search) || l.email.includes(search)),
      ),
    [search, spec, city, country],
  );

  const filteredApps = useMemo(
    () =>
      lawyerApplications.filter(
        (a) =>
          inDateRange(a.submittedAt, from, to) &&
          (a.name.includes(appSearch) || a.title.includes(appSearch) || a.email.includes(appSearch)),
      ),
    [appSearch, from, to],
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
    { key: "country", label: "الدولة", render: (r) => `${getCountry(r.country).flag} ${getCountry(r.country).name}` },
    { key: "experience", label: "الخبرة", render: (r) => `${r.experience} سنة` },
    { key: "price", label: "السعر", render: (r) => formatMoney(r.price, r.country) },
    { key: "rating", label: "التقييم", render: (r) => <Badge tone="gold">★ {r.rating}</Badge> },
    {
      key: "actions", label: "",
      render: (r) => (
        <ActionButton tone="outline" onClick={() => navigate({ to: "/admin/lawyer/$lawyerId", params: { lawyerId: r.id } })}>
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
      render: (r) => (
        <ActionButton tone="gold" onClick={() => navigate({ to: "/admin/lawyer-app/$appId", params: { appId: r.id } })}>
          <ClipboardCheck className="h-4 w-4" /> {appStatus(store, r.id) === "pending" ? "مراجعة" : "عرض"}
        </ActionButton>
      ),
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

      <Tabs
        active={tab}
        onChange={setTab}
        tabs={[
          { value: "registered", label: "المحامون المسجّلون", count: lawyers.length },
          { value: "applications", label: "طلبات التسجيل", count: lawyerApplications.length },
        ]}
      />

      {tab === "registered" ? (
        <>
          <Toolbar
            search={search}
            onSearch={setSearch}
            placeholder="ابحث بالاسم أو البريد..."
            filters={[
              { value: spec, onChange: setSpec, options: specialties.map((s) => ({ value: s, label: s })) },
              { value: city, onChange: setCity, options: cities.map((c) => ({ value: c, label: c })) },
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
