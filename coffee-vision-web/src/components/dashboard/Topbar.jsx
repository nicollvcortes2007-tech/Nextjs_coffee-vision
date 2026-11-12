import Link from "next/link";

export default function Topbar({ eyebrow, title, notifTo, profileTo, avatar, name, role, toolbar }) {
  return (
    <header className="dashboard-topbar flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <section>
        {eyebrow && <p className="eyebrow !mb-1">{eyebrow}</p>}
        <h1 className="m-0">{title}</h1>
      </section>

      <nav className="flex flex-wrap items-center gap-3 sm:gap-4" aria-label="Perfil y avisos">
        <Link
          href={notifTo}
          aria-label="Notificaciones"
          className="relative grid h-[45px] w-[45px] place-items-center rounded-xl border border-line bg-white text-lg text-coffee shadow-sm transition-colors hover:border-green"
        >
          <i className="fa-regular fa-bell" aria-hidden="true" />
          <span className="absolute right-2.5 top-2 h-2 w-2 rounded-full bg-danger" />
        </Link>

        <Link
          href={profileTo}
          className="flex min-w-[220px] items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-1.5 shadow-sm"
        >
          <img src={avatar} alt={`Foto de perfil de ${name}`} className="h-10 w-10 rounded-full border-2 border-green-soft object-cover" />
          <span className="flex flex-col items-start leading-tight">
            <strong className="text-sm text-ink">{name}</strong>
            <small className="text-muted">{role}</small>
          </span>
        </Link>
        {toolbar}
      </nav>
    </header>
  );
}
