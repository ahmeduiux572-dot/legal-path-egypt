import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageHeader, BackButton } from "@/components/admin/parts";
import { ApplicationView } from "@/components/admin/ApplicationView";
import { lawyerApplications } from "@/data/applications";
import { useAdminStore, appStatus, setApplicationStatus } from "@/lib/admin-store";

export const Route = createFileRoute("/admin/lawyer-app/$appId")({ component: LawyerAppDetail });
const fmt = (n: number) => new Intl.NumberFormat("ar-EG").format(n);

function LawyerAppDetail() {
  const { appId } = Route.useParams();
  const store = useAdminStore();
  const navigate = useNavigate();
  const app = lawyerApplications.find((a) => a.id === appId);

  if (!app) {
    return (
      <>
        <BackButton label="رجوع للمحامين" />
        <PageHeader title="غير موجود" subtitle="لم يتم العثور على الطلب" />
      </>
    );
  }

  const back = () => navigate({ to: "/admin/lawyers" });

  return (
    <>
      <BackButton label="رجوع للمحامين" />
      <PageHeader title="مراجعة طلب محامٍ" subtitle={app.name} />
      <ApplicationView
        image={app.image}
        name={app.name}
        subtitle={`${app.title} • ${app.specialty}`}
        files={app.files}
        status={appStatus(store, app.id)}
        fields={[
          { label: "التخصص", value: app.specialty },
          { label: "المدينة", value: app.city },
          { label: "سنوات الخبرة", value: `${app.experience} سنة` },
          { label: "سعر الاستشارة", value: `${fmt(app.price)} ج.م` },
          { label: "رقم العضوية", value: app.barNumber },
          { label: "تاريخ التقديم", value: app.submittedAt },
          { label: "الهاتف", value: <span dir="ltr">{app.phone}</span> },
          { label: "البريد", value: <span dir="ltr">{app.email}</span> },
          { label: "نبذة", value: <span className="text-cream/70">{app.bio}</span> },
        ]}
        onApprove={() => { setApplicationStatus(app.id, "approved"); back(); }}
        onReject={() => { setApplicationStatus(app.id, "rejected"); back(); }}
      />
    </>
  );
}
