"use client";

import Link from "next/link";
import { dashboardApi } from "@/features/dashboard";
import { useRemoteData } from "@/hooks/useRemoteData";
import TrendChart from "@/components/dashboard/TrendChart";
import MetricCard from "@/components/dashboard/MetricCard";
import Panel from "@/components/dashboard/Panel";
import Topbar from "@/components/dashboard/Topbar";

export default function DashboardEmpleado() {
  const { data, loading, error, refresh } = useRemoteData(dashboardApi.employee);
  const tasks = data?.tareas_hoy ?? [];
  return (
    <section className="grid gap-6">
      <Topbar eyebrow="Bienvenido" title="Mi jornada" notifTo="/empleado/notificaciones" profileTo="/empleado/perfil" avatar="/coffee-tech/image.png" name={data?.usuario_nombre ?? "Empleado"} role={data?.finca_nombre ?? "Equipo de finca"} />
      {error && <aside role="alert" className="flex justify-between rounded-lg border border-[#f5dfac] bg-[#fff8e8] px-4 py-3 text-sm text-warning"><span>{error}</span><button onClick={refresh} className="font-bold">Reintentar</button></aside>}
      <header className="relative flex min-h-[250px] flex-col justify-center gap-4 overflow-hidden rounded-lg p-8 text-white shadow-hero sm:flex-row sm:items-center sm:justify-between" style={{ backgroundImage: "linear-gradient(90deg, rgba(42,26,15,.9), rgba(78,42,21,.62)), url('/coffee-tech/Cafe.webp')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <section className="relative z-10 max-w-xl"><p className="eyebrow !text-gold">Panel de empleado</p><h1 className="text-white sm:text-4xl">{data?.finca_nombre ?? "Mi finca cafetera"}</h1><p className="mt-3 leading-relaxed text-white/90">Consulta tus lotes asignados, registra las labores del día y encuentra guías para el trabajo en campo.</p><Link href="/empleado/actividades" className="mt-6 inline-flex items-center gap-2 rounded-lg border border-white/35 bg-white/15 px-4 py-2.5 font-extrabold text-white hover:bg-white/25"><i className="fa-solid fa-plus"/> Registrar labor</Link></section>
        <section className="relative z-10 grid w-full max-w-[210px] gap-2 rounded-lg border border-white/25 bg-white/15 p-5 backdrop-blur"><span className="text-white/85">Salud del cultivo</span><strong className="text-5xl">{data?.salud_cultivo ?? "—"}%</strong><small className="text-white/85">Sigue las indicaciones de tu equipo.</small></section>
      </header>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <MetricCard icon="fa-solid fa-seedling" label="Lotes asignados" value={data?.lotes_asignados ?? "—"} hint="En seguimiento" />
        <MetricCard icon="fa-solid fa-calendar-check" label="Actividades registradas" value={data?.actividades_mes ?? "—"} hint="Este mes" />
        <MetricCard icon="fa-solid fa-list-check" label="Labores pendientes" value={data?.labores_pendientes ?? tasks.length} hint="Por completar" />
      </section>
      <section className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
        <Panel eyebrow="Seguimiento" title="Actividad semanal">
          {loading ? <p className="py-8 text-center text-sm text-muted">Cargando estadísticas…</p> : <TrendChart data={data?.actividad_semanal ?? []} categoryKey="semana" valueKey="total" color="#769f1a" />}
        </Panel>
        <Panel eyebrow="Agenda" title="Tareas para hoy" action={<Link href="/empleado/actividades" className="text-sm font-bold text-green">Ver todas</Link>}>
          <ul className="grid gap-3">{tasks.length ? tasks.slice(0, 5).map((task, i) => <li key={task.id ?? i} className="flex items-start gap-3 rounded-lg border border-line bg-[#fbfaf7] p-3"><i className="fa-solid fa-circle-check mt-1 text-green"/><span><strong className="block text-coffee">{task.titulo}</strong><small className="text-muted">{task.lote}{task.hora ? ` · ${task.hora}` : ""}</small></span></li>) : <li className="text-sm text-muted">No tienes tareas asignadas para hoy.</li>}</ul>
        </Panel>
        <Panel eyebrow="Aprendizaje" title="Guías de buenas prácticas"><p className="mb-4 text-sm leading-relaxed text-muted">Consulta recomendaciones de manejo de cultivos, prevención de plagas y cosecha.</p><Link href="/empleado/guias" className="inline-flex items-center gap-2 rounded-lg bg-green px-4 py-2.5 font-bold text-white hover:bg-green-deep">Explorar guías <span>→</span></Link></Panel>
        <Panel eyebrow="Asistente" title="¿Tienes una duda en campo?"><p className="mb-4 text-sm leading-relaxed text-muted">Pregunta al asistente sobre tus labores y el cuidado del café.</p><Link href="/empleado/chatbot" className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2.5 font-bold text-coffee hover:border-green"><i className="fa-solid fa-robot"/> Abrir chatbot</Link></Panel>
      </section>
    </section>
  );
}
