import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, BackButton } from "@/components/admin/parts";
import { ProfileView } from "@/components/admin/ProfileView";
import { lawyers } from "@/data/lawyers";
import { lawyerProfile } from "@/data/profiles";
import { useAdminStore, isBlocked, toggleBlock } from "@/lib/admin-store";

export const Route = createFileRoute("/admin/lawyer/$lawyerId")({ component: LawyerDetail });
const fmt = (n: number) => new Intl.NumberFormat("ar-EG").format(n);

function LawyerDetail() {
  const { lawyerId } = Route.useParams();
  const store = useAdminStore();
  const lawyer = lawyers.find((l) => l.id === lawyerId);

  if (!lawyer) {
    return (
      <>
        <BackButton />
        <PageHeader title="غير موجود" subtitle="لم يتم العثور على المحامي" />
      </>
    );
  }

  return (
    <>
      <BackButton label="رجوع للمحامين" />
      <PageHeader title="ملف المحامي" subtitle={lawyer.name} />
      <ProfileView
        image={lawyer.image}
        name={lawyer.name}
        subtitle={`${lawyer.title} • ${lawyer.specialty}`}
        blocked={isBlocked(store, "lawyer", lawyer.id)}
        onToggleBlock={() => toggleBlock("lawyer", lawyer.id)}
        profile={lawyerProfile(lawyer)}
        fields={[
          { label: "التخصص", value: lawyer.specialty },
          { label: "المدينة", value: lawyer.city },
          { label: "سنوات الخبرة", value: `${lawyer.experience} سنة` },
          { label: "سعر الاستشارة", value: `${fmt(lawyer.price)} ج.م` },
          { label: "الهاتف", value: <span dir="ltr">{lawyer.phone}</span> },
          { label: "البريد", value: <span dir="ltr">{lawyer.email}</span> },
          { label: "التقييم", value: `★ ${lawyer.rating} (${lawyer.reviews} تقييم)` },
          { label: "عدد الاستشارات", value: fmt(lawyer.consultations) },
        ]}
      />
    </>
  );
}