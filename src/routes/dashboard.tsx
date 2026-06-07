import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  CalendarDays,
  Receipt,
  Wallet,
  Sparkles,
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
  UserCircle,
  MessageSquare,
  Plus,
  Search,
  X,
  Pencil,
  Save,
  Video,
  Building2,
  Paperclip,
  FileText,
  Gavel,
  Hash,
  ArrowRight,
  Eye,
  MessageCircle,
  History,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  Maximize2,
  MonitorUp,
  FolderOpen,
  Upload,
  ScrollText,
  BookOpen,
  Bookmark,
  Library as LibraryIcon,
  Minus,
  List,
} from "lucide-react";
import { lawyers } from "@/data/lawyers";
import { useAuth } from "@/lib/auth";
import { aiUrl } from "@/lib/ai-endpoint";
import { ChatMarkdown } from "@/components/ChatMarkdown";
import {
  dashCases,
  dashClients,
  dashSessions,
  dashReminders,
  dashInvoices,
  dashConsultations,
  aiConversations,
  walletTransactions,
  walletBalance,
  caseTypes,
  courts,
  sessionTypes,
  invoiceItems,
  caseDegrees,
  type DashCase,
  type DashClient,
  type DashSession,
  type DashInvoice,
  type DashConsultation,
  type DashReminder,
} from "@/data/dashboard";
import { generateInvoicePdf } from "@/lib/invoice-pdf";
import {
  libraryBooks,
  libraryCategories,
  searchLibrary,
  type LibraryBook,
} from "@/data/library";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "لوحة تحكم المحامي | محام" },
      { name: "description", content: "إدارة الملف الشخصي والقضايا والعملاء والجلسات والاستشارات والفواتير والمحفظة والذكاء الاصطناعي القانوني." },
      { property: "og:title", content: "لوحة تحكم المحامي | محام" },
      { property: "og:description", content: "كل أدوات المحامي في مكان واحد." },
    ],
  }),
  component: DashboardPage,
});

const lawyer = lawyers[0];

type SectionId =
  | "overview"
  | "profile"
  | "cases"
  | "clients"
  | "sessions"
  | "consultations"
  | "invoices"
  | "documents"
  | "library"
  | "wallet"
  | "ai";

const nav: { id: SectionId; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "الرئيسية", icon: LayoutDashboard },
  { id: "profile", label: "الملف الشخصي", icon: UserCircle },
  { id: "cases", label: "القضايا", icon: Briefcase },
  { id: "clients", label: "العملاء", icon: Users },
  { id: "sessions", label: "الجلسات والتذكيرات", icon: CalendarDays },
  { id: "consultations", label: "الاستشارات", icon: MessageSquare },
  { id: "invoices", label: "الفواتير", icon: Receipt },
  { id: "documents", label: "المستندات", icon: FileText },
  { id: "library", label: "المكتبة القانونية", icon: BookOpen },
  { id: "wallet", label: "المحفظة", icon: Wallet },
  { id: "ai", label: "الذكاء الاصطناعي القانوني", icon: Sparkles },
];

/* ---------- Cross-section navigation ---------- */
type NavRequest = { section: SectionId; id: string; nonce: number };
const DashNavContext = createContext<{
  go: (section: SectionId, id: string) => void;
  request: NavRequest | null;
}>({ go: () => {}, request: null });
function useDashNav() {
  return useContext(DashNavContext);
}

/* Open a document/attachment in a new tab as a styled preview */
function openDocument(name: string) {
  const w = window.open("", "_blank");
  if (!w) return;
  w.document.write(`<!doctype html><html dir="rtl" lang="ar"><head><meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>${name}</title>
  <style>
    body{margin:0;background:#0d1526;font-family:'Segoe UI',Tahoma,sans-serif;display:flex;justify-content:center;padding:32px}
    .page{background:#fff;color:#1a2238;width:100%;max-width:794px;min-height:1000px;border-radius:6px;box-shadow:0 20px 60px rgba(0,0,0,.5);padding:64px}
    .brand{color:#c9a24d;font-weight:800;letter-spacing:1px;font-size:14px;margin-bottom:40px}
    h1{font-size:22px;border-bottom:2px solid #c9a24d;padding-bottom:14px;margin:0 0 28px}
    p{line-height:2;color:#3a4358}
    .ph{height:14px;background:#eef0f4;border-radius:4px;margin:14px 0}
    .ph.s{width:60%}.ph.m{width:85%}
    .stamp{margin-top:60px;display:inline-block;border:2px dashed #c9a24d;color:#c9a24d;padding:10px 18px;border-radius:8px;font-weight:700}
  </style></head><body><div class="page">
    <div class="brand">منصة محامٍ — مستند قانوني</div>
    <h1>${name}</h1>
    <p>هذا عرض توضيحي للمستند داخل المنصة. في النسخة المتصلة بالخادم سيتم تحميل الملف الأصلي المرفوع وعرضه هنا بصيغته الكاملة.</p>
    <div class="ph m"></div><div class="ph"></div><div class="ph s"></div>
    <div class="ph m"></div><div class="ph"></div><div class="ph s"></div>
    <div class="stamp">معتمد — منصة محامٍ</div>
  </div></body></html>`);
  w.document.close();
}

/* Reusable list of clickable document attachments */
function DocFiles({ files }: { files: string[] }) {
  return (
    <ul className="space-y-2">
      {files.map((f, i) => (
        <li key={`${f}-${i}`}>
          <button type="button" onClick={() => openDocument(f)}
            className="flex w-full items-center gap-2 rounded-lg border border-white/10 bg-navy-deep/50 px-3 py-2 text-sm text-cream/75 transition-colors hover:border-gold hover:text-gold">
            <FileText className="h-4 w-4 shrink-0 text-gold" />
            <span className="truncate">{f}</span>
            <Eye className="mr-auto h-3.5 w-3.5 shrink-0 opacity-60" />
          </button>
        </li>
      ))}
    </ul>
  );
}

const card = "rounded-2xl border border-white/10 bg-navy-card/60 p-6";
const fieldCls =
  "w-full rounded-lg border border-white/15 bg-navy-deep px-3 py-2.5 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none";
const statusColor: Record<string, string> = {
  "نشطة": "bg-emerald-500/15 text-emerald-400",
  "قيد المراجعة": "bg-gold/15 text-gold",
  "مغلقة": "bg-white/10 text-cream/60",
  "مدفوعة": "bg-emerald-500/15 text-emerald-400",
  "معلقة": "bg-gold/15 text-gold",
  "متأخرة": "bg-red-500/15 text-red-400",
  "قادمة": "bg-gold/15 text-gold",
  "مكتملة": "bg-emerald-500/15 text-emerald-400",
  "ملغاة": "bg-red-500/15 text-red-400",
  "منتهية": "bg-emerald-500/15 text-emerald-400",
  "مؤجلة": "bg-orange-500/15 text-orange-400",
};

function DashboardPage() {
  const user = useAuth();
  const navigate = useNavigate();
  const [section, setSection] = useState<SectionId>("overview");
  const [request, setRequest] = useState<NavRequest | null>(null);
  const [notifOpen, setNotifOpen] = useState(false);
  const [readIds, setReadIds] = useState<string[]>([]);

  useEffect(() => {
    if (user === null) navigate({ to: "/login" });
  }, [user, navigate]);

  const go = (s: SectionId, id: string) => {
    setSection(s);
    setRequest({ section: s, id, nonce: Date.now() });
  };

  // Always start any new section/detail view from the top of the page.
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [section, request]);

  const notifications = useMemo(() => {
    const items: { id: string; icon: typeof Bell; text: string; meta: string; urgent: boolean; go: () => void }[] = [];
    dashReminders.forEach((r) =>
      items.push({ id: `rem-${r.id}`, icon: Bell, text: r.text, meta: `تذكير • ${r.due}`, urgent: r.urgent, go: () => setSection("sessions") }),
    );
    dashSessions.filter((s) => s.status === "قادمة").forEach((s) =>
      items.push({ id: `ses-${s.id}`, icon: CalendarDays, text: `${s.title} — ${s.client}`, meta: `جلسة • ${s.day} يونيو ${s.time}`, urgent: false, go: () => go("sessions", s.id) }),
    );
    dashConsultations.filter((c) => c.status === "قادمة").forEach((c) =>
      items.push({ id: `con-${c.id}`, icon: MessageSquare, text: `${c.subject} — ${c.client}`, meta: `استشارة • ${c.date} ${c.time}`, urgent: false, go: () => go("consultations", c.id) }),
    );
    dashInvoices.filter((i) => i.status === "متأخرة").forEach((i) =>
      items.push({ id: `inv-${i.id}`, icon: Receipt, text: `فاتورة متأخرة ${i.number} — ${i.client}`, meta: `فاتورة • ${i.amount.toLocaleString()} ج.م`, urgent: true, go: () => go("invoices", i.id) }),
    );
    return items;
  }, []);

  const unreadCount = notifications.filter((n) => !readIds.includes(n.id)).length;

  return (
   <DashNavContext.Provider value={{ go, request }}>
    <div className="bg-navy">
      <section className="bg-gradient-navy">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-4 py-8 md:flex-row md:items-center md:gap-6 md:px-8 md:py-10">
          <div className="flex items-center gap-3 sm:gap-4">
            <img src={lawyer.image} alt={lawyer.name} width={64} height={64} className="h-14 w-14 rounded-2xl border border-gold/30 object-cover sm:h-16 sm:w-16" />
            <div>
              <p className="text-sm text-cream/60">مرحباً بعودتك</p>
              <h1 className="text-xl font-extrabold text-gradient-gold sm:text-2xl md:text-3xl">{lawyer.name}</h1>
              <p className="mt-1 flex items-center gap-2 text-sm text-cream/65">
                <MapPin className="h-4 w-4 text-gold" /> {lawyer.city} — {lawyer.title}
              </p>
            </div>
          </div>
          <div className="flex w-full items-center gap-2 md:w-auto">
            <div className="relative w-full md:w-auto">
              <button
                onClick={() => setNotifOpen((v) => !v)}
                className="flex w-full items-center justify-center gap-2 rounded-md border border-white/15 px-4 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-white/5 md:w-auto"
              >
                <span className="relative">
                  <Bell className="h-4 w-4 text-gold" />
                  {unreadCount > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                      {unreadCount}
                    </span>
                  )}
                </span>
                الإشعارات
              </button>
              {notifOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                  <div className="absolute left-0 top-full z-50 mt-2 w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-white/10 bg-navy-card shadow-2xl">
                    <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                      <span className="flex items-center gap-2 text-sm font-bold text-cream">
                        <Bell className="h-4 w-4 text-gold" /> الإشعارات
                      </span>
                      {unreadCount > 0 && (
                        <button
                          onClick={() => setReadIds(notifications.map((n) => n.id))}
                          className="text-xs font-semibold text-gold hover:underline"
                        >
                          تعليم الكل كمقروء
                        </button>
                      )}
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 && (
                        <p className="px-4 py-8 text-center text-sm text-cream/60">لا توجد إشعارات</p>
                      )}
                      {notifications.map((n) => {
                        const read = readIds.includes(n.id);
                        return (
                          <button
                            key={n.id}
                            onClick={() => {
                              setReadIds((p) => (p.includes(n.id) ? p : [...p, n.id]));
                              setNotifOpen(false);
                              n.go();
                            }}
                            className={`flex w-full items-start gap-3 border-b border-white/5 px-4 py-3 text-right transition-colors hover:bg-white/5 ${read ? "opacity-55" : ""}`}
                          >
                            <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${n.urgent ? "bg-red-500/15 text-red-400" : "bg-gold/15 text-gold"}`}>
                              <n.icon className="h-4 w-4" />
                            </span>
                            <span className="flex-1">
                              <span className="block text-sm font-semibold text-cream">{n.text}</span>
                              <span className="mt-0.5 block text-xs text-cream/55">{n.meta}</span>
                            </span>
                            {!read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl gap-8 px-4 py-6 md:px-8 md:py-10 lg:flex">
        <aside className="sticky top-0 z-30 -mx-4 mb-6 bg-navy/95 px-4 py-2 backdrop-blur supports-[backdrop-filter]:bg-navy/80 md:-mx-8 md:px-8 lg:static lg:mx-0 lg:mb-0 lg:w-64 lg:shrink-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
          <nav className="no-scrollbar flex snap-x snap-mandatory gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-navy-card/60 p-2 lg:flex-col lg:overflow-visible">
            {nav.map((n) => (
              <button
                key={n.id}
                onClick={() => setSection(n.id)}
                className={`flex shrink-0 snap-start items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors lg:py-3 ${
                  section === n.id ? "bg-gradient-gold text-navy shadow-gold" : "text-cream/75 hover:bg-white/5 hover:text-gold"
                }`}
              >
                <n.icon className="h-4 w-4 shrink-0" />
                <span className="whitespace-nowrap">{n.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <div className="flex-1">
          {section === "overview" && <Overview onNavigate={setSection} />}
          {section === "profile" && <Profile />}
          {section === "cases" && <Cases />}
          {section === "clients" && <Clients />}
          {section === "sessions" && <Sessions />}
          {section === "consultations" && <Consultations />}
          {section === "invoices" && <Invoices />}
          {section === "documents" && <Documents />}
          {section === "library" && <Library />}
          {section === "wallet" && <WalletPanel />}
          {section === "ai" && <LegalAI />}
        </div>
      </div>
    </div>
   </DashNavContext.Provider>
  );
}

/* ---------- Shared UI ---------- */
function Toolbar({
  search, setSearch, placeholder, filter, setFilter, options, filter2, setFilter2, options2, onAdd, addLabel,
}: {
  search: string; setSearch: (v: string) => void; placeholder: string;
  filter?: string; setFilter?: (v: string) => void; options?: { value: string; label: string }[];
  filter2?: string; setFilter2?: (v: string) => void; options2?: { value: string; label: string }[];
  onAdd?: () => void; addLabel?: string;
}) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={placeholder} className={`${fieldCls} pr-9`} />
      </div>
      {options && setFilter && (
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className={`${fieldCls} sm:w-44`}>
          {options.map((o) => (
            <option key={o.value} value={o.value} className="bg-navy-deep">{o.label}</option>
          ))}
        </select>
      )}
      {options2 && setFilter2 && (
        <select value={filter2} onChange={(e) => setFilter2(e.target.value)} className={`${fieldCls} sm:w-44`}>
          {options2.map((o) => (
            <option key={o.value} value={o.value} className="bg-navy-deep">{o.label}</option>
          ))}
        </select>
      )}
      {onAdd && (
        <button onClick={onAdd} className="flex items-center justify-center gap-2 rounded-lg bg-gradient-gold px-4 py-2.5 text-sm font-bold text-navy shadow-gold transition-transform hover:-translate-y-0.5">
          <Plus className="h-4 w-4" /> {addLabel}
        </button>
      )}
    </div>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-deep/80 p-4" onClick={onClose}>
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-navy-card p-6" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-cream">{title}</h3>
          <button onClick={onClose} className="text-cream/60 hover:text-gold"><X className="h-5 w-5" /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

/* Full-page form wrapper (replaces modals) */
function FormPage({
  title, subtitle, icon: Icon, onBack, onSubmit, submitLabel, children,
}: {
  title: string; subtitle?: string; icon: typeof Briefcase;
  onBack: () => void; onSubmit: (e: React.FormEvent) => void; submitLabel: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-cream transition-colors hover:bg-white/5 hover:text-gold">
          <ArrowRight className="h-5 w-5" />
        </button>
        <div>
          <h2 className="flex items-center gap-2 text-lg font-bold text-cream"><Icon className="h-5 w-5 text-gold" /> {title}</h2>
          {subtitle && <p className="mt-0.5 text-sm text-cream/55">{subtitle}</p>}
        </div>
      </div>
      <form onSubmit={onSubmit} className={card}>
        <div className="space-y-6">{children}</div>
        <div className="mt-8 flex gap-3">
          <button type="button" onClick={onBack} className="flex-1 rounded-lg border border-white/15 py-3 text-sm font-semibold text-cream transition-colors hover:bg-white/5 sm:flex-none sm:px-8">إلغاء</button>
          <button type="submit" className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-gold py-3 text-sm font-bold text-navy shadow-gold transition-transform hover:-translate-y-0.5 sm:flex-none sm:px-10">
            <Save className="h-4 w-4" /> {submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}

/* Section title inside a form page */
function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-4 border-b border-white/10 pb-2 text-sm font-bold text-gold">{title}</h3>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </div>
  );
}

/* ---------- Detail view helpers ---------- */
function DetailPage({
  title, subtitle, icon: Icon, status, onBack, actions, children,
}: {
  title: string; subtitle?: string; icon: typeof Briefcase; status?: string;
  onBack: () => void; actions?: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-cream transition-colors hover:bg-white/5 hover:text-gold">
            <ArrowRight className="h-5 w-5" />
          </button>
          <div>
            <h2 className="flex items-center gap-2 text-lg font-bold text-cream"><Icon className="h-5 w-5 text-gold" /> {title}</h2>
            {subtitle && <p className="mt-0.5 text-sm text-cream/55">{subtitle}</p>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {status && <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor[status] ?? "bg-white/10 text-cream/60"}`}>{status}</span>}
          {actions}
        </div>
      </div>
      <div className="space-y-6">{children}</div>
    </div>
  );
}

