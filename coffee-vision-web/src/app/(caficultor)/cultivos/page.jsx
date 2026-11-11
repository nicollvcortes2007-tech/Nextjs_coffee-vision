"use client";

import { useState } from "react";
import Topbar from "@/components/dashboard/Topbar";
import Panel from "@/components/dashboard/Panel";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { RequestState } from "@/components/ui/PanelUI";
import { cultivosApi } from "@/features/cultivos";
import { actividadesApi } from "@/features/empleados";
import { recomendacionesApi } from "@/features/recomendaciones";
import { useRemoteData } from "@/hooks/useRemoteData";

const defaultRecs = [
  { icon: "fa-faucet-drip", titulo: "Sistema de riego", texto: "Ajustar para evitar exceso de humedad en raíces. La nubosidad reduce evapotranspiración.", boton: "Ver detalle" },
  { icon: "fa-bug-slash", titulo: "Monitoreo fitosanitario", texto: "Riesgo elevado de broca y roya por nubosidad persistente. Revisión preventiva recomendada.", boton: "Ver detalle" },
  { icon: "fa-leaf", titulo: "Fertilización orgánica", texto: "Planificar dosificación para próximas 3 semanas antes de inicio de floración.", boton: "Plan completo" },
];
const defaultActivity = [
  { fecha: "8 Jun 2026", titulo: "Aplicación de fertilizante", texto: "250 kg/ha de compost orgánico" },
  { fecha: "3 Jun 2026", titulo: "Monitoreo de plagas", texto: "Sin presencia activa detectada" },
  { fecha: "28 May 2026", titulo: "Revisión de sistema de riego", texto: "Ajuste pendiente por exceso de humedad", alerta: true },
  { fecha: "15 May 2026", titulo: "Poda de renovación", texto: "Lote sur — 1.2 ha intervenidas" },
];
const extraActivity = [
  { fecha: "2 May 2026", titulo: "Muestreo de suelos", texto: "Análisis de pH en laboratorio: 5.4 (óptimo para café)" },
  { fecha: "18 Abr 2026", titulo: "Limpieza de canales de drenaje", texto: "Preparación preventiva ante aumento de lluvias regionales" },
];
const phases = [{ nombre: "Flor.", mes: "Ene", color: "#aed581" }, { nombre: "Crec.", mes: "Mar", color: "#cddc39" }, { nombre: "Mad.", mes: "May", color: "#4caf50" }, { nombre: "Cose.", mes: "Jul", color: "#1b5e20" }, { nombre: "Reposo", mes: "Sep / Nov", color: "#c9c9c9" }];

