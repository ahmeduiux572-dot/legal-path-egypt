import { useState, type ReactNode } from "react";
import { Search, FileText, Download, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-extrabold text-cream md:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-cream/60">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  icon,
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-navy-card/70 p-5 shadow-lg backdrop-blur transition-colors hover:border-gold/40">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-cream/60">{label}</span>
        {icon && (
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold/15 text-gold">
            {icon}
          </span>
        )}
      </div>
      <div className="mt-3 text-2xl font-extrabold text-cream">{value}</div>
      {hint && <div className="mt-1 text-xs text-cream/45">{hint}</div>}
    </div>
  );
}

export interface Column<T> {
  key: string;
  label: string;
  render?: (row: T) => ReactNode;
  className?: string;
}

export function DataTable<T extends { id: string }>({
  columns,
  rows,
  empty = "لا توجد بيانات",
}: {
  columns: Column<T>[];
  rows: T[];
  empty?: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy-card/50 shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-right text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03]">
              {columns.map((c) => (
                <th
                  key={c.key}
                  className={`px-4 py-3.5 font-semibold text-cream/70 ${c.className ?? ""}`}
                >
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-10 text-center text-cream/50">
                  {empty}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-white/5 transition-colors last:border-0 hover:bg-white/[0.04]"
                >
                  {columns.map((c) => (
                    <td key={c.key} className={`px-4 py-3.5 text-cream/85 ${c.className ?? ""}`}>
                      {c.render ? c.render(row) : (row as Record<string, ReactNode>)[c.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const toneMap: Record<string, string> = {
  green: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
  gold: "bg-gold/15 text-gold border-gold/30",
  red: "bg-red-500/15 text-red-300 border-red-400/30",
  blue: "bg-sky-500/15 text-sky-300 border-sky-400/30",
  muted: "bg-white/10 text-cream/70 border-white/20",
};

export function Badge({
  children,
  tone = "muted",
}: {
  children: ReactNode;
  tone?: keyof typeof toneMap;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${toneMap[tone]}`}
    >
      {children}
    </span>
  );
}

/* ---------- شريط البحث والفلترة ---------- */
export interface FilterDef {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  label?: string;
}

export function Toolbar({
  search,
  onSearch,
  placeholder = "بحث...",
  filters = [],
  children,
}: {
  search: string;
  onSearch: (v: string) => void;
  placeholder?: string;
  filters?: FilterDef[];
  children?: ReactNode;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-3">
      <div className="relative min-w-[200px] flex-1">
        <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream/40" />
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder={placeholder}
          className="h-10 w-full rounded-xl border border-white/10 bg-navy-card/60 pr-10 pl-3 text-sm text-cream placeholder:text-cream/40 outline-none transition-colors focus:border-gold/40"
        />
      </div>
      {filters.map((f, i) => (
        <select
          key={i}
          value={f.value}
          onChange={(e) => f.onChange(e.target.value)}
          className="h-10 rounded-xl border border-white/10 bg-navy-card/60 px-3 text-sm text-cream outline-none transition-colors focus:border-gold/40"
        >
          {f.options.map((o) => (
            <option key={o.value} value={o.value} className="bg-navy-deep text-cream">
              {o.label}
            </option>
          ))}
        </select>
      ))}
      {children}
    </div>
  );
}

/* ---------- أزرار الإجراءات ---------- */
const btnTones: Record<string, string> = {
  gold: "bg-gold text-navy-deep hover:bg-gold-soft",
  outline: "border border-white/15 text-cream/80 hover:bg-white/5",
  green: "border border-emerald-400/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20",
  red: "border border-red-400/30 bg-red-500/10 text-red-300 hover:bg-red-500/20",
  blue: "border border-sky-400/30 bg-sky-500/10 text-sky-300 hover:bg-sky-500/20",
};

export function ActionButton({
  children,
  tone = "outline",
  onClick,
  type = "button",
  className = "",
}: {
  children: ReactNode;
  tone?: keyof typeof btnTones;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-semibold transition-colors ${btnTones[tone]} ${className}`}
    >
      {children}
    </button>
  );
}

/* ---------- مربع حوار للوحة الإدارة ---------- */
export function AdminDialog({
  open,
  onOpenChange,
  title,
  children,
  className = "",
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        dir="rtl"
        className={`max-h-[88vh] overflow-y-auto border-white/10 bg-navy text-cream sm:max-w-2xl ${className}`}
      >
        <DialogHeader>
          <DialogTitle className="text-right text-xl font-extrabold text-cream">{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

/* ---------- صف بيانات ---------- */
export function Field({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-white/5 py-2.5 last:border-0">
      <span className="text-sm text-cream/55">{label}</span>
      <span className="text-left text-sm font-semibold text-cream">{value}</span>
    </div>
  );
}

export function FieldGrid({ children }: { children: ReactNode }) {
  return <div className="rounded-2xl border border-white/10 bg-navy-card/40 px-4">{children}</div>;
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h3 className="mb-2 mt-5 text-sm font-bold text-gold">{children}</h3>;
}

/* ---------- عرض الملفات المرفوعة ---------- */
export function FileList({ files }: { files: string[] }) {
  const [active, setActive] = useState<string | null>(null);
  if (!files || files.length === 0)
    return <p className="text-sm text-cream/50">لا توجد ملفات مرفوعة</p>;
  return (
    <>
      <div className="grid gap-2 sm:grid-cols-2">
        {files.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-navy-card/50 px-3 py-2.5 text-right transition-colors hover:border-gold/40"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold/15 text-gold">
              <FileText className="h-4 w-4" />
            </span>
            <span className="min-w-0 flex-1 truncate text-sm text-cream/85">{f}</span>
          </button>
        ))}
      </div>
      <FileViewer file={active} onClose={() => setActive(null)} />
    </>
  );
}

function FileViewer({ file, onClose }: { file: string | null; onClose: () => void }) {
  return (
    <Dialog open={Boolean(file)} onOpenChange={(v) => !v && onClose()}>
      <DialogContent dir="rtl" className="border-white/10 bg-navy text-cream sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-right text-base font-bold text-cream">
            <FileText className="h-4 w-4 text-gold" /> {file}
          </DialogTitle>
        </DialogHeader>
        <div className="flex aspect-[3/4] max-h-[55vh] flex-col items-center justify-center rounded-xl border border-dashed border-white/15 bg-navy-deep/60 text-center">
          <FileText className="mb-3 h-14 w-14 text-cream/25" />
          <p className="px-6 text-sm text-cream/60">
            معاينة المستند «{file}»
          </p>
          <p className="mt-1 px-6 text-xs text-cream/40">
            هذه معاينة تجريبية للمستند المرفوع من قبل المتقدّم.
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <ActionButton tone="gold">
            <Download className="h-4 w-4" /> تنزيل
          </ActionButton>
          <ActionButton tone="outline" onClick={onClose}>
            <X className="h-4 w-4" /> إغلاق
          </ActionButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ---------- عناصر النماذج ---------- */
const inputCls =
  "h-10 w-full rounded-xl border border-white/10 bg-navy-card/60 px-3 text-sm text-cream placeholder:text-cream/40 outline-none transition-colors focus:border-gold/40";

export function Labeled({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-cream/70">{label}</span>
      {children}
    </label>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputCls} ${props.className ?? ""}`} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`min-h-[90px] w-full rounded-xl border border-white/10 bg-navy-card/60 p-3 text-sm text-cream placeholder:text-cream/40 outline-none transition-colors focus:border-gold/40 ${props.className ?? ""}`}
    />
  );
}

export function SelectInput({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className={inputCls}>
      {options.map((o) => (
        <option key={o.value} value={o.value} className="bg-navy-deep text-cream">
          {o.label}
        </option>
      ))}
    </select>
  );
}
