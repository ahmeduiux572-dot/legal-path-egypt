import { Link } from "@tanstack/react-router";
import logo from "@/assets/mohaam-logo.png";

export function Logo({ variant = "light" }: { variant?: "light" | "dark" }) {
  return (
    <Link
      to="/"
      className="group flex items-center transition-transform duration-300 hover:-translate-y-0.5"
      aria-label="مُحامٍ"
    >
      <img
        src={logo}
        alt="شعار منصة مُحامٍ"
        width={1280}
        height={640}
        className="h-11 w-auto object-contain md:h-12 lg:h-14"
      />
    </Link>
  );
}