/* Card block with a section title and a responsive info grid */
function DetailGrid({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className={card}>
      <h3 className="mb-4 border-b border-white/10 pb-2 text-sm font-bold text-gold">{title}</h3>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </div>
  );
}

/* Linked case card with a "view case" action that navigates to the case detail */
function LinkedCaseGrid({ linkedCase }: { linkedCase: DashCase }) {
  const { go } = useDashNav();
  return (
    <div className={card}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2">
        <h3 className="flex items-center gap-2 text-sm font-bold text-gold"><Briefcase className="h-4 w-4" /> القضية المرتبطة</h3>
        <button onClick={() => go("cases", linkedCase.id)}
          className="flex items-center gap-1.5 rounded-md bg-gold/15 px-3 py-1.5 text-xs font-semibold text-gold transition-colors hover:bg-gold/25">
          <Eye className="h-3.5 w-3.5" /> عرض القضية
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <DetailItem label="عنوان القضية" value={linkedCase.title} />
        <DetailItem label="رقم القضية" value={linkedCase.caseNumber} />
        <DetailItem label="نوع القضية" value={linkedCase.type} />
        <DetailItem label="المحكمة" value={linkedCase.court} />
        <DetailItem label="حالة القضية" value={linkedCase.status} />
      </div>
    </div>
  );
}

/* A single label/value cell that renders only when a value exists */
function DetailItem({ label, value, full }: { label: string; value?: string | number | null; full?: boolean }) {
  if (value === undefined || value === null || value === "" || value === "—") return null;
  return (
    <div className={`rounded-xl border border-white/10 bg-navy-deep/50 p-4 ${full ? "sm:col-span-2" : ""}`}>
      <p className="text-xs text-cream/50">{label}</p>
      <p className="mt-1 text-sm leading-relaxed text-cream">{value}</p>
    </div>
  );
}

