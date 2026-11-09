"use client";

export default function MetricasChatbot() {
    const resumen = [
        { etiqueta: 'Consultas totales', valor: '1.248' },
        { etiqueta: 'Consultas este mes', valor: '186' },
        { etiqueta: 'Tiempo promedio de respuesta', valor: '1,4 s' },
        { etiqueta: 'Satisfacción', valor: '92 %' },
    ];

    /* Los datos de las barras (si se los quita \(x_x)/) */
    const porMes = [
        { mes: 'May', valor: 120 },
        { mes: 'Jun', valor: 165 },
        { mes: 'Jul', valor: 142 },
        { mes: 'Ago', valor: 198 },
        { mes: 'Sep', valor: 210 },
        { mes: 'Oct', valor: 186 },
    ];

    const temas = [
        { tema: 'Plagas y enfermedades', porcentaje: 38 },
        { tema: 'Nutrición del cultivo', porcentaje: 24 },
        { tema: 'Cosecha y poscosecha', porcentaje: 18 },
        { tema: 'Análisis de imagen', porcentaje: 12 },
        { tema: 'Otros', porcentaje: 8 },
    ];

    const maximo = Math.max(...porMes.map((m) => m.valor));

    return (
        <section className="space-y-6">
            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {resumen.map((item) => (
                    <article
                        key={item.etiqueta}
                        className="rounded-2xl border border-[#e8e0d0] bg-white p-5"
                    >
                        <p className="text-xs font-medium uppercase tracking-wide text-[#8a7a68]">
                            {item.etiqueta}
                        </p>
                        <p className="mt-2 text-2xl font-bold text-[#5a3a1e]">{item.valor}</p>
                    </article>
                ))}
            </section>

            {/* Barras
            <section className="rounded-2xl border border-[#e8e0d0] bg-white p-6">
                <h3 className="text-xl font-semibold text-[#5a3a1e]">
                    Consultas por mes
                </h3>
                <p className="mt-1 text-sm text-[#8a7a68]">
                    Últimos seis meses de uso del chat bot.
                </p>

                <section className="mt-6 flex h-48 items-end gap-4">
                    {porMes.map((item) => (
                        <article key={item.mes} className="flex flex-1 flex-col items-center gap-2">
                            <span className="text-xs font-semibold text-[#5a3a1e]">
                                {item.valor}
                            </span>
                            <article
                                className="w-full rounded-t-lg bg-[#6b8e3d] transition-all hover:bg-[#5a7a32]"
                                style={{ height: `${(item.valor / maximo) * 100}%` }}
                            />
                            <span className="text-xs text-[#8a7a68]">{item.mes}</span>
                        </article>
                    ))}
                </section>
            </section>
            */}

            <section className="rounded-2xl border border-[#e8e0d0] bg-white p-6">
                <h3 className="text-xl font-semibold text-[#5a3a1e]">
                    Temas más consultados
                </h3>
                <p className="mt-1 text-sm text-[#8a7a68]">
                    Distribución de las preguntas recibidas.
                </p>

                <section className="mt-5 space-y-4">
                    {temas.map((item) => (
                        <article key={item.tema}>
                            <article className="flex items-center justify-between text-sm">
                                <span className="text-[#5a3a1e]">{item.tema}</span>
                                <span className="font-semibold text-[#5a3a1e]">
                                    {item.porcentaje} %
                                </span>
                            </article>
                            <article className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-[#f0ebe0]">
                                <article
                                    className="h-full rounded-full bg-[#6b8e3d]"
                                    style={{ width: `${item.porcentaje}%` }}
                                />
                            </article>
                        </article>
                    ))}
                </section>
            </section>
        </section>
    );
}
