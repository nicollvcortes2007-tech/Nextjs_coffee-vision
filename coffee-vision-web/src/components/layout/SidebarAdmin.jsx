"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  ["/admin", "⌂", "Vista general"],
  ["/admin/usuarios", "♙", "Usuarios"],
  ["/admin/contenidos", "▤", "Contenidos"],
  ["/admin/plagas-ia", "✳", "Análisis IA"],
  ["/admin/metricas", "▥", "Métricas"],
];

export default function SidebarAdmin() {
  const pathname = usePathname();
  const router = useRouter();

  function logout() {
    document.cookie = "token=; path=/; max-age=0";
    document.cookie = "rol=; path=/; max-age=0";
    router.push("/login");
  }

  return (
    <aside className="sidebar admin-sidebar">
      <Link className="brand sidebar-brand" href="/admin">
        ☕ Coffee<span>Vision</span>
      </Link>
      <p className="side-caption">ADMINISTRACIÓN</p>
      <nav className="side-nav" aria-label="Menú de administrador">
        {links.map(([href, icon, label]) => (
          <Link
            className={pathname === href ? "side-link active" : "side-link"}
            href={href}
            key={href}
          >
            <span className="side-icon" aria-hidden="true">{icon}</span>
            {label}
          </Link>
        ))}
      </nav>
      <footer className="side-bottom">
        <p className="profile-mini"><span className="avatar">A</span><span><b>Administración</b><small>Administrador</small></span></p>
        <button className="logout-button" onClick={logout}>↪ Cerrar sesión</button>
      </footer>
    </aside>
  );
}
