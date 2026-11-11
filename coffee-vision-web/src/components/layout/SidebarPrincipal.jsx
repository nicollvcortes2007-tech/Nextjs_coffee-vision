"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navigation = {
  caficultor: [
    ["/dashboard", "fa-solid fa-house", "Mi finca"],
    ["/cultivos", "fa-solid fa-seedling", "Cultivos"],
    ["/actividades", "fa-solid fa-clipboard-list", "Registrar labor"],
    ["/reportes", "fa-solid fa-chart-simple", "Estadísticas"],
    ["/contenidos", "fa-solid fa-book-open", "Guías"],
    ["/notificaciones", "fa-solid fa-bell", "Notificaciones"],
    ["/chatbot", "fa-solid fa-robot", "Chatbot IA"],
    ["/perfil", "fa-solid fa-user", "Mi perfil"],
    ["/configuracion", "fa-solid fa-gear", "Configuración"],
    ["/empleados", "fa-solid fa-users", "Mi equipo"],
  ],
  administrador: [
    ["/admin", "fa-solid fa-chart-pie", "Resumen"],
    ["/admin/plagas-ia", "fa-solid fa-bug", "Plagas e IA"],
    ["/admin/notificaciones", "fa-solid fa-bell", "Notificaciones"],
    ["/admin/perfil", "fa-solid fa-user", "Mi perfil"],
  ],
  empleado: [
    ["/empleado/dashboard", "fa-solid fa-house", "Mi jornada"],
    ["/empleado/cultivos", "fa-solid fa-seedling", "Mis lotes"],
    ["/empleado/actividades", "fa-solid fa-clipboard-list", "Registrar labor"],
    ["/empleado/estadisticas", "fa-solid fa-chart-simple", "Estadísticas"],
    ["/empleado/guias", "fa-solid fa-book-open", "Guías"],
    ["/empleado/chatbot", "fa-solid fa-robot", "Chatbot IA"],
    ["/empleado/notificaciones", "fa-solid fa-bell", "Notificaciones"],
    ["/empleado/perfil", "fa-solid fa-user", "Mi perfil"],
  ],
};

export default function SidebarPrincipal({ role = "caficultor" }) {
  const pathname = usePathname();
  const router = useRouter();
  const items = navigation[role] ?? navigation.caficultor;
  const home = navigation[role]?.[0]?.[0] ?? "/dashboard";

  function logout() {
    document.cookie = "token=; path=/; max-age=0";
    document.cookie = "rol=; path=/; max-age=0";
    router.push("/login");
  }

  return (
    <aside className="sticky top-0 flex h-screen w-[280px] flex-none flex-col gap-6 overflow-y-auto border-r border-line bg-white/95 p-5 backdrop-blur-md max-lg:w-[245px] max-md:static max-md:h-auto max-md:w-full max-md:gap-3 max-md:border-b max-md:border-r-0 max-md:p-4">
      <Link href={home} className="flex items-center justify-center">
        <img src="/coffee-tech/logo2.png" alt="Coffee+Visión" className="h-[112px] w-auto object-contain max-md:h-[72px]" />
      </Link>

      <nav className="grid gap-2 max-md:flex max-md:overflow-x-auto" aria-label={`Menú ${role}`}>
        {items.map(([href, icon, label]) => {
          const active = pathname === href || (href !== home && pathname.startsWith(`${href}/`));
          return (
            <Link
              key={href}
              href={href}
              className={`flex min-h-[44px] items-center gap-2.5 rounded-lg px-3 py-2 font-bold transition-colors max-md:flex-none max-md:whitespace-nowrap ${active ? "bg-green-soft text-coffee" : "text-muted hover:bg-green-soft hover:text-coffee"}`}
            >
              <i className={`${icon} w-4 text-center`} aria-hidden="true" />
              {label}
            </Link>
          );
        })}
      </nav>

      {role === "caficultor" && (
        <section className="grid gap-2 rounded-lg bg-gradient-to-br from-coffee to-coffee-soft p-4 text-white max-md:hidden">
          <i className="fa-solid fa-leaf text-xl text-gold" aria-hidden="true" />
          <p className="text-sm opacity-80">Próxima revisión</p>
          <strong className="text-sm">Lote 2 · Broca</strong>
        </section>
      )}

      <button
        type="button"
        onClick={logout}
        className="mt-auto flex min-h-[44px] items-center gap-2.5 rounded-lg px-3 py-2 text-left font-bold text-danger hover:bg-red-50 max-md:hidden"
      >
        <i className="fa-solid fa-right-from-bracket w-4 text-center" aria-hidden="true" />
        Cerrar sesión
      </button>
    </aside>
  );
}
