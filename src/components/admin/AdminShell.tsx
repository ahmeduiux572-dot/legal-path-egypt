import { useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Scale, Building2, MessagesSquare, Gavel, Users,
  Package, CreditCard, Wallet, ArrowDownToLine, Briefcase, Settings, LogOut, Menu, X, ExternalLink,
  ChevronLeft,
} from "lucide-react";
import { adminLogout } from "@/lib/admin-auth";
import logoImg from "@/assets/mohaam-logo-v2.png";

const navGroups = [
  {
    title: "المنصة",
    items: [
      { to: "/admin", label: "الرئيسية", icon: LayoutDashboard, exact: true },
      { to: "/admin/lawyers", label: "المحامون", icon: Scale },
      { to: "/admin/firms", label: "المكاتب", icon: Building2 },
      { to: "/admin/consultations", label: "الاستشارات", icon: MessagesSquare },
      { to: "/admin/cases", label: "سوق القضايا", icon: Gavel },
      { to: "/admin/clients", label: "العملاء", icon: Users },
    ],
  },
  {
    title: "المالية",
    items: [
      { to: "/admin/plans", label: "الباقات", icon: Package },
      { to: "/admin/subscriptions", label: "الاشتراكات", icon: CreditCard },
      { to: "/admin/revenue", label: "الإيرادات", icon: Wallet },
      { to: "/admin/withdrawals", label: "طلبات السحب", icon: ArrowDownToLine },
    ],
  },
  {
    title: "الإدارة",
    items: [
      { to: "/admin/staff", label: "الموظفون والوظائف", icon: Briefcase },
      { to: "/admin/settings", label: "الإعدادات", icon: Settings },
    ],
  },
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

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <div className="flex flex-col gap-5">
      {navGroups.map((group) => (
        <div key={group.title} className="flex flex-col gap-1">
          <span className="px-3.5 text-[11px] font-semibold uppercase tracking-wider text-cream/40">
            {group.title}
          </span>
          <nav className="flex flex-col gap-0.5">
            {group.items.map((item) => {
              const active = isActive(item.to, "exact" in item ? item.exact : false);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => mobile && setOpen(false)}
                  className={`group relative flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-[13px] font-medium transition-all ${
                    active
                      ? "bg-gold/10 text-gold"
                      : "text-cream/60 hover:bg-white/[0.04] hover:text-cream"
                  }`}
                >
                  {active && (
                    <span className="absolute right-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-l-full bg-gold" />
                  )}
                  <item.icon className="h-[18px] w-[18px] shrink-0 transition-transform group-hover:scale-105" />
                  <span className="flex-1">{item.label}</span>
                  {active && <ChevronLeft className="h-3.5 w-3.5 text-gold/70" />}
                </Link>
              );
            })}
          </nav>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-deep via-navy to-navy-deep" dir="rtl">
      {/* Sidebar - desktop */}
      <aside className="fixed inset-y-0 right-0 z-40 hidden w-64 flex-col border-l border-white/[0.06] bg-navy-deep/90 backdrop-blur-xl lg:flex">
        {/* Logo */}
        <div className="flex h-[72px] items-center gap-3 border-b border-white/[0.06] px-5">
          <img
            src={logoImg}
            alt="مُحامٍ"
            className="h-10 w-auto object-contain"
            loading="lazy"
          />
        </div>

        {/* Nav */}
        <div className="flex-1 overflow-y-auto px-3 py-5">
          <NavLinks />
        </div>

        {/* Footer */}
        <div className="border-t border-white/[0.06] p-3">
          <Link
            to="/"
            className="mb-1 flex items-center gap-3 rounded-lg px-3.5 py-2 text-sm font-medium text-cream/60 transition-colors hover:bg-white/[0.04] hover:text-cream"
          >
            <ExternalLink className="h-[18px] w-[18px]" /> العودة للموقع
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3.5 py-2 text-sm font-medium text-red-300 transition-colors hover:bg-red-500/10"
          >
            <LogOut className="h-[18px] w-[18px]" /> تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* Topbar - mobile */}
      <header className="sticky top-0 z-40 flex h-[60px] items-center justify-between border-b border-white/[0.06] bg-navy-deep/95 px-4 backdrop-blur-xl lg:hidden">
        <div className="flex items-center gap-3">
          <img
            src={logoImg}
            alt="مُحامٍ"
            className="h-8 w-auto object-contain"
            loading="lazy"
          />
        </div>
        <button onClick={() => setOpen((v) => !v)} className="rounded-lg p-2 text-cream hover:bg-white/5" aria-label="القائمة">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 right-0 w-72 overflow-y-auto border-l border-white/[0.06] bg-navy-deep p-4">
            <div className="mb-6 flex h-12 items-center gap-3 border-b border-white/[0.06] pb-4">
              <img
                src={logoImg}
                alt="مُحامٍ"
                className="h-9 w-auto object-contain"
                loading="lazy"
              />
            </div>
            <NavLinks mobile />
            <div className="mt-6 border-t border-white/[0.06] pt-3">
              <Link to="/" onClick={() => setOpen(false)} className="mb-1 flex items-center gap-3 rounded-lg px-3.5 py-2 text-sm font-medium text-cream/60 hover:bg-white/[0.04]">
                <ExternalLink className="h-[18px] w-[18px]" /> العودة للموقع
              </Link>
              <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-lg px-3.5 py-2 text-sm font-medium text-red-300 hover:bg-red-500/10">
                <LogOut className="h-[18px] w-[18px]" /> تسجيل الخروج
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="lg:mr-64">
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-8">{children}</div>
      </main>
    </div>
  );
}
