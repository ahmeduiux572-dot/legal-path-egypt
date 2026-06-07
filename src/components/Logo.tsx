import { Link } from "@tanstack/react-router";
import logo from "@/assets/mohaam-logo.png";

export function Logo({ variant = "light" }: { variant?: "light" | "dark" }) {
  return (
    <Link to="/" className="flex items-center" aria-label="مُحَامٌ MOHAAM">
      <img
        src={logo.url}
        alt="شعار منصة مُحَامٌ MOHAAM"
        className="h-12 w-auto object-contain md:h-14"
      />
    </Link>
  );
}