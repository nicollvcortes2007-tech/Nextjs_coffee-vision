"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import MetricCard from "@/components/dashboard/MetricCard";
import AdminAccountControls from "@/components/admin/AdminAccountControls";
import { PageHeader, RequestState } from "@/components/ui/PanelUI";
import { useRemoteData } from "@/hooks/useRemoteData";
import { usuariosAdminApi } from "@/features/admin";

function rowsFrom(data) {
  return Array.isArray(data) ? data : data?.items ?? data?.results ?? data?.data ?? [];
}

function isActive(user) {
  const state = String(user.estado ?? user.status ?? "Activo").trim().toLowerCase();
  return ["activo", "activa", "active", "vigente", "habilitado", "enabled"].includes(state);
}

function displayDate(value) {
  if (!value) return "—";
  const date = new Date(/^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T00:00:00` : value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString("es-CO", { day: "numeric", month: "short", year: "numeric" });
}

export default function AdminAccountsManager({ type = "users" }) {
  const isEmployees = type === "employees";
  const { data, loading, error, refresh } = useRemoteData(usuariosAdminApi.list);
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("todos");
  const allUsers = rowsFrom(data);
  const employeeUsers = allUsers.filter((user) => String(user.rol ?? user.role ?? "").toLowerCase() === "empleado");
  const visible = useMemo(() => {
    const source = isEmployees ? employeeUsers : allUsers.filter((user) => roleFilter === "todos" || String(user.rol ?? user.role ?? "").toLowerCase() === roleFilter);
    const normalizedQuery = query.trim().toLowerCase();
    return source.filter((user) => `${user.nombre ?? user.name ?? ""} ${user.email ?? user.correo ?? ""} ${user.finca ?? user.finca_nombre ?? ""}`.toLowerCase().includes(normalizedQuery));
  }, [allUsers, employeeUsers, isEmployees, query, roleFilter]);
  const baseRows = isEmployees ? employeeUsers : allUsers;
  const activeCount = baseRows.filter(isActive).length;
  const inactiveCount = baseRows.length - activeCount;

  async function changeRole(user, role) {
    try {
      await usuariosAdminApi.updateRole(user.id, role);
      refresh();
    } catch (requestError) {
      window.alert(requestError.message);
    }
  }

  async function deactivate(user) {
    const name = user.nombre ?? user.name ?? user.email ?? "este usuario";
    if (!window.confirm(`¿Desactivar la cuenta de ${name}?`)) return;
    try {
      await usuariosAdminApi.remove(user.id);
      refresh();
    } catch (requestError) {
      window.alert(requestError.message);
    }
  }

  return (
    <section className="page-wrap admin-accounts-page">
      <PageHeader
        eyebrow={isEmployees ? "PERSONAL DE LA PLATAFORMA" : "ACCESOS DE LA PLATAFORMA"}
        title={isEmployees ? "Gestión de empleados" : "Gestión de usuarios"}
        description={isEmployees ? "Revisa los accesos del personal y administra las cuentas de empleado." : "Administra las cuentas, roles y accesos de Coffee+Visión."}
        action={<AdminAccountControls />}
      />

      <section className="grid gap-3 sm:grid-cols-3" aria-label="Resumen de cuentas">
        <MetricCard icon="fa-solid fa-users" label={isEmployees ? "Empleados registrados" : "Usuarios registrados"} value={loading ? "…" : baseRows.length} hint="Cuentas en la plataforma" />
        <MetricCard icon="fa-solid fa-user-check" label="Cuentas activas" value={loading ? "…" : activeCount} hint="Con acceso habilitado" />
        <MetricCard icon="fa-solid fa-user-slash" label="Pendientes o inactivas" value={loading ? "…" : inactiveCount} hint="Sin acceso activo" />
      </section>

      <section className="surface admin-accounts-toolbar">
        <label className="admin-accounts-search"><span className="sr-only">Buscar cuentas</span><i className="fa-solid fa-magnifying-glass" aria-hidden="true" /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por nombre, correo o finca" /></label>
        {!isEmployees && <label className="admin-role-filter"><span>Filtrar por rol</span><select value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)}><option value="todos">Todos los roles</option><option value="caficultor">Caficultores</option><option value="empleado">Empleados</option><option value="administrador">Administradores</option></select></label>}
        <Link href={isEmployees ? "/admin/usuarios" : "/admin/empleados"} className="admin-switch-link">Ver {isEmployees ? "todos los usuarios" : "solo empleados"} <span aria-hidden="true">→</span></Link>
        <button className="button button-outline" onClick={refresh}>↻ Actualizar</button>
      </section>

      <RequestState loading={loading} error={error} onRetry={refresh} />
      {!loading && !error && (
        <section className="surface table-card admin-accounts-table">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2"><div><p className="eyebrow !mb-1">DIRECTORIO</p><h2 className="m-0 text-lg font-bold text-coffee">{isEmployees ? "Empleados" : "Cuentas de usuario"}</h2></div><span className="text-sm text-muted">{visible.length} {visible.length === 1 ? "resultado" : "resultados"}</span></div>
          <div className="table-scroll"><table className="data-table">
            <thead><tr><th>Nombre</th><th>Correo electrónico</th>{!isEmployees && <th>Rol</th>}<th>Estado</th><th>Registro</th><th>Acciones</th></tr></thead>
            <tbody>{visible.length ? visible.map((user, index) => {
              const name = user.nombre ?? user.name ?? `Cuenta ${index + 1}`;
              const role = String(user.rol ?? user.role ?? "caficultor").toLowerCase();
              return <tr key={user.id ?? user.email ?? index}>
                <td><strong className="text-coffee">{name}</strong></td>
                <td>{user.email ?? user.correo ?? "—"}</td>
                {!isEmployees && <td><select aria-label={`Rol de ${name}`} value={role} onChange={(event) => changeRole(user, event.target.value)} className="admin-account-select"><option value="caficultor">Caficultor</option><option value="empleado">Empleado</option><option value="administrador">Administrador</option></select></td>}
                <td><span className={`admin-account-state ${isActive(user) ? "is-active" : "is-inactive"}`}><i aria-hidden="true" />{user.estado ?? user.status ?? "Activo"}</span></td>
                <td>{displayDate(user.creado_en ?? user.created_at ?? user.fecha_registro)}</td>
                <td><button type="button" onClick={() => deactivate(user)} className="admin-deactivate-button">Desactivar</button></td>
              </tr>;
            }) : <tr><td colSpan={isEmployees ? 5 : 6} className="empty-cell">{isEmployees ? "No hay cuentas con rol de empleado." : "No hay cuentas que coincidan con la búsqueda."}</td></tr>}</tbody>
          </table></div>
        </section>
      )}
    </section>
  );
}
