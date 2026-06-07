import type { Lawyer } from "./lawyers";
import type { Firm } from "./firms";
import { subscriptions, type Subscription } from "./admin";
import { dashConsultations, type DashConsultation } from "./dashboard";
import { withdrawalsFor, type Withdrawal } from "./withdrawals";

/* بيانات مشتقة (تجريبية) لملف كل محامٍ/مكتب لعرضها في لوحة الإدارة */

export interface WalletTxn {
  id: string;
  label: string;
  date: string;
  amount: number; // موجب = إيداع، سالب = سحب
}

export type WithdrawalRequest = Withdrawal;
export type ProfileConsultation = DashConsultation;

function hash(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return h;
}

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

export function profileWithdrawals(idLike: { id: string }): WithdrawalRequest[] {
  return withdrawalsFor(idLike.id);
}

export function profileConsultations(idLike: { id: string; consultations?: number }): ProfileConsultation[] {
  const h = hash(idLike.id);
  const offset = h % dashConsultations.length;
  return Array.from({ length: dashConsultations.length }, (_, i) =>
    dashConsultations[(offset + i) % dashConsultations.length],
  );
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