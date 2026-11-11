"use client";

import Link from "next/link";
import { useState } from "react";
import { empleadosApi } from "@/features/empleados";
import { PageHeader } from "@/components/ui/PanelUI";

export default function NuevoEmpleadoPage() {
  const [error, setError] = useState("");
  const [invitation, setInvitation] = useState(null);
  const [saving, setSaving] = useState(false);

  async function invite(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    const form = Object.fromEntries(new FormData(event.currentTarget));

    try {
      const result = await empleadosApi.invite(form);
      setInvitation(result.codigo ?? result.codigo_invitacion ?? "Invitación creada");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="page-wrap">
      <PageHeader eyebrow="EQUIPO DE FINCA" title="Invitar empleado" description="Crea una invitación vinculada solo a tu finca." />
      <form className="surface form-card" onSubmit={invite}>
        <label>Nombre del empleado<input name="nombre" required placeholder="Nombre completo" /></label>
        <label>Correo electrónico<input name="email" required type="email" placeholder="persona@correo.com" /></label>
        <label>Vigencia de la invitación<select name="vigencia_dias"><option value="1">24 horas</option><option value="7">7 días</option><option value="30">30 días</option></select></label>
        {error && <p className="form-error" role="alert">{error}</p>}
        {invitation && <output className="invitation-code">Código: <strong>{invitation}</strong><small>Compártelo con la persona invitada.</small></output>}
        <footer className="form-actions"><Link className="button button-outline" href="/empleados">Volver al equipo</Link><button className="button button-primary" disabled={saving}>{saving ? "Creando…" : "Crear invitación"}</button></footer>
      </form>
    </section>
  );
}
