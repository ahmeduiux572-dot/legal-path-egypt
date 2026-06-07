import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useAdminAuth } from "@/lib/admin-auth";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminShell } from "@/components/admin/AdminShell";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({ meta: [{ title: "لوحة تحكم الإدارة | مُحامٍ" }] }),
  component: AdminLayout,
});

function AdminLayout() {
  const authed = useAdminAuth();
  if (!authed) return <AdminLogin />;
  return (
    <AdminShell>
      <Outlet />
    </AdminShell>
  );
}
