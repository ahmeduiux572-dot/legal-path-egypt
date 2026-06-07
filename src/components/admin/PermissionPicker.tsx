import { ShieldCheck } from "lucide-react";
import { permissionGroups, ALL_PERMISSIONS } from "@/data/permissions";

export function PermissionPicker({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (perms: string[]) => void;
}) {
  const all = selected.includes(ALL_PERMISSIONS);
  const toggle = (id: string) => {
    if (all) return;
    onChange(selected.includes(id) ? selected.filter((p) => p !== id) : [...selected, id]);
  };
  return (
    <div className="rounded-2xl border border-white/10 bg-navy-card/40 p-4">
      <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-gold">
        <input
          type="checkbox"
          checked={all}
          onChange={(e) => onChange(e.target.checked ? [ALL_PERMISSIONS] : [])}
          className="h-4 w-4 accent-gold"
        />
        <ShieldCheck className="h-4 w-4" /> كل الصلاحيات
      </label>
      <div className={`grid gap-4 sm:grid-cols-2 ${all ? "pointer-events-none opacity-40" : ""}`}>
        {permissionGroups.map((g) => (
          <div key={g.group}>
            <div className="mb-1.5 text-xs font-bold text-cream/70">{g.group}</div>
            <div className="space-y-1.5">
              {g.items.map((p) => (
                <label key={p.id} className="flex items-center gap-2 text-sm text-cream/80">
                  <input
                    type="checkbox"
                    checked={all || selected.includes(p.id)}
                    onChange={() => toggle(p.id)}
                    className="h-4 w-4 accent-gold"
                  />
                  {p.label}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
