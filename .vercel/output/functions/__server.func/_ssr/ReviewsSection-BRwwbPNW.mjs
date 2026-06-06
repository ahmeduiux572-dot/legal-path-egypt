import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle } from "./dialog-U2-3YMO2.mjs";
import { P as PaymentSection } from "./PaymentSection-BjmVgGSP.mjs";
import { S as StarRating } from "./StarRating-D_DIxzYB.mjs";
import { i as sampleReviews } from "./router-xJ7VNU2Z.mjs";
import { C as CircleCheck, p as Star } from "../_libs/lucide-react.mjs";
const times = ["10:00 ص", "12:00 م", "02:00 م", "04:00 م", "06:00 م", "08:00 م"];
const field = "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-gold";
function BookingDialog({
  name,
  price,
  label = "احجز وادفع الآن"
}) {
  const [open, setOpen] = reactExports.useState(false);
  const [done, setDone] = reactExports.useState(false);
  const [date, setDate] = reactExports.useState("");
  const [time, setTime] = reactExports.useState("");
  const [payValid, setPayValid] = reactExports.useState(false);
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const valid = !!date && !!time && payValid;
  const reset = () => {
    setDone(false);
    setDate("");
    setTime("");
    setPayValid(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Dialog,
    {
      open,
      onOpenChange: (v) => {
        setOpen(v);
        if (!v) reset();
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "mt-5 w-full rounded-lg bg-navy py-3 text-sm font-bold text-cream transition-colors hover:bg-navy-deep", children: label }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[90vh] overflow-y-auto sm:max-w-md", dir: "rtl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "text-start text-navy", children: [
            "حجز استشارة مع ",
            name
          ] }) }),
          done ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-6 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mx-auto h-14 w-14 text-gold" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mt-4 text-lg font-bold text-navy", children: "تم تأكيد حجز استشارتك بنجاح" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm leading-relaxed text-muted-foreground", children: [
              "استشارتك مع ",
              name,
              " يوم ",
              date,
              " الساعة ",
              time,
              ". سيصلك تأكيد بموعد الجلسة قريباً."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
              setOpen(false);
              reset();
            }, className: "mt-5 rounded-lg bg-navy px-6 py-2.5 text-sm font-bold text-cream", children: "تم" })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
            e.preventDefault();
            if (valid) setDone(true);
          }, className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-sm font-semibold text-navy", children: "اختر اليوم" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "date", min: today, value: date, onChange: (e) => setDate(e.target.value), className: field })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-sm font-semibold text-navy", children: "اختر الموعد" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: times.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setTime(t),
                  className: `rounded-lg border px-2 py-2 text-xs font-semibold transition-colors ${time === t ? "border-gold bg-secondary text-navy" : "border-border text-muted-foreground"}`,
                  children: t
                },
                t
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-lg bg-secondary p-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg font-extrabold text-navy", children: [
                price,
                " ج.م"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "قيمة الاستشارة" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PaymentSection, { onValidChange: setPayValid }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", disabled: !valid, className: "w-full rounded-lg bg-gradient-gold py-3 text-sm font-bold text-navy shadow-gold disabled:opacity-50", children: [
              "ادفع ",
              price,
              " ج.م"
            ] })
          ] })
        ] })
      ]
    }
  );
}
function ReviewsSection({ lawyerName }) {
  const [reviews, setReviews] = reactExports.useState(sampleReviews);
  const [author, setAuthor] = reactExports.useState("");
  const [text, setText] = reactExports.useState("");
  const [rating, setRating] = reactExports.useState(5);
  const [hover, setHover] = reactExports.useState(0);
  const submit = (e) => {
    e.preventDefault();
    if (author.trim().length < 2 || text.trim().length < 3) return;
    setReviews((r) => [
      { id: `n-${Date.now()}`, author: author.trim(), text: text.trim(), rating, date: "الآن" },
      ...r
    ]);
    setAuthor("");
    setText("");
    setRating(5);
  };
  const avg = reviews.reduce((a, b) => a + b.rating, 0) / reviews.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 rounded-2xl border border-border bg-card p-7 shadow-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold text-navy", children: avg.toFixed(1) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { value: avg }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
          "(",
          reviews.length,
          " تقييم)"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-bold text-navy", children: "التعليقات والتقييمات" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "mt-6 rounded-xl border border-border bg-secondary/50 p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-sm font-bold text-navy", children: [
        "أضف تقييمك عن ",
        lawyerName
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex flex-row-reverse items-center justify-end gap-1", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onMouseEnter: () => setHover(i),
          onMouseLeave: () => setHover(0),
          onClick: () => setRating(i),
          "aria-label": `تقييم ${i}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: `h-6 w-6 ${i <= (hover || rating) ? "fill-gold text-gold" : "fill-muted text-muted"}` })
        },
        i
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          value: author,
          onChange: (e) => setAuthor(e.target.value),
          placeholder: "اسمك",
          maxLength: 60,
          className: "mt-3 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-gold"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          value: text,
          onChange: (e) => setText(e.target.value),
          placeholder: "اكتب تجربتك مع المحامي...",
          rows: 3,
          maxLength: 500,
          className: "mt-3 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-gold"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "submit",
          className: "mt-3 rounded-lg bg-gradient-gold px-6 py-2.5 text-sm font-bold text-navy shadow-gold transition-transform hover:-translate-y-0.5",
          children: "نشر التقييم"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 space-y-4", children: reviews.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: r.date }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { value: r.rating, size: 14 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-navy", children: r.author }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-9 w-9 items-center justify-center rounded-full bg-gradient-gold text-sm font-bold text-navy", children: r.author.charAt(0) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm leading-relaxed text-muted-foreground", children: r.text })
    ] }, r.id)) })
  ] });
}
export {
  BookingDialog as B,
  ReviewsSection as R
};
