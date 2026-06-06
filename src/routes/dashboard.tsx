import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  CalendarDays,
  Receipt,
  Wallet,
  Sparkles,
  LogOut,
  Bell,
  Clock,
  MapPin,
  TrendingUp,
  Star,
  CheckCircle2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ArrowDownToLine,
  Send,
  Phone,
  Mail,
} from "lucide-react";
import { lawyers } from "@/data/lawyers";
import { useAuth, logout } from "@/lib/auth";
import {
  dashCases,
  dashClients,
  dashSessions,
  dashReminders,
  dashInvoices,
  walletTransactions,
  walletBalance,
} from "@/data/dashboard";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "لوحة تحكم المحامي | محام" },
      { name: "description", content: "إدارة القضايا والعملاء والجلسات والفواتير والمحفظة والذكاء الاصطناعي القانوني من لوحة تحكم المحامي." },
      { property: "og:title", content: "لوحة تحكم المحامي | محام" },
      { property: "og:description", content: "كل أدوات المحامي في مكان واحد." },
    ],
  }),
  component: DashboardPage,
});

const lawyer = lawyers[0];

type SectionId =
  | "overview"
  | "cases"
  | "clients"
  | "sessions"
  | "invoices"
  | "wallet"
  | "ai";

const nav: { id: SectionId; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "الرئيسية", icon: LayoutDashboard },
  { id: "cases", label: "القضايا", icon: Briefcase },
  { id: "clients", label: "العملاء", icon: Users },
  { id: "sessions", label: "الجلسات", icon: CalendarDays },
  { id: "invoices", label: "الفواتير", icon: Receipt },
  { id: "wallet", label: "المحفظة", icon: Wallet },
  { id: "ai", label: "الذكاء الاصطناعي القانوني", icon: Sparkles },
];

const card = "rounded-2xl border border-white/10 bg-navy-card/60 p-6";
const statusColor: Record<string, string> = {
  "نشطة": "bg-emerald-500/15 text-emerald-400",
  "قيد المراجعة": "bg-gold/15 text-gold",
  "مغلقة": "bg-white/10 text-cream/60",
  "مدفوعة": "bg-emerald-500/15 text-emerald-400",
  "معلقة": "bg-gold/15 text-gold",
  "متأخرة": "bg-red-500/15 text-red-400",
};

