import { Link } from "@tanstack/react-router";

export function Logo({ variant = "light" }: { variant?: "light" | "dark" }) {
  const textClass = variant === "light" ? "text-cream" : "text-navy";
  return (
    <Link to="/" className="flex items-center">
      <span className="flex flex-col leading-none">
        <span className={`text-xl font-extrabold ${textClass}`}>محاميك</span>
        <span className="text-[10px] font-medium tracking-wide text-gold">MUHAMIK · LEGAL</span>
      </span>
    </Link>
  );
}