/* Linked case card with a "view case" action that navigates to the case detail */
/* A list of related records (sessions / invoices / consultations) shown in a detail page */
function RelatedSection({
  title, icon: Icon, items,
}: {
  title: string; icon: typeof Briefcase;
  items: { id: string; primary: string; secondary?: string; meta?: string; status?: string; amount?: string; onClick?: () => void }[];
}) {
  if (items.length === 0) return null;
  return (
    <div className={card}>
      <h3 className="mb-4 flex items-center gap-2 border-b border-white/10 pb-2 text-sm font-bold text-gold"><Icon className="h-4 w-4" /> {title} <span className="text-cream/40">({items.length})</span></h3>
      <div className="space-y-3">
        {items.map((it) => (
          <div key={it.id} onClick={it.onClick} role={it.onClick ? "button" : undefined}
            className={`flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-navy-deep/50 p-3 ${it.onClick ? "cursor-pointer transition-colors hover:border-gold/40" : ""}`}>
            <div className="min-w-0">
              <p className="text-sm font-bold text-cream">{it.primary}</p>
              {it.secondary && <p className="mt-0.5 text-xs text-cream/60">{it.secondary}</p>}
              {it.meta && <p className="mt-0.5 text-xs text-cream/45">{it.meta}</p>}
            </div>
            <div className="flex items-center gap-2">
              {it.amount && <span className="text-sm font-extrabold text-cream">{it.amount}</span>}
              {it.status && <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor[it.status] ?? "bg-white/10 text-cream/60"}`}>{it.status}</span>}
              {it.onClick && <Eye className="h-4 w-4 shrink-0 text-cream/50" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Inline status selector shown in detail header */
function StatusChanger({ value, options, onChange }: { value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <label className="flex items-center gap-2 text-xs text-cream/60">
      الحالة
      <select value={value} onChange={(e) => onChange(e.target.value)} className="rounded-lg border border-white/15 bg-navy-deep px-3 py-2 text-sm font-semibold text-cream focus:border-gold focus:outline-none">
        {options.map((o) => <option key={o} value={o} className="bg-navy-deep">{o}</option>)}
      </select>
    </label>
  );
}

/* Small eye trigger placed inside list cards */
function ViewButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} aria-label="عرض التفاصيل" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/15 text-cream/70 transition-colors hover:border-gold hover:text-gold">
      <Eye className="h-4 w-4" />
    </button>
  );
}

/* Shared comment + timeline data types */
interface DashComment { id: string; text: string; date: string; }
interface DashTLEvent { id: string; title: string; date: string; desc?: string; }

function CommentsPanel({ comments, onAdd }: { comments: DashComment[]; onAdd: (text: string) => void }) {
  const [text, setText] = useState("");
  return (
    <div className={card}>
      <h3 className="mb-4 flex items-center gap-2 border-b border-white/10 pb-2 text-sm font-bold text-gold"><MessageCircle className="h-4 w-4" /> التعليقات</h3>
      <div className="mb-4 space-y-3">
        {comments.map((c) => (
          <div key={c.id} className="rounded-xl border border-white/10 bg-navy-deep/50 p-3">
            <p className="text-sm leading-relaxed text-cream">{c.text}</p>
            <p className="mt-1 text-xs text-cream/45">{c.date}</p>
          </div>
        ))}
        {comments.length === 0 && <p className="text-sm text-cream/50">لا توجد تعليقات بعد.</p>}
      </div>
      <form onSubmit={(e) => { e.preventDefault(); if (text.trim()) { onAdd(text.trim()); setText(""); } }} className="flex gap-2">
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="أضف تعليقاً..." className={`${fieldCls} flex-1`} />
        <button type="submit" className="flex items-center gap-2 rounded-lg bg-gradient-gold px-4 py-2.5 text-sm font-bold text-navy shadow-gold"><Send className="h-4 w-4" /> إضافة</button>
      </form>
    </div>
  );
}

function TimelinePanel({ events }: { events: DashTLEvent[] }) {
  return (
    <div className={card}>
      <h3 className="mb-4 flex items-center gap-2 border-b border-white/10 pb-2 text-sm font-bold text-gold"><History className="h-4 w-4" /> التايم لاين</h3>
      {events.length === 0 ? (
        <p className="text-sm text-cream/50">لا توجد أحداث بعد.</p>
      ) : (
        <ol className="space-y-5 border-r border-white/10 pr-5">
          {events.map((ev) => (
            <li key={ev.id} className="relative">
              <span className="absolute -right-[1.42rem] top-1.5 h-3 w-3 rounded-full bg-gold ring-4 ring-navy-card" />
              <p className="text-sm font-semibold text-cream">{ev.title}</p>
              <p className="mt-0.5 text-xs text-cream/45">{ev.date}</p>
              {ev.desc && <p className="mt-1 text-sm text-cream/70">{ev.desc}</p>}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

/* Reusable select with a placeholder option */
function SelectField({
  label, value, onChange, options, placeholder, required,
}: {
  label: string; value: string; onChange: (v: string) => void;
  options: string[]; placeholder: string; required?: boolean;
}) {
  return (
    <Field label={label}>
      <select className={fieldCls} value={value} onChange={(e) => onChange(e.target.value)} required={required}>
        <option value="" disabled className="bg-navy-deep">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-navy-deep">{o}</option>
        ))}
      </select>
    </Field>
  );
}

/* Reusable multi-file upload */
function FileField({ label, files, setFiles }: { label: string; files: string[]; setFiles: (f: string[]) => void }) {
  return (
    <Field label={label}>
      <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-white/25 bg-navy-deep px-3 py-4 text-sm text-cream/60 transition-colors hover:border-gold hover:text-gold">
        <Paperclip className="h-4 w-4" /> اسحب الملفات أو اضغط للرفع
        <input
          type="file"
          multiple
          className="hidden"
          onChange={(e) => setFiles([...files, ...Array.from(e.target.files ?? []).map((f) => f.name)])}
        />
      </label>
      {files.length > 0 && (
        <ul className="mt-2 space-y-1.5">
          {files.map((f, i) => (
            <li key={`${f}-${i}`} className="flex items-center justify-between rounded-lg border border-white/10 bg-navy-deep/50 px-3 py-2 text-xs text-cream/75">
              <span className="flex items-center gap-2 truncate"><FileText className="h-3.5 w-3.5 shrink-0 text-gold" /> {f}</span>
              <button type="button" onClick={() => setFiles(files.filter((_, idx) => idx !== i))} className="text-cream/50 hover:text-red-400"><X className="h-3.5 w-3.5" /></button>
            </li>
          ))}
        </ul>
      )}
    </Field>
  );
}

/* ---------- In-platform video call ---------- */
function VideoCall({ consultation, onClose }: { consultation: DashConsultation; onClose: () => void }) {
  const [seconds, setSeconds] = useState(0);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [sharing, setSharing] = useState(false);
  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const clientInitial = consultation.client.trim().charAt(0);

  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-gradient-navy p-3 sm:p-5">
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between gap-3 rounded-2xl border border-white/10 bg-navy-card/70 px-4 py-3 backdrop-blur">
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-sm font-bold text-cream">
            <span className="flex h-2 w-2 animate-pulse rounded-full bg-red-500" /> مكالمة فيديو مباشرة
          </p>
          <p className="mt-0.5 truncate text-xs text-cream/55">{consultation.subject} — {consultation.client}</p>
        </div>
        <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 font-mono text-sm font-bold text-gold">{mm}:{ss}</span>
      </div>

      {/* Video tiles */}
      <div className="my-3 grid min-h-0 flex-1 grid-cols-1 gap-3 sm:my-5 sm:grid-cols-2">
        {/* Client tile (large) */}
        <div className="relative flex min-h-[160px] items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-navy-deep">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(201,162,77,0.12),transparent_60%)]" />
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-gold text-3xl font-extrabold text-navy shadow-gold sm:h-28 sm:w-28">{clientInitial}</div>
          <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-navy-deep/80 px-3 py-1 text-xs font-semibold text-cream backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> {consultation.client} (العميل)
          </span>
        </div>
        {/* Lawyer tile */}
        <div className="relative flex min-h-[160px] items-center justify-center overflow-hidden rounded-3xl border border-gold/30 bg-navy-deep">
          {camOn ? (
            <img src={lawyer.image} alt={lawyer.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/10 text-cream/70"><VideoOff className="h-8 w-8" /></div>
          )}
          <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-navy-deep/80 px-3 py-1 text-xs font-semibold text-cream backdrop-blur">
            {micOn ? <Mic className="h-3 w-3 text-emerald-400" /> : <MicOff className="h-3 w-3 text-red-400" />} {lawyer.name} (أنت)
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex shrink-0 items-center justify-center gap-3 rounded-2xl border border-white/10 bg-navy-card/70 px-4 py-4 backdrop-blur">
        <button onClick={() => setMicOn((v) => !v)} aria-label="الميكروفون"
          className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${micOn ? "bg-white/10 text-cream hover:bg-white/15" : "bg-red-500/20 text-red-400"}`}>
          {micOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
        </button>
        <button onClick={() => setCamOn((v) => !v)} aria-label="الكاميرا"
          className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors ${camOn ? "bg-white/10 text-cream hover:bg-white/15" : "bg-red-500/20 text-red-400"}`}>
          {camOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
        </button>
        <button onClick={() => setSharing((v) => !v)} aria-label="مشاركة الشاشة"
          className={`hidden h-12 w-12 items-center justify-center rounded-full transition-colors sm:flex ${sharing ? "bg-gold/20 text-gold" : "bg-white/10 text-cream hover:bg-white/15"}`}>
          <MonitorUp className="h-5 w-5" />
        </button>
        <button onClick={onClose} aria-label="إنهاء المكالمة"
          className="flex h-12 items-center justify-center gap-2 rounded-full bg-red-500 px-6 text-sm font-bold text-white transition-colors hover:bg-red-600">
          <PhoneOff className="h-5 w-5" /> إنهاء
        </button>
      </div>
    </div>
  );
}

/* ---------- Overview ---------- */
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
                <div><p className="font-bold text-cream">{s.title}</p><p className="mt-0.5 text-sm text-cream/60">{s.client}</p></div>
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
                <div><p className="text-sm text-cream">{r.text}</p><p className="mt-1 text-xs text-cream/50">{r.due}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Profile ---------- */
const PROFILE_KEY = "muhamik_profile";
interface ProfileData {
  name: string; title: string; specialty: string; city: string;
  price: number; experience: number; phone: string; email: string; bio: string;
}
function Profile() {
  const initial: ProfileData = {
    name: lawyer.name, title: lawyer.title, specialty: lawyer.specialty, city: lawyer.city,
    price: lawyer.price, experience: lawyer.experience, phone: lawyer.phone, email: lawyer.email, bio: lawyer.bio,
  };
  const [data, setData] = useState<ProfileData>(initial);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(PROFILE_KEY);
      if (raw) setData({ ...initial, ...JSON.parse(raw) });
    } catch { /* ignore */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    try { localStorage.setItem(PROFILE_KEY, JSON.stringify(data)); } catch { /* ignore */ }
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const set = (k: keyof ProfileData, v: string | number) => setData((d) => ({ ...d, [k]: v }));

  return (
    <div className="space-y-6">
      <div className={card}>
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="flex items-center gap-2 text-lg font-bold text-cream"><UserCircle className="h-5 w-5 text-gold" /> الملف الشخصي العام</h2>
          <div className="flex items-center gap-2">
            <Link to="/lawyers/$lawyerId" params={{ lawyerId: lawyer.id }} className="flex flex-1 items-center justify-center rounded-md border border-white/15 px-3 py-2 text-xs font-semibold text-cream hover:bg-white/5 sm:flex-none">عرض على الموقع</Link>
            {!editing && (
              <button onClick={() => setEditing(true)} className="flex flex-1 items-center justify-center gap-2 rounded-md bg-gradient-gold px-4 py-2 text-xs font-bold text-navy shadow-gold sm:flex-none"><Pencil className="h-3.5 w-3.5" /> تعديل</button>
            )}
          </div>
        </div>
        {saved && <p className="mb-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">تم حفظ بيانات الملف بنجاح وستظهر على الموقع.</p>}

        <div className="mb-6 flex items-center gap-4">
          <img src={lawyer.image} alt={data.name} width={72} height={72} className="h-16 w-16 shrink-0 rounded-2xl border border-gold/30 object-cover sm:h-20 sm:w-20" />
          <div>
            <p className="text-lg font-bold text-cream">{data.name}</p>
            <p className="text-sm text-cream/60">{data.title}</p>
          </div>
        </div>

        {editing ? (
          <form onSubmit={save} className="grid gap-4 sm:grid-cols-2">
            <Field label="الاسم"><input className={fieldCls} value={data.name} onChange={(e) => set("name", e.target.value)} required /></Field>
            <Field label="المسمى"><input className={fieldCls} value={data.title} onChange={(e) => set("title", e.target.value)} required /></Field>
            <Field label="التخصص"><input className={fieldCls} value={data.specialty} onChange={(e) => set("specialty", e.target.value)} /></Field>
            <Field label="المدينة"><input className={fieldCls} value={data.city} onChange={(e) => set("city", e.target.value)} /></Field>
            <Field label="سعر الاستشارة (ج.م)"><input type="number" className={fieldCls} value={data.price} onChange={(e) => set("price", Number(e.target.value))} /></Field>
            <Field label="سنوات الخبرة"><input type="number" className={fieldCls} value={data.experience} onChange={(e) => set("experience", Number(e.target.value))} /></Field>
            <Field label="الهاتف"><input className={fieldCls} value={data.phone} onChange={(e) => set("phone", e.target.value)} /></Field>
            <Field label="البريد الإلكتروني"><input type="email" className={fieldCls} value={data.email} onChange={(e) => set("email", e.target.value)} /></Field>
            <div className="sm:col-span-2"><Field label="نبذة تعريفية"><textarea rows={4} className={fieldCls} value={data.bio} onChange={(e) => set("bio", e.target.value)} /></Field></div>
            <div className="flex gap-2 sm:col-span-2">
              <button type="button" onClick={() => { setData(initial); setEditing(false); }} className="flex-1 rounded-lg border border-white/15 py-2.5 text-sm font-semibold text-cream">إلغاء</button>
              <button type="submit" className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-gold py-2.5 text-sm font-bold text-navy shadow-gold"><Save className="h-4 w-4" /> حفظ</button>
            </div>
          </form>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            <Info label="التخصص" value={data.specialty} />
            <Info label="المدينة" value={data.city} />
            <Info label="سعر الاستشارة" value={`${data.price} ج.م`} />
            <Info label="سنوات الخبرة" value={`${data.experience} سنة`} />
            <Info label="الهاتف" value={data.phone} />
            <Info label="البريد الإلكتروني" value={data.email} />
            <div className="sm:col-span-2"><Info label="نبذة تعريفية" value={data.bio} /></div>
          </div>
        )}
      </div>

      <SubscriptionCard />
    </div>
  );
}

/* ---------- Current subscription ---------- */
function SubscriptionCard() {
  const plan = {
    name: "الباقة الاحترافية",
    price: "499 ج.م / شهرياً",
    renew: "15 يوليو 2026",
    status: "نشط",
    features: [
      "ظهور مميز في نتائج البحث",
      "عدد غير محدود من القضايا والعملاء",
      "وصول كامل للمساعد القانوني الذكي",
      "تقارير ومحفظة مالية متقدمة",
    ],
    usage: { used: 320, total: 500, label: "رسائل الذكاء الاصطناعي هذا الشهر" },
  };
  const pct = Math.round((plan.usage.used / plan.usage.total) * 100);

  return (
    <div className={card}>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-bold text-cream"><Wallet className="h-5 w-5 text-gold" /> الاشتراك الحالي</h2>
        <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-400">{plan.status}</span>
      </div>

      <div className="rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/10 to-transparent p-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xl font-bold text-cream">{plan.name}</p>
            <p className="mt-1 text-sm text-gold">{plan.price}</p>
          </div>
          <div className="text-end">
            <p className="text-xs text-cream/50">يتجدد في</p>
            <p className="text-sm font-semibold text-cream">{plan.renew}</p>
          </div>
        </div>

        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {plan.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-cream/80">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" /> {f}
            </li>
          ))}
        </ul>

        <div className="mt-5">
          <div className="mb-1.5 flex items-center justify-between text-xs text-cream/60">
            <span>{plan.usage.label}</span>
            <span>{plan.usage.used} / {plan.usage.total}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-navy-deep">
            <div className="h-full rounded-full bg-gradient-gold" style={{ width: `${pct}%` }} />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <button className="flex-1 rounded-lg bg-gradient-gold py-2.5 text-sm font-bold text-navy shadow-gold">ترقية الباقة</button>
        </div>
      </div>
    </div>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-1.5 block text-sm font-medium text-cream/80">{label}</span>{children}</label>;
}
function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-navy-deep/50 p-4">
      <p className="text-xs text-cream/50">{label}</p>
      <p className="mt-1 text-sm leading-relaxed text-cream">{value}</p>
    </div>
  );
}

/* ---------- Cases ---------- */
function Cases() {
  const [items, setItems] = useState<DashCase[]>(dashCases);
  const { go, request } = useDashNav();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [adding, setAdding] = useState(false);
  const [viewingId, setViewingId] = useState<string | null>(null);
  const [comments, setComments] = useState<Record<string, DashComment[]>>({});
  const [timelines, setTimelines] = useState<Record<string, DashTLEvent[]>>({});
  const emptyForm = { title: "", caseNumber: "", client: "", type: "", court: "", degree: "", status: "نشطة", priority: "عادية", nextDate: "", startDate: "", progress: "0", opponent: "", opponentLawyer: "", claimAmount: "", description: "" };
  const [form, setForm] = useState(emptyForm);
  const [files, setFiles] = useState<string[]>([]);
  const clientNames = dashClients.map((c) => c.name);
  const viewing = items.find((c) => c.id === viewingId) ?? null;
  useEffect(() => { if (request?.section === "cases") setViewingId(request.id); }, [request]);

  const baseTimeline = (c: DashCase): DashTLEvent[] => [
    { id: "b1", title: "تم إنشاء القضية", date: c.startDate ?? "—" },
    ...(c.nextDate && c.nextDate !== "—" ? [{ id: "b2", title: "الجلسة القادمة", date: c.nextDate }] : []),
    { id: "b3", title: `الحالة الحالية: ${c.status}`, date: "الآن" },
  ];
  const getTimeline = (c: DashCase) => timelines[c.id] ?? baseTimeline(c);
  const addComment = (id: string, text: string) =>
    setComments((p) => ({ ...p, [id]: [...(p[id] ?? []), { id: `cm${Date.now()}`, text, date: "الآن" }] }));
  const changeStatus = (c: DashCase, status: string) => {
    setItems((p) => p.map((it) => (it.id === c.id ? { ...it, status: status as DashCase["status"] } : it)));
    setTimelines((p) => ({ ...p, [c.id]: [...(p[c.id] ?? baseTimeline(c)), { id: `tl${Date.now()}`, title: `تم تغيير الحالة إلى ${status}`, date: "الآن" }] }));
  };

  const filtered = items.filter((c) =>
    (filter === "all" || c.status === filter) &&
    (typeFilter === "all" || c.type === typeFilter) &&
    (c.title.includes(search) || c.client.includes(search) || c.type.includes(search) || (c.caseNumber ?? "").includes(search) || (c.court ?? "").includes(search))
  );
  const add = (e: React.FormEvent) => {
    e.preventDefault();
    setItems((p) => [{
      id: `c${Date.now()}`,
      title: form.title,
      client: form.client,
      type: form.type,
      status: form.status as DashCase["status"],
      nextDate: form.nextDate || "—",
      progress: Number(form.progress) || 0,
      caseNumber: form.caseNumber || undefined,
      court: form.court || undefined,
      priority: form.priority as DashCase["priority"],
      description: form.description || undefined,
      files: files.length ? files : undefined,
      degree: form.degree || undefined,
      startDate: form.startDate || undefined,
      opponent: form.opponent || undefined,
      opponentLawyer: form.opponentLawyer || undefined,
      claimAmount: form.claimAmount ? Number(form.claimAmount) : undefined,
    }, ...p]);
    setForm(emptyForm);
    setFiles([]);
    setAdding(false);
  };

  if (adding) {
    return (
      <FormPage title="إضافة قضية جديدة" subtitle="أدخل كل بيانات القضية والمستندات المرتبطة بها" icon={Briefcase}
        onBack={() => setAdding(false)} onSubmit={add} submitLabel="حفظ القضية">
        <FormSection title="بيانات أساسية">
          <div className="sm:col-span-2"><Field label="عنوان القضية"><input className={fieldCls} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></Field></div>
          <Field label="رقم القضية"><input className={fieldCls} placeholder="123/2026" value={form.caseNumber} onChange={(e) => setForm({ ...form, caseNumber: e.target.value })} /></Field>
          <SelectField label="العميل" value={form.client} onChange={(v) => setForm({ ...form, client: v })} options={clientNames} placeholder="اختر العميل" required />
          <SelectField label="نوع القضية" value={form.type} onChange={(v) => setForm({ ...form, type: v })} options={caseTypes} placeholder="اختر النوع" required />
          <SelectField label="درجة التقاضي" value={form.degree} onChange={(v) => setForm({ ...form, degree: v })} options={caseDegrees} placeholder="اختر الدرجة" />
        </FormSection>
        <FormSection title="المحكمة والجدول">
          <SelectField label="المحكمة" value={form.court} onChange={(v) => setForm({ ...form, court: v })} options={courts} placeholder="اختر المحكمة" />
          <Field label="تاريخ بدء القضية"><input className={fieldCls} placeholder="1 يونيو 2026" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} /></Field>
          <Field label="تاريخ الجلسة القادمة"><input className={fieldCls} placeholder="10 يونيو 2026" value={form.nextDate} onChange={(e) => setForm({ ...form, nextDate: e.target.value })} /></Field>
          <SelectField label="الحالة" value={form.status} onChange={(v) => setForm({ ...form, status: v })} options={["نشطة", "قيد المراجعة", "مغلقة"]} placeholder="اختر الحالة" />
          <SelectField label="الأولوية" value={form.priority} onChange={(v) => setForm({ ...form, priority: v })} options={["عادية", "متوسطة", "عاجلة"]} placeholder="اختر الأولوية" />
          <Field label="نسبة الإنجاز (%)"><input type="number" min={0} max={100} className={fieldCls} value={form.progress} onChange={(e) => setForm({ ...form, progress: e.target.value })} /></Field>
        </FormSection>
        <FormSection title="الطرف الآخر">
          <Field label="اسم الخصم"><input className={fieldCls} value={form.opponent} onChange={(e) => setForm({ ...form, opponent: e.target.value })} /></Field>
          <Field label="محامي الخصم"><input className={fieldCls} value={form.opponentLawyer} onChange={(e) => setForm({ ...form, opponentLawyer: e.target.value })} /></Field>
          <Field label="قيمة المطالبة (ج.م)"><input type="number" min={0} className={fieldCls} value={form.claimAmount} onChange={(e) => setForm({ ...form, claimAmount: e.target.value })} /></Field>
        </FormSection>
        <div>
          <h3 className="mb-4 border-b border-white/10 pb-2 text-sm font-bold text-gold">تفاصيل ومستندات</h3>
          <div className="space-y-4">
            <Field label="وصف القضية"><textarea rows={4} className={fieldCls} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></Field>
            <FileField label="ملفات ومستندات القضية" files={files} setFiles={setFiles} />
          </div>
        </div>
      </FormPage>
    );
  }

  if (viewing) {
    const c = viewing;
    return (
      <DetailPage title={c.title} subtitle={`${c.client} — ${c.type}`} icon={Briefcase} onBack={() => setViewingId(null)}
        actions={<StatusChanger value={c.status} options={["نشطة", "قيد المراجعة", "مغلقة"]} onChange={(v) => changeStatus(c, v)} />}>
        <div className={card}>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-semibold text-cream">نسبة الإنجاز</span>
            <span className="text-cream/55">{c.progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-gold" style={{ width: `${c.progress}%` }} /></div>
        </div>
        <DetailGrid title="بيانات أساسية">
          <DetailItem label="رقم القضية" value={c.caseNumber} />
          <DetailItem label="نوع القضية" value={c.type} />
          <DetailItem label="العميل" value={c.client} />
          <DetailItem label="درجة التقاضي" value={c.degree} />
          <DetailItem label="الأولوية" value={c.priority} />
          <DetailItem label="الحالة" value={c.status} />
        </DetailGrid>
        <DetailGrid title="المحكمة والجدول">
          <DetailItem label="المحكمة" value={c.court} />
          <DetailItem label="تاريخ البدء" value={c.startDate} />
          <DetailItem label="الجلسة القادمة" value={c.nextDate} />
        </DetailGrid>
        {(c.opponent || c.opponentLawyer || c.claimAmount) && (
          <DetailGrid title="الطرف الآخر">
            <DetailItem label="اسم الخصم" value={c.opponent} />
            <DetailItem label="محامي الخصم" value={c.opponentLawyer} />
            <DetailItem label="قيمة المطالبة" value={c.claimAmount ? `${c.claimAmount.toLocaleString()} ج.م` : undefined} />
          </DetailGrid>
        )}
        {(c.description || (c.files && c.files.length > 0)) && (
          <div className={card}>
            <h3 className="mb-4 border-b border-white/10 pb-2 text-sm font-bold text-gold">تفاصيل ومستندات</h3>
            {c.description && <p className="mb-4 text-sm leading-relaxed text-cream/85">{c.description}</p>}
            {c.files && c.files.length > 0 && <DocFiles files={c.files} />}
          </div>
        )}
        <RelatedSection title="جلسات القضية" icon={CalendarDays}
          items={dashSessions.filter((s) => s.caseRef === c.title).map((s) => ({ id: s.id, primary: s.title, secondary: `${s.day} يونيو 2026 — ${s.time}`, meta: s.location, status: s.status, onClick: () => go("sessions", s.id) }))} />
        <RelatedSection title="فواتير القضية" icon={Receipt}
          items={dashInvoices.filter((iv) => iv.caseRef === c.title).map((iv) => ({ id: iv.id, primary: iv.number, secondary: iv.item, meta: iv.issueDate ?? iv.date, status: iv.status, amount: `${iv.amount.toLocaleString()} ج.م`, onClick: () => go("invoices", iv.id) }))} />
        <TimelinePanel events={getTimeline(c)} />
        <CommentsPanel comments={comments[c.id] ?? []} onAdd={(t) => addComment(c.id, t)} />
      </DetailPage>
    );
  }

  return (
    <div className={card}>
      <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-cream"><Briefcase className="h-5 w-5 text-gold" /> القضايا</h2>
      <Toolbar search={search} setSearch={setSearch} placeholder="ابحث بالعنوان أو العميل أو رقم القضية..." filter={filter} setFilter={setFilter}
        options={[{ value: "all", label: "كل الحالات" }, { value: "نشطة", label: "نشطة" }, { value: "قيد المراجعة", label: "قيد المراجعة" }, { value: "مغلقة", label: "مغلقة" }]}
        filter2={typeFilter} setFilter2={setTypeFilter}
        options2={[{ value: "all", label: "كل الأنواع" }, ...caseTypes.map((t) => ({ value: t, label: t }))]}
        onAdd={() => setAdding(true)} addLabel="إضافة قضية" />
      <div className="space-y-3">
        {filtered.map((c) => (
          <div key={c.id} className="rounded-xl border border-white/10 bg-navy-deep/50 p-4 transition-colors hover:border-gold/30">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="font-bold text-cream">{c.title}</p>
                <p className="mt-0.5 text-sm text-cream/60">{c.client} — {c.type}</p>
                <p className="mt-1 flex flex-wrap items-center gap-3 text-xs text-cream/45">
                  {c.caseNumber && <span className="flex items-center gap-1"><Hash className="h-3 w-3 text-gold" />{c.caseNumber}</span>}
                  {c.court && <span className="flex items-center gap-1"><Gavel className="h-3 w-3 text-gold" />{c.court}</span>}
                  {c.files && c.files.length > 0 && <span className="flex items-center gap-1"><Paperclip className="h-3 w-3 text-gold" />{c.files.length} ملف</span>}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor[c.status]}`}>{c.status}</span>
                <ViewButton onClick={() => setViewingId(c.id)} />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-gold" style={{ width: `${c.progress}%` }} /></div>
              <span className="text-xs text-cream/55">{c.progress}%</span>
              <span className="flex items-center gap-1 text-xs text-cream/55"><CalendarDays className="h-3.5 w-3.5 text-gold" /> {c.nextDate}</span>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="py-6 text-center text-sm text-cream/50">لا توجد نتائج.</p>}
      </div>
    </div>
  );
}

/* ---------- Clients ---------- */
function Clients() {
  const [items, setItems] = useState<DashClient[]>(dashClients);
  const { go, request } = useDashNav();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [adding, setAdding] = useState(false);
  const [viewingId, setViewingId] = useState<string | null>(null);
  const [comments, setComments] = useState<Record<string, DashComment[]>>({});
  const emptyForm = { name: "", phone: "", altPhone: "", email: "", type: "فرد", city: "", nationalId: "", address: "", notes: "" };
  const [form, setForm] = useState(emptyForm);
  const [files, setFiles] = useState<string[]>([]);
  const viewing = items.find((c) => c.id === viewingId) ?? null;
  useEffect(() => { if (request?.section === "clients") setViewingId(request.id); }, [request]);
  const addComment = (id: string, text: string) =>
    setComments((p) => ({ ...p, [id]: [...(p[id] ?? []), { id: `cm${Date.now()}`, text, date: "الآن" }] }));

  const filtered = items.filter((c) =>
    (filter === "all" || (filter === "active" ? c.cases > 0 : c.cases === 0)) &&
    (c.name.includes(search) || c.phone.includes(search) || c.email.includes(search) || (c.city ?? "").includes(search))
  );
  const add = (e: React.FormEvent) => {
    e.preventDefault();
    setItems((p) => [{ id: `u${Date.now()}`, name: form.name, phone: form.phone, email: form.email, cases: 0, since: "يونيو 2026", type: form.type as DashClient["type"], city: form.city || undefined, nationalId: form.nationalId || undefined, altPhone: form.altPhone || undefined, address: form.address || undefined, notes: form.notes || undefined, files: files.length ? files : undefined }, ...p]);
    setForm(emptyForm);
    setFiles([]);
    setAdding(false);
  };

  if (adding) {
    return (
      <FormPage title="إضافة عميل جديد" subtitle="سجّل بيانات التواصل والتعريف الخاصة بالعميل" icon={Users}
        onBack={() => setAdding(false)} onSubmit={add} submitLabel="حفظ العميل">
        <FormSection title="البيانات الأساسية">
          <div className="sm:col-span-2"><Field label="الاسم الكامل"><input className={fieldCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></Field></div>
          <SelectField label="نوع العميل" value={form.type} onChange={(v) => setForm({ ...form, type: v })} options={["فرد", "شركة"]} placeholder="اختر النوع" />
          <Field label="المدينة"><input className={fieldCls} value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} /></Field>
          <div className="sm:col-span-2"><Field label={form.type === "شركة" ? "رقم السجل التجاري" : "الرقم القومي"}><input className={fieldCls} value={form.nationalId} onChange={(e) => setForm({ ...form, nationalId: e.target.value })} /></Field></div>
        </FormSection>
        <FormSection title="بيانات التواصل">
          <Field label="الهاتف"><input type="tel" className={fieldCls} placeholder="01XXXXXXXXX" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required /></Field>
          <Field label="هاتف بديل"><input type="tel" className={fieldCls} placeholder="01XXXXXXXXX" value={form.altPhone} onChange={(e) => setForm({ ...form, altPhone: e.target.value })} /></Field>
          <Field label="البريد الإلكتروني"><input type="email" className={fieldCls} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></Field>
          <div className="sm:col-span-2"><Field label="العنوان"><input className={fieldCls} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} /></Field></div>
        </FormSection>
        <div>
          <h3 className="mb-4 border-b border-white/10 pb-2 text-sm font-bold text-gold">ملاحظات</h3>
          <Field label="ملاحظات إضافية"><textarea rows={3} className={fieldCls} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></Field>
        </div>
        <div>
          <h3 className="mb-4 border-b border-white/10 pb-2 text-sm font-bold text-gold">المرفقات</h3>
          <FileField label="مستندات وملفات العميل" files={files} setFiles={setFiles} />
        </div>
      </FormPage>
    );
  }

  if (viewing) {
    const c = viewing;
    const relatedCases = dashCases.filter((cs) => cs.client === c.name);
    const relatedSessions = dashSessions.filter((s) => s.client === c.name);
    const relatedInvoices = dashInvoices.filter((iv) => iv.client === c.name);
    const totalBilled = relatedInvoices.reduce((sum, iv) => sum + iv.amount, 0);
    return (
      <DetailPage title={c.name} subtitle={c.type ? `${c.type}${c.city ? ` — ${c.city}` : ""}` : c.city} icon={Users} onBack={() => setViewingId(null)}>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-navy-deep/50 p-4 text-center"><p className="text-xs text-cream/50">القضايا</p><p className="mt-1 text-xl font-extrabold text-cream">{relatedCases.length}</p></div>
          <div className="rounded-xl border border-white/10 bg-navy-deep/50 p-4 text-center"><p className="text-xs text-cream/50">الجلسات</p><p className="mt-1 text-xl font-extrabold text-cream">{relatedSessions.length}</p></div>
          <div className="rounded-xl border border-white/10 bg-navy-deep/50 p-4 text-center"><p className="text-xs text-cream/50">إجمالي الفواتير</p><p className="mt-1 text-xl font-extrabold text-gold">{totalBilled.toLocaleString()} ج.م</p></div>
        </div>
        <DetailGrid title="بيانات التواصل">
          <DetailItem label="الهاتف" value={c.phone} />
          <DetailItem label="هاتف بديل" value={c.altPhone} />
          <DetailItem label="البريد الإلكتروني" value={c.email} />
          <DetailItem label="العنوان" value={c.address} full />
        </DetailGrid>
        <DetailGrid title="بيانات التعريف">
          <DetailItem label="نوع العميل" value={c.type} />
          <DetailItem label="المدينة" value={c.city} />
          <DetailItem label={c.type === "شركة" ? "السجل التجاري" : "الرقم القومي"} value={c.nationalId} />
          <DetailItem label="عدد القضايا" value={c.cases} />
          <DetailItem label="عميل منذ" value={c.since} />
        </DetailGrid>
        {c.notes && (
          <div className={card}>
            <h3 className="mb-3 border-b border-white/10 pb-2 text-sm font-bold text-gold">ملاحظات</h3>
            <p className="text-sm leading-relaxed text-cream/85">{c.notes}</p>
          </div>
        )}
        {c.files && c.files.length > 0 && (
          <div className={card}>
            <h3 className="mb-4 flex items-center gap-2 border-b border-white/10 pb-2 text-sm font-bold text-gold"><Paperclip className="h-4 w-4" /> المرفقات <span className="text-cream/40">({c.files.length})</span></h3>
            <DocFiles files={c.files} />
          </div>
        )}
        {relatedCases.length > 0 && (
          <div className={card}>
            <h3 className="mb-4 border-b border-white/10 pb-2 text-sm font-bold text-gold">قضايا العميل</h3>
            <div className="space-y-3">
              {relatedCases.map((cs) => (
                <div key={cs.id} onClick={() => go("cases", cs.id)} role="button"
                  className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-navy-deep/50 p-3 transition-colors hover:border-gold/40">
                  <div><p className="text-sm font-bold text-cream">{cs.title}</p><p className="mt-0.5 text-xs text-cream/60">{cs.type}</p></div>
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor[cs.status]}`}>{cs.status}</span>
                    <Eye className="h-4 w-4 shrink-0 text-cream/50" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <RelatedSection title="جلسات العميل" icon={CalendarDays}
          items={relatedSessions.map((s) => ({ id: s.id, primary: s.title, secondary: `${s.day} يونيو 2026 — ${s.time}`, meta: s.location, status: s.status, onClick: () => go("sessions", s.id) }))} />
        <RelatedSection title="فواتير العميل" icon={Receipt}
          items={relatedInvoices.map((iv) => ({ id: iv.id, primary: iv.number, secondary: iv.item, meta: iv.issueDate ?? iv.date, status: iv.status, amount: `${iv.amount.toLocaleString()} ج.م`, onClick: () => go("invoices", iv.id) }))} />
        <CommentsPanel comments={comments[c.id] ?? []} onAdd={(t) => addComment(c.id, t)} />
      </DetailPage>
    );
  }

  return (
    <div className={card}>
      <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-cream"><Users className="h-5 w-5 text-gold" /> العملاء</h2>
      <Toolbar search={search} setSearch={setSearch} placeholder="ابحث في العملاء..." filter={filter} setFilter={setFilter}
        options={[{ value: "all", label: "كل العملاء" }, { value: "active", label: "لديهم قضايا" }, { value: "none", label: "بدون قضايا" }]}
        onAdd={() => setAdding(true)} addLabel="إضافة عميل" />
      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((c) => (
          <div key={c.id} className="rounded-xl border border-white/10 bg-navy-deep/50 p-4 transition-colors hover:border-gold/30">
            <div className="flex items-center justify-between gap-2">
              <p className="font-bold text-cream">{c.name}</p>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-gold/15 px-2.5 py-1 text-xs font-medium text-gold">{c.cases} قضية</span>
                <ViewButton onClick={() => setViewingId(c.id)} />
              </div>
            </div>
            <div className="mt-3 space-y-1.5 text-sm text-cream/60">
              <p className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-gold" /> {c.phone}</p>
              <p className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-gold" /> {c.email}</p>
              <p className="text-xs text-cream/45">عميل منذ {c.since}</p>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="col-span-full py-6 text-center text-sm text-cream/50">لا توجد نتائج.</p>}
      </div>
    </div>
  );
}

/* ---------- Sessions ---------- */
function Sessions() {
  const [items, setItems] = useState<DashSession[]>(dashSessions);
  const { request, go } = useDashNav();
  const [search, setSearch] = useState("");
  const [adding, setAdding] = useState(false);
  const [viewingId, setViewingId] = useState<string | null>(null);
  const [comments, setComments] = useState<Record<string, DashComment[]>>({});
  const [reminders, setReminders] = useState<DashReminder[]>(dashReminders);
  const [reminderModal, setReminderModal] = useState<{ day: number } | null>(null);
  const [reminderText, setReminderText] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [reminderUrgent, setReminderUrgent] = useState(false);
  const [dayModal, setDayModal] = useState<{ day: number } | null>(null);
  const [reminderView, setReminderView] = useState<DashReminder | null>(null);
  const emptyForm = { title: "", type: "", client: "", caseRef: "", day: "", time: "", location: "", notes: "" };
  const [form, setForm] = useState(emptyForm);
  const clientNames = dashClients.map((c) => c.name);
  const caseTitles = dashCases.map((c) => c.title);
  const viewing = items.find((s) => s.id === viewingId) ?? null;
  useEffect(() => { if (request?.section === "sessions") setViewingId(request.id); }, [request]);
  const addComment = (id: string, text: string) =>
    setComments((p) => ({ ...p, [id]: [...(p[id] ?? []), { id: `cm${Date.now()}`, text, date: "الآن" }] }));
  const changeStatus = (id: string, status: string) =>
    setItems((p) => p.map((s) => (s.id === id ? { ...s, status: status as DashSession["status"] } : s)));

  const monthName = "يونيو 2026";
  const weekDays = ["سبت", "أحد", "إثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة"];
  const firstOffset = 2;
  const cells: (number | null)[] = [...Array(firstOffset).fill(null), ...Array.from({ length: 30 }, (_, i) => i + 1)];
  const filteredList = items.filter((s) => s.title.includes(search) || s.client.includes(search) || s.location.includes(search));
  const sessionByDay = new Map<number, DashSession[]>();
  items.forEach((s) => { const a = sessionByDay.get(s.day) ?? []; a.push(s); sessionByDay.set(s.day, a); });
  const consultationByDay = new Map<number, DashConsultation>();
  dashConsultations.forEach((co) => {
    const m = co.date.match(/\d+/);
    if (m) { const d = Number(m[0]); if (!consultationByDay.has(d)) consultationByDay.set(d, co); }
  });
  const reminderByDay = new Map<number, DashReminder[]>();
  reminders.forEach((r) => { if (r.day) { const a = reminderByDay.get(r.day) ?? []; a.push(r); reminderByDay.set(r.day, a); } });
  const today = 6;

  const handleDayClick = (day: number) => setDayModal({ day });
  const openAddReminder = (day: number) => {
    setDayModal(null);
    setReminderModal({ day });
    setReminderText("");
    setReminderTime("");
    setReminderUrgent(false);
  };
  const addReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reminderModal || !reminderText.trim()) return;
    setReminders((p) => [{
      id: `r${Date.now()}`,
      text: reminderText.trim(),
      due: `${reminderModal.day} يونيو 2026${reminderTime ? ` — ${reminderTime}` : ""}`,
      urgent: reminderUrgent,
      day: reminderModal.day,
      time: reminderTime || undefined,
    }, ...p]);
    setReminderModal(null);
  };

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    setItems((p) => [...p, { id: `s${Date.now()}`, title: form.title, type: form.type || undefined, client: form.client, day: Number(form.day), time: form.time, location: form.location, caseRef: form.caseRef || undefined, notes: form.notes || undefined, status: "قادمة" }]);
    setForm(emptyForm);
    setAdding(false);
  };

  if (adding) {
    return (
      <FormPage title="إضافة جلسة جديدة" subtitle="حدّد موعد الجلسة والقضية المرتبطة بها" icon={CalendarDays}
        onBack={() => setAdding(false)} onSubmit={add} submitLabel="حفظ الجلسة">
        <FormSection title="بيانات الجلسة">
          <div className="sm:col-span-2"><Field label="عنوان الجلسة"><input className={fieldCls} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></Field></div>
          <SelectField label="نوع الجلسة" value={form.type} onChange={(v) => setForm({ ...form, type: v })} options={sessionTypes} placeholder="اختر النوع" />
          <SelectField label="العميل" value={form.client} onChange={(v) => setForm({ ...form, client: v })} options={clientNames} placeholder="اختر العميل" required />
          <div className="sm:col-span-2"><SelectField label="القضية المرتبطة" value={form.caseRef} onChange={(v) => setForm({ ...form, caseRef: v })} options={caseTitles} placeholder="اختر القضية" /></div>
        </FormSection>
        <FormSection title="الموعد والمكان">
          <Field label="اليوم (1-30)"><input type="number" min={1} max={30} className={fieldCls} value={form.day} onChange={(e) => setForm({ ...form, day: e.target.value })} required /></Field>
          <Field label="الوقت"><input className={fieldCls} placeholder="10:00 ص" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} required /></Field>
          <div className="sm:col-span-2"><SelectField label="المكان" value={form.location} onChange={(v) => setForm({ ...form, location: v })} options={[...courts, "أونلاين", "المكتب"]} placeholder="اختر المكان" required /></div>
        </FormSection>
        <div>
          <h3 className="mb-4 border-b border-white/10 pb-2 text-sm font-bold text-gold">ملاحظات</h3>
          <Field label="ملاحظات الجلسة"><textarea rows={3} className={fieldCls} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></Field>
        </div>
      </FormPage>
    );
  }

  if (viewing) {
    const s = viewing;
    const linkedCase = dashCases.find((cs) => cs.title === s.caseRef);
    return (
      <DetailPage title={s.title} subtitle={s.type} icon={CalendarDays} onBack={() => setViewingId(null)}
        actions={<StatusChanger value={s.status ?? "قادمة"} options={["قادمة", "منتهية", "مؤجلة", "ملغاة"]} onChange={(v) => changeStatus(s.id, v)} />}>
        <DetailGrid title="بيانات الجلسة">
          <DetailItem label="العميل" value={s.client} />
          <DetailItem label="نوع الجلسة" value={s.type} />
          <DetailItem label="الحالة" value={s.status} />
          <DetailItem label="القضية المرتبطة" value={s.caseRef} full />
        </DetailGrid>
        <DetailGrid title="الموعد والمكان">
          <DetailItem label="التاريخ" value={`${s.day} يونيو 2026`} />
          <DetailItem label="الوقت" value={s.time} />
          <DetailItem label="المكان" value={s.location} full />
        </DetailGrid>
        {linkedCase && <LinkedCaseGrid linkedCase={linkedCase} />}
        {s.notes && (
          <div className={card}>
            <h3 className="mb-3 border-b border-white/10 pb-2 text-sm font-bold text-gold">ملاحظات</h3>
            <p className="text-sm leading-relaxed text-cream/85">{s.notes}</p>
          </div>
        )}
        <CommentsPanel comments={comments[s.id] ?? []} onAdd={(t) => addComment(s.id, t)} />
      </DetailPage>
    );
  }

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
          {weekDays.map((d) => <div key={d} className="pb-2 text-xs font-semibold text-cream/50">{d}</div>)}
          {cells.map((day, i) => {
            if (day === null) return <div key={`e${i}`} />;
            const sessions = sessionByDay.get(day);
            const consultation = consultationByDay.get(day);
            const dayReminders = reminderByDay.get(day);
            const isToday = day === today;
            return (
              <button key={day} type="button" onClick={() => handleDayClick(day)}
                title="عرض مواعيد اليوم"
                className={`min-h-16 rounded-lg border p-1.5 text-start transition-colors hover:border-gold ${sessions ? "border-gold/40 bg-gold/5" : "border-white/10 bg-navy-deep/40"} ${isToday ? "ring-1 ring-gold" : ""}`}>
                <span className={`text-xs font-bold ${isToday ? "text-gold" : "text-cream/70"}`}>{day}</span>
                {sessions?.map((s) => (
                  <p key={s.id} className="mt-1 flex items-center gap-0.5 truncate rounded bg-gold/15 px-1 py-0.5 text-[10px] text-gold" title={`جلسة: ${s.title} - ${s.time}`}>
                    <CalendarDays className="h-2.5 w-2.5 shrink-0" /> <span className="truncate">جلسة: {s.title}</span>
                  </p>
                ))}
                {consultation && (
                  <p className="mt-1 flex items-center gap-0.5 truncate rounded bg-emerald-500/15 px-1 py-0.5 text-[10px] text-emerald-400" title={`استشارة: ${consultation.subject}`}>
                    <MessageSquare className="h-2.5 w-2.5 shrink-0" /> <span className="truncate">استشارة: {consultation.subject}</span>
                  </p>
                )}
                {dayReminders?.map((r) => (
                  <p key={r.id} className="mt-1 flex items-center gap-0.5 truncate rounded bg-orange-500/15 px-1 py-0.5 text-[10px] text-orange-400" title={`تنبيه: ${r.text}`}>
                    <Bell className="h-2.5 w-2.5 shrink-0" /> <span className="truncate">تنبيه: {r.text}</span>
                  </p>
                ))}
              </button>
            );
          })}
        </div>
      </div>
      <div className="space-y-8">
        <div className={card}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-cream">جلسات الشهر</h2>
            <button onClick={() => setAdding(true)} className="flex items-center gap-1.5 rounded-md bg-gradient-gold px-3 py-1.5 text-xs font-bold text-navy shadow-gold"><Plus className="h-3.5 w-3.5" /> إضافة</button>
          </div>
          <div className="relative mb-4">
            <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="ابحث في الجلسات..." className={`${fieldCls} pr-9`} />
          </div>
          <div className="space-y-3">
            {filteredList.map((s) => (
              <div key={s.id} className="rounded-xl border border-white/10 bg-navy-deep/50 p-3 transition-colors hover:border-gold/30">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-cream">{s.title}</p>
                    <p className="mt-1 text-xs text-cream/60">{s.client} — {s.location}</p>
                    <p className="mt-1 flex items-center gap-2 text-xs text-gold"><CalendarDays className="h-3.5 w-3.5" /> {s.day} يونيو، {s.time}</p>
                  </div>
                  <ViewButton onClick={() => setViewingId(s.id)} />
                </div>
                {s.status && <span className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-medium ${statusColor[s.status]}`}>{s.status}</span>}
              </div>
            ))}
            {filteredList.length === 0 && <p className="py-4 text-center text-sm text-cream/50">لا توجد نتائج.</p>}
          </div>
        </div>
        <div className={card}>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-cream"><Bell className="h-5 w-5 text-gold" /> التذكيرات</h2>
          <p className="mb-3 text-xs text-cream/45">اضغط على أي يوم في التقويم لعرض جلساته واستشاراته وتنبيهاته أو لإضافة تنبيه جديد بموعده.</p>
          <div className="space-y-3">
            {reminders.map((r) => (
              <button key={r.id} type="button" onClick={() => setReminderView(r)} className="flex w-full items-start gap-3 rounded-xl border border-white/10 bg-navy-deep/50 p-3 text-right transition-colors hover:border-gold/30">
                {r.urgent ? <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" /> : <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />}
                <div><p className="text-sm text-cream">{r.text}</p><p className="mt-1 text-xs text-cream/50">{r.due}</p></div>
              </button>
            ))}
            {reminders.length === 0 && <p className="py-4 text-center text-sm text-cream/50">لا توجد تنبيهات.</p>}
          </div>
        </div>
      </div>

      {reminderModal && (
        <Modal title={`إضافة تنبيه — ${reminderModal.day} يونيو 2026`} onClose={() => setReminderModal(null)}>
          <form onSubmit={addReminder} className="space-y-4">
            <Field label="نص التنبيه"><textarea rows={3} className={fieldCls} value={reminderText} onChange={(e) => setReminderText(e.target.value)} placeholder="مثال: تسليم مذكرة دفاع..." required /></Field>
            <Field label="وقت التنبيه"><input type="time" className={fieldCls} value={reminderTime} onChange={(e) => setReminderTime(e.target.value)} required /></Field>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-cream/80">
              <input type="checkbox" checked={reminderUrgent} onChange={(e) => setReminderUrgent(e.target.checked)} className="h-4 w-4 accent-gold" /> تنبيه عاجل
            </label>
            <div className="flex gap-3">
              <button type="button" onClick={() => setReminderModal(null)} className="flex-1 rounded-lg border border-white/15 py-2.5 text-sm font-semibold text-cream hover:bg-white/5">إلغاء</button>
              <button type="submit" className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-gold py-2.5 text-sm font-bold text-navy shadow-gold"><Plus className="h-4 w-4" /> إضافة التنبيه</button>
            </div>
          </form>
        </Modal>
      )}

      {dayModal && (() => {
        const day = dayModal.day;
        const sess = sessionByDay.get(day) ?? [];
        const co = consultationByDay.get(day);
        const rems = reminderByDay.get(day) ?? [];
        const empty = sess.length === 0 && !co && rems.length === 0;
        return (
          <Modal title={`مواعيد يوم ${day} يونيو 2026`} onClose={() => setDayModal(null)}>
            <div className="space-y-4">
              {empty && <p className="py-2 text-center text-sm text-cream/55">لا توجد مواعيد في هذا اليوم.</p>}
              {sess.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-gold">الجلسات</p>
                  {sess.map((s) => (
                    <button key={s.id} type="button" onClick={() => { setDayModal(null); setViewingId(s.id); }}
                      className="flex w-full items-center gap-3 rounded-xl border border-gold/30 bg-gold/5 p-3 text-right transition-colors hover:border-gold">
                      <CalendarDays className="h-4 w-4 shrink-0 text-gold" />
                      <span className="flex-1"><span className="block text-sm font-semibold text-cream">{s.title}</span><span className="text-xs text-cream/55">{s.client} — {s.time}</span></span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-gold" />
                    </button>
                  ))}
                </div>
              )}
              {co && (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-emerald-400">الاستشارات</p>
                  <button type="button" onClick={() => { setDayModal(null); go("consultations", co.id); }}
                    className="flex w-full items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3 text-right transition-colors hover:border-emerald-400">
                    <MessageSquare className="h-4 w-4 shrink-0 text-emerald-400" />
                    <span className="flex-1"><span className="block text-sm font-semibold text-cream">{co.subject}</span><span className="text-xs text-cream/55">{co.client} — {co.time}</span></span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-emerald-400" />
                  </button>
                </div>
              )}
              {rems.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-orange-400">التنبيهات</p>
                  {rems.map((r) => (
                    <button key={r.id} type="button" onClick={() => { setDayModal(null); setReminderView(r); }}
                      className="flex w-full items-center gap-3 rounded-xl border border-orange-500/30 bg-orange-500/5 p-3 text-right transition-colors hover:border-orange-400">
                      <Bell className="h-4 w-4 shrink-0 text-orange-400" />
                      <span className="flex-1"><span className="block text-sm font-semibold text-cream">{r.text}</span>{r.time && <span className="text-xs text-cream/55">{r.time}</span>}</span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-orange-400" />
                    </button>
                  ))}
                </div>
              )}
              <button type="button" onClick={() => openAddReminder(day)}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-gold py-2.5 text-sm font-bold text-navy shadow-gold">
                <Plus className="h-4 w-4" /> إضافة تنبيه لهذا اليوم
              </button>
            </div>
          </Modal>
        );
      })()}

      {reminderView && (
        <Modal title="تفاصيل التنبيه" onClose={() => setReminderView(null)}>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              {reminderView.urgent ? <AlertCircle className="h-5 w-5 text-red-400" /> : <Bell className="h-5 w-5 text-gold" />}
              <p className="text-lg font-bold text-cream">{reminderView.text}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Info label="الموعد" value={reminderView.due} />
              {reminderView.time && <Info label="الوقت" value={reminderView.time} />}
              <Info label="الأولوية" value={reminderView.urgent ? "عاجل" : "عادي"} />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ---------- Consultations ---------- */
const channelIcon: Record<string, typeof Video> = { "أونلاين": Video, "مكتب": Building2, "هاتف": Phone };
function Consultations() {
  const [items, setItems] = useState<DashConsultation[]>(dashConsultations);
  const { request } = useDashNav();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [viewingId, setViewingId] = useState<string | null>(null);
  const [comments, setComments] = useState<Record<string, DashComment[]>>({});
  const [inCall, setInCall] = useState<DashConsultation | null>(null);
  const viewing = items.find((c) => c.id === viewingId) ?? null;
  useEffect(() => { if (request?.section === "consultations") setViewingId(request.id); }, [request]);
  const addComment = (id: string, text: string) =>
    setComments((p) => ({ ...p, [id]: [...(p[id] ?? []), { id: `cm${Date.now()}`, text, date: "الآن" }] }));
  const changeStatus = (id: string, status: string) =>
    setItems((p) => p.map((c) => (c.id === id ? { ...c, status: status as DashConsultation["status"] } : c)));

  const filtered = items.filter((c) =>
    (filter === "all" || c.status === filter) &&
    (c.client.includes(search) || c.subject.includes(search))
  );
  if (viewing) {
    const c = viewing;
    const linkedCase = dashCases.find((cs) => cs.title === c.caseRef);
    return (
      <>
      {inCall && <VideoCall consultation={inCall} onClose={() => setInCall(null)} />}
      <DetailPage title={c.subject} subtitle={c.client} icon={MessageSquare} onBack={() => setViewingId(null)}
        actions={<div className="flex items-center gap-2">
          {c.status !== "ملغاة" && (
            <button onClick={() => setInCall(c)} className="flex items-center gap-2 rounded-lg bg-gradient-gold px-4 py-2 text-sm font-bold text-navy shadow-gold transition-transform hover:-translate-y-0.5">
              <Video className="h-4 w-4" /> انضمام للمكالمة
            </button>
          )}
          <StatusChanger value={c.status} options={["قادمة", "مكتملة", "ملغاة"]} onChange={(v) => changeStatus(c.id, v)} />
        </div>}>
        <DetailGrid title="تفاصيل الاستشارة">
          <DetailItem label="العميل" value={c.client} />
          <DetailItem label="قناة التواصل" value={c.channel} />
          <DetailItem label="التاريخ" value={c.date} />
          <DetailItem label="الوقت" value={c.time} />
          <DetailItem label="المدة" value={c.duration} />
          <DetailItem label="السعر" value={`${c.price.toLocaleString()} ج.م`} />
          <DetailItem label="الحالة" value={c.status} />
          <DetailItem label="القضية المرتبطة" value={c.caseRef} full />
        </DetailGrid>
        {linkedCase && <LinkedCaseGrid linkedCase={linkedCase} />}
        {c.notes && (
          <div className={card}>
            <h3 className="mb-3 border-b border-white/10 pb-2 text-sm font-bold text-gold">ملاحظات</h3>
            <p className="text-sm leading-relaxed text-cream/85">{c.notes}</p>
          </div>
        )}
        <CommentsPanel comments={comments[c.id] ?? []} onAdd={(t) => addComment(c.id, t)} />
      </DetailPage>
      </>
    );
  }

  return (
    <>
    {inCall && <VideoCall consultation={inCall} onClose={() => setInCall(null)} />}
    <div className={card}>
      <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-cream"><MessageSquare className="h-5 w-5 text-gold" /> الاستشارات</h2>
      <Toolbar search={search} setSearch={setSearch} placeholder="ابحث في الاستشارات..." filter={filter} setFilter={setFilter}
        options={[{ value: "all", label: "كل الحالات" }, { value: "قادمة", label: "قادمة" }, { value: "مكتملة", label: "مكتملة" }, { value: "ملغاة", label: "ملغاة" }]} />
      <div className="space-y-3">
        {filtered.map((c) => {
          const Icon = channelIcon[c.channel] ?? Video;
          return (
            <div key={c.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-navy-deep/50 p-4 transition-colors hover:border-gold/30">
              <div>
                <p className="font-bold text-cream">{c.subject}</p>
                <p className="mt-0.5 text-sm text-cream/60">{c.client}</p>
                <p className="mt-1 flex items-center gap-3 text-xs text-cream/55">
                  <span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5 text-gold" />{c.date}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-gold" />{c.time}</span>
                  <span className="flex items-center gap-1"><Icon className="h-3.5 w-3.5 text-gold" />{c.channel}</span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-extrabold text-cream">{c.price} ج.م</span>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor[c.status]}`}>{c.status}</span>
                {c.status !== "ملغاة" && (
                  <button onClick={() => setInCall(c)} aria-label="انضمام للمكالمة" className="flex h-9 items-center gap-1.5 rounded-lg bg-gradient-gold px-3 text-xs font-bold text-navy shadow-gold transition-transform hover:-translate-y-0.5">
                    <Video className="h-4 w-4" /> انضمام
                  </button>
                )}
                <ViewButton onClick={() => setViewingId(c.id)} />
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && <p className="py-6 text-center text-sm text-cream/50">لا توجد نتائج.</p>}
      </div>
    </div>
    </>
  );
}

/* ---------- Invoices ---------- */
function Invoices() {
  const [items, setItems] = useState<DashInvoice[]>(dashInvoices);
  const { request } = useDashNav();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [adding, setAdding] = useState(false);
  const [viewingId, setViewingId] = useState<string | null>(null);
  const [comments, setComments] = useState<Record<string, DashComment[]>>({});
  const emptyForm = { client: "", caseRef: "", item: "", amount: "", tax: "", issueDate: "", dueDate: "", status: "معلقة", notes: "" };
  const [form, setForm] = useState(emptyForm);
  const clientNames = dashClients.map((c) => c.name);
  const caseTitles = dashCases.map((c) => c.title);
  const viewing = items.find((i) => i.id === viewingId) ?? null;
  useEffect(() => { if (request?.section === "invoices") setViewingId(request.id); }, [request]);
  const addComment = (id: string, text: string) =>
    setComments((p) => ({ ...p, [id]: [...(p[id] ?? []), { id: `cm${Date.now()}`, text, date: "الآن" }] }));
  const changeStatus = (id: string, status: string) =>
    setItems((p) => p.map((i) => (i.id === id ? { ...i, status: status as DashInvoice["status"] } : i)));

  const filtered = items.filter((i) =>
    (filter === "all" || i.status === filter) &&
    (i.number.includes(search) || i.client.includes(search) || (i.item ?? "").includes(search))
  );
  const total = items.reduce((s, i) => s + i.amount, 0);
  const paid = items.filter((i) => i.status === "مدفوعة").reduce((s, i) => s + i.amount, 0);
  const add = (e: React.FormEvent) => {
    e.preventDefault();
    const n = `INV-${2044 + items.length}`;
    setItems((p) => [{ id: `i${Date.now()}`, number: n, client: form.client, amount: Number(form.amount), date: form.issueDate || "6 يونيو 2026", status: form.status as DashInvoice["status"], item: form.item || undefined, dueDate: form.dueDate || undefined, caseRef: form.caseRef || undefined, tax: form.tax ? Number(form.tax) : undefined, issueDate: form.issueDate || undefined, notes: form.notes || undefined }, ...p]);
    setForm(emptyForm);
    setAdding(false);
  };

  if (adding) {
    return (
      <FormPage title="إنشاء فاتورة جديدة" subtitle="حدّد العميل والبند والمبالغ المستحقة" icon={Receipt}
        onBack={() => setAdding(false)} onSubmit={add} submitLabel="إنشاء الفاتورة">
        <FormSection title="بيانات الفاتورة">
          <SelectField label="العميل" value={form.client} onChange={(v) => setForm({ ...form, client: v })} options={clientNames} placeholder="اختر العميل" required />
          <SelectField label="القضية المرتبطة" value={form.caseRef} onChange={(v) => setForm({ ...form, caseRef: v })} options={caseTitles} placeholder="اختر القضية" />
          <div className="sm:col-span-2"><SelectField label="بند الفاتورة" value={form.item} onChange={(v) => setForm({ ...form, item: v })} options={invoiceItems} placeholder="اختر البند" /></div>
        </FormSection>
        <FormSection title="المبالغ والتواريخ">
          <Field label="المبلغ (ج.م)"><input type="number" min={0} className={fieldCls} value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required /></Field>
          <Field label="الضريبة (%)"><input type="number" min={0} max={100} className={fieldCls} value={form.tax} onChange={(e) => setForm({ ...form, tax: e.target.value })} /></Field>
          <Field label="تاريخ الإصدار"><input className={fieldCls} placeholder="6 يونيو 2026" value={form.issueDate} onChange={(e) => setForm({ ...form, issueDate: e.target.value })} /></Field>
          <Field label="تاريخ الاستحقاق"><input className={fieldCls} placeholder="15 يونيو 2026" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} /></Field>
          <SelectField label="الحالة" value={form.status} onChange={(v) => setForm({ ...form, status: v })} options={["معلقة", "مدفوعة", "متأخرة"]} placeholder="اختر الحالة" />
        </FormSection>
        <div>
          <h3 className="mb-4 border-b border-white/10 pb-2 text-sm font-bold text-gold">ملاحظات</h3>
          <Field label="ملاحظات الفاتورة"><textarea rows={3} className={fieldCls} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></Field>
        </div>
      </FormPage>
    );
  }

  if (viewing) {
    const inv = viewing;
    const taxAmount = inv.tax ? Math.round(inv.amount * inv.tax / 100) : 0;
    const linkedCase = dashCases.find((cs) => cs.title === inv.caseRef);
    return (
      <DetailPage title={inv.number} subtitle={inv.client} icon={Receipt} onBack={() => setViewingId(null)}
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => generateInvoicePdf(inv)}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-gold px-4 py-2 text-sm font-bold text-navy-deep shadow-gold transition-transform hover:scale-[1.02]"
            >
              <ArrowDownToLine className="h-4 w-4" /> تحميل / إرسال PDF
            </button>
            <StatusChanger value={inv.status} options={["معلقة", "مدفوعة", "متأخرة"]} onChange={(v) => changeStatus(inv.id, v)} />
          </div>
        }>
        <div className={card}>
          <div className="flex items-center justify-between">
            <span className="text-sm text-cream/60">الإجمالي المستحق</span>
            <span className="text-2xl font-extrabold text-gradient-gold">{(inv.amount + taxAmount).toLocaleString()} ج.م</span>
          </div>
        </div>
        <DetailGrid title="بيانات الفاتورة">
          <DetailItem label="العميل" value={inv.client} />
          <DetailItem label="الحالة" value={inv.status} />
          <DetailItem label="بند الفاتورة" value={inv.item} />
          <DetailItem label="القضية المرتبطة" value={inv.caseRef} full />
        </DetailGrid>
        <DetailGrid title="المبالغ والتواريخ">
          <DetailItem label="المبلغ" value={`${inv.amount.toLocaleString()} ج.م`} />
          <DetailItem label="الضريبة" value={inv.tax ? `${inv.tax}% (${taxAmount.toLocaleString()} ج.م)` : undefined} />
          <DetailItem label="تاريخ الإصدار" value={inv.issueDate ?? inv.date} />
          <DetailItem label="تاريخ الاستحقاق" value={inv.dueDate} />
        </DetailGrid>
        {linkedCase && <LinkedCaseGrid linkedCase={linkedCase} />}
        {inv.notes && (
          <div className={card}>
            <h3 className="mb-3 border-b border-white/10 pb-2 text-sm font-bold text-gold">ملاحظات</h3>
            <p className="text-sm leading-relaxed text-cream/85">{inv.notes}</p>
          </div>
        )}
        <CommentsPanel comments={comments[inv.id] ?? []} onAdd={(t) => addComment(inv.id, t)} />
      </DetailPage>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-navy-card/60 p-6"><p className="text-sm text-cream/60">إجمالي الفواتير</p><p className="mt-2 text-2xl font-extrabold text-cream">{total.toLocaleString()} ج.م</p></div>
        <div className="rounded-xl border border-white/10 bg-navy-card/60 p-6"><p className="text-sm text-cream/60">محصّلة</p><p className="mt-2 text-2xl font-extrabold text-emerald-400">{paid.toLocaleString()} ج.م</p></div>
        <div className="rounded-xl border border-white/10 bg-navy-card/60 p-6"><p className="text-sm text-cream/60">مستحقة</p><p className="mt-2 text-2xl font-extrabold text-gold">{(total - paid).toLocaleString()} ج.م</p></div>
      </div>
      <div className={card}>
        <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-cream"><Receipt className="h-5 w-5 text-gold" /> الفواتير</h2>
        <Toolbar search={search} setSearch={setSearch} placeholder="ابحث في الفواتير..." filter={filter} setFilter={setFilter}
          options={[{ value: "all", label: "كل الحالات" }, { value: "مدفوعة", label: "مدفوعة" }, { value: "معلقة", label: "معلقة" }, { value: "متأخرة", label: "متأخرة" }]}
          onAdd={() => setAdding(true)} addLabel="إنشاء فاتورة" />
        <div className="space-y-3">
          {filtered.map((inv) => (
            <div key={inv.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-navy-deep/50 p-4 transition-colors hover:border-gold/30">
              <div><p className="font-bold text-cream">{inv.number}</p><p className="mt-0.5 text-sm text-cream/60">{inv.client} — {inv.date}</p></div>
              <div className="flex items-center gap-4">
                <span className="font-extrabold text-cream">{inv.amount.toLocaleString()} ج.م</span>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor[inv.status]}`}>{inv.status}</span>
                <ViewButton onClick={() => setViewingId(inv.id)} />
              </div>
            </div>
          ))}
          {filtered.length === 0 && <p className="py-6 text-center text-sm text-cream/50">لا توجد نتائج.</p>}
        </div>
      </div>
    </div>
  );
}

/* ---------- Wallet ---------- */
const walletMethods = ["فودافون كاش", "أورنج كاش", "اتصالات كاش", "إنستا باي"];
function WalletPanel() {
  return <WalletPanelImpl />;
}

/* ---------- Documents ---------- */
type DocSourceKind = "case" | "client";
type DocKind = DocSourceKind | "manual";
interface DocRow { id: string; name: string; sourceName: string; sourceKind: DocKind; sourceId?: string; category: string; }

/* Document categories (sections) */
const docCategories = ["عقود", "مذكرات", "أحكام", "توكيلات", "تقارير", "أخرى"];

/* Infer a category from the file name */
function inferCategory(name: string): string {
  const n = name;
  if (n.includes("عقد") || n.includes("اتفاق") || n.includes("التأسيس")) return "عقود";
  if (n.includes("مذكرة") || n.includes("لائحة") || n.includes("صحيفة")) return "مذكرات";
  if (n.includes("حكم") || n.includes("قرار") || n.includes("محضر")) return "أحكام";
  if (n.includes("توكيل")) return "توكيلات";
  if (n.includes("تقرير") || n.includes("كشف") || n.includes("طبي")) return "تقارير";
  return "أخرى";
}

function Documents() {
  const { go } = useDashNav();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [adding, setAdding] = useState(false);
  const [manual, setManual] = useState<DocRow[]>([]);

  // Add-document form state
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState(docCategories[0]);
  const [newSource, setNewSource] = useState("");

  const baseRows: DocRow[] = [
    ...dashCases.flatMap((c) => (c.files ?? []).map((f, i) => ({ id: `case-${c.id}-${i}`, name: f, sourceName: c.title, sourceKind: "case" as DocKind, sourceId: c.id, category: inferCategory(f) }))),
    ...dashClients.flatMap((cl) => (cl.files ?? []).map((f, i) => ({ id: `client-${cl.id}-${i}`, name: f, sourceName: cl.name, sourceKind: "client" as DocKind, sourceId: cl.id, category: inferCategory(f) }))),
  ];
  const rows = [...manual, ...baseRows];

  const filtered = rows.filter((r) =>
    (filter === "all" || r.category === filter) &&
    (r.name.includes(search) || r.sourceName.includes(search))
  );

  const addDocument = (e: React.FormEvent) => {
    e.preventDefault();
    const name = newName.trim();
    if (!name) return;
    const finalName = /\.\w{2,5}$/.test(name) ? name : `${name}.pdf`;
    setManual((prev) => [
      { id: `manual-${Date.now()}`, name: finalName, sourceName: newSource.trim() || "مستند عام", sourceKind: "manual", category: newCategory },
      ...prev,
    ]);
    setNewName(""); setNewSource(""); setNewCategory(docCategories[0]); setAdding(false);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-navy-card/60 p-6"><p className="text-sm text-cream/60">إجمالي المستندات</p><p className="mt-2 text-2xl font-extrabold text-cream">{rows.length}</p></div>
        <div className="rounded-xl border border-white/10 bg-navy-card/60 p-6"><p className="text-sm text-cream/60">مستندات القضايا</p><p className="mt-2 text-2xl font-extrabold text-gold">{rows.filter((r) => r.sourceKind === "case").length}</p></div>
        <div className="rounded-xl border border-white/10 bg-navy-card/60 p-6"><p className="text-sm text-cream/60">مستندات العملاء</p><p className="mt-2 text-2xl font-extrabold text-emerald-400">{rows.filter((r) => r.sourceKind === "client").length}</p></div>
      </div>

      {/* Category sections overview */}
      <div className={card}>
        <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-cream"><FolderOpen className="h-5 w-5 text-gold" /> أقسام المستندات</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <button type="button" onClick={() => setFilter("all")} className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 transition-colors ${filter === "all" ? "border-gold bg-gold/10 text-gold" : "border-white/10 bg-navy-deep/50 text-cream/75 hover:border-gold/40"}`}>
            <FolderOpen className="h-5 w-5" />
            <span className="text-xs font-bold">الكل</span>
            <span className="text-[11px] text-cream/50">{rows.length}</span>
          </button>
          {docCategories.map((cat) => {
            const count = rows.filter((r) => r.category === cat).length;
            return (
              <button key={cat} type="button" onClick={() => setFilter(cat)} className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 transition-colors ${filter === cat ? "border-gold bg-gold/10 text-gold" : "border-white/10 bg-navy-deep/50 text-cream/75 hover:border-gold/40"}`}>
                <ScrollText className="h-5 w-5" />
                <span className="text-xs font-bold">{cat}</span>
                <span className="text-[11px] text-cream/50">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className={card}>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-lg font-bold text-cream"><FileText className="h-5 w-5 text-gold" /> المستندات {filter !== "all" && <span className="text-sm font-medium text-gold">— {filter}</span>}</h2>
          <button type="button" onClick={() => setAdding(true)} className="flex items-center gap-1.5 rounded-lg bg-gradient-gold px-4 py-2 text-sm font-bold text-navy shadow-gold transition-transform hover:-translate-y-0.5"><Plus className="h-4 w-4" /> إضافة مستند</button>
        </div>
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="ابحث في المستندات..." className={`${fieldCls} pr-9`} />
          </div>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className={`${fieldCls} sm:w-44`}>
            <option value="all" className="bg-navy-deep">كل الأقسام</option>
            {docCategories.map((cat) => <option key={cat} value={cat} className="bg-navy-deep">{cat}</option>)}
          </select>
        </div>
        <div className="space-y-3">
          {filtered.map((r) => (
            <div key={r.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-navy-deep/50 p-4 transition-colors hover:border-gold/30">
              <button type="button" onClick={() => openDocument(r.name)} className="flex min-w-0 items-center gap-3 text-start">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/15 text-gold"><FileText className="h-5 w-5" /></span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-bold text-cream">{r.name}</span>
                  <span className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-cream/55">
                    <span className="rounded-full bg-gold/10 px-2 py-0.5 text-[10px] font-semibold text-gold">{r.category}</span>
                    {r.sourceKind === "manual" ? "مرفوع يدويًا" : `${r.sourceKind === "case" ? "قضية" : "عميل"}: ${r.sourceName}`}
                  </span>
                </span>
              </button>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => openDocument(r.name)} className="flex h-9 items-center gap-1.5 rounded-lg bg-gradient-gold px-3 text-xs font-bold text-navy shadow-gold transition-transform hover:-translate-y-0.5"><Eye className="h-4 w-4" /> فتح</button>
                {r.sourceKind === "manual" ? (
                  <button type="button" onClick={() => setManual((prev) => prev.filter((m) => m.id !== r.id))} className="flex h-9 items-center gap-1.5 rounded-lg border border-white/15 px-3 text-xs font-semibold text-cream/80 transition-colors hover:border-red-400 hover:text-red-400"><X className="h-3.5 w-3.5" /> حذف</button>
                ) : (
                  <button type="button" onClick={() => go(r.sourceKind === "case" ? "cases" : "clients", r.sourceId!)} className="flex h-9 items-center gap-1.5 rounded-lg border border-white/15 px-3 text-xs font-semibold text-cream/80 transition-colors hover:border-gold hover:text-gold">
                    {r.sourceKind === "case" ? <Briefcase className="h-3.5 w-3.5" /> : <Users className="h-3.5 w-3.5" />} المصدر
                  </button>
                )}
              </div>
            </div>
          ))}
          {filtered.length === 0 && <p className="py-6 text-center text-sm text-cream/50">لا توجد مستندات.</p>}
        </div>
      </div>

      {adding && (
        <Modal title="إضافة مستند جديد" onClose={() => setAdding(false)}>
          <form onSubmit={addDocument} className="space-y-4">
            <Field label="اسم المستند">
              <input value={newName} onChange={(e) => setNewName(e.target.value)} className={fieldCls} placeholder="مثال: عقد إيجار محل تجاري" required />
            </Field>
            <Field label="القسم">
              <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className={fieldCls}>
                {docCategories.map((cat) => <option key={cat} value={cat} className="bg-navy-deep">{cat}</option>)}
              </select>
            </Field>
            <Field label="المصدر / الجهة (اختياري)">
              <input value={newSource} onChange={(e) => setNewSource(e.target.value)} className={fieldCls} placeholder="مثال: قضية فلان أو اسم العميل" />
            </Field>
            <Field label="رفع الملف">
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-white/25 bg-navy-deep px-3 py-4 text-sm text-cream/60 transition-colors hover:border-gold hover:text-gold">
                <Upload className="h-4 w-4" /> اضغط لاختيار ملف
                <input type="file" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) setNewName(f.name); }} />
              </label>
            </Field>
            <div className="flex gap-3 pt-1">
              <button type="button" onClick={() => setAdding(false)} className="flex-1 rounded-lg border border-white/15 py-2.5 text-sm font-semibold text-cream hover:bg-white/5">إلغاء</button>
              <button type="submit" className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-gold py-2.5 text-sm font-bold text-navy shadow-gold"><Plus className="h-4 w-4" /> إضافة المستند</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

/* ============================ المكتبة القانونية ============================ */
function Library() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [openBook, setOpenBook] = useState<LibraryBook | null>(null);

  const results = useMemo(() => {
    const bySearch = searchLibrary(search);
    return category === "all" ? bySearch : bySearch.filter((b) => b.category === category);
  }, [search, category]);

  if (openBook) {
    return <BookReader book={openBook} onBack={() => setOpenBook(null)} />;
  }

  const totalArticles = libraryBooks.reduce((n, b) => n + b.articlesCount, 0);

  return (
    <div className="space-y-6">
      {/* Intro / stats */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-gradient-navy p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="flex items-center gap-2 text-xl font-extrabold text-gradient-gold md:text-2xl">
              <LibraryIcon className="h-6 w-6 text-gold" /> المكتبة القانونية
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-cream/70">
              مرجعك القانوني الكامل داخل المنصة — اقرأ أهم القوانين والتشريعات المصرية بتصميم مريح،
              مع فهرس للمواد وبحث فوري داخل كل كتاب.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="rounded-xl border border-white/10 bg-navy-card/60 px-5 py-3 text-center">
              <p className="text-2xl font-extrabold text-gold">{libraryBooks.length}</p>
              <p className="text-xs text-cream/60">كتاب وقانون</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-navy-card/60 px-5 py-3 text-center">
              <p className="text-2xl font-extrabold text-cream">{totalArticles}</p>
              <p className="text-xs text-cream/60">مادة قانونية</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search + categories */}
      <div className={card}>
        <div className="relative mb-4">
          <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث عن قانون، مادة، أو موضوع..."
            className={`${fieldCls} pr-9`}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory("all")}
            className={`rounded-full px-4 py-1.5 text-xs font-bold transition-colors ${
              category === "all" ? "bg-gradient-gold text-navy shadow-gold" : "border border-white/10 bg-navy-deep/50 text-cream/75 hover:border-gold/40"
            }`}
          >
            الكل
          </button>
          {libraryCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-colors ${
                category === cat ? "bg-gradient-gold text-navy shadow-gold" : "border border-white/10 bg-navy-deep/50 text-cream/75 hover:border-gold/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Books grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((book) => (
          <button
            key={book.id}
            type="button"
            onClick={() => setOpenBook(book)}
            className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-navy-card/60 text-right transition-all hover:-translate-y-1 hover:border-gold/40 hover:shadow-card"
          >
            <div className="relative flex h-44 flex-col items-center justify-center overflow-hidden border-b border-gold/20 bg-gradient-navy p-5 text-center">
              <div className="absolute inset-0 pattern-grid opacity-20" />
              {/* إطار مفرّغ أنيق */}
              <div className="pointer-events-none absolute inset-3 rounded-lg border border-gold/25" />
              <div className="pointer-events-none absolute inset-[14px] rounded-md border border-gold/10" />
              {/* اسم المنصة بخط مفرّغ */}
              <span
                className="relative font-logo text-4xl font-extrabold leading-none tracking-tight text-transparent"
                style={{ WebkitTextStroke: "1.1px oklch(0.76 0.1 80)" }}
              >
                محامٍ
              </span>
              <span className="relative mt-1.5 text-[9px] font-semibold uppercase tracking-[0.3em] text-gold/70">
                المكتبة القانونية
              </span>
              <span className="relative mx-auto mt-3 line-clamp-2 max-w-[85%] text-sm font-bold text-cream/90">
                {book.title}
              </span>
              <span className="absolute right-3 top-3 rounded-full border border-gold/20 bg-black/25 px-2 py-0.5 text-[10px] font-semibold text-cream/85 backdrop-blur">
                {book.year}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-base font-extrabold text-cream group-hover:text-gold">{book.title}</h3>
              <p className="mt-1 text-xs text-cream/55">{book.authority}</p>
              <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-cream/70">{book.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {book.tags.slice(0, 3).map((t) => (
                  <span key={t} className="rounded-full bg-gold/10 px-2 py-0.5 text-[10px] font-semibold text-gold">{t}</span>
                ))}
              </div>
              <span className="mt-2 flex items-center gap-1 text-[10px] font-semibold text-emerald-400">
                <BookOpen className="h-3 w-3" /> يُقرأ كاملًا داخل المنصة
              </span>
              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                <span className="text-[11px] text-cream/50">{book.articlesCount} مادة · {book.pages} صفحة</span>
                <span className="flex items-center gap-1.5 text-xs font-bold text-gold">
                  اقرأ الكتاب <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </button>
        ))}
        {results.length === 0 && (
          <p className="col-span-full py-12 text-center text-sm text-cream/50">لا توجد نتائج مطابقة لبحثك.</p>
        )}
      </div>
    </div>
  );
}

const BOOKMARKS_KEY = "muhamik_library_bookmarks";

function BookReader({ book, onBack }: { book: LibraryBook; onBack: () => void }) {
  const [fontSize, setFontSize] = useState(17);
  const [query, setQuery] = useState("");
  const [tocOpen, setTocOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(`${BOOKMARKS_KEY}_${book.id}`);
      if (raw) setBookmarks(JSON.parse(raw));
    } catch { /* ignore */ }
  }, [book.id]);

  const toggleBookmark = (key: string) => {
    setBookmarks((prev) => {
      const next = prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key];
      try { localStorage.setItem(`${BOOKMARKS_KEY}_${book.id}`, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  };

  const q = query.trim();
  const filteredChapters = useMemo(() => {
    if (!q) return book.chapters;
    return book.chapters
      .map((c) => ({
        ...c,
        articles: c.articles.filter((a) => a.text.includes(q) || a.num === q || (a.title ?? "").includes(q)),
      }))
      .filter((c) => c.articles.length > 0);
  }, [book.chapters, q]);

  const matchCount = filteredChapters.reduce((n, c) => n + c.articles.length, 0);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setTocOpen(false);
  };

  const highlight = (text: string) => {
    if (!q) return text;
    const parts = text.split(q);
    return parts.map((part, i) => (
      <span key={i}>
        {part}
        {i < parts.length - 1 && <mark className="rounded bg-gold/40 text-cream">{q}</mark>}
      </span>
    ));
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-cream transition-colors hover:bg-white/5 hover:text-gold">
            <ArrowRight className="h-5 w-5" />
          </button>
          <div>
            <h2 className="flex items-center gap-2 text-lg font-bold text-cream"><BookOpen className="h-5 w-5 text-gold" /> {book.title}</h2>
            <p className="mt-0.5 text-sm text-cream/55">{book.authority} · {book.year}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setTocOpen((v) => !v)}
            className="flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-2 text-xs font-semibold text-cream transition-colors hover:border-gold hover:text-gold lg:hidden"
          >
            <List className="h-4 w-4" /> الفهرس
          </button>
          <div className="flex items-center rounded-lg border border-white/15">
            <button type="button" onClick={() => setFontSize((s) => Math.max(14, s - 1))} className="px-2.5 py-2 text-cream/70 hover:text-gold"><Minus className="h-4 w-4" /></button>
            <span className="px-1 text-xs font-bold text-cream/60">حجم الخط</span>
            <button type="button" onClick={() => setFontSize((s) => Math.min(26, s + 1))} className="px-2.5 py-2 text-cream/70 hover:text-gold"><Plus className="h-4 w-4" /></button>
          </div>
        </div>
      </div>

      <div className="lg:flex lg:gap-6">
        {/* TOC sidebar */}
        <aside className={`${tocOpen ? "block" : "hidden"} mb-5 lg:mb-0 lg:block lg:w-64 lg:shrink-0`}>
          <div className="sticky top-4 rounded-2xl border border-white/10 bg-navy-card/60 p-4">
            <p className="mb-3 flex items-center gap-2 text-sm font-bold text-gold"><List className="h-4 w-4" /> فهرس المواد</p>
            <div className="max-h-[60vh] space-y-3 overflow-y-auto pl-1">
              {book.chapters.map((c, ci) => (
                <div key={ci}>
                  <p className="mb-1 text-xs font-bold text-cream/80">{c.title}</p>
                  <ul className="space-y-0.5">
                    {c.articles.map((a) => {
                      const id = `art-${ci}-${a.num}`;
                      return (
                        <li key={id}>
                          <button
                            type="button"
                            onClick={() => scrollTo(id)}
                            className="flex w-full items-center gap-1.5 rounded-md px-2 py-1 text-right text-xs text-cream/60 transition-colors hover:bg-white/5 hover:text-gold"
                          >
                            {bookmarks.includes(id) && <Bookmark className="h-3 w-3 shrink-0 fill-gold text-gold" />}
                            <span className="truncate">مادة {a.num}{a.title ? ` — ${a.title}` : ""}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Reading pane */}
        <div className="min-w-0 flex-1 space-y-4">
          <div className="relative">
            <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`ابحث داخل ${book.title}...`}
              className={`${fieldCls} pr-9`}
            />
            {q && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-cream/50">{matchCount} نتيجة</span>}
          </div>

          <div ref={contentRef} className="rounded-2xl border border-white/10 bg-[oklch(0.97_0.012_85)] p-6 text-[oklch(0.22_0.05_264)] shadow-card md:p-10">
            {/* Title page header */}
            <div className="mb-8 border-b-2 border-gold/40 pb-6 text-center">
              <p className="font-logo text-sm font-bold tracking-wide text-[oklch(0.5_0.08_70)]">منصة محامٍ — المكتبة القانونية</p>
              <h1 className="mt-2 text-2xl font-extrabold md:text-3xl">{book.title}</h1>
              <p className="mt-2 text-sm text-[oklch(0.4_0.03_264)]">{book.authority} · {book.year}</p>
            </div>

            {filteredChapters.map((c, ci) => {
              const origCi = book.chapters.findIndex((x) => x.title === c.title);
              return (
                <section key={ci} className="mb-8">
                  <h2 className="mb-4 rounded-lg bg-[oklch(0.94_0.02_85)] px-4 py-2 text-lg font-extrabold text-[oklch(0.3_0.06_264)]">{c.title}</h2>
                  <div className="space-y-6">
                    {c.articles.map((a) => {
                      const id = `art-${origCi}-${a.num}`;
                      const marked = bookmarks.includes(id);
                      return (
                        <article key={id} id={id} className="scroll-mt-20">
                          <div className="mb-1.5 flex items-center justify-between gap-2">
                            <h3 className="flex items-center gap-2 text-base font-bold text-[oklch(0.45_0.09_70)]">
                              <span className="rounded-md bg-[oklch(0.55_0.10_80)] px-2 py-0.5 text-sm text-white">مادة {a.num}</span>
                              {a.title && <span>{a.title}</span>}
                            </h3>
                            <button
                              type="button"
                              onClick={() => toggleBookmark(id)}
                              className={`shrink-0 rounded-md p-1.5 transition-colors ${marked ? "text-[oklch(0.55_0.10_80)]" : "text-[oklch(0.6_0.02_264)] hover:text-[oklch(0.55_0.10_80)]"}`}
                              aria-label="حفظ المادة"
                            >
                              <Bookmark className={`h-4 w-4 ${marked ? "fill-current" : ""}`} />
                            </button>
                          </div>
                          <div style={{ fontSize, lineHeight: 2 }} className="space-y-2 text-justify text-[oklch(0.28_0.04_264)]">
                            {a.text.split("\n").filter((p) => p.trim()).map((para, pi) => (
                              <p key={pi}>{highlight(para)}</p>
                            ))}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              );
            })}

            {filteredChapters.length === 0 && (
              <p className="py-10 text-center text-sm text-[oklch(0.5_0.03_264)]">لا توجد مواد مطابقة لبحثك داخل هذا الكتاب.</p>
            )}

            {book.source && !q && (
              <p className="mt-8 text-center text-xs text-[oklch(0.5_0.03_264)]">
                المصدر: {book.source.label}
              </p>
            )}

            <div className="mt-10 border-t border-[oklch(0.88_0.01_85)] pt-6 text-center text-xs text-[oklch(0.5_0.03_264)]">
              — تمّت قراءة هذا المحتوى داخل منصة محامٍ —
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WalletPanelImpl() {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState(walletMethods[0]);
  const [account, setAccount] = useState("");
  const [done, setDone] = useState(false);
  const submit = (e: React.FormEvent) => { e.preventDefault(); setDone(true); };
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-gold/30 bg-gradient-navy p-7 lg:col-span-1">
          <p className="text-sm text-cream/65">الرصيد المتاح</p>
          <p className="mt-2 text-3xl font-extrabold text-gradient-gold">{walletBalance.toLocaleString()} ج.م</p>
          <button onClick={() => { setOpen(true); setDone(false); }} className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-gold py-3 text-sm font-bold text-navy shadow-gold transition-transform hover:-translate-y-0.5">
            <ArrowDownToLine className="h-4 w-4" /> طلب سحب
          </button>
        </div>
        <div className={`${card} lg:col-span-2`}>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-cream"><Wallet className="h-5 w-5 text-gold" /> آخر العمليات</h2>
          <div className="space-y-3">
            {walletTransactions.map((t) => (
              <div key={t.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-navy-deep/50 p-4">
                <div><p className="text-sm font-semibold text-cream">{t.label}</p><p className="mt-0.5 text-xs text-cream/50">{t.date}</p></div>
                <span className={`text-sm font-bold ${t.amount > 0 ? "text-emerald-400" : "text-red-400"}`}>{t.amount > 0 ? "+" : "-"}{Math.abs(t.amount).toLocaleString()} ج.م</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {open && (
        <Modal title="طلب سحب الأرباح" onClose={() => setOpen(false)}>
          {done ? (
            <div className="py-6 text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-gold" />
              <h3 className="mt-4 text-lg font-bold text-cream">تم استلام طلب السحب</h3>
              <p className="mt-2 text-sm text-cream/65">سيتم تحويل المبلغ إلى {method} خلال 24 ساعة.</p>
              <button onClick={() => setOpen(false)} className="mt-6 rounded-lg bg-gradient-gold px-6 py-2.5 text-sm font-bold text-navy">تم</button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <Field label="المبلغ (ج.م)">
                <input type="number" required min={1} max={walletBalance} value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0" className={fieldCls} />
                <p className="mt-1 text-xs text-cream/45">الحد الأقصى {walletBalance.toLocaleString()} ج.م</p>
              </Field>
              <div>
                <span className="mb-1.5 block text-sm font-medium text-cream/80">المحفظة الإلكترونية</span>
                <div className="grid grid-cols-2 gap-2">
                  {walletMethods.map((m) => (
                    <button type="button" key={m} onClick={() => setMethod(m)} className={`flex items-center justify-center gap-1.5 rounded-lg border px-2 py-2.5 text-xs font-semibold transition-colors ${method === m ? "border-gold bg-gold/10 text-gold" : "border-white/15 text-cream/70"}`}>
                      <Wallet className="h-3.5 w-3.5" /> {m}
                    </button>
                  ))}
                </div>
              </div>
              <Field label="رقم المحفظة">
                <input required value={account} onChange={(e) => setAccount(e.target.value)} placeholder={method === "إنستا باي" ? "example@instapay" : "01XXXXXXXXX"} className={fieldCls} />
              </Field>
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setOpen(false)} className="flex-1 rounded-lg border border-white/15 py-2.5 text-sm font-semibold text-cream">إلغاء</button>
                <button type="submit" className="flex-1 rounded-lg bg-gradient-gold py-2.5 text-sm font-bold text-navy shadow-gold">تأكيد السحب</button>
              </div>
            </form>
          )}
        </Modal>
      )}
    </div>
  );
}

/* ---------- Legal AI ---------- */
interface ChatMsg { role: "user" | "ai"; text: string; }
const suggestions = [
  "صياغة مذكرة دفاع في قضية نفقة",
  "ما هي إجراءات رفع دعوى تعويض إصابة عمل؟",
  "لخّص لي بنود عقد الشراكة التجارية",
];
function LegalAI() {
  const greeting: ChatMsg = { role: "ai", text: "مرحباً، أنا المساعد القانوني الذكي. كيف يمكنني مساعدتك في قضاياك اليوم؟" };
  const [activeConv, setActiveConv] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMsg[]>([greeting]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const loadConv = (id: string) => {
    const conv = aiConversations.find((c) => c.id === id);
    if (conv) { setActiveConv(id); setMessages(conv.messages); }
  };
  const newChat = () => { setActiveConv(null); setMessages([greeting]); };

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || loading) return;
    const history = [...messages, { role: "user" as const, text: q }];
    setMessages(history);
    setInput("");
    setLoading(true);
    try {
      // Send only the recent turns to keep token usage low.
      const payload = history.filter((m) => m.text !== greeting.text).slice(-8);
      const resp = await fetch(aiUrl("/api/legal"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payload }),
      });
      const res = (await resp.json()) as { reply?: string };
      setMessages((m) => [
        ...m,
        { role: "ai", text: res.reply || "تعذّر الاتصال بالمساعد القانوني، حاول مرة أخرى." },
      ]);
    } catch {
      setMessages((m) => [...m, { role: "ai", text: "تعذّر الاتصال بالمساعد القانوني، حاول مرة أخرى." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-4">
      <div className={`${card} lg:col-span-1`}>
        <button onClick={newChat} className="mb-4 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-gold py-2.5 text-sm font-bold text-navy shadow-gold">
          <Plus className="h-4 w-4" /> محادثة جديدة
        </button>
        <p className="mb-2 text-xs font-semibold text-cream/50">المحادثات السابقة</p>
        <div className="space-y-2">
          {aiConversations.map((c) => (
            <button key={c.id} onClick={() => loadConv(c.id)} className={`w-full rounded-xl border p-3 text-start transition-colors ${activeConv === c.id ? "border-gold/50 bg-gold/10" : "border-white/10 bg-navy-deep/50 hover:border-gold/30"}`}>
              <p className="flex items-center gap-2 text-sm font-semibold text-cream"><MessageSquare className="h-3.5 w-3.5 text-gold" /> {c.title}</p>
              <p className="mt-1 text-xs text-cream/45">{c.date}</p>
            </button>
          ))}
        </div>
      </div>

      <div className={`${card} flex h-[600px] flex-col lg:col-span-3`}>
        <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-cream"><Sparkles className="h-5 w-5 text-gold" /> الذكاء الاصطناعي القانوني</h2>
        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto pr-1">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-start" : "justify-end"}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.role === "user" ? "whitespace-pre-line bg-gradient-gold text-navy" : "border border-white/10 bg-navy-deep/60 text-cream/85"}`}>{m.role === "user" ? m.text : <ChatMarkdown text={m.text} />}</div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-end">
              <div className="flex max-w-[80%] items-center gap-2 rounded-2xl border border-white/10 bg-navy-deep/60 px-4 py-3 text-sm text-cream/60">
                <Sparkles className="h-4 w-4 animate-pulse text-gold" /> يحلّل سؤالك القانوني...
              </div>
            </div>
          )}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button key={s} onClick={() => send(s)} disabled={loading} className="rounded-full border border-gold/30 px-3 py-1.5 text-xs text-cream/75 transition-colors hover:bg-gold/10 hover:text-gold disabled:opacity-50">{s}</button>
          ))}
        </div>
        <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="mt-3 flex gap-2">
          <input value={input} onChange={(e) => setInput(e.target.value)} disabled={loading} placeholder="اكتب سؤالك القانوني..." className={`${fieldCls} flex-1 py-3`} />
          <button type="submit" disabled={loading} className="flex items-center gap-2 rounded-lg bg-gradient-gold px-5 py-3 text-sm font-bold text-navy shadow-gold transition-transform hover:-translate-y-0.5 disabled:opacity-50"><Send className="h-4 w-4" /> إرسال</button>
        </form>
      </div>
    </div>
  );
}