"use client";

import { useState } from "react";
import Topbar from "@/components/dashboard/Topbar";
import Panel from "@/components/dashboard/Panel";
import { RequestState } from "@/components/ui/PanelUI";
import { authApi } from "@/features/auth";
import { useRemoteData } from "@/hooks/useRemoteData";

export default function PerfilCaficultorPage() {
  const { data, loading, error, refresh } = useRemoteData(authApi.profile);
  const [message, setMessage] = useState("");
  const [saveError, setSaveError] = useState("");

  async function save(event) {
    event.preventDefault(); setMessage(""); setSaveError("");
    try { await authApi.updateProfile(Object.fromEntries(new FormData(event.currentTarget))); setMessage("Cambios guardados correctamente."); refresh(); }
    catch (requestError) { setSaveError(requestError.message); }
  }

  return <section className="grid gap-6">
    <Topbar eyebrow="Mi cuenta" title="Información de perfil" notifTo="/notificaciones" profileTo="/perfil" avatar="/coffee-tech/image.png" name="Caficultor" role="Finca El Paraíso" />
    <RequestState loading={loading} error={error} onRetry={refresh}/>
    <section className="flex flex-col items-center gap-4 rounded-lg border border-line bg-white/95 p-6 shadow-panel sm:flex-row"><img src="/coffee-tech/caficultor.jpg" alt="Foto de caficultor" className="h-24 w-24 rounded-full border-4 border-green-soft object-cover"/><article><h3 className="text-xl">{data?.nombre ?? "José Caesar Martinez Gutierrez"}</h3><p className="text-muted">Caficultor · Finca {data?.finca ?? "La Mulata"}</p></article></section>
    <Panel title="Datos personales"><form onSubmit={save} className="grid gap-4 sm:grid-cols-2"><label className="grid gap-1.5 text-sm font-semibold text-coffee">Nombre<input name="nombre" defaultValue={data?.nombre ?? "José Caesar"} className="min-h-[44px] rounded-lg border border-line px-3 font-normal text-ink focus:border-green focus:outline-none"/></label><label className="grid gap-1.5 text-sm font-semibold text-coffee">Apellido<input name="apellido" defaultValue={data?.apellido ?? "Martinez Gutierrez"} className="min-h-[44px] rounded-lg border border-line px-3 font-normal text-ink focus:border-green focus:outline-none"/></label><label className="grid gap-1.5 text-sm font-semibold text-coffee">Teléfono<input name="telefono" defaultValue={data?.telefono ?? "3214567890"} className="min-h-[44px] rounded-lg border border-line px-3 font-normal text-ink focus:border-green focus:outline-none"/></label><label className="grid gap-1.5 text-sm font-semibold text-coffee">Municipio<input name="municipio" defaultValue={data?.municipio ?? "Popayán"} className="min-h-[44px] rounded-lg border border-line px-3 font-normal text-ink focus:border-green focus:outline-none"/></label><label className="grid gap-1.5 text-sm font-semibold text-coffee">Correo electrónico<input name="email" type="email" defaultValue={data?.email ?? "josemartinez@gmail.com"} className="min-h-[44px] rounded-lg border border-line px-3 font-normal text-ink focus:border-green focus:outline-none"/></label><footer className="sm:col-span-2">{message && <p className="mb-3 text-sm font-semibold text-green-deep" role="status">{message}</p>}{saveError && <p className="mb-3 text-sm text-danger" role="alert">{saveError}</p>}<button className="min-h-[44px] rounded-lg bg-green px-6 font-bold text-white hover:bg-green-deep">Guardar cambios</button></footer></form></Panel>
    <Panel title="Datos de la finca"><form onSubmit={save} className="grid gap-4 sm:grid-cols-2"><label className="grid gap-1.5 text-sm font-semibold text-coffee">Nombre de la finca<input name="finca" defaultValue={data?.finca ?? "La Mulata"} className="min-h-[44px] rounded-lg border border-line px-3 font-normal text-ink focus:border-green focus:outline-none"/></label><label className="grid gap-1.5 text-sm font-semibold text-coffee">Municipio<input name="municipio" defaultValue={data?.municipio ?? "Popayán"} className="min-h-[44px] rounded-lg border border-line px-3 font-normal text-ink focus:border-green focus:outline-none"/></label><footer className="sm:col-span-2"><button className="min-h-[44px] rounded-lg bg-green px-6 font-bold text-white hover:bg-green-deep">Guardar datos de la finca</button></footer></form></Panel>
  </section>;
}
