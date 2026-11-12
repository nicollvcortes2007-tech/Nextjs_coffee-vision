"use client";

import { useMemo, useState } from "react";
import Topbar from "@/components/dashboard/Topbar";
import { contenidosApi } from "@/features/contenidos";
import { useRemoteData } from "@/hooks/useRemoteData";

const CATEGORIES = ["Ciclo de vida", "Plagas", "Nutrición", "Buenas prácticas", "Cosecha"];
const GUIDE_DETAILS = {
  "Germinación y trasplante": "La germinación y el trasplante son las primeras etapas del ciclo productivo del café y constituyen la base para el establecimiento de una plantación sana, uniforme y productiva.",
  "Desarrollo vegetativo": "El desarrollo vegetativo del café comprende el período desde el establecimiento de la planta en el campo hasta el inicio de la producción. Durante esta etapa se forma la estructura que determinará la productividad futura del cultivo.",
  Floración: "Esta guía detalla la fase en la que la planta desarrolla las flores que darán origen a los frutos. Es una de las etapas más importantes del cultivo porque define el potencial de producción de la cosecha.",
  "Formación del grano": "La formación del grano es la etapa que sigue a la floración y fecundación del café. Durante este período el fruto crece, acumula nutrientes y desarrolla las características que determinarán la calidad de la bebida.",
  "Maduración y cosecha": "La maduración y la cosecha constituyen la etapa final del ciclo productivo del café. Una cosecha realizada en el momento adecuado permite maximizar el rendimiento, mejorar la calidad de taza y aumentar la rentabilidad del cultivo.",
  "Manejo integrado de plagas": "Prevención, monitoreo y control responsable de las plagas que afectan el cafetal, con recomendaciones para actuar a tiempo y proteger los frutos.",
  "Nutrición del cultivo": "Buenas prácticas para cuidar el suelo y aportar nutrientes de acuerdo con las necesidades del cafeto y su etapa de desarrollo.",
};

const SAMPLE_GUIDES = Object.entries(GUIDE_DETAILS).map(([titulo, texto], index) => ({
  id: index,
  titulo,
  texto,
  categoria: index < 4 ? "Ciclo de vida" : index === 4 ? "Cosecha" : index === 5 ? "Plagas" : "Nutrición",
}));

function categoryFor(guide) {
  const value = `${guide.categoria ?? ""} ${guide.titulo ?? ""}`.toLowerCase();
  if (/plaga|roya|broca/.test(value)) return "Plagas";
  if (/nutric|fertiliz/.test(value)) return "Nutrición";
  if (/cosecha|madur/.test(value)) return "Cosecha";
  if (/práctica|sostenib/.test(value)) return "Buenas prácticas";
  return "Ciclo de vida";
}

