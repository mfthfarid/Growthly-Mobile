// src/services/balitaService.js
import { apiClient } from "../api/apiClient";

export const getBalitaStats = () => {
  return apiClient.get("/api/balita/stats");
};
export const getBalitaList = () => {
  return apiClient.get("/api/balita");
};
export const updateBalita = (id, data) => {
  return apiClient.put(`/api/balita/${id}`, data);
};

export const deleteBalita = (id) => {
  return apiClient.delete(`/api/balita/${id}`);
};
