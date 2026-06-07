import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Ban, CheckCircle2, Wallet, MessagesSquare, ArrowDownToLine, CreditCard, ChevronLeft, FileText, Bot, User } from "lucide-react";
import {
  Field,
  FieldGrid,
  Badge,
  ActionButton,
  DataTable,
  Tabs,
  type Column,
} from "@/components/admin/parts";
import type { WalletTxn, WithdrawalRequest, ProfileConsultation, ProfileDocument } from "@/data/profiles";
import type { Subscription } from "@/data/admin";
import type { DashCase, DashClient, DashSession, DashInvoice, AIConversation } from "@/data/dashboard";
import { useAdminStore, withdrawalStatus } from "@/lib/admin-store";

const fmt = (n: number) => new Intl.NumberFormat("ar-EG").format(n);

export interface ProfileData {
  balance: number;
  wallet: WalletTxn[];
  withdrawals: WithdrawalRequest[];
  consultations: ProfileConsultation[];
  clients: DashClient[];
  cases: DashCase[];
  sessions: DashSession[];
  invoices: DashInvoice[];
  chats: AIConversation[];
  documents: ProfileDocument[];
  subscription?: Subscription;
}

const wdTone = (s: WithdrawalRequest["status"]) =>
  s === "منفذ" ? "green" : s === "قيد المراجعة" ? "gold" : "red";

