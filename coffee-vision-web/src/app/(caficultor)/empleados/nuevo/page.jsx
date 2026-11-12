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
    <section className="page-wrap invite-page">
      <PageHeader eyebrow="EQUIPO DE FINCA" title="Invitar empleado" description="Crea una invitación vinculada solo a tu finca." />
      <section className="invite-layout">
        <form className="surface form-card invite-form" onSubmit={invite}>
          <header className="invite-form-heading"><span className="grid h-11 w-11 place-items-center rounded-xl bg-green-soft text-lg text-green"><i className="fa-solid fa-user-plus" aria-hidden="true" /></span><div><h2 className="m-0 text-lg font-bold text-coffee">Datos del empleado</h2><p className="mt-1 text-sm text-muted">Ingresa los datos de la persona que se unirá a la finca.</p></div></header>
          <label>Nombre del empleado<input name="nombre" required placeholder="Nombre completo" /></label>
          <label>Correo electrónico<input name="email" required type="email" placeholder="persona@correo.com" /></label>
          <label className="invite-validity">Vigencia de la invitación<select name="vigencia_dias"><option value="1">24 horas</option><option value="7">7 días</option><option value="30">30 días</option></select></label>
          {error && <p className="form-error" role="alert">{error}</p>}
          {invitation && <output className="invitation-code">Código: <strong>{invitation}</strong><small>Compártelo con la persona invitada.</small></output>}
          <footer className="form-actions"><Link className="button button-outline" href="/empleados">Volver al equipo</Link><button className="button button-primary" disabled={saving}>{saving ? "Creando…" : "Crear invitación"}</button></footer>
        </form>

        <aside className="invite-help-card">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/15 text-xl text-gold"><i className="fa-solid fa-paper-plane" aria-hidden="true" /></div>
          <p className="eyebrow !mb-1 !text-[#d5e4c4]">VINCULACIÓN SEGURA</p>
          <h2 className="m-0 text-2xl font-bold text-white">¿Qué pasa después?</h2>
          <p className="m-0 text-sm leading-6 text-white/80">La invitación conecta al empleado con tu finca y le permite acceder a las tareas asignadas.</p>
          <ol className="invite-steps">
            <li><span>1</span><p><strong>Completa los datos</strong><small>Usa el correo que la persona revisa.</small></p></li>
            <li><span>2</span><p><strong>Comparte el código</strong><small>Se mostrará al crear la invitación.</small></p></li>
            <li><span>3</span><p><strong>Activa su acceso</strong><small>El empleado ingresa antes del vencimiento.</small></p></li>
          </ol>
          <div className="invite-expiry-note"><i className="fa-regular fa-clock" aria-hidden="true" /><p>El código vence según el plazo que elijas en el formulario.</p></div>
        </aside>
      </section>
    </section>
  );
}
