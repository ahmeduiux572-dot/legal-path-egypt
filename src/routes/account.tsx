import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  UserCircle,
  MessageSquare,
  MapPin,
  Mail,
  Phone,
  CalendarDays,
  Clock,
  Video,
  Building2,
  Plus,
  Save,
  Pencil,
  LayoutDashboard,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  MonitorUp,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import {
  clientProfile,
  clientConsultations,
  type ClientConsultation,
} from "@/data/client";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "حسابي | محام" },
      { name: "description", content: "إدارة ملفك الشخصي واستشاراتك وقضاياك وفواتيرك على منصة محام كعميل." },
      { property: "og:title", content: "حسابي | محام" },
      { property: "og:description", content: "ملف العميل على منصة محام." },
    ],
  }),
  component: AccountPage,
});

type SectionId = "overview" | "profile" | "consultations";

const nav: { id: SectionId; label: string; icon: typeof UserCircle }[] = [
  { id: "overview", label: "الرئيسية", icon: LayoutDashboard },
  { id: "profile", label: "الملف الشخصي", icon: UserCircle },
  { id: "consultations", label: "استشاراتي", icon: MessageSquare },
];

const card = "rounded-2xl border border-white/10 bg-navy-card/60 p-6";
const fieldCls =
  "w-full rounded-lg border border-white/15 bg-navy-deep px-3 py-2.5 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none";

const statusColor: Record<string, string> = {
  "قادمة": "bg-gold/15 text-gold",
  "مكتملة": "bg-emerald-500/15 text-emerald-400",
  "ملغاة": "bg-red-500/15 text-red-400",
};

const channelIcon: Record<string, typeof Video> = {
  "أونلاين": Video,
  "مكتب": Building2,
  "هاتف": Phone,
};

function AccountPage() {
  const user = useAuth();
  const navigate = useNavigate();
  const [section, setSection] = useState<SectionId>("overview");

  useEffect(() => {
    if (user === null) navigate({ to: "/login" });
    else if (user.role === "lawyer") navigate({ to: "/dashboard" });
  }, [user, navigate]);

  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "auto" });
  }, [section]);

  const email = user?.email || clientProfile.email;

  return (
    <div className="bg-navy">
      <section className="bg-gradient-navy">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-10 md:flex-row md:items-center md:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-gold/30 bg-navy-card/60">
              <UserCircle className="h-9 w-9 text-gold" />
            </div>
            <div>
              <p className="text-sm text-cream/60">مرحباً بعودتك</p>
              <h1 className="text-2xl font-extrabold text-gradient-gold md:text-3xl">{clientProfile.name}</h1>
              <p className="mt-1 flex items-center gap-2 text-sm text-cream/65">
                <MapPin className="h-4 w-4 text-gold" /> {clientProfile.city} — عميل منذ {clientProfile.since}
              </p>
            </div>
          </div>
          <Link
            to="/lawyers"
            className="flex items-center gap-2 rounded-lg bg-gradient-gold px-5 py-2.5 text-sm font-bold text-navy shadow-gold transition-transform hover:-translate-y-0.5"
          >
            <Plus className="h-4 w-4" /> احجز استشارة جديدة
          </Link>
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
          {section === "profile" && <Profile email={email} />}
          {section === "consultations" && <Consultations />}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: typeof MessageSquare; label: string; value: string | number }) {
  return (
    <div className={card}>
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/15 text-gold">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-2xl font-extrabold text-cream">{value}</p>
          <p className="text-sm text-cream/60">{label}</p>
        </div>
      </div>
    </div>
  );
}

