import type { Lawyer } from "./lawyers";
import type { Firm } from "./firms";
import { subscriptions, type Subscription } from "./admin";

/* بيانات مشتقة (تجريبية) لملف كل محامٍ/مكتب لعرضها في لوحة الإدارة */

export interface WalletTxn {
  id: string;
  label: string;
  date: string;
  amount: number; // موجب = إيداع، سالب = سحب
}

export interface WithdrawalRequest {
  id: string;
  amount: number;
  method: string;
  date: string;
  status: "قيد المراجعة" | "منفذ" | "مرفوض";
}

export interface ProfileConsultation {
  id: string;
  client: string;
  subject: string;
  date: string;
  price: number;
  status: "مكتملة" | "قادمة" | "ملغاة";
}

function hash(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return h;
}

const months = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو"];
const clientsPool = ["أحمد سمير", "منى عبد الله", "كريم حسن", "شركة النور", "مؤسسة الأمل", "سارة منيب", "خالد فؤاد"];
const subjectsPool = ["استشارة عقد", "نزاع تجاري", "قضية أسرة", "مراجعة مستندات", "تعويض إصابة", "تأسيس شركة"];

export function profileWalletBalance(idLike: { id: string; consultations?: number; cases?: number }): number {
  const base = (idLike.consultations ?? idLike.cases ?? 100) * 35;
  return base + (hash(idLike.id) % 9000);
}

export function profileWallet(idLike: { id: string }): WalletTxn[] {
  const h = hash(idLike.id);
  return [
    { id: `${idLike.id}-w1`, label: "أتعاب قضية", date: `${(h % 27) + 1} يونيو 2026`, amount: 4000 + (h % 5) * 500 },
    { id: `${idLike.id}-w2`, label: "رسوم استشارة", date: `${(h % 25) + 2} مايو 2026`, amount: 1500 + (h % 4) * 250 },
    { id: `${idLike.id}-w3`, label: "سحب إلى المحفظة الإلكترونية", date: `${(h % 20) + 5} مايو 2026`, amount: -(3000 + (h % 6) * 500) },
    { id: `${idLike.id}-w4`, label: "أتعاب قضية", date: `${(h % 18) + 3} أبريل 2026`, amount: 6000 + (h % 3) * 1000 },
  ];
}

const wStatuses: WithdrawalRequest["status"][] = ["قيد المراجعة", "منفذ", "مرفوض"];
export function profileWithdrawals(idLike: { id: string }): WithdrawalRequest[] {
  const h = hash(idLike.id);
  const count = (h % 3) + 1;
  return Array.from({ length: count }, (_, i) => ({
    id: `${idLike.id}-wd${i + 1}`,
    amount: 2000 + ((h + i * 7) % 8) * 1000,
    method: ["تحويل بنكي", "محفظة إلكترونية", "فودافون كاش"][(h + i) % 3],
    date: `${((h + i * 3) % 27) + 1} ${months[(h + i) % months.length]} 2026`,
    status: wStatuses[(h + i) % wStatuses.length],
  }));
}

const cStatuses: ProfileConsultation["status"][] = ["مكتملة", "قادمة", "ملغاة"];
export function profileConsultations(idLike: { id: string; consultations?: number }): ProfileConsultation[] {
  const h = hash(idLike.id);
  const count = 4;
  return Array.from({ length: count }, (_, i) => ({
    id: `${idLike.id}-c${i + 1}`,
    client: clientsPool[(h + i) % clientsPool.length],
    subject: subjectsPool[(h + i * 2) % subjectsPool.length],
    date: `${((h + i * 4) % 27) + 1} ${months[(h + i) % months.length]} 2026`,
    price: 500 + ((h + i) % 6) * 250,
    status: cStatuses[(h + i) % cStatuses.length],
  }));
}

export function profileSubscription(name: string): Subscription | undefined {
  return subscriptions.find((s) => s.subscriber === name);
}

export function lawyerProfile(l: Lawyer) {
  return {
    balance: profileWalletBalance(l),
    wallet: profileWallet(l),
    withdrawals: profileWithdrawals(l),
    consultations: profileConsultations(l),
    subscription: profileSubscription(l.name),
  };
}

export function firmProfile(f: Firm) {
  return {
    balance: profileWalletBalance(f),
    wallet: profileWallet(f),
    withdrawals: profileWithdrawals(f),
    consultations: profileConsultations(f),
    subscription: profileSubscription(f.name),
  };
}