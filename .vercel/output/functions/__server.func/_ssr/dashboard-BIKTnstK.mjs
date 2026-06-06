import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth, a as lawyers, b as logout } from "./router-xJ7VNU2Z.mjs";
import { j as MapPin, B as Bell, a as LogOut, L as LayoutDashboard, k as CircleUser, l as Briefcase, m as Users, n as CalendarDays, o as MessageSquare, R as Receipt, W as Wallet, S as Sparkles, p as Star, q as TrendingUp, r as Clock, s as CircleAlert, C as CircleCheck, t as Pencil, u as Save, d as FileText, H as Hash, G as Gavel, v as Paperclip, w as Phone, h as Mail, x as ChevronRight, y as ChevronLeft, z as Plus, E as Search, V as Video, J as Building2, K as ArrowDownToLine, N as Send, O as ArrowRight, X, Q as History, Y as MessageCircle, Z as Eye, _ as VideoOff, $ as Mic, a0 as MicOff, a1 as MonitorUp, a2 as PhoneOff } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
const caseTypes = [
  "قانون الأسرة",
  "تجاري",
  "عمالي",
  "مدني",
  "جنائي",
  "إداري",
  "ملكية فكرية",
  "عقاري",
  "ضرائب"
];
const courts = [
  "محكمة القاهرة",
  "محكمة الجيزة",
  "محكمة الاقتصادية",
  "محكمة الأسرة",
  "محكمة العمال",
  "محكمة الاستئناف",
  "محكمة النقض",
  "مجلس الدولة"
];
const sessionTypes = [
  "جلسة مرافعة",
  "جلسة استئناف",
  "استشارة",
  "متابعة قضية",
  "تحضير شهود"
];
const invoiceItems = [
  "أتعاب قضية",
  "استشارة قانونية",
  "صياغة عقد",
  "تمثيل قانوني",
  "مراجعة مستندات"
];
const caseDegrees = [
  "أول درجة",
  "استئناف",
  "نقض",
  "تنفيذ"
];
const dashCases = [
  {
    id: "c1",
    title: "نزاع نفقة وحضانة",
    client: "أحمد سمير",
    type: "قانون الأسرة",
    status: "نشطة",
    nextDate: "10 يونيو 2026",
    progress: 65,
    caseNumber: "452/2026",
    court: "محكمة الأسرة",
    priority: "عاجلة",
    degree: "أول درجة",
    startDate: "5 يناير 2026",
    claimAmount: 8e4,
    opponent: "سامي عبد الرحمن",
    opponentLawyer: "الأستاذة هدى فاروق",
    description: "دعوى نفقة وحضانة للأبناء القُصّر مع طلب مؤخر الصداق ونفقة العدة، بناءً على عقد زواج موثق ومستندات إثبات الدخل.",
    files: ["عقد الزواج.pdf", "شهادات ميلاد الأبناء.pdf", "كشف حساب بنكي.pdf"]
  },
  {
    id: "c2",
    title: "صياغة عقد شراكة",
    client: "شركة النور",
    type: "تجاري",
    status: "قيد المراجعة",
    nextDate: "12 يونيو 2026",
    progress: 40,
    caseNumber: "118/2026",
    court: "محكمة الاقتصادية",
    priority: "متوسطة",
    degree: "أول درجة",
    startDate: "20 فبراير 2026",
    claimAmount: 15e5,
    opponent: "—",
    opponentLawyer: "—",
    description: "صياغة ومراجعة عقد شراكة تجارية بين شركة النور وشريك مستثمر، مع تحديد حصص الشركاء وآلية توزيع الأرباح وشروط فض النزاع.",
    files: ["مسودة العقد.docx", "السجل التجاري.pdf"]
  },
  {
    id: "c3",
    title: "تعويض إصابة عمل",
    client: "كريم حسن",
    type: "عمالي",
    status: "نشطة",
    nextDate: "15 يونيو 2026",
    progress: 80,
    caseNumber: "274/2026",
    court: "محكمة العمال",
    priority: "عاجلة",
    degree: "استئناف",
    startDate: "12 نوفمبر 2025",
    claimAmount: 25e4,
    opponent: "مصنع الدلتا للصناعات",
    opponentLawyer: "الأستاذ وليد منصور",
    description: "دعوى تعويض عن إصابة عمل أدت إلى عجز جزئي، مع المطالبة بفروق الأجر ومستحقات التأمينات الاجتماعية.",
    files: ["تقرير طبي.pdf", "محضر الإصابة.pdf", "عقد العمل.pdf"]
  },
  {
    id: "c4",
    title: "دعوى إيجار",
    client: "منى عبد الله",
    type: "مدني",
    status: "مغلقة",
    nextDate: "—",
    progress: 100,
    caseNumber: "061/2025",
    court: "محكمة القاهرة",
    priority: "عادية",
    degree: "تنفيذ",
    startDate: "3 مارس 2025",
    claimAmount: 45e3,
    opponent: "ورثة المرحوم حسن علي",
    opponentLawyer: "الأستاذ ماجد سعيد",
    description: "دعوى إخلاء عين مؤجرة لعدم سداد الأجرة، صدر فيها حكم نهائي لصالح الموكلة وتم التنفيذ.",
    files: ["عقد الإيجار.pdf", "الحكم النهائي.pdf"]
  },
  {
    id: "c5",
    title: "نزاع علامة تجارية",
    client: "مؤسسة الأمل",
    type: "ملكية فكرية",
    status: "نشطة",
    nextDate: "18 يونيو 2026",
    progress: 25,
    caseNumber: "390/2026",
    court: "محكمة الاقتصادية",
    priority: "متوسطة",
    degree: "أول درجة",
    startDate: "1 أبريل 2026",
    claimAmount: 6e5,
    opponent: "شركة الريادة",
    opponentLawyer: "الأستاذة نهى جمال",
    description: "دعوى حماية علامة تجارية مسجلة ومنع الغير من استخدامها، مع المطالبة بالتعويض عن الأضرار التجارية.",
    files: ["شهادة تسجيل العلامة.pdf", "صور المنتجات المخالفة.pdf"]
  }
];
const dashClients = [
  {
    id: "u1",
    name: "أحمد سمير",
    phone: "+20 100 123 4567",
    altPhone: "+20 122 998 7654",
    email: "ahmed@mail.com",
    cases: 2,
    since: "يناير 2025",
    type: "فرد",
    city: "القاهرة",
    nationalId: "28704121200513",
    address: "12 شارع التحرير، الدقي، الجيزة",
    notes: "عميل متعاون، يفضّل التواصل مساءً عبر الهاتف.",
    files: ["صورة البطاقة.pdf", "توكيل رسمي.pdf"]
  },
  {
    id: "u2",
    name: "منى عبد الله",
    phone: "+20 101 234 5678",
    altPhone: "+20 111 222 3344",
    email: "mona@mail.com",
    cases: 1,
    since: "مارس 2025",
    type: "فرد",
    city: "الإسكندرية",
    nationalId: "29103154500218",
    address: "8 شارع فؤاد، محطة الرمل، الإسكندرية",
    notes: "تم إغلاق قضيتها بنجاح وقد توصي بمكتبنا لمعارفها."
  },
  {
    id: "u3",
    name: "كريم حسن",
    phone: "+20 102 345 6789",
    altPhone: "+20 100 555 6677",
    email: "karim@mail.com",
    cases: 3,
    since: "نوفمبر 2024",
    type: "فرد",
    city: "الجيزة",
    nationalId: "28912091800437",
    address: "45 شارع الهرم، الجيزة",
    notes: "لديه أكثر من قضية، يحتاج متابعة دورية لمواعيد الجلسات."
  },
  {
    id: "u4",
    name: "شركة النور",
    phone: "+20 103 456 7890",
    altPhone: "+20 2 3760 1122",
    email: "info@noor.com",
    cases: 1,
    since: "مايو 2025",
    type: "شركة",
    city: "القاهرة",
    nationalId: "سجل تجاري 145872",
    address: "برج النيل، كورنيش النيل، ماسبيرو، القاهرة",
    notes: "ممثل الشركة القانوني: م. طارق النجار — جميع المراسلات عبر البريد الرسمي.",
    files: ["السجل التجاري.pdf", "البطاقة الضريبية.pdf", "عقد التأسيس.pdf"]
  },
  {
    id: "u5",
    name: "مؤسسة الأمل",
    phone: "+20 104 567 8901",
    altPhone: "+20 2 2680 4455",
    email: "contact@amal.com",
    cases: 1,
    since: "فبراير 2025",
    type: "شركة",
    city: "القاهرة",
    nationalId: "سجل تجاري 209914",
    address: "22 شارع مكرم عبيد، مدينة نصر، القاهرة",
    notes: "مؤسسة خيرية، يلزم التنسيق المسبق قبل أي جلسة."
  }
];
const dashSessions = [
  { id: "s1", day: 8, title: "جلسة استئناف", client: "أحمد سمير", time: "10:00 ص", location: "محكمة الأسرة", status: "قادمة", type: "جلسة مرافعة", caseRef: "نزاع نفقة وحضانة", notes: "تقديم مذكرة الدفاع وحافظة المستندات قبل بدء الجلسة." },
  { id: "s2", day: 10, title: "استشارة عقد", client: "شركة النور", time: "01:00 م", location: "أونلاين", status: "قادمة", type: "استشارة", caseRef: "صياغة عقد شراكة", notes: "مراجعة البنود المالية مع ممثل الشركة عبر مكالمة فيديو." },
  { id: "s3", day: 15, title: "جلسة تعويض", client: "كريم حسن", time: "11:30 ص", location: "محكمة العمال", status: "قادمة", type: "جلسة استئناف", caseRef: "تعويض إصابة عمل", notes: "استدعاء الشاهد وإحضار التقرير الطبي المحدّث." },
  { id: "s4", day: 18, title: "مرافعة علامة", client: "مؤسسة الأمل", time: "09:00 ص", location: "محكمة الاقتصادية", status: "قادمة", type: "جلسة مرافعة", caseRef: "نزاع علامة تجارية", notes: "عرض أدلة المخالفة وشهادة تسجيل العلامة." },
  { id: "s5", day: 22, title: "متابعة قضية", client: "منى عبد الله", time: "12:00 م", location: "أونلاين", status: "قادمة", type: "متابعة قضية", caseRef: "دعوى إيجار", notes: "متابعة إجراءات التنفيذ بعد صدور الحكم." }
];
const dashReminders = [
  { id: "r1", text: "تسليم مذكرة دفاع قضية أحمد سمير", due: "اليوم", urgent: true },
  { id: "r2", text: "مراجعة عقد شركة النور قبل الجلسة", due: "خلال يومين", urgent: false },
  { id: "r3", text: "تجديد توكيل قضية كريم حسن", due: "20 يونيو", urgent: false }
];
const dashInvoices = [
  { id: "i1", number: "INV-2041", client: "أحمد سمير", amount: 5e3, date: "2 يونيو 2026", status: "مدفوعة", item: "أتعاب قضية", caseRef: "نزاع نفقة وحضانة", tax: 14, issueDate: "2 يونيو 2026", dueDate: "12 يونيو 2026", notes: "الدفعة الأولى من أتعاب القضية، تم السداد نقداً." },
  { id: "i2", number: "INV-2042", client: "شركة النور", amount: 12e3, date: "4 يونيو 2026", status: "معلقة", item: "صياغة عقد", caseRef: "صياغة عقد شراكة", tax: 14, issueDate: "4 يونيو 2026", dueDate: "18 يونيو 2026", notes: "أتعاب صياغة ومراجعة عقد الشراكة التجارية." },
  { id: "i3", number: "INV-2043", client: "كريم حسن", amount: 6500, date: "5 يونيو 2026", status: "مدفوعة", item: "تمثيل قانوني", caseRef: "تعويض إصابة عمل", tax: 14, issueDate: "5 يونيو 2026", dueDate: "15 يونيو 2026", notes: "أتعاب التمثيل أمام محكمة العمال." },
  { id: "i4", number: "INV-2039", client: "منى عبد الله", amount: 3e3, date: "28 مايو 2026", status: "متأخرة", item: "أتعاب قضية", caseRef: "دعوى إيجار", tax: 14, issueDate: "28 مايو 2026", dueDate: "4 يونيو 2026", notes: "الدفعة الأخيرة بعد صدور الحكم، متأخرة عن موعد الاستحقاق." }
];
const walletTransactions = [
  { id: "w1", label: "دفعة قضية أحمد سمير", date: "2 يونيو 2026", amount: 5e3 },
  { id: "w2", label: "سحب إلى المحفظة الإلكترونية", date: "30 مايو 2026", amount: -8e3 },
  { id: "w3", label: "دفعة قضية كريم حسن", date: "5 يونيو 2026", amount: 6500 },
  { id: "w4", label: "دفعة استشارة", date: "27 مايو 2026", amount: 2e3 }
];
const walletBalance = 42500;
const dashConsultations = [
  { id: "co1", client: "أحمد سمير", subject: "استشارة نفقة وحضانة", date: "8 يونيو 2026", time: "04:30 م", channel: "أونلاين", status: "قادمة", price: 500, duration: "45 دقيقة", caseRef: "نزاع نفقة وحضانة", notes: "مناقشة خطوات رفع دعوى النفقة والمستندات المطلوبة." },
  { id: "co2", client: "منى عبد الله", subject: "مراجعة عقد إيجار", date: "10 يونيو 2026", time: "11:00 ص", channel: "مكتب", status: "قادمة", price: 700, duration: "30 دقيقة", caseRef: "دعوى إيجار", notes: "مراجعة بنود عقد إيجار جديد قبل التوقيع." },
  { id: "co3", client: "كريم حسن", subject: "نزاع تجاري", date: "3 يونيو 2026", time: "01:00 م", channel: "هاتف", status: "مكتملة", price: 600, duration: "20 دقيقة", notes: "تم توضيح الموقف القانوني وإحالة الموضوع لقسم القضايا." },
  { id: "co4", client: "شركة النور", subject: "تأسيس شركة", date: "1 يونيو 2026", time: "10:00 ص", channel: "مكتب", status: "مكتملة", price: 1200, duration: "60 دقيقة", caseRef: "صياغة عقد شراكة", notes: "استشارة حول الشكل القانوني الأنسب للشركة والإجراءات." },
  { id: "co5", client: "مؤسسة الأمل", subject: "حماية علامة تجارية", date: "28 مايو 2026", time: "12:00 م", channel: "أونلاين", status: "ملغاة", price: 800, duration: "40 دقيقة", caseRef: "نزاع علامة تجارية", notes: "أُلغيت بناءً على طلب العميل وأُعيد الجدولة لاحقاً." }
];
const aiConversations = [
  {
    id: "conv1",
    title: "صياغة مذكرة دفاع",
    date: "أمس",
    messages: [
      { role: "user", text: "ساعدني في صياغة مذكرة دفاع في قضية نفقة." },
      { role: "ai", text: "بالتأكيد، إليك هيكل مذكرة الدفاع: أولاً البيانات، ثانياً الوقائع، ثالثاً الأسانيد القانونية، رابعاً الطلبات..." }
    ]
  },
  {
    id: "conv2",
    title: "إجراءات دعوى تعويض",
    date: "منذ 3 أيام",
    messages: [
      { role: "user", text: "ما هي إجراءات رفع دعوى تعويض إصابة عمل؟" },
      { role: "ai", text: "تبدأ الإجراءات بإثبات إصابة العمل عبر تقرير طبي، ثم تقديم الطلب لجهة العمل والتأمينات، وفي حال الرفض تُرفع الدعوى أمام المحكمة العمالية المختصة..." }
    ]
  },
  {
    id: "conv3",
    title: "مراجعة عقد شراكة",
    date: "منذ أسبوع",
    messages: [
      { role: "user", text: "راجع بنود عقد الشراكة التجارية." },
      { role: "ai", text: "عند مراجعة عقد الشراكة ركّز على: حصص الشركاء، توزيع الأرباح والخسائر، آلية اتخاذ القرار، وشروط الخروج وفض النزاعات..." }
    ]
  }
];
const lawyer = lawyers[0];
const nav = [{
  id: "overview",
  label: "الرئيسية",
  icon: LayoutDashboard
}, {
  id: "profile",
  label: "الملف الشخصي",
  icon: CircleUser
}, {
  id: "cases",
  label: "القضايا",
  icon: Briefcase
}, {
  id: "clients",
  label: "العملاء",
  icon: Users
}, {
  id: "sessions",
  label: "الجلسات",
  icon: CalendarDays
}, {
  id: "consultations",
  label: "الاستشارات",
  icon: MessageSquare
}, {
  id: "invoices",
  label: "الفواتير",
  icon: Receipt
}, {
  id: "wallet",
  label: "المحفظة",
  icon: Wallet
}, {
  id: "ai",
  label: "الذكاء الاصطناعي القانوني",
  icon: Sparkles
}];
const card = "rounded-2xl border border-white/10 bg-navy-card/60 p-6";
const fieldCls = "w-full rounded-lg border border-white/15 bg-navy-deep px-3 py-2.5 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none";
const statusColor = {
  "نشطة": "bg-emerald-500/15 text-emerald-400",
  "قيد المراجعة": "bg-gold/15 text-gold",
  "مغلقة": "bg-white/10 text-cream/60",
  "مدفوعة": "bg-emerald-500/15 text-emerald-400",
  "معلقة": "bg-gold/15 text-gold",
  "متأخرة": "bg-red-500/15 text-red-400",
  "قادمة": "bg-gold/15 text-gold",
  "مكتملة": "bg-emerald-500/15 text-emerald-400",
  "ملغاة": "bg-red-500/15 text-red-400",
  "منتهية": "bg-emerald-500/15 text-emerald-400",
  "مؤجلة": "bg-orange-500/15 text-orange-400"
};
function DashboardPage() {
  const user = useAuth();
  const navigate = useNavigate();
  const [section, setSection] = reactExports.useState("overview");
  reactExports.useEffect(() => {
    if (user === null) navigate({
      to: "/login"
    });
  }, [user, navigate]);
  const handleLogout = () => {
    logout();
    navigate({
      to: "/"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-navy", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-gradient-navy", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-10 md:flex-row md:items-center md:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: lawyer.image, alt: lawyer.name, width: 64, height: 64, className: "h-16 w-16 rounded-2xl border border-gold/30 object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream/60", children: "مرحباً بعودتك" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold text-gradient-gold md:text-3xl", children: lawyer.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 flex items-center gap-2 text-sm text-cream/65", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-gold" }),
            " ",
            lawyer.city,
            " — ",
            lawyer.title
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex items-center gap-2 rounded-md border border-white/15 px-4 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-white/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-4 w-4 text-gold" }),
          " الإشعارات"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleLogout, className: "flex items-center gap-2 rounded-md border border-gold/50 px-4 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-white/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4 text-gold" }),
          " تسجيل الخروج"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl gap-8 px-4 py-10 md:px-8 lg:flex", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "mb-8 lg:mb-0 lg:w-64 lg:shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-navy-card/60 p-2 lg:flex-col lg:overflow-visible", children: nav.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setSection(n.id), className: `flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${section === n.id ? "bg-gradient-gold text-navy shadow-gold" : "text-cream/75 hover:bg-white/5 hover:text-gold"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(n.icon, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "whitespace-nowrap", children: n.label })
      ] }, n.id)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        section === "overview" && /* @__PURE__ */ jsxRuntimeExports.jsx(Overview, { onNavigate: setSection }),
        section === "profile" && /* @__PURE__ */ jsxRuntimeExports.jsx(Profile, {}),
        section === "cases" && /* @__PURE__ */ jsxRuntimeExports.jsx(Cases, {}),
        section === "clients" && /* @__PURE__ */ jsxRuntimeExports.jsx(Clients, {}),
        section === "sessions" && /* @__PURE__ */ jsxRuntimeExports.jsx(Sessions, {}),
        section === "consultations" && /* @__PURE__ */ jsxRuntimeExports.jsx(Consultations, {}),
        section === "invoices" && /* @__PURE__ */ jsxRuntimeExports.jsx(Invoices, {}),
        section === "wallet" && /* @__PURE__ */ jsxRuntimeExports.jsx(WalletPanel, {}),
        section === "ai" && /* @__PURE__ */ jsxRuntimeExports.jsx(LegalAI, {})
      ] })
    ] })
  ] });
}
function Toolbar({
  search,
  setSearch,
  placeholder,
  filter,
  setFilter,
  options,
  filter2,
  setFilter2,
  options2,
  onAdd,
  addLabel
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex flex-col gap-3 sm:flex-row sm:items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: search, onChange: (e) => setSearch(e.target.value), placeholder, className: `${fieldCls} pr-9` })
    ] }),
    options && setFilter && /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: filter, onChange: (e) => setFilter(e.target.value), className: `${fieldCls} sm:w-44`, children: options.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: o.value, className: "bg-navy-deep", children: o.label }, o.value)) }),
    options2 && setFilter2 && /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: filter2, onChange: (e) => setFilter2(e.target.value), className: `${fieldCls} sm:w-44`, children: options2.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: o.value, className: "bg-navy-deep", children: o.label }, o.value)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onAdd, className: "flex items-center justify-center gap-2 rounded-lg bg-gradient-gold px-4 py-2.5 text-sm font-bold text-navy shadow-gold transition-transform hover:-translate-y-0.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
      " ",
      addLabel
    ] })
  ] });
}
function Modal({
  title,
  onClose,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-navy-deep/80 p-4", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-navy-card p-6", onClick: (e) => e.stopPropagation(), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-cream", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, className: "text-cream/60 hover:text-gold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) })
    ] }),
    children
  ] }) });
}
function FormPage({
  title,
  subtitle,
  icon: Icon,
  onBack,
  onSubmit,
  submitLabel,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onBack, className: "flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-cream transition-colors hover:bg-white/5 hover:text-gold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "flex items-center gap-2 text-lg font-bold text-cream", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5 text-gold" }),
          " ",
          title
        ] }),
        subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-sm text-cream/55", children: subtitle })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: card, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onBack, className: "flex-1 rounded-lg border border-white/15 py-3 text-sm font-semibold text-cream transition-colors hover:bg-white/5 sm:flex-none sm:px-8", children: "إلغاء" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", className: "flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-gold py-3 text-sm font-bold text-navy shadow-gold transition-transform hover:-translate-y-0.5 sm:flex-none sm:px-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
          " ",
          submitLabel
        ] })
      ] })
    ] })
  ] });
}
function FormSection({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-4 border-b border-white/10 pb-2 text-sm font-bold text-gold", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2", children })
  ] });
}
function DetailPage({
  title,
  subtitle,
  icon: Icon,
  status,
  onBack,
  actions,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onBack, className: "flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-cream transition-colors hover:bg-white/5 hover:text-gold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "flex items-center gap-2 text-lg font-bold text-cream", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5 text-gold" }),
            " ",
            title
          ] }),
          subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-sm text-cream/55", children: subtitle })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        status && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-3 py-1 text-xs font-medium ${statusColor[status] ?? "bg-white/10 text-cream/60"}`, children: status }),
        actions
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children })
  ] });
}
function DetailGrid({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: card, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-4 border-b border-white/10 pb-2 text-sm font-bold text-gold", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2", children })
  ] });
}
function DetailItem({
  label,
  value,
  full
}) {
  if (value === void 0 || value === null || value === "" || value === "—") return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-xl border border-white/10 bg-navy-deep/50 p-4 ${full ? "sm:col-span-2" : ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-cream/50", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm leading-relaxed text-cream", children: value })
  ] });
}
function RelatedSection({
  title,
  icon: Icon,
  items
}) {
  if (items.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: card, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "mb-4 flex items-center gap-2 border-b border-white/10 pb-2 text-sm font-bold text-gold", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
      " ",
      title,
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-cream/40", children: [
        "(",
        items.length,
        ")"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: items.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-navy-deep/50 p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-cream", children: it.primary }),
        it.secondary && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-cream/60", children: it.secondary }),
        it.meta && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-cream/45", children: it.meta })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        it.amount && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-extrabold text-cream", children: it.amount }),
        it.status && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-3 py-1 text-xs font-medium ${statusColor[it.status] ?? "bg-white/10 text-cream/60"}`, children: it.status })
      ] })
    ] }, it.id)) })
  ] });
}
function StatusChanger({
  value,
  options,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-xs text-cream/60", children: [
    "الحالة",
    /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value, onChange: (e) => onChange(e.target.value), className: "rounded-lg border border-white/15 bg-navy-deep px-3 py-2 text-sm font-semibold text-cream focus:border-gold focus:outline-none", children: options.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: o, className: "bg-navy-deep", children: o }, o)) })
  ] });
}
function ViewButton({
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick, "aria-label": "عرض التفاصيل", className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/15 text-cream/70 transition-colors hover:border-gold hover:text-gold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) });
}
function CommentsPanel({
  comments,
  onAdd
}) {
  const [text, setText] = reactExports.useState("");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: card, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "mb-4 flex items-center gap-2 border-b border-white/10 pb-2 text-sm font-bold text-gold", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }),
      " التعليقات"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 space-y-3", children: [
      comments.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/10 bg-navy-deep/50 p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-cream", children: c.text }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-cream/45", children: c.date })
      ] }, c.id)),
      comments.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream/50", children: "لا توجد تعليقات بعد." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
      e.preventDefault();
      if (text.trim()) {
        onAdd(text.trim());
        setText("");
      }
    }, className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: text, onChange: (e) => setText(e.target.value), placeholder: "أضف تعليقاً...", className: `${fieldCls} flex-1` }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", className: "flex items-center gap-2 rounded-lg bg-gradient-gold px-4 py-2.5 text-sm font-bold text-navy shadow-gold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" }),
        " إضافة"
      ] })
    ] })
  ] });
}
function TimelinePanel({
  events
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: card, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "mb-4 flex items-center gap-2 border-b border-white/10 pb-2 text-sm font-bold text-gold", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "h-4 w-4" }),
      " التايم لاين"
    ] }),
    events.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream/50", children: "لا توجد أحداث بعد." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-5 border-r border-white/10 pr-5", children: events.map((ev) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -right-[1.42rem] top-1.5 h-3 w-3 rounded-full bg-gold ring-4 ring-navy-card" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-cream", children: ev.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-cream/45", children: ev.date }),
      ev.desc && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-cream/70", children: ev.desc })
    ] }, ev.id)) })
  ] });
}
function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
  required
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: fieldCls, value, onChange: (e) => onChange(e.target.value), required, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", disabled: true, className: "bg-navy-deep", children: placeholder }),
    options.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: o, className: "bg-navy-deep", children: o }, o))
  ] }) });
}
function FileField({
  label,
  files,
  setFiles
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-white/25 bg-navy-deep px-3 py-4 text-sm text-cream/60 transition-colors hover:border-gold hover:text-gold", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Paperclip, { className: "h-4 w-4" }),
      " اسحب الملفات أو اضغط للرفع",
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", multiple: true, className: "hidden", onChange: (e) => setFiles([...files, ...Array.from(e.target.files ?? []).map((f) => f.name)]) })
    ] }),
    files.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-2 space-y-1.5", children: files.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between rounded-lg border border-white/10 bg-navy-deep/50 px-3 py-2 text-xs text-cream/75", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 truncate", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-3.5 w-3.5 shrink-0 text-gold" }),
        " ",
        f
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setFiles(files.filter((_, idx) => idx !== i)), className: "text-cream/50 hover:text-red-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }) })
    ] }, `${f}-${i}`)) })
  ] });
}
function VideoCall({
  consultation,
  onClose
}) {
  const [seconds, setSeconds] = reactExports.useState(0);
  const [micOn, setMicOn] = reactExports.useState(true);
  const [camOn, setCamOn] = reactExports.useState(true);
  const [sharing, setSharing] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const t = setInterval(() => setSeconds((s) => s + 1), 1e3);
    return () => clearInterval(t);
  }, []);
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const clientInitial = consultation.client.trim().charAt(0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex flex-col bg-gradient-navy p-3 sm:p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-navy-card/70 px-4 py-3 backdrop-blur", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2 text-sm font-bold text-cream", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-2 w-2 animate-pulse rounded-full bg-red-500" }),
          " مكالمة فيديو مباشرة"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 truncate text-xs text-cream/55", children: [
          consultation.subject,
          " — ",
          consultation.client
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full border border-gold/30 bg-gold/10 px-3 py-1 font-mono text-sm font-bold text-gold", children: [
        mm,
        ":",
        ss
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-3 grid flex-1 grid-cols-1 gap-3 sm:my-5 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-navy-deep", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(201,162,77,0.12),transparent_60%)]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-24 w-24 items-center justify-center rounded-full bg-gradient-gold text-3xl font-extrabold text-navy shadow-gold sm:h-28 sm:w-28", children: clientInitial }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-navy-deep/80 px-3 py-1 text-xs font-semibold text-cream backdrop-blur", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-400" }),
          " ",
          consultation.client,
          " (العميل)"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center justify-center overflow-hidden rounded-3xl border border-gold/30 bg-navy-deep", children: [
        camOn ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: lawyer.image, alt: lawyer.name, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-24 w-24 items-center justify-center rounded-full bg-white/10 text-cream/70", children: /* @__PURE__ */ jsxRuntimeExports.jsx(VideoOff, { className: "h-8 w-8" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-navy-deep/80 px-3 py-1 text-xs font-semibold text-cream backdrop-blur", children: [
          micOn ? /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "h-3 w-3 text-emerald-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(MicOff, { className: "h-3 w-3 text-red-400" }),
          " ",
          lawyer.name,
          " (أنت)"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-navy-card/70 px-4 py-4 backdrop-blur", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMicOn((v) => !v), "aria-label": "الميكروفون", className: `flex h-12 w-12 items-center justify-center rounded-full transition-colors ${micOn ? "bg-white/10 text-cream hover:bg-white/15" : "bg-red-500/20 text-red-400"}`, children: micOn ? /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(MicOff, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setCamOn((v) => !v), "aria-label": "الكاميرا", className: `flex h-12 w-12 items-center justify-center rounded-full transition-colors ${camOn ? "bg-white/10 text-cream hover:bg-white/15" : "bg-red-500/20 text-red-400"}`, children: camOn ? /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(VideoOff, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSharing((v) => !v), "aria-label": "مشاركة الشاشة", className: `hidden h-12 w-12 items-center justify-center rounded-full transition-colors sm:flex ${sharing ? "bg-gold/20 text-gold" : "bg-white/10 text-cream hover:bg-white/15"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(MonitorUp, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onClose, "aria-label": "إنهاء المكالمة", className: "flex h-12 items-center justify-center gap-2 rounded-full bg-red-500 px-6 text-sm font-bold text-white transition-colors hover:bg-red-600", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneOff, { className: "h-5 w-5" }),
        " إنهاء"
      ] })
    ] })
  ] });
}
function Overview({
  onNavigate
}) {
  const stats = [{
    label: "إجمالي الأرباح",
    value: "84,500 ج.م",
    icon: Wallet,
    hint: "هذا الشهر +12%"
  }, {
    label: "قضايا نشطة",
    value: String(dashCases.filter((c) => c.status === "نشطة").length),
    icon: Briefcase,
    hint: "قيد المتابعة"
  }, {
    label: "عملاء",
    value: String(dashClients.length),
    icon: Users,
    hint: "إجمالي"
  }, {
    label: "متوسط التقييم",
    value: lawyer.rating.toFixed(1),
    icon: Star,
    hint: `${lawyer.reviews} تقييم`
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-4", children: stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/10 bg-navy-card/60 p-6 transition-all hover:-translate-y-1 hover:border-gold/40", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex h-11 w-11 items-center justify-center rounded-lg bg-gold/15 text-gold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4 text-gold/60" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-2xl font-extrabold text-cream", children: s.value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-cream/65", children: s.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-gold/80", children: s.hint })
    ] }, s.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `${card} lg:col-span-2`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "flex items-center gap-2 text-lg font-bold text-cream", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-5 w-5 text-gold" }),
            " الجلسات القادمة"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => onNavigate("sessions"), className: "text-xs font-semibold text-gold hover:underline", children: "عرض التقويم" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: dashSessions.slice(0, 4).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 rounded-xl border border-white/10 bg-navy-deep/50 p-4 sm:flex-row sm:items-center sm:justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-cream", children: s.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-sm text-cream/60", children: s.client })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-sm text-cream/70", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-4 w-4 text-gold" }),
              " ",
              s.day,
              " يونيو"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-gold" }),
              " ",
              s.time
            ] })
          ] })
        ] }, s.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: card, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mb-4 flex items-center gap-2 text-lg font-bold text-cream", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-5 w-5 text-gold" }),
          " التذكيرات"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: dashReminders.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 rounded-xl border border-white/10 bg-navy-deep/50 p-3", children: [
          r.urgent ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "mt-0.5 h-4 w-4 shrink-0 text-red-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mt-0.5 h-4 w-4 shrink-0 text-gold" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream", children: r.text }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-cream/50", children: r.due })
          ] })
        ] }, r.id)) })
      ] })
    ] })
  ] });
}
const PROFILE_KEY = "muhamik_profile";
function Profile() {
  const initial = {
    name: lawyer.name,
    title: lawyer.title,
    specialty: lawyer.specialty,
    city: lawyer.city,
    price: lawyer.price,
    experience: lawyer.experience,
    phone: lawyer.phone,
    email: lawyer.email,
    bio: lawyer.bio
  };
  const [data, setData] = reactExports.useState(initial);
  const [editing, setEditing] = reactExports.useState(false);
  const [saved, setSaved] = reactExports.useState(false);
  reactExports.useEffect(() => {
    try {
      const raw = localStorage.getItem(PROFILE_KEY);
      if (raw) setData({
        ...initial,
        ...JSON.parse(raw)
      });
    } catch {
    }
  }, []);
  const save = (e) => {
    e.preventDefault();
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(data));
    } catch {
    }
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };
  const set = (k, v) => setData((d) => ({
    ...d,
    [k]: v
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: card, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "flex items-center gap-2 text-lg font-bold text-cream", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleUser, { className: "h-5 w-5 text-gold" }),
        " الملف الشخصي العام"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/lawyers/$lawyerId", params: {
          lawyerId: lawyer.id
        }, className: "rounded-md border border-white/15 px-3 py-2 text-xs font-semibold text-cream hover:bg-white/5", children: "عرض على الموقع" }),
        !editing && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setEditing(true), className: "flex items-center gap-2 rounded-md bg-gradient-gold px-4 py-2 text-xs font-bold text-navy shadow-gold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" }),
          " تعديل"
        ] })
      ] })
    ] }),
    saved && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400", children: "تم حفظ بيانات الملف بنجاح وستظهر على الموقع." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: lawyer.image, alt: data.name, width: 72, height: 72, className: "h-18 w-18 rounded-2xl border border-gold/30 object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-cream", children: data.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream/60", children: data.title })
      ] })
    ] }),
    editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: save, className: "grid gap-4 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "الاسم", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: fieldCls, value: data.name, onChange: (e) => set("name", e.target.value), required: true }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "المسمى", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: fieldCls, value: data.title, onChange: (e) => set("title", e.target.value), required: true }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "التخصص", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: fieldCls, value: data.specialty, onChange: (e) => set("specialty", e.target.value) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "المدينة", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: fieldCls, value: data.city, onChange: (e) => set("city", e.target.value) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "سعر الاستشارة (ج.م)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", className: fieldCls, value: data.price, onChange: (e) => set("price", Number(e.target.value)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "سنوات الخبرة", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", className: fieldCls, value: data.experience, onChange: (e) => set("experience", Number(e.target.value)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "الهاتف", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: fieldCls, value: data.phone, onChange: (e) => set("phone", e.target.value) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "البريد الإلكتروني", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", className: fieldCls, value: data.email, onChange: (e) => set("email", e.target.value) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "نبذة تعريفية", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 4, className: fieldCls, value: data.bio, onChange: (e) => set("bio", e.target.value) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 sm:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
          setData(initial);
          setEditing(false);
        }, className: "flex-1 rounded-lg border border-white/15 py-2.5 text-sm font-semibold text-cream", children: "إلغاء" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", className: "flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-gold py-2.5 text-sm font-bold text-navy shadow-gold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-4 w-4" }),
          " حفظ"
        ] })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { label: "التخصص", value: data.specialty }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { label: "المدينة", value: data.city }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { label: "سعر الاستشارة", value: `${data.price} ج.م` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { label: "سنوات الخبرة", value: `${data.experience} سنة` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { label: "الهاتف", value: data.phone }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { label: "البريد الإلكتروني", value: data.email }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { label: "نبذة تعريفية", value: data.bio }) })
    ] })
  ] }) });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1.5 block text-sm font-medium text-cream/80", children: label }),
    children
  ] });
}
function Info({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/10 bg-navy-deep/50 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-cream/50", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm leading-relaxed text-cream", children: value })
  ] });
}
function Cases() {
  const [items, setItems] = reactExports.useState(dashCases);
  const [search, setSearch] = reactExports.useState("");
  const [filter, setFilter] = reactExports.useState("all");
  const [typeFilter, setTypeFilter] = reactExports.useState("all");
  const [adding, setAdding] = reactExports.useState(false);
  const [viewingId, setViewingId] = reactExports.useState(null);
  const [comments, setComments] = reactExports.useState({});
  const [timelines, setTimelines] = reactExports.useState({});
  const emptyForm = {
    title: "",
    caseNumber: "",
    client: "",
    type: "",
    court: "",
    degree: "",
    status: "نشطة",
    priority: "عادية",
    nextDate: "",
    startDate: "",
    progress: "0",
    opponent: "",
    opponentLawyer: "",
    claimAmount: "",
    description: ""
  };
  const [form, setForm] = reactExports.useState(emptyForm);
  const [files, setFiles] = reactExports.useState([]);
  const clientNames = dashClients.map((c) => c.name);
  const viewing = items.find((c) => c.id === viewingId) ?? null;
  const baseTimeline = (c) => [{
    id: "b1",
    title: "تم إنشاء القضية",
    date: c.startDate ?? "—"
  }, ...c.nextDate && c.nextDate !== "—" ? [{
    id: "b2",
    title: "الجلسة القادمة",
    date: c.nextDate
  }] : [], {
    id: "b3",
    title: `الحالة الحالية: ${c.status}`,
    date: "الآن"
  }];
  const getTimeline = (c) => timelines[c.id] ?? baseTimeline(c);
  const addComment = (id, text) => setComments((p) => ({
    ...p,
    [id]: [...p[id] ?? [], {
      id: `cm${Date.now()}`,
      text,
      date: "الآن"
    }]
  }));
  const changeStatus = (c, status) => {
    setItems((p) => p.map((it) => it.id === c.id ? {
      ...it,
      status
    } : it));
    setTimelines((p) => ({
      ...p,
      [c.id]: [...p[c.id] ?? baseTimeline(c), {
        id: `tl${Date.now()}`,
        title: `تم تغيير الحالة إلى ${status}`,
        date: "الآن"
      }]
    }));
  };
  const filtered = items.filter((c) => (filter === "all" || c.status === filter) && (typeFilter === "all" || c.type === typeFilter) && (c.title.includes(search) || c.client.includes(search) || c.type.includes(search) || (c.caseNumber ?? "").includes(search) || (c.court ?? "").includes(search)));
  const add = (e) => {
    e.preventDefault();
    setItems((p) => [{
      id: `c${Date.now()}`,
      title: form.title,
      client: form.client,
      type: form.type,
      status: form.status,
      nextDate: form.nextDate || "—",
      progress: Number(form.progress) || 0,
      caseNumber: form.caseNumber || void 0,
      court: form.court || void 0,
      priority: form.priority,
      description: form.description || void 0,
      files: files.length ? files : void 0,
      degree: form.degree || void 0,
      startDate: form.startDate || void 0,
      opponent: form.opponent || void 0,
      opponentLawyer: form.opponentLawyer || void 0,
      claimAmount: form.claimAmount ? Number(form.claimAmount) : void 0
    }, ...p]);
    setForm(emptyForm);
    setFiles([]);
    setAdding(false);
  };
  if (adding) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(FormPage, { title: "إضافة قضية جديدة", subtitle: "أدخل كل بيانات القضية والمستندات المرتبطة بها", icon: Briefcase, onBack: () => setAdding(false), onSubmit: add, submitLabel: "حفظ القضية", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FormSection, { title: "بيانات أساسية", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "عنوان القضية", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: fieldCls, value: form.title, onChange: (e) => setForm({
          ...form,
          title: e.target.value
        }), required: true }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "رقم القضية", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: fieldCls, placeholder: "123/2026", value: form.caseNumber, onChange: (e) => setForm({
          ...form,
          caseNumber: e.target.value
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectField, { label: "العميل", value: form.client, onChange: (v) => setForm({
          ...form,
          client: v
        }), options: clientNames, placeholder: "اختر العميل", required: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectField, { label: "نوع القضية", value: form.type, onChange: (v) => setForm({
          ...form,
          type: v
        }), options: caseTypes, placeholder: "اختر النوع", required: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectField, { label: "درجة التقاضي", value: form.degree, onChange: (v) => setForm({
          ...form,
          degree: v
        }), options: caseDegrees, placeholder: "اختر الدرجة" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FormSection, { title: "المحكمة والجدول", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectField, { label: "المحكمة", value: form.court, onChange: (v) => setForm({
          ...form,
          court: v
        }), options: courts, placeholder: "اختر المحكمة" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "تاريخ بدء القضية", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: fieldCls, placeholder: "1 يونيو 2026", value: form.startDate, onChange: (e) => setForm({
          ...form,
          startDate: e.target.value
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "تاريخ الجلسة القادمة", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: fieldCls, placeholder: "10 يونيو 2026", value: form.nextDate, onChange: (e) => setForm({
          ...form,
          nextDate: e.target.value
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectField, { label: "الحالة", value: form.status, onChange: (v) => setForm({
          ...form,
          status: v
        }), options: ["نشطة", "قيد المراجعة", "مغلقة"], placeholder: "اختر الحالة" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectField, { label: "الأولوية", value: form.priority, onChange: (v) => setForm({
          ...form,
          priority: v
        }), options: ["عادية", "متوسطة", "عاجلة"], placeholder: "اختر الأولوية" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "نسبة الإنجاز (%)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 0, max: 100, className: fieldCls, value: form.progress, onChange: (e) => setForm({
          ...form,
          progress: e.target.value
        }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FormSection, { title: "الطرف الآخر", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "اسم الخصم", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: fieldCls, value: form.opponent, onChange: (e) => setForm({
          ...form,
          opponent: e.target.value
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "محامي الخصم", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: fieldCls, value: form.opponentLawyer, onChange: (e) => setForm({
          ...form,
          opponentLawyer: e.target.value
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "قيمة المطالبة (ج.م)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 0, className: fieldCls, value: form.claimAmount, onChange: (e) => setForm({
          ...form,
          claimAmount: e.target.value
        }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-4 border-b border-white/10 pb-2 text-sm font-bold text-gold", children: "تفاصيل ومستندات" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "وصف القضية", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 4, className: fieldCls, value: form.description, onChange: (e) => setForm({
            ...form,
            description: e.target.value
          }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileField, { label: "ملفات ومستندات القضية", files, setFiles })
        ] })
      ] })
    ] });
  }
  if (viewing) {
    const c = viewing;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(DetailPage, { title: c.title, subtitle: `${c.client} — ${c.type}`, icon: Briefcase, onBack: () => setViewingId(null), actions: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusChanger, { value: c.status, options: ["نشطة", "قيد المراجعة", "مغلقة"], onChange: (v) => changeStatus(c, v) }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: card, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-cream", children: "نسبة الإنجاز" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-cream/55", children: [
            c.progress,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 overflow-hidden rounded-full bg-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-gradient-gold", style: {
          width: `${c.progress}%`
        } }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DetailGrid, { title: "بيانات أساسية", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "رقم القضية", value: c.caseNumber }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "نوع القضية", value: c.type }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "العميل", value: c.client }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "درجة التقاضي", value: c.degree }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "الأولوية", value: c.priority }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "الحالة", value: c.status })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DetailGrid, { title: "المحكمة والجدول", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "المحكمة", value: c.court }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "تاريخ البدء", value: c.startDate }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "الجلسة القادمة", value: c.nextDate })
      ] }),
      (c.opponent || c.opponentLawyer || c.claimAmount) && /* @__PURE__ */ jsxRuntimeExports.jsxs(DetailGrid, { title: "الطرف الآخر", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "اسم الخصم", value: c.opponent }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "محامي الخصم", value: c.opponentLawyer }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "قيمة المطالبة", value: c.claimAmount ? `${c.claimAmount.toLocaleString()} ج.م` : void 0 })
      ] }),
      (c.description || c.files && c.files.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: card, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-4 border-b border-white/10 pb-2 text-sm font-bold text-gold", children: "تفاصيل ومستندات" }),
        c.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4 text-sm leading-relaxed text-cream/85", children: c.description }),
        c.files && c.files.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: c.files.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2 rounded-lg border border-white/10 bg-navy-deep/50 px-3 py-2 text-sm text-cream/75", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 shrink-0 text-gold" }),
          " ",
          f
        ] }, `${f}-${i}`)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(RelatedSection, { title: "جلسات القضية", icon: CalendarDays, items: dashSessions.filter((s) => s.caseRef === c.title).map((s) => ({
        id: s.id,
        primary: s.title,
        secondary: `${s.day} يونيو 2026 — ${s.time}`,
        meta: s.location,
        status: s.status
      })) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(RelatedSection, { title: "فواتير القضية", icon: Receipt, items: dashInvoices.filter((iv) => iv.caseRef === c.title).map((iv) => ({
        id: iv.id,
        primary: iv.number,
        secondary: iv.item,
        meta: iv.issueDate ?? iv.date,
        status: iv.status,
        amount: `${iv.amount.toLocaleString()} ج.م`
      })) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TimelinePanel, { events: getTimeline(c) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommentsPanel, { comments: comments[c.id] ?? [], onAdd: (t) => addComment(c.id, t) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: card, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mb-5 flex items-center gap-2 text-lg font-bold text-cream", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-5 w-5 text-gold" }),
      " القضايا"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toolbar, { search, setSearch, placeholder: "ابحث بالعنوان أو العميل أو رقم القضية...", filter, setFilter, options: [{
      value: "all",
      label: "كل الحالات"
    }, {
      value: "نشطة",
      label: "نشطة"
    }, {
      value: "قيد المراجعة",
      label: "قيد المراجعة"
    }, {
      value: "مغلقة",
      label: "مغلقة"
    }], filter2: typeFilter, setFilter2: setTypeFilter, options2: [{
      value: "all",
      label: "كل الأنواع"
    }, ...caseTypes.map((t) => ({
      value: t,
      label: t
    }))], onAdd: () => setAdding(true), addLabel: "إضافة قضية" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      filtered.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/10 bg-navy-deep/50 p-4 transition-colors hover:border-gold/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-cream", children: c.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 text-sm text-cream/60", children: [
              c.client,
              " — ",
              c.type
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 flex flex-wrap items-center gap-3 text-xs text-cream/45", children: [
              c.caseNumber && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { className: "h-3 w-3 text-gold" }),
                c.caseNumber
              ] }),
              c.court && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Gavel, { className: "h-3 w-3 text-gold" }),
                c.court
              ] }),
              c.files && c.files.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Paperclip, { className: "h-3 w-3 text-gold" }),
                c.files.length,
                " ملف"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-3 py-1 text-xs font-medium ${statusColor[c.status]}`, children: c.status }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ViewButton, { onClick: () => setViewingId(c.id) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 flex-1 overflow-hidden rounded-full bg-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full bg-gradient-gold", style: {
            width: `${c.progress}%`
          } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-cream/55", children: [
            c.progress,
            "%"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-cream/55", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-3.5 w-3.5 text-gold" }),
            " ",
            c.nextDate
          ] })
        ] })
      ] }, c.id)),
      filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-6 text-center text-sm text-cream/50", children: "لا توجد نتائج." })
    ] })
  ] });
}
function Clients() {
  const [items, setItems] = reactExports.useState(dashClients);
  const [search, setSearch] = reactExports.useState("");
  const [filter, setFilter] = reactExports.useState("all");
  const [adding, setAdding] = reactExports.useState(false);
  const [viewingId, setViewingId] = reactExports.useState(null);
  const [comments, setComments] = reactExports.useState({});
  const emptyForm = {
    name: "",
    phone: "",
    altPhone: "",
    email: "",
    type: "فرد",
    city: "",
    nationalId: "",
    address: "",
    notes: ""
  };
  const [form, setForm] = reactExports.useState(emptyForm);
  const [files, setFiles] = reactExports.useState([]);
  const viewing = items.find((c) => c.id === viewingId) ?? null;
  const addComment = (id, text) => setComments((p) => ({
    ...p,
    [id]: [...p[id] ?? [], {
      id: `cm${Date.now()}`,
      text,
      date: "الآن"
    }]
  }));
  const filtered = items.filter((c) => (filter === "all" || (filter === "active" ? c.cases > 0 : c.cases === 0)) && (c.name.includes(search) || c.phone.includes(search) || c.email.includes(search) || (c.city ?? "").includes(search)));
  const add = (e) => {
    e.preventDefault();
    setItems((p) => [{
      id: `u${Date.now()}`,
      name: form.name,
      phone: form.phone,
      email: form.email,
      cases: 0,
      since: "يونيو 2026",
      type: form.type,
      city: form.city || void 0,
      nationalId: form.nationalId || void 0,
      altPhone: form.altPhone || void 0,
      address: form.address || void 0,
      notes: form.notes || void 0,
      files: files.length ? files : void 0
    }, ...p]);
    setForm(emptyForm);
    setFiles([]);
    setAdding(false);
  };
  if (adding) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(FormPage, { title: "إضافة عميل جديد", subtitle: "سجّل بيانات التواصل والتعريف الخاصة بالعميل", icon: Users, onBack: () => setAdding(false), onSubmit: add, submitLabel: "حفظ العميل", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FormSection, { title: "البيانات الأساسية", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "الاسم الكامل", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: fieldCls, value: form.name, onChange: (e) => setForm({
          ...form,
          name: e.target.value
        }), required: true }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectField, { label: "نوع العميل", value: form.type, onChange: (v) => setForm({
          ...form,
          type: v
        }), options: ["فرد", "شركة"], placeholder: "اختر النوع" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "المدينة", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: fieldCls, value: form.city, onChange: (e) => setForm({
          ...form,
          city: e.target.value
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: form.type === "شركة" ? "رقم السجل التجاري" : "الرقم القومي", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: fieldCls, value: form.nationalId, onChange: (e) => setForm({
          ...form,
          nationalId: e.target.value
        }) }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FormSection, { title: "بيانات التواصل", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "الهاتف", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "tel", className: fieldCls, placeholder: "01XXXXXXXXX", value: form.phone, onChange: (e) => setForm({
          ...form,
          phone: e.target.value
        }), required: true }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "هاتف بديل", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "tel", className: fieldCls, placeholder: "01XXXXXXXXX", value: form.altPhone, onChange: (e) => setForm({
          ...form,
          altPhone: e.target.value
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "البريد الإلكتروني", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", className: fieldCls, value: form.email, onChange: (e) => setForm({
          ...form,
          email: e.target.value
        }), required: true }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "العنوان", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: fieldCls, value: form.address, onChange: (e) => setForm({
          ...form,
          address: e.target.value
        }) }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-4 border-b border-white/10 pb-2 text-sm font-bold text-gold", children: "ملاحظات" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "ملاحظات إضافية", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 3, className: fieldCls, value: form.notes, onChange: (e) => setForm({
          ...form,
          notes: e.target.value
        }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-4 border-b border-white/10 pb-2 text-sm font-bold text-gold", children: "المرفقات" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileField, { label: "مستندات وملفات العميل", files, setFiles })
      ] })
    ] });
  }
  if (viewing) {
    const c = viewing;
    const relatedCases = dashCases.filter((cs) => cs.client === c.name);
    const relatedSessions = dashSessions.filter((s) => s.client === c.name);
    const relatedInvoices = dashInvoices.filter((iv) => iv.client === c.name);
    const totalBilled = relatedInvoices.reduce((sum, iv) => sum + iv.amount, 0);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(DetailPage, { title: c.name, subtitle: c.type ? `${c.type}${c.city ? ` — ${c.city}` : ""}` : c.city, icon: Users, onBack: () => setViewingId(null), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/10 bg-navy-deep/50 p-4 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-cream/50", children: "القضايا" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xl font-extrabold text-cream", children: relatedCases.length })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/10 bg-navy-deep/50 p-4 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-cream/50", children: "الجلسات" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xl font-extrabold text-cream", children: relatedSessions.length })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/10 bg-navy-deep/50 p-4 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-cream/50", children: "إجمالي الفواتير" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xl font-extrabold text-gold", children: [
            totalBilled.toLocaleString(),
            " ج.م"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DetailGrid, { title: "بيانات التواصل", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "الهاتف", value: c.phone }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "هاتف بديل", value: c.altPhone }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "البريد الإلكتروني", value: c.email }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "العنوان", value: c.address, full: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DetailGrid, { title: "بيانات التعريف", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "نوع العميل", value: c.type }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "المدينة", value: c.city }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: c.type === "شركة" ? "السجل التجاري" : "الرقم القومي", value: c.nationalId }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "عدد القضايا", value: c.cases }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "عميل منذ", value: c.since })
      ] }),
      c.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: card, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-3 border-b border-white/10 pb-2 text-sm font-bold text-gold", children: "ملاحظات" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-cream/85", children: c.notes })
      ] }),
      c.files && c.files.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: card, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "mb-4 flex items-center gap-2 border-b border-white/10 pb-2 text-sm font-bold text-gold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Paperclip, { className: "h-4 w-4" }),
          " المرفقات ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-cream/40", children: [
            "(",
            c.files.length,
            ")"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: c.files.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2 rounded-lg border border-white/10 bg-navy-deep/50 px-3 py-2 text-sm text-cream/75", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 shrink-0 text-gold" }),
          " ",
          f
        ] }, `${f}-${i}`)) })
      ] }),
      relatedCases.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: card, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-4 border-b border-white/10 pb-2 text-sm font-bold text-gold", children: "قضايا العميل" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: relatedCases.map((cs) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-xl border border-white/10 bg-navy-deep/50 p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-cream", children: cs.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-cream/60", children: cs.type })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-3 py-1 text-xs font-medium ${statusColor[cs.status]}`, children: cs.status })
        ] }, cs.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(RelatedSection, { title: "جلسات العميل", icon: CalendarDays, items: relatedSessions.map((s) => ({
        id: s.id,
        primary: s.title,
        secondary: `${s.day} يونيو 2026 — ${s.time}`,
        meta: s.location,
        status: s.status
      })) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(RelatedSection, { title: "فواتير العميل", icon: Receipt, items: relatedInvoices.map((iv) => ({
        id: iv.id,
        primary: iv.number,
        secondary: iv.item,
        meta: iv.issueDate ?? iv.date,
        status: iv.status,
        amount: `${iv.amount.toLocaleString()} ج.م`
      })) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommentsPanel, { comments: comments[c.id] ?? [], onAdd: (t) => addComment(c.id, t) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: card, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mb-5 flex items-center gap-2 text-lg font-bold text-cream", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5 text-gold" }),
      " العملاء"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toolbar, { search, setSearch, placeholder: "ابحث في العملاء...", filter, setFilter, options: [{
      value: "all",
      label: "كل العملاء"
    }, {
      value: "active",
      label: "لديهم قضايا"
    }, {
      value: "none",
      label: "بدون قضايا"
    }], onAdd: () => setAdding(true), addLabel: "إضافة عميل" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
      filtered.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/10 bg-navy-deep/50 p-4 transition-colors hover:border-gold/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-cream", children: c.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rounded-full bg-gold/15 px-2.5 py-1 text-xs font-medium text-gold", children: [
              c.cases,
              " قضية"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ViewButton, { onClick: () => setViewingId(c.id) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-1.5 text-sm text-cream/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-3.5 w-3.5 text-gold" }),
            " ",
            c.phone
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-3.5 w-3.5 text-gold" }),
            " ",
            c.email
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-cream/45", children: [
            "عميل منذ ",
            c.since
          ] })
        ] })
      ] }, c.id)),
      filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "col-span-full py-6 text-center text-sm text-cream/50", children: "لا توجد نتائج." })
    ] })
  ] });
}
function Sessions() {
  const [items, setItems] = reactExports.useState(dashSessions);
  const [search, setSearch] = reactExports.useState("");
  const [adding, setAdding] = reactExports.useState(false);
  const [viewingId, setViewingId] = reactExports.useState(null);
  const [comments, setComments] = reactExports.useState({});
  const [reminders, setReminders] = reactExports.useState(dashReminders);
  const [reminderModal, setReminderModal] = reactExports.useState(null);
  const [reminderText, setReminderText] = reactExports.useState("");
  const [reminderUrgent, setReminderUrgent] = reactExports.useState(false);
  const [consultationModal, setConsultationModal] = reactExports.useState(null);
  const emptyForm = {
    title: "",
    type: "",
    client: "",
    caseRef: "",
    day: "",
    time: "",
    location: "",
    notes: ""
  };
  const [form, setForm] = reactExports.useState(emptyForm);
  const clientNames = dashClients.map((c) => c.name);
  const caseTitles = dashCases.map((c) => c.title);
  const viewing = items.find((s) => s.id === viewingId) ?? null;
  const addComment = (id, text) => setComments((p) => ({
    ...p,
    [id]: [...p[id] ?? [], {
      id: `cm${Date.now()}`,
      text,
      date: "الآن"
    }]
  }));
  const changeStatus = (id, status) => setItems((p) => p.map((s) => s.id === id ? {
    ...s,
    status
  } : s));
  const monthName = "يونيو 2026";
  const weekDays = ["سبت", "أحد", "إثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة"];
  const firstOffset = 2;
  const cells = [...Array(firstOffset).fill(null), ...Array.from({
    length: 30
  }, (_, i) => i + 1)];
  const filteredList = items.filter((s) => s.title.includes(search) || s.client.includes(search) || s.location.includes(search));
  const sessionByDay = /* @__PURE__ */ new Map();
  items.forEach((s) => {
    const a = sessionByDay.get(s.day) ?? [];
    a.push(s);
    sessionByDay.set(s.day, a);
  });
  const consultationByDay = /* @__PURE__ */ new Map();
  dashConsultations.forEach((co) => {
    const m = co.date.match(/\d+/);
    if (m) {
      const d = Number(m[0]);
      if (!consultationByDay.has(d)) consultationByDay.set(d, co);
    }
  });
  const today = 6;
  const handleDayClick = (day) => {
    const co = consultationByDay.get(day);
    if (co) {
      setConsultationModal(co);
      return;
    }
    setReminderModal({
      day
    });
    setReminderText("");
    setReminderUrgent(false);
  };
  const addReminder = (e) => {
    e.preventDefault();
    if (!reminderModal || !reminderText.trim()) return;
    setReminders((p) => [{
      id: `r${Date.now()}`,
      text: reminderText.trim(),
      due: `${reminderModal.day} يونيو 2026`,
      urgent: reminderUrgent
    }, ...p]);
    setReminderModal(null);
  };
  const add = (e) => {
    e.preventDefault();
    setItems((p) => [...p, {
      id: `s${Date.now()}`,
      title: form.title,
      type: form.type || void 0,
      client: form.client,
      day: Number(form.day),
      time: form.time,
      location: form.location,
      caseRef: form.caseRef || void 0,
      notes: form.notes || void 0,
      status: "قادمة"
    }]);
    setForm(emptyForm);
    setAdding(false);
  };
  if (adding) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(FormPage, { title: "إضافة جلسة جديدة", subtitle: "حدّد موعد الجلسة والقضية المرتبطة بها", icon: CalendarDays, onBack: () => setAdding(false), onSubmit: add, submitLabel: "حفظ الجلسة", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FormSection, { title: "بيانات الجلسة", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "عنوان الجلسة", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: fieldCls, value: form.title, onChange: (e) => setForm({
          ...form,
          title: e.target.value
        }), required: true }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectField, { label: "نوع الجلسة", value: form.type, onChange: (v) => setForm({
          ...form,
          type: v
        }), options: sessionTypes, placeholder: "اختر النوع" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectField, { label: "العميل", value: form.client, onChange: (v) => setForm({
          ...form,
          client: v
        }), options: clientNames, placeholder: "اختر العميل", required: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectField, { label: "القضية المرتبطة", value: form.caseRef, onChange: (v) => setForm({
          ...form,
          caseRef: v
        }), options: caseTitles, placeholder: "اختر القضية" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FormSection, { title: "الموعد والمكان", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "اليوم (1-30)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 1, max: 30, className: fieldCls, value: form.day, onChange: (e) => setForm({
          ...form,
          day: e.target.value
        }), required: true }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "الوقت", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: fieldCls, placeholder: "10:00 ص", value: form.time, onChange: (e) => setForm({
          ...form,
          time: e.target.value
        }), required: true }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectField, { label: "المكان", value: form.location, onChange: (v) => setForm({
          ...form,
          location: v
        }), options: [...courts, "أونلاين", "المكتب"], placeholder: "اختر المكان", required: true }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-4 border-b border-white/10 pb-2 text-sm font-bold text-gold", children: "ملاحظات" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "ملاحظات الجلسة", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 3, className: fieldCls, value: form.notes, onChange: (e) => setForm({
          ...form,
          notes: e.target.value
        }) }) })
      ] })
    ] });
  }
  if (viewing) {
    const s = viewing;
    const linkedCase = dashCases.find((cs) => cs.title === s.caseRef);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(DetailPage, { title: s.title, subtitle: s.type, icon: CalendarDays, onBack: () => setViewingId(null), actions: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusChanger, { value: s.status ?? "قادمة", options: ["قادمة", "منتهية", "مؤجلة", "ملغاة"], onChange: (v) => changeStatus(s.id, v) }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DetailGrid, { title: "بيانات الجلسة", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "العميل", value: s.client }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "نوع الجلسة", value: s.type }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "الحالة", value: s.status }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "القضية المرتبطة", value: s.caseRef, full: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DetailGrid, { title: "الموعد والمكان", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "التاريخ", value: `${s.day} يونيو 2026` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "الوقت", value: s.time }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "المكان", value: s.location, full: true })
      ] }),
      linkedCase && /* @__PURE__ */ jsxRuntimeExports.jsxs(DetailGrid, { title: "بيانات القضية المرتبطة", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "رقم القضية", value: linkedCase.caseNumber }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "نوع القضية", value: linkedCase.type }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "المحكمة", value: linkedCase.court }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "حالة القضية", value: linkedCase.status })
      ] }),
      s.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: card, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-3 border-b border-white/10 pb-2 text-sm font-bold text-gold", children: "ملاحظات" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-cream/85", children: s.notes })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommentsPanel, { comments: comments[s.id] ?? [], onAdd: (t) => addComment(s.id, t) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 lg:grid-cols-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `${card} lg:col-span-2`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "flex items-center gap-2 text-lg font-bold text-cream", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-5 w-5 text-gold" }),
          " تقويم الجلسات"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-cream/70", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "rounded-md border border-white/15 p-1.5 hover:bg-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-cream", children: monthName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "rounded-md border border-white/15 p-1.5 hover:bg-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-7 gap-1.5 text-center", children: [
        weekDays.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pb-2 text-xs font-semibold text-cream/50", children: d }, d)),
        cells.map((day, i) => {
          if (day === null) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}, `e${i}`);
          const sessions = sessionByDay.get(day);
          const consultation = consultationByDay.get(day);
          const isToday = day === today;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => handleDayClick(day), title: consultation ? "عرض الاستشارة" : "إضافة تذكير", className: `min-h-16 rounded-lg border p-1.5 text-start transition-colors hover:border-gold ${sessions ? "border-gold/40 bg-gold/5" : "border-white/10 bg-navy-deep/40"} ${isToday ? "ring-1 ring-gold" : ""}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs font-bold ${isToday ? "text-gold" : "text-cream/70"}`, children: day }),
            sessions?.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 truncate rounded bg-gold/15 px-1 py-0.5 text-[10px] text-gold", title: `${s.title} - ${s.time}`, children: [
              s.time,
              " ",
              s.title
            ] }, s.id)),
            consultation && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 flex items-center gap-1 truncate rounded bg-emerald-500/15 px-1 py-0.5 text-[10px] text-emerald-400", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-2.5 w-2.5" }),
              " استشارة"
            ] })
          ] }, day);
        })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: card, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-cream", children: "جلسات الشهر" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setAdding(true), className: "flex items-center gap-1.5 rounded-md bg-gradient-gold px-3 py-1.5 text-xs font-bold text-navy shadow-gold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" }),
            " إضافة"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: search, onChange: (e) => setSearch(e.target.value), placeholder: "ابحث في الجلسات...", className: `${fieldCls} pr-9` })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          filteredList.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/10 bg-navy-deep/50 p-3 transition-colors hover:border-gold/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-cream", children: s.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-cream/60", children: [
                  s.client,
                  " — ",
                  s.location
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 flex items-center gap-2 text-xs text-gold", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-3.5 w-3.5" }),
                  " ",
                  s.day,
                  " يونيو، ",
                  s.time
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ViewButton, { onClick: () => setViewingId(s.id) })
            ] }),
            s.status && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `mt-2 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-medium ${statusColor[s.status]}`, children: s.status })
          ] }, s.id)),
          filteredList.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-4 text-center text-sm text-cream/50", children: "لا توجد نتائج." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: card, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mb-4 flex items-center gap-2 text-lg font-bold text-cream", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-5 w-5 text-gold" }),
          " التذكيرات"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-xs text-cream/45", children: "اضغط على أي يوم في التقويم لإضافة تذكير، أو على يوم به استشارة لعرض تفاصيلها." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: reminders.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 rounded-xl border border-white/10 bg-navy-deep/50 p-3", children: [
          r.urgent ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "mt-0.5 h-4 w-4 shrink-0 text-red-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mt-0.5 h-4 w-4 shrink-0 text-gold" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream", children: r.text }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-cream/50", children: r.due })
          ] })
        ] }, r.id)) })
      ] })
    ] }),
    reminderModal && /* @__PURE__ */ jsxRuntimeExports.jsx(Modal, { title: `إضافة تذكير — ${reminderModal.day} يونيو 2026`, onClose: () => setReminderModal(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: addReminder, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "نص التذكير", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 3, className: fieldCls, value: reminderText, onChange: (e) => setReminderText(e.target.value), placeholder: "مثال: تسليم مذكرة دفاع...", required: true }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex cursor-pointer items-center gap-2 text-sm text-cream/80", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: reminderUrgent, onChange: (e) => setReminderUrgent(e.target.checked), className: "h-4 w-4 accent-gold" }),
        " تذكير عاجل"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setReminderModal(null), className: "flex-1 rounded-lg border border-white/15 py-2.5 text-sm font-semibold text-cream hover:bg-white/5", children: "إلغاء" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", className: "flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-gold py-2.5 text-sm font-bold text-navy shadow-gold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          " إضافة التذكير"
        ] })
      ] })
    ] }) }),
    consultationModal && /* @__PURE__ */ jsxRuntimeExports.jsx(Modal, { title: "تفاصيل الاستشارة", onClose: () => setConsultationModal(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold text-cream", children: consultationModal.subject }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-sm text-cream/60", children: consultationModal.client })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { label: "التاريخ", value: consultationModal.date }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { label: "الوقت", value: consultationModal.time }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { label: "القناة", value: consultationModal.channel }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { label: "الحالة", value: consultationModal.status }),
        consultationModal.duration && /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { label: "المدة", value: consultationModal.duration }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { label: "السعر", value: `${consultationModal.price.toLocaleString()} ج.م` })
      ] }),
      consultationModal.caseRef && /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { label: "القضية المرتبطة", value: consultationModal.caseRef }),
      consultationModal.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/10 bg-navy-deep/50 p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-cream/50", children: "ملاحظات" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm leading-relaxed text-cream/85", children: consultationModal.notes })
      ] })
    ] }) })
  ] });
}
const channelIcon = {
  "أونلاين": Video,
  "مكتب": Building2,
  "هاتف": Phone
};
function Consultations() {
  const [items, setItems] = reactExports.useState(dashConsultations);
  const [search, setSearch] = reactExports.useState("");
  const [filter, setFilter] = reactExports.useState("all");
  const [adding, setAdding] = reactExports.useState(false);
  const [viewingId, setViewingId] = reactExports.useState(null);
  const [comments, setComments] = reactExports.useState({});
  const [inCall, setInCall] = reactExports.useState(null);
  const emptyForm = {
    client: "",
    subject: "",
    date: "",
    time: "",
    channel: "أونلاين",
    price: ""
  };
  const [form, setForm] = reactExports.useState(emptyForm);
  const viewing = items.find((c) => c.id === viewingId) ?? null;
  const addComment = (id, text) => setComments((p) => ({
    ...p,
    [id]: [...p[id] ?? [], {
      id: `cm${Date.now()}`,
      text,
      date: "الآن"
    }]
  }));
  const changeStatus = (id, status) => setItems((p) => p.map((c) => c.id === id ? {
    ...c,
    status
  } : c));
  const filtered = items.filter((c) => (filter === "all" || c.status === filter) && (c.client.includes(search) || c.subject.includes(search)));
  const add = (e) => {
    e.preventDefault();
    setItems((p) => [{
      id: `co${Date.now()}`,
      client: form.client,
      subject: form.subject,
      date: form.date,
      time: form.time,
      channel: form.channel,
      status: "قادمة",
      price: Number(form.price)
    }, ...p]);
    setForm(emptyForm);
    setAdding(false);
  };
  if (adding) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(FormPage, { title: "إضافة استشارة جديدة", subtitle: "حدّد موعد الاستشارة وقناة التواصل", icon: MessageSquare, onBack: () => setAdding(false), onSubmit: add, submitLabel: "حفظ الاستشارة", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FormSection, { title: "بيانات الاستشارة", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectField, { label: "العميل", value: form.client, onChange: (v) => setForm({
          ...form,
          client: v
        }), options: dashClients.map((c) => c.name), placeholder: "اختر العميل", required: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectField, { label: "القناة", value: form.channel, onChange: (v) => setForm({
          ...form,
          channel: v
        }), options: ["أونلاين", "مكتب", "هاتف"], placeholder: "اختر القناة" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "الموضوع", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: fieldCls, value: form.subject, onChange: (e) => setForm({
          ...form,
          subject: e.target.value
        }), required: true }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FormSection, { title: "الموعد والسعر", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "التاريخ", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: fieldCls, placeholder: "10 يونيو 2026", value: form.date, onChange: (e) => setForm({
          ...form,
          date: e.target.value
        }), required: true }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "الوقت", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: fieldCls, placeholder: "11:00 ص", value: form.time, onChange: (e) => setForm({
          ...form,
          time: e.target.value
        }), required: true }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "السعر (ج.م)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 0, className: fieldCls, value: form.price, onChange: (e) => setForm({
          ...form,
          price: e.target.value
        }), required: true }) })
      ] })
    ] });
  }
  if (viewing) {
    const c = viewing;
    const linkedCase = dashCases.find((cs) => cs.title === c.caseRef);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      inCall && /* @__PURE__ */ jsxRuntimeExports.jsx(VideoCall, { consultation: inCall, onClose: () => setInCall(null) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DetailPage, { title: c.subject, subtitle: c.client, icon: MessageSquare, onBack: () => setViewingId(null), actions: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        c.status !== "ملغاة" && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setInCall(c), className: "flex items-center gap-2 rounded-lg bg-gradient-gold px-4 py-2 text-sm font-bold text-navy shadow-gold transition-transform hover:-translate-y-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "h-4 w-4" }),
          " انضمام للمكالمة"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatusChanger, { value: c.status, options: ["قادمة", "مكتملة", "ملغاة"], onChange: (v) => changeStatus(c.id, v) })
      ] }), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DetailGrid, { title: "تفاصيل الاستشارة", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "العميل", value: c.client }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "قناة التواصل", value: c.channel }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "التاريخ", value: c.date }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "الوقت", value: c.time }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "المدة", value: c.duration }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "السعر", value: `${c.price.toLocaleString()} ج.م` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "الحالة", value: c.status }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "القضية المرتبطة", value: c.caseRef, full: true })
        ] }),
        linkedCase && /* @__PURE__ */ jsxRuntimeExports.jsxs(DetailGrid, { title: "بيانات القضية المرتبطة", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "رقم القضية", value: linkedCase.caseNumber }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "نوع القضية", value: linkedCase.type }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "المحكمة", value: linkedCase.court }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "حالة القضية", value: linkedCase.status })
        ] }),
        c.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: card, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-3 border-b border-white/10 pb-2 text-sm font-bold text-gold", children: "ملاحظات" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-cream/85", children: c.notes })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CommentsPanel, { comments: comments[c.id] ?? [], onAdd: (t) => addComment(c.id, t) })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    inCall && /* @__PURE__ */ jsxRuntimeExports.jsx(VideoCall, { consultation: inCall, onClose: () => setInCall(null) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: card, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mb-5 flex items-center gap-2 text-lg font-bold text-cream", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-5 w-5 text-gold" }),
        " الاستشارات"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Toolbar, { search, setSearch, placeholder: "ابحث في الاستشارات...", filter, setFilter, options: [{
        value: "all",
        label: "كل الحالات"
      }, {
        value: "قادمة",
        label: "قادمة"
      }, {
        value: "مكتملة",
        label: "مكتملة"
      }, {
        value: "ملغاة",
        label: "ملغاة"
      }], onAdd: () => setAdding(true), addLabel: "إضافة استشارة" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        filtered.map((c) => {
          const Icon = channelIcon[c.channel] ?? Video;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-navy-deep/50 p-4 transition-colors hover:border-gold/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-cream", children: c.subject }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-sm text-cream/60", children: c.client }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 flex items-center gap-3 text-xs text-cream/55", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "h-3.5 w-3.5 text-gold" }),
                  c.date
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5 text-gold" }),
                  c.time
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5 text-gold" }),
                  c.channel
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-extrabold text-cream", children: [
                c.price,
                " ج.م"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-3 py-1 text-xs font-medium ${statusColor[c.status]}`, children: c.status }),
              c.status !== "ملغاة" && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setInCall(c), "aria-label": "انضمام للمكالمة", className: "flex h-9 items-center gap-1.5 rounded-lg bg-gradient-gold px-3 text-xs font-bold text-navy shadow-gold transition-transform hover:-translate-y-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "h-4 w-4" }),
                " انضمام"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ViewButton, { onClick: () => setViewingId(c.id) })
            ] })
          ] }, c.id);
        }),
        filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-6 text-center text-sm text-cream/50", children: "لا توجد نتائج." })
      ] })
    ] })
  ] });
}
function Invoices() {
  const [items, setItems] = reactExports.useState(dashInvoices);
  const [search, setSearch] = reactExports.useState("");
  const [filter, setFilter] = reactExports.useState("all");
  const [adding, setAdding] = reactExports.useState(false);
  const [viewingId, setViewingId] = reactExports.useState(null);
  const [comments, setComments] = reactExports.useState({});
  const emptyForm = {
    client: "",
    caseRef: "",
    item: "",
    amount: "",
    tax: "",
    issueDate: "",
    dueDate: "",
    status: "معلقة",
    notes: ""
  };
  const [form, setForm] = reactExports.useState(emptyForm);
  const clientNames = dashClients.map((c) => c.name);
  const caseTitles = dashCases.map((c) => c.title);
  const viewing = items.find((i) => i.id === viewingId) ?? null;
  const addComment = (id, text) => setComments((p) => ({
    ...p,
    [id]: [...p[id] ?? [], {
      id: `cm${Date.now()}`,
      text,
      date: "الآن"
    }]
  }));
  const changeStatus = (id, status) => setItems((p) => p.map((i) => i.id === id ? {
    ...i,
    status
  } : i));
  const filtered = items.filter((i) => (filter === "all" || i.status === filter) && (i.number.includes(search) || i.client.includes(search) || (i.item ?? "").includes(search)));
  const total = items.reduce((s, i) => s + i.amount, 0);
  const paid = items.filter((i) => i.status === "مدفوعة").reduce((s, i) => s + i.amount, 0);
  const add = (e) => {
    e.preventDefault();
    const n = `INV-${2044 + items.length}`;
    setItems((p) => [{
      id: `i${Date.now()}`,
      number: n,
      client: form.client,
      amount: Number(form.amount),
      date: form.issueDate || "6 يونيو 2026",
      status: form.status,
      item: form.item || void 0,
      dueDate: form.dueDate || void 0,
      caseRef: form.caseRef || void 0,
      tax: form.tax ? Number(form.tax) : void 0,
      issueDate: form.issueDate || void 0,
      notes: form.notes || void 0
    }, ...p]);
    setForm(emptyForm);
    setAdding(false);
  };
  if (adding) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(FormPage, { title: "إنشاء فاتورة جديدة", subtitle: "حدّد العميل والبند والمبالغ المستحقة", icon: Receipt, onBack: () => setAdding(false), onSubmit: add, submitLabel: "إنشاء الفاتورة", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FormSection, { title: "بيانات الفاتورة", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectField, { label: "العميل", value: form.client, onChange: (v) => setForm({
          ...form,
          client: v
        }), options: clientNames, placeholder: "اختر العميل", required: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectField, { label: "القضية المرتبطة", value: form.caseRef, onChange: (v) => setForm({
          ...form,
          caseRef: v
        }), options: caseTitles, placeholder: "اختر القضية" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectField, { label: "بند الفاتورة", value: form.item, onChange: (v) => setForm({
          ...form,
          item: v
        }), options: invoiceItems, placeholder: "اختر البند" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FormSection, { title: "المبالغ والتواريخ", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "المبلغ (ج.م)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 0, className: fieldCls, value: form.amount, onChange: (e) => setForm({
          ...form,
          amount: e.target.value
        }), required: true }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "الضريبة (%)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 0, max: 100, className: fieldCls, value: form.tax, onChange: (e) => setForm({
          ...form,
          tax: e.target.value
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "تاريخ الإصدار", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: fieldCls, placeholder: "6 يونيو 2026", value: form.issueDate, onChange: (e) => setForm({
          ...form,
          issueDate: e.target.value
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "تاريخ الاستحقاق", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: fieldCls, placeholder: "15 يونيو 2026", value: form.dueDate, onChange: (e) => setForm({
          ...form,
          dueDate: e.target.value
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectField, { label: "الحالة", value: form.status, onChange: (v) => setForm({
          ...form,
          status: v
        }), options: ["معلقة", "مدفوعة", "متأخرة"], placeholder: "اختر الحالة" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-4 border-b border-white/10 pb-2 text-sm font-bold text-gold", children: "ملاحظات" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "ملاحظات الفاتورة", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 3, className: fieldCls, value: form.notes, onChange: (e) => setForm({
          ...form,
          notes: e.target.value
        }) }) })
      ] })
    ] });
  }
  if (viewing) {
    const inv = viewing;
    const taxAmount = inv.tax ? Math.round(inv.amount * inv.tax / 100) : 0;
    const linkedCase = dashCases.find((cs) => cs.title === inv.caseRef);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(DetailPage, { title: inv.number, subtitle: inv.client, icon: Receipt, onBack: () => setViewingId(null), actions: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusChanger, { value: inv.status, options: ["معلقة", "مدفوعة", "متأخرة"], onChange: (v) => changeStatus(inv.id, v) }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: card, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-cream/60", children: "الإجمالي المستحق" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-extrabold text-gradient-gold", children: [
          (inv.amount + taxAmount).toLocaleString(),
          " ج.م"
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DetailGrid, { title: "بيانات الفاتورة", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "العميل", value: inv.client }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "الحالة", value: inv.status }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "بند الفاتورة", value: inv.item }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "القضية المرتبطة", value: inv.caseRef, full: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DetailGrid, { title: "المبالغ والتواريخ", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "المبلغ", value: `${inv.amount.toLocaleString()} ج.م` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "الضريبة", value: inv.tax ? `${inv.tax}% (${taxAmount.toLocaleString()} ج.م)` : void 0 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "تاريخ الإصدار", value: inv.issueDate ?? inv.date }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "تاريخ الاستحقاق", value: inv.dueDate })
      ] }),
      linkedCase && /* @__PURE__ */ jsxRuntimeExports.jsxs(DetailGrid, { title: "بيانات القضية المرتبطة", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "رقم القضية", value: linkedCase.caseNumber }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "نوع القضية", value: linkedCase.type }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "المحكمة", value: linkedCase.court }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DetailItem, { label: "حالة القضية", value: linkedCase.status })
      ] }),
      inv.notes && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: card, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-3 border-b border-white/10 pb-2 text-sm font-bold text-gold", children: "ملاحظات" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-cream/85", children: inv.notes })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommentsPanel, { comments: comments[inv.id] ?? [], onAdd: (t) => addComment(inv.id, t) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 sm:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/10 bg-navy-card/60 p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream/60", children: "إجمالي الفواتير" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-2xl font-extrabold text-cream", children: [
          total.toLocaleString(),
          " ج.م"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/10 bg-navy-card/60 p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream/60", children: "محصّلة" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-2xl font-extrabold text-emerald-400", children: [
          paid.toLocaleString(),
          " ج.م"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/10 bg-navy-card/60 p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream/60", children: "مستحقة" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-2xl font-extrabold text-gold", children: [
          (total - paid).toLocaleString(),
          " ج.م"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: card, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mb-5 flex items-center gap-2 text-lg font-bold text-cream", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "h-5 w-5 text-gold" }),
        " الفواتير"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Toolbar, { search, setSearch, placeholder: "ابحث في الفواتير...", filter, setFilter, options: [{
        value: "all",
        label: "كل الحالات"
      }, {
        value: "مدفوعة",
        label: "مدفوعة"
      }, {
        value: "معلقة",
        label: "معلقة"
      }, {
        value: "متأخرة",
        label: "متأخرة"
      }], onAdd: () => setAdding(true), addLabel: "إنشاء فاتورة" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        filtered.map((inv) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-navy-deep/50 p-4 transition-colors hover:border-gold/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-cream", children: inv.number }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 text-sm text-cream/60", children: [
              inv.client,
              " — ",
              inv.date
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-extrabold text-cream", children: [
              inv.amount.toLocaleString(),
              " ج.م"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-3 py-1 text-xs font-medium ${statusColor[inv.status]}`, children: inv.status }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ViewButton, { onClick: () => setViewingId(inv.id) })
          ] })
        ] }, inv.id)),
        filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-6 text-center text-sm text-cream/50", children: "لا توجد نتائج." })
      ] })
    ] })
  ] });
}
const walletMethods = ["فودافون كاش", "أورنج كاش", "اتصالات كاش", "إنستا باي"];
function WalletPanel() {
  const [open, setOpen] = reactExports.useState(false);
  const [amount, setAmount] = reactExports.useState("");
  const [method, setMethod] = reactExports.useState(walletMethods[0]);
  const [account, setAccount] = reactExports.useState("");
  const [done, setDone] = reactExports.useState(false);
  const submit = (e) => {
    e.preventDefault();
    setDone(true);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-gold/30 bg-gradient-navy p-7 lg:col-span-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-cream/65", children: "الرصيد المتاح" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-3xl font-extrabold text-gradient-gold", children: [
          walletBalance.toLocaleString(),
          " ج.م"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
          setOpen(true);
          setDone(false);
        }, className: "mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-gold py-3 text-sm font-bold text-navy shadow-gold transition-transform hover:-translate-y-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownToLine, { className: "h-4 w-4" }),
          " طلب سحب"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `${card} lg:col-span-2`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mb-4 flex items-center gap-2 text-lg font-bold text-cream", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-5 w-5 text-gold" }),
          " آخر العمليات"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: walletTransactions.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-xl border border-white/10 bg-navy-deep/50 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-cream", children: t.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-cream/50", children: t.date })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-sm font-bold ${t.amount > 0 ? "text-emerald-400" : "text-red-400"}`, children: [
            t.amount > 0 ? "+" : "-",
            Math.abs(t.amount).toLocaleString(),
            " ج.م"
          ] })
        ] }, t.id)) })
      ] })
    ] }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx(Modal, { title: "طلب سحب الأرباح", onClose: () => setOpen(false), children: done ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-6 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mx-auto h-12 w-12 text-gold" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 text-lg font-bold text-cream", children: "تم استلام طلب السحب" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-cream/65", children: [
        "سيتم تحويل المبلغ إلى ",
        method,
        " خلال 24 ساعة."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setOpen(false), className: "mt-6 rounded-lg bg-gradient-gold px-6 py-2.5 text-sm font-bold text-navy", children: "تم" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "المبلغ (ج.م)", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", required: true, min: 1, max: walletBalance, value: amount, onChange: (e) => setAmount(e.target.value), placeholder: "0", className: fieldCls }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-cream/45", children: [
          "الحد الأقصى ",
          walletBalance.toLocaleString(),
          " ج.م"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1.5 block text-sm font-medium text-cream/80", children: "المحفظة الإلكترونية" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: walletMethods.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setMethod(m), className: `flex items-center justify-center gap-1.5 rounded-lg border px-2 py-2.5 text-xs font-semibold transition-colors ${method === m ? "border-gold bg-gold/10 text-gold" : "border-white/15 text-cream/70"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-3.5 w-3.5" }),
          " ",
          m
        ] }, m)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "رقم المحفظة", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, value: account, onChange: (e) => setAccount(e.target.value), placeholder: method === "إنستا باي" ? "example@instapay" : "01XXXXXXXXX", className: fieldCls }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setOpen(false), className: "flex-1 rounded-lg border border-white/15 py-2.5 text-sm font-semibold text-cream", children: "إلغاء" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "flex-1 rounded-lg bg-gradient-gold py-2.5 text-sm font-bold text-navy shadow-gold", children: "تأكيد السحب" })
      ] })
    ] }) })
  ] });
}
const suggestions = ["صياغة مذكرة دفاع في قضية نفقة", "ما هي إجراءات رفع دعوى تعويض إصابة عمل؟", "لخّص لي بنود عقد الشراكة التجارية"];
function LegalAI() {
  const greeting = {
    role: "ai",
    text: "مرحباً، أنا المساعد القانوني الذكي. كيف يمكنني مساعدتك في قضاياك اليوم؟"
  };
  const [activeConv, setActiveConv] = reactExports.useState(null);
  const [messages, setMessages] = reactExports.useState([greeting]);
  const [input, setInput] = reactExports.useState("");
  const loadConv = (id) => {
    const conv = aiConversations.find((c) => c.id === id);
    if (conv) {
      setActiveConv(id);
      setMessages(conv.messages);
    }
  };
  const newChat = () => {
    setActiveConv(null);
    setMessages([greeting]);
  };
  const send = (text) => {
    const q = text.trim();
    if (!q) return;
    setMessages((m) => [...m, {
      role: "user",
      text: q
    }, {
      role: "ai",
      text: "هذا رد توضيحي من المساعد القانوني الذكي. سيتم ربط الذكاء الاصطناعي القانوني لتقديم إجابات دقيقة ومسوّدات قانونية مبنية على بيانات قضاياك."
    }]);
    setInput("");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `${card} lg:col-span-1`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: newChat, className: "mb-4 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-gold py-2.5 text-sm font-bold text-navy shadow-gold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
        " محادثة جديدة"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-xs font-semibold text-cream/50", children: "المحادثات السابقة" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: aiConversations.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => loadConv(c.id), className: `w-full rounded-xl border p-3 text-start transition-colors ${activeConv === c.id ? "border-gold/50 bg-gold/10" : "border-white/10 bg-navy-deep/50 hover:border-gold/30"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2 text-sm font-semibold text-cream", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-3.5 w-3.5 text-gold" }),
          " ",
          c.title
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-cream/45", children: c.date })
      ] }, c.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `${card} flex h-[600px] flex-col lg:col-span-3`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mb-4 flex items-center gap-2 text-lg font-bold text-cream", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5 text-gold" }),
        " الذكاء الاصطناعي القانوني"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 space-y-4 overflow-y-auto pr-1", children: messages.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex ${m.role === "user" ? "justify-start" : "justify-end"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.role === "user" ? "bg-gradient-gold text-navy" : "border border-white/10 bg-navy-deep/60 text-cream/85"}`, children: m.text }) }, i)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: suggestions.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => send(s), className: "rounded-full border border-gold/30 px-3 py-1.5 text-xs text-cream/75 transition-colors hover:bg-gold/10 hover:text-gold", children: s }, s)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
        e.preventDefault();
        send(input);
      }, className: "mt-3 flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: input, onChange: (e) => setInput(e.target.value), placeholder: "اكتب سؤالك القانوني...", className: `${fieldCls} flex-1 py-3` }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", className: "flex items-center gap-2 rounded-lg bg-gradient-gold px-5 py-3 text-sm font-bold text-navy shadow-gold transition-transform hover:-translate-y-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" }),
          " إرسال"
        ] })
      ] })
    ] })
  ] });
}
export {
  DashboardPage as component
};
