function TabsGuias({ categorias, pestanaActiva, setPestanaActiva }) {
    return (
        <nav className="flex flex-wrap items-center gap-2">
            {categorias.map((categoria) => (
                <button
                    key={categoria.id}
                    type="button"
                    onClick={() => setPestanaActiva(categoria.id)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                        pestanaActiva === categoria.id
                            ? 'bg-[#6b8e3d] text-white shadow-sm'
                            : 'bg-[#f5f0e6] text-[#4a2f1c] hover:bg-[#e5ddc8]'
                    }`}
                >
                    {categoria.nombre}
                </button>
            ))}
        </nav>
    );
}

export default TabsGuias;
