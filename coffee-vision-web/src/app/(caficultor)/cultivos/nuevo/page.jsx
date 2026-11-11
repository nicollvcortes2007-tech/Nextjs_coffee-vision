"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cultivosApi } from "@/features/cultivos";
import { PageHeader } from "@/components/ui/PanelUI";

export default function NuevoCultivoPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function save(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    const data = Object.fromEntries(new FormData(event.currentTarget));

    try {
      await cultivosApi.create({ ...data, area_hectareas: Number(data.area_hectareas) });
      router.push("/cultivos");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="page-wrap">
      <PageHeader eyebrow="PRODUCCIÓN" title="Añadir un lote" description="Registra la información básica del cultivo." />
      <form className="surface form-card" onSubmit={save}>
        <label>Nombre del lote<input name="nombre" required placeholder="Ej. El Mirador" /></label>
        <label>Variedad<input name="variedad" required placeholder="Ej. Castillo" /></label>
        <label>Área en hectáreas<input name="area_hectareas" required type="number" min="0.01" step="0.01" /></label>
        <label>Etapa del cultivo<select name="estado"><option value="crecimiento">Crecimiento</option><option value="floracion">Floración</option><option value="produccion">Producción</option><option value="renovacion">Renovación</option></select></label>
        {error && <p className="form-error" role="alert">{error}</p>}
        <footer className="form-actions"><Link className="button button-outline" href="/cultivos">Cancelar</Link><button className="button button-primary" disabled={saving}>{saving ? "Guardando…" : "Guardar lote"}</button></footer>
      </form>
    </section>
  );
}
