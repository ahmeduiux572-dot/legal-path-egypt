import { useEffect, useState } from "react";
import { CreditCard, Wallet, Smartphone } from "lucide-react";

const field =
  "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-gold";

type MethodId = "card" | "vodafone" | "orange" | "etisalat" | "instapay";

const methods: { id: MethodId; label: string; icon: typeof CreditCard }[] = [
  { id: "card", label: "بطاقة ائتمان", icon: CreditCard },
  { id: "vodafone", label: "فودافون كاش", icon: Wallet },
  { id: "orange", label: "أورنج كاش", icon: Wallet },
  { id: "etisalat", label: "اتصالات كاش", icon: Wallet },
  { id: "instapay", label: "إنستا باي", icon: Smartphone },
];

export function PaymentSection({ onValidChange }: { onValidChange: (valid: boolean) => void }) {
  const [method, setMethod] = useState<MethodId>("card");
  const [card, setCard] = useState("");
  const [exp, setExp] = useState("");
  const [cvv, setCvv] = useState("");
  const [wallet, setWallet] = useState("");

  useEffect(() => {
    const valid =
      method === "card"
        ? card.replace(/\s/g, "").length >= 12 && exp.length >= 4 && cvv.length >= 3
        : method === "instapay"
          ? wallet.trim().length >= 4
          : wallet.replace(/\D/g, "").length >= 10;
    onValidChange(valid);
  }, [method, card, exp, cvv, wallet, onValidChange]);

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-semibold text-navy">طريقة الدفع</label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {methods.map((m) => (
            <button
              type="button"
              key={m.id}
              onClick={() => setMethod(m.id)}
              className={`flex items-center justify-center gap-1.5 rounded-lg border px-2 py-2.5 text-xs font-semibold transition-colors ${
                method === m.id ? "border-gold bg-secondary text-navy" : "border-border text-muted-foreground"
              }`}
            >
              <m.icon className="h-4 w-4 text-gold" />
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {method === "card" ? (
        <>
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-navy"><CreditCard className="h-4 w-4 text-gold" />رقم البطاقة</label>
            <input value={card} onChange={(e) => setCard(e.target.value)} className={field} placeholder="0000 0000 0000 0000" inputMode="numeric" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-2 block text-sm font-semibold text-navy">تاريخ الانتهاء</label>
              <input value={exp} onChange={(e) => setExp(e.target.value)} className={field} placeholder="MM/YY" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-navy">CVV</label>
              <input value={cvv} onChange={(e) => setCvv(e.target.value)} className={field} placeholder="123" inputMode="numeric" />
            </div>
          </div>
        </>
      ) : (
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-navy">
            <Wallet className="h-4 w-4 text-gold" />
            {method === "instapay" ? "عنوان الدفع (إنستا باي)" : "رقم المحفظة الإلكترونية"}
          </label>
          <input
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
            className={field}
            placeholder={method === "instapay" ? "example@instapay" : "01XXXXXXXXX"}
            inputMode={method === "instapay" ? "text" : "numeric"}
          />
          <p className="mt-2 text-xs text-muted-foreground">
            سيصلك طلب تأكيد الدفع على محفظتك لإتمام العملية.
          </p>
        </div>
      )}
    </div>
  );
}