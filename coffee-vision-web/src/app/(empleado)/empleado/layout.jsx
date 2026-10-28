import SidebarEmpleado from "@/components/layout/SidebarEmpleado";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen">
      <SidebarEmpleado />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
