"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { cultivosApi } from "@/features/cultivos";
import { MetricCard, PageHeader, RequestState } from "@/components/ui/PanelUI";
import { useRemoteData } from "@/hooks/useRemoteData";

export default function CultivoDetallePage() {
  const { id } = useParams();
  const { data, loading, error, refresh } = useRemoteData(() => cultivosApi.get(id), [id]);

  return (
    <section className="page-wrap">
      <PageHeader eyebrow="DETALLE DEL LOTE" title={data?.nombre ?? "Cultivo"} description={`${data?.variedad ?? "Variedad pendiente"} · ${data?.estado ?? "Estado pendiente"}`} action={<Link className="button button-outline" href="/cultivos">← Volver a cultivos</Link>} />
      <RequestState loading={loading} error={error} onRetry={refresh} />
      {data && <section className="stat-grid">
        <MetricCard icon="♧" label="Área" value={data.area_hectareas != null ? `${data.area_hectareas} ha` : "—"} note="Extensión del lote" />
        <MetricCard icon="☑" label="Actividades" value={data.actividades_total ?? "—"} note="Labores registradas" tone="gold" />
        <MetricCard icon="✳" label="Alertas" value={data.alertas_activas ?? "—"} note="Requieren seguimiento" tone="blue" />
      </section>}
      <section className="surface">
        <header className="surface-heading"><section><h2>Historial del lote</h2><p className="muted">Actividades vinculadas a este cultivo</p></section></header>
        {data?.actividades?.length ? <ol className="event-list">{data.actividades.map((item, index) => <li key={item.id ?? index}><span className="event-dot"/><section><b>{item.tipo}</b><small>{item.notas}</small></section><time>{item.fecha}</time></li>)}</ol> : <p className="empty-state">No hay actividades registradas.</p>}
      </section>
    </section>
  );
}
