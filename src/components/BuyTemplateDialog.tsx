import { useState } from "react";
import { CheckCircle2, Download } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { PaymentSection } from "@/components/PaymentSection";

const field =
  "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-gold";

export function BuyTemplateDialog({ title, price, trigger }: { title: string; price: number; trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState("");
  const [payValid, setPayValid] = useState(false);

  const valid = /\S+@\S+\.\S+/.test(email) && payValid;
  const reset = () => { setDone(false); setEmail(""); setPayValid(false); };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) reset(); }}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-start text-navy">شراء النموذج</DialogTitle>
        </DialogHeader>
        {done ? (
          <div className="py-6 text-center">
            <CheckCircle2 className="mx-auto h-14 w-14 text-gold" />
            <h4 className="mt-4 text-lg font-bold text-navy">تمت عملية الشراء بنجاح</h4>
            <p className="mt-2 text-sm text-muted-foreground">تم إرسال نسخة من «{title}» إلى بريدك، ويمكنك تحميلها الآن.</p>
            <button onClick={() => { setOpen(false); reset(); }} className="mt-5 inline-flex items-center gap-2 rounded-lg bg-gradient-gold px-6 py-2.5 text-sm font-bold text-navy shadow-gold">
              <Download className="h-4 w-4" /> تحميل النموذج
            </button>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); if (valid) setDone(true); }} className="space-y-4">
            <div className="flex items-center justify-between rounded-lg bg-secondary p-4">
              <span className="text-lg font-extrabold text-navy">{price} ج.م</span>
              <span className="text-sm text-muted-foreground">{title}</span>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-navy">البريد الإلكتروني</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className={field} placeholder="example@email.com" />
            </div>
            <PaymentSection onValidChange={setPayValid} />
            <button type="submit" disabled={!valid} className="w-full rounded-lg bg-navy py-2.5 text-sm font-bold text-cream disabled:opacity-50">
              ادفع {price} ج.م
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}