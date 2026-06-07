import { Link } from "@tanstack/react-router";

export function Logo({ variant = "light" }: { variant?: "light" | "dark" }) {
  const wordColor = variant === "dark" ? "text-navy" : "text-gradient-gold";
  const markShell =
    variant === "dark"
      ? "border-navy/20 bg-secondary"
      : "border-gold/30 bg-gradient-to-br from-gold/15 to-transparent";

  return (
    <Link to="/" className="group flex items-center gap-3" aria-label="مُحامٍ" dir="rtl">
      <span className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border shadow-lg shadow-black/20 transition-transform duration-300 group-hover:-translate-y-0.5 md:h-11 md:w-11 ${markShell}`}>
        <svg
          viewBox="0 0 24 24"
          role="img"
          aria-hidden="true"
          className="relative h-6 w-6 text-gold md:h-[1.65rem] md:w-[1.65rem]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 7v14" />
          <path d="M5 7h14" />
          <path d="M5 7l-2 5h4l-2-5z" fill="currentColor" opacity="0.45" />
          <path d="M3 12c0 1.5 1 2.5 2 2.5s2-1 2-2.5" />
          <path d="M19 7l-2 5h4l-2-5z" fill="currentColor" opacity="0.45" />
          <path d="M17 12c0 1.5 1 2.5 2 2.5s2-1 2-2.5" />
          <path d="M9 21h6" />
        </svg>
      </span>
      <span className={`font-logo text-2xl font-bold tracking-tight ${wordColor} md:text-[1.75rem]`}>
        مُحامٍ
      </span>
    </Link>
  );
}