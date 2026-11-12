"use client";

import { useState } from "react";
import { MetricCard, PageHeader, RequestState } from "@/components/ui/PanelUI";
import AdminAccountControls from "@/components/admin/AdminAccountControls";
import TrendChart from "@/components/dashboard/TrendChart";
import { dashboardApi } from "@/features/dashboard";
import { useRemoteData } from "@/hooks/useRemoteData";

export default function MetricasPage() {
  const [period, setPeriod] = useState("30d");
  const { data, loading, error, refresh } = useRemoteData(() => dashboardApi.metrics(period), [period]);

  return (
    <section className="page-wrap">
      <PageHeader eyebrow="ANALÍTICA" title="Métricas de uso" description="Adopción y actividad agregada en la plataforma." action={<div className="admin-metrics-actions"><AdminAccountControls /><label className="period-select">Periodo<select value={period} onChange={(event) => setPeriod(event.target.value)}><option value="7d">7 días</option><option value="30d">30 días</option><option value="90d">90 días</option></select></label></div>} />
      <RequestState loading={loading} error={error} onRetry={refresh} />
      <section className="stat-grid">
        <MetricCard icon="♙" label="Usuarios activos" value={data?.usuarios_activos} note="En el periodo" />
        <MetricCard icon="✳" label="Consultas al asistente" value={data?.consultas_chatbot} note="Solicitudes" tone="blue" />
        <MetricCard icon="▤" label="Guías consultadas" value={data?.guias_consultadas} note="Lecturas" tone="gold" />
        <MetricCard icon="☑" label="Actividades registradas" value={data?.actividades_registradas} note="Por empleados y caficultores" />
      </section>
      <section className="surface chart-card">
        <header className="surface-heading"><section><h2>Uso diario</h2><p className="muted">Sesiones y consultas registradas</p></section></header>
        <TrendChart data={data?.serie ?? []} categoryKey="fecha" valueKey="sesiones" color="#416c57" mode="bar" />
      </section>
    </section>
  );
}
