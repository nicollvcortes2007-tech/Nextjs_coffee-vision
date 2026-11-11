"use client";

import { useMemo, useState } from "react";
import Topbar from "@/components/dashboard/Topbar";
import { contenidosApi } from "@/features/contenidos";
import { useRemoteData } from "@/hooks/useRemoteData";

const CATEGORIES = ["Ciclo de vida del cultivo", "Plagas", "Nutrición", "Buenas Prácticas"];
const GUIDE_DETAILS = {
  "Germinación y trasplante": "La germinación y el trasplante son las primeras etapas del ciclo productivo del café y constituyen la base para establecer una plantación sana, uniforme y productiva.",
  "Desarrollo vegetativo": "Comprende el periodo desde el establecimiento de la planta en el campo hasta el inicio de la producción.",
  Floración: "Una etapa clave del cultivo que determina el potencial de producción de la cosecha.",
  "Formación del grano": "El fruto crece y desarrolla las características que determinarán la calidad del café.",
  "Maduración y cosecha": "Los frutos alcanzan su desarrollo fisiológico y se recolectan en el punto adecuado.",
  "Manejo integrado de plagas": "Prevención, monitoreo y control responsable de las plagas que afectan el cafetal.",
  "Nutrición del cultivo": "Buenas prácticas para cuidar el suelo y aportar nutrientes según la etapa del cultivo.",
};
const SAMPLE_GUIDES = Object.entries(GUIDE_DETAILS).map(([titulo, texto], index) => ({ id: index, titulo, texto, categoria: index < 5 ? "Ciclo de vida del cultivo" : index === 5 ? "Plagas" : "Nutrición" }));

export default function GuiasPage() {
  const { data } = useRemoteData(contenidosApi.list);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [search, setSearch] = useState("");
  const source = Array.isArray(data) ? data : data?.items ?? data?.results ?? [];
  const guides = useMemo(() => {
    const records = source.length ? source : SAMPLE_GUIDES;
    const normalized = records.map((guide) => ({
      ...guide,
      texto: guide.texto ?? guide.descripcion ?? guide.resumen ?? GUIDE_DETAILS[guide.titulo] ?? "Consejos prácticos para acompañar el manejo de tus cultivos de café.",
      categoriaVista: /plaga|roya|broca/i.test(guide.categoria ?? guide.titulo) ? "Plagas" : /nutric|fertiliz/i.test(guide.categoria ?? guide.titulo) ? "Nutrición" : /práctica|sostenib/i.test(guide.categoria ?? guide.titulo) ? "Buenas Prácticas" : "Ciclo de vida del cultivo",
    }));
    const query = search.trim().toLowerCase();
    return normalized.filter((guide) => {
      const categoryMatches = guide.categoriaVista === category;
      const searchMatches = !query || `${guide.titulo} ${guide.texto}`.toLowerCase().includes(query);
      return categoryMatches && searchMatches;
    });
  }, [source, search, category]);

  return (
    <section className="grid gap-6">
      <Topbar eyebrow="Aprendizaje" title="Guías" notifTo="/notificaciones" profileTo="/perfil" avatar="/coffee-tech/image.png" name="Caficultor" role="Finca El Paraíso" />
      <p className="text-muted">La ayuda que necesitas ¡Ahora más fácil!</p>
      <nav className="grid gap-3 rounded-lg border border-line bg-white/95 p-4 shadow-panel sm:flex sm:items-center sm:justify-between">
        <input type="search" placeholder="Buscar..." value={search} onChange={(event) => setSearch(event.target.value)} className="min-h-[42px] rounded-lg border border-line px-3 focus:border-green focus:outline-none sm:w-64" />
        <ul className="flex flex-wrap gap-2">{CATEGORIES.map((item) => <li key={item}><button type="button" onClick={() => setCategory(item)} className={`rounded-full px-4 py-1.5 text-sm font-bold ${category === item ? "bg-coffee text-white" : "bg-[#fbfaf7] text-muted"}`}>{item}</button></li>)}</ul>
      </nav>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => <article key={guide.id ?? guide.titulo} className="flex flex-col justify-between rounded-lg border border-line bg-white/95 p-5 shadow-panel"><div><h3 className="text-lg">{guide.titulo}</h3><p className="mt-2 text-sm leading-relaxed text-muted">{guide.texto}</p></div><button type="button" className="mt-4 self-start rounded-lg bg-green px-4 py-2 text-sm font-bold text-white hover:bg-green-deep">Descargar</button></article>)}
        {!guides.length && <p className="text-muted">No se encontraron guías para “{search}”.</p>}
      </section>
    </section>
  );
}
