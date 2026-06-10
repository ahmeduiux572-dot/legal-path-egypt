// Lightweight localStorage store for the legal AI chat: persists conversations,
// their messages and the metadata of uploaded files (linked to a case).
// Heavy data (base64 of images/PDFs) is kept only in memory during the session
// to avoid blowing the localStorage quota.

import type { ChatFileKind } from "@/lib/chat-files";

export interface StoredMsgFile {
  name: string;
  kind: ChatFileKind;
  size: number;
}

export interface StoredMsg {
  role: "user" | "ai";
  text: string;
  files?: StoredMsgFile[];
}

export interface StoredConv {
  id: string;
  title: string;
  date: string;
  caseId?: string;
  messages: StoredMsg[];
}

const KEY = "legalai_conversations_v1";

function read(): StoredConv[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as StoredConv[]) : [];
  } catch {
    return [];
  }
}

function write(convs: StoredConv[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(convs));
  } catch {
    /* quota exceeded — ignore, keep working in memory */
  }
}

export function getStoredConvs(): StoredConv[] {
  return read().sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function saveConv(conv: StoredConv) {
  const convs = read();
  const idx = convs.findIndex((c) => c.id === conv.id);
  if (idx >= 0) convs[idx] = conv;
  else convs.push(conv);
  write(convs);
}

export function deleteConv(id: string) {
  write(read().filter((c) => c.id !== id));
}

export function newConvId(): string {
  return `local-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}