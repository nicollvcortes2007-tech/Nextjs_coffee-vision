"use client";

import { useMemo, useState } from "react";
import MetricCard from "@/components/dashboard/MetricCard";
import Panel from "@/components/dashboard/Panel";
import AdminAccountControls from "@/components/admin/AdminAccountControls";
import { PageHeader, RequestState } from "@/components/ui/PanelUI";
import { contenidosAdminApi } from "@/features/admin";
import { useRemoteData } from "@/hooks/useRemoteData";

const CATEGORIES = ["Ciclo de vida", "Plagas", "Nutrición", "Buenas prácticas", "Cosecha"];

function contentRows(data) {
  return Array.isArray(data) ? data : data?.items ?? data?.results ?? data?.data ?? [];
}

function dateLabel(value) {
  if (!value) return "—";
  const date = new Date(/^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T00:00:00` : value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString("es-CO", { day: "numeric", month: "short", year: "numeric" });
}

export default function ContenidosPage() {
  const { data, loading, error, refresh } = useRemoteData(contenidosAdminApi.list);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [query, setQuery] = useState("");
  const records = contentRows(data);
  const guides = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return records.filter((guide) => `${guide.titulo ?? guide.nombre ?? ""} ${guide.categoria ?? ""} ${guide.contenido ?? guide.descripcion ?? ""}`.toLowerCase().includes(normalized));
  }, [records, query]);
  const publishedCount = records.filter((guide) => /publicad|activo/i.test(guide.estado ?? "Publicado")).length;
  const categoryCount = new Set(records.map((guide) => guide.categoria).filter(Boolean)).size;

  async function createContent(event) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = Object.fromEntries(new FormData(formElement));
    setSaving(true);
    setFormError("");
    try {
      await contenidosAdminApi.create({ ...form, estado: "Publicado" });
      formElement.reset();
      refresh();
    } catch (requestError) {
      setFormError(requestError.message);
    } finally {
      setSaving(false);
    }
  }

  async function removeContent(guide) {
    if (!window.confirm(`¿Eliminar la guía “${guide.titulo ?? guide.nombre}”?`)) return;
    try {
      await contenidosAdminApi.remove(guide.id);
      refresh();
    } catch (requestError) {
      window.alert(requestError.message);
    }
  }

  return (
    <section className="page-wrap admin-content-page">
      <PageHeader eyebrow="BIBLIOTECA" title="Contenidos" description="Publica y organiza las guías disponibles para las fincas." action={<AdminAccountControls />} />

      <section className="grid gap-3 sm:grid-cols-3" aria-label="Resumen de contenidos">
        <MetricCard icon="fa-solid fa-book-open" label="Guías registradas" value={loading ? "…" : records.length} hint="Material de aprendizaje" />
        <MetricCard icon="fa-solid fa-circle-check" label="Publicadas" value={loading ? "…" : publishedCount} hint="Visibles para las fincas" />
        <MetricCard icon="fa-solid fa-layer-group" label="Categorías" value={loading ? "…" : categoryCount} hint="Temas disponibles" />
      </section>

      <section className="admin-content-layout">
        <Panel eyebrow="BIBLIOTECA DE APRENDIZAJE" title="Guías publicadas" className="admin-content-list" action={<button className="button button-outline" onClick={refresh}>↻ Actualizar</button>}>
          <label className="admin-content-search"><i className="fa-solid fa-magnifying-glass" aria-hidden="true" /><span className="sr-only">Buscar guías</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por título o categoría" /></label>
          <RequestState loading={loading} error={error} onRetry={refresh} />
          {!loading && !error && <div className="table-scroll"><table className="data-table admin-content-table">
            <thead><tr><th>Contenido</th><th>Categoría</th><th>Publicación</th><th>Última edición</th><th>Acción</th></tr></thead>
            <tbody>{guides.length ? guides.map((guide, index) => <tr key={guide.id ?? guide.titulo ?? index}>
              <td><strong className="block text-coffee">{guide.titulo ?? guide.nombre}</strong><small className="admin-content-summary">{guide.contenido ?? guide.descripcion ?? guide.resumen ?? "Guía práctica para el manejo del cultivo."}</small></td>
              <td><span className="admin-content-category">{guide.categoria ?? "General"}</span></td>
              <td><span className="admin-content-published"><i aria-hidden="true" />{guide.estado ?? "Publicado"}</span></td>
              <td>{dateLabel(guide.actualizado_en ?? guide.updated_at ?? guide.creado_en)}</td>
              <td><button type="button" className="admin-content-delete" onClick={() => removeContent(guide)} aria-label={`Eliminar ${guide.titulo ?? guide.nombre}`}>Eliminar</button></td>
            </tr>) : <tr><td colSpan={5} className="empty-cell">{records.length ? "No hay guías que coincidan con la búsqueda." : "Todavía no hay guías. Publica la primera desde el formulario."}</td></tr>}</tbody>
          </table></div>}
        </Panel>

        <Panel eyebrow="NUEVO MATERIAL" title="Publicar una guía" className="admin-content-form-panel">
          <p className="admin-content-form-intro">Añade una guía para que caficultores y empleados puedan consultarla en la biblioteca.</p>
          <form className="admin-content-form" onSubmit={createContent}>
            <label>Título<input name="titulo" required placeholder="Ej. Manejo de la roya" /></label>
            <label>Categoría<select name="categoria" required defaultValue=""><option value="" disabled>Selecciona una categoría</option>{CATEGORIES.map((category) => <option key={category} value={category}>{category}</option>)}</select></label>
            <label>Contenido o enlace<textarea name="contenido" required rows="5" placeholder="Escribe una descripción o pega el enlace del material" /></label>
            {formError && <p className="form-error" role="alert">{formError}</p>}
            <button className="button button-primary" disabled={saving}><i className="fa-solid fa-paper-plane" aria-hidden="true" />{saving ? "Publicando…" : "Publicar guía"}</button>
          </form>
        </Panel>
      </section>
    </section>
  );
}
