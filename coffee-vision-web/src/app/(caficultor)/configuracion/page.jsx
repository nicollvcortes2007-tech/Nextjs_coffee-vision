"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Topbar from "@/components/dashboard/Topbar";
import Panel from "@/components/dashboard/Panel";
import StatusBadge from "@/components/dashboard/StatusBadge";

const tabs = [
  { id: "basica", label: "Información básica", icon: "fa-id-card" },
  { id: "aprobaciones", label: "Aprobación de registros", icon: "fa-clipboard-check" },
  { id: "cuentas", label: "Gestión de cuentas", icon: "fa-users-gear" },
  { id: "practicas", label: "Buenas prácticas", icon: "fa-seedling" },
  { id: "recursos", label: "Biblioteca de recursos", icon: "fa-book-open" },
];

const STORAGE_KEY = "coffee-vision-farmer-settings-v1";
const defaultBasic = {
  finca: "Finca El Paraíso",
  responsable: "José Caesar Martinez Gutierrez",
  municipio: "Popayán, Cauca",
  correo: "josemartinez@gmail.com",
  telefono: "321 456 7890",
};
const defaultApprovals = { labor: true, observations: false, notifications: true };
const defaultPractices = { pestAlerts: true, fertilization: true, sustainability: true };

function readSettings() {
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function SettingToggle({ checked, onChange, title, description }) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-line bg-[#fbfaf7] p-4">
      <input type="checkbox" checked={checked} onChange={onChange} className="mt-1 h-4 w-4 shrink-0 accent-[#769f1a]" />
      <span><strong className="block text-coffee">{title}</strong><small className="mt-1 block leading-relaxed text-muted">{description}</small></span>
    </label>
  );
}

function FormField({ label, name, value, onChange, type = "text" }) {
  return (
    <label className="grid gap-1.5 text-sm font-semibold text-coffee">
      {label}
      <input name={name} type={type} value={value} onChange={(event) => onChange(name, event.target.value)} className="min-h-[44px] rounded-lg border border-line bg-white px-3 font-normal text-ink focus:border-green focus:outline-none focus:ring-2 focus:ring-green/15" />
    </label>
  );
}

function SaveNotice() {
  return <p className="text-sm font-semibold text-green-deep" role="status"><i className="fa-solid fa-circle-check mr-2" aria-hidden="true" />Preferencias guardadas en este navegador.</p>;
}

