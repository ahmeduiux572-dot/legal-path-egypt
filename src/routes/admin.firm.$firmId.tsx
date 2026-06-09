import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, BackButton } from "@/components/admin/parts";
import { ProfileView } from "@/components/admin/ProfileView";
import { firms } from "@/data/firms";
import { firmProfile } from "@/data/profiles";
import { useAdminStore, isBlocked, toggleBlock } from "@/lib/admin-store";
import { getCountry, formatMoney } from "@/data/countries";

export const Route = createFileRoute("/admin/firm/$firmId")({ component: FirmDetail });
const fmt = (n: number) => new Intl.NumberFormat("ar-EG").format(n);

function FirmDetail() {
  const { firmId } = Route.useParams();
  const store = useAdminStore();
  const firm = firms.find((f) => f.id === firmId);

  if (!firm) {
    return (
      <>
        <BackButton />
        <PageHeader title="غير موجود" subtitle="لم يتم العثور على المكتب" />
      </>
    );
  }

  return (
    <>
      <BackButton label="رجوع للمكاتب" />
      <PageHeader title="ملف المكتب" subtitle={firm.name} />
      <ProfileView
        image={firm.image}
        name={firm.name}
        subtitle={`${firm.specialty} • ${firm.city}`}
        blocked={isBlocked(store, "firm", firm.id)}
        onToggleBlock={() => toggleBlock("firm", firm.id)}
        profile={firmProfile(firm)}
        fields={[
          { label: "التخصص", value: firm.specialty },
          { label: "المدينة", value: firm.city },
          { label: "الدولة", value: `${getCountry(firm.country).flag} ${getCountry(firm.country).name}` },
          { label: "الدول المخدومة", value: firm.countries.map((c) => `${getCountry(c).flag} ${getCountry(c).name}`).join("، ") },
          { label: "سنة التأسيس", value: firm.established },
          { label: "حجم الفريق", value: `${firm.teamSize} عضو` },
          { label: "سعر الاستشارة", value: formatMoney(firm.consultationPrice, firm.country) },
          { label: "عدد القضايا", value: fmt(firm.cases) },
          { label: "التقييم", value: `★ ${firm.rating} (${firm.reviews} تقييم)` },
          { label: "نبذة", value: <span className="text-cream/70">{firm.about}</span> },
        ]}
      />
    </>
  );
}