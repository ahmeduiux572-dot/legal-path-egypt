import { useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Scale, Building2, MessagesSquare, Gavel, Users,
  Package, CreditCard, Wallet, Briefcase, Settings, LogOut, Menu, X, ExternalLink,
} from "lucide-react";
import { adminLogout } from "@/lib/admin-auth";

export const adminNav = [
  { to: "/admin", label: "الرئيسية", icon: LayoutDashboard, exact: true },
  { to: "/admin/lawyers", label: "المحامون", icon: Scale },
  { to: "/admin/firms", label: "المكاتب", icon: Building2 },
  { to: "/admin/consultations", label: "الاستشارات", icon: MessagesSquare },
  { to: "/admin/cases", label: "سوق القضايا", icon: Gavel },
  { to: "/admin/clients", label: "العملاء", icon: Users },
  { to: "/admin/plans", label: "الباقات", icon: Package },
  { to: "/admin/subscriptions", label: "الاشتراكات", icon: CreditCard },
  { to: "/admin/revenue", label: "الإيرادات", icon: Wallet },
  { to: "/admin/staff", label: "الموظفون والوظائف", icon: Briefcase },
  { to: "/admin/settings", label: "الإعدادات", icon: Settings },
] as const;

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const handleLogout = () => {
    adminLogout();
    navigate({ to: "/admin" });
  };

  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname === to || pathname.startsWith(to + "/");

  const NavLinks = () => (
    <nav className="flex flex-col gap-1">
      {adminNav.map((item) => {
        const active = isActive(item.to, "exact" in item ? item.exact : false);
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
              active
                ? "bg-gold/15 text-gold"
                : "text-cream/70 hover:bg-white/5 hover:text-cream"
            }`}
          >
            <item.icon className="h-[18px] w-[18px]" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-deep via-navy to-navy-deep" dir="rtl">
      {/* Sidebar - desktop */}
      <aside className="fixed inset-y-0 right-0 z-40 hidden w-72 flex-col border-l border-white/10 bg-navy-deep/80 backdrop-blur lg:flex">
        <div className="flex h-16 items-center gap-2 border-b border-white/10 px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold/15 text-gold">
            <Scale className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="font-extrabold text-cream">مُحامٍ</div>
            <div className="text-[11px] text-gold/80">لوحة الإدارة</div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <NavLinks />
        </div>
        <div className="border-t border-white/10 p-3">
          <Link
            to="/"
            className="mb-1 flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-cream/70 transition-colors hover:bg-white/5 hover:text-cream"
          >
            <ExternalLink className="h-[18px] w-[18px]" /> العودة للموقع
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-red-300 transition-colors hover:bg-red-500/10"
          >
            <LogOut className="h-[18px] w-[18px]" /> تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* Topbar - mobile */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-white/10 bg-navy-deep/90 px-4 backdrop-blur lg:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/15 text-gold">
            <Scale className="h-4 w-4" />
          </div>
          <span className="font-extrabold text-cream">لوحة الإدارة</span>
        </div>
        <button onClick={() => setOpen((v) => !v)} className="text-cream" aria-label="القائمة">
          {open ? <X /> : <Menu />}
        </button>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 right-0 w-72 overflow-y-auto border-l border-white/10 bg-navy-deep p-4">
            <NavLinks />
            <div className="mt-4 border-t border-white/10 pt-3">
              <Link to="/" onClick={() => setOpen(false)} className="mb-1 flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-cream/70 hover:bg-white/5">
                <ExternalLink className="h-[18px] w-[18px]" /> العودة للموقع
              </Link>
              <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-red-300 hover:bg-red-500/10">
                <LogOut className="h-[18px] w-[18px]" /> تسجيل الخروج
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="lg:mr-72">
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-8">{children}</div>
      </main>
    </div>
  );
}
