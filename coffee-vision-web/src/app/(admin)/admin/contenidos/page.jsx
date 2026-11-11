"use client";

import { useState } from "react";
import ApiCollection from "@/components/ui/ApiCollection";
import { contenidosAdminApi } from "@/features/admin";

const columns = [
  { key: "titulo", label: "Contenido" },
  { key: "categoria", label: "Categoría" },
  { key: "estado", label: "Publicación" },
  { key: "actualizado_en", label: "Última edición" },
];

export default function ContenidosPage() {
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function createContent(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    const form = Object.fromEntries(new FormData(event.currentTarget));

    try {
      await contenidosAdminApi.create(form);
      window.location.reload();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <ApiCollection eyebrow="BIBLIOTECA" title="Contenidos" description="Publica y organiza las guías disponibles para las fincas." endpoint="/admin/contenidos" columns={columns} empty="No hay contenidos publicados." />
      <form className="surface inline-create" onSubmit={createContent}>
        <h2>Publicar una guía</h2>
        <label>Título<input name="titulo" required placeholder="Nombre de la guía" /></label>
        <label>Categoría<input name="categoria" required placeholder="Ej. Nutrición" /></label>
        <label>Enlace o texto<textarea name="contenido" required rows="3" placeholder="Contenido o URL de la guía" /></label>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="button button-primary" disabled={saving}>{saving ? "Publicando…" : "Publicar guía"}</button>
      </form>
    </>
  );
}
