import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { to: "/", label: "الرئيسية" },
  { to: "/lawyers", label: "المحامون" },
  { to: "/cases", label: "سوق القضايا" },
  { to: "/templates", label: "النماذج القانونية" },
  { to: "/ai", label: "المساعد الذكي" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
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
          <Link
            to="/register"
            className="rounded-md border border-gold/50 px-4 py-2 text-sm font-semibold text-cream transition-colors hover:bg-white/5"
          >
            انضم كمحامٍ
          </Link>
          <Link
            to="/lawyers"
            className="rounded-md bg-gradient-gold px-4 py-2 text-sm font-bold text-navy shadow-gold transition-transform hover:-translate-y-0.5"
          >
            احجز استشارة
          </Link>
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
            <div className="mt-3 flex gap-2">
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-md border border-gold/50 px-4 py-2 text-center text-sm font-semibold text-cream"
              >
                انضم كمحامٍ
              </Link>
              <Link
                to="/lawyers"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-md bg-gradient-gold px-4 py-2 text-center text-sm font-bold text-navy"
              >
                احجز استشارة
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}