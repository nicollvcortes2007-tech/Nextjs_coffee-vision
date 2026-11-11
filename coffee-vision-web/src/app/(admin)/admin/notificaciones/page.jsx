"use client";

import { useMemo, useState } from "react";
import Topbar from "@/components/dashboard/Topbar";
import Panel from "@/components/dashboard/Panel";
import { dashboardApi } from "@/features/dashboard";
import { useRemoteData } from "@/hooks/useRemoteData";

const tabs = ["Todas las alertas", "Soporte Técnico", "Servidor e IA", "Seguridad"];
const samples = [
  { id: 1, categoria: "Servidor e IA", titulo: "Servicio de análisis IA disponible", texto: "El módulo de análisis se encuentra activo y procesando solicitudes.", fecha: "Hace 5 minutos", critica: true },
  { id: 2, categoria: "Seguridad", titulo: "Solicitud de verificación de cuenta", texto: "Hay una cuenta pendiente de revisión administrativa.", fecha: "Hace 1 hora" },
  { id: 3, categoria: "Soporte Técnico", titulo: "Copia de seguridad completada", texto: "El respaldo de la información de la plataforma se completó correctamente.", fecha: "Ayer" },
  { id: 4, categoria: "Servidor e IA", titulo: "Actualización de guías disponible", texto: "Se publicaron nuevos recursos para las fincas cafeteras.", fecha: "Hace 2 días" },
];

export default function AdminNotificationsPage() {
  const { data } = useRemoteData(dashboardApi.admin);
  const [tab, setTab] = useState(tabs[0]);
  const [read, setRead] = useState([]);
  const source = data?.notificaciones?.length ? data.notificaciones : samples;
  const notifications = useMemo(() => source.map((item, index) => ({ ...item, id: item.id ?? index, fecha: item.fecha ?? item.ultimo_reporte ?? "Reciente", texto: item.texto ?? item.detalle ?? item.mensaje ?? "Requiere revisión desde el panel de administración.", leida: item.leida || read.includes(item.id) })), [source, read]);
  const filtered = notifications.filter((item) => tab === tabs[0] || item.categoria === tab);

  return <section className="grid gap-6">
    <Topbar eyebrow="Panel de administración" title="Notificaciones del sistema" notifTo="/admin/notificaciones" profileTo="/admin/perfil" avatar="/coffee-tech/persona.jpg" name="Administrador" role="admin@coffeetech.com" />
    <Panel title="Monitoreo global de incidencias, reportes de usuarios y estado de los módulos de IA">
      <nav className="mb-4 flex flex-wrap gap-2 border-b border-line pb-3">{tabs.map((item) => <button key={item} type="button" onClick={() => setTab(item)} className={`rounded-full px-4 py-1.5 text-sm font-bold ${tab === item ? "bg-coffee text-white" : "bg-[#fbfaf7] text-muted"}`}>{item}</button>)}</nav>
      <ul className="grid gap-3">{filtered.map((item) => <li key={item.id} className={`flex items-start gap-3 rounded-lg border p-4 ${item.critica ? "border-danger/30 bg-[#fff0ee]" : !item.leida ? "border-green/40 bg-green-soft/30" : "border-line bg-[#fbfaf7]"}`}><i className={`fa-solid ${item.critica ? "fa-triangle-exclamation text-danger" : "fa-circle-info text-green"} mt-1`} aria-hidden="true"/><article className="flex-1"><h3 className="text-sm text-coffee">{item.titulo}</h3><p className="mt-1 text-sm text-muted">{item.texto}</p><time className="mt-1 block text-xs text-muted">{item.fecha}</time></article>{!item.leida && <button type="button" onClick={() => setRead((current) => [...current, item.id])} aria-label="Marcar como leída" className="grid h-8 w-8 place-items-center rounded-full border border-line text-green hover:bg-green-soft">✓</button>}</li>)}</ul>
    </Panel>
  </section>;
}
