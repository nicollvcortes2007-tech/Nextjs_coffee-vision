"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  ["/dashboard", "⌂", "Resumen"],
  ["/cultivos", "♧", "Cultivos"],
  ["/empleados", "♙", "Mi equipo"],
  ["/reportes", "▥", "Reportes"],
  ["/recomendaciones", "✳", "Recomendaciones"],
  ["/chatbot", "☷", "Asistente IA"],
  ["/contenidos", "▤", "Guías"],
  ["/notificaciones", "♢", "Notificaciones"],
  ["/perfil", "⚙", "Mi finca"],
];

export default function SidebarCaficultor() {
  const pathname = usePathname();
  const router = useRouter();

  function logout() {
    document.cookie = "token=; path=/; max-age=0";
    document.cookie = "rol=; path=/; max-age=0";
    router.push("/login");
  }

  return (
    <aside className="sidebar">
      <Link className="brand sidebar-brand" href="/dashboard">
        ☕ Coffee<span>Vision</span>
      </Link>
      <p className="side-caption">GESTIÓN DE FINCA</p>
      <nav className="side-nav" aria-label="Menú de caficultor">
        {links.map(([href, icon, label]) => (
          <Link
            className={pathname.startsWith(href) ? "side-link active" : "side-link"}
            href={href}
            key={href}
          >
            <span className="side-icon" aria-hidden="true">{icon}</span>
            {label}
          </Link>
        ))}
      </nav>
      <footer className="side-bottom">
        <p className="profile-mini"><span className="avatar">C</span><span><b>Mi finca</b><small>Caficultor</small></span></p>
        <button className="logout-button" onClick={logout}>↪ Cerrar sesión</button>
      </footer>
    </aside>
  );
}
