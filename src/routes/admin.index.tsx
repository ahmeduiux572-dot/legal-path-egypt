import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from "recharts";
import { Scale, Building2, Users, MessagesSquare, Gavel, Wallet } from "lucide-react";
import {
  PageHeader, StatCard, DataTable, Badge, DateRangeFilter, inDateRange, type Column,
} from "@/components/admin/parts";
import { lawyers, topRated } from "@/data/lawyers";
import { firms } from "@/data/firms";
import { cases } from "@/data/content";
import { dashClients, dashConsultations } from "@/data/dashboard";
import { revenueByMonth, subscriptionsMRR } from "@/data/admin";

export const Route = createFileRoute("/admin/")({ component: Overview });

const fmt = (n: number) => new Intl.NumberFormat("ar-EG").format(n);

function Overview() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const filteredConsultations = useMemo(
    () => dashConsultations.filter((c) => inDateRange(c.date, from, to)),
    [from, to],
  );

  const consultCols: Column<(typeof dashConsultations)[number]>[] = [
    { key: "client", label: "العميل" },
    { key: "subject", label: "الموضوع" },
    { key: "date", label: "التاريخ" },
    { key: "price", label: "السعر", render: (r) => `${fmt(r.price)} ج.م` },
    {
      key: "status", label: "الحالة",
      render: (r) => (
        <Badge tone={r.status === "مكتملة" ? "green" : r.status === "قادمة" ? "blue" : "red"}>
          {r.status}
        </Badge>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="نظرة عامة"
        subtitle="ملخص أداء منصة مُحامٍ"
        action={<DateRangeFilter from={from} to={to} onFrom={setFrom} onTo={setTo} />}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard label="المحامون" value={fmt(lawyers.length)} icon={<Scale className="h-5 w-5" />} />
        <StatCard label="المكاتب" value={fmt(firms.length)} icon={<Building2 className="h-5 w-5" />} />
        <StatCard label="العملاء" value={fmt(dashClients.length)} icon={<Users className="h-5 w-5" />} />
        <StatCard label="الاستشارات" value={fmt(dashConsultations.length)} icon={<MessagesSquare className="h-5 w-5" />} />
        <StatCard label="القضايا" value={fmt(cases.length)} icon={<Gavel className="h-5 w-5" />} />
        <StatCard label="الإيراد الشهري" value={`${fmt(subscriptionsMRR)} ج.م`} icon={<Wallet className="h-5 w-5" />} />
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-navy-card/50 p-5 shadow-lg">
        <h2 className="mb-4 text-lg font-bold text-cream">الإيرادات خلال 6 أشهر</h2>
        <div className="h-72 w-full" dir="ltr">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueByMonth} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gGold" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.76 0.1 80)" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="oklch(0.76 0.1 80)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gBlue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.7 0.13 240)" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="oklch(0.7 0.13 240)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
              <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 12 }} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 12 }} width={48} />
              <Tooltip
                contentStyle={{ background: "oklch(0.19 0.05 264)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#fff" }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Area type="monotone" dataKey="subscriptions" name="الاشتراكات" stroke="oklch(0.76 0.1 80)" fill="url(#gGold)" strokeWidth={2} />
              <Area type="monotone" dataKey="consultations" name="الاستشارات" stroke="oklch(0.7 0.13 240)" fill="url(#gBlue)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <h2 className="mb-3 text-lg font-bold text-cream">أحدث الاستشارات</h2>
          <DataTable columns={consultCols} rows={filteredConsultations} empty="لا توجد استشارات في هذه الفترة" />
        </div>
        <div>
          <h2 className="mb-3 text-lg font-bold text-cream">الأعلى تقييماً</h2>
          <div className="space-y-3">
            {topRated.slice(0, 5).map((l) => (
              <div key={l.id} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-navy-card/50 p-3">
                <img src={l.image} alt={l.name} className="h-11 w-11 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-cream">{l.name}</div>
                  <div className="truncate text-xs text-cream/55">{l.specialty}</div>
                </div>
                <Badge tone="gold">★ {l.rating}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