function DashboardPage() {
  const user = useAuth();
  const navigate = useNavigate();
  const [section, setSection] = useState<SectionId>("overview");

  useEffect(() => {
    if (user === null) navigate({ to: "/login" });
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  return (
    <div className="bg-navy">
      {/* Header */}
      <section className="bg-gradient-navy">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-10 md:flex-row md:items-center md:px-8">
          <div className="flex items-center gap-4">
            <img
              src={lawyer.image}
              alt={lawyer.name}
              width={64}
              height={64}
              className="h-16 w-16 rounded-2xl border border-gold/30 object-cover"
            />
            <div>
              <p className="text-sm text-cream/60">مرحباً بعودتك</p>
              <h1 className="text-2xl font-extrabold text-gradient-gold md:text-3xl">{lawyer.name}</h1>
              <p className="mt-1 flex items-center gap-2 text-sm text-cream/65">
                <MapPin className="h-4 w-4 text-gold" /> {lawyer.city} — {lawyer.title}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 rounded-md border border-white/15 px-4 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-white/5">
              <Bell className="h-4 w-4 text-gold" /> الإشعارات
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-md border border-gold/50 px-4 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-white/5"
            >
              <LogOut className="h-4 w-4 text-gold" /> تسجيل الخروج
            </button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl gap-8 px-4 py-10 md:px-8 lg:flex">
        {/* Sidebar */}
        <aside className="mb-8 lg:mb-0 lg:w-64 lg:shrink-0">
          <nav className="flex gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-navy-card/60 p-2 lg:flex-col lg:overflow-visible">
            {nav.map((n) => (
              <button
                key={n.id}
                onClick={() => setSection(n.id)}
                className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                  section === n.id
                    ? "bg-gradient-gold text-navy shadow-gold"
                    : "text-cream/75 hover:bg-white/5 hover:text-gold"
                }`}
              >
                <n.icon className="h-4 w-4" />
                <span className="whitespace-nowrap">{n.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1">
          {section === "overview" && <Overview onNavigate={setSection} />}
          {section === "cases" && <Cases />}
          {section === "clients" && <Clients />}
          {section === "sessions" && <Sessions />}
          {section === "invoices" && <Invoices />}
          {section === "wallet" && <WalletPanel />}
          {section === "ai" && <LegalAI />}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Overview ---------------- */
function Overview({ onNavigate }: { onNavigate: (s: SectionId) => void }) {
  const stats = [
    { label: "إجمالي الأرباح", value: "84,500 ج.م", icon: Wallet, hint: "هذا الشهر +12%" },
    { label: "قضايا نشطة", value: String(dashCases.filter((c) => c.status === "نشطة").length), icon: Briefcase, hint: "قيد المتابعة" },
    { label: "عملاء", value: String(dashClients.length), icon: Users, hint: "إجمالي" },
    { label: "متوسط التقييم", value: lawyer.rating.toFixed(1), icon: Star, hint: `${lawyer.reviews} تقييم` },
  ];
  return (
    <div className="space-y-8">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-white/10 bg-navy-card/60 p-6 transition-all hover:-translate-y-1 hover:border-gold/40">
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-gold/15 text-gold"><s.icon className="h-5 w-5" /></span>
              <TrendingUp className="h-4 w-4 text-gold/60" />
            </div>
            <p className="mt-4 text-2xl font-extrabold text-cream">{s.value}</p>
            <p className="mt-1 text-sm text-cream/65">{s.label}</p>
            <p className="mt-2 text-xs text-gold/80">{s.hint}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className={`${card} lg:col-span-2`}>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-bold text-cream"><CalendarDays className="h-5 w-5 text-gold" /> الجلسات القادمة</h2>
            <button onClick={() => onNavigate("sessions")} className="text-xs font-semibold text-gold hover:underline">عرض التقويم</button>
          </div>
          <div className="space-y-3">
            {dashSessions.slice(0, 4).map((s) => (
              <div key={s.id} className="flex flex-col gap-2 rounded-xl border border-white/10 bg-navy-deep/50 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-bold text-cream">{s.title}</p>
                  <p className="mt-0.5 text-sm text-cream/60">{s.client}</p>
                </div>
                <div className="flex items-center gap-4 text-sm text-cream/70">
                  <span className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4 text-gold" /> {s.day} يونيو</span>
                  <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-gold" /> {s.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={card}>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-cream"><Bell className="h-5 w-5 text-gold" /> التذكيرات</h2>
          <div className="space-y-3">
            {dashReminders.map((r) => (
              <div key={r.id} className="flex items-start gap-3 rounded-xl border border-white/10 bg-navy-deep/50 p-3">
                {r.urgent ? <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" /> : <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />}
                <div>
                  <p className="text-sm text-cream">{r.text}</p>
                  <p className="mt-1 text-xs text-cream/50">{r.due}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Cases ---------------- */
function Cases() {
  return (
    <div className={card}>
      <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-cream"><Briefcase className="h-5 w-5 text-gold" /> القضايا</h2>
      <div className="space-y-3">
        {dashCases.map((c) => (
          <div key={c.id} className="rounded-xl border border-white/10 bg-navy-deep/50 p-4 transition-colors hover:border-gold/30">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-bold text-cream">{c.title}</p>
                <p className="mt-0.5 text-sm text-cream/60">{c.client} — {c.type}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor[c.status]}`}>{c.status}</span>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gradient-gold" style={{ width: `${c.progress}%` }} />
              </div>
              <span className="text-xs text-cream/55">{c.progress}%</span>
              <span className="flex items-center gap-1 text-xs text-cream/55"><CalendarDays className="h-3.5 w-3.5 text-gold" /> {c.nextDate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Clients ---------------- */
function Clients() {
  return (
    <div className={card}>
      <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-cream"><Users className="h-5 w-5 text-gold" /> العملاء</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {dashClients.map((c) => (
          <div key={c.id} className="rounded-xl border border-white/10 bg-navy-deep/50 p-4 transition-colors hover:border-gold/30">
            <div className="flex items-center justify-between">
              <p className="font-bold text-cream">{c.name}</p>
              <span className="rounded-full bg-gold/15 px-2.5 py-1 text-xs font-medium text-gold">{c.cases} قضية</span>
            </div>
            <div className="mt-3 space-y-1.5 text-sm text-cream/60">
              <p className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-gold" /> {c.phone}</p>
              <p className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-gold" /> {c.email}</p>
              <p className="text-xs text-cream/45">عميل منذ {c.since}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Sessions (calendar + reminders) ---------------- */
function Sessions() {
  // June 2026: starts on Monday. Use Arabic week starting Saturday.
  const monthName = "يونيو 2026";
  const daysInMonth = 30;
  // June 1, 2026 is a Monday. Week order (RTL): سبت أحد إثنين ثلاثاء أربعاء خميس جمعة
  const weekDays = ["سبت", "أحد", "إثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة"];
  // Saturday=0 ... June 1 (Monday) => index 2
  const firstOffset = 2;
  const cells: (number | null)[] = [
    ...Array(firstOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  const sessionByDay = new Map<number, typeof dashSessions>();
  dashSessions.forEach((s) => {
    const arr = sessionByDay.get(s.day) ?? [];
    arr.push(s);
    sessionByDay.set(s.day, arr);
  });
  const today = 6;

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className={`${card} lg:col-span-2`}>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-bold text-cream"><CalendarDays className="h-5 w-5 text-gold" /> تقويم الجلسات</h2>
          <div className="flex items-center gap-2 text-cream/70">
            <button className="rounded-md border border-white/15 p-1.5 hover:bg-white/5"><ChevronRight className="h-4 w-4" /></button>
            <span className="text-sm font-semibold text-cream">{monthName}</span>
            <button className="rounded-md border border-white/15 p-1.5 hover:bg-white/5"><ChevronLeft className="h-4 w-4" /></button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1.5 text-center">
          {weekDays.map((d) => (
            <div key={d} className="pb-2 text-xs font-semibold text-cream/50">{d}</div>
          ))}
          {cells.map((day, i) => {
            if (day === null) return <div key={`e${i}`} />;
            const sessions = sessionByDay.get(day);
            const isToday = day === today;
            return (
              <div
                key={day}
                className={`min-h-16 rounded-lg border p-1.5 text-start ${
                  sessions ? "border-gold/40 bg-gold/5" : "border-white/10 bg-navy-deep/40"
                } ${isToday ? "ring-1 ring-gold" : ""}`}
              >
                <span className={`text-xs font-bold ${isToday ? "text-gold" : "text-cream/70"}`}>{day}</span>
                {sessions?.map((s) => (
                  <p key={s.id} className="mt-1 truncate rounded bg-gold/15 px-1 py-0.5 text-[10px] text-gold" title={`${s.title} - ${s.time}`}>
                    {s.time} {s.title}
                  </p>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-8">
        <div className={card}>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-cream"><Bell className="h-5 w-5 text-gold" /> التذكيرات</h2>
          <div className="space-y-3">
            {dashReminders.map((r) => (
              <div key={r.id} className="flex items-start gap-3 rounded-xl border border-white/10 bg-navy-deep/50 p-3">
                {r.urgent ? <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" /> : <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />}
                <div>
                  <p className="text-sm text-cream">{r.text}</p>
                  <p className="mt-1 text-xs text-cream/50">{r.due}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={card}>
          <h2 className="mb-4 text-lg font-bold text-cream">جلسات الشهر</h2>
          <div className="space-y-3">
            {dashSessions.map((s) => (
              <div key={s.id} className="rounded-xl border border-white/10 bg-navy-deep/50 p-3">
                <p className="text-sm font-bold text-cream">{s.title}</p>
                <p className="mt-1 text-xs text-cream/60">{s.client} — {s.location}</p>
                <p className="mt-1 flex items-center gap-2 text-xs text-gold"><CalendarDays className="h-3.5 w-3.5" /> {s.day} يونيو، {s.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Invoices ---------------- */
function Invoices() {
  const total = dashInvoices.reduce((s, i) => s + i.amount, 0);
  const paid = dashInvoices.filter((i) => i.status === "مدفوعة").reduce((s, i) => s + i.amount, 0);
  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-navy-card/60 p-6">
          <p className="text-sm text-cream/60">إجمالي الفواتير</p>
          <p className="mt-2 text-2xl font-extrabold text-cream">{total.toLocaleString()} ج.م</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-navy-card/60 p-6">
          <p className="text-sm text-cream/60">محصّلة</p>
          <p className="mt-2 text-2xl font-extrabold text-emerald-400">{paid.toLocaleString()} ج.م</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-navy-card/60 p-6">
          <p className="text-sm text-cream/60">مستحقة</p>
          <p className="mt-2 text-2xl font-extrabold text-gold">{(total - paid).toLocaleString()} ج.م</p>
        </div>
      </div>
      <div className={card}>
        <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-cream"><Receipt className="h-5 w-5 text-gold" /> الفواتير</h2>
        <div className="space-y-3">
          {dashInvoices.map((inv) => (
            <div key={inv.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-navy-deep/50 p-4">
              <div>
                <p className="font-bold text-cream">{inv.number}</p>
                <p className="mt-0.5 text-sm text-cream/60">{inv.client} — {inv.date}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-extrabold text-cream">{inv.amount.toLocaleString()} ج.م</span>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor[inv.status]}`}>{inv.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Wallet ---------------- */
const walletMethods = ["فودافون كاش", "أورنج كاش", "اتصالات كاش", "إنستا باي"];
function WalletPanel() {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState(walletMethods[0]);
  const [account, setAccount] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-gold/30 bg-gradient-navy p-7 lg:col-span-1">
          <p className="text-sm text-cream/65">الرصيد المتاح</p>
          <p className="mt-2 text-3xl font-extrabold text-gradient-gold">{walletBalance.toLocaleString()} ج.م</p>
          <button
            onClick={() => { setOpen(true); setDone(false); }}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-gold py-3 text-sm font-bold text-navy shadow-gold transition-transform hover:-translate-y-0.5"
          >
            <ArrowDownToLine className="h-4 w-4" /> طلب سحب
          </button>
        </div>
        <div className={`${card} lg:col-span-2`}>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-cream"><Wallet className="h-5 w-5 text-gold" /> آخر العمليات</h2>
          <div className="space-y-3">
            {walletTransactions.map((t) => (
              <div key={t.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-navy-deep/50 p-4">
                <div>
                  <p className="text-sm font-semibold text-cream">{t.label}</p>
                  <p className="mt-0.5 text-xs text-cream/50">{t.date}</p>
                </div>
                <span className={`text-sm font-bold ${t.amount > 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {t.amount > 0 ? "+" : "-"}{Math.abs(t.amount).toLocaleString()} ج.م
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-deep/80 p-4" onClick={() => setOpen(false)}>
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-navy-card p-6" onClick={(e) => e.stopPropagation()}>
            {done ? (
              <div className="py-6 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-gold" />
                <h3 className="mt-4 text-lg font-bold text-cream">تم استلام طلب السحب</h3>
                <p className="mt-2 text-sm text-cream/65">سيتم تحويل المبلغ إلى {method} خلال 24 ساعة.</p>
                <button onClick={() => setOpen(false)} className="mt-6 rounded-lg bg-gradient-gold px-6 py-2.5 text-sm font-bold text-navy">تم</button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <h3 className="text-lg font-bold text-cream">طلب سحب الأرباح</h3>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-cream/80">المبلغ (ج.م)</label>
                  <input
                    type="number" required min={1} max={walletBalance}
                    value={amount} onChange={(e) => setAmount(e.target.value)}
                    placeholder="0" className="w-full rounded-lg border border-white/15 bg-navy-deep px-3 py-2.5 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
                  />
                  <p className="mt-1 text-xs text-cream/45">الحد الأقصى {walletBalance.toLocaleString()} ج.م</p>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-cream/80">المحفظة الإلكترونية</label>
                  <div className="grid grid-cols-2 gap-2">
                    {walletMethods.map((m) => (
                      <button type="button" key={m} onClick={() => setMethod(m)}
                        className={`flex items-center justify-center gap-1.5 rounded-lg border px-2 py-2.5 text-xs font-semibold transition-colors ${
                          method === m ? "border-gold bg-gold/10 text-gold" : "border-white/15 text-cream/70"
                        }`}>
                        <Wallet className="h-3.5 w-3.5" /> {m}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-cream/80">رقم المحفظة</label>
                  <input
                    required value={account} onChange={(e) => setAccount(e.target.value)}
                    placeholder={method === "إنستا باي" ? "example@instapay" : "01XXXXXXXXX"}
                    className="w-full rounded-lg border border-white/15 bg-navy-deep px-3 py-2.5 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button type="button" onClick={() => setOpen(false)} className="flex-1 rounded-lg border border-white/15 py-2.5 text-sm font-semibold text-cream">إلغاء</button>
                  <button type="submit" className="flex-1 rounded-lg bg-gradient-gold py-2.5 text-sm font-bold text-navy shadow-gold">تأكيد السحب</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- Legal AI ---------------- */
interface ChatMsg { role: "user" | "ai"; text: string; }
const suggestions = [
  "صياغة مذكرة دفاع في قضية نفقة",
  "ما هي إجراءات رفع دعوى تعويض إصابة عمل؟",
  "لخّص لي بنود عقد الشراكة التجارية",
];
function LegalAI() {
  const [messages, setMessages] = useState<ChatMsg[]>([
    { role: "ai", text: "مرحباً، أنا المساعد القانوني الذكي. كيف يمكنني مساعدتك في قضاياك اليوم؟" },
  ]);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    const q = text.trim();
    if (!q) return;
    setMessages((m) => [
      ...m,
      { role: "user", text: q },
      { role: "ai", text: "هذا رد توضيحي من المساعد القانوني الذكي. سيتم ربط الذكاء الاصطناعي القانوني لتقديم إجابات دقيقة ومسوّدات قانونية مبنية على بيانات قضاياك." },
    ]);
    setInput("");
  };

  return (
    <div className={`${card} flex h-[600px] flex-col`}>
      <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-cream"><Sparkles className="h-5 w-5 text-gold" /> الذكاء الاصطناعي القانوني</h2>
      <div className="flex-1 space-y-4 overflow-y-auto pr-1">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-start" : "justify-end"}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              m.role === "user" ? "bg-gradient-gold text-navy" : "border border-white/10 bg-navy-deep/60 text-cream/85"
            }`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <button key={s} onClick={() => send(s)} className="rounded-full border border-gold/30 px-3 py-1.5 text-xs text-cream/75 transition-colors hover:bg-gold/10 hover:text-gold">
            {s}
          </button>
        ))}
      </div>
      <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="mt-3 flex gap-2">
        <input
          value={input} onChange={(e) => setInput(e.target.value)}
          placeholder="اكتب سؤالك القانوني..."
          className="flex-1 rounded-lg border border-white/15 bg-navy-deep px-4 py-3 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
        />
        <button type="submit" className="flex items-center gap-2 rounded-lg bg-gradient-gold px-5 py-3 text-sm font-bold text-navy shadow-gold transition-transform hover:-translate-y-0.5">
          <Send className="h-4 w-4" /> إرسال
        </button>
      </form>
    </div>
  );
}