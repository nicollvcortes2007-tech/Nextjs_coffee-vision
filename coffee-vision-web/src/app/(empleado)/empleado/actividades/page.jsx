"use client";

import { useState } from "react";
import Topbar from "@/components/dashboard/Topbar";
import Panel from "@/components/dashboard/Panel";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { RequestState } from "@/components/ui/PanelUI";
import { actividadesApi } from "@/features/empleados";
import { cultivosApi } from "@/features/cultivos";
import { useRemoteData } from "@/hooks/useRemoteData";

const types = ["Siembra", "Fertilización", "Desyerbe / Limpia", "Control de Plagas (Broca/Roya)", "Poda / Zoqueo", "Recolección (Cosecha)", "Beneficiado (Lavado/Secado)"];
const fallback = [
  { id: "example-1", fecha: "2026-06-10", actividad: "Control de Plagas", estado: "warning", observaciones: "Monitoreo de broca en el lote asignado. Se observa baja incidencia." },
  { id: "example-2", fecha: "2026-06-08", actividad: "Fertilización", estado: "success", observaciones: "Aplicación de abono orgánico en la zona de renovación." },
];

export default function ActividadesEmpleadoPage() {
  const { data, loading, error, refresh } = useRemoteData(actividadesApi.list);
  const { data: cropData } = useRemoteData(cultivosApi.list);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [notice, setNotice] = useState("");
  const rows = Array.isArray(data) ? data : data?.items ?? [];
  const crops = Array.isArray(cropData) ? cropData : cropData?.items ?? [];
  const history = rows.length ? rows : fallback;

  async function save(event) {
    event.preventDefault(); setSaving(true); setSaveError(""); setNotice("");
    const formElement = event.currentTarget;
    const values = Object.fromEntries(new FormData(formElement));
    try {
      await actividadesApi.create({ ...values, tipo: values.actividad, notas: values.observaciones });
      formElement.reset(); setNotice("La labor quedó registrada."); refresh();
    } catch (requestError) { setSaveError(requestError.message); }
    finally { setSaving(false); }
  }

  return <section className="grid gap-6">
    <Topbar eyebrow="Seguimiento digital · Mi jornada" title="Registrar labor" notifTo="/empleado/notificaciones" profileTo="/empleado/perfil" avatar="/coffee-tech/image.png" name="Empleado" role="Equipo de finca"/>
    <Panel title="Registrar nueva actividad">
      <form onSubmit={save} className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-semibold text-coffee">Fecha de la labor<input name="fecha" type="date" required defaultValue={new Date().toISOString().slice(0, 10)} className="min-h-[44px] rounded-lg border border-line px-3 font-normal focus:border-green focus:outline-none"/></label>
        <label className="grid gap-1.5 text-sm font-semibold text-coffee">Tipo de actividad<select name="actividad" required defaultValue="" className="min-h-[44px] rounded-lg border border-line px-3 font-normal focus:border-green focus:outline-none"><option value="" disabled>Selecciona una opción...</option>{types.map((type) => <option key={type} value={type}>{type}</option>)}</select></label>
        {crops.length > 0 && <label className="grid gap-1.5 text-sm font-semibold text-coffee sm:col-span-2">Lote asignado<select name="cultivo_id" defaultValue={crops[0]?.id} className="min-h-[44px] rounded-lg border border-line px-3 font-normal focus:border-green focus:outline-none">{crops.map((crop) => <option key={crop.id} value={crop.id}>{crop.nombre}</option>)}</select></label>}
        <label className="grid gap-1.5 text-sm font-semibold text-coffee sm:col-span-2">Observaciones / Detalles<textarea name="observaciones" rows={3} placeholder="Ej: Se aplicaron 50 g de fertilizante por árbol..." className="rounded-lg border border-line px-3 py-2 font-normal focus:border-green focus:outline-none"/></label>
        {saveError && <p className="text-sm font-semibold text-danger sm:col-span-2" role="alert">{saveError}</p>}{notice && <p className="text-sm font-semibold text-green-deep sm:col-span-2" role="status">{notice}</p>}
        <footer className="sm:col-span-2"><button type="submit" disabled={saving} className="min-h-[44px] rounded-lg bg-green px-6 font-bold text-white hover:bg-green-deep disabled:opacity-60">{saving ? "Guardando…" : "Guardar actividad"}</button></footer>
      </form>
    </Panel>
    <Panel title="Mi historial de labores"><RequestState loading={loading} error={error} onRetry={refresh}/><div className="overflow-x-auto"><table className="w-full border-collapse text-sm"><thead><tr>{["Fecha", "Actividad", "Lote", "Observaciones"].map((heading) => <th key={heading} className="border-b border-line px-3 py-3 text-left text-[0.82rem] text-coffee">{heading}</th>)}</tr></thead><tbody>{history.map((item, index) => <tr key={item.id ?? index}><td className="border-b border-line px-3 py-3 text-muted">{item.fecha}</td><td className="border-b border-line px-3 py-3"><StatusBadge type={item.estado === "warning" ? "warning" : "ok"}>{item.tipo ?? item.actividad}</StatusBadge></td><td className="border-b border-line px-3 py-3 text-muted">{item.cultivo_nombre ?? item.lote ?? "—"}</td><td className="border-b border-line px-3 py-3 text-muted">{item.notas ?? item.observaciones ?? "Sin observaciones."}</td></tr>)}</tbody></table></div></Panel>
  </section>;
}
