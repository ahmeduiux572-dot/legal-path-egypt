import { Link } from "@tanstack/react-router";

export function Logo({ variant = "light" }: { variant?: "light" | "dark" }) {
  const wordColor = variant === "dark" ? "text-navy" : "text-gradient-gold";
  const subColor = variant === "dark" ? "text-navy/60" : "text-cream/55";

  return (
    <Link to="/" className="group flex items-center gap-3" aria-label="مُحامٍ">
      <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/55 bg-navy-card/70 shadow-gold transition-transform duration-300 group-hover:-translate-y-0.5 md:h-13 md:w-13">
        <span className="absolute inset-1 rounded-full border border-gold/25" />
        <span className="absolute -bottom-0.5 h-1.5 w-7 rounded-full bg-gold/65 blur-sm" />
        <svg
          viewBox="0 0 48 48"
          role="img"
          aria-hidden="true"
          className="relative h-8 w-8 text-gold md:h-9 md:w-9"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M24 9.5v27" strokeWidth="2.3" />
          <path d="M15.5 16.5h17" strokeWidth="2.3" />
          <path d="M17.5 37h13" strokeWidth="2.3" />
          <path d="M14 40h20" strokeWidth="2.3" />
          <path d="M16.5 16.5 10.5 28h12l-6-11.5Z" strokeWidth="1.9" />
          <path d="M31.5 16.5 25.5 28h12l-6-11.5Z" strokeWidth="1.9" />
          <path d="M10.5 28c1.35 2 3.35 3 6 3s4.65-1 6-3" strokeWidth="1.9" />
          <path d="M25.5 28c1.35 2 3.35 3 6 3s4.65-1 6-3" strokeWidth="1.9" />
        </svg>
      </span>
      <span className="flex min-w-0 flex-col items-start leading-none">
        <span className={`text-[1.65rem] font-extrabold tracking-normal ${wordColor} md:text-[2rem]`}>
          مُحامٍ
        </span>
        <span className={`mt-1 text-[0.62rem] font-bold ${subColor}`}>منصة قانونية رقمية</span>
      </span>
    </Link>
  );
}