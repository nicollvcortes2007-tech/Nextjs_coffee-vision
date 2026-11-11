"use client";

import { useState } from "react";
import Topbar from "@/components/dashboard/Topbar";
import Panel from "@/components/dashboard/Panel";
import { RequestState } from "@/components/ui/PanelUI";
import { authApi } from "@/features/auth";
import { useRemoteData } from "@/hooks/useRemoteData";

export default function PerfilEmpleadoPage() {
  const { data, loading, error, refresh } = useRemoteData(authApi.profile);
  const [message, setMessage] = useState("");
  const [saveError, setSaveError] = useState("");

  async function save(event) {
    event.preventDefault(); setMessage(""); setSaveError("");
    try { await authApi.updateProfile(Object.fromEntries(new FormData(event.currentTarget))); setMessage("Tus datos se guardaron correctamente."); refresh(); }
    catch (requestError) { setSaveError(requestError.message); }
  }

  return <section className="grid gap-6">
    <Topbar eyebrow="Mi cuenta" title="Mi perfil" notifTo="/empleado/notificaciones" profileTo="/empleado/perfil" avatar="/coffee-tech/image.png" name={data?.nombre ?? "Empleado"} role={data?.finca_nombre ?? "Equipo de finca"}/>
    <RequestState loading={loading} error={error} onRetry={refresh}/>
    <section className="flex flex-col items-center gap-4 rounded-lg border border-line bg-white/95 p-6 shadow-panel sm:flex-row"><img src="/coffee-tech/image.png" alt="Foto de perfil del empleado" className="h-24 w-24 rounded-full border-4 border-green-soft object-cover"/><article><h3 className="text-xl">{data?.nombre ?? "Empleado"}</h3><p className="text-muted">Empleado · {data?.finca_nombre ?? "Finca asignada"}</p></article><span className="rounded-full bg-green-soft px-3 py-1 text-xs font-extrabold text-green-deep sm:ml-auto">Cuenta de empleado</span></section>
    {data && <Panel title="Mis datos personales"><form onSubmit={save} className="grid gap-4 sm:grid-cols-2"><label className="grid gap-1.5 text-sm font-semibold text-coffee">Nombre<input name="nombre" required defaultValue={data.nombre ?? ""} className="min-h-[44px] rounded-lg border border-line px-3 font-normal text-ink focus:border-green focus:outline-none"/></label><label className="grid gap-1.5 text-sm font-semibold text-coffee">Correo electrónico<input name="email" type="email" required defaultValue={data.email ?? ""} className="min-h-[44px] rounded-lg border border-line px-3 font-normal text-ink focus:border-green focus:outline-none"/></label><label className="grid gap-1.5 text-sm font-semibold text-coffee">Rol<input value="Empleado" readOnly className="min-h-[44px] rounded-lg border border-line bg-[#fbfaf7] px-3 font-normal text-muted"/></label><label className="grid gap-1.5 text-sm font-semibold text-coffee">Finca vinculada<input value={data.finca_nombre ?? "Finca asignada"} readOnly className="min-h-[44px] rounded-lg border border-line bg-[#fbfaf7] px-3 font-normal text-muted"/></label>{message && <p className="text-sm font-semibold text-green-deep sm:col-span-2" role="status">{message}</p>}{saveError && <p className="text-sm text-danger sm:col-span-2" role="alert">{saveError}</p>}<footer className="sm:col-span-2"><button className="min-h-[44px] rounded-lg bg-green px-6 font-bold text-white hover:bg-green-deep">Guardar cambios</button></footer></form></Panel>}
  </section>;
}
