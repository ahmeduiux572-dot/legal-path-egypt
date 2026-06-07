import type { DashInvoice } from "@/data/dashboard";

/* Brand palette (hex equivalents of the app's oklch tokens) */
const NAVY = "#19223a";
const NAVY_DEEP = "#121a2e";
const GOLD = "#c8a44d";
const GOLD_SOFT = "#e0c578";
const CREAM = "#faf8f2";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const money = (n: number) => `${n.toLocaleString("ar-EG")} ج.م`;

function buildHtml(inv: DashInvoice) {
  const taxAmount = inv.tax ? Math.round((inv.amount * inv.tax) / 100) : 0;
  const grand = inv.amount + taxAmount;
  const issue = inv.issueDate ?? inv.date;
  const statusColors: Record<string, string> = {
    "مدفوعة": "#2f9e6b",
    "معلقة": GOLD,
    "متأخرة": "#d4593f",
  };
  const sc = statusColors[inv.status] ?? GOLD;

  const row = (label: string, value: string) => `
    <tr>
      <td class="lbl">${esc(label)}</td>
      <td class="val">${esc(value)}</td>
    </tr>`;

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8" />
<title>فاتورة ${esc(inv.number)} — مُحامٍ</title>
<style>
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: "Segoe UI", "Cairo", "Tahoma", system-ui, sans-serif;
    background: #e9ecf2; color: ${NAVY}; -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
  .sheet {
    width: 210mm; min-height: 297mm; margin: 0 auto; background: #fff;
    display: flex; flex-direction: column;
  }
  .head {
    background: linear-gradient(160deg, ${NAVY}, ${NAVY_DEEP});
    color: ${CREAM}; padding: 40px 48px; display: flex;
    justify-content: space-between; align-items: flex-start;
  }
  .brand { font-size: 30px; font-weight: 800; letter-spacing: .5px; }
  .brand span { color: ${GOLD}; }
  .brand small { display: block; font-size: 12px; font-weight: 400; color: ${GOLD_SOFT}; margin-top: 6px; letter-spacing: 2px; }
  .doc-title { text-align: left; }
  .doc-title h1 { font-size: 22px; font-weight: 800; color: ${GOLD}; }
  .doc-title p { font-size: 13px; color: rgba(250,248,242,.7); margin-top: 6px; }
  .status {
    display: inline-block; margin-top: 12px; padding: 5px 16px; border-radius: 999px;
    font-size: 12px; font-weight: 700; color: #fff; background: ${sc};
  }
  .meta { display: flex; justify-content: space-between; padding: 32px 48px 12px; gap: 32px; }
  .meta .block { flex: 1; }
  .meta h3 { font-size: 11px; font-weight: 700; color: ${GOLD}; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; }
  .meta .name { font-size: 16px; font-weight: 700; color: ${NAVY}; }
  .meta .line { font-size: 13px; color: #5a6377; margin-top: 4px; }
  .body { padding: 12px 48px; flex: 1; }
  table.items { width: 100%; border-collapse: collapse; margin-top: 16px; }
  table.items thead th {
    background: ${NAVY}; color: ${CREAM}; font-size: 12px; font-weight: 700;
    padding: 12px 16px; text-align: right;
  }
  table.items thead th:last-child { text-align: left; }
  table.items tbody td { padding: 14px 16px; font-size: 14px; border-bottom: 1px solid #e7e9ef; }
  table.items tbody td:last-child { text-align: left; font-weight: 700; }
  .totals { margin-top: 24px; margin-right: auto; width: 280px; }
  .totals table { width: 100%; border-collapse: collapse; }
  .totals td { padding: 9px 4px; font-size: 14px; }
  .totals .lbl { color: #5a6377; }
  .totals .val { text-align: left; font-weight: 700; color: ${NAVY}; }
  .totals .grand td { border-top: 2px solid ${GOLD}; padding-top: 14px; font-size: 18px; }
  .totals .grand .val { color: ${GOLD}; font-weight: 800; }
  .grand-band {
    background: linear-gradient(135deg, ${GOLD_SOFT}, ${GOLD});
    color: ${NAVY}; padding: 18px 48px; display: flex; justify-content: space-between;
    align-items: center; margin-top: 24px;
  }
  .grand-band .t { font-size: 14px; font-weight: 700; }
  .grand-band .a { font-size: 24px; font-weight: 800; }
  .notes { padding: 24px 48px; }
  .notes h3 { font-size: 12px; font-weight: 700; color: ${GOLD}; margin-bottom: 8px; }
  .notes p { font-size: 13px; color: #4a5366; line-height: 1.7; }
  .foot {
    margin-top: auto; background: ${NAVY_DEEP}; color: rgba(250,248,242,.65);
    padding: 20px 48px; font-size: 12px; display: flex; justify-content: space-between;
  }
  .foot span { color: ${GOLD_SOFT}; }
  @media print { body { background: #fff; } .sheet { box-shadow: none; } }
</style>
</head>
<body>
  <div class="sheet">
    <div class="head">
      <div class="brand">مُحامٍ<span>.</span><small>المنصة القانونية الرقمية</small></div>
      <div class="doc-title">
        <h1>فاتورة</h1>
        <p>${esc(inv.number)}</p>
        <span class="status">${esc(inv.status)}</span>
      </div>
    </div>

    <div class="meta">
      <div class="block">
        <h3>صادرة إلى</h3>
        <div class="name">${esc(inv.client)}</div>
        ${inv.caseRef ? `<div class="line">القضية: ${esc(inv.caseRef)}</div>` : ""}
      </div>
      <div class="block" style="text-align:left">
        <h3>تفاصيل الفاتورة</h3>
        <div class="line">تاريخ الإصدار: ${esc(issue)}</div>
        ${inv.dueDate ? `<div class="line">تاريخ الاستحقاق: ${esc(inv.dueDate)}</div>` : ""}
      </div>
    </div>

    <div class="body">
      <table class="items">
        <thead>
          <tr><th>البند</th><th>الوصف</th><th>المبلغ</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>${esc(inv.item ?? "أتعاب قانونية")}</td>
            <td>${esc(inv.caseRef ?? "خدمات قانونية")}</td>
            <td>${money(inv.amount)}</td>
          </tr>
        </tbody>
      </table>

      <div class="totals">
        <table>
          ${row("المجموع الفرعي", money(inv.amount))}
          ${inv.tax ? row(`الضريبة (${inv.tax}%)`, money(taxAmount)) : ""}
          <tr class="grand"><td class="lbl">الإجمالي</td><td class="val">${money(grand)}</td></tr>
        </table>
      </div>
    </div>

    <div class="grand-band">
      <span class="t">الإجمالي المستحق</span>
      <span class="a">${money(grand)}</span>
    </div>

    ${inv.notes ? `<div class="notes"><h3>ملاحظات</h3><p>${esc(inv.notes)}</p></div>` : ""}

    <div class="foot">
      <div>شكراً لتعاملكم مع <span>مُحامٍ</span></div>
      <div>منصة مُحامٍ — القانون والتكنولوجيا</div>
    </div>
  </div>
  <script>
    window.onload = function () {
      setTimeout(function () { window.focus(); window.print(); }, 300);
    };
  </script>
</body>
</html>`;
}

/** Opens a print-ready, branded invoice the user can save as PDF or send. */
export function generateInvoicePdf(inv: DashInvoice) {
  const html = buildHtml(inv);
  const w = window.open("", "_blank", "width=900,height=1000");
  if (!w) {
    alert("يرجى السماح بالنوافذ المنبثقة لتحميل الفاتورة.");
    return;
  }
  w.document.open();
  w.document.write(html);
  w.document.close();
}
