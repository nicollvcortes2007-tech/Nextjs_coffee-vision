import { http } from "@/lib/api";

export const recomendacionesApi = {
  list: () => http.get("/recomendaciones"),
};
