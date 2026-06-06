import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PaymentSection } from "@/components/PaymentSection";

const times = ["10:00 ص", "12:00 م", "02:00 م", "04:00 م", "06:00 م", "08:00 م"];

const field =
  "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-gold";

export function BookingDialog({
  name,
  price,
  label = "احجز وادفع الآن",
}: {
  name: string;
  price: number;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [payValid, setPayValid] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const valid = !!date && !!time && payValid;

  const reset = () => {
    setDone(false);
    setDate(""); setTime(""); setPayValid(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) reset();
      }}
    >
      <DialogTrigger asChild>
        <button className="mt-5 w-full rounded-lg bg-navy py-3 text-sm font-bold text-cream transition-colors hover:bg-navy-deep">
          {label}
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-start text-navy">حجز استشارة مع {name}</DialogTitle>
        </DialogHeader>

        {done ? (
          <div className="py-6 text-center">
            <CheckCircle2 className="mx-auto h-14 w-14 text-gold" />
            <h4 className="mt-4 text-lg font-bold text-navy">تم تأكيد حجز استشارتك بنجاح</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              استشارتك مع {name} يوم {date} الساعة {time}. سيصلك تأكيد بموعد الجلسة قريباً.
            </p>
            <button onClick={() => { setOpen(false); reset(); }} className="mt-5 rounded-lg bg-navy px-6 py-2.5 text-sm font-bold text-cream">تم</button>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); if (valid) setDone(true); }} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-navy">اختر اليوم</label>
              <input type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} className={field} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-navy">اختر الموعد</label>
              <div className="grid grid-cols-3 gap-2">
                {times.map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setTime(t)}
                    className={`rounded-lg border px-2 py-2 text-xs font-semibold transition-colors ${
                      time === t ? "border-gold bg-secondary text-navy" : "border-border text-muted-foreground"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-secondary p-4">
              <span className="text-lg font-extrabold text-navy">{price} ج.م</span>
              <span className="text-sm text-muted-foreground">قيمة الاستشارة</span>
            </div>
            <PaymentSection onValidChange={setPayValid} />
            <button type="submit" disabled={!valid} className="w-full rounded-lg bg-gradient-gold py-3 text-sm font-bold text-navy shadow-gold disabled:opacity-50">
              ادفع {price} ج.م
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}