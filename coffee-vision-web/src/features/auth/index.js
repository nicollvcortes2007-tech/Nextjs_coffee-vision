import { http } from "@/lib/api";

export const authApi = {
  profile: () => http.get("/auth/me"),
  updateProfile: (data) => http.patch("/auth/me", data),
  requestPasswordReset: (email) => http.post('/auth/forgot-password', { email }),
};
