"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Topbar from "@/components/dashboard/Topbar";
import MetricCard from "@/components/dashboard/MetricCard";
import Panel from "@/components/dashboard/Panel";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { cultivosApi } from "@/features/cultivos";
import { actividadesApi } from "@/features/empleados";
import { useRemoteData } from "@/hooks/useRemoteData";

export default function LotesAsignadosPage() {
  const { data: cropData, loading, error, refresh } = useRemoteData(cultivosApi.list);
  const { data: activityData } = useRemoteData(actividadesApi.list);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Todos");
  const crops = Array.isArray(cropData) ? cropData : cropData?.items ?? [];
  const activities = Array.isArray(activityData) ? activityData : activityData?.items ?? [];
  const filtered = useMemo(() => crops.filter((crop) => {
    const matchesSearch = `${crop.nombre ?? ""} ${crop.variedad ?? ""}`.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "Todos" || String(crop.estado ?? "").toLowerCase().includes(filter.toLowerCase());
    return matchesSearch && matchesFilter;
  }), [crops, search, filter]);
  const area = crops.reduce((total, crop) => total + (Number(crop.area_hectareas) || 0), 0);
  const active = crops.filter((crop) => !/descanso|inactivo|finalizado/i.test(crop.estado ?? "")).length;

  return <section className="grid gap-6">
    <Topbar eyebrow="Mi finca" title="Mis lotes asignados" notifTo="/empleado/notificaciones" profileTo="/empleado/perfil" avatar="/coffee-tech/image.png" name="Empleado" role="Equipo de finca"/>
    <header className="relative flex min-h-[230px] flex-col justify-center gap-4 overflow-hidden rounded-lg p-8 text-white shadow-hero sm:flex-row sm:items-center sm:justify-between" style={{ backgroundImage: "linear-gradient(90deg, rgba(42,26,15,.9), rgba(78,42,21,.62)), url('/coffee-tech/Cafe.webp')", backgroundSize: "cover", backgroundPosition: "center" }}>
      <section className="relative z-10 max-w-2xl"><p className="eyebrow !text-gold">Trabajo asignado</p><h1 className="text-white sm:text-4xl">Cuida cada lote de tu finca</h1><p className="mt-3 leading-relaxed text-white/90">Consulta las etapas, variedades y áreas de los lotes que el caficultor te asignó. Registra tus labores para mantener actualizado el seguimiento.</p><Link href="/empleado/actividades" className="mt-5 inline-flex items-center gap-2 rounded-lg border border-white/35 bg-white/15 px-4 py-2.5 font-extrabold text-white hover:bg-white/25"><i className="fa-solid fa-clipboard-check"/>Registrar labor</Link></section>
      <section className="relative z-10 grid w-full max-w-[190px] gap-2 rounded-lg border border-white/25 bg-white/15 p-5 backdrop-blur"><span className="text-white/85">Lotes activos</span><strong className="text-5xl leading-none">{loading ? "—" : active}</strong><small className="text-white/85">Asignados a tu jornada</small></section>
    </header>
    <section className="grid gap-4 sm:grid-cols-3"><MetricCard icon="fa-solid fa-seedling" label="Lotes asignados" value={crops.length} hint="En tu finca"/><MetricCard icon="fa-solid fa-leaf" label="Área en seguimiento" value={`${area.toFixed(1)} ha`} hint="Suma de tus lotes"/><MetricCard icon="fa-solid fa-list-check" label="Labores recientes" value={activities.length} hint="Actividades registradas"/></section>
    <Panel eyebrow="Tu trabajo en campo" title="Lotes a tu cargo" action={<label className="sr-only" htmlFor="lot-search">Buscar lote</label>}>
      <section className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><input id="lot-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar por nombre o variedad…" className="min-h-[44px] w-full rounded-lg border border-line px-3 sm:max-w-sm"/><nav className="flex flex-wrap gap-2" aria-label="Filtrar lotes">{["Todos", "Producción", "Floración", "Crecimiento"].map((item) => <button type="button" key={item} onClick={() => setFilter(item)} className={`rounded-full px-3 py-2 text-sm font-bold ${filter === item ? "bg-coffee text-white" : "bg-[#fbfaf7] text-muted"}`}>{item}</button>)}</nav></section>
      {error && <div className="mb-4 flex justify-between rounded-lg border border-[#f5dfac] bg-[#fff8e8] px-4 py-3 text-sm text-warning"><span>{error}</span><button type="button" onClick={refresh} className="font-bold">Reintentar</button></div>}
      {loading ? <p className="py-8 text-center text-muted">Cargando tus lotes asignados…</p> : filtered.length ? <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{filtered.map((crop, index) => {
        const progress = Math.max(12, Math.min(100, Number(crop.progreso ?? crop.salud ?? [76, 58, 88][index % 3])));
        return <article key={crop.id ?? index} className="overflow-hidden rounded-lg border border-line bg-white shadow-panel"><figure className="relative h-36 overflow-hidden"><img src="/coffee-tech/Cafe.webp" alt="Cultivo de café" className="h-full w-full object-cover"/><span className="absolute right-3 top-3"><StatusBadge type={/alerta|riesgo/i.test(crop.estado ?? "") ? "warning" : "ok"}>{crop.estado ?? "En seguimiento"}</StatusBadge></span></figure><section className="grid gap-3 p-5"><header><p className="eyebrow">LOTE ASIGNADO</p><h3 className="text-lg">{crop.nombre ?? `Lote ${index + 1}`}</h3><p className="text-sm text-muted">{crop.variedad ?? "Variedad sin especificar"}</p></header><dl className="grid grid-cols-2 gap-3 rounded-lg bg-[#fbfaf7] p-3 text-sm"><div><dt className="text-muted">Área</dt><dd className="font-bold text-coffee">{crop.area_hectareas ?? "—"} ha</dd></div><div><dt className="text-muted">Etapa</dt><dd className="font-bold text-coffee">{crop.etapa ?? crop.estado ?? "En seguimiento"}</dd></div><div><dt className="text-muted">Ubicación</dt><dd className="font-bold text-coffee">{crop.ubicacion ?? "Finca"}</dd></div><div><dt className="text-muted">Última labor</dt><dd className="font-bold text-coffee">{crop.ultima_actividad ?? "Por registrar"}</dd></div></dl><div><header className="mb-1 flex justify-between text-xs"><span className="text-muted">Seguimiento del cultivo</span><strong className="text-green-deep">{progress}%</strong></header><div className="h-2 overflow-hidden rounded-full bg-line"><div className="h-full rounded-full bg-green" style={{ width: `${progress}%` }}/></div></div><Link href={`/empleado/cultivos/${crop.id}`} className="mt-1 inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg border border-line font-bold text-coffee hover:border-green hover:text-green">Ver detalle del lote <span aria-hidden="true">→</span></Link></section></article>;
      })}</section> : <p className="py-10 text-center text-muted">{search || filter !== "Todos" ? "No hay lotes que coincidan con la búsqueda." : "Aún no tienes lotes asignados."}</p>}
    </Panel>
  </section>;
}
