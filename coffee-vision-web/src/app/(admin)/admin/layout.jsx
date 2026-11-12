import SidebarPrincipal from "@/components/layout/SidebarPrincipal";
import FloatingChatButton from "@/components/dashboard/FloatingChatButton";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen max-md:flex-col">
      <SidebarPrincipal role="administrador" />
      <main className="grid min-w-0 flex-1 content-start gap-4 p-4 sm:p-6">{children}</main>
      <FloatingChatButton />
    </div>
  );
}
