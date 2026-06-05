import { Link } from "@tanstack/react-router";
import { Facebook, Twitter, Linkedin, Instagram, Apple, Play } from "lucide-react";
import { Logo } from "./Logo";

const columns = [
  {
    title: "المنصة",
    links: [
      { label: "عن محاميك", to: "/" },
      { label: "المحامون", to: "/lawyers" },
      { label: "سوق القضايا", to: "/cases" },
      { label: "النماذج القانونية", to: "/templates" },
    ],
  },
  {
    title: "الخدمات",
    links: [
      { label: "المساعد الذكي", to: "/ai" },
      { label: "حجز استشارة", to: "/lawyers" },
      { label: "انضم كمحامٍ", to: "/register" },
      { label: "الباقات", to: "/register" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="bg-navy-deep text-cream">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/65">
              منصة متخصصة في الاستشارات القانونية تقدم خدمات شخصية وتجارية بأمان واحترافية لتلبية احتياجاتك في مصر والشرق الأوسط.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-sm font-bold text-gold">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-cream/70 transition-colors hover:text-gold">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="mb-4 text-sm font-bold text-gold">حمّل تطبيقنا</h4>
            <div className="flex flex-col gap-3">
              <a href="#" className="flex items-center gap-3 rounded-lg border border-white/15 px-4 py-2.5 transition-colors hover:border-gold/50">
                <Apple className="h-6 w-6 text-gold" />
                <span className="flex flex-col leading-tight">
                  <span className="text-[10px] text-cream/60">حمّله من</span>
                  <span className="text-sm font-semibold">App Store</span>
                </span>
              </a>
              <a href="#" className="flex items-center gap-3 rounded-lg border border-white/15 px-4 py-2.5 transition-colors hover:border-gold/50">
                <Play className="h-6 w-6 text-gold" />
                <span className="flex flex-col leading-tight">
                  <span className="text-[10px] text-cream/60">احصل عليه من</span>
                  <span className="text-sm font-semibold">Google Play</span>
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="mb-4 text-center text-sm text-cream/60">تابعنا عبر مواقع التواصل الاجتماعي</p>
          <div className="flex justify-center gap-3">
            {[Twitter, Facebook, Linkedin, Instagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-cream transition-colors hover:bg-gradient-gold hover:text-navy"
                aria-label="social"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-cream/45">
            © {new Date().getFullYear()} محاميك. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}