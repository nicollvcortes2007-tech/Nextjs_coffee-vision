"use client";

import { useState } from "react";
import TabsGuias from "@/features/contenidos/components/TabsGuias";
import ListaGuias from "@/features/contenidos/components/ListaGuias";
import { categorias, guiasPorCategoria } from "@/features/contenidos/components/DatosGuias";

export default function ContenidosPage() {
    const [busqueda, setBusqueda] = useState("");
    const [pestanaActiva, setPestanaActiva] = useState("ciclo_vida");
    const [guiaSeleccionada, setGuiaSeleccionada] = useState(null);

    const guiasCategoria = guiasPorCategoria[pestanaActiva] || [];
    const guiasFiltradas = guiasCategoria.filter((guia) =>
        guia.titulo.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <section className="flex min-h-0 min-w-0">
            <main className="min-w-0 flex-1 p-3 sm:p-6 sm:pr-8">
                <section className="mb-7 flex flex-col gap-3 rounded-xl border border-[#e5ddc8] bg-white p-3 sm:flex-row sm:items-center sm:gap-4 sm:p-4">
                    <article className="flex w-full min-w-0 items-center gap-2 rounded-full bg-[#e5ddc8] px-4 py-2.5 sm:w-72 sm:shrink-0">
                        <input
                            type="text"
                            placeholder="Buscar.."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            className="flex-1 border-none bg-transparent text-base text-[#4a2f1c] outline-none"
                        />
                    </article>

                    <TabsGuias
                        categorias={categorias}
                        pestanaActiva={pestanaActiva}
                        setPestanaActiva={setPestanaActiva}
                    />
                </section>

                <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <ListaGuias guias={guiasFiltradas} onVerGuia={setGuiaSeleccionada} />
                </section>
            </main>

            {guiaSeleccionada && (
                <section className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <section className="max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-4 sm:p-6">
                        <article className="mb-4 flex items-center gap-3">
                            <img src="/iconos/documento.png" alt="Doc" className="h-10 w-10" />
                            <h2 className="text-xl font-bold text-[#6b3a1f]">{guiaSeleccionada.titulo}</h2>
                        </article>

                        <p className="mb-4 leading-relaxed text-[#4a2f1c]">
                            {guiaSeleccionada.descripcionGuia}
                        </p>

                        <article className="mb-4 flex aspect-video items-center justify-center rounded-xl bg-[#f5f0e8]">
                            <p className="text-sm text-[#4a2f1c]">Video explicativo próximamente</p>
                        </article>

                        <button
                            onClick={() => setGuiaSeleccionada(null)}
                            className="w-full rounded-md bg-[#6b7c2b] py-2.5 font-semibold text-white hover:bg-[#5c6a24]"
                        >
                            Cerrar
                        </button>
                    </section>
                </section>
            )}
        </section>
    );
}
