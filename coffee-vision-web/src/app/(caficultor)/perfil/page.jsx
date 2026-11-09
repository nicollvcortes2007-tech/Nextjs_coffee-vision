const datos_personales = [
    { id: "nombre", label: "Nombre", valor: "José Caesar" },
    { id: "apellido", label: "Apellido", valor: "Martinez Gutierrez" },
    { id: "teléfono", label: "Teléfono", valor: "3214567890" },
    { id: "municipio", label: "Municipio", valor: "Popayan" },
    { id: "gmail", label: "Gmail", valor: "josemartinez@gmail.com" },
];

const datos_finca = [
    { id: "nombrefinca", label: "Nombre Finca", valor: "La Mulata" },
    { id: "ubicacion", label: "Ubicación", valor: "Cajete" },
];

export default function Page() {
    return (
        <main className="w-full rounded-xl border border-line bg-white p-6 shadow-panel sm:p-8">
            <header className="mb-5.5 flex items-center justify-between text-[#601818]">
                <h2 className="font-calibri text-2xl font-bold">Información de perfil</h2>
            </header>

            <section className="mb-5 flex items-center gap-3.5">
                <img src="/imagenes/caficultor.jpg" alt="Foto caficultor" className="h-16 w-16 rounded-full border-2 border-green-soft object-cover" />
                <h3 className="text-lg font-semibold text-[#111]">José Caesar Martinez Gutierrez</h3>
            </section>

            <hr className="mb-7 border-t border-[#eee]" />

            <section className="mb-7">
                <h4 className="mb-5 text-lg font-semibold text-[#111]">Datos personales</h4>

                <form className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {datos_personales.map((campo) => (
                        <section key={campo.id} className="flex flex-col gap-2">
                            <label htmlFor={campo.id} className="font-calibri">{campo.label}</label>
                            <input
                                id={campo.id}
                                type={campo.id === "gmail" ? "email" : "text"}
                                defaultValue={campo.valor}
                                className="rounded-lg border border-line bg-white p-3 text-sm text-ink outline-none focus:border-green focus:ring-2 focus:ring-green/20"
                            />
                        </section>
                    ))}
                </form>
            </section>

            <section className="mt-2">
                <h4 className="mb-5 text-lg font-semibold text-[#111]">Datos Finca</h4>

                <form className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {datos_finca.map((campo) => (
                        <section key={campo.id} className="flex flex-col gap-2">
                            <label htmlFor={campo.id} className="font-calibri">{campo.label}</label>
                            <input
                                id={campo.id}
                                type="text"
                                defaultValue={campo.valor}
                                className="rounded-lg border border-line bg-white p-3 text-sm text-ink outline-none focus:border-green focus:ring-2 focus:ring-green/20"
                            />
                        </section>
                    ))}
                </form>
            </section>
        </main>
    );
}
