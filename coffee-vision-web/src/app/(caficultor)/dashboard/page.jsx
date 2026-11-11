"use client";

import Link from "next/link";
import { useState } from "react";
import { dashboardApi } from "@/features/dashboard";
import TrendChart from "@/components/dashboard/TrendChart";
import MetricCard from "@/components/dashboard/MetricCard";
import Panel from "@/components/dashboard/Panel";
import StatusBadge from "@/components/dashboard/StatusBadge";
import Topbar from "@/components/dashboard/Topbar";
import { useRemoteData } from "@/hooks/useRemoteData";

const defaultRecommendations = [
  { icon: "fa-bug", titulo: "Revisar frutos perforados", detalle: "Prioridad alta en lote 2." },
  { icon: "fa-droplet", titulo: "Fertilización balanceada", detalle: "Programada para final de mes." },
  { icon: "fa-cloud-sun", titulo: "Monitorear humedad", detalle: "Riesgo por lluvias frecuentes." },
];

const guides = [
  { icon: "fa-shield-halved", titulo: "Manejo integrado de plagas", detalle: "Prevención, monitoreo y control responsable." },
  { icon: "fa-seedling", titulo: "Nutrición del cultivo", detalle: "Buenas prácticas para cada etapa del café." },
  { icon: "fa-mug-saucer", titulo: "Cosecha y postcosecha", detalle: "Mejora la calidad del grano y reduce pérdidas." },
];

function badgeType(status = "") {
  const value = status.toLowerCase();
  if (value.includes("pendiente") || value.includes("alerta")) return "warning";
  if (value.includes("vencid") || value.includes("riesgo")) return "danger";
  return "ok";
}

