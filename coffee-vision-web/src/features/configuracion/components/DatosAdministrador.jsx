"use client";

const datos_administrador = [
    { id: "nombres", label: "Nombres y Apellidos", tipo: "text" },
    { id: "direccion", label: "Dirección del administrador", tipo: "text" },
    { id: "correo", label: "Correo Electrónico", tipo: "email" },
    { id: "finca", label: "Nombre de la finca", tipo: "text" },
];

export default function DatosAdministrador() {
    return (
        <section className="space-y-6">
            {/* Información del administrador y de la finca */}
            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#eee] sm:p-8">
                <article className="mb-6">
                    <h2 className="text-xl font-semibold text-[#7a1f1f]">
                        Información del Administrador y Finca
                    </h2>
                    <p className="mt-0.5 text-sm text-[#888]">
                        Actualice sus datos personales y de contacto
                    </p>
                </article>

                <form className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {datos_administrador.map((campo) => (
                        <section key={campo.id} className="flex flex-col gap-2">
                            <label htmlFor={campo.id} className="text-lg font-semibold text-[#333]">
                                {campo.label}
                            </label>
                            <input
                                id={campo.id}
                                type={campo.tipo}
                                className="h-12 w-full rounded-lg border border-[#d5d0c4] bg-white px-3 text-sm transition-colors placeholder:text-[#aaa] focus:border-[#4a7c2f] focus:outline-none focus:ring-2 focus:ring-[#4a7c2f]/20"
                            />
                        </section>
                    ))}
                </form>

                <article className="mt-6 flex justify-end">
                    <button
                        type="submit"
                        className="cursor-pointer rounded-lg bg-[#6b7c2b] px-6 py-2.5 text-lg font-semibold text-white transition-colors hover:bg-[#3d6826]"
                    >
                        Guardar cambios
                    </button>
                </article>
            </section>
        </section>
    );
}
