"use client";

import { useMemo, useState } from "react";
import Topbar from "@/components/dashboard/Topbar";
import MetricCard from "@/components/dashboard/MetricCard";
import Panel from "@/components/dashboard/Panel";
import TrendChart from "@/components/dashboard/TrendChart";
import { RequestState } from "@/components/ui/PanelUI";
import { actividadesApi } from "@/features/empleados";
import { useRemoteData } from "@/hooks/useRemoteData";

function asDate(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export default function EstadisticasEmpleadoPage() {
  const [period, setPeriod] = useState("30");
  const { data, loading, error, refresh } = useRemoteData(actividadesApi.list);
  const allRows = Array.isArray(data) ? data : data?.items ?? [];
  const rows = useMemo(() => {
    const start = new Date();
    start.setDate(start.getDate() - Number(period));
    return allRows.filter((row) => {
      const date = asDate(row.fecha ?? row.creada_en);
      return !date || date >= start;
    });
  }, [allRows, period]);
  const uniqueLots = new Set(rows.map((row) => row.cultivo_nombre ?? row.lote ?? row.cultivo_id).filter(Boolean)).size;
  const workCounts = rows.reduce((counts, row) => {
    const type = row.tipo ?? row.actividad ?? "Otra labor";
    counts[type] = (counts[type] ?? 0) + 1;
    return counts;
  }, {});
  const mostCommon = Object.entries(workCounts).sort((a, b) => b[1] - a[1])[0];
  const weekly = useMemo(() => Array.from({ length: 6 }, (_, index) => {
    const from = new Date(); from.setDate(from.getDate() - (5 - index) * 7 - 6); from.setHours(0, 0, 0, 0);
    const to = new Date(from); to.setDate(to.getDate() + 7);
    const count = rows.filter((row) => { const date = asDate(row.fecha ?? row.creada_en); return date && date >= from && date < to; }).length;
    return { semana: `Sem ${index + 1}`, total: count };
  }), [rows]);
  const recent = [...rows].sort((a, b) => (asDate(b.fecha)?.getTime() ?? 0) - (asDate(a.fecha)?.getTime() ?? 0)).slice(0, 8);

  return <section className="grid gap-6">
    <Topbar eyebrow="Mi seguimiento" title="Estadísticas de mis labores" notifTo="/empleado/notificaciones" profileTo="/empleado/perfil" avatar="/coffee-tech/image.png" name="Empleado" role="Equipo de finca"/>
    <header className="flex flex-wrap items-center justify-between gap-4"><p className="max-w-2xl text-muted">Consulta el trabajo que has registrado en tus lotes asignados y revisa cómo avanza tu jornada.</p><label className="period-select">Periodo<select value={period} onChange={(event) => setPeriod(event.target.value)}><option value="7">Últimos 7 días</option><option value="30">Últimos 30 días</option><option value="90">Últimos 90 días</option></select></label></header>
    <RequestState loading={loading} error={error} onRetry={refresh}/>
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><MetricCard icon="fa-solid fa-list-check" label="Labores realizadas" value={rows.length} hint={`En los últimos ${period} días`}/><MetricCard icon="fa-solid fa-seedling" label="Lotes atendidos" value={uniqueLots} hint="Con actividad registrada"/><MetricCard icon="fa-solid fa-ranking-star" label="Labor más frecuente" value={mostCommon?.[0] ?? "—"} hint={mostCommon ? `${mostCommon[1]} registros` : "Aún no hay registros"}/><MetricCard icon="fa-solid fa-calendar-check" label="Esta semana" value={weekly.at(-1)?.total ?? 0} hint="Labores registradas"/></section>
    <section className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
      <Panel eyebrow="Ritmo de trabajo" title="Labores registradas por semana"><TrendChart data={weekly} categoryKey="semana" valueKey="total" color="#769f1a" mode="bar"/></Panel>
      <Panel eyebrow="Tu resumen" title="Actividad por tipo"><ul className="grid gap-3">{Object.entries(workCounts).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([type, count]) => <li key={type} className="flex items-center justify-between rounded-lg border border-line bg-[#fbfaf7] p-3"><span className="font-semibold text-coffee">{type}</span><strong className="rounded-full bg-green-soft px-3 py-1 text-sm text-green-deep">{count}</strong></li>)}{!rows.length && <li className="text-sm text-muted">Cuando registres labores, aquí verás el resumen por tipo.</li>}</ul></Panel>
      <Panel eyebrow="Historial" title="Mis actividades recientes" className="lg:col-span-2" action={<button type="button" onClick={refresh} className="text-sm font-bold text-green">↻ Actualizar</button>}><div className="overflow-x-auto"><table className="w-full border-collapse"><thead><tr>{["Fecha", "Labor", "Lote", "Observaciones"].map((heading) => <th key={heading} className="border-b border-line px-3 py-3.5 text-left text-[0.82rem] text-coffee">{heading}</th>)}</tr></thead><tbody>{recent.length ? recent.map((row, index) => <tr key={row.id ?? index}><td className="border-b border-line px-3 py-3.5 text-sm text-muted">{row.fecha ?? row.creada_en ?? "—"}</td><td className="border-b border-line px-3 py-3.5 text-sm font-semibold text-coffee">{row.tipo ?? row.actividad ?? "Labor"}</td><td className="border-b border-line px-3 py-3.5 text-sm text-muted">{row.cultivo_nombre ?? row.lote ?? "—"}</td><td className="border-b border-line px-3 py-3.5 text-sm text-muted">{row.notas ?? row.observaciones ?? "—"}</td></tr>) : <tr><td colSpan={4} className="px-3 py-8 text-center text-sm text-muted">Aún no has registrado labores en este periodo.</td></tr>}</tbody></table></div></Panel>
    </section>
  </section>;
}
