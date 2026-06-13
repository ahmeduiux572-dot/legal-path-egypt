// Client-side helpers for handling file uploads inside the legal AI chat.
// Supports images, PDF and Word (DOCX) files. Images and PDFs are kept as
// data URLs so the AI model can read them natively (including OCR for scanned
// documents). DOCX files are converted to plain text in the browser.

export type ChatFileKind = "image" | "pdf" | "doc";

export interface ChatFile {
  id: string;
  name: string;
  size: number;
  mime: string;
  kind: ChatFileKind;
  /** processing = still extracting/OCR; ready = usable; error = failed */
  status?: "processing" | "ready" | "error";
  /** data URL for images / pdfs (used for preview + model context) */
  dataUrl?: string;
  /** extracted plain text for word documents */
  text?: string;
  /** linked case id (optional) */
  caseId?: string;
}

/** Max characters of extracted text kept per document (keeps requests fast). */
const MAX_DOC_CHARS = 500_000;
/** Max raw file size we accept (25MB). */
export const MAX_FILE_BYTES = 25 * 1024 * 1024;

export function humanSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export function detectKind(file: File): ChatFileKind | null {
  const name = file.name.toLowerCase();
  if (file.type.startsWith("image/")) return "image";
  if (file.type === "application/pdf" || name.endsWith(".pdf")) return "pdf";
  if (
    name.endsWith(".docx") ||
    name.endsWith(".doc") ||
    file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  )
    return "doc";
  return null;
}

/**
 * Split a long string into chunks so very large documents can be summarised in
 * pieces. Returned joined with chunk markers so the model keeps the structure.
 */
export function chunkText(text: string, chunkSize = 8000): string {
  if (text.length <= chunkSize) return text;
  const parts: string[] = [];
  for (let i = 0; i < text.length; i += chunkSize) {
    parts.push(text.slice(i, i + chunkSize));
  }
  return parts.map((p, i) => `--- جزء ${i + 1}/${parts.length} ---\n${p}`).join("\n\n");
}

export async function processFile(file: File): Promise<ChatFile> {
  const kind = detectKind(file);
  if (!kind) {
    throw new Error(`نوع الملف غير مدعوم: ${file.name}. المسموح: PDF و Word والصور.`);
  }
  if (file.size > MAX_FILE_BYTES) {
    throw new Error(`حجم الملف ${file.name} كبير جداً (الحد ${humanSize(MAX_FILE_BYTES)}).`);
  }

  const base: ChatFile = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: file.name,
    size: file.size,
    mime: file.type || (kind === "pdf" ? "application/pdf" : "application/octet-stream"),
    kind,
    status: "ready",
  };

  if (kind === "image" || kind === "pdf") {
    base.dataUrl = await readAsDataUrl(file);
    return base;
  }

  // DOCX -> plain text (browser build of mammoth, loaded on demand).
  const arrayBuffer = await file.arrayBuffer();
  const mammoth = await import("mammoth/mammoth.browser");
  const result = await mammoth.extractRawText({ arrayBuffer });
  let text = (result.value || "").trim();
  if (!text) throw new Error(`تعذّر استخراج نص من الملف ${file.name}.`);
  if (text.length > MAX_DOC_CHARS) {
    text = text.slice(0, MAX_DOC_CHARS) + "\n\n[تم اقتطاع باقي المستند للحفاظ على الأداء]";
  }
  base.text = chunkText(text);
  return base;
}

/** Server payload (no UI-only fields, smaller). */
export interface ChatFilePayload {
  kind: "image" | "pdf" | "text";
  name: string;
  dataUrl?: string;
  text?: string;
}

export function toPayload(files: ChatFile[]): ChatFilePayload[] {
  return files
    .filter((f) => f.status !== "processing" && f.status !== "error")
    .map((f) => {
    if (f.kind === "doc") return { kind: "text", name: f.name, text: f.text };
    return { kind: f.kind, name: f.name, dataUrl: f.dataUrl };
  });
}