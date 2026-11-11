"use client";

import { useState } from "react";
import Topbar from "@/components/dashboard/Topbar";
import Panel from "@/components/dashboard/Panel";
import StatusBadge from "@/components/dashboard/StatusBadge";
import TrendChart from "@/components/dashboard/TrendChart";
import { RequestState } from "@/components/ui/PanelUI";
import { reportesApi } from "@/features/reportes";
import { useRemoteData } from "@/hooks/useRemoteData";

const sampleLots = [
  { lote: "Lote El Paraíso", variedad: "Castillo", edad: "3 años", estado: "Óptimo", tipo: "ok" },
  { lote: "Lote La Esperanza", variedad: "Caturra", edad: "5 años", estado: "Mantenimiento", tipo: "warning" },
  { lote: "Lote Central", variedad: "Cenicafé 1", edad: "1 año", estado: "Crecimiento", tipo: "ok" },
];

export default function EstadisticasPage() {
  const [period, setPeriod] = useState("30d");
  const { data, loading, error, refresh } = useRemoteData(() => reportesApi.summary(period), [period]);
  const points = data?.produccion?.length ? data.produccion : [{ periodo: "Ene", kilogramos: 40 }, { periodo: "Mar", kilogramos: 65 }, { periodo: "May", kilogramos: 85 }, { periodo: "Jul", kilogramos: 50 }];
  const lots = data?.lotes?.length ? data.lotes : sampleLots;

  return <section className="grid gap-6">
    <Topbar eyebrow="Panel de estadísticas" title="Estadísticas de cultivo" notifTo="/notificaciones" profileTo="/perfil" avatar="/coffee-tech/image.png" name="Caficultor" role="Finca El Paraíso" />
    <label className="period-select justify-self-end">Periodo<select value={period} onChange={(event) => setPeriod(event.target.value)}><option value="7d">7 días</option><option value="30d">30 días</option><option value="90d">90 días</option><option value="1y">12 meses</option></select></label>
    <RequestState loading={loading} error={error} onRetry={refresh} />
    <section className="grid gap-4 sm:grid-cols-3">
      <article className="rounded-lg border border-line bg-white/95 p-5 shadow-panel"><h3 className="text-sm">Total Hectáreas</h3><p className="mt-1 text-2xl font-extrabold text-green-deep">{data?.total_hectareas ?? "24.5 ha"}</p><span className="text-sm text-muted">{data?.hectareas_tendencia ?? "↑ 1.2% este mes"}</span></article>
      <article className="rounded-lg border border-line bg-white/95 p-5 shadow-panel"><h3 className="text-sm">Producción Estimada</h3><p className="mt-1 text-2xl font-extrabold text-green-deep">{data?.produccion_estimada ?? "1,250 Cargas"}</p><span className="text-sm text-muted">{data?.variedad ?? "Variedad Castillo / Cenicafé"}</span></article>
      <article className="rounded-lg border border-line bg-white/95 p-5 shadow-panel"><h3 className="text-sm">Estado Sanitario</h3><p className="mt-1 text-2xl font-extrabold text-warning">{data?.estado_sanitario ?? "94% Sano"}</p><span className="text-sm text-muted">{data?.alertas_sanitarias ?? "6% Alerta de Roya"}</span></article>
    </section>
    <section className="grid gap-4 lg:grid-cols-2">
      <Panel title="Rendimiento de cosecha (últimos meses)"><TrendChart data={points} categoryKey="periodo" valueKey="kilogramos" color="#769f1a" mode="bar" valueSuffix=" kg" /></Panel>
      <Panel title="Estado por lote de cultivo"><div className="overflow-x-auto"><table className="w-full border-collapse text-sm"><thead><tr>{["Lote", "Variedad", "Edad", "Rendimiento"].map((heading) => <th key={heading} className="border-b border-line px-3 py-2.5 text-left text-[0.82rem] text-coffee">{heading}</th>)}</tr></thead><tbody>{lots.map((lot, index) => <tr key={lot.id ?? lot.lote ?? index}><td className="border-b border-line px-3 py-2.5 text-muted">{lot.lote ?? lot.nombre}</td><td className="border-b border-line px-3 py-2.5 text-muted">{lot.variedad ?? "—"}</td><td className="border-b border-line px-3 py-2.5 text-muted">{lot.edad ?? "—"}</td><td className="border-b border-line px-3 py-2.5"><StatusBadge type={lot.tipo ?? (lot.estado === "Mantenimiento" ? "warning" : "ok")}>{lot.estado ?? "Óptimo"}</StatusBadge></td></tr>)}</tbody></table></div></Panel>
    </section>
  </section>;
}
