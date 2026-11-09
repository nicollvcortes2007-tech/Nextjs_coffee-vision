"use client";

import { useState } from 'react';

export default function Seguridad() {
    const [formulario, setFormulario] = useState({
        actual: '',
        nueva: '',
        confirmar: '',
    });
    const [mensaje, setMensaje] = useState(null);
    const [verClaves, setVerClaves] = useState(false);
    const [dosPasos, setDosPasos] = useState(false);
    const [confirmarEliminar, setConfirmarEliminar] = useState(false);
    const [motivo, setMotivo] = useState('');
    const [confirmarRiesgo, setConfirmarRiesgo] = useState(false);

    const manejarCambio = (e) => {
        setFormulario({ ...formulario, [e.target.name]: e.target.value });
        setMensaje(null);
    };

    const manejarEnvio = (e) => {
        e.preventDefault();

        if (!formulario.actual || !formulario.nueva || !formulario.confirmar) {
            setMensaje({ tipo: 'error', texto: 'Completa todos los campos.' });
            return;
        }
        if (formulario.nueva.length < 8) {
            setMensaje({
                tipo: 'error',
                texto: 'La nueva contraseña debe tener al menos 8 caracteres.',
            });
            return;
        }
        if (!/[A-Z]/.test(formulario.nueva) || !/\d/.test(formulario.nueva)) {
            setMensaje({
                tipo: 'error',
                texto: 'La contraseña debe incluir al menos un número y una letra mayúscula.',
            });
            return;
        }
        if (formulario.nueva !== formulario.confirmar) {
            setMensaje({ tipo: 'error', texto: 'Las contraseñas nuevas no coinciden.' });
            return;
        }
        if (formulario.nueva === formulario.actual) {
            setMensaje({
                tipo: 'error',
                texto: 'La nueva contraseña debe ser diferente a la actual.',
            });
            return;
        }

        setMensaje({ tipo: 'exito', texto: 'Contraseña actualizada correctamente.' });
        setFormulario({ actual: '', nueva: '', confirmar: '' });
    };

    const manejarEliminar = (e) => {
        e.preventDefault();
        if (!confirmarRiesgo) {
            setMensaje({ tipo: 'error', texto: 'Debes confirmar que entiendes el riesgo.' });
            return;
        }
        // Aquí iría la llamada real para eliminar la cuenta
        setMensaje({ tipo: 'exito', texto: 'Cuenta eliminada.' });
    };

    return (
        <section className="space-y-6">
            {/* Cambiar contraseña */}
            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#eee] sm:p-8">
                <article className="mb-6">
                    <h2 className="text-xl font-semibold text-[#5a3a1e]">
                        Cambiar Contraseña
                    </h2>
                    <p className="mt-0.5 text-sm text-[#8a7a68]">
                        Actualice su contraseña periódicamente para mantener su cuenta segura.
                    </p>
                </article>

                <form onSubmit={manejarEnvio} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <article className="flex flex-col gap-2 sm:col-span-2">
                        <label htmlFor="current-pass" className="text-lg font-medium text-[#5a3a1e]">
                            Contraseña actual
                        </label>
                        <input
                            type={verClaves ? 'text' : 'password'}
                            id="current-pass"
                            name="actual"
                            value={formulario.actual}
                            onChange={manejarCambio}
                            placeholder="Ingrese su contraseña actual"
                            className="h-12 w-full rounded-lg border border-[#e0d6c4] bg-[#faf7f0] px-3 text-sm transition-colors placeholder:text-[#aaa] focus:border-[#6b8e3d] focus:outline-none focus:ring-2 focus:ring-[#6b8e3d]/20"
                        />
                    </article>

                    <article className="flex flex-col gap-2">
                        <label htmlFor="new-pass" className="text-lg font-medium text-[#5a3a1e]">
                            Nueva contraseña
                        </label>
                        <input
                            type={verClaves ? 'text' : 'password'}
                            id="new-pass"
                            name="nueva"
                            value={formulario.nueva}
                            onChange={manejarCambio}
                            placeholder="Mínimo 8 caracteres"
                            className="h-12 w-full rounded-lg border border-[#e0d6c4] bg-[#faf7f0] px-3 text-sm transition-colors placeholder:text-[#aaa] focus:border-[#6b8e3d] focus:outline-none focus:ring-2 focus:ring-[#6b8e3d]/20"
                        />
                    </article>

                    <article className="flex flex-col gap-2">
                        <label htmlFor="confirm-pass" className="text-lg font-medium text-[#5a3a1e]">
                            Confirmar nueva contraseña
                        </label>
                        <input
                            type={verClaves ? 'text' : 'password'}
                            id="confirm-pass"
                            name="confirmar"
                            value={formulario.confirmar}
                            onChange={manejarCambio}
                            placeholder="Repita la nueva contraseña"
                            className="h-12 w-full rounded-lg border border-[#e0d6c4] bg-[#faf7f0] px-3 text-sm transition-colors placeholder:text-[#aaa] focus:border-[#6b8e3d] focus:outline-none focus:ring-2 focus:ring-[#6b8e3d]/20"
                        />
                    </article>

                    <p className="flex items-start gap-2 text-xs text-[#8a7a68] sm:col-span-2">
                        La contraseña debe tener al menos 8 caracteres, incluir un número y una letra mayúscula.
                    </p>

                    <label className="flex cursor-pointer items-center gap-2 text-sm text-[#8a7a68] sm:col-span-2">
                        <input
                            type="checkbox"
                            checked={verClaves}
                            onChange={(e) => setVerClaves(e.target.checked)}
                            className="h-4 w-4 accent-[#6b8e3d]"
                        />
                        Mostrar contraseñas
                    </label>

                    {mensaje && (
                        <p
                            className={`rounded-lg px-4 py-2.5 text-sm sm:col-span-2 ${mensaje.tipo === 'error'
                                ? 'bg-red-50 text-red-700'
                                : 'bg-green-50 text-green-700'
                                }`}
                        >
                            {mensaje.texto}
                        </p>
                    )}

                    <article className="flex justify-end sm:col-span-2">
                        <button
                            type="submit"
                            className="cursor-pointer rounded-lg bg-[#6b8e3d] px-6 py-2.5 text-lg font-semibold text-white transition-colors hover:bg-[#5a7a32]"
                        >
                            Actualizar contraseña
                        </button>
                    </article>
                </form>
            </section>

            {/* Verificación en dos pasos */}
            <section className="flex items-center justify-between rounded-2xl border border-[#e8e0d0] bg-white p-6 shadow-sm sm:p-8">
                <article>
                    <h3 className="text-lg font-semibold text-[#5a3a1e]">
                        Verificación en dos pasos
                    </h3>
                    <p className="mt-1 text-sm text-[#8a7a68]">
                        Añade una capa extra de seguridad al iniciar sesión.
                    </p>
                </article>
                <button
                    type="button"
                    onClick={() => setDosPasos(!dosPasos)}
                    className={`relative h-7 w-12 shrink-0 rounded-full transition ${dosPasos ? 'bg-[#6b8e3d]' : 'bg-[#d8cfc0]'
                        }`}
                >
                    <span
                        className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-all ${dosPasos ? 'left-6' : 'left-1'
                            }`}
                    />
                </button>
            </section>

            {/* Eliminación de cuenta */}
            <section className="rounded-2xl border border-[#f0c9c7] bg-[#fdf6f5] p-6 shadow-sm sm:p-8">
                <article className="mb-6">
                    <h2 className="text-xl font-semibold text-[#a94442]">
                        Eliminación de cuenta
                    </h2>
                    <p className="mt-0.5 text-sm text-[#888]">
                        Esta acción es irreversible y borrará los datos de la finca y el administrador.
                    </p>
                </article>

                <form onSubmit={manejarEliminar} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <article className="flex flex-col gap-2">
                        <label htmlFor="motivo" className="text-sm font-medium text-[#333]">
                            Motivo de cancelación (Opcional)
                        </label>
                        <select
                            id="motivo"
                            value={motivo}
                            onChange={(e) => setMotivo(e.target.value)}
                            className="h-12 w-full rounded-lg border border-[#d5d0c4] bg-white px-3 text-sm transition-colors focus:border-[#a94442] focus:outline-none focus:ring-2 focus:ring-[#a94442]/20"
                        >
                            <option value="">Seleccione un motivo</option>
                            <option value="no-uso">Ya no utilizo el sistema</option>
                            <option value="finca">Cambié de finca o administración</option>
                            <option value="otro">Otro motivo</option>
                        </select>
                    </article>

                    <article className="flex flex-col gap-2">
                        <label htmlFor="pass-confirm" className="text-sm font-medium text-[#333]">
                            Contraseña actual
                        </label>
                        <input
                            type="password"
                            id="pass-confirm"
                            placeholder="Ingrese su contraseña"
                            required
                            className="h-12 w-full rounded-lg border border-[#d5d0c4] bg-white px-3 text-sm transition-colors placeholder:text-[#aaa] focus:border-[#a94442] focus:outline-none focus:ring-2 focus:ring-[#a94442]/20"
                        />
                    </article>

                    <article className="flex items-center gap-3 sm:col-span-2">
                        <input
                            type="checkbox"
                            id="check-riesgo"
                            checked={confirmarRiesgo}
                            onChange={(e) => setConfirmarRiesgo(e.target.checked)}
                            className="h-4 w-4 cursor-pointer accent-[#d9534f]"
                        />
                        <label htmlFor="check-riesgo" className="cursor-pointer text-sm text-[#555]">
                            Confirmo que deseo eliminar permanentemente los registros e historial de esta cuenta.
                        </label>
                    </article>

                    <article className="flex justify-end sm:col-span-2">
                        <button
                            type="submit"
                            className="cursor-pointer rounded-lg bg-[#d9534f] px-6 py-2.5 text-lg font-semibold text-white transition-colors hover:bg-[#c9302c]"
                        >
                            Eliminar cuenta definitivamente
                        </button>
                    </article>
                </form>
            </section>
        </section>
    );
}
