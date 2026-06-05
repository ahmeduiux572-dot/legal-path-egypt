import { useEffect, useState } from "react";
import { CreditCard, Wallet } from "lucide-react";

const field =
  "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-gold";

const wallets = ["فودافون كاش", "اتصالات كاش", "أورنج كاش", "وي باي", "انستا باي"];

export function PaymentSection({ onValidityChange }: { onValidityChange: (valid: boolean) => void }) {
  const [method, setMethod] = useState<"card" | "wallet">("card");
  const [card, setCard] = useState("");
  const [exp, setExp] = useState("");
  const [cvv, setCvv] = useState("");
  const [wallet, setWallet] = useState(wallets[0]);
  const [phone, setPhone] = useState("");

  const cardValid = card.replace(/\s/g, "").length >= 12 && exp.length >= 4 && cvv.length >= 3;
  const walletValid = phone.replace(/\D/g, "").length >= 10;
  const valid = method === "card" ? cardValid : walletValid;

  useEffect(() => {
    onValidityChange(valid);
  }, [valid, onValidityChange]);

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-semibold text-navy">طريقة الدفع</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setMethod("card")}
            className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-semibold transition-colors ${
              method === "card" ? "border-gold bg-secondary text-navy" : "border-border text-muted-foreground"
            }`}
          >
            <CreditCard className="h-4 w-4 text-gold" />
            بطاقة بنكية
          </button>
          <button
            type="button"
            onClick={() => setMethod("wallet")}
            className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-semibold transition-colors ${
              method === "wallet" ? "border-gold bg-secondary text-navy" : "border-border text-muted-foreground"
            }`}
          >
            <Wallet className="h-4 w-4 text-gold" />
            محفظة إلكترونية
          </button>
        </div>
      </div>

      {method === "card" ? (
        <>
          <div>
            <label className="mb-2 block text-sm font-semibold text-navy">رقم البطاقة</label>
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
        <>
          <div>
            <label className="mb-2 block text-sm font-semibold text-navy">اختر المحفظة</label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {wallets.map((w) => (
                <button
                  type="button"
                  key={w}
                  onClick={() => setWallet(w)}
                  className={`rounded-lg border px-2 py-2 text-xs font-semibold transition-colors ${
                    wallet === w ? "border-gold bg-secondary text-navy" : "border-border text-muted-foreground"
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-navy">رقم المحفظة</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className={field} placeholder="01xxxxxxxxx" inputMode="numeric" />
          </div>
        </>
      )}
    </div>
  );
}