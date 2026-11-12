import Sidebar from "@/plantillas/Sidebar"; 
import Topbar from "@/components/navegacion/Topbar";
import caficultor from "@/assets/imagenes/caficultor.jpg";

export default function GestionDeCultivos() {
  return (
    <main className="flex min-h-screen bg-page font-sans text-ink">
      
      {/* Barra lateral unificada */}
      <Sidebar role="administrador" />

      {/* Contenido Principal */}
      <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-10 py-8">
        
        <Topbar 
          eyebrow="REGISTRO AGRÍCOLA" 
          title="Gestión de Cultivos" 
          notifTo="#notificaciones"
          perfilTo="#perfil"
          avatar="https://ui-avatars.com/api/?name=Yordi+Fernández&background=4e2a15&color=fff"
          nombre="Yordi Fernández"
          rol="Administrador"
        />

        {/* Tarjeta del Formulario */}
        <article className="rounded-xl border border-line border-l-4 border-l-green bg-surface p-8 shadow-sm">
          <header className="mb-6">
            <h2 className="mb-1 text-2xl font-semibold text-ink">Registrar Nueva Actividad</h2>
            <p className="text-sm text-muted">Añada los detalles de la labor realizada en la finca.</p>
          </header>

          <form action="#" method="POST" className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-semibold">
              Fecha de la Labor
              <input type="date" required className="rounded-lg border border-line bg-surface p-3 font-normal text-ink outline-none transition-colors focus:border-green" />
            </label>

            <label className="flex flex-col gap-2 text-sm font-semibold">
              Tipo de Actividad
              <select required className="rounded-lg border border-line bg-surface p-3 font-normal text-ink outline-none transition-colors focus:border-green">
                <option value="" disabled selected>Selecciona una opción...</option>
                <option value="Siembra">Siembra</option>
                <option value="Fertilización">Fertilización</option>
                <option value="Control de Plagas">Control de Plagas (Broca/Roya)</option>
                <option value="Poda">Poda / Zoqueo</option>
                <option value="Recolección">Recolección (Cosecha)</option>
              </select>
            </label>

            <label className="col-span-1 flex flex-col gap-2 text-sm font-semibold sm:col-span-2">
              Observaciones / Detalles
              <textarea rows="3" placeholder="Ej: Se aplicaron 50g de fertilizante por árbol..." className="rounded-lg border border-line bg-surface p-3 font-normal text-ink outline-none transition-colors focus:border-green"></textarea>
            </label>

            <footer className="col-span-1 mt-2 flex justify-end sm:col-span-2">
              <button type="submit" className="rounded-lg bg-green px-7 py-3 text-base font-semibold text-surface transition-colors hover:bg-green-deep">
                Guardar Actividad
              </button>
            </footer>
          </form>
        </article>

        {/* Tarjeta del Historial (Tabla) */}
        <article className="rounded-xl border border-line bg-surface p-8 shadow-sm">
          <header className="mb-6">
            <h2 className="text-2xl font-semibold text-ink">Historial de Cultivos</h2>
          </header>
          
          <figure className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr>
                  <th className="border-b-2 border-line bg-green-soft px-4 py-3 text-sm font-bold uppercase tracking-wider text-coffee">Fecha</th>
                  <th className="border-b-2 border-line bg-green-soft px-4 py-3 text-sm font-bold uppercase tracking-wider text-coffee">Actividad</th>
                  <th className="border-b-2 border-line bg-green-soft px-4 py-3 text-sm font-bold uppercase tracking-wider text-coffee">Observaciones</th>
                  <th className="border-b-2 border-line bg-green-soft px-4 py-3 text-sm font-bold uppercase tracking-wider text-coffee">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-b border-line px-4 py-4 font-mono font-semibold text-ink">2026-06-10</td>
                  <td className="border-b border-line px-4 py-4">
                    <span className="rounded-full bg-[#fff3cd] px-3 py-1.5 text-xs font-bold text-warning">Control de Plagas</span>
                  </td>
                  <td className="border-b border-line px-4 py-4 text-sm text-muted">Monitoreo de broca en el lote principal. Se observa baja incidencia.</td>
                  <td className="border-b border-line px-4 py-4">
                     <details className="relative inline-block">
                        <summary className="cursor-pointer list-none rounded-md border border-line bg-surface px-3 py-1.5 text-sm font-semibold text-ink transition-colors hover:bg-page">
                            Acciones ▾
                        </summary>
                        <nav className="absolute right-0 top-full z-50 mt-1 w-40 rounded-lg border border-line bg-surface py-2 shadow-lg">
                            <a href="#" className="block px-4 py-2 text-sm text-ink transition-colors hover:bg-green-soft hover:text-coffee">Editar Registro</a>
                            <a href="#" className="block px-4 py-2 text-sm text-ink transition-colors hover:bg-green-soft hover:text-coffee">Ver Detalles</a>
                            <hr className="my-1 border-line" />
                            <a href="#" className="block px-4 py-2 text-sm text-danger transition-colors hover:bg-red-50">Eliminar</a>
                        </nav>
                     </details>
                  </td>
                </tr>
              </tbody>
            </table>
          </figure>
        </article>

      </section>
    </main>
  );
}
