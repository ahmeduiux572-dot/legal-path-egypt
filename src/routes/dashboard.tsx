import { createContext, useContext, useEffect, useState } from "react";
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
} from "lucide-react";
import { lawyers } from "@/data/lawyers";
import { useAuth } from "@/lib/auth";
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

  useEffect(() => {
    if (user === null) navigate({ to: "/login" });
  }, [user, navigate]);

  const go = (s: SectionId, id: string) => {
    setSection(s);
    setRequest({ section: s, id, nonce: Date.now() });
  };

  return (
   <DashNavContext.Provider value={{ go, request }}>
    <div className="bg-navy">
      <section className="bg-gradient-navy">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-10 md:flex-row md:items-center md:px-8">
          <div className="flex items-center gap-4">
            <img src={lawyer.image} alt={lawyer.name} width={64} height={64} className="h-16 w-16 rounded-2xl border border-gold/30 object-cover" />
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
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl gap-8 px-4 py-10 md:px-8 lg:flex">
        <aside className="mb-8 lg:mb-0 lg:w-64 lg:shrink-0">
          <nav className="flex gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-navy-card/60 p-2 lg:flex-col lg:overflow-visible">
            {nav.map((n) => (
              <button
                key={n.id}
                onClick={() => setSection(n.id)}
                className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                  section === n.id ? "bg-gradient-gold text-navy shadow-gold" : "text-cream/75 hover:bg-white/5 hover:text-gold"
                }`}
              >
                <n.icon className="h-4 w-4" />
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
  onAdd: () => void; addLabel: string;
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
      <button onClick={onAdd} className="flex items-center justify-center gap-2 rounded-lg bg-gradient-gold px-4 py-2.5 text-sm font-bold text-navy shadow-gold transition-transform hover:-translate-y-0.5">
        <Plus className="h-4 w-4" /> {addLabel}
      </button>
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
        <div className="mb-5 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-bold text-cream"><UserCircle className="h-5 w-5 text-gold" /> الملف الشخصي العام</h2>
          <div className="flex items-center gap-2">
            <Link to="/lawyers/$lawyerId" params={{ lawyerId: lawyer.id }} className="rounded-md border border-white/15 px-3 py-2 text-xs font-semibold text-cream hover:bg-white/5">عرض على الموقع</Link>
            {!editing && (
              <button onClick={() => setEditing(true)} className="flex items-center gap-2 rounded-md bg-gradient-gold px-4 py-2 text-xs font-bold text-navy shadow-gold"><Pencil className="h-3.5 w-3.5" /> تعديل</button>
            )}
          </div>
        </div>
        {saved && <p className="mb-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">تم حفظ بيانات الملف بنجاح وستظهر على الموقع.</p>}

        <div className="mb-6 flex items-center gap-4">
          <img src={lawyer.image} alt={data.name} width={72} height={72} className="h-18 w-18 rounded-2xl border border-gold/30 object-cover" />
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
  const { request } = useDashNav();
  const [search, setSearch] = useState("");
  const [adding, setAdding] = useState(false);
  const [viewingId, setViewingId] = useState<string | null>(null);
  const [comments, setComments] = useState<Record<string, DashComment[]>>({});
  const [reminders, setReminders] = useState<DashReminder[]>(dashReminders);
  const [reminderModal, setReminderModal] = useState<{ day: number } | null>(null);
  const [reminderText, setReminderText] = useState("");
  const [reminderUrgent, setReminderUrgent] = useState(false);
  const [consultationModal, setConsultationModal] = useState<DashConsultation | null>(null);
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
  const today = 6;

  const handleDayClick = (day: number) => {
    const co = consultationByDay.get(day);
    if (co) { setConsultationModal(co); return; }
    setReminderModal({ day });
    setReminderText("");
    setReminderUrgent(false);
  };
  const addReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reminderModal || !reminderText.trim()) return;
    setReminders((p) => [{ id: `r${Date.now()}`, text: reminderText.trim(), due: `${reminderModal.day} يونيو 2026`, urgent: reminderUrgent }, ...p]);
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
            const isToday = day === today;
            return (
              <button key={day} type="button" onClick={() => handleDayClick(day)}
                title={consultation ? "عرض الاستشارة" : "إضافة تذكير"}
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
          <p className="mb-3 text-xs text-cream/45">اضغط على أي يوم في التقويم لإضافة تذكير، أو على يوم به استشارة لعرض تفاصيلها.</p>
          <div className="space-y-3">
            {reminders.map((r) => (
              <div key={r.id} className="flex items-start gap-3 rounded-xl border border-white/10 bg-navy-deep/50 p-3">
                {r.urgent ? <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" /> : <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />}
                <div><p className="text-sm text-cream">{r.text}</p><p className="mt-1 text-xs text-cream/50">{r.due}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {reminderModal && (
        <Modal title={`إضافة تذكير — ${reminderModal.day} يونيو 2026`} onClose={() => setReminderModal(null)}>
          <form onSubmit={addReminder} className="space-y-4">
            <Field label="نص التذكير"><textarea rows={3} className={fieldCls} value={reminderText} onChange={(e) => setReminderText(e.target.value)} placeholder="مثال: تسليم مذكرة دفاع..." required /></Field>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-cream/80">
              <input type="checkbox" checked={reminderUrgent} onChange={(e) => setReminderUrgent(e.target.checked)} className="h-4 w-4 accent-gold" /> تذكير عاجل
            </label>
            <div className="flex gap-3">
              <button type="button" onClick={() => setReminderModal(null)} className="flex-1 rounded-lg border border-white/15 py-2.5 text-sm font-semibold text-cream hover:bg-white/5">إلغاء</button>
              <button type="submit" className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-gold py-2.5 text-sm font-bold text-navy shadow-gold"><Plus className="h-4 w-4" /> إضافة التذكير</button>
            </div>
          </form>
        </Modal>
      )}

      {consultationModal && (
        <Modal title="تفاصيل الاستشارة" onClose={() => setConsultationModal(null)}>
          <div className="space-y-3">
            <div>
              <p className="text-lg font-bold text-cream">{consultationModal.subject}</p>
              <p className="mt-0.5 text-sm text-cream/60">{consultationModal.client}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Info label="التاريخ" value={consultationModal.date} />
              <Info label="الوقت" value={consultationModal.time} />
              <Info label="القناة" value={consultationModal.channel} />
              <Info label="الحالة" value={consultationModal.status} />
              {consultationModal.duration && <Info label="المدة" value={consultationModal.duration} />}
              <Info label="السعر" value={`${consultationModal.price.toLocaleString()} ج.م`} />
            </div>
            {consultationModal.caseRef && <Info label="القضية المرتبطة" value={consultationModal.caseRef} />}
            {consultationModal.notes && (
              <div className="rounded-xl border border-white/10 bg-navy-deep/50 p-4">
                <p className="text-xs text-cream/50">ملاحظات</p>
                <p className="mt-1 text-sm leading-relaxed text-cream/85">{consultationModal.notes}</p>
              </div>
            )}
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
  const [adding, setAdding] = useState(false);
  const [viewingId, setViewingId] = useState<string | null>(null);
  const [comments, setComments] = useState<Record<string, DashComment[]>>({});
  const [inCall, setInCall] = useState<DashConsultation | null>(null);
  const emptyForm = { client: "", subject: "", date: "", time: "", channel: "أونلاين", price: "" };
  const [form, setForm] = useState(emptyForm);
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
  const add = (e: React.FormEvent) => {
    e.preventDefault();
    setItems((p) => [{ id: `co${Date.now()}`, client: form.client, subject: form.subject, date: form.date, time: form.time, channel: form.channel as DashConsultation["channel"], status: "قادمة", price: Number(form.price) }, ...p]);
    setForm(emptyForm);
    setAdding(false);
  };

  if (adding) {
    return (
      <FormPage title="إضافة استشارة جديدة" subtitle="حدّد موعد الاستشارة وقناة التواصل" icon={MessageSquare}
        onBack={() => setAdding(false)} onSubmit={add} submitLabel="حفظ الاستشارة">
        <FormSection title="بيانات الاستشارة">
          <SelectField label="العميل" value={form.client} onChange={(v) => setForm({ ...form, client: v })} options={dashClients.map((c) => c.name)} placeholder="اختر العميل" required />
          <SelectField label="القناة" value={form.channel} onChange={(v) => setForm({ ...form, channel: v })} options={["أونلاين", "مكتب", "هاتف"]} placeholder="اختر القناة" />
          <div className="sm:col-span-2"><Field label="الموضوع"><input className={fieldCls} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required /></Field></div>
        </FormSection>
        <FormSection title="الموعد والسعر">
          <Field label="التاريخ"><input className={fieldCls} placeholder="10 يونيو 2026" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required /></Field>
          <Field label="الوقت"><input className={fieldCls} placeholder="11:00 ص" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} required /></Field>
          <Field label="السعر (ج.م)"><input type="number" min={0} className={fieldCls} value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required /></Field>
        </FormSection>
      </FormPage>
    );
  }

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
        options={[{ value: "all", label: "كل الحالات" }, { value: "قادمة", label: "قادمة" }, { value: "مكتملة", label: "مكتملة" }, { value: "ملغاة", label: "ملغاة" }]}
        onAdd={() => setAdding(true)} addLabel="إضافة استشارة" />
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
        actions={<StatusChanger value={inv.status} options={["معلقة", "مدفوعة", "متأخرة"]} onChange={(v) => changeStatus(inv.id, v)} />}>
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
interface DocRow { id: string; name: string; sourceName: string; sourceKind: DocSourceKind; sourceId: string; }
function Documents() {
  const { go } = useDashNav();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const rows: DocRow[] = [
    ...dashCases.flatMap((c) => (c.files ?? []).map((f, i) => ({ id: `case-${c.id}-${i}`, name: f, sourceName: c.title, sourceKind: "case" as DocSourceKind, sourceId: c.id }))),
    ...dashClients.flatMap((cl) => (cl.files ?? []).map((f, i) => ({ id: `client-${cl.id}-${i}`, name: f, sourceName: cl.name, sourceKind: "client" as DocSourceKind, sourceId: cl.id }))),
  ];
  const filtered = rows.filter((r) =>
    (filter === "all" || r.sourceKind === filter) &&
    (r.name.includes(search) || r.sourceName.includes(search))
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-navy-card/60 p-6"><p className="text-sm text-cream/60">إجمالي المستندات</p><p className="mt-2 text-2xl font-extrabold text-cream">{rows.length}</p></div>
        <div className="rounded-xl border border-white/10 bg-navy-card/60 p-6"><p className="text-sm text-cream/60">مستندات القضايا</p><p className="mt-2 text-2xl font-extrabold text-gold">{rows.filter((r) => r.sourceKind === "case").length}</p></div>
        <div className="rounded-xl border border-white/10 bg-navy-card/60 p-6"><p className="text-sm text-cream/60">مستندات العملاء</p><p className="mt-2 text-2xl font-extrabold text-emerald-400">{rows.filter((r) => r.sourceKind === "client").length}</p></div>
      </div>
      <div className={card}>
        <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-cream"><FileText className="h-5 w-5 text-gold" /> المستندات</h2>
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="ابحث في المستندات..." className={`${fieldCls} pr-9`} />
          </div>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className={`${fieldCls} sm:w-44`}>
            <option value="all" className="bg-navy-deep">كل المصادر</option>
            <option value="case" className="bg-navy-deep">مستندات القضايا</option>
            <option value="client" className="bg-navy-deep">مستندات العملاء</option>
          </select>
        </div>
        <div className="space-y-3">
          {filtered.map((r) => (
            <div key={r.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-navy-deep/50 p-4 transition-colors hover:border-gold/30">
              <button type="button" onClick={() => openDocument(r.name)} className="flex min-w-0 items-center gap-3 text-start">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/15 text-gold"><FileText className="h-5 w-5" /></span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-bold text-cream">{r.name}</span>
                  <span className="mt-0.5 block text-xs text-cream/55">{r.sourceKind === "case" ? "قضية" : "عميل"}: {r.sourceName}</span>
                </span>
              </button>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => openDocument(r.name)} className="flex h-9 items-center gap-1.5 rounded-lg bg-gradient-gold px-3 text-xs font-bold text-navy shadow-gold transition-transform hover:-translate-y-0.5"><Eye className="h-4 w-4" /> فتح</button>
                <button type="button" onClick={() => go(r.sourceKind === "case" ? "cases" : "clients", r.sourceId)} className="flex h-9 items-center gap-1.5 rounded-lg border border-white/15 px-3 text-xs font-semibold text-cream/80 transition-colors hover:border-gold hover:text-gold">
                  {r.sourceKind === "case" ? <Briefcase className="h-3.5 w-3.5" /> : <Users className="h-3.5 w-3.5" />} المصدر
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <p className="py-6 text-center text-sm text-cream/50">لا توجد مستندات.</p>}
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

  const loadConv = (id: string) => {
    const conv = aiConversations.find((c) => c.id === id);
    if (conv) { setActiveConv(id); setMessages(conv.messages); }
  };
  const newChat = () => { setActiveConv(null); setMessages([greeting]); };

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
        <div className="flex-1 space-y-4 overflow-y-auto pr-1">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-start" : "justify-end"}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.role === "user" ? "bg-gradient-gold text-navy" : "border border-white/10 bg-navy-deep/60 text-cream/85"}`}>{m.text}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button key={s} onClick={() => send(s)} className="rounded-full border border-gold/30 px-3 py-1.5 text-xs text-cream/75 transition-colors hover:bg-gold/10 hover:text-gold">{s}</button>
          ))}
        </div>
        <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="mt-3 flex gap-2">
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="اكتب سؤالك القانوني..." className={`${fieldCls} flex-1 py-3`} />
          <button type="submit" className="flex items-center gap-2 rounded-lg bg-gradient-gold px-5 py-3 text-sm font-bold text-navy shadow-gold transition-transform hover:-translate-y-0.5"><Send className="h-4 w-4" /> إرسال</button>
        </form>
      </div>
    </div>
  );
}