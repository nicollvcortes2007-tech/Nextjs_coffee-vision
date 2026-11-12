"use client";

import { useState } from "react";
import Topbar from "@/components/dashboard/Topbar";
import Panel from "@/components/dashboard/Panel";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { RequestState } from "@/components/ui/PanelUI";
import { plagasAdminApi } from "@/features/admin";
import { useRemoteData } from "@/hooks/useRemoteData";

const categories = [{ value: "plaga", label: "Plaga (Insectos/Artrópodos)" }, { value: "enfermedad", label: "Enfermedad (Hongos/Bacterias)" }, { value: "deficiencia", label: "Deficiencia Nutricional" }];
const badgeTypes = { plaga: "warning", enfermedad: "danger", deficiencia: "ok" };

export default function GestionPlagasPage() {
  const { data, loading, error, refresh } = useRemoteData(plagasAdminApi.list);
  const [form, setForm] = useState({ nombre: "", categoria: "plaga", descripcion: "" });
  const [preview, setPreview] = useState("");
  const [history, setHistory] = useState([]);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const submitted = Array.isArray(data) ? data : data?.items ?? [];
  const records = [...history, ...submitted];

  function onFile(event) {
    const file = event.target.files?.[0];
    if (!file) return setPreview("");
    const reader = new FileReader(); reader.onload = () => setPreview(String(reader.result)); reader.readAsDataURL(file);
  }

  async function submit(event) {
    event.preventDefault(); setSaving(true); setFormError("");
    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    formData.set("nombre", form.nombre); formData.set("categoria", form.categoria); formData.set("descripcion", form.descripcion);
    try {
      const result = await plagasAdminApi.analyze(formData);
      setHistory((current) => [{ id: Date.now(), nombre: form.nombre, categoria: form.categoria, fecha: new Date().toLocaleDateString("es-CO"), estado: result.estado ?? "En revisión", diagnostico: result.diagnostico ?? result.resultado }, ...current]);
      setForm({ nombre: "", categoria: "plaga", descripcion: "" }); setPreview(""); formElement.reset(); refresh();
    } catch (requestError) { setFormError(requestError.message); }
    finally { setSaving(false); }
  }

  return <section className="grid gap-6">
    <Topbar eyebrow="Entrenamiento del modelo" title="Gestión de plagas e IA" notifTo="/admin/notificaciones" profileTo="/admin/perfil" avatar="/coffee-tech/persona.jpg" name="Administrador" role="Gestión Central"/>
    <div className="flex items-center gap-2 self-start rounded-full bg-green-soft px-4 py-1.5 text-sm font-bold text-green-deep"><span className="h-2 w-2 rounded-full bg-green"/>Servidor IA Activo</div>
    <section className="grid items-start gap-4 lg:grid-cols-2">
      <Panel eyebrow="ACTUALIZAR BASE DE DATOS" title="Muestras para el entrenamiento">
        <p className="mb-4 text-sm text-muted">Agrega información e imágenes para mejorar la detección de plagas y enfermedades.</p>
        <form onSubmit={submit} className="grid gap-4">
          <label className="grid gap-1.5 text-sm font-semibold text-coffee">Nombre Técnico / Científico<input value={form.nombre} onChange={(event) => setForm({ ...form, nombre: event.target.value })} name="nombre" required placeholder="Ej: Hemileia vastatrix (Roya)" className="min-h-[44px] rounded-lg border border-line px-3 font-normal focus:border-green focus:outline-none"/></label>
          <label className="grid gap-1.5 text-sm font-semibold text-coffee">Categoría de riesgo<select value={form.categoria} onChange={(event) => setForm({ ...form, categoria: event.target.value })} name="categoria" className="min-h-[44px] rounded-lg border border-line px-3 font-normal focus:border-green focus:outline-none">{categories.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label>
          <label className="grid gap-1.5 text-sm font-semibold text-coffee">Descripción detallada para IA<textarea value={form.descripcion} onChange={(event) => setForm({ ...form, descripcion: event.target.value })} name="descripcion" required rows={3} placeholder="Describe patrones visuales, coloración y síntomas clave para el modelo…" className="rounded-lg border border-line px-3 py-2 font-normal focus:border-green focus:outline-none"/></label>
          <label className="grid cursor-pointer place-items-center gap-2 rounded-lg border-2 border-dashed border-green/40 bg-green-soft p-5 text-center text-coffee"><span className="text-2xl">📷</span><strong>Muestras visuales IA</strong><small className="text-muted">Suelta una imagen aquí o haz clic para examinar</small><input type="file" name="imagen" accept="image/*" required onChange={onFile} className="max-w-full"/></label>
          {preview && <figure><img src={preview} alt="Vista previa de la muestra" className="mx-auto max-h-40 rounded-lg"/><figcaption className="mt-1 text-center text-xs text-muted">Previsualización de la muestra técnica</figcaption></figure>}
          {formError && <p className="text-sm text-danger" role="alert">{formError}</p>}
          <button type="submit" disabled={saving} className="min-h-[44px] rounded-lg bg-green font-bold text-white hover:bg-green-deep disabled:opacity-60">{saving ? "Enviando muestra…" : "Actualizar modelo de IA"}</button>
        </form>
      </Panel>
      <Panel eyebrow="HISTORIAL" title="Entrenamientos recientes">
        <p className="mb-4 text-sm text-muted">Consulta las muestras enviadas y el estado del análisis.</p>
        <RequestState loading={loading} error={error} onRetry={refresh}/>
        <div className="overflow-x-auto"><table className="w-full border-collapse text-sm"><thead><tr>{["Fecha", "Patógeno", "Tipo", "Estado IA"].map((heading) => <th key={heading} className="border-b border-line px-3 py-2.5 text-left text-[0.82rem] text-coffee">{heading}</th>)}</tr></thead><tbody>{records.length ? records.map((record, index) => <tr key={record.id ?? index}><td className="border-b border-line px-3 py-2.5 text-muted">{record.fecha ?? record.creado_en ?? "—"}</td><td className="border-b border-line px-3 py-2.5 font-semibold text-ink">{record.nombre ?? record.diagnostico ?? record.plaga}</td><td className="border-b border-line px-3 py-2.5"><StatusBadge type={badgeTypes[record.categoria] ?? "ok"}>{(record.categoria ?? "análisis").toUpperCase()}</StatusBadge></td><td className="border-b border-line px-3 py-2.5 text-muted">{record.estado ?? "Recibido"}</td></tr>) : <tr><td colSpan={4} className="py-6 text-center text-muted">Aún no hay registros enviados.</td></tr>}</tbody></table></div>
      </Panel>
    </section>
  </section>;
}
