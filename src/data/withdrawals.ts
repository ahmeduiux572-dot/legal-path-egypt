import { lawyers } from "./lawyers";
import { firms } from "./firms";

/* ---------- طلبات السحب (مركزية) ---------- */
export type WithdrawalStatus = "قيد المراجعة" | "منفذ" | "مرفوض";

export interface Withdrawal {
  id: string;
  requester: string;
  requesterType: "lawyer" | "firm";
  requesterId: string;
  amount: number;
  method: string;
  account: string;
  date: string;
  status: WithdrawalStatus;
}

const months = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو"];
const methods = ["تحويل بنكي", "محفظة إلكترونية", "فودافون كاش"];
const accounts = ["EG38 0019 0005 0000 0001 2345", "+20 100 552 3344", "+20 122 778 9900"];
const wStatuses: WithdrawalStatus[] = ["قيد المراجعة", "منفذ", "مرفوض"];

function hash(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return h;
}

function buildFor(
  source: { id: string; name: string }[],
  type: "lawyer" | "firm",
): Withdrawal[] {
  const out: Withdrawal[] = [];
  for (const item of source) {
    const h = hash(item.id);
    const count = (h % 3) + 1;
    for (let i = 0; i < count; i++) {
      out.push({
        id: `${item.id}-wd${i + 1}`,
        requester: item.name,
        requesterType: type,
        requesterId: item.id,
        amount: 2000 + ((h + i * 7) % 8) * 1000,
        method: methods[(h + i) % methods.length],
        account: accounts[(h + i) % accounts.length],
        date: `${((h + i * 3) % 27) + 1} ${months[(h + i) % months.length]} 2026`,
        status: wStatuses[(h + i) % wStatuses.length],
      });
    }
  }
  return out;
}

export const withdrawals: Withdrawal[] = [
  ...buildFor(lawyers, "lawyer"),
  ...buildFor(firms, "firm"),
];

export function withdrawalsFor(requesterId: string): Withdrawal[] {
  return withdrawals.filter((w) => w.requesterId === requesterId);
}

export function findWithdrawal(id: string): Withdrawal | undefined {
  return withdrawals.find((w) => w.id === id);
}
