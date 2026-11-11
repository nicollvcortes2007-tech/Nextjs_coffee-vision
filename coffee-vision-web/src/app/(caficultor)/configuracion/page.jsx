"use client";

import { useState } from "react";
import Topbar from "@/components/dashboard/Topbar";

const tabs = ["Información básica", "Aprobación de registros", "Gestión de cuentas", "Buenas prácticas", "Biblioteca de recursos"];
const accountFields = [["Nombre", "José Caesar"], ["Apellido", "Martinez Gutierrez"], ["Ciudad", "Popayán"], ["Documento", "CC. ••••••••"], ["Teléfono", "•••• •••• ••"], ["Estado", "Activo"], ["Correo", "usuario@coffeetech.com"], ["Contraseña", "•••••••••"]];

export default function ConfiguracionCaficultorPage() {
  const [tab, setTab] = useState(tabs[0]);
  return <section className="grid gap-6">
    <Topbar eyebrow="Ajustes de la cuenta" title="Configuración" notifTo="/notificaciones" profileTo="/perfil" avatar="/coffee-tech/image.png" name="Caficultor" role="Finca El Paraíso"/>
    <nav className="flex flex-wrap gap-2 rounded-lg border border-line bg-white/95 p-2 shadow-panel">{tabs.map((item) => <button key={item} type="button" onClick={() => setTab(item)} className={`rounded-lg px-4 py-2 text-sm font-bold ${tab === item ? "bg-coffee text-white" : "text-muted hover:bg-green-soft hover:text-coffee"}`}>{item}</button>)}</nav>
    <article className="rounded-lg border border-line bg-white/95 p-6 shadow-panel">{tab === tabs[0] ? <><header className="mb-4 flex items-center justify-between"><h2>Información Básica</h2><button type="button" className="rounded-lg border border-line px-4 py-1.5 text-sm font-bold text-coffee hover:border-green">Editar</button></header><section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{accountFields.map(([label, value]) => <p key={label} className="text-sm"><strong className="block text-coffee">{label}</strong><span className="text-muted">{value}</span></p>)}</section></> : <section className="grid min-h-[160px] place-items-center text-center text-muted"><div><i className="fa-solid fa-circle-info mb-2 text-2xl text-green"/><p>Este módulo de “{tab}” estará disponible próximamente.</p></div></section>}</article>
  </section>;
}