export default function GuiasCatalogo({ audience = "caficultor" }) {
  const isEmployee = audience === "empleado";
  const notificationsHref = isEmployee ? "/empleado/notificaciones" : "/notificaciones";
  const profileHref = isEmployee ? "/empleado/perfil" : "/perfil";
  const displayName = isEmployee ? "Empleado" : "Caficultor";
  const displayRole = isEmployee ? "Equipo de finca" : "Finca El Paraíso";
  const { data } = useRemoteData(contenidosApi.list);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [search, setSearch] = useState("");
  const [selectedGuide, setSelectedGuide] = useState(null);
  const source = Array.isArray(data) ? data : data?.items ?? data?.results ?? [];

  const guides = useMemo(() => {
    const records = source.length ? source : SAMPLE_GUIDES;
    const query = search.trim().toLowerCase();
    return records.map((guide) => ({
      ...guide,
      texto: guide.texto ?? guide.descripcion ?? guide.resumen ?? GUIDE_DETAILS[guide.titulo] ?? "Consejos prácticos para acompañar el manejo de tus cultivos de café.",
      categoriaVista: categoryFor(guide),
    })).filter((guide) => {
      const matchesCategory = guide.categoriaVista === category;
      const matchesSearch = !query || `${guide.titulo} ${guide.texto} ${guide.categoriaVista}`.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [source, search, category]);

  function downloadGuide(guide) {
    const content = `${guide.titulo}\n${guide.categoriaVista}\n\n${guide.texto}\n`;
    const url = URL.createObjectURL(new Blob([content], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${guide.titulo.toLowerCase().replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "")}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="grid content-start gap-4 sm:gap-5">
      <Topbar eyebrow="Aprendizaje" title="Guías de buenas prácticas" notifTo={notificationsHref} profileTo={profileHref} avatar="/coffee-tech/image.png" name={displayName} role={displayRole} />
      <section className="grid gap-3 rounded-xl border border-line bg-white/95 p-3 shadow-panel sm:flex sm:items-center sm:gap-4 sm:p-4">
        <label className="sr-only" htmlFor="guide-search">Buscar guías</label>
        <input id="guide-search" type="search" placeholder="Buscar guía..." value={search} onChange={(event) => setSearch(event.target.value)} className="min-h-10 w-full rounded-full border border-line bg-[#fbfaf7] px-4 text-sm outline-none focus:border-green sm:max-w-[220px]" />
        <nav aria-label="Filtrar guías por categoría" className="min-w-0 overflow-x-auto">
          <ul className="flex w-max gap-2 p-0 sm:w-auto sm:flex-wrap">
            {CATEGORIES.map((item) => (
              <li key={item}>
                <button type="button" aria-pressed={category === item} onClick={() => setCategory(item)} className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition-colors sm:text-sm ${category === item ? "bg-green text-white shadow-sm" : "bg-[#f5f3ee] text-ink hover:bg-green-soft"}`}>
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </section>
      <section aria-label="Guías disponibles" className="grid items-stretch gap-3 sm:grid-cols-2 xl:grid-cols-3 sm:gap-4">
        {guides.map((guide) => (
          <article key={guide.id ?? guide.titulo} className="flex min-h-[190px] flex-col items-start rounded-xl border border-line bg-white/95 p-4 shadow-panel sm:p-5">
            <button type="button" onClick={() => setSelectedGuide(guide)} className="rounded-full bg-[#844734] px-3 py-1 text-[11px] font-bold text-white transition hover:bg-coffee">Ver guía</button>
            <h2 className="mt-3 text-base font-bold leading-snug text-coffee">{guide.titulo}</h2>
            <p className="mt-2 flex-1 text-sm leading-6 text-muted">{guide.texto}</p>
            <button type="button" onClick={() => downloadGuide(guide)} className="mt-4 rounded-md bg-green-deep px-3 py-2 text-xs font-bold text-white transition hover:bg-green">Descargar documento</button>
          </article>
        ))}
        {!guides.length && <p className="rounded-xl border border-dashed border-line bg-white/70 p-6 text-sm text-muted sm:col-span-2 xl:col-span-3">No se encontraron guías en esta categoría.</p>}
      </section>
      {selectedGuide && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-coffee/45 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedGuide(null); }}>
          <section role="dialog" aria-modal="true" aria-labelledby="guide-dialog-title" className="w-full max-w-[660px] rounded-2xl bg-[#fffef8] p-5 shadow-2xl sm:p-7">
            <header className="flex items-center gap-3 text-coffee"><i className="fa-regular fa-file-lines text-3xl" aria-hidden="true" /><h2 id="guide-dialog-title" className="text-xl font-bold">{selectedGuide.titulo}</h2></header>
            <p className="mt-5 text-sm leading-7 text-muted sm:text-base">{selectedGuide.texto}</p>
            <div className="mt-5 grid min-h-[220px] place-items-center rounded-xl bg-[#f6f4e9] px-4 text-center text-sm text-muted sm:min-h-[300px]">Video explicativo próximamente</div>
            <button type="button" onClick={() => setSelectedGuide(null)} className="mt-4 min-h-12 w-full rounded-lg bg-green-deep px-5 py-3 text-sm font-bold text-white transition hover:bg-green">Cerrar</button>
          </section>
        </div>
      )}
    </section>
  );
}
