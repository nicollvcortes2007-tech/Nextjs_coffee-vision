import { http } from "@/lib/api";

export const contenidosApi = {
  list: () => http.get("/contenidos"),
};
