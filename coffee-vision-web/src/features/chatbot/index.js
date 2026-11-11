import { http } from "@/lib/api";

export const chatbotApi = {
  ask: (pregunta, contexto = {}) =>
    http.post("/chatbot/chat", { pregunta, ...contexto }),
};
