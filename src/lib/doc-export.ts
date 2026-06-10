// Export chat replies as Word (.doc) or PDF (via print) with full Arabic/RTL support.

function mdToHtml(text: string): string {
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const lines = text.split(/\r?\n/);
  let html = "";
  let inList = false;
  const closeList = () => {
    if (inList) {
      html += "</ul>";
      inList = false;
    }
  };
  const inline = (s: string) =>
    esc(s)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>");

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      closeList();
      continue;
    }
    const h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) {
      closeList();
      const level = Math.min(h[1].length + 1, 4);
      html += `<h${level}>${inline(h[2])}</h${level}>`;
      continue;
    }
    if (/^[-*•]\s+/.test(line)) {
      if (!inList) {
        html += "<ul>";
        inList = true;
      }
      html += `<li>${inline(line.replace(/^[-*•]\s+/, ""))}</li>`;
      continue;
    }
    closeList();
    html += `<p>${inline(line)}</p>`;
  }
  closeList();
  return html;
}

function buildDocument(title: string, text: string): string {
  const body = mdToHtml(text);
  const date = new Date().toLocaleDateString("ar-EG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return `<!DOCTYPE html>
<html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${title}</title>
<style>
  body{font-family:"Segoe UI","Cairo",Arial,sans-serif;direction:rtl;text-align:right;color:#1a1a1a;line-height:1.9;padding:48px 56px;}
  h1{font-size:22px;border-bottom:2px solid #c9a227;padding-bottom:10px;margin-bottom:6px;color:#0f1f3d;}
  h2{font-size:18px;color:#0f1f3d;margin-top:22px;}
  h3,h4{font-size:15px;color:#33415c;margin-top:18px;}
  p{margin:8px 0;font-size:14px;}
  ul{padding-right:22px;margin:8px 0;}
  li{margin:4px 0;font-size:14px;}
  .meta{color:#888;font-size:12px;margin-bottom:24px;}
  strong{color:#0f1f3d;}
</style></head>
<body>
  <h1>${title}</h1>
  <div class="meta">المساعد القانوني الذكي — ${date}</div>
  ${body}
</body></html>`;
}

export function downloadAsWord(title: string, text: string) {
  const html = buildDocument(title, text);
  const blob = new Blob(["\ufeff", html], { type: "application/msword" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${title}.doc`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function downloadAsPdf(title: string, text: string) {
  const html = buildDocument(title, text);
  const win = window.open("", "_blank");
  if (!win) return;
  win.document.write(html);
  win.document.close();
  win.focus();
  setTimeout(() => {
    win.print();
  }, 400);
}
