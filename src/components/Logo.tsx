import { Link } from "@tanstack/react-router";

export function Logo({ variant = "light" }: { variant?: "light" | "dark" }) {
  const textColor = variant === "dark" ? "text-navy" : "text-cream";

  return (
    <Link to="/" className="group flex items-center gap-3" aria-label="مُحامٍ">
      <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-gold/35 bg-gradient-gold shadow-gold transition-transform duration-300 group-hover:-translate-y-0.5 md:h-12 md:w-12">
        <span className="absolute inset-1 rounded-md border border-navy/20" />
        <svg
          viewBox="0 0 48 48"
          role="img"
          aria-hidden="true"
          className="relative h-8 w-8 text-navy md:h-9 md:w-9"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M24 10v27" strokeWidth="2.6" />
          <path d="M16 16h16" strokeWidth="2.6" />
          <path d="M12 38h24" strokeWidth="2.6" />
          <path d="M17 16l-6 12h12l-6-12Z" strokeWidth="2.1" />
          <path d="M31 16l-6 12h12l-6-12Z" strokeWidth="2.1" />
          <path d="M11 28c1.4 2.1 3.4 3.2 6 3.2s4.6-1.1 6-3.2" strokeWidth="2.1" />
          <path d="M25 28c1.4 2.1 3.4 3.2 6 3.2s4.6-1.1 6-3.2" strokeWidth="2.1" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className={`text-2xl font-extrabold tracking-normal ${textColor} md:text-3xl`}>
          مُحامٍ
        </span>
        <span className="mt-1 h-px w-16 bg-gradient-gold transition-all duration-300 group-hover:w-20" />
      </span>
    </Link>
  );
}