export default function DashboardCaficultor() {
  const { data, loading, error, refresh } = useRemoteData(dashboardApi.farmer);
  const [period, setPeriod] = useState("semanal");
  const farmName = data?.finca_nombre ?? "Finca El Paraíso";
  const recommendations = data?.recomendaciones ?? defaultRecommendations;
  const labors = data?.labores_proximas ?? [];
  const chartData = period === "mensual" && data?.actividad_mensual?.length
    ? data.actividad_mensual
    : data?.actividad_semanal ?? [];

  const metrics = [
    { icon: "fa-solid fa-seedling", label: "Lotes activos", value: data?.lotes_activos, hint: `${data?.cultivos_en_floracion ?? 0} en floración` },
    { icon: "fa-solid fa-bug", label: "Alertas de plagas", value: data?.alertas_activas, hint: "En seguimiento" },
    { icon: "fa-solid fa-mug-hot", label: "Cosecha estimada", value: data?.cosecha_estimada, hint: "Próximo corte" },
    { icon: "fa-solid fa-calendar-check", label: "Labores pendientes", value: data?.labores_pendientes, hint: "Esta semana" },
  ];

  const summary = [
    ["Producción", data?.produccion_semana ?? "—", data?.variacion_produccion ?? "Resumen de producción"],
    ["Alertas", data?.alertas_activas ?? "—", `${data?.alertas_atendidas ?? 0} atendidas`],
    ["Labores", data?.actividades_mes ?? "—", data?.resumen_labores ?? "Registros de la finca"],
  ];

  return (
    <section className="grid gap-6">
      <Topbar
        eyebrow="Bienvenido"
        title="Mi finca cafetera"
        notifTo="/notificaciones"
        profileTo="/perfil"
        avatar="/coffee-tech/image.png"
        name={data?.usuario_nombre ?? "Caficultor"}
        role={farmName}
      />

      {error && (
        <aside role="alert" className="flex items-center justify-between gap-4 rounded-lg border border-[#f5dfac] bg-[#fff8e8] px-4 py-3 text-sm text-warning">
          <span>{error}</span>
          <button type="button" onClick={refresh} className="font-bold">Reintentar</button>
        </aside>
      )}

      <header
        className="relative flex min-h-[270px] flex-col justify-center gap-4 overflow-hidden rounded-lg p-8 text-white shadow-hero sm:flex-row sm:items-center sm:justify-between"
        style={{
          backgroundImage: "linear-gradient(90deg, rgba(42,26,15,0.9), rgba(78,42,21,0.62)), url('/coffee-tech/Cafe.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <section className="relative z-10 max-w-xl">
          <p className="eyebrow !text-gold">Panel caficultor</p>
          <h1 className="text-white sm:text-4xl">{farmName}</h1>
          <p className="mt-3 leading-relaxed text-white/90">
            Gestiona tus cultivos, revisa recomendaciones y consulta el asistente inteligente para tomar mejores decisiones en tu producción cafetera.
          </p>
          <Link href="/actividades" className="mt-6 inline-flex items-center gap-2 rounded-lg border border-white/35 bg-white/15 px-4 py-2.5 font-extrabold text-white hover:bg-white/25">
            <i className="fa-solid fa-plus" aria-hidden="true" /> Registrar labor
          </Link>
        </section>

        <section className="relative z-10 grid w-full max-w-[210px] gap-2.5 rounded-lg border border-white/25 bg-white/15 p-5 backdrop-blur">
          <span className="text-white/85">Salud del cultivo</span>
          <strong className="text-5xl leading-none">{data?.salud_cultivo ?? "—"}%</strong>
          <small className="text-white/85">Estado estable con seguimiento recomendado en tus lotes.</small>
        </section>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Indicadores de mi finca">
        {metrics.map((metric) => <MetricCard key={metric.label} {...metric} />)}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
        <Panel
          eyebrow="Estadísticas"
          title="Resumen semanal y mensual"
          className="lg:col-span-2"
          action={(
            <nav className="flex gap-2 rounded-lg bg-[#fbfaf7] p-1" aria-label="Periodo de estadísticas">
              {["semanal", "mensual"].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setPeriod(option)}
                  className={`rounded-md px-3 py-1.5 text-sm font-bold capitalize ${period === option ? "bg-white text-coffee shadow-sm" : "text-muted"}`}
                >
                  {option}
                </button>
              ))}
            </nav>
          )}
        >
          {loading ? <p className="py-8 text-center text-sm text-muted">Cargando estadísticas…</p> : (
            <>
              <section className="mb-4 grid gap-3 sm:grid-cols-3">
                {summary.map(([label, value, note]) => (
                  <article key={label} className="rounded-lg border border-line bg-[#fbfaf7] p-4">
                    <span className="text-muted">{label}</span>
                    <strong className="my-1 block text-[1.7rem] text-coffee">{value}</strong>
                    <small className="text-muted">{note}</small>
                  </article>
                ))}
              </section>
              <TrendChart data={chartData} categoryKey={period === "mensual" ? "mes" : "semana"} valueKey="total" color="#769f1a" />
            </>
          )}
        </Panel>

        <Panel eyebrow="Recomendaciones" title="Acciones sugeridas">
          <ul className="grid gap-3">
            {recommendations.slice(0, 4).map((item, index) => (
              <li key={item.titulo ?? index} className="flex items-start gap-3 rounded-lg border border-line bg-[#fbfaf7] p-3">
                <i className={`fa-solid ${item.icon ?? "fa-circle-check"} mt-1 text-green`} aria-hidden="true" />
                <span><strong className="block text-coffee">{item.titulo}</strong><small className="text-muted">{item.detalle ?? item.lote}</small></span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel eyebrow="Aprendizaje" title="Guías de buenas prácticas">
          <section className="grid gap-3">
            {guides.map((guide) => (
              <Link key={guide.titulo} href="/contenidos" className="flex items-start gap-3 rounded-lg border border-line bg-[#fbfaf7] p-3 hover:border-green">
                <i className={`fa-solid ${guide.icon} mt-1 text-green`} aria-hidden="true" />
                <span><strong className="block text-coffee">{guide.titulo}</strong><span className="mt-1 block text-sm text-muted">{guide.detalle}</span></span>
              </Link>
            ))}
          </section>
        </Panel>

        <Panel
          eyebrow="Agenda"
          title="Labores próximas de la finca"
          className="lg:col-span-2"
          action={<Link href="/actividades" className="text-sm font-bold text-green hover:text-green-deep">Agregar labor</Link>}
        >
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead><tr>{["Actividad", "Lote", "Fecha", "Estado"].map((heading) => <th key={heading} className="border-b border-line px-3 py-3.5 text-left text-[0.82rem] text-coffee">{heading}</th>)}</tr></thead>
              <tbody>
                {labors.length ? labors.map((labor, index) => (
                  <tr key={labor.id ?? index}>
                    <td className="border-b border-line px-3 py-3.5 text-[0.93rem] text-muted">{labor.actividad ?? labor.tipo}</td>
                    <td className="border-b border-line px-3 py-3.5 text-[0.93rem] text-muted">{labor.lote ?? labor.cultivo_nombre}</td>
                    <td className="border-b border-line px-3 py-3.5 text-[0.93rem] text-muted">{labor.fecha}</td>
                    <td className="border-b border-line px-3 py-3.5"><StatusBadge type={badgeType(labor.estado)}>{labor.estado ?? "Registrada"}</StatusBadge></td>
                  </tr>
                )) : <tr><td colSpan={4} className="px-3 py-8 text-center text-sm text-muted">{loading ? "Cargando labores…" : "No hay labores próximas."}</td></tr>}
              </tbody>
            </table>
          </div>
        </Panel>
      </section>

      <Link href="/chatbot" aria-label="Abrir asistente IA" className="fixed bottom-7 right-7 z-30 grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-green to-green-deep text-2xl text-white shadow-hero transition-transform hover:-translate-y-0.5">
        <i className="fa-solid fa-robot" aria-hidden="true" />
      </Link>
    </section>
  );
}
