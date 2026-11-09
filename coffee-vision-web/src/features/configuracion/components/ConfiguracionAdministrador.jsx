"use client";

import { useState } from "react";
import DatosAdministrador from "./DatosAdministrador";
import Seguridad from "./Seguridad";
import MetricasChatbot from "./MetricasChatBot";

export default function ConfiguracionAdministrador() {
    const [pestanaActiva, setPestanaActiva] = useState('datos');

    const pestanas = [
        { id: 'datos', etiqueta: 'Datos del administrador' },
        { id: 'seguridad', etiqueta: 'Seguridad' },
        { id: 'metricas', etiqueta: 'Métricas del chat bot' },
    ];

    return (
        <main className="min-h-screen px-6 py-8 text-[#333] sm:px-10">
            <section className="w-full">
                {/* Pestañas tipo píldora */}
                <nav className="mb-8 flex flex-wrap gap-5 rounded-xl bg-white p-3.5 shadow-sm">
                    {pestanas.map((p) => (
                        <button
                            key={p.id}
                            type="button"
                            onClick={() => setPestanaActiva(p.id)}
                            className={`cursor-pointer rounded-full px-5 py-2 text-sm font-medium transition ${pestanaActiva === p.id
                                    ? 'bg-[#6b8e3d] text-white shadow-sm'
                                    : 'text-[#8a7a68] hover:bg-[#f5f0e6] hover:text-[#5a3a1e]'
                                }`}
                        >
                            {p.etiqueta}
                        </button>
                    ))}
                </nav>

                {/* Contenido de la pestaña activa */}
                <article>
                    {pestanaActiva === 'datos' && <DatosAdministrador />}
                    {pestanaActiva === 'seguridad' && <Seguridad />}
                    {pestanaActiva === 'metricas' && <MetricasChatbot />}
                </article>
            </section>
        </main>
    );
}
