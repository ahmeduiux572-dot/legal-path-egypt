import type { ReactNode } from "react";

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