function Overview({ onNavigate }: { onNavigate: (s: SectionId) => void }) {
  const upcoming = clientConsultations.filter((c) => c.status === "قادمة");
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <StatCard icon={MessageSquare} label="إجمالي الاستشارات" value={clientConsultations.length} />
        <StatCard icon={CalendarDays} label="استشارات قادمة" value={clientConsultations.filter((c) => c.status === "قادمة").length} />
      </div>

      <div className={card}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-cream">استشاراتك القادمة</h2>
          <button onClick={() => onNavigate("consultations")} className="text-sm font-semibold text-gold hover:underline">
            عرض الكل
          </button>
        </div>
        {upcoming.length === 0 ? (
          <p className="py-6 text-center text-sm text-cream/60">لا توجد استشارات قادمة</p>
        ) : (
          <ul className="space-y-3">
            {upcoming.map((c) => {
              const Icon = channelIcon[c.channel] || Video;
              return (
                <li key={c.id} className="flex items-center gap-3 rounded-xl border border-white/10 bg-navy-deep/50 p-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/15 text-gold">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-cream">{c.subject}</p>
                    <p className="mt-0.5 text-xs text-cream/60">{c.lawyer} — {c.lawyerTitle}</p>
                  </div>
                  <div className="text-left text-xs text-cream/70">
                    <p className="flex items-center justify-end gap-1"><CalendarDays className="h-3.5 w-3.5 text-gold" /> {c.date}</p>
                    <p className="mt-1 flex items-center justify-end gap-1"><Clock className="h-3.5 w-3.5 text-gold" /> {c.time}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

function Profile({ email }: { email: string }) {
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({
    name: clientProfile.name,
    email,
    phone: clientProfile.phone,
    city: clientProfile.city,
  });

  return (
    <div className={card}>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold text-cream">الملف الشخصي</h2>
        <button
          onClick={() => setEdit((v) => !v)}
          className="flex items-center gap-2 rounded-lg border border-gold/50 px-4 py-2 text-sm font-semibold text-cream transition-colors hover:bg-white/5"
        >
          {edit ? <><Save className="h-4 w-4" /> حفظ</> : <><Pencil className="h-4 w-4" /> تعديل</>}
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="الاسم الكامل" value={form.name} edit={edit} onChange={(v) => setForm({ ...form, name: v })} icon={UserCircle} />
        <Field label="البريد الإلكتروني" value={form.email} edit={edit} onChange={(v) => setForm({ ...form, email: v })} icon={Mail} />
        <Field label="رقم الهاتف" value={form.phone} edit={edit} onChange={(v) => setForm({ ...form, phone: v })} icon={Phone} />
        <Field label="المدينة" value={form.city} edit={edit} onChange={(v) => setForm({ ...form, city: v })} icon={MapPin} />
      </div>
    </div>
  );
}

function Field({
  label, value, edit, onChange, icon: Icon,
}: { label: string; value: string; edit: boolean; onChange: (v: string) => void; icon: typeof UserCircle }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm text-cream/70">{label}</label>
      {edit ? (
        <input value={value} onChange={(e) => onChange(e.target.value)} className={fieldCls} />
      ) : (
        <p className="flex items-center gap-2 rounded-lg border border-white/10 bg-navy-deep/50 px-3 py-2.5 text-sm text-cream">
          <Icon className="h-4 w-4 text-gold" /> {value}
        </p>
      )}
    </div>
  );
}

function Consultations() {
  const [filter, setFilter] = useState("all");
  const [call, setCall] = useState<ClientConsultation | null>(null);
  const list = useMemo(
    () => clientConsultations.filter((c) => filter === "all" || c.status === filter),
    [filter],
  );
  return (
    <div className="space-y-5">
      {call && <VideoCall consultation={call} onClose={() => setCall(null)} />}
      <div className="flex flex-wrap gap-2">
        {[
          { v: "all", l: "الكل" },
          { v: "قادمة", l: "قادمة" },
          { v: "مكتملة", l: "مكتملة" },
          { v: "ملغاة", l: "ملغاة" },
        ].map((o) => (
          <button
            key={o.v}
            onClick={() => setFilter(o.v)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              filter === o.v ? "bg-gradient-gold text-navy" : "border border-white/15 text-cream/75 hover:text-gold"
            }`}
          >
            {o.l}
          </button>
        ))}
      </div>
      {list.length === 0 ? (
        <div className={`${card} text-center text-sm text-cream/60`}>لا توجد استشارات</div>
      ) : (
        <div className="grid gap-4">
          {list.map((c) => {
            const Icon = channelIcon[c.channel] || Video;
            return (
              <div key={c.id} className={card}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/15 text-gold">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-cream">{c.subject}</h3>
                      <p className="mt-0.5 text-sm text-cream/60">{c.lawyer} — {c.lawyerTitle}</p>
                    </div>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusColor[c.status]}`}>{c.status}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-cream/70">
                  <span className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4 text-gold" /> {c.date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-gold" /> {c.time} • {c.duration}</span>
                  <span className="flex items-center gap-1.5"><Icon className="h-4 w-4 text-gold" /> {c.channel}</span>
                  <span className="flex items-center gap-1.5 font-bold text-gold">{c.price.toLocaleString()} ج.م</span>
                </div>
                {c.notes && <p className="mt-3 rounded-lg bg-navy-deep/50 p-3 text-sm text-cream/70">{c.notes}</p>}
                {c.status === "قادمة" && (
                  <button
                    onClick={() => setCall(c)}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-gold px-4 py-2.5 text-sm font-bold text-navy shadow-gold transition-transform hover:-translate-y-0.5 sm:w-auto"
                  >
                    <Video className="h-4 w-4" /> انضمام للاستشارة
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ---------- In-platform video call ---------- */
function VideoCall({ consultation, onClose }: { consultation: ClientConsultation; onClose: () => void }) {
  const [seconds, setSeconds] = useState(0);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [sharing, setSharing] = useState(false);
  useEffect(() => {
    const original = document.body.style.overflow;
    const originalHtml = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
      document.documentElement.style.overflow = originalHtml;
    };
  }, []);
  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const lawyerInitial = consultation.lawyer.trim().charAt(0);
  const youInitial = clientProfile.name.trim().charAt(0);

  return (
    <div className="fixed inset-0 z-50 flex h-[100dvh] max-h-[100dvh] flex-col overflow-hidden bg-gradient-navy p-2 sm:p-5">
      <div className="flex shrink-0 items-center justify-between gap-3 rounded-2xl border border-white/10 bg-navy-card/70 px-3 py-2 backdrop-blur sm:px-4 sm:py-3">
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-sm font-bold text-cream">
            <span className="flex h-2 w-2 animate-pulse rounded-full bg-red-500" /> مكالمة فيديو مباشرة
          </p>
          <p className="mt-0.5 truncate text-xs text-cream/55">{consultation.subject} — {consultation.lawyer}</p>
        </div>
        <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 font-mono text-sm font-bold text-gold">{mm}:{ss}</span>
      </div>

      <div className="my-2 grid min-h-0 flex-1 grid-cols-1 grid-rows-2 gap-2 sm:my-5 sm:grid-cols-2 sm:grid-rows-1 sm:gap-3">
        {/* Lawyer tile (large) */}
        <div className="relative flex min-h-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-navy-deep sm:rounded-3xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(201,162,77,0.12),transparent_60%)]" />
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-gold text-2xl font-extrabold text-navy shadow-gold sm:h-28 sm:w-28 sm:text-3xl">{lawyerInitial}</div>
          <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-navy-deep/80 px-3 py-1 text-xs font-semibold text-cream backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> {consultation.lawyer} (المحامي)
          </span>
        </div>
        {/* Client tile */}
        <div className="relative flex min-h-0 items-center justify-center overflow-hidden rounded-2xl border border-gold/30 bg-navy-deep sm:rounded-3xl">
          {camOn ? (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-gold text-2xl font-extrabold text-navy shadow-gold sm:h-28 sm:w-28 sm:text-3xl">{youInitial}</div>
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 text-cream/70 sm:h-24 sm:w-24"><VideoOff className="h-8 w-8" /></div>
          )}
          <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-navy-deep/80 px-3 py-1 text-xs font-semibold text-cream backdrop-blur">
            {micOn ? <Mic className="h-3 w-3 text-emerald-400" /> : <MicOff className="h-3 w-3 text-red-400" />} {clientProfile.name} (أنت)
          </span>
        </div>
      </div>

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
