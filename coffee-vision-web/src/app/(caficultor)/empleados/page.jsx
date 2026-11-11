"use client";

import Link from "next/link";
import MetricCard from "@/components/dashboard/MetricCard";
import Panel from "@/components/dashboard/Panel";
import StatusBadge from "@/components/dashboard/StatusBadge";
import Topbar from "@/components/dashboard/Topbar";
import { RequestState } from "@/components/ui/PanelUI";
import { useRemoteData } from "@/hooks/useRemoteData";
import { http } from "@/lib/api";

function employeesFrom(response) {
  if (Array.isArray(response)) return response;
  return response?.items ?? response?.results ?? response?.data ?? [];
}

function initials(name = "Empleado") {
  return name.trim().split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

function formatDate(value) {
  if (!value) return "Fecha no disponible";
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString("es-CO", { day: "numeric", month: "short", year: "numeric" });
}

export default function EmpleadosPage() {
  const { data, loading, error, refresh } = useRemoteData(() => http.get("/empleados"), []);
  const employees = employeesFrom(data);
  const activeCount = employees.filter((employee) => !employee.estado || /activo|vigente/i.test(employee.estado)).length;
  const pendingCount = employees.filter((employee) => /pendiente|invit/i.test(employee.estado ?? "")).length;

  return (
    <section className="grid gap-6">
      <Topbar
        eyebrow="Equipo de finca"
        title="Mi equipo"
        notifTo="/notificaciones"
        profileTo="/perfil"
        avatar="/coffee-tech/image.png"
        name="Caficultor"
        role="Finca El Paraíso"
      />

      <header className="flex flex-wrap items-end justify-between gap-4">
        <p className="max-w-2xl text-muted">Consulta quiénes trabajan contigo en la finca y mantén sus accesos organizados.</p>
        <Link href="/empleados/nuevo" className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-green px-4 py-2.5 font-extrabold !text-white shadow-sm transition-colors hover:bg-green-deep">
          <i className="fa-solid fa-user-plus" aria-hidden="true" /> Invitar empleado
        </Link>
      </header>

      <RequestState loading={loading} error={error} onRetry={refresh} />

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Resumen del equipo">
        <MetricCard icon="fa-solid fa-users" label="Personas en el equipo" value={loading ? "…" : employees.length} hint="Vinculadas a tu finca" />
        <MetricCard icon="fa-solid fa-user-check" label="Integrantes activos" value={loading ? "…" : activeCount} hint="Con acceso al trabajo de campo" />
        <MetricCard icon="fa-solid fa-envelope-open-text" label="Invitaciones pendientes" value={loading ? "…" : pendingCount} hint="Por completar su vinculación" />
      </section>

      <Panel
        eyebrow="Personas vinculadas"
        title="Equipo de trabajo"
        action={<button type="button" onClick={refresh} className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-line px-3 text-sm font-bold text-coffee transition-colors hover:border-green hover:text-green"><i className="fa-solid fa-rotate" aria-hidden="true" /> Actualizar</button>}
      >
        {loading ? <p className="py-8 text-center text-sm text-muted">Cargando integrantes…</p> : error ? null : employees.length ? (
          <section className="grid gap-4 sm:grid-cols-2">
            {employees.map((employee, index) => {
              const name = employee.nombre ?? employee.name ?? `Empleado ${index + 1}`;
              const status = employee.estado ?? "Activo";
              const isPending = /pendiente|invit/i.test(status);
              return (
                <article key={employee.id ?? employee.email ?? index} className="grid gap-4 rounded-lg border border-line bg-[#fbfaf7] p-4 transition-colors hover:border-green/50">
                  <header className="flex items-start gap-3">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-green-soft bg-white font-extrabold text-green-deep" aria-hidden="true">{initials(name)}</span>
                    <span className="min-w-0 flex-1">
                      <strong className="block truncate text-base text-coffee">{name}</strong>
                      <small className="text-muted">Equipo de finca</small>
                    </span>
                    <StatusBadge type={isPending ? "warning" : "ok"}>{status}</StatusBadge>
                  </header>
                  <dl className="grid gap-3 border-t border-line pt-3 text-sm">
                    <div className="flex min-w-0 items-center gap-2 text-muted"><i className="fa-regular fa-envelope w-4 shrink-0 text-center text-green" aria-hidden="true" /><dt className="sr-only">Correo</dt><dd className="truncate">{employee.email ?? employee.correo ?? "Correo no disponible"}</dd></div>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-muted"><i className="fa-regular fa-calendar w-4 shrink-0 text-center text-green" aria-hidden="true" /><dt>Vinculado desde</dt><dd className="ml-auto max-w-full text-right font-semibold text-coffee">{formatDate(employee.fecha_vinculacion ?? employee.created_at)}</dd></div>
                  </dl>
                </article>
              );
            })}
          </section>
        ) : (
          <section className="grid justify-items-center gap-3 py-10 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-green-soft text-xl text-green"><i className="fa-solid fa-users" aria-hidden="true" /></span>
            <h3 className="text-lg font-bold text-coffee">Todavía no hay integrantes vinculados</h3>
            <p className="max-w-md text-sm text-muted">Invita a las personas que te ayudan en la finca para organizar el trabajo y sus accesos.</p>
            <Link href="/empleados/nuevo" className="mt-1 inline-flex min-h-[42px] items-center gap-2 rounded-lg bg-green px-4 font-bold text-white transition-colors hover:bg-green-deep"><i className="fa-solid fa-user-plus" aria-hidden="true" /> Invitar empleado</Link>
          </section>
        )}
      </Panel>
    </section>
  );
}