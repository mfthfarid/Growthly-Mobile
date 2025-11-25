import { apiClient } from "../api/apiClient";

export const login = (credentials) => {
  return apiClient.post("/api/auth/login", credentials);
};
