import Link from "next/link";

export default function AdminAccountControls() {
  return (
    <nav className="flex flex-wrap items-center gap-3 sm:gap-4" aria-label="Cuenta de administrador">
      <Link href="/admin/notificaciones" aria-label="Notificaciones" className="relative grid h-[45px] w-[45px] shrink-0 place-items-center rounded-xl border border-line bg-white text-lg text-coffee shadow-sm transition-colors hover:border-green">
        <i className="fa-regular fa-bell" aria-hidden="true" />
        <span className="absolute right-2.5 top-2 h-2 w-2 rounded-full bg-danger" />
      </Link>
      <Link href="/admin/perfil" className="flex min-w-[220px] items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-1.5 shadow-sm">
        <img src="/coffee-tech/persona.jpg" alt="" className="h-10 w-10 rounded-full border-2 border-green-soft object-cover" />
        <span className="flex flex-col items-start leading-tight">
          <strong className="text-sm text-ink">Administrador</strong>
          <small className="text-muted">Gestión Central</small>
        </span>
      </Link>
    </nav>
  );
}
