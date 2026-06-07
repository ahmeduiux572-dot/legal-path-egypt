import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageHeader, BackButton } from "@/components/admin/parts";
import { ApplicationView } from "@/components/admin/ApplicationView";
import { firmApplications } from "@/data/applications";
import { useAdminStore, appStatus, setApplicationStatus } from "@/lib/admin-store";

export const Route = createFileRoute("/admin/firm-app/$appId")({ component: FirmAppDetail });

function FirmAppDetail() {
  const { appId } = Route.useParams();
  const store = useAdminStore();
  const navigate = useNavigate();
  const app = firmApplications.find((a) => a.id === appId);

  if (!app) {
    return (
      <>
        <BackButton label="رجوع للمكاتب" />
        <PageHeader title="غير موجود" subtitle="لم يتم العثور على الطلب" />
      </>
    );
  }

  const back = () => navigate({ to: "/admin/firms" });

  return (
    <>
      <BackButton label="رجوع للمكاتب" />
      <PageHeader title="مراجعة طلب مكتب" subtitle={app.name} />
      <ApplicationView
        image={app.image}
        name={app.name}
        subtitle={`${app.specialty} • ${app.city}`}
        files={app.files}
        status={appStatus(store, app.id)}
        fields={[
          { label: "التخصص", value: app.specialty },
          { label: "المدينة", value: app.city },
          { label: "سنة التأسيس", value: app.established },
          { label: "حجم الفريق", value: `${app.teamSize} عضو` },
          { label: "رقم الترخيص", value: app.licenseNumber },
          { label: "تاريخ التقديم", value: app.submittedAt },
          { label: "الهاتف", value: <span dir="ltr">{app.phone}</span> },
          { label: "البريد", value: <span dir="ltr">{app.email}</span> },
          { label: "نبذة", value: <span className="text-cream/70">{app.about}</span> },
        ]}
        onApprove={() => { setApplicationStatus(app.id, "approved"); back(); }}
        onReject={() => { setApplicationStatus(app.id, "rejected"); back(); }}
      />
    </>
  );
}
