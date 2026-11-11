"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  ["/empleado/dashboard", "⌂", "Inicio"],
  ["/empleado/cultivos", "♧", "Mis lotes"],
  ["/empleado/actividades", "☑", "Actividades"],
  ["/empleado/guias", "▤", "Guías"],
  ["/empleado/chatbot", "✳", "Asistente IA"],
  ["/empleado/notificaciones", "♢", "Avisos"],
  ["/empleado/perfil", "⚙", "Mi perfil"],
];

export default function SidebarEmpleado() {
  const path = usePathname();
  const router = useRouter();

  function logout() {
    document.cookie = "token=; path=/; max-age=0";
    document.cookie = "rol=; path=/; max-age=0";
    router.push("/login");
  }

  return (
    <aside className="sidebar">
      <Link className="brand sidebar-brand" href="/empleado/dashboard">
        ☕ Coffee<span>Vision</span>
      </Link>

      <p className="side-caption">TU FINCA</p>

      <nav className="side-nav">
        {links.map(([href, icon, label]) => (
          <Link
            key={href}
            href={href}
            className={path === href ? "side-link active" : "side-link"}
          >
            <span className="side-icon">{icon}</span>
            {label}
          </Link>
        ))}
      </nav>

      <footer className="side-bottom">
        <section className="profile-mini">
          <span className="avatar">E</span>
          <span>
            <b>Mi espacio</b>
            <small>Empleado</small>
          </span>
        </section>
        <button className="logout-button" onClick={logout}>
          ↪ Cerrar sesión
        </button>
      </footer>
    </aside>
  );
}
