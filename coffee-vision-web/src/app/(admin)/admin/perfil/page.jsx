"use client";

import { useState } from "react";
import Topbar from "@/components/dashboard/Topbar";
import { authApi } from "@/features/auth";
import { useRemoteData } from "@/hooks/useRemoteData";

const tabs = ["Información personal", "Seguridad", "Notificaciones", "Actividad reciente"];

function Field({ label, name, type = "text", placeholder, defaultValue }) {
  return <label className="grid gap-1.5 text-sm font-semibold text-coffee">{label}<input name={name} type={type} placeholder={placeholder} defaultValue={defaultValue} className="min-h-[44px] rounded-lg border border-line px-3 font-normal text-ink focus:border-green focus:outline-none" /></label>;
}

export default function AdminProfilePage() {
  const { data } = useRemoteData(authApi.profile);
  const [tab, setTab] = useState(tabs[0]);
  const [saved, setSaved] = useState(false);
  async function save(event) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    await authApi.updateProfile(values);
    setSaved(true);
  }

  return <section className="grid gap-6">
    <Topbar eyebrow="Panel de administración" title="Mi perfil" notifTo="/admin/notificaciones" profileTo="/admin/perfil" avatar="/coffee-tech/persona.jpg" name={data?.nombre ?? "Administrador"} role={data?.email ?? "admin@coffeevision.com"} />
    <section className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <article className="grid content-start gap-4 rounded-lg border border-line bg-white/95 p-6 text-center shadow-panel"><img src="/coffee-tech/persona.jpg" alt="Foto de perfil del administrador" className="mx-auto h-20 w-20 rounded-full border-4 border-green-soft object-cover"/><h3>{data?.nombre ?? "Administrador Sistema"}</h3><p className="-mt-2 text-sm font-semibold text-green">Administrador del Sistema</p><ul className="grid gap-2 text-left text-sm text-muted"><li><i className="fa-solid fa-envelope mr-2 text-green"/>{data?.email ?? "admin@coffevision.com"}</li><li><i className="fa-solid fa-phone mr-2 text-green"/>+57 300 123 4567</li><li><i className="fa-solid fa-location-dot mr-2 text-green"/>Popayán, Cauca, Colombia</li></ul><footer className="border-t border-line pt-3 text-xs text-muted"><i className="fa-regular fa-calendar mr-1.5"/>Miembro desde: 15/01/2024</footer></article>
      <article className="rounded-lg border border-line bg-white/95 p-6 shadow-panel"><nav className="mb-5 flex flex-wrap gap-2 border-b border-line pb-3">{tabs.map((item) => <button type="button" key={item} onClick={() => setTab(item)} className={`rounded-full px-4 py-1.5 text-sm font-bold ${tab === item ? "bg-coffee text-white" : "bg-[#fbfaf7] text-muted"}`}>{item}</button>)}</nav>
        {tab === tabs[0] && <form onSubmit={save} className="grid gap-4 sm:grid-cols-2"><Field name="nombre" label="Nombres" defaultValue={data?.nombre ?? "Administrador"}/><Field name="apellido" label="Apellidos" defaultValue="Sistema"/><Field name="email" label="Correo electrónico" type="email" defaultValue={data?.email ?? "admin@coffeevision.com"}/><Field name="telefono" label="Teléfono" type="tel" defaultValue="+57 300 123 4567"/><Field name="direccion" label="Dirección" defaultValue="Calle 5 #12-45, Centro"/><Field name="municipio" label="Municipio" defaultValue="Popayán"/>{saved && <p className="text-sm font-semibold text-green-deep sm:col-span-2" role="status">Cambios guardados.</p>}<footer className="flex justify-end gap-3 sm:col-span-2"><button type="reset" className="rounded-lg border border-line px-5 py-2.5 font-bold text-muted">Cancelar</button><button className="rounded-lg bg-green px-5 py-2.5 font-bold text-white hover:bg-green-deep">Guardar cambios</button></footer></form>}
        {tab === tabs[1] && <form onSubmit={(event) => event.preventDefault()} className="grid gap-4 sm:grid-cols-2"><Field name="actual" label="Contraseña actual" type="password" placeholder="••••••••"/><Field name="nueva" label="Nueva contraseña" type="password" placeholder="Nueva contraseña"/><Field name="confirmar" label="Confirmar contraseña" type="password" placeholder="Repite la nueva contraseña"/><div className="sm:col-span-2"><button className="rounded-lg bg-green px-5 py-2.5 font-bold text-white">Actualizar contraseña</button></div></form>}
        {tab === tabs[2] && <div className="grid gap-4 sm:grid-cols-2">{["Alertas críticas", "Reportes del sistema", "Actividad de usuarios", "Notificaciones de IA"].map((label) => <label key={label} className="flex items-center gap-3 rounded-lg border border-line bg-[#fbfaf7] p-4 text-sm text-coffee"><input type="checkbox" defaultChecked className="h-4 w-4 accent-[#769f1a]"/>{label}</label>)}</div>}
        {tab === tabs[3] && <div className="text-sm text-muted"><strong className="block text-coffee">Últimos inicios de sesión:</strong><p className="mt-2">• Hoy a las 08:30 a. m. desde Popayán, Cauca</p><p>• Ayer a las 02:15 p. m. desde Popayán, Cauca</p></div>}
      </article>
    </section>
  </section>;
}
