// Export chat replies as Word (.doc) or PDF (via print) with full Arabic/RTL support.

/**
 * Remove the first markdown heading line when it matches the document title,
 * so the title is not printed twice (once as the cover heading, once in body).
 */
function stripLeadingTitle(text: string, title: string): string {
  const lines = text.split(/\r?\n/);
  let i = 0;
  while (i < lines.length && !lines[i].trim()) i++;
  const first = lines[i]?.trim() ?? "";
  const h = first.match(/^#{1,3}\s+(.*)$/);
  if (h) {
    const headingText = h[1].replace(/[*]/g, "").trim();
    if (headingText && (headingText === title.trim() || title.trim().startsWith(headingText))) {
      lines.splice(0, i + 1);
      return lines.join("\n").replace(/^\s+/, "");
    }
  }
  return text;
}

function mdToHtml(text: string): string {
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const lines = text.split(/\r?\n/);
  let html = "";
  let inList = false;
  let inOl = false;
  const closeList = () => {
    if (inList) {
      html += "</ul>";
      inList = false;
    }
    if (inOl) {
      html += "</ol>";
      inOl = false;
    }
  };
  const inline = (s: string) =>
    esc(s)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/`(.+?)`/g, "<code>$1</code>");

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
    // Horizontal rule
    if (/^([-*_])\1{2,}$/.test(line)) {
      closeList();
      html += "<hr/>";
      continue;
    }
    // Ordered list
    const ol = line.match(/^\d+[.)]\s+(.*)$/);
    if (ol) {
      if (!inOl) {
        closeList();
        html += "<ol>";
        inOl = true;
      }
      html += `<li>${inline(ol[1])}</li>`;
      continue;
    }
    if (/^[-*•]\s+/.test(line)) {
      if (!inList) {
        if (inOl) closeList();
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
  const body = mdToHtml(stripLeadingTitle(text, title));
  const date = new Date().toLocaleDateString("ar-EG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return `<!DOCTYPE html>
<html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>${title}</title>
<style>
  *{box-sizing:border-box;}
  body{font-family:"Cairo","Segoe UI","Times New Roman",Arial,serif;direction:rtl;text-align:justify;color:#1a1a1a;line-height:2;margin:0;padding:56px 64px;max-width:920px;margin-inline:auto;}
  .brand{display:flex;align-items:center;justify-content:space-between;border-bottom:3px double #c9a227;padding-bottom:14px;margin-bottom:6px;}
  .brand .name{font-size:15px;font-weight:700;color:#0f1f3d;letter-spacing:.5px;}
  .brand .tag{font-size:11px;color:#9a7b16;}
  h1{font-size:24px;text-align:center;color:#0f1f3d;margin:26px 0 4px;font-weight:800;}
  .meta{text-align:center;color:#8a8a8a;font-size:12px;margin-bottom:30px;}
  h2{font-size:18px;color:#0f1f3d;margin-top:28px;margin-bottom:6px;padding-bottom:5px;border-bottom:1px solid #e3d8b4;font-weight:700;}
  h3{font-size:16px;color:#1f3b66;margin-top:20px;margin-bottom:4px;font-weight:700;}
  h4{font-size:14px;color:#33415c;margin-top:16px;font-weight:700;}
  p{margin:9px 0;font-size:14.5px;}
  ul,ol{padding-right:26px;margin:10px 0;}
  li{margin:7px 0;font-size:14.5px;line-height:1.9;}
  hr{border:none;border-top:1px solid #d9d9d9;margin:20px 0;}
  strong{color:#0f1f3d;font-weight:700;}
  em{color:#33415c;}
  code{background:#f3f0e4;padding:1px 6px;border-radius:4px;font-family:inherit;color:#9a7b16;}
  .sig{margin-top:46px;text-align:left;font-size:14px;color:#33415c;}
  .sig .line{margin-top:34px;border-top:1px solid #999;width:220px;display:inline-block;}
  .footer{margin-top:40px;border-top:1px solid #e3d8b4;padding-top:10px;text-align:center;color:#b0b0b0;font-size:10.5px;}
  @media print{body{padding:28px 36px;}}
</style></head>
<body>
  <div class="brand">
    <span class="name">منصة مُحامٍ — المساعد القانوني الذكي</span>
    <span class="tag">مستند قانوني</span>
  </div>
  <h1>${title}</h1>
  <div class="meta">تحريراً في ${date}</div>
  ${body}
  <div class="sig">
    <div>وتفضلوا بقبول وافر الاحترام،</div>
    <div class="line"></div>
  </div>
  <div class="footer">صادر عن المساعد القانوني الذكي بمنصة مُحامٍ — هذا المستند مسودة استرشادية تخضع لمراجعة المحامي المختص.</div>
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
