"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import Topbar from "@/components/dashboard/Topbar";
import Panel from "@/components/dashboard/Panel";
import StatusBadge from "@/components/dashboard/StatusBadge";
import MetricCard from "@/components/dashboard/MetricCard";
import { RequestState } from "@/components/ui/PanelUI";
import { cultivosApi } from "@/features/cultivos";
import { actividadesApi } from "@/features/empleados";
import { useRemoteData } from "@/hooks/useRemoteData";

export default function LoteEmpleadoPage() {
  const { id } = useParams();
  const { data: crop, loading, error, refresh } = useRemoteData(() => cultivosApi.get(id), [id]);
  const { data: activityData } = useRemoteData(actividadesApi.list);
  const activities = Array.isArray(activityData) ? activityData : activityData?.items ?? [];
  const lotActivities = activities.filter((item) => String(item.cultivo_id) === String(id) || String(item.lote_id) === String(id)).slice(0, 5);

  return <section className="grid gap-6">
    <Topbar eyebrow="Mi finca · Lote asignado" title={crop?.nombre ?? "Detalle del lote"} notifTo="/empleado/notificaciones" profileTo="/empleado/perfil" avatar="/coffee-tech/image.png" name="Empleado" role="Equipo de finca"/>
    <RequestState loading={loading} error={error} onRetry={refresh}/>
    {crop && <>
      <header className="relative flex min-h-[225px] flex-col justify-center gap-4 overflow-hidden rounded-lg p-8 text-white shadow-hero sm:flex-row sm:items-center sm:justify-between" style={{ backgroundImage: "linear-gradient(90deg, rgba(42,26,15,.9), rgba(78,42,21,.62)), url('/coffee-tech/Cafe.webp')", backgroundSize: "cover", backgroundPosition: "center" }}><section className="relative z-10 max-w-xl"><p className="eyebrow !text-gold">LOTE A TU CARGO</p><h1 className="text-white sm:text-4xl">{crop.nombre}</h1><p className="mt-3 text-white/90">{crop.variedad ?? "Cultivo de café"} · {crop.ubicacion ?? "Finca asignada"}</p><Link href="/empleado/actividades" className="mt-5 inline-flex items-center gap-2 rounded-lg border border-white/35 bg-white/15 px-4 py-2.5 font-extrabold text-white hover:bg-white/25"><i className="fa-solid fa-plus"/>Registrar labor en este lote</Link></section><span className="relative z-10 self-start"><StatusBadge>{crop.estado ?? "En seguimiento"}</StatusBadge></span></header>
      <section className="grid gap-4 sm:grid-cols-3"><MetricCard icon="fa-solid fa-ruler-combined" label="Área asignada" value={`${crop.area_hectareas ?? "—"} ha`} hint="Superficie de trabajo"/><MetricCard icon="fa-solid fa-seedling" label="Variedad" value={crop.variedad ?? "Café"} hint="Cultivo del lote"/><MetricCard icon="fa-solid fa-list-check" label="Labores registradas" value={lotActivities.length} hint="Actividad reciente"/></section>
      <section className="grid gap-4 lg:grid-cols-2"><Panel title={<span><i className="fa-solid fa-seedling mr-2 text-green"/>Información del cultivo</span>} action={<StatusBadge>{crop.estado ?? "Activo"}</StatusBadge>}><table className="w-full text-sm"><tbody>{[["Nombre del lote", crop.nombre], ["Variedad", crop.variedad ?? "Sin especificar"], ["Área", `${crop.area_hectareas ?? "—"} ha`], ["Etapa", crop.etapa ?? crop.estado ?? "En seguimiento"], ["Ubicación", crop.ubicacion ?? "Finca asignada"]].map(([label, value]) => <tr key={label}><td className="border-b border-line py-3 text-muted">{label}</td><td className="border-b border-line py-3 font-semibold text-ink">{value}</td></tr>)}</tbody></table><section className="mt-5"><header className="mb-1 flex justify-between text-sm"><span className="text-muted">Seguimiento del cultivo</span><strong className="text-coffee">{crop.progreso ?? crop.salud ?? 75}%</strong></header><div className="h-2 overflow-hidden rounded-full bg-line"><div className="h-full rounded-full bg-green" style={{ width: `${crop.progreso ?? crop.salud ?? 75}%` }}/></div></section></Panel>
        <Panel title={<span><i className="fa-solid fa-clipboard-list mr-2 text-green"/>Actividad en este lote</span>}><ul className="grid gap-3">{lotActivities.length ? lotActivities.map((item, index) => <li key={item.id ?? index} className="border-b border-line pb-3 last:border-0"><time className="block text-xs text-muted">{item.fecha}</time><strong className="block text-coffee">{item.tipo ?? item.actividad}</strong><p className="text-sm text-muted">{item.notas ?? item.observaciones ?? "Actividad registrada."}</p></li>) : <li className="text-sm text-muted">Todavía no has registrado labores para este lote.</li>}</ul><Link href="/empleado/actividades" className="mt-3 inline-flex items-center gap-2 font-bold text-green hover:text-green-deep">Ver y registrar labores <span>→</span></Link></Panel>
      </section>
    </>}
  </section>;
}
