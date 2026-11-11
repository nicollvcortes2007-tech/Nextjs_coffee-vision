import { http } from "@/lib/api";

export const empleadosApi = {
  list: () => http.get("/empleados"),
  invite: (data) => http.post("/empleados/invitaciones", data),
  remove: (id) => http.delete(`/empleados/${id}`),
};

export const actividadesApi = {
  list: (params = "") => http.get(`/actividades${params ? `?${params}` : ""}`),
  create: (data) => http.post("/actividades", data),
};

export const notificacionesApi = {
  list: () => http.get("/notificaciones"),
  markRead: (id) => http.patch(`/notificaciones/${id}`, { leida: true }),
};
