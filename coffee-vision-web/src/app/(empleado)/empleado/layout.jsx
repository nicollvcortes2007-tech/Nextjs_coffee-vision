import SidebarPrincipal from "@/components/layout/SidebarPrincipal";
import FloatingChatButton from "@/components/dashboard/FloatingChatButton";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen max-md:flex-col">
      <SidebarPrincipal role="empleado" />
      <main className="employee-main grid min-w-0 flex-1 content-start gap-6 p-6 sm:p-8">{children}</main>
      <FloatingChatButton />
    </div>
  );
}
