import { ROLES } from "@/constants/roles";

// qué puede hacer cada rol (ajustar según lo que defina el equipo)
const permisos = {
  [ROLES.CAFICULTOR]: [
    "ver_cultivo", "crear_cultivo", "editar_cultivo", "registrar_actividad",
    "ver_reportes", "gestionar_empleados", "usar_chatbot",
  ],
  [ROLES.EMPLEADO]: ["ver_cultivo", "registrar_actividad", "usar_chatbot"],
  [ROLES.ADMIN]: ["gestionar_usuarios", "gestionar_contenidos", "ver_metricas"],
};

export function puede(rol, permiso) {
  return permisos[rol].includes(permiso);
}
