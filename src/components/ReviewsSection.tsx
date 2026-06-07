import { useState } from "react";
import { Star } from "lucide-react";
import { StarRating } from "@/components/StarRating";
import { sampleReviews, type Review } from "@/data/lawyers";

export function ReviewsSection({ lawyerName }: { lawyerName: string }) {
  const [reviews, setReviews] = useState<Review[]>(sampleReviews);
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (author.trim().length < 2 || text.trim().length < 3) return;
    setReviews((r) => [
      { id: `n-${Date.now()}`, author: author.trim(), text: text.trim(), rating, date: "الآن" },
      ...r,
    ]);
    setAuthor("");
    setText("");
    setRating(5);
  };

  const avg = reviews.reduce((a, b) => a + b.rating, 0) / reviews.length;

  return (
    <div className="mt-10 rounded-2xl border border-border bg-card p-4 shadow-card sm:p-7">
      <div className="flex flex-col-reverse gap-3 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-lg font-bold text-navy">{avg.toFixed(1)}</span>
          <StarRating value={avg} />
          <span className="text-sm text-muted-foreground">({reviews.length} تقييم)</span>
        </div>
        <h3 className="text-lg font-bold text-navy sm:text-xl">التعليقات والتقييمات</h3>
      </div>

      <form onSubmit={submit} className="mt-6 rounded-xl border border-border bg-secondary/50 p-4 sm:p-5">
        <h4 className="text-sm font-bold text-navy">أضف تقييمك عن {lawyerName}</h4>
        <div className="mt-3 flex flex-row-reverse items-center justify-end gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <button
              key={i}
              type="button"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(i)}
              aria-label={`تقييم ${i}`}
            >
              <Star className={`h-6 w-6 ${i <= (hover || rating) ? "fill-gold text-gold" : "fill-muted text-muted"}`} />
            </button>
          ))}
        </div>
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="اسمك"
          maxLength={60}
          className="mt-3 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-gold"
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="اكتب تجربتك مع المحامي..."
          rows={3}
          maxLength={500}
          className="mt-3 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-gold"
        />
        <button
          type="submit"
          className="mt-3 rounded-lg bg-gradient-gold px-6 py-2.5 text-sm font-bold text-navy shadow-gold transition-transform hover:-translate-y-0.5"
        >
          نشر التقييم
        </button>
      </form>

      <div className="mt-6 space-y-4">
        {reviews.map((r) => (
          <div key={r.id} className="rounded-xl border border-border p-4 sm:p-5">
            <div className="flex flex-wrap-reverse items-center justify-between gap-x-3 gap-y-2">
              <span className="text-xs text-muted-foreground">{r.date}</span>
              <div className="flex items-center gap-2 sm:gap-3">
                <StarRating value={r.rating} size={14} />
                <span className="font-bold text-navy">{r.author}</span>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-gold text-sm font-bold text-navy">
                  {r.author.charAt(0)}
                </span>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}