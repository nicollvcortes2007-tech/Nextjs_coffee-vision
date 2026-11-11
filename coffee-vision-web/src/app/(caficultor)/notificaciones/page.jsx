"use client";

import { useMemo, useState } from "react";
import Topbar from "@/components/dashboard/Topbar";
import Panel from "@/components/dashboard/Panel";
import { notificacionesApi } from "@/features/empleados";
import { useRemoteData } from "@/hooks/useRemoteData";

const TABS = ["Todas", "No leídas", "Críticas", "Alertas de cultivo"];
const initialNotifications = [
  { id: 101, icon: "🚨", titulo: "Alerta de Plaga Detectada", texto: "El sistema de IA detectó un posible brote de Roya del café en el Lote 3 (variedad Castillo). Se recomienda inspección inmediata.", fecha: "Hace 15 minutos", leida: false, critica: true },
  { id: 102, icon: "🌧️", titulo: "Alerta Meteorológica: Lluvias Fuertes", texto: "Se pronostican precipitaciones altas en Popayán para las próximas 48 horas. Asegura los canales de drenaje.", fecha: "Hace 2 horas", leida: false, critica: false },
  { id: 103, icon: "📊", titulo: "Reporte Mensual Generado", texto: "El informe de rendimiento y estadísticas de cosecha ya está disponible.", fecha: "Ayer", leida: true, critica: false },
  { id: 104, icon: "🌱", titulo: "Sugerencia de Fertilización", texto: "La humedad del suelo indica que es buen momento para aplicar el abonado programado.", fecha: "Hace 3 días", leida: true, critica: false },
];

export default function NotificacionesPage() {
  const { data } = useRemoteData(notificacionesApi.list);
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [readIds, setReadIds] = useState([]);
  const records = Array.isArray(data) ? data : data?.items ?? [];
  const notifications = useMemo(() => (records.length ? records : initialNotifications).map((item, index) => ({ ...item, id: item.id ?? index, texto: item.texto ?? item.mensaje ?? item.detalle, fecha: item.fecha ?? item.creada_en ?? "Reciente", leida: readIds.includes(item.id) || item.leida, critica: item.critica ?? /plaga|roya|broca|cr[ií]tic/i.test(`${item.titulo} ${item.mensaje}`), icon: item.icon ?? "🔔" })), [records, readIds]);
  const visible = notifications.filter((item) => activeTab === "No leídas" ? !item.leida : activeTab === "Críticas" ? item.critica : activeTab === "Alertas de cultivo" ? /cultivo|plaga|roya|broca|lluvia/i.test(`${item.titulo} ${item.texto}`) : true);

  async function markRead(item) {
    setReadIds((current) => [...current, item.id]);
    if (item.id < 100) await notificacionesApi.markRead(item.id).catch(() => {});
  }

  return <section className="grid gap-6">
    <Topbar eyebrow="Panel de caficultor" title="Notificaciones" notifTo="/notificaciones" profileTo="/perfil" avatar="/coffee-tech/image.png" name="Caficultor" role="Finca El Paraíso" />
    <Panel title="Revisa las alertas de tus cultivos, reportes del clima y estados del sistema">
      <nav className="mb-4 flex flex-wrap gap-2 border-b border-line pb-3">{TABS.map((tab) => <button type="button" key={tab} onClick={() => setActiveTab(tab)} className={`rounded-full px-4 py-1.5 text-sm font-bold ${activeTab === tab ? "bg-coffee text-white" : "bg-[#fbfaf7] text-muted"}`}>{tab}{tab === "No leídas" && ` (${notifications.filter((item) => !item.leida).length})`}</button>)}</nav>
      <ul className="grid gap-3">{visible.map((item) => <li key={item.id} className={`flex items-start gap-3 rounded-lg border p-4 ${!item.leida ? "border-green/40 bg-green-soft/30" : "border-line bg-[#fbfaf7]"}`}><span className="text-xl">{item.icon}</span><article className="flex-1"><h3 className="text-sm text-coffee">{item.titulo}</h3><p className="mt-1 text-sm text-muted">{item.texto}</p><time className="mt-1 block text-xs text-muted">{item.fecha}</time></article>{!item.leida && <button type="button" onClick={() => markRead(item)} aria-label="Marcar como leída" className="grid h-8 w-8 place-items-center rounded-full border border-line text-green hover:bg-green-soft">✓</button>}</li>)}</ul>
    </Panel>
  </section>;
}
