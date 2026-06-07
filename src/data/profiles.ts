import type { Lawyer } from "./lawyers";
import type { Firm } from "./firms";
import { subscriptions, type Subscription } from "./admin";
import {
  dashConsultations,
  dashCases,
  dashClients,
  dashSessions,
  dashInvoices,
  aiConversations,
  type DashConsultation,
  type DashCase,
  type DashClient,
  type DashSession,
  type DashInvoice,
  type AIConversation,
} from "./dashboard";
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
export interface ProfileDocument {
  id: string;
  name: string;
  source: string;
}

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

function rotate<T>(arr: T[], id: string): T[] {
  if (arr.length === 0) return [];
  const offset = hash(id) % arr.length;
  return Array.from({ length: arr.length }, (_, i) => arr[(offset + i) % arr.length]);
}

export function profileCases(idLike: { id: string }): DashCase[] {
  return rotate(dashCases, idLike.id);
}

export function profileClients(idLike: { id: string }): DashClient[] {
  return rotate(dashClients, idLike.id);
}

export function profileSessions(idLike: { id: string }): DashSession[] {
  return rotate(dashSessions, idLike.id);
}

export function profileInvoices(idLike: { id: string }): DashInvoice[] {
  return rotate(dashInvoices, idLike.id);
}

export function profileChats(idLike: { id: string }): AIConversation[] {
  return rotate(aiConversations, idLike.id);
}

export function profileDocuments(idLike: { id: string }): ProfileDocument[] {
  const docs: ProfileDocument[] = [];
  const seen = new Set<string>();
  for (const c of rotate(dashCases, idLike.id)) {
    for (const f of c.files ?? []) {
      const key = `${c.title}:${f}`;
      if (seen.has(key)) continue;
      seen.add(key);
      docs.push({ id: key, name: f, source: c.title });
    }
  }
  for (const cl of rotate(dashClients, idLike.id)) {
    for (const f of cl.files ?? []) {
      const key = `${cl.name}:${f}`;
      if (seen.has(key)) continue;
      seen.add(key);
      docs.push({ id: key, name: f, source: cl.name });
    }
  }
  return docs;
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
    clients: profileClients(l),
    cases: profileCases(l),
    sessions: profileSessions(l),
    invoices: profileInvoices(l),
    chats: profileChats(l),
    documents: profileDocuments(l),
    subscription: profileSubscription(l.name),
  };
}

export function firmProfile(f: Firm) {
  return {
    balance: profileWalletBalance(f),
    wallet: profileWallet(f),
    withdrawals: profileWithdrawals(f),
    consultations: profileConsultations(f),
    clients: profileClients(f),
    cases: profileCases(f),
    sessions: profileSessions(f),
    invoices: profileInvoices(f),
    chats: profileChats(f),
    documents: profileDocuments(f),
    subscription: profileSubscription(f.name),
  };
}