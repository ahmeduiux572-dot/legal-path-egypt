import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, X, LayoutDashboard, LogOut } from "lucide-react";
import { Logo } from "./Logo";
import { useAuth, logout } from "@/lib/auth";

const links = [
  { to: "/", label: "الرئيسية" },
  { to: "/lawyers", label: "المحامون" },
  { to: "/cases", label: "سوق القضايا" },
  { to: "/templates", label: "النماذج القانونية" },
  { to: "/ai", label: "المساعد الذكي" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const user = useAuth();
  const navigate = useNavigate();
  const isLawyer = user?.role === "lawyer";

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate({ to: "/" });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-deep/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-cream/80 transition-colors hover:text-gold"
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {user ? (
            <>
              {isLawyer && (
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-cream/80 transition-colors hover:text-gold"
                  activeProps={{ className: "text-gold" }}
                >
                  <LayoutDashboard className="h-4 w-4" /> لوحة التحكم
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-md border border-gold/50 px-4 py-2 text-sm font-semibold text-cream transition-colors hover:bg-white/5"
              >
                <LogOut className="h-4 w-4" /> تسجيل الخروج
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-md px-3 py-2 text-sm font-semibold text-cream/80 transition-colors hover:text-gold"
              >
                تسجيل الدخول
              </Link>
              <Link
                to="/register"
                className="rounded-md border border-gold/50 px-4 py-2 text-sm font-semibold text-cream transition-colors hover:bg-white/5"
              >
                انضم كمحامٍ
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="text-cream lg:hidden"
          aria-label="القائمة"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-navy-deep px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-cream/85 hover:bg-white/5"
                activeProps={{ className: "text-gold" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            {user ? (
              <div className="mt-3 flex flex-col gap-2">
                {isLawyer && (
                  <Link
                    to="/dashboard"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-md border border-white/15 px-4 py-2 text-center text-sm font-semibold text-cream"
                  >
                    <LayoutDashboard className="h-4 w-4" /> لوحة التحكم
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 rounded-md border border-gold/50 px-4 py-2 text-center text-sm font-semibold text-cream"
                >
                  <LogOut className="h-4 w-4" /> تسجيل الخروج
                </button>
              </div>
            ) : (
              <div className="mt-3 flex gap-2">
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-md border border-white/15 px-4 py-2 text-center text-sm font-semibold text-cream"
                >
                  تسجيل الدخول
                </Link>
                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-md border border-gold/50 px-4 py-2 text-center text-sm font-semibold text-cream"
                >
                  انضم كمحامٍ
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}