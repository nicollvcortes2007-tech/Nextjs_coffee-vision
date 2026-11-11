"use client";

import { useRemoteData } from "@/hooks/useRemoteData";
import { usuariosAdminApi } from "@/features/admin";
import { DataTable, PageHeader, RequestState } from "@/components/ui/PanelUI";

export default function UsuariosPage() {
  const { data, loading, error, refresh } = useRemoteData(usuariosAdminApi.list);
  const users = Array.isArray(data) ? data : data?.items ?? [];

  async function changeRole(user, role) {
    try {
      await usuariosAdminApi.updateRole(user.id, role);
      refresh();
    } catch (requestError) {
      window.alert(requestError.message);
    }
  }

  async function removeUser(user) {
    if (!window.confirm(`¿Desactivar la cuenta de ${user.nombre}?`)) return;
    try {
      await usuariosAdminApi.remove(user.id);
      refresh();
    } catch (requestError) {
      window.alert(requestError.message);
    }
  }

  const columns = [
    { key: "nombre", label: "Usuario" },
    { key: "email", label: "Correo" },
    {
      key: "rol",
      label: "Rol",
      render: (user) => <select aria-label={`Rol de ${user.nombre}`} value={user.rol} onChange={(event) => changeRole(user, event.target.value)}><option value="caficultor">Caficultor</option><option value="empleado">Empleado</option><option value="administrador">Administrador</option></select>,
    },
    { key: "estado", label: "Estado" },
    { key: "creado_en", label: "Registro" },
    { key: "acciones", label: "Acciones", render: (user) => <button className="table-action" onClick={() => removeUser(user)}>Desactivar</button> },
  ];

  return (
    <section className="page-wrap">
      <PageHeader eyebrow="ACCESOS" title="Usuarios" description="Revisa las cuentas y asigna roles de la plataforma." action={<button className="button button-outline" onClick={refresh}>↻ Actualizar</button>} />
      <RequestState loading={loading} error={error} onRetry={refresh} />
      {!loading && !error && <section className="surface table-card"><DataTable columns={columns} rows={users} empty="No hay usuarios registrados." /></section>}
    </section>
  );
}
