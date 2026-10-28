import SidebarAdmin from "@/components/layout/SidebarAdmin";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen">
      <SidebarAdmin />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