export function ProfileView({
  image,
  name,
  subtitle,
  fields,
  profile,
  blocked,
  onToggleBlock,
}: {
  image?: string;
  name: string;
  subtitle: string;
  fields: { label: string; value: React.ReactNode }[];
  profile: ProfileData;
  blocked: boolean;
  onToggleBlock: () => void;
}) {
  const navigate = useNavigate();
  const store = useAdminStore();
  const [tab, setTab] = useState("info");

  const consultCols: Column<ProfileConsultation>[] = [
    { key: "client", label: "العميل" },
    { key: "subject", label: "الموضوع" },
    { key: "date", label: "التاريخ" },
    { key: "price", label: "السعر", render: (r) => `${fmt(r.price)} ج.م` },
    {
      key: "status", label: "الحالة",
      render: (r) => (
        <Badge tone={r.status === "مكتملة" ? "green" : r.status === "قادمة" ? "blue" : "red"}>{r.status}</Badge>
      ),
    },
    { key: "go", label: "", render: () => <ChevronLeft className="h-4 w-4 text-cream/40" /> },
  ];

  const wdCols: Column<WithdrawalRequest>[] = [
    { key: "amount", label: "المبلغ", render: (r) => `${fmt(r.amount)} ج.م` },
    { key: "method", label: "الوسيلة" },
    { key: "date", label: "التاريخ" },
    {
      key: "status", label: "الحالة",
      render: (r) => {
        const st = withdrawalStatus(store, r.id, r.status);
        return <Badge tone={wdTone(st)}>{st}</Badge>;
      },
    },
    { key: "go", label: "", render: () => <ChevronLeft className="h-4 w-4 text-cream/40" /> },
  ];

  const clientCols: Column<DashClient>[] = [
    { key: "name", label: "العميل" },
    { key: "type", label: "النوع", render: (r) => <Badge tone="blue">{r.type ?? "فرد"}</Badge> },
    { key: "city", label: "المدينة", render: (r) => r.city ?? "—" },
    { key: "phone", label: "الهاتف", render: (r) => <span dir="ltr">{r.phone}</span> },
    { key: "cases", label: "القضايا", render: (r) => fmt(r.cases) },
    { key: "since", label: "عميل منذ" },
  ];

  const caseCols: Column<DashCase>[] = [
    { key: "title", label: "القضية" },
    { key: "client", label: "العميل" },
    { key: "type", label: "النوع" },
    {
      key: "status", label: "الحالة",
      render: (r) => (
        <Badge tone={r.status === "نشطة" ? "green" : r.status === "قيد المراجعة" ? "gold" : "muted"}>{r.status}</Badge>
      ),
    },
    { key: "nextDate", label: "الجلسة القادمة" },
  ];

  const sessionCols: Column<DashSession>[] = [
    { key: "title", label: "الجلسة" },
    { key: "client", label: "العميل" },
    { key: "date", label: "التاريخ", render: (r) => `${r.day} يونيو 2026` },
    { key: "time", label: "الوقت" },
    { key: "location", label: "المكان" },
    {
      key: "status", label: "الحالة",
      render: (r) => (
        <Badge tone={r.status === "قادمة" ? "blue" : r.status === "منتهية" ? "green" : "gold"}>{r.status ?? "—"}</Badge>
      ),
    },
  ];

  const invoiceCols: Column<DashInvoice>[] = [
    { key: "number", label: "الفاتورة" },
    { key: "client", label: "العميل" },
    { key: "item", label: "البند", render: (r) => r.item ?? "—" },
    { key: "amount", label: "المبلغ", render: (r) => `${fmt(r.amount)} ج.م` },
    { key: "date", label: "التاريخ" },
    {
      key: "status", label: "الحالة",
      render: (r) => (
        <Badge tone={r.status === "مدفوعة" ? "green" : r.status === "معلقة" ? "gold" : "red"}>{r.status}</Badge>
      ),
    },
  ];

  const docCols: Column<ProfileDocument>[] = [
    {
      key: "name", label: "المستند",
      render: (r) => (
        <span className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-gold" /> {r.name}
        </span>
      ),
    },
    { key: "source", label: "المصدر" },
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-navy-card/40 p-5 md:p-6">
      <div className="flex flex-wrap items-center gap-4">
        {image && <img src={image} alt={name} className="h-16 w-16 rounded-2xl object-cover" />}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-cream">{name}</h2>
            {blocked && <Badge tone="red">محظور</Badge>}
          </div>
          <p className="text-sm text-cream/60">{subtitle}</p>
        </div>
        <ActionButton tone={blocked ? "green" : "red"} onClick={onToggleBlock}>
          {blocked ? <><CheckCircle2 className="h-4 w-4" /> رفع الحظر</> : <><Ban className="h-4 w-4" /> حظر</>}
        </ActionButton>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-navy-card/40 p-4">
          <div className="flex items-center gap-2 text-sm text-cream/60">
            <Wallet className="h-4 w-4 text-gold" /> رصيد المحفظة
          </div>
          <div className="mt-2 text-2xl font-extrabold text-gold">{fmt(profile.balance)} ج.م</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-navy-card/40 p-4">
          <div className="flex items-center gap-2 text-sm text-cream/60">
            <CreditCard className="h-4 w-4 text-gold" /> الاشتراك
          </div>
          <div className="mt-2 flex items-center gap-2">
            {profile.subscription ? (
              <>
                <span className="text-base font-bold text-cream">{profile.subscription.plan}</span>
                <Badge tone={profile.subscription.status === "نشط" ? "green" : profile.subscription.status === "قيد التجديد" ? "blue" : "red"}>
                  {profile.subscription.status}
                </Badge>
              </>
            ) : (
              <span className="text-sm text-cream/50">لا يوجد اشتراك</span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Tabs
          active={tab}
          onChange={setTab}
          tabs={[
            { value: "info", label: "البيانات" },
            { value: "clients", label: "العملاء", count: profile.clients.length },
            { value: "cases", label: "القضايا", count: profile.cases.length },
            { value: "sessions", label: "الجلسات", count: profile.sessions.length },
            { value: "consultations", label: "الاستشارات", count: profile.consultations.length },
            { value: "chat", label: "المحادثات", count: profile.chats.length },
            { value: "documents", label: "المستندات", count: profile.documents.length },
            { value: "invoices", label: "الفواتير", count: profile.invoices.length },
            { value: "wallet", label: "المحفظة", count: profile.wallet.length },
            { value: "withdrawals", label: "طلبات السحب", count: profile.withdrawals.length },
            { value: "subscription", label: "الاشتراك" },
          ]}
        />
      </div>

      {tab === "info" && (
        <FieldGrid>
          {fields.map((f) => (
            <Field key={f.label} label={f.label} value={f.value} />
          ))}
        </FieldGrid>
      )}

      {tab === "clients" && <DataTable columns={clientCols} rows={profile.clients} empty="لا يوجد عملاء" />}

      {tab === "cases" && <DataTable columns={caseCols} rows={profile.cases} empty="لا توجد قضايا" />}

      {tab === "sessions" && <DataTable columns={sessionCols} rows={profile.sessions} empty="لا توجد جلسات" />}

      {tab === "invoices" && <DataTable columns={invoiceCols} rows={profile.invoices} empty="لا توجد فواتير" />}

      {tab === "documents" && <DataTable columns={docCols} rows={profile.documents} empty="لا توجد مستندات" />}

      {tab === "chat" && (
        <div className="space-y-3">
          {profile.chats.length === 0 ? (
            <p className="rounded-2xl border border-white/10 bg-navy-card/40 p-6 text-center text-sm text-cream/50">
              لا توجد محادثات
            </p>
          ) : (
            profile.chats.map((conv) => (
              <div key={conv.id} className="rounded-2xl border border-white/10 bg-navy-card/40 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-bold text-cream">{conv.title}</span>
                  <span className="text-xs text-cream/45">{conv.date}</span>
                </div>
                <div className="space-y-2.5">
                  {conv.messages.map((m, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${m.role === "ai" ? "bg-gold/15 text-gold" : "bg-white/10 text-cream/70"}`}>
                        {m.role === "ai" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                      </span>
                      <p className="flex-1 rounded-xl bg-white/[0.03] px-3 py-2 text-sm leading-relaxed text-cream/85">{m.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {tab === "consultations" && (
        <DataTable
          columns={consultCols}
          rows={profile.consultations}
          empty="لا توجد استشارات"
          onRowClick={(r) =>
            navigate({ to: "/admin/consultation/$consultationId", params: { consultationId: r.id } })
          }
        />
      )}

      {tab === "wallet" && (
        <div className="rounded-2xl border border-white/10 bg-navy-card/40 px-4">
          {profile.wallet.map((w) => (
            <div key={w.id} className="flex items-center justify-between border-b border-white/5 py-2.5 last:border-0">
              <span className="text-sm text-cream/80">{w.label}</span>
              <div className="flex items-center gap-3">
                <span className="text-xs text-cream/45">{w.date}</span>
                <span className={`text-sm font-bold ${w.amount < 0 ? "text-red-300" : "text-emerald-300"}`}>
                  {w.amount < 0 ? "-" : "+"}{fmt(Math.abs(w.amount))} ج.م
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "withdrawals" && (
        <DataTable
          columns={wdCols}
          rows={profile.withdrawals}
          empty="لا توجد طلبات سحب"
          onRowClick={(r) =>
            navigate({ to: "/admin/withdrawal/$withdrawalId", params: { withdrawalId: r.id } })
          }
        />
      )}

      {tab === "subscription" && (
        profile.subscription ? (
          <FieldGrid>
            <Field label="الباقة" value={profile.subscription.plan} />
            <Field label="القيمة" value={`${fmt(profile.subscription.price)} ج.م`} />
            <Field
              label="الحالة"
              value={
                <Badge tone={profile.subscription.status === "نشط" ? "green" : profile.subscription.status === "قيد التجديد" ? "blue" : "red"}>
                  {profile.subscription.status}
                </Badge>
              }
            />
            <Field label="تاريخ البداية" value={profile.subscription.startDate} />
            <Field label="تاريخ التجديد" value={profile.subscription.renewDate} />
            <Field
              label=""
              value={
                <ActionButton
                  tone="outline"
                  onClick={() => navigate({ to: "/admin/subscription/$subId", params: { subId: profile.subscription!.id } })}
                >
                  <MessagesSquare className="h-4 w-4" /> عرض تفاصيل الاشتراك
                </ActionButton>
              }
            />
          </FieldGrid>
        ) : (
          <p className="rounded-2xl border border-white/10 bg-navy-card/40 p-6 text-center text-sm text-cream/50">
            لا يوجد اشتراك نشط
          </p>
        )
      )}

      {(tab === "consultations" || tab === "withdrawals") && (
        <div className="mt-4 flex items-center gap-2 text-xs text-cream/40">
          <ArrowDownToLine className="h-3.5 w-3.5" /> اضغط على أي صف لعرض التفاصيل الكاملة
        </div>
      )}
      {["clients", "cases", "sessions", "chat", "documents", "invoices"].includes(tab) && (
        <div className="mt-4 flex items-center gap-2 text-xs text-cream/40">
          <Ban className="h-3.5 w-3.5" /> هذا القسم للعرض فقط — لا يمكنك التعديل أو الحذف
        </div>
      )}
    </div>
  );
}