export default function ConfiguracionCaficultorPage() {
  const [tab, setTab] = useState("basica");
  const [basic, setBasic] = useState(defaultBasic);
  const [approvals, setApprovals] = useState(defaultApprovals);
  const [practices, setPractices] = useState(defaultPractices);
  const [saved, setSaved] = useState("");

  useEffect(() => {
    const stored = readSettings();
    setBasic({ ...defaultBasic, ...stored.basic });
    setApprovals({ ...defaultApprovals, ...stored.approvals });
    setPractices({ ...defaultPractices, ...stored.practices });
  }, []);

  function save(section, value) {
    const settings = readSettings();
    const updated = { ...settings, [section]: value };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setSaved(section);
  }

  function updateBasic(name, value) {
    setBasic((current) => ({ ...current, [name]: value }));
    setSaved("");
  }

  function updateOption(setter, key, checked) {
    setter((current) => ({ ...current, [key]: checked }));
    setSaved("");
  }

  function saveForm(event, section, value) {
    event.preventDefault();
    save(section, value);
  }

  return (
    <section className="grid gap-6">
      <Topbar eyebrow="Ajustes de la cuenta" title="Configuración" notifTo="/notificaciones" profileTo="/perfil" avatar="/coffee-tech/image.png" name="Caficultor" role="Finca El Paraíso" />

      <nav className="flex flex-wrap gap-2 rounded-lg border border-line bg-white/95 p-2 shadow-panel" aria-label="Módulos de configuración">
        {tabs.map((item) => (
          <button key={item.id} type="button" onClick={() => { setTab(item.id); setSaved(""); }} aria-pressed={tab === item.id} className={`inline-flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold transition-colors sm:px-4 ${tab === item.id ? "bg-coffee text-white" : "text-muted hover:bg-green-soft hover:text-coffee"}`}>
            <i className={`fa-solid ${item.icon}`} aria-hidden="true" />{item.label}
          </button>
        ))}
      </nav>

      {tab === "basica" && (
        <Panel eyebrow="Tu finca" title="Información básica" >
          <p className="mb-5 text-sm text-muted">Mantén actualizados los datos principales que identifican tu finca y sirven para organizar el trabajo.</p>
          <form onSubmit={(event) => saveForm(event, "basic", basic)} className="grid gap-4 sm:grid-cols-2">
            <FormField label="Nombre de la finca" name="finca" value={basic.finca} onChange={updateBasic} />
            <FormField label="Persona responsable" name="responsable" value={basic.responsable} onChange={updateBasic} />
            <FormField label="Municipio y departamento" name="municipio" value={basic.municipio} onChange={updateBasic} />
            <FormField label="Correo de contacto" name="correo" type="email" value={basic.correo} onChange={updateBasic} />
            <FormField label="Teléfono de contacto" name="telefono" type="tel" value={basic.telefono} onChange={updateBasic} />
            <footer className="flex flex-wrap items-center gap-3 sm:col-span-2">
              <button className="min-h-[44px] rounded-lg bg-green px-5 font-bold text-white transition-colors hover:bg-green-deep">Guardar información</button>
              {saved === "basic" && <SaveNotice />}
            </footer>
          </form>
        </Panel>
      )}

      {tab === "aprobaciones" && (
        <Panel eyebrow="Control de labores" title="Aprobación de registros">
          <p className="mb-5 text-sm text-muted">Define cómo quieres revisar las actividades que registra el equipo de tu finca.</p>
          <form onSubmit={(event) => saveForm(event, "approvals", approvals)} className="grid gap-3">
            <SettingToggle checked={approvals.labor} onChange={(event) => updateOption(setApprovals, "labor", event.target.checked)} title="Revisar labores antes de aprobarlas" description="Las actividades del equipo quedan pendientes de tu revisión antes de marcarlas como aprobadas." />
            <SettingToggle checked={approvals.observations} onChange={(event) => updateOption(setApprovals, "observations", event.target.checked)} title="Solicitar observaciones para cada labor" description="Pide una nota de campo para dejar contexto sobre el trabajo realizado." />
            <SettingToggle checked={approvals.notifications} onChange={(event) => updateOption(setApprovals, "notifications", event.target.checked)} title="Avisarme cuando haya un registro por revisar" description="Mantén activas las notificaciones de nuevas labores enviadas por tus empleados." />
            <footer className="mt-2 flex flex-wrap items-center gap-3"><button className="min-h-[44px] rounded-lg bg-green px-5 font-bold text-white transition-colors hover:bg-green-deep">Guardar preferencias</button>{saved === "approvals" && <SaveNotice />}</footer>
          </form>
        </Panel>
      )}

      {tab === "cuentas" && (
        <section className="grid gap-4 lg:grid-cols-2">
          <Panel eyebrow="Acceso personal" title="Tu cuenta">
            <p className="mb-4 text-sm leading-relaxed text-muted">Consulta y actualiza tus datos personales desde el perfil de caficultor.</p>
            <ul className="grid gap-3 text-sm">
              <li className="flex items-center justify-between gap-3 rounded-lg border border-line bg-[#fbfaf7] p-3"><span className="text-muted">Rol</span><StatusBadge>Caficultor</StatusBadge></li>
              <li className="flex items-center justify-between gap-3 rounded-lg border border-line bg-[#fbfaf7] p-3"><span className="text-muted">Finca</span><strong className="text-coffee">{basic.finca}</strong></li>
            </ul>
            <Link href="/perfil" className="mt-4 inline-flex min-h-10 items-center gap-2 font-bold text-green hover:text-green-deep"><i className="fa-solid fa-user-pen" aria-hidden="true" /> Ir a mi perfil</Link>
          </Panel>
          <Panel eyebrow="Equipo de la finca" title="Accesos de empleados">
            <p className="mb-4 text-sm leading-relaxed text-muted">Invita colaboradores y consulta las personas vinculadas a tu espacio de trabajo.</p>
            <section className="grid gap-3 sm:grid-cols-2">
              <Link href="/empleados" className="flex min-h-24 items-center gap-3 rounded-lg border border-line bg-[#fbfaf7] p-4 transition-colors hover:border-green"><i className="fa-solid fa-users text-xl text-green" aria-hidden="true" /><span><strong className="block text-coffee">Mi equipo</strong><small className="text-muted">Ver integrantes y estados</small></span></Link>
              <Link href="/empleados/nuevo" className="flex min-h-24 items-center gap-3 rounded-lg border border-line bg-[#fbfaf7] p-4 transition-colors hover:border-green"><i className="fa-solid fa-user-plus text-xl text-green" aria-hidden="true" /><span><strong className="block text-coffee">Invitar empleado</strong><small className="text-muted">Crear un nuevo acceso</small></span></Link>
            </section>
          </Panel>
        </section>
      )}

      {tab === "practicas" && (
        <Panel eyebrow="Manejo del cultivo" title="Buenas prácticas">
          <p className="mb-5 text-sm text-muted">Elige los avisos y recordatorios que quieres recibir para acompañar el cuidado de tu cafetal.</p>
          <form onSubmit={(event) => saveForm(event, "practices", practices)} className="grid gap-3">
            <SettingToggle checked={practices.pestAlerts} onChange={(event) => updateOption(setPractices, "pestAlerts", event.target.checked)} title="Monitoreo preventivo de plagas" description="Recibir recordatorios para revisar broca, roya y otras afectaciones del cultivo." />
            <SettingToggle checked={practices.fertilization} onChange={(event) => updateOption(setPractices, "fertilization", event.target.checked)} title="Recomendaciones de nutrición" description="Mostrar avisos para planear fertilización según las etapas del cultivo." />
            <SettingToggle checked={practices.sustainability} onChange={(event) => updateOption(setPractices, "sustainability", event.target.checked)} title="Producción responsable" description="Recibir consejos sobre conservación de agua, suelo y biodiversidad en la finca." />
            <footer className="mt-2 flex flex-wrap items-center gap-3"><button className="min-h-[44px] rounded-lg bg-green px-5 font-bold text-white transition-colors hover:bg-green-deep">Guardar preferencias</button>{saved === "practices" && <SaveNotice />}</footer>
          </form>
        </Panel>
      )}

      {tab === "recursos" && (
        <Panel eyebrow="Centro de aprendizaje" title="Biblioteca de recursos" action={<Link href="/contenidos" className="text-sm font-bold text-green hover:text-green-deep">Ver todas las guías <span aria-hidden="true">→</span></Link>}>
          <p className="mb-5 text-sm text-muted">Accede rápidamente a materiales que ayudan a tomar decisiones en cada etapa del cultivo.</p>
          <section className="grid gap-3 sm:grid-cols-2">
            {[
              { icon: "fa-seedling", title: "Ciclo del cultivo", detail: "Germinación, desarrollo, floración y maduración." },
              { icon: "fa-bug", title: "Plagas y enfermedades", detail: "Prevención y monitoreo de broca, roya y otras afectaciones." },
              { icon: "fa-droplet", title: "Nutrición y suelo", detail: "Buenas prácticas para mantener un cafetal sano." },
              { icon: "fa-mug-saucer", title: "Cosecha y poscosecha", detail: "Recolección y manejo para proteger la calidad del grano." },
            ].map((resource) => (
              <Link key={resource.title} href="/contenidos" className="flex items-start gap-3 rounded-lg border border-line bg-[#fbfaf7] p-4 transition-colors hover:border-green">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-green-soft text-green"><i className={`fa-solid ${resource.icon}`} aria-hidden="true" /></span>
                <span><strong className="block text-coffee">{resource.title}</strong><small className="mt-1 block leading-relaxed text-muted">{resource.detail}</small><span className="mt-2 inline-block text-sm font-bold text-green">Explorar guías →</span></span>
              </Link>
            ))}
          </section>
        </Panel>
      )}

      <p className="text-xs text-muted">Las preferencias de este módulo se guardan localmente en este navegador.</p>
    </section>
  );
}