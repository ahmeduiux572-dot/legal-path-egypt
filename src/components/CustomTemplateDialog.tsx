import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { specialties } from "@/data/lawyers";

const field =
  "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-gold";

export function CustomTemplateDialog({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState<string>(specialties[1]);
  const [contents, setContents] = useState("");
  const [email, setEmail] = useState("");

  const valid =
    name.trim().length > 1 && type.trim().length > 2 &&
    contents.trim().length > 10 && /\S+@\S+\.\S+/.test(email);
  const reset = () => {
    setDone(false); setName(""); setType(""); setContents(""); setEmail("");
    setCategory(specialties[1] as string);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) reset(); }}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-start text-navy">اطلب نموذجاً مخصصاً</DialogTitle>
        </DialogHeader>
        {done ? (
          <div className="py-6 text-center">
            <CheckCircle2 className="mx-auto h-14 w-14 text-gold" />
            <h4 className="mt-4 text-lg font-bold text-navy">تم استلام طلبك</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              سيقوم أحد المحامين المتخصصين بإعداد النموذج وفق المحتويات التي طلبتها وإرساله إلى بريدك خلال 48 ساعة.
            </p>
            <button onClick={() => { setOpen(false); reset(); }} className="mt-5 rounded-lg bg-navy px-6 py-2.5 text-sm font-bold text-cream">تم</button>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); if (valid) setDone(true); }} className="space-y-4">
            <p className="rounded-lg bg-secondary/60 p-3 text-xs leading-relaxed text-muted-foreground">
              صف المحتويات والبنود التي تريدها في النموذج، وسيقوم محامٍ متخصص بصياغته لك بشكل احترافي.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-2 block text-sm font-semibold text-navy">اسمك</label>
                <input value={name} onChange={(e) => setName(e.target.value)} className={field} placeholder="اكتب اسمك" maxLength={60} />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-navy">التخصص</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className={field}>
                  {specialties.slice(1).map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-navy">نوع النموذج المطلوب</label>
              <input value={type} onChange={(e) => setType(e.target.value)} className={field} placeholder="مثال: عقد شراكة بين ثلاثة مؤسسين" maxLength={120} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-navy">المحتويات والبنود المطلوبة</label>
              <textarea value={contents} onChange={(e) => setContents(e.target.value)} rows={5} className={field} placeholder="اكتب البنود التي تريد أن يتضمنها النموذج بالتفصيل..." maxLength={1500} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-navy">البريد الإلكتروني للتسليم</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className={field} placeholder="example@email.com" />
            </div>
            <button type="submit" disabled={!valid} className="w-full rounded-lg bg-gradient-gold py-2.5 text-sm font-bold text-navy shadow-gold disabled:opacity-50">
              إرسال الطلب
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}