export default function CultivosPage() {
  const { data: cropData, loading, error, refresh } = useRemoteData(cultivosApi.list);
  const { data: activityData } = useRemoteData(actividadesApi.list);
  const { data: recData } = useRemoteData(recomendacionesApi.list);
  const crops = Array.isArray(cropData) ? cropData : cropData?.items ?? [];
  const crop = crops[0] ?? { id: 1, nombre: "Lote Principal", variedad: "Caturra / Castillo", area_hectareas: 4.5, ubicacion: "Popayán, Cauca", estado: "Activo", edad: "3 años" };
  const activitiesApiRows = Array.isArray(activityData) ? activityData : activityData?.items ?? [];
  const apiRecs = Array.isArray(recData) ? recData : recData?.items ?? [];
  const [modal, setModal] = useState("");
  const [pending, setPending] = useState(3);
  const [gps, setGps] = useState("GPS activo");
  const [handled, setHandled] = useState([]);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const [activities, setActivities] = useState(null);
  const [notice, setNotice] = useState("");
  const [formError, setFormError] = useState("");
  const recs = apiRecs.length ? apiRecs.map((item, index) => ({ ...item, titulo: item.titulo ?? item.nombre, texto: item.texto ?? item.detalle, icon: item.icon ?? ["fa-faucet-drip", "fa-bug-slash", "fa-leaf"][index % 3], boton: "Ver detalle" })) : defaultRecs;
  const currentActivities = activities ?? (activitiesApiRows.length ? activitiesApiRows.slice(0, 6).map((item) => ({ fecha: item.fecha, titulo: item.tipo ?? item.actividad, texto: item.notas ?? item.observaciones })) : defaultActivity);

  async function updateCrop(event) {
    event.preventDefault(); setFormError("");
    try { await cultivosApi.update(crop.id, Object.fromEntries(new FormData(event.currentTarget))); setNotice("Datos del lote actualizados."); setModal(""); refresh(); }
    catch (requestError) { setFormError(requestError.message); }
  }

  function loadHistory() { setActivities([...currentActivities, ...extraActivity]); setHistoryLoaded(true); }
  function markHandled(index) { setHandled((current) => [...current, index]); setPending((value) => Math.max(0, value - 1)); setModal(""); }

  return <section className="grid gap-6">
    <Topbar eyebrow="Mis cultivos" title="Lote Principal" notifTo="/notificaciones" profileTo="/perfil" avatar="/coffee-tech/image.png" name="Caficultor" role="Finca El Paraíso"/>
    <RequestState loading={loading} error={error} onRetry={refresh}/>
    {notice && <p className="text-sm font-semibold text-green-deep" role="status">{notice}</p>}
    <section className="flex flex-col justify-between gap-6 rounded-lg border border-line bg-white/95 p-6 shadow-panel sm:flex-row sm:items-center"><article><span className="text-sm font-bold text-green">📍 {(crop.ubicacion ?? "POPAYÁN, CAUCA").toUpperCase()} · 1,738 M S.N.M.</span><h2 className="mt-1 text-xl">Mi Cultivo — {crop.nombre ?? "Lote Principal"}</h2><p className="text-muted">{crop.variedad ?? "Caturra / Castillo"} · {crop.area_hectareas ?? 4.5} hectáreas · {crop.edad ?? "3 años"} de edad</p><footer className="mt-4 flex flex-wrap gap-3"><button type="button" onClick={() => setModal("manage")} className="inline-flex items-center gap-2 rounded-lg bg-coffee px-4 py-2.5 font-bold text-white"><i className="fa-solid fa-gear"/>Gestionar lote</button><button type="button" onClick={() => setModal("map")} className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2.5 font-bold text-coffee hover:border-green"><i className="fa-solid fa-map-location-dot"/>Ver en mapa</button></footer></article><aside className="grid grid-cols-3 gap-4 text-center sm:min-w-[280px]">{[["75%", "Producción"], [crop.area_hectareas ?? "4.5", "Hectáreas"], ["3°", "Años"]].map(([value, label]) => <section key={label}><strong className="block text-2xl text-coffee">{value}</strong><span className="text-xs text-muted">{label}</span></section>)}</aside></section>
    <h3 className="text-sm font-extrabold uppercase tracking-wide text-muted">Resumen del lote</h3>
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[{ icon: "fa-regular fa-comment-dots", titulo: "Estado general", valor: "Bueno", nota: "75% producción" }, { icon: "fa-solid fa-droplet", titulo: "Humedad del suelo", valor: "68%", nota: "Ligeramente alta" }, { icon: "fa-solid fa-temperature-half", titulo: "Temperatura", valor: "17°C", nota: "Parcialmente nublado" }, { icon: "fa-regular fa-calendar", titulo: "Próx. cosecha", valor: "Oct '26", nota: "~4 meses" }].map((item) => <article key={item.titulo} className="rounded-lg border border-line bg-white/95 p-5 shadow-panel"><header className="mb-2 flex items-center gap-2 text-green"><i className={item.icon}/><h4 className="text-sm text-coffee">{item.titulo}</h4></header><strong className="block text-xl text-coffee">{item.valor}</strong><small className="text-muted">{item.nota}</small></article>)}</section>
    <section className="grid gap-4 lg:grid-cols-2">
      <Panel title={<span><i className="fa-solid fa-seedling mr-2 text-green"/>Detalle del cultivo</span>} action={<StatusBadge>Activo</StatusBadge>}>
        <table className="w-full text-sm"><tbody>{[["Variedad", crop.variedad ?? "Caturra / Castillo"], ["Área sembrada", `${crop.area_hectareas ?? 4.5} ha`], ["Edad del lote", crop.edad ?? "3 años (óptimo)"], ["Densidad", "~2,200 plantas/ha"], ["Sombra", "Parcial (30%)"]].map(([field, value]) => <tr key={field}><td className="border-b border-line py-2 text-muted">{field}</td><td className="border-b border-line py-2 font-semibold text-ink">{value}</td></tr>)}</tbody></table>
        <section className="mt-4 grid gap-3">{[["Salud foliar", 82, "bg-green"], ["Control de maleza", 60, "bg-warning"]].map(([label, value, color]) => <article key={label}><header className="mb-1 flex justify-between text-sm"><span className="text-muted">{label}</span><strong className="text-coffee">{value}%</strong></header><div className="h-2 w-full overflow-hidden rounded-full bg-line"><div className={`h-full ${color}`} style={{ width: `${value}%` }}/></div></article>)}</section>
        <button type="button" onClick={() => setModal("manage")} className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-line px-4 font-bold text-coffee hover:border-green"><i className="fa-regular fa-pen-to-square"/>Editar lote</button>
      </Panel>
      <Panel title={<span><i className="fa-solid fa-cloud-sun mr-2 text-green"/>Ubicación y clima</span>} action={<button type="button" onClick={() => { setGps("Actualizando…"); setTimeout(() => setGps("GPS activo"), 800); }} className="rounded-full bg-sky px-3 py-1 text-xs font-extrabold text-coffee">{gps}</button>}>
        <table className="w-full text-sm"><tbody>{[["Municipio", crop.ubicacion ?? "Popayán, Cauca"], ["Altitud", "1,738 m s.n.m."], ["Clima", "Parcialmente nublado"], ["Precipitación mensual", "~180 mm"]].map(([field, value]) => <tr key={field}><td className="border-b border-line py-2 text-muted">{field}</td><td className="border-b border-line py-2 font-semibold text-ink">{value}</td></tr>)}</tbody></table><aside className="mt-3 rounded-lg bg-[#fbfaf7] p-3 text-center font-mono text-sm">2°27'48" N, 76°36'06" W</aside><section className="mt-4 grid grid-cols-3 gap-3 text-center">{[["fa-wind", "12 km/h", "Viento"], ["fa-droplet", "78%", "Humedad"], ["fa-eye", "8 km", "Visibilidad"]].map(([icon, value, label]) => <article key={label}><i className={`fa-solid ${icon} text-green`}/><strong className="block text-coffee">{value}</strong><small className="text-muted">{label}</small></article>)}</section><button type="button" onClick={() => setModal("map")} className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-line px-4 font-bold text-coffee hover:border-green"><i className="fa-regular fa-map"/>Ver en mapa</button>
      </Panel>
    </section>
    <Panel title={<span><i className="fa-solid fa-triangle-exclamation mr-2 text-warning"/>Recomendaciones técnicas activas</span>} action={<span className={`rounded-full px-3 py-1 text-xs font-extrabold ${pending === 0 ? "bg-green-soft text-green-deep" : "bg-[#fff7df] text-warning"}`}>{pending} pendientes</span>}>
      <ul className="grid gap-3">{recs.map((rec, index) => <li key={rec.id ?? rec.titulo ?? index} className={`flex flex-col gap-3 rounded-lg border border-line p-4 sm:flex-row sm:items-center sm:justify-between ${handled.includes(index) ? "bg-green-soft/40" : "bg-[#fbfaf7]"}`}><section><h4 className="flex items-center gap-2 text-sm text-coffee"><i className={`fa-solid ${rec.icon} text-green`}/>{rec.titulo}</h4><p className="mt-1 text-sm text-muted">{rec.texto ?? rec.detalle}</p></section><button type="button" disabled={handled.includes(index)} onClick={() => setModal(`rec-${index}`)} className="min-w-[130px] rounded-lg border border-line px-4 py-2 text-sm font-bold text-coffee disabled:opacity-50">{handled.includes(index) ? "Atendida" : rec.boton}</button></li>)}</ul>
    </Panel>
    <section className="grid gap-4 lg:grid-cols-2">
      <Panel title={<span><i className="fa-solid fa-seedling mr-2 text-green"/>Ciclo fenológico</span>} action={<StatusBadge type="warning">Desarrollo</StatusBadge>}><ol className="grid grid-cols-5 gap-2 text-center text-xs">{phases.map((phase) => <li key={phase.nombre} className="rounded-lg border border-line bg-[#fbfaf7] py-3"><span className="block font-bold text-coffee">{phase.nombre}</span><small className="text-muted">{phase.mes}</small></li>)}</ol><footer className="mt-4 flex flex-wrap gap-3 text-xs text-muted">{phases.slice(0, 4).map((phase) => <span key={phase.nombre} className="flex items-center gap-1.5"><i className="fa-solid fa-circle" style={{ color: phase.color }}/>{phase.nombre === "Flor." ? "Floración" : phase.nombre === "Crec." ? "Crecimiento" : phase.nombre === "Mad." ? "Maduración" : "Cosecha"}</span>)}</footer></Panel>
      <Panel title={<span><i className="fa-solid fa-clock-rotate-left mr-2 text-green"/>Actividad reciente</span>}><ul className="grid gap-3">{currentActivities.map((item, index) => <li key={item.id ?? index} className="border-b border-line pb-3 text-sm last:border-0"><time className="block text-xs text-muted">{item.fecha}</time><strong className="block text-coffee">{item.titulo ?? item.tipo}</strong><p className={item.alerta ? "text-warning" : "text-muted"}>{item.texto ?? item.notas}</p></li>)}</ul><button type="button" onClick={loadHistory} disabled={historyLoaded} className="mt-4 min-h-[44px] w-full rounded-lg border border-line font-bold text-coffee disabled:opacity-50">{historyLoaded ? "Todo el historial cargado" : "Ver historial completo"}</button></Panel>
    </section>
    {modal && <div className="fixed inset-0 z-[60] grid place-items-center bg-black/45 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setModal(""); }}><section role="dialog" aria-modal="true" aria-labelledby="lot-dialog-title" className="grid w-full max-w-lg gap-4 rounded-lg bg-white p-6 shadow-hero"><header className="flex items-start justify-between gap-4"><h2 id="lot-dialog-title" className="text-lg text-coffee">{modal === "map" ? "Ubicación Georreferenciada — Lote Principal" : modal.startsWith("rec-") ? `Detalle técnico: ${recs[Number(modal.slice(4))]?.titulo}` : "Configuración del Lote Principal"}</h2><button type="button" aria-label="Cerrar" onClick={() => setModal("")} className="text-xl text-muted">×</button></header>{modal === "map" ? <><p><strong>Coordenadas:</strong> 2°27'48" N, 76°36'06" W</p><p className="-mt-3">Popayán, Cauca. Altitud óptima calculada a 1,738 m s.n.m.</p><div className="grid h-40 place-items-center rounded-lg border border-dashed border-green/40 bg-green-soft text-center text-coffee"><i className="fa-solid fa-map-location-dot text-2xl"/>Simulación del mapa satelital de caficultura</div></> : modal.startsWith("rec-") ? <><p className="text-muted">{recs[Number(modal.slice(4))]?.texto ?? recs[Number(modal.slice(4))]?.detalle}</p><button type="button" onClick={() => markHandled(Number(modal.slice(4)))} className="justify-self-start rounded-lg bg-green px-4 py-2 font-bold text-white"><i className="fa-solid fa-check mr-2"/>Marcar como atendida</button></> : <form onSubmit={updateCrop} className="grid gap-3"><label className="text-sm font-semibold text-coffee">Variedad de Café<input name="variedad" defaultValue={crop.variedad ?? "Caturra / Castillo"} className="mt-1 w-full rounded-lg border border-line px-3 py-2 font-normal"/></label><label className="text-sm font-semibold text-coffee">Área del lote (Hectáreas)<input name="area_hectareas" type="number" step="0.1" defaultValue={crop.area_hectareas ?? 4.5} className="mt-1 w-full rounded-lg border border-line px-3 py-2 font-normal"/></label>{formError && <p className="text-sm text-danger" role="alert">{formError}</p>}<button type="submit" className="mt-2 min-h-[44px] rounded-lg bg-green font-bold text-white">Actualizar datos del lote</button></form>}</section></div>}
  </section>;
}
