"use client";

import Link from "next/link";
import { dashboardApi } from "@/features/dashboard";
import { useRemoteData } from "@/hooks/useRemoteData";
import MetricCard from "@/components/dashboard/MetricCard";
import Panel from "@/components/dashboard/Panel";
import StatusBadge from "@/components/dashboard/StatusBadge";
import Topbar from "@/components/dashboard/Topbar";

const alertsDefault = [
  { icon: "fa-bug", titulo: "Broca detectada", detalle: "1 finca solicita revisión" },
  { icon: "fa-cloud-sun-rain", titulo: "Riesgo climático", detalle: "Lluvia alta en zona norte" },
  { icon: "fa-user-clock", titulo: "Usuarios pendientes", detalle: "5 cuentas por aprobar" },
];

function stateBadge(state = "") {
  const value = state.toLowerCase();
  if (value.includes("alerta")) return "danger";
  if (value.includes("revisi") || value.includes("pendiente")) return "warning";
  return "ok";
}

export default function AdminDashboard() {
  const { data, loading, error, refresh } = useRemoteData(dashboardApi.admin);
  const farms = data?.fincas_recientes ?? [];
  const recentActivity = data?.actividad_reciente ?? [];
  const alerts = data?.alertas?.length ? data.alertas : alertsDefault;
  const metrics = [
    { icon: "fa-solid fa-users", label: "Usuarios activos", value: data?.usuarios_activos ?? data?.usuarios_total ?? "—", hint: data?.usuarios_nuevos_mes ?? "+12 este mes" },
    { icon: "fa-solid fa-map-location-dot", label: "Fincas registradas", value: data?.fincas_total ?? data?.fincas_activas ?? "—", hint: data?.fincas_pendientes ?? "Registradas en la plataforma" },
    { icon: "fa-solid fa-triangle-exclamation", label: "Alertas abiertas", value: data?.alertas_abiertas ?? "—", hint: data?.alertas_prioridad_alta ?? "Requieren seguimiento" },
    { icon: "fa-solid fa-mug-hot", label: "Producción reportada", value: data?.produccion_reportada ?? "—", hint: data?.periodo_produccion ?? "Últimos 30 días" },
  ];

  return (
    <section className="grid gap-6">
      <Topbar eyebrow="Panel administrador" title="Control general de Coffee+Visión" notifTo="/admin/notificaciones" profileTo="/admin/perfil" avatar="/coffee-tech/persona.jpg" name="Administrador" role="Gestión Central" />

      {error && <aside role="alert" className="flex items-center justify-between gap-4 rounded-lg border border-[#f5dfac] bg-[#fff8e8] px-4 py-3 text-sm text-warning"><span>{error}</span><button type="button" onClick={refresh} className="font-bold">Reintentar</button></aside>}

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Indicadores principales">
        {metrics.map((metric) => <MetricCard key={metric.label} {...metric} />)}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
        <Panel eyebrow="Seguimiento" title="Actividad reciente por finca" className="lg:col-span-2" action={<Link href="/admin/usuarios" className="text-sm font-bold text-green hover:text-green-deep">Ver todo</Link>}>
          <div className="overflow-x-auto"><table className="w-full border-collapse"><thead><tr>{["Finca", "Caficultor", "Municipio", "Estado", "Último reporte"].map((heading) => <th key={heading} className="border-b border-line px-3 py-3.5 text-left text-[0.82rem] text-coffee">{heading}</th>)}</tr></thead><tbody>
            {farms.length ? farms.slice(0, 6).map((farm, index) => <tr key={farm.id ?? index}><td className="border-b border-line px-3 py-3.5 text-[0.93rem] text-muted">{farm.finca ?? farm.nombre ?? "Finca"}</td><td className="border-b border-line px-3 py-3.5 text-[0.93rem] text-muted">{farm.caficultor ?? farm.usuario ?? "—"}</td><td className="border-b border-line px-3 py-3.5 text-[0.93rem] text-muted">{farm.municipio ?? "—"}</td><td className="border-b border-line px-3 py-3.5"><StatusBadge type={stateBadge(farm.estado)}>{farm.estado ?? "Activa"}</StatusBadge></td><td className="border-b border-line px-3 py-3.5 text-[0.93rem] text-muted">{farm.ultimo_reporte ?? farm.fecha ?? "—"}</td></tr>) : recentActivity.length ? recentActivity.slice(0, 6).map((item, index) => <tr key={item.id ?? index}><td className="border-b border-line px-3 py-3.5 text-[0.93rem] text-muted">{item.finca ?? item.titulo ?? item.tipo ?? "Actividad"}</td><td className="border-b border-line px-3 py-3.5 text-[0.93rem] text-muted">{item.caficultor ?? item.usuario ?? "—"}</td><td className="border-b border-line px-3 py-3.5 text-[0.93rem] text-muted">{item.municipio ?? "—"}</td><td className="border-b border-line px-3 py-3.5"><StatusBadge type={stateBadge(item.estado)}>{item.estado ?? item.tipo ?? "Activa"}</StatusBadge></td><td className="border-b border-line px-3 py-3.5 text-[0.93rem] text-muted">{item.ultimo_reporte ?? item.fecha ?? "—"}</td></tr>) : <tr><td colSpan={5} className="px-3 py-8 text-center text-sm text-muted">{loading ? "Cargando actividad…" : "No hay actividad reciente."}</td></tr>}
          </tbody></table></div>
        </Panel>

        <Panel eyebrow="Prioridad" title="Alertas del sistema">
          <ul className="grid gap-3">{alerts.map((alert, index) => <li key={alert.id ?? alert.titulo ?? index} className="flex items-start gap-3 rounded-lg border border-line bg-[#fbfaf7] p-3"><i className={`fa-solid ${alert.icon ?? "fa-circle-exclamation"} mt-1 text-green`} aria-hidden="true"/><span><strong className="block text-coffee">{alert.titulo}</strong><small className="text-muted">{alert.detalle}</small></span></li>)}</ul>
        </Panel>

        <Panel eyebrow="Gestión" title="Acciones rápidas">
          <section className="grid gap-3">
            <Link href="/admin/usuarios" className="flex min-h-[46px] items-center justify-center gap-2.5 rounded-lg border border-line bg-[#fbfaf7] font-bold text-coffee hover:border-green hover:text-green"><i className="fa-solid fa-user-plus" aria-hidden="true"/> Crear usuario</Link>
            <Link href="/admin/metricas" className="flex min-h-[46px] items-center justify-center gap-2.5 rounded-lg border border-line bg-[#fbfaf7] font-bold text-coffee hover:border-green hover:text-green"><i className="fa-solid fa-file-export" aria-hidden="true"/> Exportar reporte</Link>
            <Link href="/admin/usuarios" className="flex min-h-[46px] items-center justify-center gap-2.5 rounded-lg border border-line bg-[#fbfaf7] font-bold text-coffee hover:border-green hover:text-green"><i className="fa-solid fa-circle-check" aria-hidden="true"/> Validar fincas</Link>
          </section>
        </Panel>
      </section>
    </section>
  );
}
