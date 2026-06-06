import { useCallback, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ChevronLeft, ChevronRight, BadgeCheck, MapPin } from "lucide-react";
import { featuredLawyerAds } from "@/data/ads";
import { StarRating } from "./StarRating";

export function AdCarousel() {
  const [index, setIndex] = useState(0);
  const count = featuredLawyerAds.length;

  const go = useCallback((dir: number) => {
    setIndex((i) => (i + dir + count) % count);
  }, [count]);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % count), 6000);
    return () => clearInterval(t);
  }, [count]);

  return (
    <section className="bg-navy py-14">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="mb-8 text-center">
          <span className="inline-block rounded-full border border-gold/40 bg-navy-deep/40 px-4 py-1 text-xs font-semibold text-gold">
            محامون مميّزون
          </span>
          <h2 className="mt-4 text-2xl font-extrabold text-cream md:text-3xl">
            إعلانات نخبة المحامين
          </h2>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-gold/20 shadow-card">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(${index * 100}%)` }}
          >
            {featuredLawyerAds.map((ad) => (
              <div
                key={ad.id}
                className="relative grid min-w-full grid-cols-1 bg-gradient-navy md:grid-cols-2"
              >
                {/* Image side */}
                <div className="relative h-64 md:h-[420px]">
                  <img
                    src={ad.image}
                    alt={ad.name}
                    loading="lazy"
                    className="h-full w-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-transparent to-transparent md:bg-gradient-to-l md:from-navy-deep md:via-navy-deep/30 md:to-transparent" />
                  <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-gradient-gold px-3 py-1 text-xs font-bold text-navy shadow-gold">
                    {ad.offer}
                  </span>
                </div>

                {/* Content side */}
                <div className="flex flex-col justify-center px-6 py-8 text-start md:px-12">
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-gold/40 px-3 py-1 text-xs font-semibold text-gold">
                    <BadgeCheck className="h-3.5 w-3.5" /> محامٍ موثّق
                  </span>
                  <h3 className="mt-4 text-2xl font-extrabold leading-snug text-cream md:text-3xl">
                    {ad.name}
                  </h3>
                  <p className="mt-2 text-sm font-semibold text-gold md:text-base">{ad.title}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <StarRating value={ad.rating} size={16} />
                    <span className="text-xs text-cream/60">({ad.reviews} تقييم)</span>
                  </div>
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-cream/70">
                    <MapPin className="h-3.5 w-3.5 text-gold" /> {ad.city}
                  </div>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/80">{ad.text}</p>
                  <Link
                    to="/lawyers/$lawyerId"
                    params={{ lawyerId: ad.id }}
                    className="mt-6 inline-flex w-fit items-center gap-2 rounded-md bg-gradient-gold px-6 py-3 text-sm font-bold text-navy shadow-gold transition-transform hover:-translate-y-0.5"
                  >
                    احجز استشارتك الآن
                    <ArrowLeft className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => go(1)}
            aria-label="التالي"
            className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-navy-deep/60 p-2 text-cream backdrop-blur transition-colors hover:bg-navy-deep"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => go(-1)}
            aria-label="السابق"
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-navy-deep/60 p-2 text-cream backdrop-blur transition-colors hover:bg-navy-deep"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {featuredLawyerAds.map((ad, i) => (
              <button
                key={ad.id}
                onClick={() => setIndex(i)}
                aria-label={`الإعلان ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-6 bg-gold" : "w-2 bg-cream/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}