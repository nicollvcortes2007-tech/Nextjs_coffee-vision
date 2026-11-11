import { http } from "@/lib/api";

export const cultivosApi = {
  list: () => http.get("/cultivos"),
  get: (id) => http.get(`/cultivos/${id}`),
  create: (data) => http.post("/cultivos", data),
  update: (id, data) => http.put(`/cultivos/${id}`, data),
  remove: (id) => http.delete(`/cultivos/${id}`),
  activities: (id) => http.get(`/cultivos/${id}/actividades`),
};
