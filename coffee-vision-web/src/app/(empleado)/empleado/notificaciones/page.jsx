"use client";

import { useMemo, useState } from "react";
import Topbar from "@/components/dashboard/Topbar";
import Panel from "@/components/dashboard/Panel";
import { notificacionesApi } from "@/features/empleados";
import { useRemoteData } from "@/hooks/useRemoteData";

const tabs = ["Todas", "No leídas", "Críticas", "Alertas de cultivo"];
const samples = [
  { id: 101, icon: "🚨", titulo: "Alerta de Plaga Detectada", mensaje: "Revisa el lote asignado y avisa al caficultor si observas señales de roya.", creada_en: "Hace 15 minutos", leida: false, critica: true },
  { id: 102, icon: "🌧️", titulo: "Alerta Meteorológica: Lluvias Fuertes", mensaje: "Se esperan lluvias en la zona. Mantén limpios los canales de drenaje.", creada_en: "Hace 2 horas", leida: false },
  { id: 103, icon: "📋", titulo: "Nueva labor asignada", mensaje: "Consulta la actividad programada para el lote El Mirador.", creada_en: "Ayer", leida: true },
];

export default function NotificacionesEmpleadoPage() {
  const { data } = useRemoteData(notificacionesApi.list);
  const [tab, setTab] = useState(tabs[0]);
  const [readIds, setReadIds] = useState([]);
  const source = Array.isArray(data) ? data : data?.items ?? [];
  const notifications = useMemo(() => (source.length ? source : samples).map((item, index) => ({ ...item, id: item.id ?? index, mensaje: item.mensaje ?? item.texto ?? item.detalle ?? "Tienes una actualización de tu finca.", creada_en: item.creada_en ?? item.fecha ?? "Reciente", leida: item.leida || readIds.includes(item.id), critica: item.critica ?? /plaga|roya|broca|cr[ií]tic/i.test(`${item.titulo} ${item.mensaje}`), icon: item.icon ?? "🔔" })), [source, readIds]);
  const visible = notifications.filter((item) => tab === "No leídas" ? !item.leida : tab === "Críticas" ? item.critica : tab === "Alertas de cultivo" ? /cultivo|plaga|roya|broca|lluvia/i.test(`${item.titulo} ${item.mensaje}`) : true);

  async function markRead(item) {
    setReadIds((current) => [...current, item.id]);
    if (Number(item.id) < 100) await notificacionesApi.markRead(item.id).catch(() => {});
  }

  return <section className="grid gap-6">
    <Topbar eyebrow="Mi jornada" title="Notificaciones" notifTo="/empleado/notificaciones" profileTo="/empleado/perfil" avatar="/coffee-tech/image.png" name="Empleado" role="Equipo de finca"/>
    <Panel title="Avisos del caficultor, alertas de los lotes y novedades de tu jornada">
      <nav className="mb-4 flex flex-wrap gap-2 border-b border-line pb-3">{tabs.map((item) => <button type="button" key={item} onClick={() => setTab(item)} className={`rounded-full px-4 py-1.5 text-sm font-bold ${tab === item ? "bg-coffee text-white" : "bg-[#fbfaf7] text-muted"}`}>{item}{item === "No leídas" && ` (${notifications.filter((notice) => !notice.leida).length})`}</button>)}</nav>
      <ul className="grid gap-3">{visible.map((item) => <li key={item.id} className={`flex items-start gap-3 rounded-lg border p-4 ${!item.leida ? "border-green/40 bg-green-soft/30" : "border-line bg-[#fbfaf7]"}`}><span className="text-xl">{item.icon}</span><article className="flex-1"><h3 className="text-sm text-coffee">{item.titulo}</h3><p className="mt-1 text-sm text-muted">{item.mensaje}</p><time className="mt-1 block text-xs text-muted">{item.creada_en}</time></article>{!item.leida && <button type="button" onClick={() => markRead(item)} aria-label="Marcar como leída" className="grid h-8 w-8 place-items-center rounded-full border border-line text-green hover:bg-green-soft">✓</button>}</li>)}</ul>
    </Panel>
  </section>;
}
