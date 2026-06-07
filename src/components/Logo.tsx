import { Link } from "@tanstack/react-router";

export function Logo({ variant = "light" }: { variant?: "light" | "dark" }) {
  const wordColor = variant === "dark" ? "text-navy" : "text-gradient-gold";
  const markShell = variant === "dark" ? "border-navy/20 bg-secondary" : "border-gold/45 bg-navy-card/80";

  return (
    <Link to="/" className="group flex items-center gap-3" aria-label="مُحامٍ">
      <span className={`relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border shadow-gold transition-transform duration-300 group-hover:-translate-y-0.5 md:h-12 md:w-12 ${markShell}`}>
        <span className="absolute inset-x-2 top-2 h-px bg-gradient-gold" />
        <svg
          viewBox="0 0 64 64"
          role="img"
          aria-hidden="true"
          className="relative h-8 w-8 text-gold md:h-9 md:w-9"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M32 13v34" strokeWidth="3" />
          <path d="M20 20h24" strokeWidth="3" />
          <path d="M17 49h30" strokeWidth="3" />
          <path d="M22 20 13 37h18L22 20Z" strokeWidth="2.4" />
          <path d="M42 20 33 37h18L42 20Z" strokeWidth="2.4" />
          <path d="M13 37c2 3 5 4.5 9 4.5s7-1.5 9-4.5" strokeWidth="2.4" />
          <path d="M33 37c2 3 5 4.5 9 4.5s7-1.5 9-4.5" strokeWidth="2.4" />
        </svg>
      </span>
      <span className="flex min-w-0 items-center leading-none">
        <span className={`font-logo text-[2rem] font-normal tracking-normal ${wordColor} md:text-[2.35rem]`}>
          مُحامٍ
        </span>
      </span>
    </Link>
  );
}