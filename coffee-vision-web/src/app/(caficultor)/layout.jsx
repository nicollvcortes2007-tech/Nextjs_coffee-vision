import SidebarCaficultor from "@/components/layout/SidebarCaficultor";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen">
      <SidebarCaficultor />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
