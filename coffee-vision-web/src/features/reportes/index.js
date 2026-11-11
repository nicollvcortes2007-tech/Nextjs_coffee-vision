import { http } from "@/lib/api";

export const reportesApi = {
  summary: (period = "30d") => http.get(`/reportes/resumen?periodo=${period}`),
  exportCsv: (period = "30d") => http.get(`/reportes/exportar?formato=csv&periodo=${period}`),
};
