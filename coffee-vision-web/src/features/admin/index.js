import { api, http } from "@/lib/api";

export const usuariosAdminApi = {
  list: () => http.get("/admin/usuarios"),
  updateRole: (id, rol) => http.patch(`/admin/usuarios/${id}`, { rol }),
  remove: (id) => http.delete(`/admin/usuarios/${id}`),
};

export const contenidosAdminApi = {
  list: () => http.get("/admin/contenidos"),
  create: (data) => http.post("/admin/contenidos", data),
  remove: (id) => http.delete(`/admin/contenidos/${id}`),
};

export const plagasAdminApi = {
  list: () => http.get("/admin/plagas-ia"),
  analyze: (formData) => api("/plagas-ia/analizar", { method: "POST", body: formData }),
};
