// src/services/orangtuaService.js
import { apiClient } from "../api/apiClient";

export const getOrangtuaStats = () => {
  return apiClient.get("/api/orangtua/stats");
};
export const getAllOrangtua = () => {
  return apiClient.get("/api/orangtua");
};
export const updateOrangtua = (id_orangtua, data) => {
  return apiClient.put(`/api/orangtua/${id_orangtua}`, data);
};
export const deleteOrangtua = (id_orangtua, data) => {
  return apiClient.delete(`/api/orangtua/${id_orangtua}`, data);
};

