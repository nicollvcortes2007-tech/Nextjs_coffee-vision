function ListaGuias({ guias, onVerGuia }) {
    if (guias.length === 0) {
        return (
            <p className="col-span-full py-10 text-center text-lg text-[#4a2f1c]">
                No se encontraron guías.
            </p>
        );
    }

    return guias.map((guia) => (
        <article
            key={guia.titulo}
            className="flex flex-col rounded-xl border border-green-300 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
        >
            <section className="mb-3.5 flex items-center justify-between">
                <button
                    onClick={() => onVerGuia(guia)}
                    className="flex items-center gap-2 rounded-full bg-[#a26443] px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-[#8a5233]"
                >
                    <img src="/iconos/documento.png" alt="Doc" className="h-4 w-4" />
                    Ver guía
                </button>
            </section>
            <h3 className="mb-2 text-[20px] font-bold text-[#6b3a1f]">{guia.titulo}</h3>
            <p className="mb-4 flex-1 leading-relaxed text-[#4a2f1c]">{guia.descripcion}</p>
            <button className="self-start rounded-md bg-[#6b7c2b] px-3.5 py-2.5 text-[14px] font-semibold text-white hover:bg-[#5c6a24]">
                Descargar documento
            </button>
        </article>
    ));
}

export default ListaGuias;
